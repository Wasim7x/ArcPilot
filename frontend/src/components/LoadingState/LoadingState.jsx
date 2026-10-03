import React from 'react';

export default function LoadingState({ message = 'Processing workflow stage…' }) {
  return (
    <div className="loading-state-box" id="loading-state-box">
      <div className="loading-spinner-ring" />
      <div className="loading-msg">{message}</div>
      <style>{`
        .loading-state-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 30px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .loading-spinner-ring {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(99, 102, 241, 0.2);
          border-top-color: var(--accent2);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .loading-msg {
          font-size: 13px;
          color: var(--ink2);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
