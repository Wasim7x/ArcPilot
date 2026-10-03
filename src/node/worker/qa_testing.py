import re
from datetime import datetime
from typing import Any

from src.logger import logger
from src.node.sdlc_node import extract_text_content
from src.state.sdlc_state import QAFailureAnalysis, QAReport, RepairAttempt, SDLCState, TestExecutionReport
from src.tools.project_manager import ProjectManagerTool
from src.tools.test_runner import TestExecutionEngine


class qa_testing:
    """
    QA Testing Agent that executes real test suites in an isolated environment,
    evaluates actual execution results, and manages automated repair loops for failing tests.
    """
    def __init__(self, llm):
        self.llm = llm

    def qa_testing(self, state: SDLCState) -> dict[str, Any]:
        """
        Executes real test runner, analyzes actual outcomes, and triggers repair loop if needed.
        Never fabricates or simulates test execution.
        """
        logger.info("Executing qa_testing node with real test runner")
        project_name = state.get('project_name', 'ArcPilot App')
        project_dir = state.get('generated_project_path', '')
        task_id = state.get('task_id', 'task-default')
        if not task_id or task_id == 'task-default':
            task_id = f"proj-{project_name.lower().replace(' ', '-')}"

        current_attempt = state.get('current_repair_attempt', 0)
        max_attempts = state.get('max_repair_attempts', 3)
        repair_history = list(state.get('repair_attempts', []))

        # 1. Execute Real Tests
        test_report: TestExecutionReport = TestExecutionEngine.run_tests(project_dir)
        logger.info(f"Test Execution Finished: Passed={test_report.passed}, Failed={test_report.failed}, Errors={test_report.errors}")

        # 2. Automated Debug & Repair Loop if failures exist
        if (test_report.failed > 0 or test_report.errors > 0) and current_attempt < max_attempts:
            logger.info(f"Test failures detected ({test_report.failed} failed). Initiating automated repair loop (Attempt {current_attempt + 1}/{max_attempts}).")
            current_attempt += 1

            patched_files, summary = self._repair_code(
                task_id=task_id,
                project_dir=project_dir,
                test_report=test_report,
                project_files=state.get('generated_files', {})
            )

            # Record repair attempt
            failed_names = [r.name for r in test_report.test_results if r.status in ("FAIL", "ERROR")]
            repair_history.append(RepairAttempt(
                attempt_number=current_attempt,
                timestamp=datetime.now().isoformat(),
                failed_tests=failed_names,
                patched_files=patched_files,
                changes_summary=summary,
                result_status="PATCHED"
            ).model_dump())

            # Re-run tests on the repaired codebase
            logger.info("Re-running test execution after code repair patch...")
            test_report = TestExecutionEngine.run_tests(project_dir)
            logger.info(f"Post-repair Test Execution: Passed={test_report.passed}, Failed={test_report.failed}, Errors={test_report.errors}")

        # 3. Analyze Final Test Results for QA Report
        failure_analyses: list[QAFailureAnalysis] = []
        for item in test_report.test_results:
            if item.status in ("FAIL", "ERROR"):
                failure_analyses.append(QAFailureAnalysis(
                    test_id=item.test_id,
                    failure_reason=item.error_message or "Assertion failed or runtime error",
                    affected_requirement="Core API Functionality",
                    affected_code_file=item.name.split("::")[0] if "::" in item.name else "app/services.py",
                    recommended_fix="Refactor failing function to satisfy test assertions"
                ))

        quality_gate_passed = (test_report.failed == 0 and test_report.errors == 0 and test_report.total_tests > 0)

        qa_report = QAReport(
            overall_status="PASS" if quality_gate_passed else "FAIL",
            total_tests=test_report.total_tests,
            passed_tests=test_report.passed,
            failed_tests=test_report.failed,
            quality_gate_passed=quality_gate_passed,
            failure_analyses=failure_analyses,
            recommendations=[
                "Maintain comprehensive unit test coverage",
                "Ensure continuous regression verification"
            ] if quality_gate_passed else [
                "Investigate failing assertions in test report",
                "Review input validation and response payloads"
            ],
            summary=f"QA Assessment: {'PASSED - All tests succeeded.' if quality_gate_passed else 'FAILED - Unresolved test failures.'}"
        )

        qa_comments = f"""### QA Execution & Test Validation Report
**Project**: {project_name}
**Quality Gate Status**: {"PASSED ✅" if quality_gate_passed else "FAILED ❌"}
**Total Tests**: {test_report.total_tests}
- Passed: {test_report.passed}
- Failed: {test_report.failed}
- Errors: {test_report.errors}
- Skipped: {test_report.skipped}
- Execution Duration: {test_report.duration_seconds}s
- Exit Code: {test_report.exit_code}

#### Automated Repair History:
- Repair Attempts Made: {current_attempt} / {max_attempts}
{chr(10).join([f"  • Attempt {r['attempt_number']}: Patched {', '.join(r.get('patched_files', []))} ({r.get('changes_summary', '')})" for r in repair_history]) if repair_history else "  • No repair attempts required."}

#### Test Runner Output:
```text
{test_report.raw_stdout[:1500]}
```
"""

        # Update traceability matrix with test execution status
        matrix = state.get("traceability_matrix", [])
        for item in matrix:
            item["test_status"] = "PASSED" if quality_gate_passed else "FAILED"

        qa_status = "approved" if quality_gate_passed else "needs_revision"
        status_flag = "in_progress" if quality_gate_passed else ("failed_requires_human_review" if current_attempt >= max_attempts else "in_progress")

        return {
            **state,
            "test_execution_results": test_report.model_dump(),
            "qa_report": qa_report.model_dump(),
            "qa_testing_status": qa_status,
            "qa_testing_comments": qa_comments,
            "current_repair_attempt": current_attempt,
            "repair_attempts": repair_history,
            "status": status_flag,
            "current_node": "qa_testing",
            "next_required_input": "qa_testing_review",
            "progress": 90,
            "traceability_matrix": matrix
        }

    def _repair_code(
        self, task_id: str, project_dir: str, test_report: TestExecutionReport, project_files: dict[str, str]
    ) -> tuple[list[str], str]:
        """
        Debugging Agent logic: analyzes failure traceback and patches offending file.
        """
        logger.info("Debugging Agent diagnosing test failures and generating code patches...")
        failed_output = (test_report.raw_stdout + "\n" + test_report.raw_stderr)[:3000]

        prompt = f"""
You are an expert Systems Debugger and Software Engineer.
The following test execution failed:

```text
{failed_output}
```

Identify the root cause of the failure and output the complete fixed version of the failing file.
Format your output as:

### FILE: <relative_path_to_fixed_file>
<fixed file content>
### END_FILE
"""
        patched_files: list[str] = []
        summary = "Code patch applied for failing test cases."
        try:
            response = self.llm.invoke(prompt)
            content = extract_text_content(response)
            pattern = re.compile(r'###\s*FILE:\s*([^\r\n]+)\r?\n(.*?)(?=###\s*END_FILE|###\s*FILE:|$)', re.DOTALL)
            matches = pattern.findall(content)
            for fpath, fbody in matches:
                rel_path = fpath.strip().replace("\\", "/")
                clean_body = fbody.strip().lstrip("```python").lstrip("```").rstrip("```").strip()
                if rel_path and clean_body:
                    ProjectManagerTool.update_file(task_id, rel_path, clean_body)
                    patched_files.append(rel_path)
                    logger.info(f"Patched file: {rel_path}")
        except Exception as e:
            logger.warning(f"Error during automated repair patch: {e}")

        return patched_files, summary

    def qa_testing_review(self, state: SDLCState) -> SDLCState:
        """
        Processes human review of the QA testing results.
        Never left as pass.
        """
        logger.info("Executing qa_testing_review node")
        status = state.get("qa_testing_status", "approved")
        state["current_node"] = "qa_testing_review"
        if status.lower() in ("approved", "approve", "accept", "passed"):
            state["progress"] = 95
            state["next_required_input"] = "deployment"
        else:
            state["next_required_input"] = "generate_code"
        return state

    def qa_testing_review_router(self, state: SDLCState) -> str:
        """
        Router for QA review decision.
        """
        status = state.get("qa_testing_status", "").strip().lower()
        if status in ("approved", "approve", "accept", "passed"):
            return "approved"
        return "feedback"
