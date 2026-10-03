import React from 'react';

export default function QAViewer({ qaReport, testCases, repairAttempts }) {
  return (
    <div className="qa-viewer-container" id="qa-viewer">
      {qaReport && (
        <div className="metrics-row">
          <div className="metric-box">
            <div className="metric-lbl">Quality Gate</div>
            <div
              className="metric-num"
              style={{
                color: qaReport.quality_gate_passed ? 'var(--green)' : 'var(--red)',
                fontSize: '14px',
              }}
            >
              {qaReport.quality_gate_passed ? 'PASSED ✅' : 'FAILED ❌'}
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-lbl">Total Tests</div>
            <div className="metric-num">{qaReport.total_tests || 0}</div>
          </div>
          <div className="metric-box">
            <div className="metric-lbl">Passed</div>
            <div className="metric-num" style={{ color: 'var(--green)' }}>
              {qaReport.passed_tests || qaReport.passed || 0}
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-lbl">Failed</div>
            <div className="metric-num" style={{ color: 'var(--red)' }}>
              {qaReport.failed_tests || qaReport.failed || 0}
            </div>
          </div>
        </div>
      )}

      {Array.isArray(repairAttempts) && repairAttempts.length > 0 && (
        <div className="repair-card">
          <div className="repair-title">
            Automated Debug &amp; Repair History ({repairAttempts.length} Attempts)
          </div>
          {repairAttempts.map((a, i) => (
            <div key={i} className="repair-entry">
              • Attempt #{a.attempt_number}: {a.changes_summary}{' '}
              {Array.isArray(a.patched_files) && a.patched_files.length > 0
                ? `(${a.patched_files.join(', ')})`
                : ''}
            </div>
          ))}
        </div>
      )}

      <div className="doc-section">
        <div className="doc-section-header">
          <div className="doc-section-title">Generated Test Suite Preview</div>
          <span className="badge badge-blue">Pytest Suite</span>
        </div>
        <pre className="code-viewer-block">
          {testCases || 'Test cases generation in progress…'}
        </pre>
      </div>

      <style>{`
        .qa-viewer-container {
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
        .repair-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
        }
        .repair-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--yellow);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }
        .repair-entry {
          font-size: 11.5px;
          color: var(--ink2);
          margin-top: 4px;
          line-height: 1.5;
        }
        .doc-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .doc-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .doc-section-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--ink2);
          text-transform: uppercase;
          letter-spacing: 0.8px;
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
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}
