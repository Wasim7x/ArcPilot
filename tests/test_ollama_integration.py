import pytest
from fastapi.testclient import TestClient

from app import app
from src.llm import OllamaProvider
from src.llm.ollama_llm import SafeChatOllama


def test_ollama_provider_health_check():
    prov = OllamaProvider(model_name="qwen3.8:27b", base_url="http://localhost:11434")
    health = prov.check_health()
    assert health["provider"] == "OllamaProvider"
    assert health["model"] == "qwen3.8:27b"
    assert health["configured"] is True
    # If local Ollama is active
    if health.get("server_running"):
        if health.get("model_available"):
            assert health["status"] == "ready"
            assert health["model_available"] is True
        else:
            assert health["status"] in ("ready", "model_not_installed")


def test_ollama_offline_error_handling():
    # Points to non-existent port to test graceful offline error
    prov = OllamaProvider(model_name="qwen3.8:27b", base_url="http://localhost:11439")
    health = prov.check_health()
    assert health["server_running"] is False
    assert health["status"] == "server_not_running"
    assert "Local Ollama server is not running" in health["error"]


def test_ollama_safe_chat_model_wrapper_offline():
    safe_llm = SafeChatOllama(model="qwen3.8:27b", base_url="http://localhost:11439")
    with pytest.raises(RuntimeError, match="Local Ollama server is not running"):
        safe_llm.invoke("Hello")


def test_ollama_api_config_endpoint(monkeypatch):
    # Mock Ollama health check to avoid requiring 27GB local model on test machine
    monkeypatch.setattr(
        OllamaProvider,
        "check_health",
        lambda self: {
            "status": "ready",
            "server_running": True,
            "model_available": True,
            "provider": "OllamaProvider",
            "model": self.model_name,
            "configured": True,
        },
    )
    client = TestClient(app)
    # Check diagnostics endpoint
    diag_resp = client.get("/health/llm")
    assert diag_resp.status_code == 200

    # Configure Ollama through /config/llm
    config_resp = client.post(
        "/config/llm",
        json={"provider": "Ollama", "model": "qwen3.8:27b"}
    )
    assert config_resp.status_code == 200
    data = config_resp.json()
    assert data["status"] == "ok"
    assert data["provider"] == "Ollama"
    assert data["model"] == "qwen3.8:27b"

    # Verify GET /config/llm returns Ollama
    get_cfg = client.get("/config/llm")
    assert get_cfg.status_code == 200
    cfg_data = get_cfg.json()
    assert cfg_data["provider"] == "Ollama"
    assert cfg_data["model"] == "qwen3.8:27b"
    assert cfg_data["api_key"] == "N/A (Local)"
