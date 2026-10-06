import os
import sys
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent))

import asyncio
import json
import uuid
from concurrent.futures import ThreadPoolExecutor
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field

from src.cache.radis_cache import (
    get_state_from_redis,
    is_redis_available,
    save_state_to_redis,
)
from src.graph.graph_builder import GraphBuilder
from src.llm import get_llm_provider
from src.logger import logger
from src.state.sdlc_state import CustomEncoder, StartWorkflowRequest, StartWorkflowResponse
from src.tools.project_manager import ProjectManagerTool


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing ArcPilot server startup via lifespan...")
    from src.storage import get_storage_root, init_storage
    init_storage()
    if is_redis_available():
        logger.info("Redis connection established.")
    else:
        logger.info(f"Redis unavailable or disabled. Using durable local persistence at: {get_storage_root()}")
    app.state.executor = ThreadPoolExecutor(max_workers=8)
    default_provider = os.getenv("LLM_PROVIDER", "groq")
    default_model = os.getenv("LLM_MODEL")
    if not default_model:
        if default_provider.strip().lower() in ("ollama", "chatollama"):
            default_model = os.getenv("OLLAMA_MODEL", "qwen3.8:27b")
        else:
            default_model = "llama-3.3-70b-versatile"

    # Automatically initialize LLM if not already set and an API key is in environment
    try:
        if getattr(app.state, "llm", None) is None:
            provider_obj = get_llm_provider(default_provider, model_name=default_model)
            if provider_obj.validate_config():
                llm = provider_obj.get_llm()
                app.state.llm = llm
                app.state.graph = _rebuild_graph(llm)
                logger.info(f"Auto-configured active LLM provider: {default_provider} ({default_model})")
    except Exception as e:
        logger.warning(f"Default LLM auto-initialization skipped: {e}")

    yield
    logger.info("Shutting down ArcPilot server...")
    if hasattr(app.state, "executor"):
        app.state.executor.shutdown(wait=False)

app = FastAPI(
    title="ArcPilot — AI SDLC Orchestrator",
    description="Autonomous SDLC orchestration platform using LangGraph, multi-provider LLMs, and real automated verification.",
    version="2.0.0",
    lifespan=lifespan
)

# Initialize state objects immediately so they are always present
app.state.executor = ThreadPoolExecutor(max_workers=8)
app.state.active_processing_workflows = set()
app.state.llm = None
app.state.graph = None
default_prov = os.getenv("LLM_PROVIDER", "groq")
default_mod = os.getenv("LLM_MODEL") or (os.getenv("OLLAMA_MODEL", "qwen3.8:27b") if default_prov.strip().lower() in ("ollama", "chatollama") else "llama-3.3-70b-versatile")
app.state.llm_config = {
    "provider": default_prov,
    "model": default_mod,
    "api_key": "N/A (Local)" if default_prov.strip().lower() in ("ollama", "chatollama") else ("***" if os.getenv("GROQ_API_KEY") or os.getenv("OPENAI_API_KEY") or os.getenv("GEMINI_API_KEY") else "")
}


