import os
import zipfile
from pathlib import Path

from src.logger import logger


class ProjectManagerTool:
    """
    Manages workspace artifact storage, file generation, patching, and ZIP packaging
    for generated SDLC applications.
    """

    @classmethod
    def get_base_artifacts_dir(cls) -> Path:
        base = os.getenv("ARTIFACTS_DIR", "")
        if base:
            p = Path(base)
        else:
            p = Path(__file__).resolve().parent.parent.parent / "artifacts"
        p.mkdir(parents=True, exist_ok=True)
        return p

    @classmethod
    def get_project_dir(cls, task_id: str) -> Path:
        sanitized_id = task_id.replace(":", "_").replace("/", "_").replace("\\", "_")
        project_dir = cls.get_base_artifacts_dir() / "projects" / sanitized_id
        project_dir.mkdir(parents=True, exist_ok=True)
        return project_dir

    @classmethod
    def write_project_files(cls, task_id: str, files: dict[str, str]) -> str:
        """
        Write all files in the dictionary to the task's project directory on disk.
        Returns the absolute string path to the project root.
        """
        project_dir = cls.get_project_dir(task_id)
        for rel_path, content in files.items():
            # Normalize path separators
            norm_rel = rel_path.replace("\\", "/").lstrip("/")
            file_path = project_dir / norm_rel
            file_path.parent.mkdir(parents=True, exist_ok=True)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)

        logger.info(f"Wrote {len(files)} files to project directory: {project_dir}")
        return str(project_dir)

    @classmethod
    def update_file(cls, task_id: str, rel_path: str, new_content: str) -> bool:
        """Update or patch an existing file during repair loops."""
        project_dir = cls.get_project_dir(task_id)
        norm_rel = rel_path.replace("\\", "/").lstrip("/")
        file_path = project_dir / norm_rel
        file_path.parent.mkdir(parents=True, exist_ok=True)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        return True

    @classmethod
    def read_all_project_files(cls, task_id: str) -> dict[str, str]:
        """Read all files from project workspace back into memory dictionary."""
        project_dir = cls.get_project_dir(task_id)
        if not project_dir.exists():
            return {}

        files_dict = {}
        for p in project_dir.rglob("*"):
            if p.is_file() and not p.name.endswith(".zip") and ".git" not in str(p) and "__pycache__" not in str(p):
                rel_path = str(p.relative_to(project_dir)).replace("\\", "/")
                try:
                    with open(p, "r", encoding="utf-8", errors="replace") as f:
                        files_dict[rel_path] = f.read()
                except Exception as e:
                    logger.warning(f"Could not read {p}: {e}")
        return files_dict

    @classmethod
    def package_project_zip(cls, task_id: str) -> str:
        """
        Package the generated project into a standalone .zip file.
        Returns the absolute path to the generated zip archive.
        """
        project_dir = cls.get_project_dir(task_id)
        zip_path = cls.get_base_artifacts_dir() / "projects" / f"{task_id}.zip"

        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(project_dir):
                # Skip pycache and hidden directories
                dirs[:] = [d for d in dirs if d != "__pycache__" and not d.startswith(".")]
                for file in files:
                    if file.endswith(".zip"):
                        continue
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, project_dir)
                    zipf.write(file_path, arcname)

        logger.info(f"Packaged project archive at {zip_path}")
        return str(zip_path)
