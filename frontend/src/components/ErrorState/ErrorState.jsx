import React from 'react';

export default function ErrorState({ title = 'Action Failed', message, onRetry }) {
  return (
    <div className="error-state-card" id="error-state-card">
      <div className="err-icon-badge">✕</div>
      <div className="err-content">
        <div className="err-title">{title}</div>
        <div className="err-msg">{message || 'An unexpected error occurred.'}</div>
      </div>
      {onRetry && (
        <button className="btn btn-accent err-retry-btn" onClick={onRetry} id="btn-error-retry">
          Retry Action
        </button>
      )}
      <style>{`
        .error-state-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: rgba(244, 63, 94, 0.08);
          border: 1px solid var(--red-border);
          border-radius: var(--radius-md);
        }
        .err-icon-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--red-bg);
          color: var(--red);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        .err-content {
          flex: 1;
        }
        .err-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--red-light);
        }
        .err-msg {
          font-size: 12px;
          color: var(--ink2);
          margin-top: 2px;
          line-height: 1.4;
        }
        .err-retry-btn {
          padding: 6px 12px;
          font-size: 11.5px;
        }
      `}</style>
    </div>
  );
}