# ── CORS Middleware ────────────────────────────────────────────────────────────
raw_frontend_url = os.getenv("FRONTEND_URL", "")
cors_origins = [
    "https://arcpilot-ke68.onrender.com",
    "http://localhost:5173",
    "http://localhost:8000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000",
]
if raw_frontend_url:
    for url in raw_frontend_url.split(","):
        clean_url = url.strip().rstrip("/")
        if clean_url and clean_url not in cors_origins:
            cors_origins.append(clean_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request / Response Schemas ─────────────────────────────────────────────────
class LLMConfigRequest(BaseModel):
    provider: str = Field("Groq", description="Provider name: Groq, OpenAI, Gemini, Ollama, Mock")
    model: str | None = Field(None, description="Model identifier")
    api_key: str | None = Field(None, description="Provider API key")

class RequirementsRequest(BaseModel):
    task: str = Field(..., description="Natural-language task or requirement description")

class ReviewRequest(BaseModel):
    workflow_id: str | None = Field(None, description="Optional workflow or task ID")
    stage: str | None = Field(None, description="Review stage identifier (e.g. product_owner_review)")
    decision: str | None = Field(None, description="Review decision: approve | request_changes | reject")
    feedback: str | None = Field(None, description="Review feedback or revision comments")
    # Backwards compatibility fields
    review_status: str | None = Field(None, description="Legacy: approved | needs_revision | rejected")
    feedback_reason: str | None = Field(None, description="Legacy: feedback comments")

# ── Helpers ────────────────────────────────────────────────────────────────────
def _build_llm(provider: str, model: str | None = None, api_key: str | None = None):
    prov = get_llm_provider(provider_name=provider, api_key=api_key, model_name=model)
    return prov.get_llm()

def _rebuild_graph(llm, checkpointer=None):
    return GraphBuilder(llm=llm, checkpointer=checkpointer).setup_graph()

def _check_graph():
    if getattr(app.state, "graph", None) is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="LLM or Graph not initialized. Configure LLM first via POST /config/llm or environment variables."
        )

def _check_task(task_id: str) -> dict:
    state = get_state_from_redis(task_id)
    if not state:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Workflow session '{task_id}' not found. Please start a workflow first."
        )
    return state

def _serialize_state(state_obj) -> dict:
    if hasattr(state_obj, "values") and isinstance(state_obj.values, dict):
        raw = state_obj.values
    elif isinstance(state_obj, (list, tuple)) and len(state_obj) > 0:
        first = state_obj[0]
        if hasattr(first, "values") and isinstance(first.values, dict):
            raw = first.values
        else:
            raw = first
    else:
        raw = state_obj
    try:
        return json.loads(json.dumps(raw, cls=CustomEncoder, default=str))
    except Exception:
        return {}





# ── Health & Diagnostics Endpoints ─────────────────────────────────────────────
@app.get("/health", tags=["Diagnostics"])
async def health_check():
    """Lightweight system health check probe confirming FastAPI backend is alive."""
    from src.storage import get_storage_root
    return {
        "status": "ok",
        "service": "ArcPilot",
        "version": "2.0.0",
        "active_provider": app.state.llm_config.get("provider", "groq"),
        "persistence": {
            "storage_dir": str(get_storage_root()),
            "redis_connected": is_redis_available(),
        },
    }

@app.get("/ready", tags=["Diagnostics"])
async def readiness_check():
    """Readiness probe."""
    active_prov = (app.state.llm_config.get("provider") or os.getenv("LLM_PROVIDER", "")).strip().lower()
    is_ollama = active_prov in ("ollama", "chatollama")
    has_key = bool(os.getenv("GROQ_API_KEY") or os.getenv("OPENAI_API_KEY") or os.getenv("GEMINI_API_KEY"))
    if app.state.graph is None and not has_key and not is_ollama:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"status": "not_ready", "reason": "LLM not yet configured."}
        )
    return {"status": "ready"}

@app.get("/health/llm", tags=["Diagnostics"])
async def llm_health_check():
    """Diagnostic check on the active LLM provider."""
    prov_name = app.state.llm_config.get("provider", os.getenv("LLM_PROVIDER", "groq"))
    model_name = app.state.llm_config.get("model")
    try:
        prov = get_llm_provider(prov_name, model_name=model_name)
        return prov.check_health()
    except Exception as e:
        return {"status": "error", "provider": prov_name, "error": str(e)}

