import os
import re
import subprocess
import sys
import time

from src.logger import logger
from src.state.sdlc_state import TestCaseExecutionItem, TestExecutionReport


class TestExecutionEngine:
    """
    Isolated, process-contained test execution engine that runs real tests
    against the generated codebase without polluting the host process or leaking host credentials.
    """

    DEFAULT_TIMEOUT_SECONDS = int(os.getenv("TEST_TIMEOUT", "45"))

    SENSITIVE_ENV_KEYS = [
        "GROQ_API_KEY", "OPENAI_API_KEY", "GEMINI_API_KEY",
        "AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID", "GITHUB_TOKEN",
        "DATABASE_URL", "REDIS_PASSWORD", "SECRET_KEY"
    ]

    @classmethod
    def _create_isolated_env(cls, project_dir: str) -> dict[str, str]:
        """Strip sensitive host environment variables before running untrusted generated code."""
        safe_env = {}
        for k, v in os.environ.items():
            if k not in cls.SENSITIVE_ENV_KEYS and not k.endswith("_KEY") and not k.endswith("_SECRET"):
                safe_env[k] = v

        # Add project dir and subdirectories to PYTHONPATH
        existing_pythonpath = safe_env.get("PYTHONPATH", "")
        backend_dir = os.path.join(project_dir, "backend")
        new_paths = [project_dir]
        if os.path.isdir(backend_dir):
            new_paths.append(backend_dir)
        if existing_pythonpath:
            new_paths.append(existing_pythonpath)

        safe_env["PYTHONPATH"] = os.pathsep.join(new_paths)
        safe_env["PYTHONUNBUFFERED"] = "1"
        safe_env["TESTING"] = "true"
        safe_env["ENVIRONMENT"] = "testing"
        return safe_env

    @classmethod
    def run_tests(cls, project_dir: str, timeout_seconds: int | None = None) -> TestExecutionReport:
        timeout = timeout_seconds or cls.DEFAULT_TIMEOUT_SECONDS
        safe_env = cls._create_isolated_env(project_dir)
        start_time = time.time()

        tests_dir = os.path.join(project_dir, "tests")
        if not os.path.exists(tests_dir):
            return TestExecutionReport(
                total_tests=0,
                passed=0,
                failed=0,
                errors=1,
                skipped=0,
                duration_seconds=0.0,
                exit_code=1,
                raw_stderr="No tests directory found in generated project.",
                summary="No tests directory found to execute."
            )

        # Decide whether to use pytest or python -m unittest
        cmd = [sys.executable, "-m", "pytest", "-v", "--tb=short", "tests"]

        try:
            logger.info(f"Running real test execution in {project_dir} with command: {' '.join(cmd)}")
            proc = subprocess.run(
                cmd,
                cwd=project_dir,
                env=safe_env,
                capture_output=True,
                text=True,
                timeout=timeout
            )
            stdout = proc.stdout or ""
            stderr = proc.stderr or ""
            exit_code = proc.returncode

        except subprocess.TimeoutExpired as te:
            logger.error(f"Test execution timed out after {timeout} seconds.")
            return TestExecutionReport(
                total_tests=0,
                passed=0,
                failed=1,
                errors=1,
                skipped=0,
                duration_seconds=float(timeout),
                exit_code=-1,
                raw_stdout=te.stdout or "",
                raw_stderr=f"TIMEOUT: Test execution exceeded configured limit of {timeout}s.",
                summary=f"FAILED: Test execution timed out after {timeout}s."
            )
        except Exception as e:
            logger.error(f"Failed to launch test runner process: {e}")
            return TestExecutionReport(
                total_tests=0,
                passed=0,
                failed=1,
                errors=1,
                skipped=0,
                duration_seconds=0.0,
                exit_code=-2,
                raw_stderr=str(e),
                summary=f"FAILED: Could not launch test process: {e}"
            )

        duration = round(time.time() - start_time, 2)
        parsed_report = cls._parse_pytest_output(stdout, stderr, exit_code, duration)
        return parsed_report

    @classmethod
    def _parse_pytest_output(cls, stdout: str, stderr: str, exit_code: int, duration: float) -> TestExecutionReport:
        items: list[TestCaseExecutionItem] = []
        passed = 0
        failed = 0
        errors = 0
        skipped = 0

        # Parse test lines like: tests/test_weather.py::test_get_weather PASSED [ 50%]
        # or tests/test_foo.py::test_bar FAILED [100%]
        for line in stdout.splitlines():
            line_str = line.strip()
            if "::" in line_str and any(s in line_str for s in ("PASSED", "FAILED", "ERROR", "SKIPPED")):
                parts = line_str.split()
                test_name = parts[0] if parts else line_str
                if "PASSED" in line_str:
                    status = "PASS"
                    passed += 1
                elif "FAILED" in line_str:
                    status = "FAIL"
                    failed += 1
                elif "ERROR" in line_str:
                    status = "ERROR"
                    errors += 1
                else:
                    status = "SKIP"
                    skipped += 1

                items.append(TestCaseExecutionItem(
                    test_id=f"TEST-{len(items)+1:02d}",
                    name=test_name,
                    status=status,
                    duration_seconds=0.01
                ))

        # Check Pytest Summary line: "=== 5 passed, 1 failed in 0.45s ==="
        summary_match = re.search(r'(=+\s*)(.*?)(in\s+[\d\.]+s\s*=*)', stdout)
        summary_text = summary_match.group(2).strip() if summary_match else ""

        total = passed + failed + errors + skipped
        if total == 0 and exit_code != 0:
            errors = 1
            total = 1

        summary = (
            f"Execution Results: Total: {total} | Passed: {passed} | "
            f"Failed: {failed} | Errors: {errors} | Skipped: {skipped} | "
            f"Duration: {duration}s | Exit Code: {exit_code}"
            + (f" ({summary_text})" if summary_text else "")
        )


        return TestExecutionReport(
            total_tests=total,
            passed=passed,
            failed=failed,
            errors=errors,
            skipped=skipped,
            duration_seconds=duration,
            exit_code=exit_code,
            test_results=items,
            raw_stdout=stdout,
            raw_stderr=stderr,
            summary=summary
        )
