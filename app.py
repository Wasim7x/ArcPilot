import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import json
import uvicorn
import uuid
import asyncio
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from concurrent.futures import ThreadPoolExecutor
from src.cache.radis_cache import delete_from_redis, flush_redis_cache, get_state_from_redis, save_state_to_redis
from src.graph.graph_builder import GraphBuilder
from src.llm import GroqLLM, GeminiLLM, OpenAILLM
from src.state.sdlc_state import StartWorkflowRequest, StartWorkflowResponse



app = FastAPI(title="AI SDLC Orchestrator", version="2.0.0")

# ── CORS (allow the HTML frontend served from any origin / file://) ────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schemas ────────────────────────────────────────────────────────────────────
class LLMConfigRequest(BaseModel):
    provider: str   # "Groq" | "OpenAI" | "Gemini"
    model: str
    api_key: str


class RequirementsRequest(BaseModel):
    task: str


class ReviewRequest(BaseModel):
    review_status: str    # "approved" | "rejected" | "needs_revision"
    feedback_reason: str = ""


# ── Helpers ────────────────────────────────────────────────────────────────────
def _build_llm(provider: str, model: str, api_key: str):
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
    return GraphBuilder(llm=llm).setup_graph()


def _check_graph():
    if app.state.graph is None:
        raise HTTPException(
            status_code=503,
            detail="LLM not configured. POST /config/llm first."
        )


def _check_task(task_id: str):
    state = get_state_from_redis(task_id)
    if not state:
        raise HTTPException(
            status_code=404,
            detail=f"Task {task_id} not found. Start a workflow first."
        )
    return state


def _serialize_state(state_obj) -> dict:
    """Convert LangGraph state tuple/object to a plain dict safe to return as JSON."""
    if isinstance(state_obj, (list, tuple)):
        raw = state_obj[0] if state_obj else {}
    else:
        raw = state_obj
    # Ensure all values are JSON-serialisable
    try:
        return json.loads(json.dumps(raw, default=str))
    except Exception:
        return {}


# ── Startup ────────────────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup_event():
    app.state.llm_config = {
        "provider": "Groq",
        "model": "llama-3.3-70b-versatile",
        "api_key": ""
    }
    app.state.llm = None
    app.state.graph = None
    app.state.executor = ThreadPoolExecutor(max_workers=4)


# ── /config/llm ───────────────────────────────────────────────────────────────
@app.post("/config/llm")
async def configure_llm(request: LLMConfigRequest):
    """Hot-swap the LLM provider / model / key at runtime."""
    try:
        llm = _build_llm(request.provider, request.model, request.api_key)
        graph = _rebuild_graph(llm)
        app.state.llm = llm
        app.state.graph = graph
        app.state.llm_config = {
            "provider": request.provider,
            "model": request.model,
            "api_key": "***",
        }
        return {
            "status": "ok",
            "provider": request.provider,
            "model": request.model
        }
    except Exception as e:
        return {"status": "error", "detail": str(e)}


@app.get("/config/llm")
async def get_llm_config():
    """Return the active LLM configuration (key redacted)."""
    return app.state.llm_config


# ── /sdlc/workflow/start ──────────────────────────────────────────────────────
@app.post("/sdlc/workflow/start", response_model=StartWorkflowResponse)
async def start_workflow(request: StartWorkflowRequest):
    """Initialise a new SDLC workflow session."""
    _check_graph()
    flush_redis_cache()

    task_id = f"sdlc-task-{uuid.uuid4().hex[:8]}"
    graph = app.state.graph
    thread = {"configurable": {"thread_id": task_id}}

    def run_workflow():
        for event in graph.stream(
            {"project_name": request.project_name}, thread, stream_mode="values"
        ):
            print(f"[start] event: {event}")
        return graph.get_state(thread)

    loop = asyncio.get_event_loop()
    current_state = await loop.run_in_executor(app.state.executor, run_workflow)
    save_state_to_redis(task_id, current_state)

    state = current_state[0]
    return StartWorkflowResponse(
        task_id=task_id,
        status=state.get("status", ""),
        next_required_input=state.get("next_required_input", ""),
        progress=state.get("progress", ""),
        current_node=state.get("current_node", ""),
    )


