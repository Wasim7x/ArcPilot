import React, { useState, useEffect } from 'react';
import { safeText } from '../../utils/formatUtils';

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

  const reviewNotes = safeText(comments);

  return (
    <div className="code-view-container" id="code-viewer">
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
      <div className="code-file-container">
        <div className="code-file-header">
          <span className="code-file-name">{selectedFile}</span>
          <span className="badge badge-blue">
            {selectedFile ? `${safeText(files[selectedFile]).split('\n').length} lines` : ''}
          </span>
        </div>
        <pre className="code-viewer-block">
          {selectedFile ? safeText(files[selectedFile]) : 'Select a file to inspect.'}
        </pre>
      </div>

      {reviewNotes && (
        <div className="review-notes-box">
          <div className="notes-heading">Automated Code Review Notes</div>
          <pre className="code-viewer-block">{reviewNotes}</pre>
        </div>
      )}

      <style>{`
        .code-view-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
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
        .file-tabs-strip {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .file-tab-btn {
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          background: var(--bg3);
          border: 1px solid var(--border);
          font-family: var(--mono);
          font-size: 11.5px;
          color: var(--ink2);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .file-tab-btn:hover {
          color: var(--ink);
          border-color: var(--border2);
        }
        .file-tab-btn.active {
          background: var(--bg4);
          border-color: var(--accent);
          color: var(--accent2);
          font-weight: 600;
        }
        .code-file-container {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .code-file-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 14px;
          background: var(--bg4);
          border-bottom: 1px solid var(--border);
        }
        .code-file-name {
          font-family: var(--mono);
          font-size: 12px;
          color: var(--ink);
          font-weight: 600;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 12px;
          line-height: 1.65;
          color: var(--ink);
          padding: 16px;
          white-space: pre;
          overflow-x: auto;
          margin: 0;
        }
        .review-notes-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .notes-heading {
          font-size: 11px;
          font-weight: 700;
          color: var(--yellow);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
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