# ── LLM Configuration Endpoints ───────────────────────────────────────────────
@app.post("/config/llm", tags=["Configuration"])
async def configure_llm(request: LLMConfigRequest):
    """Hot-swap the LLM provider, model, and credentials at runtime."""
    try:
        prov = get_llm_provider(
            provider_name=request.provider,
            api_key=request.api_key,
            model_name=request.model
        )
        if request.provider.strip().lower() in ("ollama", "chatollama"):
            health = prov.check_health()
            if not health.get("server_running", False):
                raise ValueError("Local Ollama server is not running. Please start Ollama and try again.")
            if not health.get("model_available", False):
                raise ValueError(health.get("error", f"Model '{prov.model_name}' is not installed in Ollama. Please run 'ollama pull {prov.model_name}'."))

        llm = prov.get_llm()
        graph = _rebuild_graph(llm)

        app.state.llm = llm
        app.state.graph = graph
        is_local = request.provider.strip().lower() in ("ollama", "chatollama")
        app.state.llm_config = {
            "provider": request.provider,
            "model": request.model or prov.model_name,
            "api_key": "N/A (Local)" if is_local else ("***" if (request.api_key or getattr(prov, "api_key", None)) else ""),
        }
        logger.info(f"LLM successfully reconfigured to: {request.provider} ({request.model or prov.model_name})")
        return {
            "status": "ok",
            "provider": request.provider,
            "model": request.model or prov.model_name
        }
    except Exception as e:
        logger.error(f"Error configuring LLM: {e}")
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"status": "error", "detail": str(e)}
        )

@app.get("/config/llm", tags=["Configuration"])
async def get_llm_config():
    """Return active LLM configuration (secrets masked)."""
    return app.state.llm_config

# ── Workflow Lifecycle Endpoints ──────────────────────────────────────────────
@app.post("/workflow/start", response_model=StartWorkflowResponse, tags=["Workflow"])
@app.post("/sdlc/workflow/start", response_model=StartWorkflowResponse, tags=["Workflow"])
async def start_workflow(request: StartWorkflowRequest):
    """
    Initialize a new isolated SDLC workflow session.
    Never flushes the global Redis cache.
    """
    _check_graph()

    task_id = f"sdlc-task-{uuid.uuid4().hex[:8]}"
    graph = app.state.graph
    thread = {"configurable": {"thread_id": task_id}}

    logger.info(f"Starting workflow for project '{request.project_name}' with Task ID: {task_id}")

    initial_input = {
        "project_name": request.project_name,
        "task_id": task_id,
        "task": request.initial_context.get("task", "") if request.initial_context else ""
    }

    def run_workflow():
        for event in graph.stream(initial_input, thread, stream_mode="values"):
            pass
        return graph.get_state(thread)

    loop = asyncio.get_event_loop()
    if getattr(app.state, "executor", None) is None or getattr(app.state.executor, "_shutdown", False):
        app.state.executor = ThreadPoolExecutor(max_workers=8)
    current_state = await loop.run_in_executor(app.state.executor, run_workflow)
    save_state_to_redis(task_id, current_state)

    state = current_state[0] if isinstance(current_state, (list, tuple)) else current_state
    serialized = _serialize_state(state)
    summary = _build_workflow_summary(task_id, serialized)
    return StartWorkflowResponse(
        task_id=task_id,
        status=summary["status"],
        next_required_input=summary["next_required_input"],
        progress=summary["progress"],
        current_node=summary["current_node"],
    )

