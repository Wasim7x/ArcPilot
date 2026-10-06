import os
import zipfile
from io import BytesIO
from pathlib import Path

from src.logger import logger
from src.storage import get_artifact_storage, get_artifacts_dir


class ProjectManagerTool:
    """
    Manages workspace artifact storage, file generation, patching, and ZIP packaging
    for generated SDLC applications.
    Integrates with ArtifactStorage to ensure all project source files and ZIP packages
    are preserved in external storage (Redis) and can survive container restarts on Free Render.
    """

    @classmethod
    def get_base_artifacts_dir(cls) -> Path:
        return get_artifacts_dir()

    @classmethod
    def get_project_dir(cls, task_id: str) -> Path:
        sanitized_id = task_id.replace(":", "_").replace("/", "_").replace("\\", "_")
        project_dir = cls.get_base_artifacts_dir() / "projects" / sanitized_id
        project_dir.mkdir(parents=True, exist_ok=True)
        return project_dir

    @classmethod
    def ensure_local_workspace(cls, task_id: str) -> Path:
        """
        Ensure the project workspace exists on local disk.
        If the local directory is empty (e.g. following a Render instance restart),
        re-materializes files from ArtifactStorage.
        """
        project_dir = cls.get_project_dir(task_id)
        existing = [p for p in project_dir.rglob("*") if p.is_file() and not p.name.endswith(".zip")]
        if not existing:
            storage = get_artifact_storage()
            files = storage.get_files(task_id)
            if files:
                for rel_path, content in files.items():
                    norm_rel = rel_path.replace("\\", "/").lstrip("/")
                    target = project_dir / norm_rel
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.write_text(content, encoding="utf-8")
                logger.info(f"Re-materialized {len(files)} project files from external storage into {project_dir}")
        return project_dir

    @classmethod
    def write_project_files(cls, task_id: str, files: dict[str, str]) -> str:
        """
        Write all files in the dictionary to the task's project directory on disk,
        and synchronize them to external ArtifactStorage for persistence across restarts.
        Returns the absolute string path to the project root.
        """
        project_dir = cls.get_project_dir(task_id)
        for rel_path, content in files.items():
            norm_rel = rel_path.replace("\\", "/").lstrip("/")
            file_path = project_dir / norm_rel
            file_path.parent.mkdir(parents=True, exist_ok=True)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)

        # Synchronize to durable external artifact storage
        try:
            storage = get_artifact_storage()
            storage.save_files(task_id, files)
        except Exception as e:
            logger.warning(f"Could not sync project files to external storage: {e}")

        logger.info(f"Artifact persisted: Wrote {len(files)} files to project directory {project_dir}")
        return str(project_dir)

    @classmethod
    def update_file(cls, task_id: str, rel_path: str, new_content: str) -> bool:
        """Update or patch an existing file during repair loops and synchronize to storage."""
        project_dir = cls.get_project_dir(task_id)
        norm_rel = rel_path.replace("\\", "/").lstrip("/")
        file_path = project_dir / norm_rel
        file_path.parent.mkdir(parents=True, exist_ok=True)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)

        # Update external storage
        try:
            storage = get_artifact_storage()
            current_files = cls.read_all_project_files(task_id)
            current_files[norm_rel] = new_content
            storage.save_files(task_id, current_files)
        except Exception as e:
            logger.warning(f"Could not sync updated file '{rel_path}' to external storage: {e}")

        logger.info(f"Artifact persisted: updated file '{rel_path}' for task {task_id}")
        return True

    @classmethod
    def read_all_project_files(cls, task_id: str) -> dict[str, str]:
        """
        Read all files from project workspace back into memory dictionary.
        If local directory was wiped by a container restart, recovers files from external storage.
        """
        project_dir = cls.get_project_dir(task_id)
        files_dict = {}

        if project_dir.exists():
            for p in project_dir.rglob("*"):
                if p.is_file() and not p.name.endswith(".zip") and ".git" not in str(p) and "__pycache__" not in str(p):
                    rel_path = str(p.relative_to(project_dir)).replace("\\", "/")
                    try:
                        with open(p, "r", encoding="utf-8", errors="replace") as f:
                            files_dict[rel_path] = f.read()
                    except Exception as e:
                        logger.warning(f"Could not read {p}: {e}")

        if not files_dict:
            # Fallback to external durable storage
            storage = get_artifact_storage()
            files_dict = storage.get_files(task_id)
            if files_dict:
                # Re-materialize to local disk for future reads/tools
                for rel_path, content in files_dict.items():
                    norm_rel = rel_path.replace("\\", "/").lstrip("/")
                    p_path = project_dir / norm_rel
                    p_path.parent.mkdir(parents=True, exist_ok=True)
                    p_path.write_text(content, encoding="utf-8")

        return files_dict

    @classmethod
    def package_project_zip(cls, task_id: str) -> str:
        """
        Package the generated project into a standalone .zip file.
        Persists ZIP archive to both local disk and durable external storage.
        Returns the absolute path to the generated zip archive.
        """
        cls.ensure_local_workspace(task_id)
        project_dir = cls.get_project_dir(task_id)
        zip_path = cls.get_base_artifacts_dir() / "projects" / f"{task_id}.zip"

        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(project_dir):
                dirs[:] = [d for d in dirs if d != "__pycache__" and not d.startswith(".")]
                for file in files:
                    if file.endswith(".zip"):
                        continue
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, project_dir)
                    zipf.write(file_path, arcname)

        # Persist ZIP bytes to external storage
        try:
            zip_bytes = zip_path.read_bytes()
            storage = get_artifact_storage()
            storage.save_zip(task_id, zip_bytes)
        except Exception as e:
            logger.warning(f"Could not persist ZIP archive to external storage: {e}")

        logger.info(f"Artifact persisted: Packaged project archive at {zip_path}")
        return str(zip_path)

    @classmethod
    def get_project_zip_bytes(cls, task_id: str) -> bytes | None:
        """
        Retrieve the binary ZIP package for task_id.
        Tries external storage first if local file does not exist,
        ensuring download works even after an ephemeral container restart.
        """
        storage = get_artifact_storage()
        # Check storage first
        zip_bytes = storage.get_zip(task_id)
        if zip_bytes:
            return zip_bytes

        # Check local file
        zip_path = cls.get_base_artifacts_dir() / "projects" / f"{task_id}.zip"
        if zip_path.is_file():
            b = zip_path.read_bytes()
            storage.save_zip(task_id, b)
            return b

        # Synthesize from project files if available
        files = cls.read_all_project_files(task_id)
        if files:
            buf = BytesIO()
            with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
                for rel_path, content in files.items():
                    z.writestr(rel_path, content)
            synthesized = buf.getvalue()
            storage.save_zip(task_id, synthesized)
            return synthesized

        return None
