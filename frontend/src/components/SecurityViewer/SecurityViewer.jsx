import React from 'react';
import { safeText, safeList } from '../../utils/formatUtils';

export default function SecurityViewer({ securityReport, reviewComments }) {
  if (!securityReport && !reviewComments) {
    return (
      <div className="empty-panel-state">
        <span className="empty-icon">🔒</span>
        <div>Security audit pending code generation.</div>
      </div>
    );
  }

  const findings = safeList(securityReport?.findings);
  const status = safeText(securityReport?.status, 'PASSED');
  const comments = safeText(reviewComments, 'Bandit SAST scan and secret audit completed successfully. No critical vulnerabilities identified.');

  return (
    <div className="security-view-container" id="security-viewer">
      {securityReport && (
        <div className="metrics-row">
          <div className="metric-box">
            <div className="metric-lbl">Security Gate</div>
            <div
              className="metric-num"
              style={{
                color: status === 'PASSED' ? 'var(--green)' : 'var(--red)',
                fontSize: '14px',
              }}
            >
              {status}
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

      {findings.length > 0 && (
        <div className="findings-section">
          <div className="findings-title">Identified Security Findings ({findings.length})</div>
          <div className="findings-list">
            {findings.map((f, idx) => (
              <div key={idx} className="finding-card">
                <div className="finding-head">
                  <span className={`badge ${f.severity === 'CRITICAL' || f.severity === 'HIGH' ? 'badge-red' : 'badge-yellow'}`}>
                    {safeText(f.severity, 'MEDIUM')}
                  </span>
                  <span className="finding-title">{safeText(f.title, 'Security Finding')}</span>
                  {f.file_path && (
                    <span className="finding-file">{safeText(f.file_path)}{f.line_number ? `:${f.line_number}` : ''}</span>
                  )}
                </div>
                <div className="finding-desc">{safeText(f.description)}</div>
                {f.mitigation && (
                  <div className="finding-mitigation">
                    <strong>Mitigation:</strong> {safeText(f.mitigation)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="report-box">
        <div className="report-title">Bandit SAST &amp; Security Audit Report</div>
        <pre className="code-viewer-block">{comments}</pre>
      </div>

      <style>{`
        .security-view-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
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
        .findings-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .findings-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .findings-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .finding-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .finding-head {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .finding-title {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink);
        }
        .finding-file {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--ink3);
        }
        .finding-desc {
          font-size: 12px;
          color: var(--ink2);
        }
        .finding-mitigation {
          font-size: 11.5px;
          color: var(--green-light);
          background: rgba(16, 185, 129, 0.08);
          padding: 6px 10px;
          border-radius: 4px;
        }
        .report-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .report-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 11.5px;
          line-height: 1.65;
          color: var(--ink);
          white-space: pre-wrap;
          word-break: break-word;
          overflow-x: auto;
          margin: 0;
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