@app.post("/workflow/{task_id}/requirements", tags=["Workflow"])
@app.post("/sdlc/workflow/{task_id}/requirements", tags=["Workflow"])
async def submit_requirements(task_id: str, body: RequirementsRequest):
    """Accept natural-language requirements, decompose into structured models, and advance the graph."""
    _check_graph()
    saved_state = _check_task(task_id)

    if not body.task.strip():
        raise HTTPException(status_code=400, detail="Requirement description cannot be empty.")

    current_input = saved_state.get("next_required_input")
    if current_input != "requirements":
        raise HTTPException(
            status_code=409 if current_input else 400,
            detail=f"Cannot submit requirements at this time. Workflow is currently waiting for: '{current_input}'."
        )

    if task_id in app.state.active_processing_workflows:
        raise HTTPException(
            status_code=409,
            detail=f"Workflow '{task_id}' is currently processing another action. Please wait."
        )

    app.state.active_processing_workflows.add(task_id)
    try:
        # Store user task statement and task_id in state
        saved_state["task"] = body.task
        saved_state["task_id"] = task_id

        # Decompose requirements into structured models & legacy list
        from src.node.sdlc_node import SDLCNode
        sdlc_node = SDLCNode(app.state.llm)
        saved_state = sdlc_node.get_requirements(saved_state)

        graph = app.state.graph
        thread = {"configurable": {"thread_id": task_id}}
        graph.update_state(thread, saved_state, as_node="get_requirements")

        state = None
        async for event in graph.astream(None, thread, stream_mode="values"):
            state = event

        current_state = graph.get_state(thread)
        save_state_to_redis(task_id, current_state)

        serialized = _serialize_state(state) if state else _serialize_state(current_state)
        summary = _build_workflow_summary(task_id, serialized)

        return {
            "task_id": task_id,
            "data": serialized,
            "state": serialized,
            "workflow": summary,
            **summary
        }
    finally:
        app.state.active_processing_workflows.discard(task_id)


# ── Human Review Endpoints ────────────────────────────────────────────────────
@app.post("/workflow/{task_id}/review", tags=["Reviews"])
@app.post("/sdlc/workflow/{task_id}/review", tags=["Reviews"])
async def submit_unified_review(task_id: str, body: ReviewRequest):
    """
    Unified review submission endpoint for all SDLC review stages.
    Accepts explicit decision ('approve' | 'request_changes') and feedback notes.
    """
    saved_state = _check_task(task_id)
    stage = body.stage or saved_state.get("next_required_input")
    if not stage:
        raise HTTPException(status_code=400, detail="Cannot determine review stage. Please specify 'stage'.")
    review_type = STAGE_TO_REVIEW_TYPE.get(stage)
    if not review_type:
        raise HTTPException(status_code=400, detail=f"Unsupported review stage: '{stage}'.")
    return await _generic_review(task_id, body, review_type)

@app.post("/workflow/{task_id}/product_owner_review", tags=["Reviews"])
@app.post("/sdlc/workflow/{task_id}/product_owner_review", tags=["Reviews"])
async def product_owner_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "product_owner")

@app.post("/workflow/{task_id}/design_review", tags=["Reviews"])
@app.post("/sdlc/workflow/{task_id}/design_review", tags=["Reviews"])
async def design_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "design")

@app.post("/workflow/{task_id}/code_review", tags=["Reviews"])
@app.post("/sdlc/workflow/{task_id}/code_review", tags=["Reviews"])
async def code_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "code")

@app.post("/workflow/{task_id}/security_review", tags=["Reviews"])
@app.post("/sdlc/workflow/{task_id}/security_review", tags=["Reviews"])
async def security_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "security")

@app.post("/workflow/{task_id}/test_cases_review", tags=["Reviews"])
@app.post("/sdlc/workflow/{task_id}/test_cases_review", tags=["Reviews"])
async def test_cases_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "testcase")

@app.post("/workflow/{task_id}/qa_testing_review", tags=["Reviews"])
@app.post("/sdlc/workflow/{task_id}/qa_testing_review", tags=["Reviews"])
async def qa_testing_review(task_id: str, body: ReviewRequest):
    return await _generic_review(task_id, body, "qa")

# ── State, Artifacts & Download Endpoints ─────────────────────────────────────
@app.get("/sdlc/workflow/{task_id}/state", tags=["Workflow"])
async def get_workflow_state(task_id: str):
    """Return the full persisted state and single source of truth workflow summary."""
    saved = _check_task(task_id)
    serialized = _serialize_state(saved)
    summary = _build_workflow_summary(task_id, serialized)
    return {
        "task_id": task_id,
        "state": serialized,
        "data": serialized,
        "workflow": summary,
        **summary
    }

