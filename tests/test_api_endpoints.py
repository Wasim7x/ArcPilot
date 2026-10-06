import pytest
from fastapi.testclient import TestClient

from app import _rebuild_graph, app
from src.llm import MockLLMProvider


@pytest.fixture(autouse=True)
def setup_test_app():
    # Setup mock LLM on app state
    mock_llm = MockLLMProvider().get_llm()
    app.state.llm = mock_llm
    app.state.graph = _rebuild_graph(mock_llm)
    app.state.llm_config = {
        "provider": "Mock",
        "model": "mock-model",
        "api_key": "***"
    }

def test_health_endpoint():
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ("ok", "healthy")
    assert data["service"] == "ArcPilot"

def test_ready_endpoint():
    client = TestClient(app)
    response = client.get("/ready")
    assert response.status_code == 200
    assert response.json()["status"] == "ready"

def test_config_llm_endpoint():
    client = TestClient(app)
    response = client.post("/config/llm", json={
        "provider": "Mock",
        "model": "mock-model",
        "api_key": "test_key"
    })
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_workflow_lifecycle_api():
    client = TestClient(app)

    # 1. Start Workflow
    start_resp = client.post("/sdlc/workflow/start", json={
        "project_name": "AI Trip Planner"
    })
    assert start_resp.status_code == 200
    start_data = start_resp.json()
    task_id = start_data["task_id"]
    assert task_id.startswith("sdlc-task-")
    assert start_data["next_required_input"] == "requirements"

    # 2. Submit Requirements
    req_resp = client.post(f"/sdlc/workflow/{task_id}/requirements", json={
        "task": "Create an AI Trip Planner application that retrieves weather and currency info."
    })
    assert req_resp.status_code == 200
    req_data = req_resp.json()
    assert req_data["task_id"] == task_id

    # 3. Product Owner Review
    po_resp = client.post(f"/sdlc/workflow/{task_id}/product_owner_review", json={
        "review_status": "approved",
        "feedback_reason": "Approved for design"
    })
    assert po_resp.status_code == 200

    # 4. Check State Endpoint
    state_resp = client.get(f"/sdlc/workflow/{task_id}/state")
    assert state_resp.status_code == 200
    state_data = state_resp.json()
    assert state_data["task_id"] == task_id

def test_frontend_serving():
    client = TestClient(app)
    response = client.get("/")
    assert response.status_code == 200
    assert "ArcPilot — AI SDLC Orchestrator" in response.text
    assert '<div id="root"></div>' in response.text
    assert "/assets/" in response.text

