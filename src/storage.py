import abc
import base64
import json
import os
import zipfile
from io import BytesIO
from pathlib import Path
from typing import Any

from src.logger import logger


def is_production() -> bool:
    """Return True if running in production mode."""
    env = os.getenv("ENVIRONMENT", "development").strip().lower()
    return env in ("production", "prod")


def get_project_root() -> Path:
    """Return the repository root directory."""
    return Path(__file__).resolve().parent.parent


def get_storage_root() -> Path:
    """
    Get the local storage root directory for temporary workspaces and development caches.
    On Free Render, this filesystem is ephemeral.
    """
    data_dir = os.getenv("ARCPILOT_DATA_DIR", "").strip()
    if data_dir:
        p = Path(data_dir).resolve()
        p.mkdir(parents=True, exist_ok=True)
        return p

    data_dir_alt = os.getenv("DATA_DIR", "").strip()
    if data_dir_alt:
        p = Path(data_dir_alt).resolve()
        p.mkdir(parents=True, exist_ok=True)
        return p

    artifacts_dir = os.getenv("ARTIFACTS_DIR", "").strip()
    if artifacts_dir:
        p = Path(artifacts_dir).resolve()
        p.mkdir(parents=True, exist_ok=True)
        return p

    default_dir = get_project_root() / "artifacts"
    default_dir.mkdir(parents=True, exist_ok=True)
    return default_dir


def get_workflows_dir() -> Path:
    """Directory for workflow state snapshots and metadata."""
    root = get_storage_root()
    workflows_dir = root / "workflows"
    workflows_dir.mkdir(parents=True, exist_ok=True)
    return workflows_dir


def get_state_cache_file() -> Path:
    """Location of the primary .state_cache.json file (local development)."""
    root = get_storage_root()
    primary = get_workflows_dir() / ".state_cache.json"
    legacy = root / ".state_cache.json"
    if not primary.is_file() and legacy.is_file():
        return legacy
    return primary


def get_checkpoints_dir() -> Path:
    """Directory for local SQLite checkpoints (development mode)."""
    root = get_storage_root()
    checkpoints_dir = root / "checkpoints"
    checkpoints_dir.mkdir(parents=True, exist_ok=True)
    return checkpoints_dir


def get_checkpoints_db_path() -> Path:
    """Path to the local SQLite checkpoint database."""
    return get_checkpoints_dir() / "checkpoints.db"


def get_artifacts_dir() -> Path:
    """Directory for local generated artifacts and projects."""
    root = get_storage_root()
    if root.name == "artifacts":
        return root
    artifacts_dir = root / "artifacts"
    artifacts_dir.mkdir(parents=True, exist_ok=True)
    return artifacts_dir


def get_projects_dir() -> Path:
    """Directory for generated project workspaces on local disk."""
    projects_dir = get_artifacts_dir() / "projects"
    projects_dir.mkdir(parents=True, exist_ok=True)
    return projects_dir


def get_logs_dir() -> Path:
    """Directory for execution logs."""
    root = get_storage_root()
    if root.name == "artifacts":
        logs_dir = get_project_root() / "logs"
    else:
        logs_dir = root / "logs"
    logs_dir.mkdir(parents=True, exist_ok=True)
    return logs_dir


# ── Artifact Storage Abstraction ───────────────────────────────────────────────

class BaseArtifactStorage(abc.ABC):
    """Abstract interface for storing and retrieving generated code artifacts."""

    @property
    @abc.abstractmethod
    def provider_name(self) -> str:
        """Name of storage provider (e.g. 'redis', 'local', 's3')."""

    @abc.abstractmethod
    def is_ready(self) -> bool:
        """Return True if the storage provider is accessible."""

    @abc.abstractmethod
    def save_files(self, task_id: str, files: dict[str, str]) -> None:
        """Save a dictionary of relative file paths and text contents."""

    @abc.abstractmethod
    def get_files(self, task_id: str) -> dict[str, str]:
        """Retrieve all relative file paths and text contents for task_id."""

    @abc.abstractmethod
    def save_zip(self, task_id: str, zip_bytes: bytes) -> None:
        """Save the packaged ZIP binary archive for task_id."""

    @abc.abstractmethod
    def get_zip(self, task_id: str) -> bytes | None:
        """Retrieve the packaged ZIP binary archive for task_id."""

    @abc.abstractmethod
    def exists(self, task_id: str) -> bool:
        """Check whether artifacts exist for task_id."""

    @abc.abstractmethod
    def list_files(self, task_id: str) -> list[str]:
        """List relative file paths stored for task_id."""

    @abc.abstractmethod
    def delete(self, task_id: str) -> None:
        """Delete all artifacts stored for task_id."""