@app.get("/sdlc/workflow/{task_id}/download", tags=["Artifacts"])
async def download_project_zip(task_id: str):
    """Download the complete generated application package as a .zip file."""
    saved = get_state_from_redis(task_id) or {}
    deploy_result = saved.get("deployment_result") or {}
    zip_path = deploy_result.get("artifacts_path")
    if not zip_path or not os.path.isfile(zip_path):
        zip_path = ProjectManagerTool.package_project_zip(task_id)
    if not os.path.isfile(zip_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Archive for task '{task_id}' could not be located."
        )
    return FileResponse(
        path=zip_path,
        filename=f"{task_id}.zip",
        media_type="application/zip"
    )

@app.get("/sdlc/workflow/{task_id}/artifacts", tags=["Artifacts"])
async def list_project_artifacts(task_id: str):
    """List all generated files and paths in the project workspace."""
    saved = get_state_from_redis(task_id) or {}
    project_dir = saved.get("generated_project_path")
    if project_dir and os.path.isdir(project_dir):
        files = {}
        for p in Path(project_dir).rglob("*"):
            if p.is_file() and not p.name.endswith(".zip") and ".git" not in str(p) and "__pycache__" not in str(p):
                rel_path = str(p.relative_to(project_dir)).replace("\\", "/")
                files[rel_path] = True
        return {
            "task_id": task_id,
            "total_files": len(files),
            "files": list(files.keys())
        }
    files = ProjectManagerTool.read_all_project_files(task_id)
    return {
        "task_id": task_id,
        "total_files": len(files),
        "files": list(files.keys())
    }


# ── Review Dispatcher Helper & Workflow Contract ──────────────────────────────
SDLC_WORKFLOW_STAGES = [
    {
        "id": "requirements",
        "label": "Requirements",
        "description": "Natural-Language Decomposition & Structured Spec",
        "type": "input",
    },
    {
        "id": "user_stories",
        "label": "User Stories",
        "description": "Agile Stories & Traceability Matrix Generation",
        "type": "automated",
    },
    {
        "id": "product_owner_review",
        "label": "Product Owner Review",
        "description": "Review and Approval Gate for Requirements & Stories",
        "type": "human_review",
        "endpoint": "product_owner_review",
    },
    {
        "id": "design",
        "label": "Architecture & Design",
        "description": "Functional & Technical Architecture Specifications",
        "type": "automated",
    },
    {
        "id": "design_review",
        "label": "Design Review",
        "description": "Technical Architecture Review Gate",
        "type": "human_review",
        "endpoint": "design_review",
    },
    {
        "id": "code_generation",
        "label": "Code Generation",
        "description": "Multi-File Project Implementation & Static Analysis",
        "type": "automated",
    },
    {
        "id": "code_review",
        "label": "Code Review",
        "description": "AST Syntax Verification & Quality Review Gate",
        "type": "human_review",
        "endpoint": "code_review",
    },
    {
        "id": "security_review",
        "label": "Security Review",
        "description": "Bandit SAST & Secret Leak Audit Review Gate",
        "type": "human_review",
        "endpoint": "security_review",
    },
    {
        "id": "test_generation",
        "label": "Test Case Generation",
        "description": "Comprehensive Unit, API & Integration Tests",
        "type": "automated",
    },
    {
        "id": "test_cases_review",
        "label": "Test Cases Review",
        "description": "Test Suite Verification & Coverage Review Gate",
        "type": "human_review",
        "endpoint": "test_cases_review",
    },
    {
        "id": "qa_testing",
        "label": "QA Testing & Repair",
        "description": "Isolated Subprocess Test Execution & Debug Loop",
        "type": "automated",
    },
    {
        "id": "qa_testing_review",
        "label": "QA Testing Review",
        "description": "Quality Gate Evaluation & Release Signoff",
        "type": "human_review",
        "endpoint": "qa_testing_review",
    },
    {
        "id": "deployment",
        "label": "Deployment & Packaging",
        "description": "Smoke Testing, Docker Verification & ZIP Packaging",
        "type": "automated",
    },
]

