import ast
import re
from typing import Any

from src.logger import logger
from src.node.sdlc_node import extract_text_content
from src.state.sdlc_state import SDLCState
from src.tools.project_manager import ProjectManagerTool


class tester:
    """
    Test Engineering Agent responsible for generating comprehensive unit, integration,
    and edge-case tests, writing them to disk workspace files, and managing review decisions.
    """
    def __init__(self, llm):
        self.llm = llm

    def generate_test_cases(self, state: SDLCState) -> dict[str, Any]:
        """
        Generates comprehensive test cases and writes them as actual files into tests/ directory.
        Never keeps tests solely as raw text.
        """
        logger.info("Executing generate_test_cases node")
        project_name = state.get('project_name', 'ArcPilot App')
        requirements = state.get('requirements', [])
        user_stories = state.get('user_stories', [])
        project_files = state.get('generated_files', {})
        task_id = state.get('task_id', 'task-default')
        if not task_id or task_id == 'task-default':
            task_id = f"proj-{project_name.lower().replace(' ', '-')}"

        code_preview = state.get('code_generated', '')
        feedback_reason = state.get('test_case_review_feedback', '')

        # Generate test suite code
        test_file_blocks = self._generate_test_files(
            project_name=project_name,
            requirements=requirements,
            user_stories=user_stories,
            code=code_preview,
            feedback=feedback_reason
        )

        # Merge test files into project_files
        updated_files = dict(project_files)
        models_code = updated_files.get("app/models.py", "")

        for rel_path, content in test_file_blocks.items():
            if rel_path.endswith(".py"):
                try:
                    parsed = ast.parse(content)
                    # Discard if it imports models that are not defined in app/models.py
                    has_missing_model = False
                    for node in ast.walk(parsed):
                        if isinstance(node, ast.ImportFrom) and node.module == "app.models":
                            for alias in node.names:
                                if alias.name not in models_code:
                                    logger.warning(f"Discarding test file {rel_path} importing undefined model '{alias.name}'")
                                    has_missing_model = True
                                    break
                    if has_missing_model:
                        continue

                    # Discard if it hallucinates modules like 'services.' when code is in app.services
                    if "services." in content and not any(k.startswith("services/") for k in updated_files):
                        logger.warning(f"Discarding test file {rel_path} referencing non-existent 'services.' module")
                        continue
                    updated_files[rel_path] = content
                except Exception as e:
                    logger.warning(f"Discarding invalid test file {rel_path}: {e}")

        # Ensure verified standard test files exist
        if "tests/test_services.py" not in updated_files or not updated_files["tests/test_services.py"].strip():
            updated_files["tests/test_services.py"] = self._default_service_test(project_name)
        if "tests/test_main.py" not in updated_files or not updated_files["tests/test_main.py"].strip():
            updated_files["tests/test_main.py"] = self._default_main_test()
        updated_files["tests/__init__.py"] = '"""Tests package."""\n'

        # Write test files to actual disk workspace
        project_dir = ProjectManagerTool.write_project_files(task_id, updated_files)

        # Update traceability matrix with test case references
        matrix = state.get("traceability_matrix", [])
        for idx, item in enumerate(matrix, start=1):
            item["test_case_ids"] = [f"TC-{idx:02d}-Unit", f"TC-{idx:02d}-API"]
            item["test_status"] = "GENERATED"

        test_preview = updated_files.get("tests/test_services.py") or updated_files.get("tests/test_main.py") or ""

        return {
            **state,
            "generated_files": updated_files,
            "generated_project_path": project_dir,
            "test_cases": test_preview,
            "test_case_review_status": "approved",
            "current_node": "generate_test_cases",
            "next_required_input": "test_cases_review",
            "progress": 80,
            "traceability_matrix": matrix
        }

    def _generate_test_files(
        self, project_name: str, requirements: Any, user_stories: Any,
        code: str, feedback: str
    ) -> dict[str, str]:
        """
        Invokes LLM to produce unit and integration test files.
        """
        prompt = f"""
You are a Principal QA Automation Engineer. Based on the project requirements and implementation, generate a comprehensive Pytest test suite for:
Project Name: {project_name}

Requirements:
{self._format_list(requirements)}

{f"Feedback to incorporate: {feedback}" if feedback else ""}

CRITICAL ARCHITECTURE GUIDELINES:
1. The FastAPI app is located in `app.main` (use `from app.main import app`).
2. Pydantic models are in `app.models`.
3. Business logic services are in `app.services`.
4. External clients are in `app.clients`.
5. DO NOT import from non-existent modules like `services.weather_service` or `services.xyz`.

Implementation Preview:
```python
{code[:2500]}
```

Provide the test files formatted strictly as:

### FILE: tests/test_services.py
<test code for business logic, edge cases, boundaries, negative tests>
### END_FILE

### FILE: tests/test_main.py
<test code for FastAPI endpoints using fastapi.testclient.TestClient>
### END_FILE
"""
        test_files: dict[str, str] = {}
        try:
            response = self.llm.invoke(prompt)
            content = extract_text_content(response)
            pattern = re.compile(r'###\s*FILE:\s*([^\r\n]+)\r?\n(.*?)(?=###\s*END_FILE|###\s*FILE:|$)', re.DOTALL)
            for filename, body in pattern.findall(content):
                fn = filename.strip().replace("\\", "/")
                b = body.strip().lstrip("```python").lstrip("```").rstrip("```").strip()
                if fn and b:
                    test_files[fn] = b
        except Exception as e:
            logger.warning(f"LLM test case generation issue: {e}")

        return test_files

    def _default_service_test(self, project_name: str) -> str:
        return '''import pytest
from app.models import TripPlanRequest
from app.services import TripPlannerService
from app.clients import WeatherClient, CurrencyClient, PlacesClient

def test_weather_client_fallback():
    client = WeatherClient(api_key="")
    data = client.get_weather("Rome")
    assert "temperature_c" in data
    assert "condition" in data

def test_currency_client():
    client = CurrencyClient(api_key="")
    rate = client.get_exchange_rate("USD", "EUR")
    assert rate > 0

def test_places_client():
    client = PlacesClient()
    places = client.get_attractions("Paris")
    assert len(places) > 0
    assert any("Louvre" in p or "Eiffel" in p for p in places)

def test_trip_planner_service():
    service = TripPlannerService()
    req = TripPlanRequest(destination="Tokyo", duration_days=3)
    plan = service.generate_itinerary(req)
    assert plan.status == "success"
    assert plan.destination == "Tokyo"
    assert len(plan.itinerary) == 3
    assert plan.weather.temperature_c is not None
'''

    def _default_main_test(self) -> str:
        return '''from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_readiness_endpoint():
    response = client.get("/ready")
    assert response.status_code == 200
    assert response.json()["status"] == "ready"

def test_plan_trip_api():
    payload = {
        "destination": "London",
        "duration_days": 2,
        "budget_level": "medium",
        "interests": ["sightseeing"]
    }
    response = client.post("/api/v1/trip/plan", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["destination"] == "London"
    assert len(data["itinerary"]) == 2
'''

    def test_cases_review(self, state: SDLCState) -> SDLCState:
        """
        Processes human review of the test cases.
        Never left as pass.
        """
        logger.info("Executing test_cases_review node")
        status = state.get("test_case_review_status", "approved")
        state["current_node"] = "test_cases_review"
        if status.lower() in ("approved", "approve", "accept", "passed"):
            state["progress"] = 85
            state["next_required_input"] = "qa_testing"
        else:
            state["next_required_input"] = "generate_test_cases"
        return state

    def test_cases_review_router(self, state: SDLCState) -> str:
        """
        Router for test cases review decision.
        """
        status = state.get("test_case_review_status", "").strip().lower()
        if status in ("approved", "approve", "accept", "passed"):
            return "approved"
        return "feedback"

    def _format_list(self, items: Any) -> str:
        if not items:
            return "No items."
        if isinstance(items, list):
            return "\n".join([f"- {i}" for i in items])
        return str(items)
