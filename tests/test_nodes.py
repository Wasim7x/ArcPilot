
import pytest

from src.llm import MockLLMProvider
from src.node.sdlc_node import SDLCNode
from src.node.worker.coder import CodeNode
from src.node.worker.deployment import deployment
from src.node.worker.doc_deginer import DesignNode
from src.node.worker.qa_testing import qa_testing
from src.node.worker.security import SecurityNode
from src.node.worker.testing import tester
from src.state.sdlc_state import SDLCState


@pytest.fixture
def mock_llm():
    return MockLLMProvider().get_llm()

def test_sdlc_node_initialization(mock_llm):
    node = SDLCNode(mock_llm)
    state: SDLCState = {"project_name": "Test App"}
    res = node.project_initilization(state)
    assert res["progress"] == 10
    assert res["status"] == "in_progress"
    assert res["current_node"] == "project_initilization"

def test_sdlc_node_get_requirements(mock_llm):
    node = SDLCNode(mock_llm)
    state: SDLCState = {
        "project_name": "AI Trip Planner",
        "task": "Create travel itinerary with weather and currency"
    }
    res = node.get_requirements(state)
    assert len(res["requirements"]) > 0
    assert res["structured_requirements"] is not None
    assert res["current_node"] == "get_requirements"

@pytest.mark.asyncio
async def test_sdlc_node_user_stories(mock_llm):
    node = SDLCNode(mock_llm)
    state: SDLCState = {
        "project_name": "AI Trip Planner",
        "requirements": ["Weather information", "Currency exchange rates"]
    }
    res = await node.auto_generate_user_stories(state)
    assert len(res["user_stories"]) == 2
    assert res["current_node"] == "auto_generate_user_stories"
    assert len(res["traceability_matrix"]) >= 2

def test_design_node(mock_llm):
    node = DesignNode(mock_llm)
    state: SDLCState = {
        "project_name": "AI Trip Planner",
        "requirements": ["Weather info"],
        "user_stories": [{"story_id": "US-01", "title": "Weather", "description": "View weather"}]
    }
    res = node.create_design_document(state)
    assert "design_documents" in res
    assert res["current_node"] == "create_design_document"
    assert node.design_review_router({"design_documents": {"review_status": "approved"}}) == "approved"

def test_code_node(mock_llm):
    node = CodeNode(mock_llm)
    state: SDLCState = {
        "project_name": "AI Trip Planner",
        "task_id": "task-test-code-node",
        "requirements": ["Weather integration", "Trip itinerary"],
        "user_stories": [{"title": "Trip Plan", "description": "Generate plan"}]
    }
    res = node.generate_code(state)
    assert "generated_files" in res
    assert len(res["generated_files"]) >= 4
    assert res["static_analysis"] is not None
    assert node.code_review_router({"code_review_status": "approved"}) == "approved"

def test_security_node(mock_llm):
    node = SecurityNode(mock_llm)
    state: SDLCState = {
        "project_name": "AI Trip Planner",
        "generated_files": {
            "app.py": "import os\ndef start(): return True\n"
        }
    }
    res = node.security_recommendations(state)
    assert "security_report" in res
    assert res["current_node"] == "generate_security_recommendations"
    assert node.security_review_router({"security_review_status": "approved"}) == "approved"

def test_testing_node(mock_llm):
    node = tester(mock_llm)
    state: SDLCState = {
        "project_name": "AI Trip Planner",
        "task_id": "task-test-testing-node",
        "requirements": ["Travel planner"],
        "generated_files": {"app/main.py": "def test(): return 1\n"}
    }
    res = node.generate_test_cases(state)
    assert "tests/test_services.py" in res["generated_files"] or "tests/test_main.py" in res["generated_files"]
    assert res["current_node"] == "generate_test_cases"
    assert node.test_cases_review_router({"test_case_review_status": "approved"}) == "approved"

def test_qa_testing_node(mock_llm):
    node = qa_testing(mock_llm)
    # First generate code with CodeNode so project files exist
    code_node = CodeNode(mock_llm)
    state: SDLCState = {
        "project_name": "AI Trip Planner",
        "task_id": "task-test-qa-node",
        "requirements": ["Plan trips"],
        "user_stories": []
    }
    code_res = code_node.generate_code(state)
    qa_res = node.qa_testing(code_res)
    assert "test_execution_results" in qa_res
    assert qa_res["qa_testing_status"] in ("approved", "needs_revision")
    assert qa_res["current_node"] == "qa_testing"
    assert node.qa_testing_review_router({"qa_testing_status": "approved"}) == "approved"

def test_deployment_node(mock_llm):
    node = deployment(mock_llm)
    code_node = CodeNode(mock_llm)
    state: SDLCState = {
        "project_name": "AI Trip Planner",
        "task_id": "task-test-deploy-node",
        "requirements": ["Plan trips"],
        "user_stories": []
    }
    code_res = code_node.generate_code(state)
    deploy_res = node.deployment(code_res)
    assert deploy_res["deployment_status"] == "success"
    assert deploy_res["deployment_result"]["smoke_test_passed"] is True
    assert deploy_res["deployment_result"]["artifacts_path"].endswith(".zip")