def _build_workflow_summary(task_id: str, state: dict) -> dict:
    """
    Computes single source of truth workflow state:
    Distinguishes completed artifacts, current processing node, waiting human input, and progress.
    """
    current_node = state.get("current_node", "project_initilization")
    next_required_input = state.get("next_required_input")
    progress = state.get("progress", 10)
    raw_status = state.get("status", "in_progress")

    is_waiting_for_input = bool(next_required_input and next_required_input not in ("end", "completed", "none"))
    if is_waiting_for_input:
        workflow_status = "waiting_for_input"
        active_stage = next_required_input
    elif raw_status == "completed" or progress >= 100:
        workflow_status = "completed"
        active_stage = "deployment"
    elif raw_status == "error":
        workflow_status = "error"
        active_stage = current_node
    else:
        workflow_status = "in_progress"
        active_stage = current_node

    stages = []
    for s in SDLC_WORKFLOW_STAGES:
        sid = s["id"]
        stage_info = dict(s)
        completed = False
        active = False
        waiting = False

        if sid == "requirements":
            completed = bool(state.get("requirements") or state.get("structured_requirements") or progress > 10)
            waiting = (next_required_input == "requirements")
            active = waiting or (current_node in ("project_initilization", "get_requirements") and not completed)
        elif sid == "user_stories":
            completed = bool(state.get("user_stories") and len(state.get("user_stories")) > 0)
            active = (current_node == "auto_generate_user_stories" and next_required_input != "product_owner_review")
        elif sid == "product_owner_review":
            waiting = (next_required_input == "product_owner_review")
            completed = bool((state.get("product_decision") in ("approved", "approve", "yes", "accept") and progress > 30) or bool(state.get("design_documents")) or progress >= 40)
            active = waiting
        elif sid == "design":
            completed = bool(state.get("design_documents") or progress > 40)
            active = (current_node == "create_design_document" and next_required_input != "design_review")
        elif sid == "design_review":
            waiting = (next_required_input == "design_review")
            completed = bool(bool(state.get("generated_files")) or bool(state.get("code_generated")) or progress > 45)
            active = waiting
        elif sid == "code_generation":
            completed = bool(bool(state.get("generated_files")) or bool(state.get("code_generated")) or progress > 55)
            active = (current_node == "generate_code" and next_required_input != "code_review")
        elif sid == "code_review":
            waiting = (next_required_input == "code_review")
            completed = bool(bool(state.get("security_report")) or progress > 60)
            active = waiting
        elif sid == "security_review":
            waiting = (next_required_input == "security_review")
            completed = bool(bool(state.get("test_cases")) or progress > 75)
            active = waiting
        elif sid == "test_generation":
            completed = bool(bool(state.get("test_cases")) or progress > 80)
            active = (current_node == "generate_test_cases" and next_required_input != "test_cases_review")
        elif sid == "test_cases_review":
            waiting = (next_required_input == "test_cases_review")
            completed = bool(bool(state.get("qa_report")) or bool(state.get("test_execution_results")) or progress > 85)
            active = waiting
        elif sid == "qa_testing":
            completed = bool(bool(state.get("qa_report")) or bool(state.get("test_execution_results")) or progress > 90)
            active = (current_node == "qa_testing" and next_required_input != "qa_testing_review")
        elif sid == "qa_testing_review":
            waiting = (next_required_input == "qa_testing_review")
            completed = bool(bool(state.get("deployment_result")) or progress >= 95)
            active = waiting
        elif sid == "deployment":
            completed = bool(state.get("deployment_status") in ("success", "completed") or raw_status == "completed" or progress >= 100)
            active = (current_node == "deployment" and not completed)

        if completed:
            status_str = "completed"
        elif waiting:
            status_str = "waiting_for_input"
        elif active:
            status_str = "active"
        else:
            status_str = "locked"

        stage_info["completed"] = completed
        stage_info["active"] = active
        stage_info["waiting_for_input"] = waiting
        stage_info["status"] = status_str
        stages.append(stage_info)

    stage_labels = {s["id"]: s["label"] for s in SDLC_WORKFLOW_STAGES}
    current_stage_label = stage_labels.get(active_stage, active_stage.replace("_", " ").title())
    waiting_for_input_label = stage_labels.get(next_required_input, next_required_input.replace("_", " ").title()) if next_required_input else None

    return {
        "workflow_id": task_id,
        "task_id": task_id,
        "status": workflow_status,
        "current_node": current_node,
        "next_required_input": next_required_input,
        "active_stage": active_stage,
        "current_stage_label": current_stage_label,
        "waiting_for_input_label": waiting_for_input_label,
        "progress": progress,
        "stages": stages,
    }


