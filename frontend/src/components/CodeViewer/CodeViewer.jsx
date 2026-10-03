import React, { useState, useEffect } from 'react';

export default function CodeViewer({ generatedFiles, staticAnalysis, comments }) {
  const [selectedFile, setSelectedFile] = useState('');

  const files = generatedFiles || {};
  const fileNames = Object.keys(files);

  useEffect(() => {
    if (fileNames.length > 0 && (!selectedFile || !files[selectedFile])) {
      setSelectedFile(fileNames[0]);
    }
  }, [fileNames, selectedFile, files]);

  if (fileNames.length === 0) {
    return (
      <div className="empty-panel-state">
        <span className="empty-icon">💻</span>
        <div>Code generation in progress or pending.</div>
      </div>
    );
  }

  return (
    <div className="code-viewer-container" id="code-viewer">
      {staticAnalysis && (
        <div className="metrics-row">
          <div className="metric-box">
            <div className="metric-lbl">Analysis Status</div>
            <div
              className="metric-num"
              style={{
                color: staticAnalysis.passed ? 'var(--green)' : 'var(--red)',
                fontSize: '13px',
              }}
            >
              {staticAnalysis.passed ? 'PASSED ✅' : 'NEEDS REVISION ⚠️'}
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-lbl">Total Issues</div>
            <div className="metric-num">{staticAnalysis.total_issues || 0}</div>
          </div>
          <div className="metric-box">
            <div className="metric-lbl">Errors</div>
            <div className="metric-num" style={{ color: 'var(--red)' }}>
              {staticAnalysis.errors || 0}
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-lbl">Warnings</div>
            <div className="metric-num" style={{ color: 'var(--yellow)' }}>
              {staticAnalysis.warnings || 0}
            </div>
          </div>
        </div>
      )}

      {/* File Tabs Strip */}
      <div className="file-tabs-strip">
        {fileNames.map((fn) => (
          <button
            key={fn}
            className={`file-tab-btn ${fn === selectedFile ? 'active' : ''}`}
            onClick={() => setSelectedFile(fn)}
          >
            {fn}
          </button>
        ))}
      </div>

      {/* File Content Preview */}
      <pre className="code-viewer-block">
        {selectedFile ? files[selectedFile] : 'Select a file to inspect.'}
      </pre>

      {comments && (
        <div className="review-notes-box">
          <div className="notes-heading">Automated Code Review Notes</div>
          <pre className="code-viewer-block">{comments}</pre>
        </div>
      )}

      <style>{`
        .code-viewer-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
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
        .file-tabs-strip {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .file-tab-btn {
          padding: 5px 12px;
          border-radius: 6px;
          background: var(--bg3);
          border: 1px solid var(--border);
          font-family: var(--mono);
          font-size: 11px;
          color: var(--ink3);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .file-tab-btn:hover {
          color: var(--ink);
          background: var(--bg4);
        }
        .file-tab-btn.active {
          background: var(--bg4);
          border-color: var(--accent);
          color: var(--accent2);
          font-weight: 600;
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
        .review-notes-box {
          margin-top: 6px;
        }
        .notes-heading {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
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
