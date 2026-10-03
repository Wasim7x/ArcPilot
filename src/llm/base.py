from abc import ABC, abstractmethod
from typing import Any


class LLMProvider(ABC):
    """
    Abstract Base Class for all LLM Providers in ArcPilot.
    Provides a standardized interface for model instantiation, configuration validation,
    and health checking across all supported LLM providers.
    """
    def __init__(self, api_key: str | None = None, model_name: str | None = None, **kwargs):
        self.api_key = api_key
        self.model_name = model_name
        self.extra_kwargs = kwargs

    @abstractmethod
    def get_llm(self) -> Any:
        """Returns the underlying LangChain chat model instance."""

    @abstractmethod
    def validate_config(self) -> bool:
        """Validates that necessary configuration (API key, model) is present and plausible."""

    def check_health(self) -> dict[str, Any]:
        """Performs a quick diagnostic on the provider configuration and readiness."""
        is_valid = self.validate_config()
        return {
            "provider": self.__class__.__name__,
            "model": self.model_name,
            "configured": is_valid,
            "api_key_set": bool(self.api_key),
            "status": "ready" if is_valid else "missing_configuration"
        }


class MockLLMProvider(LLMProvider):
    """
    Mock LLM provider for offline testing, local unit tests, and CI/CD environments
    where external paid APIs are not available.
    """
    def __init__(self, api_key: str | None = "mock-key", model_name: str | None = "mock-model", responses: dict[str, str] | None = None, **kwargs):
        super().__init__(api_key=api_key or "mock-key", model_name=model_name or "mock-model", **kwargs)
        self.responses = responses or {}

    def get_llm(self) -> Any:
        from langchain_core.language_models.fake_chat_models import FakeListChatModel
        default_responses = [
            "1. Functional Requirement: Provide travel search.\n2. Non-functional: Respond under 1s.",
            "Mock user story generated successfully.",
            "# Functional Design Document\n## 1. System Scope\nScope details.",
            "# Technical Design Document\n## 1. Architecture\nFastAPI backend with SQLite.",
            "```python\ndef test_dummy():\n    assert True\n```",
            "APPROVED - Code looks solid and well structured.",
            "APPROVED - No critical security vulnerabilities identified.",
            "```python\nimport unittest\nclass TestApp(unittest.TestCase):\n    def test_sample(self):\n        self.assertTrue(True)\n```",
            "QA Report: All tests passed successfully.",
            "Deployment check: Build successful. Ready for release."
        ]
        return FakeListChatModel(responses=default_responses * 5)

    def validate_config(self) -> bool:
        return True
