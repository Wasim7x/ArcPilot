
import pytest

from src.llm import (
    GeminiLLM,
    GeminiProvider,
    GroqLLM,
    GroqProvider,
    MockLLMProvider,
    OllamaLLM,
    OllamaProvider,
    OpenAILLM,
    OpenAIProvider,
    get_llm_provider,
)


def test_mock_llm_provider():
    provider = MockLLMProvider(api_key="test-key", model_name="test-model")
    assert provider.validate_config() is True
    health = provider.check_health()
    assert health["status"] == "ready"
    assert health["configured"] is True

    llm = provider.get_llm()
    resp = llm.invoke("Hello ArcPilot")
    assert resp.content != ""

def test_groq_provider_initialization():
    provider = GroqProvider(api_key="dummy_groq_key", model_name="llama-3.3-70b-versatile")
    assert provider.api_key == "dummy_groq_key"
    assert provider.model_name == "llama-3.3-70b-versatile"
    assert provider.validate_config() is True
    health = provider.check_health()
    assert health["api_key_set"] is True

def test_openai_provider_initialization():
    provider = OpenAIProvider(api_key="dummy_openai_key", model_name="gpt-4o")
    assert provider.api_key == "dummy_openai_key"
    assert provider.model_name == "gpt-4o"
    assert provider.validate_config() is True
    health = provider.check_health()
    assert health["api_key_set"] is True

def test_gemini_provider_initialization():
    provider = GeminiProvider(api_key="dummy_gemini_key", model_name="gemini-1.5-flash")
    assert provider.api_key == "dummy_gemini_key"
    assert provider.model_name == "gemini-1.5-flash"
    assert provider.validate_config() is True

def test_ollama_provider_initialization():
    provider = OllamaProvider(model_name="qwen3.8:27b", base_url="http://localhost:11434")
    assert provider.model_name == "qwen3.8:27b"
    assert provider.base_url == "http://localhost:11434"
    assert provider.validate_config() is True
    health = provider.check_health()
    assert health["configured"] is True
    assert "server_running" in health

def test_factory_get_llm_provider():
    mock_prov = get_llm_provider("mock")
    assert isinstance(mock_prov, MockLLMProvider)

    groq_prov = get_llm_provider("groq", api_key="test_key")
    assert isinstance(groq_prov, GroqProvider)

    openai_prov = get_llm_provider("openai", api_key="test_key")
    assert isinstance(openai_prov, OpenAIProvider)

    gemini_prov = get_llm_provider("gemini", api_key="test_key")
    assert isinstance(gemini_prov, GeminiProvider)

    ollama_prov = get_llm_provider("ollama")
    assert isinstance(ollama_prov, OllamaProvider)

def test_unsupported_provider():
    with pytest.raises(ValueError, match="Unsupported LLM provider"):
        get_llm_provider("unknown_provider")

def test_backward_compatible_aliases():
    assert issubclass(GroqLLM, GroqProvider)
    assert issubclass(OpenAILLM, OpenAIProvider)
    assert issubclass(GeminiLLM, GeminiProvider)
    assert issubclass(OllamaLLM, OllamaProvider)
