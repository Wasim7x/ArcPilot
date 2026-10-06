from __future__ import annotations

import fnmatch
import shutil

import pytest
from fastapi.testclient import TestClient

from app import _rebuild_graph, app
from src.cache.checkpointer import DurableCheckpointSaver
from src.cache.radis_cache import (
    get_state_from_redis,
    save_state_to_redis,
    set_redis_client,
)
from src.llm import MockLLMProvider
from src.storage import (
    CompositeArtifactStorage,
    LocalStorage,
    RedisArtifactStorage,
    init_storage,
    set_artifact_storage,
    validate_persistence_config,
)
from src.tools.project_manager import ProjectManagerTool


class MockRedisClient:
    """Thread-safe in-memory Mock Redis implementation for complete test isolation."""

    def __init__(self):
        self.store: dict[str, str] = {}
        self.lists: dict[str, list[str]] = {}
        self.sets: dict[str, set[str]] = {}

    def ping(self) -> bool:
        return True

    def get(self, key: str) -> str | None:
        return self.store.get(key)

    def set(self, key: str, value: str, ex: int | None = None) -> bool:
        self.store[key] = str(value)
        return True

    def delete(self, *keys: str) -> int:
        count = 0
        for k in keys:
            if k in self.store:
                del self.store[k]
                count += 1
            if k in self.lists:
                del self.lists[k]
                count += 1
            if k in self.sets:
                del self.sets[k]
                count += 1
        return count

    def rpush(self, key: str, *values: str) -> int:
        if key not in self.lists:
            self.lists[key] = []
        for v in values:
            self.lists[key].append(str(v))
        return len(self.lists[key])

    def lindex(self, key: str, index: int) -> str | None:
        lst = self.lists.get(key, [])
        try:
            return lst[index]
        except IndexError:
            return None

    def lrange(self, key: str, start: int, end: int) -> list[str]:
        lst = self.lists.get(key, [])
        if end == -1:
            return list(lst[start:])
        return list(lst[start : end + 1])

    def sadd(self, key: str, *members: str) -> int:
        if key not in self.sets:
            self.sets[key] = set()
        initial = len(self.sets[key])
        for m in members:
            self.sets[key].add(str(m))
        return len(self.sets[key]) - initial

    def smembers(self, key: str) -> set[str]:
        return set(self.sets.get(key, set()))

    def srem(self, key: str, *members: str) -> int:
        s = self.sets.get(key, set())
        count = 0
        for m in members:
            if m in s:
                s.remove(m)
                count += 1
        return count

    def expire(self, key: str, seconds: int) -> bool:
        return True

    def exists(self, *keys: str) -> int:
        count = 0
        for k in keys:
            if k in self.store or k in self.lists or k in self.sets:
                count += 1
        return count

    def keys(self, pattern: str = "*") -> list[str]:
        all_keys = set(self.store.keys()) | set(self.lists.keys()) | set(self.sets.keys())
        return [k for k in all_keys if fnmatch.fnmatch(k, pattern)]


@pytest.fixture(autouse=True)
def setup_test_environment(tmp_path, monkeypatch):
    """Set up an isolated persistent directory and reset client state for each test run."""
    test_data_dir = tmp_path / "test_data"
    test_data_dir.mkdir(parents=True, exist_ok=True)
    monkeypatch.setenv("ARCPILOT_DATA_DIR", str(test_data_dir))
    monkeypatch.setenv("ENVIRONMENT", "development")
    monkeypatch.setenv("ENABLE_REDIS", "false")

    # Reset any injected clients/storages
    set_redis_client(None)
    set_artifact_storage(None)
    init_storage()

    # Configure app with Mock LLM
    mock_llm = MockLLMProvider().get_llm()
    app.state.llm = mock_llm
    app.state.graph = _rebuild_graph(mock_llm)
    app.state.llm_config = {
        "provider": "Mock",
        "model": "mock-model",
        "api_key": "***",
    }
    yield
    set_redis_client(None)
    set_artifact_storage(None)


