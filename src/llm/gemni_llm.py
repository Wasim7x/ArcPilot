import os
import sys

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

from src.exception import ArcPilotException
from src.llm.base import LLMProvider
from src.logger import logger


class GeminiProvider(LLMProvider):
    """
    Google Gemini LLM Provider implementation supporting Gemini 2.0 Flash, 1.5 Pro, 1.5 Flash.
    """
    def __init__(self, api_key: str | None = None, model_name: str | None = None, **kwargs):
        load_dotenv()
        resolved_key = api_key or os.getenv("GEMINI_API_KEY", "")
        resolved_model = model_name or os.getenv("GEMINI_MODEL", "gemini-3.8-flash")
        super().__init__(api_key=resolved_key, model_name=resolved_model, **kwargs)

    def validate_config(self) -> bool:
        return bool(self.api_key and self.api_key.strip())

    def get_llm(self):
        try:
            if not self.validate_config():
                raise ValueError("GEMINI_API_KEY is not set or empty.")
            llm = ChatGoogleGenerativeAI(
                google_api_key=self.api_key,
                model=self.model_name,
                temperature=self.extra_kwargs.get("temperature", 0.3),
                **{k: v for k, v in self.extra_kwargs.items() if k != "temperature"}
            )
            return llm
        except Exception as e:
            logger.error(f"Failed to initialize Gemini LLM: {e}")
            raise ArcPilotException(e, sys)

# Backward compatibility alias
GeminiLLM = GeminiProvider
