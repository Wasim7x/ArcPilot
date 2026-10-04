import React, { useState, useEffect } from 'react';
import { LLM_MODELS } from '../types/workflow';
import { exportArtifact } from '../utils/export';
import { workflowApi } from '../services/api';

export default function Sidebar({
  baseUrl,
  setBaseUrl,
  llmConfig,
  onApplyConfig,
  isApplyingConfig,
  state,
  taskId,
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

  // Determine available exports based on authoritative state
  const exportItems = [];
  if (state?.requirements || state?.structured_requirements) {
    exportItems.push({ id: 'requirements', name: 'Requirements Spec', data: state.structured_requirements || state.requirements });
  }
  if (state?.user_stories && state.user_stories.length > 0) {
    exportItems.push({ id: 'user_stories', name: 'User Stories & Backlog', data: state.user_stories });
  }
  if (state?.traceability_matrix && state.traceability_matrix.length > 0) {
    exportItems.push({ id: 'traceability', name: 'Traceability Matrix', data: state.traceability_matrix });
  }
  if (state?.design_documents) {
    exportItems.push({ id: 'design', name: 'Architecture & Design', data: state.design_documents });
  }
  if (state?.generated_files && Object.keys(state.generated_files).length > 0) {
    exportItems.push({ id: 'code', name: 'Code Files', data: state.generated_files });
  }
  if (state?.security_report || state?.security_review_comments) {
    exportItems.push({ id: 'security', name: 'Security Audit Report', data: state.security_report || state.security_review_comments });
  }
  if (state?.test_cases || state?.qa_report) {
    exportItems.push({ id: 'qa', name: 'Test Suite & QA Report', data: { tests: state.test_cases, qa: state.qa_report } });
  }
  if (state?.deployment_result || state?.deployment_status === 'success') {
    exportItems.push({ id: 'deployment', name: 'Deployment Package', data: state.deployment_result });
  }

  return (
    <aside className="sb-left">
      <div className="sb-section">
        <div className="sb-title">LLM Configuration</div>
        <div className="sb-form">
          <div className="fld">
            <label>Provider</label>
            <select value={provider} onChange={handleProviderChange}>
              {Object.keys(LLM_MODELS).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="fld">
            <label htmlFor="input-sidebar-model">Model</label>
            <input
              id="input-sidebar-model"
              type="text"
              list="sidebar-model-suggestions"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. gemini-3.8-flash, qwen/qwen3.8-27b"
              autoComplete="off"
            />
            <datalist id="sidebar-model-suggestions">
              {(LLM_MODELS[provider] || []).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </datalist>
          </div>

          <div className="fld">
            <label>API Key {provider === 'Ollama' && <span style={{ opacity: 0.6, fontSize: '0.85em' }}>(Not required for local)</span>}</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={provider === 'Ollama' ? 'Not required for local Ollama' : 'Enter API key…'}
              disabled={provider === 'Ollama'}
            />
          </div>

          <div className="fld">
            <label>Backend URL</label>
            <input
              type="text"
              value={localUrl}
              onChange={(e) => setLocalUrl(e.target.value)}
              placeholder={typeof window !== 'undefined' && window.location && window.location.origin ? window.location.origin : 'http://localhost:8000'}
            />
          </div>

          <button
            className="btn btn-accent"
            onClick={handleApply}
            disabled={isApplyingConfig}
          >
            {isApplyingConfig ? <><span className="spin" /> Applying…</> : 'Apply Configuration'}
          </button>

          <div className={`pill ${llmConfig.provider ? 'ok' : 'warn'}`}>
            <span className="dot" />
            {llmConfig.provider ? `Connected: ${llmConfig.provider} / ${llmConfig.model || 'active'}` : 'Auto-configured via .env'}
          </div>
        </div>
      </div>

      <div className="sb-section">
        <div className="sb-title">Project Exports &amp; Artifacts</div>
        <div className="dl-list">
          {exportItems.length === 0 ? (
            <div className="dl-empty">Generated artifacts appear here as stages complete.</div>
          ) : (
            exportItems.map((item) => (
              <div key={item.id} className="dl-item">
                <div className="dl-item-name">{item.name}</div>
                <div className="dl-btns">
                  <button
                    className="dl-btn"
                    onClick={() => exportArtifact(item.id, 'txt', item.data, taskId)}
                    title="Export as TXT"
                  >
                    TXT
                  </button>
                  <button
                    className="dl-btn"
                    onClick={() => exportArtifact(item.id, 'json', item.data, taskId)}
                    title="Export as JSON"
                  >
                    JSON
                  </button>
                  <button
                    className="dl-btn"
                    onClick={() => exportArtifact(item.id, 'html', item.data, taskId)}
                    title="Export as HTML"
                  >
                    HTML
                  </button>
                  {item.id === 'deployment' && taskId && (
                    <a
                      href={workflowApi.getDownloadZipUrl(baseUrl, taskId)}
                      className="dl-btn dl-btn-zip"
                      download
                      title="Download Package ZIP"
                    >
                      ZIP
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .sb-left {
          background: var(--bg2);
          border-right: 1px solid var(--border);
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
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
        .dl-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dl-item {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
        }
        .dl-item-name {
          font-size: 11.5px;
          color: var(--ink2);
          font-weight: 500;
          margin-bottom: 6px;
        }
        .dl-btns {
          display: flex;
          gap: 4px;
        }
        .dl-btn {
          flex: 1;
          padding: 4px 0;
          border-radius: 4px;
          border: 1px solid var(--border);
          background: var(--bg4);
          color: var(--ink3);
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--mono);
          text-align: center;
          text-decoration: none;
          transition: all 0.15s;
        }
        .dl-btn:hover {
          border-color: var(--accent);
          color: var(--accent2);
        }
        .dl-btn-zip {
          color: var(--green);
          font-weight: 700;
          border-color: var(--green-border);
        }
        .dl-btn-zip:hover {
          background: var(--green-bg);
          color: var(--green);
        }
        .dl-empty {
          font-size: 11px;
          color: var(--ink3);
          text-align: center;
          padding: 16px 0;
        }
      `}</style>
    </aside>
  );
}
