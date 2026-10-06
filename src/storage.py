import os
from pathlib import Path

from src.logger import logger


def get_project_root() -> Path:
    """Return the repository root directory."""
    return Path(__file__).resolve().parent.parent


def get_storage_root() -> Path:
    """
    Get the centralized persistent storage root directory.
    Priority:
      1. ARCPILOT_DATA_DIR (e.g. /var/data on Render Persistent Disk)
      2. DATA_DIR
      3. ARTIFACTS_DIR (legacy fallback)
      4. <project_root>/artifacts (default local development)
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
    # If root is explicitly /var/data or a dedicated data root, nest under workflows
    workflows_dir = root / "workflows"
    workflows_dir.mkdir(parents=True, exist_ok=True)
    return workflows_dir


def get_state_cache_file() -> Path:
    """Location of the primary .state_cache.json file."""
    # Check if a state cache file already exists in workflows/ or root
    root = get_storage_root()
    primary = get_workflows_dir() / ".state_cache.json"
    legacy = root / ".state_cache.json"
    if not primary.is_file() and legacy.is_file():
        return legacy
    return primary


def get_checkpoints_dir() -> Path:
    """Directory for durable LangGraph checkpoints."""
    root = get_storage_root()
    checkpoints_dir = root / "checkpoints"
    checkpoints_dir.mkdir(parents=True, exist_ok=True)
    return checkpoints_dir


def get_checkpoints_db_path() -> Path:
    """Path to the SQLite checkpoint database."""
    return get_checkpoints_dir() / "checkpoints.db"


def get_artifacts_dir() -> Path:
    """
    Directory for generated artifacts and projects.
    If storage root is already named 'artifacts', use it directly;
    otherwise create an 'artifacts' subdirectory under the storage root.
    """
    root = get_storage_root()
    if root.name == "artifacts":
        return root
    artifacts_dir = root / "artifacts"
    artifacts_dir.mkdir(parents=True, exist_ok=True)
    return artifacts_dir


def get_projects_dir() -> Path:
    """Directory for generated project workspaces."""
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


def init_storage() -> None:
    """Initialize all persistent storage subdirectories and log confirmation."""
    root = get_storage_root()
    get_workflows_dir()
    get_checkpoints_dir()
    get_artifacts_dir()
    get_projects_dir()
    get_logs_dir()
    logger.info(f"Persistence initialized: storage directory = {root}")
