import os
import sys
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
import httpx
from langchain_ollama import ChatOllama

from src.exception import ArcPilotException
from src.llm.base import LLMProvider
from src.logger import logger


class SafeChatOllama(ChatOllama):
    """
    Subclass of ChatOllama that provides graceful error handling
    for connectivity, model availability, timeouts, and empty responses.
    """
    def invoke(self, input, config=None, **kwargs):
        try:
            res = super().invoke(input, config=config, **kwargs)
            if not res or (isinstance(getattr(res, "content", None), str) and not res.content.strip() and not getattr(res, "tool_calls", None)):
                logger.warning("Ollama returned an empty response.")
            return res
        except Exception as e:
            self._handle_ollama_exception(e)

    async def ainvoke(self, input, config=None, **kwargs):
        try:
            res = await super().ainvoke(input, config=config, **kwargs)
            if not res or (isinstance(getattr(res, "content", None), str) and not res.content.strip() and not getattr(res, "tool_calls", None)):
                logger.warning("Ollama returned an empty response.")
            return res
        except Exception as e:
            self._handle_ollama_exception(e)

    def _handle_ollama_exception(self, e: Exception):
        msg = str(e).lower()
        if "connect" in msg or "refused" in msg or "actively refused" in msg or "connection error" in msg:
            logger.error("Local Ollama server is not running or connection refused.")
            raise RuntimeError("Local Ollama server is not running. Please start Ollama and try again.") from e
        if "not found" in msg or "not installed" in msg:
            logger.error(f"Model '{self.model}' is not installed in Ollama.")
            raise RuntimeError(f"Model '{self.model}' is not installed in Ollama. Please run 'ollama pull {self.model}'.") from e
        if "timeout" in msg or "timed out" in msg:
            logger.error(f"Ollama request timed out for model '{self.model}'.")
            raise TimeoutError(f"Ollama request timed out for model '{self.model}'.") from e
        raise e


class OllamaProvider(LLMProvider):
    """
    Ollama LLM Provider implementation for local inference (e.g. qwen3.8:27b, llama3, etc.).
    """
    def __init__(
        self,
        api_key: str | None = None,
        model_name: str | None = None,
        base_url: str | None = None,
        **kwargs
    ):
        root_env = Path(__file__).resolve().parent.parent.parent / ".env"
        load_dotenv(dotenv_path=root_env)
        load_dotenv()

        resolved_base_url = (base_url or os.getenv("OLLAMA_BASE_URL") or "http://localhost:11434").rstrip("/")
        resolved_model = model_name or os.getenv("OLLAMA_MODEL") or os.getenv("LLM_MODEL") or "qwen3.8:27b"
        self.base_url = resolved_base_url
        super().__init__(api_key=api_key or "local-no-key", model_name=resolved_model, **kwargs)

    def validate_config(self) -> bool:
        """Validates that base_url and model_name are set."""
        return bool(self.base_url and self.model_name and self.model_name.strip())

    def check_health(self) -> dict[str, Any]:
        """
        Connectivity check verifying:
        1. Base URL (http://localhost:11434) is reachable.
        2. Configured model (e.g. qwen3.8:27b) is installed and available.
        """
        is_valid = self.validate_config()
        if not is_valid:
            return {
                "provider": self.__class__.__name__,
                "model": self.model_name,
                "base_url": self.base_url,
                "configured": False,
                "server_running": False,
                "model_available": False,
                "status": "missing_configuration",
                "error": "Ollama model name or base URL is missing."
            }

        try:
            with httpx.Client(timeout=3.0) as client:
                resp = client.get(f"{self.base_url}/api/tags")
                if resp.status_code != 200:
                    return {
                        "provider": self.__class__.__name__,
                        "model": self.model_name,
                        "base_url": self.base_url,
                        "configured": True,
                        "server_running": False,
                        "model_available": False,
                        "status": "error",
                        "error": f"Ollama returned HTTP {resp.status_code}: {resp.text}"
                    }

                data = resp.json()
                models = [m.get("name", "") for m in data.get("models", [])]

                target = self.model_name.strip()
                # Exact or prefix match (e.g. qwen3.8:27b, qwen3.8:latest, or qwen3.8)
                model_found = any(
                    m == target or m == f"{target}:latest" or target == m.split(":")[0] or m.startswith(f"{target}:")
                    for m in models
                )

                if model_found:
                    return {
                        "provider": self.__class__.__name__,
                        "model": self.model_name,
                        "base_url": self.base_url,
                        "configured": True,
                        "server_running": True,
                        "model_available": True,
                        "status": "ready"
                    }
                else:
                    return {
                        "provider": self.__class__.__name__,
                        "model": self.model_name,
                        "base_url": self.base_url,
                        "configured": True,
                        "server_running": True,
                        "model_available": False,
                        "installed_models": models,
                        "status": "model_not_installed",
                        "error": f"Model '{self.model_name}' is not installed in Ollama. Please run 'ollama pull {self.model_name}'."
                    }
        except (httpx.ConnectError, httpx.ConnectTimeout) as e:
            return {
                "provider": self.__class__.__name__,
                "model": self.model_name,
                "base_url": self.base_url,
                "configured": True,
                "server_running": False,
                "model_available": False,
                "status": "server_not_running",
                "error": "Local Ollama server is not running. Please start Ollama and try again."
            }
        except Exception as e:
            return {
                "provider": self.__class__.__name__,
                "model": self.model_name,
                "base_url": self.base_url,
                "configured": True,
                "server_running": False,
                "model_available": False,
                "status": "error",
                "error": f"Ollama connectivity error: {e}"
            }

    def get_llm(self, check_health_on_init: bool = False):
        try:
            if not self.validate_config():
                raise ValueError("Ollama configuration is incomplete (missing model or base URL).")

            if check_health_on_init:
                health = self.check_health()
                if not health.get("server_running"):
                    raise ValueError(health.get("error", "Local Ollama server is not running. Please start Ollama and try again."))
                if not health.get("model_available"):
                    raise ValueError(health.get("error", f"Model '{self.model_name}' is not installed in Ollama."))

            temperature = self.extra_kwargs.get("temperature", 0.2)
            filtered_kwargs = {k: v for k, v in self.extra_kwargs.items() if k not in ("temperature", "check_health_on_init")}

            llm = SafeChatOllama(
                model=self.model_name,
                base_url=self.base_url,
                temperature=temperature,
                **filtered_kwargs
            )
            return llm
        except Exception as e:
            logger.error(f"Failed to initialize Ollama LLM: {e}")
            raise ArcPilotException(e, sys)


# Backward compatibility alias
OllamaLLM = OllamaProvider
