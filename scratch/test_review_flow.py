import os
import sys
import asyncio
import json

# Ensure ArcPilot root and site-packages are on sys.path
sys.path.insert(0, "d:\\Wasim laptop\\profile_repo\\ArcPilot")

from fastapi.testclient import TestClient
import app as main_app
from src.state.sdlc_state import CustomEncoder

def test_full_review_lifecycle():
    with TestClient(main_app.app) as client:
        print("\n=======================================================")
        print("STARTING E2E REVIEW & LANGGRAPH INTEGRATION TEST")
        print("=======================================================")

        # 1. Health check
        res = client.get("/health")
        assert res.status_code == 200, f"Health check failed: {res.text}"
        health_data = res.json()
        print(f"[OK] Health check passed. Active provider: {health_data.get('active_provider')}")

        # 2. Start Workflow: AI Trip Planner
        project_name = "AI Trip Planner"
        print(f"\n1. Initializing workflow for '{project_name}'...")
        start_res = client.post("/workflow/start", json={
            "project_name": project_name,
            "initial_context": {}
        })
        assert start_res.status_code == 200, f"Start workflow failed: {start_res.text}"
        start_data = start_res.json()
        task_id = start_data["task_id"]
        print(f"[OK] Workflow started. Task ID: {task_id}")
        print(f"     Next Required Input: {start_data.get('next_required_input')}")
        assert start_data["next_required_input"] == "requirements"

        # 3. Submit Requirements
        requirements_text = (
            "Build an AI-powered travel itinerary planner application where users specify "
            "destinations, trip duration, budget, and travel preferences. The system should "
            "provide automated weather forecasting, currency exchange conversion, and daily schedules."
        )
        print(f"\n2. Submitting requirements for task '{task_id}'...")
        req_res = client.post(f"/workflow/{task_id}/requirements", json={
            "task": requirements_text
        })
        assert req_res.status_code == 200, f"Submit requirements failed: {req_res.text}"
        req_data = req_res.json()
        next_input = req_data.get("next_required_input")
        user_stories = req_data.get("data", {}).get("user_stories") or req_data.get("workflow", {}).get("user_stories", [])
        print(f"[OK] Requirements decomposed.")
        print(f"     Next Required Input: {next_input}")
        print(f"     Initial User Stories Count: {len(user_stories)}")
        assert next_input == "product_owner_review", f"Expected product_owner_review, got: {next_input}"
        assert len(user_stories) > 0, "No user stories generated!"

        initial_story_titles = [s.get("title") for s in user_stories]
        print(f"     Stories: {initial_story_titles[:3]}...")

        # 4. Validation Test: Rejection WITHOUT feedback must fail with HTTP 400
        print(f"\n3. Testing Backend Validation: Reject without feedback...")
        val_res = client.post(f"/workflow/{task_id}/review", json={
            "stage": "product_owner_review",
            "decision": "request_changes",
            "feedback": ""
        })
        assert val_res.status_code == 400, f"Expected 400 for empty feedback, got: {val_res.status_code}"
        print(f"[OK] Empty feedback rejected as expected: {val_res.json().get('detail')}")

        # 5. Validation Test: Invalid decision must fail with HTTP 400
        print(f"\n4. Testing Backend Validation: Invalid decision...")
        inv_res = client.post(f"/workflow/{task_id}/review", json={
            "stage": "product_owner_review",
            "decision": "maybe",
            "feedback": "some feedback"
        })
        assert inv_res.status_code == 400, f"Expected 400 for invalid decision, got: {inv_res.status_code}"
        print(f"[OK] Invalid decision rejected as expected: {inv_res.json().get('detail')}")

        # 6. Rejection Cycle 1: Submit feedback to revise user stories
        print(f"\n5. REJECTION CYCLE 1: Requesting changes on Product Owner Review...")
        feedback_1 = "Please add a specific user story for real-time local weather forecasts and severe weather alerts."
        rej1_res = client.post(f"/workflow/{task_id}/review", json={
            "stage": "product_owner_review",
            "decision": "request_changes",
            "feedback": feedback_1
        })
        assert rej1_res.status_code == 200, f"Rejection 1 failed: {rej1_res.text}"
        rej1_data = rej1_res.json()
        next_input_1 = rej1_data.get("next_required_input")
        revised_stories_1 = rej1_data.get("data", {}).get("user_stories") or []
        print(f"[OK] Rejection 1 processed successfully.")
        print(f"     Next Required Input: {next_input_1} (MUST BE 'product_owner_review')")
        assert next_input_1 == "product_owner_review", f"Workflow incorrectly moved to: {next_input_1}"
        print(f"     Revised User Stories Count: {len(revised_stories_1)}")
        assert len(revised_stories_1) > 0

        # 7. Rejection Cycle 2: Repeated rejection (MUST work without limit)
        print(f"\n6. REJECTION CYCLE 2: Repeated rejection on same review stage...")
        feedback_2 = "Please also add a dedicated user story for multi-currency expense tracking and offline expense logging."
        rej2_res = client.post(f"/workflow/{task_id}/review", json={
            "stage": "product_owner_review",
            "decision": "request_changes",
            "feedback": feedback_2
        })
        assert rej2_res.status_code == 200, f"Rejection 2 failed: {rej2_res.text}"
        rej2_data = rej2_res.json()
        next_input_2 = rej2_data.get("next_required_input")
        revised_stories_2 = rej2_data.get("data", {}).get("user_stories") or []
        print(f"[OK] Rejection 2 processed successfully.")
        print(f"     Next Required Input: {next_input_2} (MUST BE 'product_owner_review')")
        assert next_input_2 == "product_owner_review", f"Workflow incorrectly moved to: {next_input_2}"
        print(f"     Revised User Stories Count: {len(revised_stories_2)}")

        # 8. Approval: Approve & Continue
        print(f"\n7. APPROVAL: Submitting approval for Product Owner Review...")
        app_res = client.post(f"/workflow/{task_id}/review", json={
            "stage": "product_owner_review",
            "decision": "approve",
            "feedback": ""
        })
        assert app_res.status_code == 200, f"Approve failed: {app_res.text}"
        app_data = app_res.json()
        next_input_app = app_data.get("next_required_input")
        print(f"[OK] Approval processed successfully.")
        print(f"     Next Required Input: {next_input_app} (SHOULD ADVANCE TO 'design_review')")
        assert next_input_app == "design_review", f"Expected design_review, got: {next_input_app}"
        
        design_docs = app_data.get("data", {}).get("design_documents")
        assert design_docs is not None, "Design documents were not generated upon approval!"
        print(f"[OK] Architecture & Design documents successfully generated!")

        # 9. Verify duplicate approve protection:
        print(f"\n8. Testing Duplicate Approval Protection...")
        dup_res = client.post(f"/workflow/{task_id}/review", json={
            "stage": "product_owner_review",
            "decision": "approve",
            "feedback": ""
        })
        assert dup_res.status_code == 409, f"Expected 409 Conflict for duplicate approval, got: {dup_res.status_code}"
        print(f"[OK] Duplicate approval blocked with 409 Conflict: {dup_res.json().get('detail')}")

        # 10. Check persisted state from GET /workflow/{task_id}/state
        print(f"\n9. Verifying persisted state from GET /workflow/{task_id}/state...")
        state_res = client.get(f"/workflow/{task_id}/state")
        assert state_res.status_code == 200, f"Get state failed: {state_res.text}"
        state_data = state_res.json()
        assert state_data["next_required_input"] == "design_review"
        assert state_data["status"] == "waiting_for_input"
        print(f"[OK] Persisted state verified. Current gate: {state_data['next_required_input']}, Status: {state_data['status']}")

        print("\n=======================================================")
        print("ALL TESTS PASSED WITH 100% SUCCESS!")
        print("=======================================================\n")

if __name__ == "__main__":
    test_full_review_lifecycle()