class LocalStorage(BaseArtifactStorage):
    """Local filesystem artifact storage (used for development and local testing)."""

    @property
    def provider_name(self) -> str:
        return "local"

    def is_ready(self) -> bool:
        try:
            p = get_projects_dir()
            return p.exists() and os.access(p, os.W_OK)
        except Exception:
            return False

    def _get_project_dir(self, task_id: str) -> Path:
        sanitized = task_id.replace(":", "_").replace("/", "_").replace("\\", "_")
        d = get_projects_dir() / sanitized
        d.mkdir(parents=True, exist_ok=True)
        return d

    def save_files(self, task_id: str, files: dict[str, str]) -> None:
        p_dir = self._get_project_dir(task_id)
        for rel_path, content in files.items():
            norm_rel = rel_path.replace("\\", "/").lstrip("/")
            target = p_dir / norm_rel
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content, encoding="utf-8")

    def get_files(self, task_id: str) -> dict[str, str]:
        p_dir = self._get_project_dir(task_id)
        if not p_dir.exists():
            return {}
        result = {}
        for p in p_dir.rglob("*"):
            if p.is_file() and not p.name.endswith(".zip") and ".git" not in str(p) and "__pycache__" not in str(p):
                rel_path = str(p.relative_to(p_dir)).replace("\\", "/")
                try:
                    result[rel_path] = p.read_text(encoding="utf-8", errors="replace")
                except Exception as e:
                    logger.warning(f"LocalStorage read error ({p}): {e}")
        return result

    def save_zip(self, task_id: str, zip_bytes: bytes) -> None:
        zip_path = get_projects_dir() / f"{task_id}.zip"
        zip_path.write_bytes(zip_bytes)

    def get_zip(self, task_id: str) -> bytes | None:
        zip_path = get_projects_dir() / f"{task_id}.zip"
        if zip_path.is_file():
            return zip_path.read_bytes()
        return None

    def exists(self, task_id: str) -> bool:
        p_dir = self._get_project_dir(task_id)
        zip_path = get_projects_dir() / f"{task_id}.zip"
        return (p_dir.exists() and any(p_dir.iterdir())) or zip_path.is_file()

    def list_files(self, task_id: str) -> list[str]:
        return list(self.get_files(task_id).keys())

    def delete(self, task_id: str) -> None:
        import shutil
        p_dir = self._get_project_dir(task_id)
        if p_dir.exists():
            shutil.rmtree(p_dir, ignore_errors=True)
        zip_path = get_projects_dir() / f"{task_id}.zip"
        if zip_path.is_file():
            zip_path.unlink(missing_ok=True)


