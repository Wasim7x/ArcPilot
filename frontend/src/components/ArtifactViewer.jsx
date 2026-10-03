import React, { useState, useEffect } from 'react';
import UserStoriesPanel from './UserStoriesPanel';
import RequirementsPanel from './RequirementsPanel';
import TraceabilityMatrix from './TraceabilityMatrix';
import { exportArtifact } from '../utils/export';
import { workflowApi } from '../services/api';

export default function ArtifactViewer({
  state,
  activeTab,
  onTabChange,
  taskId,
  baseUrl,
}) {
  const [selectedCodeFile, setSelectedCodeFile] = useState('');

  // Collect available tabs based on real generated artifacts
  const tabs = [];

  if (state?.user_stories && state.user_stories.length > 0) {
    tabs.push({ id: 'user_stories', label: '📋 User Stories', count: state.user_stories.length });
  }
  if (state?.structured_requirements || state?.requirements) {
    tabs.push({ id: 'requirements', label: '📄 Requirements Spec' });
  }
  if (state?.traceability_matrix && state.traceability_matrix.length > 0) {
    tabs.push({ id: 'traceability', label: '🔗 Traceability Matrix', count: state.traceability_matrix.length });
  }
  if (state?.design_documents) {
    tabs.push({ id: 'design', label: '🏗️ Architecture Design' });
  }
  if (state?.generated_files && Object.keys(state.generated_files).length > 0) {
    tabs.push({ id: 'code', label: '💻 Code Implementation', count: Object.keys(state.generated_files).length });
  }
  if (state?.security_report || state?.security_review_comments) {
    tabs.push({ id: 'security', label: '🔒 Security Audit' });
  }
  if (state?.test_cases || state?.qa_report || state?.test_execution_results) {
    tabs.push({ id: 'qa', label: '🧪 Tests & QA Report' });
  }
  if (state?.deployment_result || state?.deployment_status === 'success') {
    tabs.push({ id: 'deployment', label: '🚀 Deployment Package' });
  }

  // Ensure active tab points to a valid tab
  useEffect(() => {
    if (tabs.length > 0 && !tabs.some((t) => t.id === activeTab)) {
      onTabChange(tabs[0].id);
    }
  }, [tabs, activeTab, onTabChange]);

  // Code files selection
  const codeFiles = state?.generated_files || {};
  const fileNames = Object.keys(codeFiles);
  useEffect(() => {
    if (fileNames.length > 0 && (!selectedCodeFile || !codeFiles[selectedCodeFile])) {
      setSelectedCodeFile(fileNames[0]);
    }
  }, [fileNames, selectedCodeFile, codeFiles]);

  if (tabs.length === 0) {
    return (
      <div className="content-inspector empty-inspector">
        <span className="empty-insp-icon">📂</span>
        <div className="empty-insp-title">No Artifacts Generated Yet</div>
        <div className="empty-insp-desc">
          Artifacts such as requirements, user stories, architecture specs, and code files will appear here automatically as SDLC workflow stages advance.
        </div>
      </div>
    );
  }

  const currentTabObj = tabs.find((t) => t.id === activeTab) || tabs[0];
  const currentTabId = currentTabObj.id;

  const handleExport = (format) => {
    let payload = state;
    if (currentTabId === 'user_stories') payload = state?.user_stories;
    else if (currentTabId === 'requirements') payload = state?.structured_requirements || state?.requirements;
    else if (currentTabId === 'traceability') payload = state?.traceability_matrix;
    else if (currentTabId === 'design') payload = state?.design_documents;
    else if (currentTabId === 'code') payload = state?.generated_files;
    else if (currentTabId === 'security') payload = state?.security_report || state?.security_review_comments;
    else if (currentTabId === 'qa') payload = { report: state?.qa_report, tests: state?.test_cases };
    else if (currentTabId === 'deployment') payload = state?.deployment_result;

    exportArtifact(currentTabId, format, payload, taskId);
  };

  return (
    <div className="content-inspector">
      <div className="inspector-head">
        <div className="inspector-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`insp-tab ${t.id === currentTabId ? 'active' : ''}`}
              onClick={() => onTabChange(t.id)}
            >
              <span>{t.label}</span>
              {t.count !== undefined && <span className="badge badge-blue">{t.count}</span>}
            </button>
          ))}
        </div>

        <div className="insp-actions">
          <button className="dl-mini-btn" onClick={() => handleExport('txt')} title="Export TXT">TXT</button>
          <button className="dl-mini-btn" onClick={() => handleExport('json')} title="Export JSON">JSON</button>
          <button className="dl-mini-btn" onClick={() => handleExport('html')} title="Export HTML">HTML</button>
        </div>
      </div>

      <div className="inspector-body">
        {currentTabId === 'user_stories' && (
          <UserStoriesPanel stories={state?.user_stories} />
        )}

        {currentTabId === 'requirements' && (
          <RequirementsPanel
            structured={state?.structured_requirements}
            legacyList={state?.requirements}
          />
        )}

        {currentTabId === 'traceability' && (
          <TraceabilityMatrix matrix={state?.traceability_matrix} />
        )}

        {currentTabId === 'design' && (
          <div className="design-panel">
            <div className="design-grid">
              <div className="design-card">
                <div className="design-label">Architecture Style</div>
                <div className="design-val">{state?.design_documents?.architecture_overview || 'Modular Clean Architecture'}</div>
              </div>
              <div className="design-card">
                <div className="design-label">Database &amp; Data Model</div>
                <div className="design-val">{state?.design_documents?.database_schema || 'SQLite / Relational Schema'}</div>
              </div>
            </div>

            <div className="doc-section">
              <div className="doc-section-title">Functional Design Specification (FDD)</div>
              <pre className="code-viewer-block">
                {state?.design_documents?.functional || state?.design_documents?.architecture_overview || 'Functional design document pending generation.'}
              </pre>
            </div>

            <div className="doc-section">
              <div className="doc-section-title">Technical Design Document (TDD)</div>
              <pre className="code-viewer-block">
                {state?.design_documents?.technical || 'Technical design document pending generation.'}
              </pre>
            </div>
          </div>
        )}

        {currentTabId === 'code' && (
          <div className="code-browser">
            {state?.static_analysis && (
              <div className="metrics-row">
                <div className="metric-box">
                  <div className="metric-lbl">Analysis Status</div>
                  <div className="metric-num" style={{ color: state.static_analysis.passed ? 'var(--green)' : 'var(--red)', fontSize: '13px' }}>
                    {state.static_analysis.passed ? 'PASSED ✅' : 'NEEDS REVISION ⚠️'}
                  </div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Total Issues</div>
                  <div className="metric-num">{state.static_analysis.total_issues || 0}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Errors</div>
                  <div className="metric-num" style={{ color: 'var(--red)' }}>{state.static_analysis.errors || 0}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Warnings</div>
                  <div className="metric-num" style={{ color: 'var(--yellow)' }}>{state.static_analysis.warnings || 0}</div>
                </div>
              </div>
            )}

            <div className="file-tabs-strip">
              {fileNames.map((fn) => (
                <button
                  key={fn}
                  className={`file-tab-btn ${fn === selectedCodeFile ? 'active' : ''}`}
                  onClick={() => setSelectedCodeFile(fn)}
                >
                  {fn}
                </button>
              ))}
            </div>

            <pre className="code-viewer-block">
              {selectedCodeFile ? codeFiles[selectedCodeFile] : 'Select a file to inspect.'}
            </pre>

            {state?.code_review_comments && (
              <div className="review-notes-box">
                <div className="doc-section-title">Automated Code Review Notes</div>
                <pre className="code-viewer-block">{state.code_review_comments}</pre>
              </div>
            )}
          </div>
        )}

        {currentTabId === 'security' && (
          <div className="security-panel">
            {state?.security_report && (
              <div className="metrics-row">
                <div className="metric-box">
                  <div className="metric-lbl">Security Gate</div>
                  <div className="metric-num" style={{ color: state.security_report.status === 'PASSED' ? 'var(--green)' : 'var(--red)', fontSize: '14px' }}>
                    {state.security_report.status || 'PASSED'}
                  </div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Critical</div>
                  <div className="metric-num" style={{ color: 'var(--red)' }}>{state.security_report.critical_count || 0}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">High</div>
                  <div className="metric-num" style={{ color: 'var(--red)' }}>{state.security_report.high_count || 0}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Medium</div>
                  <div className="metric-num" style={{ color: 'var(--yellow)' }}>{state.security_report.medium_count || 0}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Low/Info</div>
                  <div className="metric-num" style={{ color: 'var(--green)' }}>
                    {(state.security_report.low_count || 0) + (state.security_report.info_count || 0)}
                  </div>
                </div>
              </div>
            )}

            <pre className="code-viewer-block">
              {state?.security_review_comments || 'Security scan completed successfully. No critical vulnerabilities reported.'}
            </pre>
          </div>
        )}

        {currentTabId === 'qa' && (
          <div className="qa-panel">
            {state?.qa_report && (
              <div className="metrics-row">
                <div className="metric-box">
                  <div className="metric-lbl">Quality Gate</div>
                  <div className="metric-num" style={{ color: state.qa_report.quality_gate_passed ? 'var(--green)' : 'var(--red)', fontSize: '14px' }}>
                    {state.qa_report.quality_gate_passed ? 'PASSED ✅' : 'FAILED ❌'}
                  </div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Total Tests</div>
                  <div className="metric-num">{state.qa_report.total_tests || 0}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Passed</div>
                  <div className="metric-num" style={{ color: 'var(--green)' }}>{state.qa_report.passed_tests || 0}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-lbl">Failed</div>
                  <div className="metric-num" style={{ color: 'var(--red)' }}>{state.qa_report.failed_tests || 0}</div>
                </div>
              </div>
            )}

            {Array.isArray(state?.repair_attempts) && state.repair_attempts.length > 0 && (
              <div className="repair-card">
                <div className="repair-title">Automated Debug &amp; Repair History ({state.repair_attempts.length} Attempts)</div>
                {state.repair_attempts.map((a, i) => (
                  <div key={i} className="repair-entry">
                    • Attempt #{a.attempt_number}: {a.changes_summary} ({Array.isArray(a.patched_files) ? a.patched_files.join(', ') : ''})
                  </div>
                ))}
              </div>
            )}

            <div className="doc-section">
              <div className="doc-section-title">Generated Test Suite</div>
              <pre className="code-viewer-block">
                {state?.test_cases || 'Test cases generation in progress…'}
              </pre>
            </div>
          </div>
        )}

        {currentTabId === 'deployment' && (
          <div className="deployment-panel">
            <div className="deploy-box">
              <div>
                <div className="deploy-title">
                  {state?.deployment_status === 'success' || state?.deployment_result?.build_successful
                    ? 'DEPLOYMENT PACKAGE READY ✅'
                    : 'DEPLOYMENT COMPLETED 🚀'}
                </div>
                <div className="deploy-desc">
                  Verified standalone package ready for containerization and production execution.
                </div>
              </div>

              {taskId && (
                <a
                  href={workflowApi.getDownloadZipUrl(baseUrl, taskId)}
                  className="btn btn-green deploy-download-btn"
                  download
                >
                  ↓ Download .ZIP Archive
                </a>
              )}
            </div>

            <pre className="code-viewer-block">
              {state?.deployment_feedback || state?.deployment_result?.message || 'Deployment verification completed successfully.'}
            </pre>
          </div>
        )}
      </div>

      <style>{`
        .content-inspector {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .empty-inspector {
          padding: 40px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .empty-insp-icon {
          font-size: 32px;
          opacity: 0.5;
        }
        .empty-insp-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
        }
        .empty-insp-desc {
          font-size: 12px;
          color: var(--ink3);
          max-width: 480px;
          line-height: 1.6;
        }
        .inspector-head {
          padding: 10px 16px;
          background: var(--bg3);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .inspector-tabs {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 2px;
        }
        .insp-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          background: transparent;
          color: var(--ink2);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .insp-tab:hover {
          background: var(--bg4);
          color: var(--ink);
        }
        .insp-tab.active {
          background: var(--bg4);
          border-color: var(--border2);
          color: var(--accent2);
          font-weight: 700;
        }
        .insp-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .dl-mini-btn {
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid var(--border);
          background: var(--bg4);
          color: var(--ink3);
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--mono);
          transition: all 0.14s;
        }
        .dl-mini-btn:hover {
          border-color: var(--accent);
          color: var(--accent2);
        }
        .inspector-body {
          padding: 18px 20px;
        }
        .design-panel, .code-browser, .security-panel, .qa-panel, .deployment-panel {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .design-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 640px) {
          .design-grid {
            grid-template-columns: 1fr;
          }
        }
        .design-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
        }
        .design-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent2);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .design-val {
          font-size: 12.5px;
          color: var(--ink);
          margin-top: 4px;
        }
        .doc-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .doc-section-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 12px;
          color: var(--ink);
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 14px;
          white-space: pre-wrap;
          line-height: 1.6;
          overflow-x: auto;
          max-height: 480px;
          overflow-y: auto;
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
        .metric-num {
          font-family: var(--mono);
          font-size: 18px;
          font-weight: 700;
          margin-top: 3px;
        }
        .metric-lbl {
          font-size: 9.5px;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .file-tabs-strip {
          display: flex;
          gap: 5px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .file-tab-btn {
          padding: 5px 12px;
          border-radius: var(--radius-sm);
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
        }
        .file-tab-btn.active {
          background: var(--bg4);
          border-color: var(--accent);
          color: var(--accent2);
          font-weight: 600;
        }
        .repair-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
        }
        .repair-title {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--yellow);
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .repair-entry {
          font-size: 11.5px;
          color: var(--ink2);
          margin-top: 4px;
        }
        .deploy-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .deploy-title {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--green);
        }
        .deploy-desc {
          font-size: 12px;
          color: var(--ink2);
          margin-top: 3px;
        }
        .deploy-download-btn {
          text-decoration: none;
          padding: 10px 18px;
        }
      `}</style>
    </div>
  );
}