# ==============================================================================
# TEST 1: Normal Workflow Checkpoint
# ==============================================================================
def test_1_normal_workflow_checkpoint():
    """
    Test 1: Normal workflow checkpoint
    workflow -> stage -> checkpoint -> advance -> verify persistence.
    """
    client = TestClient(app)

    # 1. Start workflow
    start_resp = client.post("/workflow/start", json={"project_name": "CheckpointApp"})
    assert start_resp.status_code == 200
    task_id = start_resp.json()["task_id"]
    assert task_id.startswith("sdlc-task-")
    assert start_resp.json()["next_required_input"] == "requirements"

    # 2. Checkpoint saved
    saved_state = get_state_from_redis(task_id)
    assert saved_state is not None
    assert saved_state["project_name"] == "CheckpointApp"

    # 3. Advance to requirements
    req_resp = client.post(
        f"/workflow/{task_id}/requirements",
        json={"task": "Create a secure user authentication service."},
    )
    assert req_resp.status_code == 200
    req_data = req_resp.json()
    assert req_data["next_required_input"] == "product_owner_review"

    # 4. Verify checkpoint is updated and contains generated stories
    persisted = get_state_from_redis(task_id)
    assert persisted is not None
    assert persisted["next_required_input"] == "product_owner_review"
    assert len(persisted.get("user_stories", [])) > 0


# ==============================================================================
# TEST 2: Restart Recovery
# ==============================================================================
def test_2_restart_recovery():
    """
    Test 2: Restart recovery
    checkpoint -> process restart -> restore -> resume workflow.
    """
    client = TestClient(app)

    # Start workflow and advance to product owner review
    start_resp = client.post("/workflow/start", json={"project_name": "RestartApp"})
    task_id = start_resp.json()["task_id"]
    client.post(
        f"/workflow/{task_id}/requirements",
        json={"task": "Build an order processing microservice."},
    )

    # State before restart
    pre_restart_state = get_state_from_redis(task_id)
    assert pre_restart_state["next_required_input"] == "product_owner_review"

    # --- SIMULATE PROCESS RESTART ---
    mock_llm = MockLLMProvider().get_llm()
    app.state.llm = mock_llm
    app.state.graph = _rebuild_graph(mock_llm)

    # Verify state is recovered after restart
    recovered_state = get_state_from_redis(task_id)
    assert recovered_state is not None
    assert recovered_state["task_id"] == task_id
    assert recovered_state["next_required_input"] == "product_owner_review"

    # Resume workflow from checkpoint after restart
    review_resp = client.post(
        f"/workflow/{task_id}/review",
        json={"stage": "product_owner_review", "decision": "approve"},
    )
    assert review_resp.status_code == 200
    resumed_data = review_resp.json()
    assert resumed_data["next_required_input"] == "design_review"
    assert resumed_data["progress"] >= 40