# ── /sdlc/workflow/{task_id}/requirements ─────────────────────────────────────
@app.post("/sdlc/workflow/{task_id}/requirements")
async def get_project_requirements(task_id: str, body: RequirementsRequest):
    """Accept a natural-language task, extract requirements, and resume the graph."""
    _check_graph()
    saved_state = _check_task(task_id)

    requirements = _split_task_to_requirements(body.task)
    saved_state["requirements"] = requirements

    graph = app.state.graph
    thread = {"configurable": {"thread_id": task_id}}
    graph.update_state(thread, saved_state, as_node="get_requirements")

    state = None
    async for event in graph.astream(None, thread, stream_mode="values"):
        print(f"[requirements] event: {event}")
        state = event

    current_state = graph.get_state(thread)
    save_state_to_redis(task_id, current_state)

    return {
        "task_id": task_id,
        "data": _serialize_state(state) if state else _serialize_state(current_state)
    }


# ── Review endpoints ───────────────────────────────────────────────────────────
@app.post("/sdlc/workflow/{task_id}/product_owner_review")
async def product_owner_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "product_owner")


@app.post("/sdlc/workflow/{task_id}/design_review")
async def design_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "design")


@app.post("/sdlc/workflow/{task_id}/code_review")
async def code_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "code")


@app.post("/sdlc/workflow/{task_id}/security_review")
async def security_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "security")


@app.post("/sdlc/workflow/{task_id}/test_cases_review")
async def test_cases_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "testcase")


@app.post("/sdlc/workflow/{task_id}/qa_testing_review")
async def qa_testing_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "qa")


# ── /sdlc/workflow/{task_id}/state  (debug / polling) ─────────────────────────
@app.get("/sdlc/workflow/{task_id}/state")
async def get_workflow_state(task_id: str):
    """Return the current persisted state for a task (useful for debugging)."""
    saved = _check_task(task_id)
    return {"task_id": task_id, "state": _serialize_state(saved)}


# ── Internal helpers ───────────────────────────────────────────────────────────
def _split_task_to_requirements(task_statement: str) -> list[str]:
    prompt = f"""Task: Extract clear and concise requirements from the following statement.
Each requirement should be a standalone actionable point.
Do not include bullet points, numbering, or any prefix symbols in the output.
Output each requirement on its own line.

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
        print(f"[requirements split] error: {e}")
        return []


_REVIEW_MAP = {
    "product_owner": {
        "state_keys": lambda s, status, reason: s.update({
            "product_decision": status,
            "feedback_reason": reason,
        }),
        "node": "product_owner_review_decision",
    },
    "design": {
        "state_keys": lambda s, status, reason: s["design_documents"].update({
            "review_status": status,
            "feedback_reason": reason,
        }),
        "node": "design_review",
    },
    "code": {
        "state_keys": lambda s, status, reason: s.update({
            "code_review_status": status,
            "code_review_feedback": reason,
        }),
        "node": "code_review",
    },
    "security": {
        "state_keys": lambda s, status, reason: s.update({
            "security_review_status": status,
            "security_review_feedback": reason,
        }),
        "node": "security_review",
    },
    "testcase": {
        "state_keys": lambda s, status, reason: s.update({
            "test_case_review_status": status,
            "test_case_review_feedback": reason,
        }),
        "node": "test_cases_review",
    },
    "qa": {
        "state_keys": lambda s, status, reason: s.update({
            "qa_testing_status": status,
            "qa_testing_feedback": reason,
        }),
        "node": "qa_testing_review",
    },
}


async def _generic_review(task_id: str, body: ReviewRequest, review_type: str):
    _check_graph()
    saved_state = _check_task(task_id)

    meta = _REVIEW_MAP.get(review_type)
    if not meta:
        raise HTTPException(status_code=400, detail=f"Unsupported review type: {review_type}")

    try:
        meta["state_keys"](saved_state, body.review_status, body.feedback_reason)
    except (KeyError, TypeError) as e:
        raise HTTPException(
            status_code=422,
            detail=f"State structure error for review type '{review_type}': {e}"
        )

    graph = app.state.graph
    thread = {"configurable": {"thread_id": task_id}}
    graph.update_state(thread, saved_state, as_node=meta["node"])

    state = None
    async for event in graph.astream(None, thread, stream_mode="values"):
        print(f"[{review_type} review] event: {event}")
        state = event

    current_state = graph.get_state(thread)
    save_state_to_redis(task_id, current_state)

    return {
        "task_id": task_id,
        "data": _serialize_state(state) if state else _serialize_state(current_state)
    }


# ── Entry point ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