STAGE_TO_REVIEW_TYPE = {
    "product_owner_review": "product_owner",
    "product_owner": "product_owner",
    "design_review": "design",
    "design": "design",
    "code_review": "code",
    "code": "code",
    "security_review": "security",
    "security": "security",
    "test_cases_review": "testcase",
    "testcase": "testcase",
    "qa_testing_review": "qa",
    "qa": "qa",
}

_REVIEW_EXPECTED_INPUT = {
    "product_owner": "product_owner_review",
    "design": "design_review",
    "code": "code_review",
    "security": "security_review",
    "testcase": "test_cases_review",
    "qa": "qa_testing_review",
}

_REVIEW_MAP = {
    "product_owner": {
        "state_updater": lambda s, status, reason: s.update({
            "product_decision": status,
            "feedback_reason": reason,
        }),
        "node": "product_owner_review_decision",
    },
    "design": {
        "state_updater": lambda s, status, reason: (
            s.update({"feedback_reason": reason}),
            s.setdefault("design_documents", {}).update({
                "review_status": status,
                "feedback_reason": reason
            }) if isinstance(s.get("design_documents"), dict) else setattr(s.get("design_documents"), "review_status", status)
        ),
        "node": "design_review",
    },
    "code": {
        "state_updater": lambda s, status, reason: s.update({
            "code_review_status": status,
            "code_review_feedback": reason,
            "feedback_reason": reason,
        }),
        "node": "code_review",
    },
    "security": {
        "state_updater": lambda s, status, reason: s.update({
            "security_review_status": status,
            "security_review_feedback": reason,
            "feedback_reason": reason,
        }),
        "node": "security_review",
    },
    "testcase": {
        "state_updater": lambda s, status, reason: s.update({
            "test_case_review_status": status,
            "test_case_review_feedback": reason,
            "feedback_reason": reason,
        }),
        "node": "test_cases_review",
    },
    "qa": {
        "state_updater": lambda s, status, reason: s.update({
            "qa_testing_status": status,
            "qa_testing_feedback": reason,
            "feedback_reason": reason,
        }),
        "node": "qa_testing_review",
    },
}

