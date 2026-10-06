import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from src.exception import ArcPilotException
from src.llm.base import LLMProvider
from src.logger import logger


class GroqProvider(LLMProvider):
    """
    Groq LLM Provider implementation for high-speed inference.
    """
    def __init__(self, api_key: str | None = None, model_name: str | None = None, **kwargs):
        root_env = Path(__file__).resolve().parent.parent.parent / ".env"
        load_dotenv(dotenv_path=root_env)
        load_dotenv()
        raw_key = api_key or os.getenv("GROQ_API_KEY", "")
        resolved_key = raw_key.strip('"').strip("'") if raw_key else ""
        resolved_model = model_name or os.getenv("GROQ_MODEL") or os.getenv("LLM_MODEL", "qwen/qwen3.8-27b")
        super().__init__(api_key=resolved_key, model_name=resolved_model, **kwargs)


    def validate_config(self) -> bool:
        return bool(self.api_key and self.api_key.strip())

    def get_llm(self):
        try:
            if not self.validate_config():
                raise ValueError("GROQ_API_KEY is not set or empty.")
            llm = ChatGroq(
                api_key=self.api_key,
                model=self.model_name,
                temperature=self.extra_kwargs.get("temperature", 0.2),
                **{k: v for k, v in self.extra_kwargs.items() if k != "temperature"}
            )
            return llm
        except Exception as e:
            logger.error(f"Failed to initialize Groq LLM: {e}")
            raise ArcPilotException(e, sys)

# Backward compatibility alias
GroqLLM = GroqProvider
