import os

from .base import LLMProvider, MockLLMProvider
from .gemni_llm import GeminiLLM, GeminiProvider
from .groq_llm import GroqLLM, GroqProvider
from .ollama_llm import OllamaLLM, OllamaProvider
from .openai_llm import OpenAILLM, OpenAIProvider


def get_llm_provider(
    provider_name: str | None = None,
    api_key: str | None = None,
    model_name: str | None = None,
    **kwargs
) -> LLMProvider:
    """
    Factory function to get the appropriate LLM provider.
    Reads defaults from environment variables if not provided.
    """
    prov = (provider_name or os.getenv("LLM_PROVIDER", "groq")).strip().lower()

    if prov in ("groq", "chatgroq"):
        return GroqProvider(api_key=api_key, model_name=model_name, **kwargs)
    elif prov in ("openai", "chatopenai"):
        return OpenAIProvider(api_key=api_key, model_name=model_name, **kwargs)
    elif prov in ("gemini", "google", "chatgooglegenerativeai"):
        return GeminiProvider(api_key=api_key, model_name=model_name, **kwargs)
    elif prov in ("ollama", "chatollama"):
        return OllamaProvider(api_key=api_key, model_name=model_name, **kwargs)
    elif prov in ("mock", "fake", "test"):
        return MockLLMProvider(api_key=api_key or "mock-key", model_name=model_name or "mock-model", **kwargs)
    else:
        raise ValueError(f"Unsupported LLM provider: '{provider_name}'. Supported: 'ollama', 'groq', 'openai', 'gemini', 'mock'.")

__all__ = [
    "GeminiLLM",
    "GeminiProvider",
    "GroqLLM",
    "GroqProvider",
    "LLMProvider",
    "MockLLMProvider",
    "OllamaLLM",
    "OllamaProvider",
    "OpenAILLM",
    "OpenAIProvider",
    "get_llm_provider",
]
