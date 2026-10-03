import os
import sys

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

from src.exception import ArcPilotException
from src.llm.base import LLMProvider
from src.logger import logger


class OpenAIProvider(LLMProvider):
    """
    OpenAI LLM Provider implementation supporting GPT-4o, GPT-4o-mini, etc.
    """
    def __init__(self, api_key: str | None = None, model_name: str | None = None, **kwargs):
        load_dotenv()
        resolved_key = api_key or os.getenv("OPENAI_API_KEY", "")
        resolved_model = model_name or os.getenv("OPENAI_MODEL", "gpt-4o")
        super().__init__(api_key=resolved_key, model_name=resolved_model, **kwargs)

    def validate_config(self) -> bool:
        return bool(self.api_key and self.api_key.strip())

    def get_llm(self):
        try:
            if not self.validate_config():
                raise ValueError("OPENAI_API_KEY is not set or empty.")
            llm = ChatOpenAI(
                api_key=self.api_key,
                model=self.model_name,
                temperature=self.extra_kwargs.get("temperature", 0.2),
                **{k: v for k, v in self.extra_kwargs.items() if k != "temperature"}
            )
            return llm
        except Exception as e:
            logger.error(f"Failed to initialize OpenAI LLM: {e}")
            raise ArcPilotException(e, sys)

# Backward compatibility alias
OpenAILLM = OpenAIProvider
