import os
import shutil
import tempfile

from src.tools.project_manager import ProjectManagerTool
from src.tools.security_scanner import SecurityScannerTool
from src.tools.static_analysis import StaticAnalysisTool
from src.tools.test_runner import TestExecutionEngine


def test_static_analysis_valid_code():
    code = """
def add(a: int, b: int) -> int:
    return a + b
"""
    findings = StaticAnalysisTool.analyze_python_code("test_math.py", code)
    assert len(findings) == 0

def test_static_analysis_syntax_error():
    code = "def bad_syntax(:\n    pass"
    findings = StaticAnalysisTool.analyze_python_code("bad.py", code)
    assert len(findings) >= 1
    assert any(f.severity == "error" for f in findings)

def test_static_analysis_project():
    files = {
        "good.py": "def foo(): return 1\n",
        "except_pass.py": "try:\n    x = 1\nexcept:\n    pass\n"
    }
    result = StaticAnalysisTool.analyze_project(files)
    assert result.passed is True  # Warning does not fail overall correctness
    assert result.warnings >= 1

def test_security_scanner_secret_detection():
    files = {
        "config.py": 'API_KEY = "sk-1234567890abcdef1234567890"\n',
        "service.py": "def get(): return True\n"
    }
    report = SecurityScannerTool.scan_project(files)
    assert report.total_findings >= 1
    assert report.critical_count >= 1
    assert report.status == "FAILED"

def test_security_scanner_clean_code():
    files = {
        "config.py": 'import os\nAPI_KEY = os.getenv("API_KEY", "")\n',
        "app.py": 'def run():\n    return "healthy"\n'
    }
    report = SecurityScannerTool.scan_project(files)
    assert report.critical_count == 0
    assert report.status == "PASSED"

def test_project_manager_write_and_read():
    task_id = "test-task-pm-01"
    files = {
        "main.py": "print('hello ArcPilot')\n",
        "app/utils.py": "def helper(): return True\n"
    }
    project_dir = ProjectManagerTool.write_project_files(task_id, files)
    assert os.path.isdir(project_dir)

    read_back = ProjectManagerTool.read_all_project_files(task_id)
    assert "main.py" in read_back
    assert "app/utils.py" in read_back

    # Test update file
    ProjectManagerTool.update_file(task_id, "main.py", "print('updated')\n")
    updated = ProjectManagerTool.read_all_project_files(task_id)
    assert "updated" in updated["main.py"]

    # Test zip packaging
    zip_path = ProjectManagerTool.package_project_zip(task_id)
    assert os.path.isfile(zip_path)
    assert zip_path.endswith(".zip")

def test_test_execution_engine_real_run():
    temp_dir = tempfile.mkdtemp()
    try:
        tests_dir = os.path.join(temp_dir, "tests")
        os.makedirs(tests_dir, exist_ok=True)
        with open(os.path.join(tests_dir, "test_sample.py"), "w", encoding="utf-8") as f:
            f.write("""import pytest

def test_success():
    assert 1 + 1 == 2

def test_strings():
    assert "arcpilot".upper() == "ARCPILOT"
""")
        report = TestExecutionEngine.run_tests(temp_dir, timeout_seconds=10)
        assert report.total_tests == 2
        assert report.passed == 2
        assert report.failed == 0
        assert report.exit_code == 0
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
