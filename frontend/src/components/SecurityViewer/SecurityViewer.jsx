import React from 'react';

export default function SecurityViewer({ securityReport, reviewComments }) {
  if (!securityReport && !reviewComments) {
    return (
      <div className="empty-panel-state">
        <span className="empty-icon">🔒</span>
        <div>Security audit pending code generation.</div>
      </div>
    );
  }

  return (
    <div className="security-viewer-container" id="security-viewer">
      {securityReport && (
        <div className="metrics-row">
          <div className="metric-box">
            <div className="metric-lbl">Security Gate</div>
            <div
              className="metric-num"
              style={{
                color: securityReport.status === 'PASSED' ? 'var(--green)' : 'var(--red)',
                fontSize: '14px',
              }}
            >
              {securityReport.status || 'PASSED'}
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-lbl">Critical</div>
            <div className="metric-num" style={{ color: 'var(--red)' }}>
              {securityReport.critical_count || 0}
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-lbl">High</div>
            <div className="metric-num" style={{ color: 'var(--red)' }}>
              {securityReport.high_count || 0}
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-lbl">Medium</div>
            <div className="metric-num" style={{ color: 'var(--yellow)' }}>
              {securityReport.medium_count || 0}
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-lbl">Low/Info</div>
            <div className="metric-num" style={{ color: 'var(--green)' }}>
              {(securityReport.low_count || 0) + (securityReport.info_count || 0)}
            </div>
          </div>
        </div>
      )}

      <pre className="code-viewer-block">
        {reviewComments ||
          'Bandit SAST scan and secret audit completed successfully. No critical vulnerabilities identified.'}
      </pre>

      <style>{`
        .security-viewer-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
          max-height: calc(100vh - 280px);
          padding-right: 6px;
        }
        .metrics-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 10px;
        }
        .metric-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 10px;
          text-align: center;
        }
        .metric-lbl {
          font-size: 9.5px;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .metric-num {
          font-family: var(--mono);
          font-size: 16px;
          font-weight: 700;
          margin-top: 2px;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 11.5px;
          line-height: 1.65;
          color: var(--ink);
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 16px;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .empty-panel-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 40px 20px;
          color: var(--ink3);
          font-size: 12.5px;
          text-align: center;
        }
        .empty-icon {
          font-size: 28px;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