class RedisArtifactStorage(BaseArtifactStorage):
    """
    Durable external Redis artifact storage for Free Render deployment.
    Stores project files and ZIP packages directly in external Redis,
    ensuring artifacts survive container wipes and restarts without persistent disk.
    """

    def __init__(self, ttl_seconds: int = 604800):  # Default 7 days
        self.ttl = ttl_seconds

    @property
    def provider_name(self) -> str:
        return "redis"

    def _get_client(self):
        from src.cache.radis_cache import get_redis_client
        return get_redis_client()

    def is_ready(self) -> bool:
        from src.cache.radis_cache import is_redis_available
        return is_redis_available()

    def _files_key(self, task_id: str) -> str:
        return f"sdlc:artifact:{task_id}:files"

    def _zip_key(self, task_id: str) -> str:
        return f"sdlc:artifact:{task_id}:zip"

    def save_files(self, task_id: str, files: dict[str, str]) -> None:
        client = self._get_client()
        if not client:
            raise RuntimeError("RedisArtifactStorage: Redis client unavailable.")
        key = self._files_key(task_id)
        payload = json.dumps(files)
        client.set(key, payload, ex=self.ttl)
        logger.info(f"ArtifactStorage: Persisted {len(files)} files to Redis key '{key}'")

    def get_files(self, task_id: str) -> dict[str, str]:
        client = self._get_client()
        if not client:
            return {}
        key = self._files_key(task_id)
        raw = client.get(key)
        if not raw:
            return {}
        try:
            return json.loads(raw)
        except Exception as e:
            logger.warning(f"ArtifactStorage: Deserialization error for key '{key}': {e}")
            return {}

    def save_zip(self, task_id: str, zip_bytes: bytes) -> None:
        client = self._get_client()
        if not client:
            raise RuntimeError("RedisArtifactStorage: Redis client unavailable.")
        key = self._zip_key(task_id)
        b64 = base64.b64encode(zip_bytes).decode("ascii")
        client.set(key, b64, ex=self.ttl)
        logger.info(f"ArtifactStorage: Persisted ZIP ({len(zip_bytes)} bytes) to Redis key '{key}'")

    def get_zip(self, task_id: str) -> bytes | None:
        client = self._get_client()
        if not client:
            return None
        key = self._zip_key(task_id)
        raw = client.get(key)
        if not raw:
            return None
        try:
            return base64.b64decode(raw)
        except Exception as e:
            logger.warning(f"ArtifactStorage: Base64 decode error for key '{key}': {e}")
            return None

    def exists(self, task_id: str) -> bool:
        client = self._get_client()
        if not client:
            return False
        return bool(client.exists(self._files_key(task_id)) or client.exists(self._zip_key(task_id)))

    def list_files(self, task_id: str) -> list[str]:
        return list(self.get_files(task_id).keys())

    def delete(self, task_id: str) -> None:
        client = self._get_client()
        if client:
            client.delete(self._files_key(task_id), self._zip_key(task_id))


class CompositeArtifactStorage(BaseArtifactStorage):
    """
    Production-grade composite storage:
    - Maintains a local workspace on disk so AST linters and Pytest subprocesses can execute.
    - Synchronizes files and ZIPs to durable external storage (Redis).
    - On server restarts or ephemeral disk wipes, automatically recovers files and ZIPs
      from external storage on-demand.
    """

    def __init__(self, external: BaseArtifactStorage, local: BaseArtifactStorage):
        self.external = external
        self.local = local

    @property
    def provider_name(self) -> str:
        return f"{self.external.provider_name}+local"

    def is_ready(self) -> bool:
        if is_production():
            return self.external.is_ready()
        return self.local.is_ready() or self.external.is_ready()

    def save_files(self, task_id: str, files: dict[str, str]) -> None:
        # Write to local workspace for tooling execution
        self.local.save_files(task_id, files)
        # Mirror to external durable storage
        if self.external.is_ready():
            try:
                self.external.save_files(task_id, files)
            except Exception as e:
                if is_production():
                    raise RuntimeError(f"Failed to persist artifacts to external storage: {e}") from e
                logger.warning(f"Could not persist files to external storage: {e}")

    def get_files(self, task_id: str) -> dict[str, str]:
        # Try local first
        files = self.local.get_files(task_id)
        if files:
            return files
        # Recover from external storage (e.g. after Render restart)
        if self.external.is_ready():
            files = self.external.get_files(task_id)
            if files:
                logger.info(f"CompositeArtifactStorage: Recovered {len(files)} files from external storage after restart.")
                # Re-materialize to local disk for local operations
                self.local.save_files(task_id, files)
                return files
        return {}

    def save_zip(self, task_id: str, zip_bytes: bytes) -> None:
        self.local.save_zip(task_id, zip_bytes)
        if self.external.is_ready():
            try:
                self.external.save_zip(task_id, zip_bytes)
            except Exception as e:
                if is_production():
                    raise RuntimeError(f"Failed to persist ZIP to external storage: {e}") from e
                logger.warning(f"Could not persist ZIP to external storage: {e}")

    def get_zip(self, task_id: str) -> bytes | None:
        zip_bytes = self.local.get_zip(task_id)
        if zip_bytes:
            return zip_bytes
        # Recover from external storage
        if self.external.is_ready():
            zip_bytes = self.external.get_zip(task_id)
            if zip_bytes:
                logger.info("CompositeArtifactStorage: Recovered project ZIP from external storage after restart.")
                self.local.save_zip(task_id, zip_bytes)
                return zip_bytes
        # If ZIP is missing but files exist, synthesize ZIP
        files = self.get_files(task_id)
        if files:
            buf = BytesIO()
            with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
                for rel_path, content in files.items():
                    z.writestr(rel_path, content)
            synthesized = buf.getvalue()
            self.save_zip(task_id, synthesized)
            return synthesized
        return None

    def exists(self, task_id: str) -> bool:
        return self.local.exists(task_id) or (self.external.is_ready() and self.external.exists(task_id))

    def list_files(self, task_id: str) -> list[str]:
        files = self.get_files(task_id)
        return list(files.keys())

    def delete(self, task_id: str) -> None:
        self.local.delete(task_id)
        if self.external.is_ready():
            self.external.delete(task_id)