# ==============================================================================
# TEST 3: Redis Recovery (Pure External Redis Checkpointer)
# ==============================================================================
def test_3_redis_recovery(tmp_path, monkeypatch):
    """
    Test 3: Redis recovery
    save checkpoint to Redis -> disconnect application -> reconnect -> restore.
    Verifies that LangGraph checkpoint state, channel blobs, and writes are restored
    purely from Redis without any reliance on a local SQLite file.
    """
    mock_redis = MockRedisClient()
    set_redis_client(mock_redis)
    monkeypatch.setenv("ENABLE_REDIS", "true")

    # Use a non-existent db_path to guarantee SQLite is not used for recovery
    fake_db_path = tmp_path / "nonexistent" / "checkpoints.db"
    saver = DurableCheckpointSaver(db_path=fake_db_path)

    thread_id = "test-redis-thread-101"
    config = {"configurable": {"thread_id": thread_id, "checkpoint_ns": ""}}
    checkpoint = {
        "v": 1,
        "id": "cp-step-01",
        "ts": "2026-10-06T12:00:00",
        "channel_values": {
            "project_name": "RedisRecoveryApp",
            "progress": 65,
            "stage": "code_review",
        },
        "channel_versions": {
            "project_name": 1,
            "progress": 1,
            "stage": 1,
        },
        "versions_seen": {},
    }
    metadata = {"source": "input", "step": 1, "writes": {}}
    new_versions = {"project_name": 1, "progress": 1, "stage": 1}

    # 1. Save checkpoint to Redis
    saver.put(config, checkpoint, metadata, new_versions)
    saver.put_writes(
        {"configurable": {"thread_id": thread_id, "checkpoint_ns": "", "checkpoint_id": "cp-step-01"}},
        [("channel_output", "success")],
        task_id="task_001",
    )

    # Verify keys exist in Mock Redis
    assert f"sdlc:cp:{thread_id}::cp-step-01" in mock_redis.store
    assert f"sdlc:thread_cps:{thread_id}:" in mock_redis.lists

    # 2. Simulate application disconnect & process termination
    set_redis_client(None)

    # 3. Simulate new application process reconnecting to Redis
    set_redis_client(mock_redis)
    fresh_saver = DurableCheckpointSaver(db_path=tmp_path / "another_empty" / "checkpoints.db")

    # 4. Restore checkpoint tuple from Redis
    resumed_tuple = fresh_saver.get_tuple({"configurable": {"thread_id": thread_id, "checkpoint_ns": ""}})
    assert resumed_tuple is not None
    assert resumed_tuple.checkpoint["id"] == "cp-step-01"
    assert resumed_tuple.checkpoint["channel_values"]["project_name"] == "RedisRecoveryApp"
    assert resumed_tuple.checkpoint["channel_values"]["progress"] == 65
    assert resumed_tuple.checkpoint["channel_values"]["stage"] == "code_review"
    assert len(resumed_tuple.pending_writes) == 1
    assert resumed_tuple.pending_writes[0][1] == "channel_output"
    assert resumed_tuple.pending_writes[0][2] == "success"


# ==============================================================================
# TEST 4: Multiple Workflows Isolation
# ==============================================================================
def test_4_multiple_workflows_isolation():
    """
    Test 4: Multiple workflows
    workflow-A vs workflow-B: verify independent checkpointing and artifact isolation.
    """
    client = TestClient(app)

    # Start Workflow A
    resp_a = client.post("/workflow/start", json={"project_name": "ProjectAlpha"})
    task_a = resp_a.json()["task_id"]
    client.post(f"/workflow/{task_a}/requirements", json={"task": "Build Alpha Service."})

    # Start Workflow B
    resp_b = client.post("/workflow/start", json={"project_name": "ProjectBeta"})
    task_b = resp_b.json()["task_id"]
    client.post(f"/workflow/{task_b}/requirements", json={"task": "Build Beta Service."})

    # Verify states are completely isolated
    state_a = get_state_from_redis(task_a)
    state_b = get_state_from_redis(task_b)
    assert state_a["project_name"] == "ProjectAlpha"
    assert state_b["project_name"] == "ProjectBeta"
    assert task_a != task_b

    # Write separate project files
    ProjectManagerTool.write_project_files(task_a, {"alpha.py": "x = 'alpha'"})
    ProjectManagerTool.write_project_files(task_b, {"beta.py": "y = 'beta'"})

    files_a = ProjectManagerTool.read_all_project_files(task_a)
    files_b = ProjectManagerTool.read_all_project_files(task_b)
    assert "alpha.py" in files_a
    assert "alpha.py" not in files_b
    assert "beta.py" in files_b
    assert "beta.py" not in files_a


