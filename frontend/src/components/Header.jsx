import React, { useState } from 'react';

export default function Header({ systemStatus, activeProvider, taskId }) {
  const [copied, setCopied] = useState(false);

  const handleCopyTaskId = () => {
    if (!taskId) return;
    navigator.clipboard.writeText(taskId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const getStatusClass = () => {
    if (systemStatus === 'healthy') return 'sdot ok';
    if (systemStatus === 'connecting') return 'sdot warn';
    return 'sdot err';
  };

  const getStatusText = () => {
    if (systemStatus === 'healthy') return 'Backend online';
    if (systemStatus === 'connecting') return 'Connecting to backend…';
    return 'Backend offline';
  };

  return (
    <header className="topbar">
      <div className="logo">
        <span className="logo-symbol">⟡</span>
        ArcPilot <span className="logo-sub">/ Orchestrator</span>
        <span className="logo-tag">v2.0 LangGraph</span>
      </div>

      <div className="vdiv" />

      <div className="top-status">
        <span className={getStatusClass()} />
        <span className="status-text">{getStatusText()}</span>
      </div>

      {taskId && (
        <div className="tid-bar">
          <span className="tid-label">SESSION</span>
          <span className="tid-val">{taskId}</span>
          <button className="tid-copy-btn" onClick={handleCopyTaskId} title="Copy Session ID">
            {copied ? '✓ COPIED' : 'copy'}
          </button>
        </div>
      )}

      <style>{`
        .topbar {
          grid-column: 1 / -1;
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 20px;
          z-index: 20;
          height: 52px;
        }
        .logo {
          font-family: var(--mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--accent2);
          letter-spacing: 2px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .logo-symbol {
          color: var(--accent);
          font-size: 16px;
        }
        .logo-sub {
          color: var(--ink3);
          font-weight: 400;
        }
        .logo-tag {
          font-size: 9.5px;
          background: var(--accent-bg);
          color: var(--accent2);
          padding: 2px 7px;
          border-radius: 12px;
          border: 1px solid rgba(129, 140, 248, 0.3);
          letter-spacing: 0.5px;
        }
        .vdiv {
          width: 1px;
          height: 18px;
          background: var(--border2);
        }
        .top-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          color: var(--ink3);
        }
        .sdot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ink3);
          flex-shrink: 0;
        }
        .sdot.ok {
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
        }
        .sdot.warn {
          background: var(--yellow);
          box-shadow: 0 0 8px var(--yellow);
        }
        .sdot.err {
          background: var(--red);
          box-shadow: 0 0 8px var(--red);
        }
        .tid-bar {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--mono);
          font-size: 11px;
          color: var(--ink3);
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 4px 10px;
        }
        .tid-label {
          font-size: 9.5px;
          color: var(--ink3);
          font-weight: 700;
          letter-spacing: 0.8px;
        }
        .tid-val {
          color: var(--accent2);
          font-weight: 600;
        }
        .tid-copy-btn {
          background: none;
          border: none;
          color: var(--ink3);
          cursor: pointer;
          font-size: 10px;
          font-family: var(--font);
          padding: 2px 4px;
          border-radius: 4px;
          transition: all 0.15s;
        }
        .tid-copy-btn:hover {
          color: var(--accent2);
          background: var(--bg4);
        }
      `}</style>
    </header>
  );
}
