import pytest
from fastapi.testclient import TestClient

from app import _rebuild_graph, app
from src.llm import MockLLMProvider


@pytest.fixture(autouse=True)
def setup_mock_llm():
    mock_llm = MockLLMProvider().get_llm()
    app.state.llm = mock_llm
    app.state.graph = _rebuild_graph(mock_llm)
    app.state.llm_config = {"provider": "Mock", "model": "mock-model", "api_key": "***"}

def test_product_review_repeated_rejection_and_approval_loop():
    """
    Test Section 10 & 11 & 36 & 38:
    Product Review:
    Reject -> Feedback -> Revision -> Reject -> Feedback -> Revision -> Approve -> Design Review
    """
    with TestClient(app) as client:
        # Start workflow
        start_res = client.post("/workflow/start", json={"project_name": "Trip Planner Loop Test"})
        assert start_res.status_code == 200
        task_id = start_res.json()["task_id"]

        # Submit requirements
        req_res = client.post(
            f"/workflow/{task_id}/requirements",
            json={"task": "Trip Planner with itinerary, weather, and budget calculation."}
        )
        assert req_res.status_code == 200
        data = req_res.json()
        assert data["next_required_input"] == "product_owner_review"
        first_stories = data["state"]["user_stories"]
        assert len(first_stories) > 0

        # 1. First Rejection: Reject without feedback must be blocked (400)
        rej_no_fb = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "request_changes", "feedback": "  "}
        )
        assert rej_no_fb.status_code == 400

        # First Rejection with feedback
        rej_res_1 = client.post(
            f"/workflow/{task_id}/review",
            json={
                "stage": "product_owner_review",
                "decision": "request_changes",
                "feedback": "Please add explicit criteria for multi-currency conversion in user stories."
            }
        )
        assert rej_res_1.status_code == 200
        data_rev_1 = rej_res_1.json()

        # Workflow MUST remain on product_owner_review (did not advance to design)
        assert data_rev_1["next_required_input"] == "product_owner_review"
        assert data_rev_1["progress"] == 30
        assert data_rev_1["status"] == "waiting_for_input"
        assert len(data_rev_1["state"]["user_stories"]) > 0

        # 2. Second Rejection: Reject again with new feedback
        rej_res_2 = client.post(
            f"/workflow/{task_id}/review",
            json={
                "stage": "product_owner_review",
                "decision": "request_changes",
                "feedback": "Also ensure weather forecasting acceptance criteria specify 7-day forecast."
            }
        )
        assert rej_res_2.status_code == 200
        data_rev_2 = rej_res_2.json()

        # Workflow MUST still remain on product_owner_review
        assert data_rev_2["next_required_input"] == "product_owner_review"
        assert data_rev_2["progress"] == 30
        assert data_rev_2["status"] == "waiting_for_input"

        # 3. Approval: Now approve after 2 revisions
        app_res = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "approve", "feedback": "Looks great now!"}
        )
        assert app_res.status_code == 200
        data_app = app_res.json()

        # Successfully advanced to design!
        assert data_app["current_node"] == "create_design_document"
        assert data_app["next_required_input"] == "design_review"
        assert data_app["progress"] == 40
        assert data_app["state"]["design_documents"] is not None

def test_design_review_rejection_and_approval_loop():
    """
    Test Section 12 & 37:
    Design Review:
    Reject -> Feedback -> Revision -> Design Review again -> Approve -> Code Generation
    """
    with TestClient(app) as client:
        # Start and advance to design_review
        start_res = client.post("/workflow/start", json={"project_name": "Design Review Test"})
        task_id = start_res.json()["task_id"]

        client.post(
            f"/workflow/{task_id}/requirements",
            json={"task": "Create travel itinerary planner with hotel booking."}
        )
        client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "approve"}
        )

        state_res = client.get(f"/workflow/{task_id}/state")
        assert state_res.json()["next_required_input"] == "design_review"

        # 1. Rejection on Design Review
        rej_design = client.post(
            f"/workflow/{task_id}/review",
            json={
                "stage": "design_review",
                "decision": "request_changes",
                "feedback": "Add indexing on hotel_id and user_id in the database schema."
            }
        )
        assert rej_design.status_code == 200
        revised_design_data = rej_design.json()

        # Must remain on design_review!
        assert revised_design_data["next_required_input"] == "design_review"
        assert revised_design_data["status"] == "waiting_for_input"

        # 2. Approve Design Review
        app_design = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "design_review", "decision": "approve"}
        )
        assert app_design.status_code == 200
        code_stage_data = app_design.json()

        # Must advance to code_review
        assert code_stage_data["current_node"] == "generate_code"
        assert code_stage_data["next_required_input"] == "code_review"
        assert code_stage_data["progress"] == 55

def test_backend_validation_and_concurrency_protection():
    """
    Test Section 32 & 33:
    Backend validation prevents invalid stage approvals, stage skipping, and double-submissions.
    """
    with TestClient(app) as client:
        start_res = client.post("/workflow/start", json={"project_name": "Validation Test"})
        task_id = start_res.json()["task_id"]

        # Cannot submit review before requirements
        bad_req = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "approve"}
        )
        assert bad_req.status_code == 409

        # Submit requirements
        client.post(
            f"/workflow/{task_id}/requirements",
            json={"task": "Build analytics service"}
        )

        # Cannot approve design_review when product_owner_review is active!
        wrong_stage = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "design_review", "decision": "approve"}
        )
        assert wrong_stage.status_code == 409
        assert "Currently waiting for: 'product_owner_review'" in wrong_stage.json()["detail"]

        # Approve product_owner_review
        app1 = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "approve"}
        )
        assert app1.status_code == 200

        # Cannot submit product_owner_review again after workflow advanced
        repeat_app = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "approve"}
        )
        assert repeat_app.status_code == 409

def test_workflow_state_persistence_and_summary():
    """
    Test Section 34:
    Workflow state survives client disconnect / reload.
    """
    with TestClient(app) as client:
        start_res = client.post("/workflow/start", json={"project_name": "Persistence Test"})
        task_id = start_res.json()["task_id"]

        client.post(
            f"/workflow/{task_id}/requirements",
            json={"task": "Build persistence test service"}
        )

        # Retrieve state via GET /workflow/{task_id}/state
        state_1 = client.get(f"/workflow/{task_id}/state").json()
        assert state_1["workflow_id"] == task_id
        assert state_1["status"] == "waiting_for_input"
        assert state_1["next_required_input"] == "product_owner_review"

        # Simulate browser reload / second client
        state_2 = client.get(f"/sdlc/workflow/{task_id}/state").json()
        assert state_2["workflow_id"] == task_id
        assert state_2["status"] == state_1["status"]
        assert len(state_2["state"]["user_stories"]) == len(state_1["state"]["user_stories"])
