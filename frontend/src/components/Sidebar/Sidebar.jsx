import React from 'react';
import LLMConfiguration from '../LLMConfiguration';
import ExportControls from '../ExportControls';

export default function Sidebar({
  baseUrl,
  setBaseUrl,
  llmConfig,
  onApplyConfig,
  isApplyingConfig,
  state,
  taskId,
}) {
  return (
    <aside className="sb-left" id="left-sidebar">
      <LLMConfiguration
        baseUrl={baseUrl}
        setBaseUrl={setBaseUrl}
        llmConfig={llmConfig}
        onApplyConfig={onApplyConfig}
        isApplyingConfig={isApplyingConfig}
      />

      <ExportControls
        state={state}
        taskId={taskId}
        baseUrl={baseUrl}
      />

      <style>{`
        .sb-left {
          background: var(--bg2);
          border-right: 1px solid var(--border);
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-height: 0;
        }
      `}</style>
    </aside>
  );
}
