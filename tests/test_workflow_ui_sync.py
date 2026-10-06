from fastapi.testclient import TestClient

from app import app


def test_health_check():
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] in ("ok", "healthy")
        assert "active_provider" in data

def test_workflow_state_synchronization_and_review_paths():
    with TestClient(app) as client:
        # 1. Start Workflow
        start_resp = client.post("/sdlc/workflow/start", json={"project_name": "AI Trip Planner"})
        assert start_resp.status_code == 200
        start_data = start_resp.json()
        task_id = start_data["task_id"]
        assert task_id.startswith("sdlc-task-")
        assert start_data["status"] == "waiting_for_input"
        assert start_data["next_required_input"] == "requirements"
        assert start_data["progress"] == 10

        # 2. Validation: Empty requirements should be rejected
        empty_req = client.post(f"/sdlc/workflow/{task_id}/requirements", json={"task": "   "})
        assert empty_req.status_code == 400

        # 3. Validation: Out-of-order review before requirements submitted should fail
        premature_review = client.post(
            f"/sdlc/workflow/{task_id}/product_owner_review",
            json={"review_status": "approved", "feedback_reason": ""}
        )
        assert premature_review.status_code in (400, 409)

        # 4. Submit Requirements (AI Trip Planner prompt)
        req_statement = (
            "Build an intelligent travel planning application where a user provides destination, "
            "duration, budget and interests. The system should retrieve relevant weather, currency "
            "and travel information and generate a personalized day-by-day itinerary."
        )
        req_resp = client.post(f"/sdlc/workflow/{task_id}/requirements", json={"task": req_statement})
        assert req_resp.status_code == 200
        req_data = req_resp.json()

        # Verify single source of truth contract
        assert req_data["current_node"] == "auto_generate_user_stories"
        assert req_data["next_required_input"] == "product_owner_review"
        assert req_data["status"] == "waiting_for_input"
        assert req_data["progress"] == 30  # NOT 17%!

        stages = {s["id"]: s for s in req_data["stages"]}
        assert stages["requirements"]["completed"] is True
        assert stages["user_stories"]["completed"] is True
        assert stages["product_owner_review"]["waiting_for_input"] is True
        assert stages["product_owner_review"]["completed"] is False
        assert stages["design"]["status"] == "locked"

        # Verify structured artifacts are returned and NOT empty
        raw_state = req_data["data"]
        assert "user_stories" in raw_state
        assert len(raw_state["user_stories"]) > 0
        first_story = raw_state["user_stories"][0]
        assert "story_id" in first_story
        assert "title" in first_story
        assert "acceptance_criteria" in first_story

        # 5. PATH B: Test Rejection & Revision Loop
        # Rejection without feedback must fail with 400
        reject_no_feedback = client.post(
            f"/sdlc/workflow/{task_id}/product_owner_review",
            json={"review_status": "needs_revision", "feedback_reason": ""}
        )
        assert reject_no_feedback.status_code == 400

        # Rejection with actionable feedback
        feedback_text = "The user stories should include acceptance criteria for budget validation and weather-based recommendations."
        reject_resp = client.post(
            f"/sdlc/workflow/{task_id}/product_owner_review",
            json={"review_status": "needs_revision", "feedback_reason": feedback_text}
        )
        assert reject_resp.status_code == 200
        reject_data = reject_resp.json()

        # Verify LangGraph regenerated user stories and is waiting for product_owner_review again
        assert reject_data["current_node"] == "auto_generate_user_stories"
        assert reject_data["next_required_input"] == "product_owner_review"
        assert reject_data["status"] == "waiting_for_input"
        assert reject_data["progress"] == 30

        # 6. PATH A: Test Approval & Transition to Design
        approve_resp = client.post(
            f"/sdlc/workflow/{task_id}/product_owner_review",
            json={"review_status": "approved", "feedback_reason": "Looks good, proceed to design"}
        )
        assert approve_resp.status_code == 200
        approve_data = approve_resp.json()

        # Verify Design stage was executed and now waiting at design_review
        assert approve_data["current_node"] == "create_design_document"
        assert approve_data["next_required_input"] == "design_review"
        assert approve_data["status"] == "waiting_for_input"
        assert approve_data["progress"] == 40

        design_stages = {s["id"]: s for s in approve_data["stages"]}
        assert design_stages["requirements"]["completed"] is True
        assert design_stages["user_stories"]["completed"] is True
        assert design_stages["product_owner_review"]["completed"] is True
        assert design_stages["design"]["completed"] is True
        assert design_stages["design_review"]["waiting_for_input"] is True
        assert design_stages["code_generation"]["status"] == "locked"

        # Verify Design Documents exist
        design_state = approve_data["data"]
        assert "design_documents" in design_state
        assert design_state["design_documents"].get("functional")
        assert design_state["design_documents"].get("technical")

        # 7. Verify GET /sdlc/workflow/{task_id}/state returns consistent contract
        get_state_resp = client.get(f"/sdlc/workflow/{task_id}/state")
        assert get_state_resp.status_code == 200
        synced_state = get_state_resp.json()
        assert synced_state["workflow_id"] == task_id
        assert synced_state["active_stage"] == "design_review"
        assert synced_state["progress"] == 40
        assert len(synced_state["stages"]) == 13

        print("All workflow state synchronization and review path tests PASSED!")

if __name__ == "__main__":
    test_health_check()
    test_workflow_state_synchronization_and_review_paths()
