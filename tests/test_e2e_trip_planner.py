from fastapi.testclient import TestClient

from app import _rebuild_graph, app
from src.llm import MockLLMProvider


def test_full_sdlc_e2e_trip_planner():
    """
    End-to-end integration test demonstrating the complete SDLC progression for
    the 'AI Trip Planner' requirement through all stages.
    """
    # 0. Setup Mock LLM
    mock_llm = MockLLMProvider().get_llm()
    app.state.llm = mock_llm
    app.state.graph = _rebuild_graph(mock_llm)
    app.state.llm_config = {"provider": "Mock", "model": "mock-model", "api_key": "***"}
    client = TestClient(app)

    # 1. Start Workflow
    start_resp = client.post("/sdlc/workflow/start", json={"project_name": "AI Trip Planner"})
    assert start_resp.status_code == 200
    task_id = start_resp.json()["task_id"]

    # 2. Ingest Natural-Language Requirement
    requirement_text = (
        "Create an application where users provide a destination and trip duration. "
        "The application should automatically retrieve weather information, currency exchange rates, "
        "attractions, and other relevant travel information and generate a complete day-by-day trip plan."
    )
    req_resp = client.post(f"/sdlc/workflow/{task_id}/requirements", json={"task": requirement_text})
    assert req_resp.status_code == 200
    req_data = req_resp.json()["data"]
    assert "requirements" in req_data
    assert len(req_data["requirements"]) > 0

    # 3. Product Owner Review
    po_resp = client.post(f"/sdlc/workflow/{task_id}/product_owner_review", json={
        "review_status": "approved",
        "feedback_reason": "Requirements verified against user specification."
    })
    assert po_resp.status_code == 200

    # 4. Design Review
    design_resp = client.post(f"/sdlc/workflow/{task_id}/design_review", json={
        "review_status": "approved",
        "feedback_reason": "Architecture and data schemas approved."
    })
    assert design_resp.status_code == 200

    # 5. Code Review
    code_resp = client.post(f"/sdlc/workflow/{task_id}/code_review", json={
        "review_status": "approved",
        "feedback_reason": "Static analysis checks passed."
    })
    assert code_resp.status_code == 200

    # 6. Security Review
    sec_resp = client.post(f"/sdlc/workflow/{task_id}/security_review", json={
        "review_status": "approved",
        "feedback_reason": "No critical or high security vulnerabilities found."
    })
    assert sec_resp.status_code == 200

    # 7. Test Cases Review
    tc_resp = client.post(f"/sdlc/workflow/{task_id}/test_cases_review", json={
        "review_status": "approved",
        "feedback_reason": "Test coverage satisfies all functional requirements."
    })
    assert tc_resp.status_code == 200

    # 8. QA Testing Review
    qa_resp = client.post(f"/sdlc/workflow/{task_id}/qa_testing_review", json={
        "review_status": "approved",
        "feedback_reason": "Automated tests executed cleanly."
    })
    assert qa_resp.status_code == 200

    # 9. Verify Final Workflow State & Artifacts
    state_resp = client.get(f"/sdlc/workflow/{task_id}/state")
    assert state_resp.status_code == 200
    final_state = state_resp.json()["state"]

    assert final_state["progress"] == 100
    assert final_state["status"] == "completed"
    assert final_state["deployment_status"] == "success"
    assert "deployment_result" in final_state
    assert final_state["deployment_result"]["smoke_test_passed"] is True

    # 10. Verify Downloadable ZIP Artifact
    download_resp = client.get(f"/sdlc/workflow/{task_id}/download")
    assert download_resp.status_code == 200
    assert download_resp.headers["content-type"] == "application/zip"
    assert len(download_resp.content) > 0

    # 11. Verify Artifacts Listing
    artifacts_resp = client.get(f"/sdlc/workflow/{task_id}/artifacts")
    assert artifacts_resp.status_code == 200
    artifacts_data = artifacts_resp.json()
    assert artifacts_data["total_files"] >= 8
    assert "app/main.py" in artifacts_data["files"]
    assert "tests/test_services.py" in artifacts_data["files"]
    assert "requirements.txt" in artifacts_data["files"]
    assert "Dockerfile" in artifacts_data["files"]
