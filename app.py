import json
import uvicorn
import uuid
import redis
from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from concurrent.futures import ThreadPoolExecutor
from src.cache.radis_cache import delete_from_redis, flush_redis_cache, get_state_from_redis, save_state_to_redis
from src.graph.graph_builder import GraphBuilder
from src.llm import GroqLLM, GeminiLLM, OpenAILLM
from src.state.sdlc_state import StartWorkflowRequest, StartWorkflowResponse

app = FastAPI()


# ── LLM config schema ─────────────────────────────────────────────────────────
class LLMConfigRequest(BaseModel):
    provider: str   # "Groq" | "OpenAI" | "Gemini"
    model: str
    api_key: str


# ── Helpers ───────────────────────────────────────────────────────────────────
def _build_llm(provider: str, model: str, api_key: str):
    """Instantiate the correct LLM wrapper based on provider name."""
    p = provider.strip().lower()
    if p == "groq":
        return GroqLLM(api_key=api_key, model_name=model).get_llm()
    elif p == "openai":
        return OpenAILLM(api_key=api_key, model_name=model).get_llm()
    elif p in ("gemini", "google"):
        return GeminiLLM(api_key=api_key, model_name=model).get_llm()
    else:
        raise ValueError(f"Unknown provider: {provider!r}")


def _rebuild_graph(llm):
    """Rebuild the LangGraph instance with a new LLM."""
    graph_builder = GraphBuilder(llm=llm)
    return graph_builder.setup_graph()


# ── Startup: load defaults ────────────────────────────────────────────────────
@app.on_event("startup")
async def startup_event():
    # Default to Groq with no key; configure via /config/llm before use.
    app.state.llm_config = {"provider": "Groq", "model": "llama-3.3-70b-versatile", "api_key": ""}
    app.state.llm = None
    app.state.graph = None
    app.state.executor = ThreadPoolExecutor(max_workers=3)


# ── /config/llm ───────────────────────────────────────────────────────────────
@app.post("/config/llm")
async def configure_llm(request: LLMConfigRequest):
    """
    Hot-swap the LLM provider/model/key at runtime.
    Must be called before starting any workflow.
    """
    try:
        llm = _build_llm(request.provider, request.model, request.api_key)
        graph = _rebuild_graph(llm)
        app.state.llm = llm
        app.state.graph = graph
        app.state.llm_config = {
            "provider": request.provider,
            "model": request.model,
            "api_key": "***",   # never echo the real key
        }
        return {"status": "ok", "provider": request.provider, "model": request.model}
    except Exception as e:
        return {"status": "error", "detail": str(e)}


@app.get("/config/llm")
async def get_llm_config():
    """Return the active LLM configuration (key redacted)."""
    return app.state.llm_config


# ── /sdlc/workflow/start ──────────────────────────────────────────────────────
@app.post("/sdlc/workflow/start", response_model=StartWorkflowResponse)
async def start_workflow(request: StartWorkflowRequest):
    """Starts the SDLC workflow."""
    if app.state.graph is None:
        raise HTTPException(status_code=503, detail="LLM not configured. POST /config/llm first.")

    flush_redis_cache()
    task_id = f"sdlc-task-{uuid.uuid4().hex[:8]}"
    graph = app.state.graph

    thread = {"configurable": {"thread_id": task_id}}
    
    # Run graph streaming in thread pool to avoid blocking async event loop
    def run_workflow():
        for event in graph.stream({"project_name": request.project_name}, thread, stream_mode="values"):
            print(event)
        return graph.get_state(thread)
    
    loop = __import__('asyncio').get_event_loop()
    current_state = await loop.run_in_executor(app.state.executor, run_workflow)
    
    save_state_to_redis(task_id, current_state)

    state = current_state[0]
    return StartWorkflowResponse(
        task_id=task_id,
        status=state["status"],
        next_required_input=state["next_required_input"],
        progress=state["progress"],
        current_node=state["current_node"],
    )


# ── /sdlc/workflow/{task_id}/requirements ────────────────────────────────────
@app.post("/sdlc/workflow/{task_id}/requirements")
async def get_project_requirements(task_id: str, request: Request):
    """Accepts a natural-language task statement, extracts requirements, resumes graph."""
    data = await request.json()
    task = data.get("task", "")

    graph = app.state.graph
    
    # Check if LLM is configured
    if graph is None:
        raise HTTPException(status_code=503, detail="LLM not configured. POST /config/llm first.")
    
    requirements = split_task_to_requirements(task_statement=task)

    saved_state = get_state_from_redis(task_id)
    
    # Check if task exists
    if not saved_state:
        raise HTTPException(status_code=404, detail=f"Task {task_id} not found. Start a workflow first.")
    
    saved_state["requirements"] = requirements

    thread = {"configurable": {"thread_id": task_id}}
    graph.update_state(thread, saved_state, as_node="get_requirements")

    state = None
    async for event in graph.astream(None, thread, stream_mode="values"):
        print(f"Event Received: {event}")
        state = event

    current_state = graph.get_state(thread)
    save_state_to_redis(task_id, current_state)

    return {"task_id": task_id, "data": state}


