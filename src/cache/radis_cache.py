import json
import os
from pathlib import Path
import threading
import time
from typing import Any

from dotenv import load_dotenv
import redis

from src.logger import logger
from src.state.sdlc_state import CustomEncoder

load_dotenv()

# Thread-safe disk-backed in-memory state store for reliable persistence
class InMemoryStateStore:
    """
    Thread-safe state store with disk backing so workflow sessions
    and checkpoints persist across server reloads and restarts even without Redis.
    """
    def __init__(self, cache_file: str | Path | None = None):
        self._store: dict[str, str] = {}
        self._lock = threading.Lock()
        if cache_file is None:
            artifacts_dir = os.getenv("ARTIFACTS_DIR", "artifacts")
            self._cache_file = Path(artifacts_dir) / ".state_cache.json"
        else:
            self._cache_file = Path(cache_file)
        self._load_from_disk()

    def _load_from_disk(self):
        try:
            if self._cache_file.is_file():
                content = self._cache_file.read_text(encoding="utf-8")
                if content.strip():
                    data = json.loads(content)
                    if isinstance(data, dict):
                        self._store.update(data)
                        logger.info(f"Loaded {len(data)} workflow checkpoints from persistent disk cache ({self._cache_file}).")
        except Exception as e:
            logger.warning(f"Could not load state cache from disk ({self._cache_file}): {e}")

    def _save_to_disk(self):
        try:
            self._cache_file.parent.mkdir(parents=True, exist_ok=True)
            temp_file = self._cache_file.with_suffix(".tmp")
            temp_file.write_text(json.dumps(self._store), encoding="utf-8")
            temp_file.replace(self._cache_file)
        except Exception as e:
            logger.warning(f"Could not persist state cache to disk ({self._cache_file}): {e}")

    def set(self, key: str, value: str, expire_seconds: int = 86400):
        with self._lock:
            self._store[key] = value
            self._save_to_disk()

    def get(self, key: str) -> str | None:
        with self._lock:
            return self._store.get(key)

    def delete(self, key: str):
        with self._lock:
            if key in self._store:
                self._store.pop(key, None)
                self._save_to_disk()

    def clear_pattern(self, pattern: str):
        prefix = pattern.rstrip("*")
        with self._lock:
            keys_to_delete = [k for k in self._store if k.startswith(prefix)]
            for k in keys_to_delete:
                self._store.pop(k, None)
            if keys_to_delete:
                self._save_to_disk()

_memory_store = InMemoryStateStore()

def is_redis_enabled() -> bool:
    """
    Check if Redis is explicitly enabled in the environment.
    Defaults to False if not set or if ENABLE_REDIS is false/0/no.
    """
    val = os.getenv("ENABLE_REDIS", "false").strip().lower()
    return val in ("true", "1", "yes")

_redis_client: redis.Redis | None = None
_last_redis_check_time: float = 0.0
_redis_check_cooldown: float = 5.0  # seconds between reconnect attempts

def get_redis_client() -> redis.Redis | None:
    """
    Lazy / resilient Redis connection manager.
    Respects ENABLE_REDIS setting, avoids blocking when offline,
    and supports dynamic reconnection if Redis comes online.
    """
    global _redis_client, _last_redis_check_time

    if not is_redis_enabled():
        return None

    now = time.time()
    if _redis_client is not None:
        try:
            _redis_client.ping()
            return _redis_client
        except Exception:
            logger.warning("Redis connection lost. Will attempt reconnect.")
            _redis_client = None
            _last_redis_check_time = now

    # Throttle reconnect attempts to prevent repeated request latency
    if now - _last_redis_check_time < _redis_check_cooldown:
        return None

    _last_redis_check_time = now
    try:
        redis_url = os.getenv("REDIS_URL", "").strip()
        host = os.getenv("REDIS_HOST", "localhost")
        port = int(os.getenv("REDIS_PORT", "6379"))
        db = int(os.getenv("REDIS_DB", "0"))
        password = os.getenv("REDIS_PASSWORD") or None

        if redis_url:
            client = redis.Redis.from_url(
                redis_url,
                decode_responses=True,
                socket_connect_timeout=0.5,
                socket_timeout=1.0
            )
        else:
            client = redis.Redis(
                host=host,
                port=port,
                db=db,
                password=password,
                decode_responses=True,
                socket_connect_timeout=0.5,
                socket_timeout=1.0
            )

        client.ping()
        logger.info(f"Connected to Redis successfully ({host}:{port})")
        _redis_client = client
        return _redis_client
    except Exception as e:
        logger.warning(f"Redis is unavailable ({e}). Falling back to safe in-memory persistent state store.")
        _redis_client = None
        return None