# ==============================================================================
# TEST 5: HITL Recovery Across Restart
# ==============================================================================
def test_5_hitl_recovery():
    """
    Test 5: HITL recovery
    interrupt -> restart -> restore interrupt state -> user approves -> continue.
    """
    client = TestClient(app)

    start_resp = client.post("/workflow/start", json={"project_name": "HITLApp"})
    task_id = start_resp.json()["task_id"]
    client.post(
        f"/workflow/{task_id}/requirements",
        json={"task": "Build a notification gateway with SMS and Email."},
    )

    # Workflow is waiting for PO review
    state_before = client.get(f"/sdlc/workflow/{task_id}/state").json()
    assert state_before["next_required_input"] == "product_owner_review"
    assert state_before["status"] == "waiting_for_input"

    # --- SIMULATE PROCESS RESTART ---
    mock_llm = MockLLMProvider().get_llm()
    app.state.llm = mock_llm
    app.state.graph = _rebuild_graph(mock_llm)

    # Workflow STILL waits for approval after restart
    state_after_restart = client.get(f"/sdlc/workflow/{task_id}/state").json()
    assert state_after_restart["next_required_input"] == "product_owner_review"
    assert state_after_restart["status"] == "waiting_for_input"

    # Human user approves after restart
    approve_resp = client.post(
        f"/workflow/{task_id}/review",
        json={
            "stage": "product_owner_review",
            "decision": "approve",
            "feedback": "LGTM, proceed to design.",
        },
    )
    assert approve_resp.status_code == 200
    res_data = approve_resp.json()
    assert res_data["next_required_input"] == "design_review"


# ==============================================================================
# TEST 6: Reject & Feedback Recovery
# ==============================================================================
def test_6_reject_and_feedback_recovery():
    """
    Test 6: Reject/feedback recovery
    reject -> feedback -> restart -> restore -> approve -> continue.
    """
    client = TestClient(app)

    start_resp = client.post("/workflow/start", json={"project_name": "FeedbackApp"})
    task_id = start_resp.json()["task_id"]
    client.post(
        f"/workflow/{task_id}/requirements",
        json={"task": "Build an inventory management system."},
    )

    # Reject with feedback
    feedback_text = "Please include low-stock alert notifications in the user stories."
    reject_resp = client.post(
        f"/workflow/{task_id}/review",
        json={
            "stage": "product_owner_review",
            "decision": "request_changes",
            "feedback": feedback_text,
        },
    )
    assert reject_resp.status_code == 200
    assert reject_resp.json()["next_required_input"] == "product_owner_review"

    # --- SIMULATE RESTART ---
    mock_llm = MockLLMProvider().get_llm()
    app.state.llm = mock_llm
    app.state.graph = _rebuild_graph(mock_llm)

    # Verify state remains correct after restart with feedback recorded
    reloaded_state = get_state_from_redis(task_id)
    assert reloaded_state is not None
    assert reloaded_state["next_required_input"] == "product_owner_review"
    assert reloaded_state.get("feedback_reason") == feedback_text

    # User now approves revised stories
    approve_resp = client.post(
        f"/workflow/{task_id}/review",
        json={
            "stage": "product_owner_review",
            "decision": "approve",
            "feedback": "Approved revised stories.",
        },
    )
    assert approve_resp.status_code == 200
    assert approve_resp.json()["next_required_input"] == "design_review"


