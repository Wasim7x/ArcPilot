import React, { useState, useEffect } from 'react';
import { LLM_MODELS } from '../../types/workflow';

export default function LLMConfiguration({
  baseUrl,
  setBaseUrl,
  llmConfig = {},
  onApplyConfig,
  isApplyingConfig,
}) {
  const [provider, setProvider] = useState(llmConfig.provider || 'Groq');
  const [model, setModel] = useState(llmConfig.model || 'llama-3.3-70b-versatile');
  const [apiKey, setApiKey] = useState('');
  const [localUrl, setLocalUrl] = useState(baseUrl);

  useEffect(() => {
    if (llmConfig.provider) setProvider(llmConfig.provider);
    if (llmConfig.model) setModel(llmConfig.model);
  }, [llmConfig]);

  useEffect(() => {
    if (baseUrl) setLocalUrl(baseUrl);
  }, [baseUrl]);

  const handleProviderChange = (e) => {
    const nextProv = e.target.value;
    setProvider(nextProv);
    const available = LLM_MODELS[nextProv] || [];
    if (available.length > 0) {
      setModel(available[0]);
    }
  };

  const handleApply = () => {
    const fallbackUrl = typeof window !== 'undefined' && window.location && window.location.origin && !window.location.origin.includes(':5173')
      ? window.location.origin
      : 'http://localhost:8000';
    const effectiveUrl = localUrl.trim().replace(/\/+$/, '') || fallbackUrl;
    onApplyConfig({
      provider,
      model,
      apiKey: apiKey.trim() || undefined,
      url: effectiveUrl,
    });
  };

  return (
    <div className="sb-section" id="llm-configuration-section">
      <div className="sb-title">LLM Configuration</div>
      <div className="sb-form">
        <div className="fld">
          <label htmlFor="select-llm-provider">Provider</label>
          <select id="select-llm-provider" value={provider} onChange={handleProviderChange}>
            {Object.keys(LLM_MODELS).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="fld">
          <label htmlFor="input-llm-model">Model</label>
          <input
            id="input-llm-model"
            type="text"
            list="model-suggestions"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="e.g. gemini-3.8-flash, qwen/qwen3.8-27b"
            autoComplete="off"
          />
          <datalist id="model-suggestions">
            {(LLM_MODELS[provider] || []).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </datalist>
        </div>

        <div className="fld">
          <label htmlFor="input-llm-apikey">API Key {provider === 'Ollama' && <span style={{ opacity: 0.6, fontSize: '0.85em' }}>(Not required for local)</span>}</label>
          <input
            id="input-llm-apikey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={provider === 'Ollama' ? 'Not required for local Ollama' : 'Enter API key…'}
            disabled={provider === 'Ollama'}
            autoComplete="new-password"
          />
        </div>

        <div className="fld">
          <label htmlFor="input-backend-url">Backend URL</label>
          <input
            id="input-backend-url"
            type="text"
            value={localUrl}
            onChange={(e) => setLocalUrl(e.target.value)}
            placeholder={typeof window !== 'undefined' && window.location && window.location.origin ? window.location.origin : 'http://localhost:8000'}
          />
        </div>

        <button
          className="btn btn-accent"
          id="btn-apply-llm-config"
          onClick={handleApply}
          disabled={isApplyingConfig}
        >
          {isApplyingConfig ? (
            <>
              <span className="spin" />
              <span>Applying…</span>
            </>
          ) : (
            'Apply Configuration'
          )}
        </button>

        <div className={`pill ${llmConfig.provider ? 'ok' : 'warn'}`}>
          <span className="dot" />
          <span>
            {llmConfig.provider
              ? `Connected: ${llmConfig.provider} / ${llmConfig.model || 'active'}`
              : 'Auto-configured via .env'}
          </span>
        </div>
      </div>

      <style>{`
        .sb-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sb-title {
          font-size: 9.5px;
          font-weight: 700;
          color: var(--ink3);
          letter-spacing: 2px;
          text-transform: uppercase;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }
        .sb-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}
