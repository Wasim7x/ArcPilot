import ast
import os
import subprocess

from src.logger import logger
from src.state.sdlc_state import StaticAnalysisFinding, StaticAnalysisResult


class StaticAnalysisTool:
    """
    Automated static code analysis tool executing Python AST analysis and ruff/pyflakes checks
    on generated project files.
    """

    @classmethod
    def analyze_python_code(cls, file_path: str, code_content: str) -> list[StaticAnalysisFinding]:
        findings: list[StaticAnalysisFinding] = []

        # 1. AST Syntax and Structure Check
        try:
            tree = ast.parse(code_content, filename=file_path)
            # Inspect for empty exception handlers
            for node in ast.walk(tree):
                if isinstance(node, ast.ExceptHandler):
                    if len(node.body) == 1 and isinstance(node.body[0], ast.Pass):
                        findings.append(StaticAnalysisFinding(
                            file_path=file_path,
                            line=node.lineno,
                            column=node.col_offset,
                            rule_id="W001-SILENT-EXCEPT",
                            message="Empty except clause with 'pass' suppresses potential runtime exceptions.",
                            severity="warning"
                        ))
                    elif len(node.body) == 0:
                        findings.append(StaticAnalysisFinding(
                            file_path=file_path,
                            line=node.lineno,
                            column=node.col_offset,
                            rule_id="E001-EMPTY-EXCEPT",
                            message="Empty exception handler body.",
                            severity="error"
                        ))
        except SyntaxError as se:
            findings.append(StaticAnalysisFinding(
                file_path=file_path,
                line=se.lineno or 1,
                column=se.offset or 0,
                rule_id="E999-SYNTAX-ERROR",
                message=f"Syntax Error: {se.msg}",
                severity="error"
            ))
        except Exception as e:
            findings.append(StaticAnalysisFinding(
                file_path=file_path,
                line=1,
                column=0,
                rule_id="E998-PARSE-ERROR",
                message=f"Failed to parse AST: {e!s}",
                severity="error"
            ))

        return findings

    @classmethod
    def run_ruff_on_dir(cls, project_dir: str) -> list[StaticAnalysisFinding]:
        findings: list[StaticAnalysisFinding] = []
        try:
            # Run ruff check with json output if available
            result = subprocess.run(
                ["ruff", "check", "--output-format=concise", project_dir],
                capture_output=True,
                text=True,
                timeout=15
            )
            output = result.stdout or result.stderr
            for line in output.splitlines():
                line = line.strip()
                if not line or ":" not in line:
                    continue
                parts = line.split(":", 3)
                if len(parts) >= 4:
                    fpath, lineno, col, msg = parts[0], parts[1], parts[2], parts[3]
                    try:
                        line_int = int(lineno)
                        col_int = int(col)
                    except ValueError:
                        continue
                    rule = "RUFF"
                    severity = "error" if "E" in msg or "F" in msg else "warning"
                    findings.append(StaticAnalysisFinding(
                        file_path=os.path.relpath(fpath, project_dir),
                        line=line_int,
                        column=col_int,
                        rule_id=rule,
                        message=msg.strip(),
                        severity=severity
                    ))
        except FileNotFoundError:
            logger.info("Ruff is not installed or not in PATH, relying on AST static analysis.")
        except subprocess.TimeoutExpired:
            logger.warning("Ruff check timed out after 15s.")
        except Exception as e:
            logger.warning(f"Error running ruff: {e}")

        return findings

    @classmethod
    def analyze_project(cls, project_files: dict[str, str], project_dir: str | None = None) -> StaticAnalysisResult:
        all_findings: list[StaticAnalysisFinding] = []

        # Run in-memory AST checks on all Python files
        for rel_path, content in project_files.items():
            if rel_path.endswith(".py"):
                file_findings = cls.analyze_python_code(rel_path, content)
                all_findings.extend(file_findings)

        # If project_dir exists on disk, run external linter (ruff)
        if project_dir and os.path.isdir(project_dir):
            ruff_findings = cls.run_ruff_on_dir(project_dir)
            all_findings.extend(ruff_findings)

        errors = sum(1 for f in all_findings if f.severity == "error")
        warnings = sum(1 for f in all_findings if f.severity == "warning")
        passed = (errors == 0)

        raw_summary = f"Analyzed {len(project_files)} files. Found {errors} errors and {warnings} warnings."

        return StaticAnalysisResult(
            passed=passed,
            total_issues=len(all_findings),
            errors=errors,
            warnings=warnings,
            findings=all_findings,
            raw_output=raw_summary
        )