# ── Review endpoints (thin wrappers) ──────────────────────────────────────────
@app.post("/sdlc/workflow/{task_id}/product_owner_review")
async def product_owner_review(task_id: str, request: Request):
    return await generic_workflow_review(task_id, request, review_type="product_owner")


@app.post("/sdlc/workflow/{task_id}/design_review")
async def design_review(task_id: str, request: Request):
    return await generic_workflow_review(task_id, request, review_type="design")


@app.post("/sdlc/workflow/{task_id}/code_review")
async def code_review(task_id: str, request: Request):
    return await generic_workflow_review(task_id, request, review_type="code")


@app.post("/sdlc/workflow/{task_id}/security_review")
async def security_review(task_id: str, request: Request):
    return await generic_workflow_review(task_id, request, review_type="security")


@app.post("/sdlc/workflow/{task_id}/test_cases_review")
async def test_cases_review(task_id: str, request: Request):
    return await generic_workflow_review(task_id, request, review_type="testcase")


@app.post("/sdlc/workflow/{task_id}/qa_testing_review")
async def qa_testing_review(task_id: str, request: Request):
    return await generic_workflow_review(task_id, request, review_type="qa")


# ── Helpers ───────────────────────────────────────────────────────────────────
def split_task_to_requirements(task_statement: str) -> list[str]:
    prompt = f"""
Task: Extract clear and concise requirements from the following statement.
Each requirement should be a standalone actionable point.
Do not include bullet points in the output.

Example Input:
    Write an e-commerce application which should allow users to choose products from a catalog, add payments, and submit the order.

Example Output:
Allow users to choose products from a catalog.
Enable users to add payments.
Provide functionality for users to submit the order.

Input Statement:
{task_statement}

Output:
"""
    try:
        response = app.state.llm.invoke(prompt)
        return [line.strip() for line in response.content.splitlines() if line.strip()]
    except Exception as e:
        print(f"An error occurred: {e}")
        return []


async def generic_workflow_review(task_id: str, request: Request, review_type: str):
    data = await request.json()
    review_status = data.get("review_status", "")
    feedback_reason = data.get("feedback_reason", "")

    graph = app.state.graph
    
    # Check if LLM is configured
    if graph is None:
        raise HTTPException(status_code=503, detail="LLM not configured. POST /config/llm first.")
    
    saved_state = get_state_from_redis(task_id)
    
    # Check if task exists
    if not saved_state:
        raise HTTPException(status_code=404, detail=f"Task {task_id} not found. Start a workflow first.")

    if review_type == "product_owner":
        saved_state["product_decision"] = review_status
        saved_state["feedback_reason"] = feedback_reason
        node_name = "product_owner_review_decision"
    elif review_type == "design":
        saved_state["design_documents"]["review_status"] = review_status
        saved_state["design_documents"]["feedback_reason"] = feedback_reason
        node_name = "design_review"
    elif review_type == "code":
        saved_state["code_review_status"] = review_status
        saved_state["code_review_feedback"] = feedback_reason
        node_name = "code_review"
    elif review_type == "security":
        saved_state["security_review_status"] = review_status
        saved_state["security_review_feedback"] = feedback_reason
        node_name = "security_review"
    elif review_type == "testcase":
        saved_state["test_case_review_status"] = review_status
        saved_state["test_case_review_feedback"] = feedback_reason
        node_name = "test_cases_review"
    elif review_type == "qa":
        saved_state["qa_testing_status"] = review_status
        saved_state["qa_testing_feedback"] = feedback_reason
        node_name = "qa_testing_review"
    else:
        raise ValueError(f"Unsupported review type: {review_type}")

    thread = {"configurable": {"thread_id": task_id}}
    graph.update_state(thread, saved_state, as_node=node_name)

    state = None
    async for event in graph.astream(None, thread, stream_mode="values"):
        print(f"{review_type.capitalize()} Review Event Received: {event}")
        state = event

    current_state = graph.get_state(thread)
    save_state_to_redis(task_id, current_state)

    return {"task_id": task_id, "data": state}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