async def _generic_review(task_id: str, body: ReviewRequest, review_type: str):
    _check_graph()
    saved_state = _check_task(task_id)

    meta = _REVIEW_MAP.get(review_type)
    if not meta:
        raise HTTPException(status_code=400, detail=f"Unsupported review type: '{review_type}'.")

    # Check if workflow is already completed
    if saved_state.get("status") == "completed" or saved_state.get("progress", 0) >= 100:
        raise HTTPException(
            status_code=409,
            detail=f"Workflow '{task_id}' is already completed."
        )

    # Normalize and validate decision
    raw_decision = (body.decision or body.review_status or "").strip().lower()
    if not raw_decision:
        raise HTTPException(
            status_code=400,
            detail="Missing review decision. Must be 'approve' or 'request_changes'."
        )
    if raw_decision in ("approve", "approved", "accept", "pass"):
        norm_decision = "approved"
    elif raw_decision in ("request_changes", "needs_revision", "revision", "reject", "rejected"):
        norm_decision = "needs_revision"
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid review decision: '{raw_decision}'. Allowed decisions are 'approve' or 'request_changes'."
        )

    # Validate review stage matches current waiting gate
    expected_input = _REVIEW_EXPECTED_INPUT.get(review_type)
    current_input = saved_state.get("next_required_input")
    if expected_input and current_input != expected_input:
        raise HTTPException(
            status_code=409,
            detail=f"Workflow is not waiting for this review. Currently waiting for: '{current_input}'."
        )

    # Validate feedback requirement on revision/rejection
    raw_feedback = (body.feedback if body.feedback is not None else (body.feedback_reason or "")).strip()
    if norm_decision == "needs_revision" and not raw_feedback:
        raise HTTPException(
            status_code=400,
            detail="Feedback comments are required when requesting revisions or rejecting so the AI agent knows what to fix."
        )

    # Double submission prevention: reject concurrent requests on same workflow
    if task_id in app.state.active_processing_workflows:
        raise HTTPException(
            status_code=409,
            detail=f"Workflow '{task_id}' is currently processing another action. Please wait."
        )

    app.state.active_processing_workflows.add(task_id)
    try:
        meta["state_updater"](saved_state, norm_decision, raw_feedback)
        saved_state["task_id"] = task_id

        graph = app.state.graph
        thread = {"configurable": {"thread_id": task_id}}
        graph.update_state(thread, saved_state, as_node=meta["node"])

        state = None
        async for event in graph.astream(None, thread, stream_mode="values"):
            state = event

        current_state = graph.get_state(thread)
        save_state_to_redis(task_id, current_state)

        serialized = _serialize_state(state) if state else _serialize_state(current_state)
        summary = _build_workflow_summary(task_id, serialized)

        return {
            "task_id": task_id,
            "data": serialized,
            "state": serialized,
            "workflow": summary,
            **summary
        }
    except Exception as e:
        logger.error(f"LangGraph resume failed for task {task_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Workflow resume failed: {str(e)}")
    finally:
        app.state.active_processing_workflows.discard(task_id)


# ── Extra Workflow Endpoints & Static UI Serving ──────────────────────────────
@app.get("/workflow/{task_id}/state", tags=["Workflow"])
async def get_workflow_state_alias(task_id: str):
    return await get_workflow_state(task_id)

@app.get("/workflow/{task_id}/download", tags=["Artifacts"])
async def download_project_zip_alias(task_id: str):
    return await download_project_zip(task_id)

@app.get("/workflow/{task_id}/artifacts", tags=["Artifacts"])
async def list_project_artifacts_alias(task_id: str):
    return await list_project_artifacts(task_id)

@app.get("/", include_in_schema=False)
async def serve_index():
    dist_index = Path(__file__).resolve().parent / "frontend" / "dist" / "index.html"
    if dist_index.is_file():
        return FileResponse(dist_index)
    return JSONResponse({"status": "ArcPilot API Online", "docs": "/docs", "frontend": "Build frontend via 'npm run build' inside frontend/"})

frontend_dist_dir = Path(__file__).resolve().parent / "frontend" / "dist"
if (frontend_dist_dir / "assets").is_dir():
    from starlette.staticfiles import StaticFiles
    app.mount("/assets", StaticFiles(directory=str(frontend_dist_dir / "assets")), name="frontend_assets")

# ── Main Entrypoint ────────────────────────────────────────────────────────────
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    reload_flag = os.environ.get("ENVIRONMENT", "").lower() == "development"
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=reload_flag)