_artifact_storage_instance: BaseArtifactStorage | None = None


def get_artifact_storage() -> BaseArtifactStorage:
    """Return the configured singleton ArtifactStorage."""
    global _artifact_storage_instance
    if _artifact_storage_instance is None:
        local = LocalStorage()
        external = RedisArtifactStorage()
        _artifact_storage_instance = CompositeArtifactStorage(external=external, local=local)
    return _artifact_storage_instance


def set_artifact_storage(storage: BaseArtifactStorage | None) -> None:
    """Set the active ArtifactStorage instance (useful for unit tests)."""
    global _artifact_storage_instance
    _artifact_storage_instance = storage


def validate_persistence_config() -> dict[str, Any]:
    """
    Validate persistence readiness at startup.
    In production mode, raises a clear RuntimeError if external Redis is not available,
    preventing silent failure on Render's ephemeral filesystem.
    """
    from src.cache.radis_cache import is_redis_available, is_redis_enabled

    prod = is_production()
    redis_en = is_redis_enabled()
    redis_conn = is_redis_available()

    if prod:
        if not redis_en:
            raise RuntimeError(
                "PRODUCTION PERSISTENCE ERROR: ArcPilot is running in production (ENVIRONMENT=production) "
                "on ephemeral infrastructure. External Redis is mandatory for workflow and checkpoint persistence. "
                "Please configure ENABLE_REDIS=true and REDIS_URL in your Render Environment."
            )
        if not redis_conn:
            raise RuntimeError(
                "PRODUCTION PERSISTENCE ERROR: ArcPilot cannot connect to the external Redis instance specified by REDIS_URL. "
                "Render Free Web Service containers are ephemeral and will lose state on restart without Redis. "
                "Verify your REDIS_URL and network accessibility."
            )

    storage = get_artifact_storage()
    return {
        "environment": "production" if prod else "development",
        "persistent_disk_required": False,
        "checkpoint_store": "redis" if redis_conn else ("sqlite" if not prod else "error"),
        "checkpoint_ready": redis_conn or not prod,
        "artifact_store": storage.provider_name,
        "artifact_store_ready": storage.is_ready(),
        "redis_connected": redis_conn,
    }


def init_storage() -> None:
    """Initialize local temporary directories and log persistence strategy."""
    root = get_storage_root()
    get_workflows_dir()
    get_checkpoints_dir()
    get_artifacts_dir()
    get_projects_dir()
    get_logs_dir()

    storage = get_artifact_storage()
    if is_production():
        logger.info(
            f"Production Persistence Active: External Redis for checkpoints & artifacts "
            f"(provider={storage.provider_name}). Local ephemeral workspace at {root} (No Persistent Disk needed)."
        )
    else:
        logger.info(
            f"Development Persistence Active: Local storage at {root} "
            f"(provider={storage.provider_name}, Redis={'connected' if storage.is_ready() else 'disabled'})."
        )