# ==============================================================================
# TEST 7: Artifact Storage Recovery (Wiped Local Disk)
# ==============================================================================
def test_7_artifact_storage_recovery(tmp_path, monkeypatch):
    """
    Test 7: Artifact storage recovery
    generate artifact -> save external storage -> wipe local disk -> restart -> retrieve artifact & zip.
    Simulates a Free Render container restart where local disk is completely wiped.
    """
    client = TestClient(app)
    mock_redis = MockRedisClient()
    set_redis_client(mock_redis)
    monkeypatch.setenv("ENABLE_REDIS", "true")

    # Wire composite storage to MockRedis external storage
    local_storage = LocalStorage()
    external_storage = RedisArtifactStorage()
    composite = CompositeArtifactStorage(external=external_storage, local=local_storage)
    set_artifact_storage(composite)

    task_id = "sdlc-task-ephemeral-wipe"
    sample_files = {
        "app/main.py": "from fastapi import FastAPI\napp = FastAPI()\n",
        "tests/test_main.py": "def test_root(): assert True\n",
        "Dockerfile": "FROM python:3.11-slim\n",
    }

    # 1. Write project files and package ZIP
    ProjectManagerTool.write_project_files(task_id, sample_files)
    ProjectManagerTool.package_project_zip(task_id)

    # Verify artifacts exist in MockRedis external storage
    assert external_storage.exists(task_id)
    assert len(external_storage.get_files(task_id)) == 3
    assert external_storage.get_zip(task_id) is not None

    # Save state recording workflow completion
    save_state_to_redis(
        task_id,
        {
            "task_id": task_id,
            "project_name": "EphemeralTestApp",
            "status": "completed",
            "progress": 100,
        },
    )

    # 2. SIMULATE RENDER INSTANCE RESTART / CONTAINER DISK WIPE
    # Completely delete the local disk project directory and zip file
    projects_dir = tmp_path / "test_data" / "artifacts" / "projects"
    if projects_dir.exists():
        shutil.rmtree(projects_dir, ignore_errors=True)
    assert not projects_dir.exists()

    # Re-initialize application state and storage
    mock_llm = MockLLMProvider().get_llm()
    app.state.llm = mock_llm
    app.state.graph = _rebuild_graph(mock_llm)

    # 3. Retrieve files from external storage after disk wipe
    recovered_files = ProjectManagerTool.read_all_project_files(task_id)
    assert "app/main.py" in recovered_files
    assert "tests/test_main.py" in recovered_files
    assert "Dockerfile" in recovered_files

    # 4. Verify API artifacts endpoint returns recovered files
    art_resp = client.get(f"/sdlc/workflow/{task_id}/artifacts")
    assert art_resp.status_code == 200
    art_json = art_resp.json()
    assert art_json["total_files"] == 3
    assert "app/main.py" in art_json["files"]

    # 5. Verify API download endpoint serves recovered ZIP
    dl_resp = client.get(f"/sdlc/workflow/{task_id}/download")
    assert dl_resp.status_code == 200
    assert dl_resp.headers["content-type"] == "application/zip"
    assert len(dl_resp.content) > 0


# ==============================================================================
# TEST 8: Production Fallback Protection
# ==============================================================================
def test_8_production_safety_no_silent_fallback(monkeypatch):
    """
    Test 8: Production safety
    Verify that in ENVIRONMENT=production, if Redis is missing or unavailable,
    the system does NOT silently fall back to MemorySaver, SQLite, or local JSON.
    """
    monkeypatch.setenv("ENVIRONMENT", "production")
    monkeypatch.setenv("ENABLE_REDIS", "false")
    set_redis_client(None)

    # 1. Startup validation must fail immediately
    with pytest.raises(RuntimeError) as exc_info:
        validate_persistence_config()
    assert "PRODUCTION PERSISTENCE ERROR" in str(exc_info.value)
    assert "ENABLE_REDIS" in str(exc_info.value)

    # 2. State saving must fail rather than silently writing to disk
    with pytest.raises(RuntimeError) as exc_save:
        save_state_to_redis("task-prod-fail", {"foo": "bar"})
    assert "CRITICAL PRODUCTION ERROR" in str(exc_save.value)

    # 3. State retrieval must fail rather than silently reading from disk
    with pytest.raises(RuntimeError) as exc_get:
        get_state_from_redis("task-prod-fail")
    assert "CRITICAL PRODUCTION ERROR" in str(exc_get.value)

    # 4. Checkpointer must fail rather than writing to local SQLite
    checkpointer = DurableCheckpointSaver()
    cfg = {"configurable": {"thread_id": "prod-thread", "checkpoint_ns": ""}}
    cp = {"v": 1, "id": "1", "ts": "2026-10-06", "channel_values": {}, "channel_versions": {}, "versions_seen": {}}
    with pytest.raises(RuntimeError) as exc_cp:
        checkpointer.put(cfg, cp, {}, {})
    assert "CRITICAL PRODUCTION ERROR" in str(exc_cp.value)

    # 5. Health and readiness endpoints must reflect degraded readiness
    client = TestClient(app)
    health_resp = client.get("/health")
    assert health_resp.status_code == 200
    health_data = health_resp.json()
    assert health_data["status"] == "degraded"
    assert health_data["persistence"]["environment"] == "production"
    assert health_data["persistence"]["checkpoint_ready"] is False

    ready_resp = client.get("/ready")
    assert ready_resp.status_code == 503
    assert ready_resp.json()["status"] == "not_ready"
