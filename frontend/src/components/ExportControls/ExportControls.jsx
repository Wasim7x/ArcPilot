import React from 'react';
import { exportArtifact } from '../../utils/export';
import { workflowApi } from '../../services/api';

export default function ExportControls({ state, taskId, baseUrl }) {
  const exportItems = [];

  if (state?.requirements || state?.structured_requirements) {
    exportItems.push({
      id: 'requirements',
      name: 'Requirements Spec',
      data: state.structured_requirements || state.requirements,
    });
  }
  if (state?.user_stories && state.user_stories.length > 0) {
    exportItems.push({
      id: 'user_stories',
      name: 'User Stories & Backlog',
      data: state.user_stories,
    });
  }
  if (state?.traceability_matrix && state.traceability_matrix.length > 0) {
    exportItems.push({
      id: 'traceability',
      name: 'Traceability Matrix',
      data: state.traceability_matrix,
    });
  }
  if (state?.design_documents) {
    exportItems.push({
      id: 'design',
      name: 'Architecture & Design',
      data: state.design_documents,
    });
  }
  if (state?.generated_files && Object.keys(state.generated_files).length > 0) {
    exportItems.push({
      id: 'code',
      name: 'Code Files',
      data: state.generated_files,
    });
  }
  if (state?.security_report || state?.security_review_comments) {
    exportItems.push({
      id: 'security',
      name: 'Security Audit Report',
      data: state.security_report || state.security_review_comments,
    });
  }
  if (state?.test_cases || state?.qa_report) {
    exportItems.push({
      id: 'qa',
      name: 'Test Suite & QA Report',
      data: { tests: state.test_cases, qa: state.qa_report },
    });
  }
  if (state?.deployment_result || state?.deployment_status === 'success') {
    exportItems.push({
      id: 'deployment',
      name: 'Deployment Package',
      data: state.deployment_result,
    });
  }

  return (
    <div className="sb-section" id="export-controls-section">
      <div className="sb-title">Project Exports &amp; Artifacts</div>
      <div className="dl-list">
        {exportItems.length === 0 ? (
          <div className="dl-empty">Generated artifacts appear here as stages complete.</div>
        ) : (
          exportItems.map((item) => (
            <div key={item.id} className="dl-item">
              <div className="dl-item-name">{item.name}</div>
              <div className="dl-btns">
                <button
                  className="dl-btn"
                  onClick={() => exportArtifact(item.id, 'txt', item.data, taskId)}
                  title="Export as TXT"
                >
                  TXT
                </button>
                <button
                  className="dl-btn"
                  onClick={() => exportArtifact(item.id, 'json', item.data, taskId)}
                  title="Export as JSON"
                >
                  JSON
                </button>
                <button
                  className="dl-btn"
                  onClick={() => exportArtifact(item.id, 'html', item.data, taskId)}
                  title="Export as HTML"
                >
                  HTML
                </button>
                {item.id === 'deployment' && taskId && (
                  <a
                    href={workflowApi.getDownloadZipUrl(baseUrl, taskId)}
                    className="dl-btn dl-btn-zip"
                    download
                    title="Download Complete Package ZIP"
                  >
                    ZIP
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .dl-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dl-item {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
        }
        .dl-item-name {
          font-size: 11.5px;
          color: var(--ink2);
          font-weight: 500;
          margin-bottom: 6px;
        }
        .dl-btns {
          display: flex;
          gap: 4px;
        }
        .dl-btn {
          flex: 1;
          padding: 4px 0;
          border-radius: 4px;
          border: 1px solid var(--border);
          background: var(--bg4);
          color: var(--ink3);
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--mono);
          text-align: center;
          text-decoration: none;
          transition: all 0.15s;
        }
        .dl-btn:hover {
          border-color: var(--accent);
          color: var(--accent2);
        }
        .dl-btn-zip {
          color: var(--green);
          font-weight: 700;
          border-color: var(--green-border);
        }
        .dl-btn-zip:hover {
          background: var(--green-bg);
          color: var(--green);
        }
        .dl-empty {
          font-size: 11px;
          color: var(--ink3);
          text-align: center;
          padding: 16px 0;
        }
      `}</style>
    </div>
  );
}
