from fastapi.testclient import TestClient

from app import app


def test_unified_review_endpoint_contract():
    with TestClient(app) as client:
        # 1. Non-existent workflow should return 404
        resp_404 = client.post(
            "/workflow/non-existent-task-999/review",
            json={"stage": "product_owner_review", "decision": "approve", "feedback": ""}
        )
        assert resp_404.status_code == 404

        # 2. Start a real workflow
        start_resp = client.post("/workflow/start", json={"project_name": "Review Contract Test"})
        assert start_resp.status_code == 200
        task_id = start_resp.json()["task_id"]

        # 3. Premature review when waiting for requirements should return 409
        premature_resp = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "approve", "feedback": ""}
        )
        assert premature_resp.status_code == 409

        # 4. Invalid decision string should return 400
        invalid_dec = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "invalid_decision_string", "feedback": ""}
        )
        assert invalid_dec.status_code == 400

        # 5. Submit requirements to advance to product_owner_review
        req_resp = client.post(
            f"/workflow/{task_id}/requirements",
            json={"task": "Build a secure payment gateway integration service."}
        )
        assert req_resp.status_code == 200
        assert req_resp.json()["next_required_input"] == "product_owner_review"

        # 6. Reject / request_changes with empty feedback should return 400
        empty_fb_resp = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "request_changes", "feedback": "   "}
        )
        assert empty_fb_resp.status_code == 400
        assert "Feedback comments are required" in empty_fb_resp.json()["detail"]

        # 7. Approve via unified endpoint /workflow/{task_id}/review with {"decision": "approve"}
        approve_resp = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "approve", "feedback": ""}
        )
        assert approve_resp.status_code == 200
        approve_data = approve_resp.json()
        assert approve_data["current_node"] == "create_design_document"
        assert approve_data["next_required_input"] == "design_review"
        assert approve_data["progress"] == 40

        # 8. Out-of-stage review (submitting product_owner_review again when now at design_review) should return 409
        stale_review = client.post(
            f"/workflow/{task_id}/review",
            json={"stage": "product_owner_review", "decision": "approve", "feedback": ""}
        )
        assert stale_review.status_code == 409