def _get_redis_key(task_id: str) -> str:
    """Format isolated workflow key."""
    if task_id.startswith("sdlc:"):
        return task_id if task_id.endswith(":state") else f"{task_id}:state"
    return f"sdlc:{task_id}:state"

def is_redis_available() -> bool:
    client = get_redis_client()
    return client is not None

def save_state_to_redis(task_id: str, state: Any, expire_seconds: int = 86400):
    """
    Save workflow state to isolated key.
    Handles LangGraph state snapshots, tuples, dicts, and Pydantic models.
    Persists to Redis when available, and always mirrors to the persistent in-memory store.
    """
    key = _get_redis_key(task_id)

    # Normalize state object (handling LangGraph StateSnapshot)
    if hasattr(state, "values") and isinstance(state.values, dict):
        raw_state = state.values
    elif isinstance(state, (list, tuple)) and len(state) > 0:
        first = state[0]
        if hasattr(first, "values") and isinstance(first.values, dict):
            raw_state = first.values
        else:
            raw_state = first
    else:
        raw_state = state

    try:
        state_json = json.dumps(raw_state, cls=CustomEncoder)
    except Exception as e:
        logger.warning(f"CustomEncoder failed on state: {e}. Falling back to default=str.")
        state_json = json.dumps(raw_state, default=str)

    client = get_redis_client()
    if client:
        try:
            client.set(key, state_json)
            client.expire(key, expire_seconds)
            # Also keep in-memory fallback updated as safe buffer
            _memory_store.set(key, state_json, expire_seconds)
            return
        except Exception as e:
            logger.warning(f"Failed to persist state to Redis: {e}. Saving to in-memory fallback.")

    _memory_store.set(key, state_json, expire_seconds)

def get_state_from_redis(task_id: str) -> dict | None:
    """
    Retrieve workflow state for task_id as a plain dict.
    Returns None if task does not exist.
    """
    key = _get_redis_key(task_id)
    state_json = None

    client = get_redis_client()
    if client:
        try:
            state_json = client.get(key)
        except Exception as e:
            logger.warning(f"Failed to read state from Redis: {e}. Checking in-memory fallback.")

    if not state_json:
        state_json = _memory_store.get(key)

    if not state_json:
        return None

    try:
        data = json.loads(state_json)
        if isinstance(data, list) and len(data) > 0:
            return data[0]
        if isinstance(data, dict):
            return data
        return None
    except Exception as e:
        logger.error(f"Failed to deserialize state for task {task_id}: {e}")
        return None

def delete_from_redis(task_id: str):
    """Delete state for specific task_id without affecting other workflows."""
    key = _get_redis_key(task_id)
    client = get_redis_client()
    if client:
        try:
            client.delete(key)
        except Exception as e:
            logger.warning(f"Failed to remove key '{key}' from Redis cache: {e}")
    _memory_store.delete(key)

def flush_redis_cache(task_id: str | None = None):
    """
    Safely clean workflow cache.
    If task_id is provided, only deletes that workflow's key.
    If no task_id is provided, only cleans keys matching 'sdlc:*' (never flushall).
    """
    if task_id:
        delete_from_redis(task_id)
        return

    client = get_redis_client()
    if client:
        try:
            keys = client.keys("sdlc:*")
            if keys:
                client.delete(*keys)
                logger.info(f"Deleted {len(keys)} SDLC workflow keys from Redis.")
        except Exception as e:
            logger.warning(f"Error clearing SDLC keys from Redis: {e}")

    _memory_store.clear_pattern("sdlc:")
    logger.info("Cleared in-memory SDLC workflow cache.")

# Backward compatibility alias
def __getattr__(name: str):
    if name == "redis_client":
        return get_redis_client()
    raise AttributeError(f"module '{__name__}' has no attribute '{name}'")
