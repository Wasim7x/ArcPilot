import os

import pytest
from fastapi.testclient import TestClient

from app import app
from src.cache.radis_cache import get_state_from_redis


@pytest.mark.asyncio
async def test_gemini_e2e_flow():
    if os.getenv("RUN_LIVE_API_TESTS", "").lower() not in ("true", "1") or not os.getenv("GEMINI_API_KEY"):
        pytest.skip("Skipping live Gemini API test (set RUN_LIVE_API_TESTS=true and GEMINI_API_KEY to run live network test).")
    client = TestClient(app)

    # 1. LLM selection: Configure Gemini with gemini-3.8-flash
    config_resp = client.post(
        "/config/llm",
        json={"provider": "Gemini", "model": "gemini-3.8-flash"}
    )
    assert config_resp.status_code == 200, f"Failed config: {config_resp.text}"
    config_data = config_resp.json()
    assert config_data["status"] == "ok"
    assert config_data["provider"] == "Gemini"
    assert config_data["model"] == "gemini-3.8-flash"

    # Verify GET /config/llm confirms Gemini is active
    get_cfg = client.get("/config/llm")
    assert get_cfg.status_code == 200
    assert get_cfg.json()["provider"] == "Gemini"
    assert get_cfg.json()["model"] == "gemini-3.8-flash"

    # 2. Workflow start
    start_resp = client.post(
        "/workflow/start",
        json={"project_name": "GeminiTripPlanner"}
    )
    assert start_resp.status_code == 200, f"Start failed: {start_resp.text}"
    start_data = start_resp.json()
    task_id = start_data["task_id"]
    assert task_id.startswith("sdlc-task-")
    assert start_data["status"] in ("in_progress", "waiting_for_input")
    assert start_data["next_required_input"] == "requirements"

    # Verify checkpoint persisted in cache
    persisted_state = get_state_from_redis(task_id)
    assert persisted_state is not None
    assert persisted_state["project_name"] == "GeminiTripPlanner"

    # 3. Requirements submission -> Gemini response -> state update
    req_resp = client.post(
        f"/workflow/{task_id}/requirements",
        json={"task": "Build a currency converter service with live rate calculation and validation."}
    )
    assert req_resp.status_code == 200, f"Requirements failed: {req_resp.text}"
    req_data = req_resp.json()
    assert req_data["task_id"] == task_id
    assert req_data["next_required_input"] == "product_owner_review"
    assert req_data["progress"] in (20, 30)

    # Verify Gemini structured output / parsing
    state = req_data.get("state") or req_data.get("data")
    assert state is not None
    assert "structured_requirements" in state or "requirements" in state
    assert len(state.get("requirements", [])) > 0

    # 4. Verify persisted state via GET /workflow/{task_id}/state
    get_state_resp = client.get(f"/workflow/{task_id}/state")
    assert get_state_resp.status_code == 200
    state_body = get_state_resp.json()
    assert state_body["task_id"] == task_id
    assert state_body["next_required_input"] == "product_owner_review"

    # 5. Product Owner review gate approval
    review_resp = client.post(
        f"/workflow/{task_id}/review",
        json={
            "stage": "product_owner_review",
            "decision": "approve",
            "feedback": "Approved user stories and specs"
        }
    )
    assert review_resp.status_code == 200, f"Review failed: {review_resp.text}"
    review_data = review_resp.json()
    assert review_data["next_required_input"] == "design_review"
    assert review_data["progress"] >= 40
    print("\nComplete Gemini SDLC E2E flow passed successfully!")
