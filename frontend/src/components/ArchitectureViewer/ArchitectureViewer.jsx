import React from 'react';
import { safeText } from '../../utils/formatUtils';

export default function ArchitectureViewer({ designDocuments, technicalDocuments }) {
  if (!designDocuments && !technicalDocuments) {
    return (
      <div className="empty-panel-state">
        <span className="empty-icon">🏗️</span>
        <div>Architecture and design specifications will appear here once generated.</div>
      </div>
    );
  }

  const funcDoc = safeText(
    (designDocuments && (designDocuments.functional || designDocuments.architecture_overview)),
    'Functional design document pending generation.'
  );

  const techDoc = safeText(
    technicalDocuments || (designDocuments && designDocuments.technical),
    'Technical design document pending generation.'
  );

  const archOverview = safeText(
    (designDocuments && designDocuments.architecture_overview),
    'Modular Service-Oriented Architecture with FastAPI'
  );

  const dbSchema = safeText(
    (designDocuments && designDocuments.database_schema),
    'Relational / SQLite data schema with migration support'
  );

  return (
    <div className="architecture-view-container" id="architecture-viewer">
      <div className="design-grid">
        <div className="design-card">
          <div className="design-label">Architecture Style</div>
          <div className="design-val">{archOverview}</div>
        </div>
        <div className="design-card">
          <div className="design-label">Database &amp; Data Model</div>
          <div className="design-val">{dbSchema}</div>
        </div>
      </div>

      <div className="doc-section">
        <div className="doc-section-header">
          <div className="doc-section-title">Functional Design Specification (FDD)</div>
          <span className="badge badge-blue">Complete Markdown</span>
        </div>
        <pre className="code-viewer-block">
          {funcDoc}
        </pre>
      </div>

      <div className="doc-section">
        <div className="doc-section-header">
          <div className="doc-section-title">Technical Design Document (TDD)</div>
          <span className="badge badge-yellow">Technical Architecture</span>
        </div>
        <pre className="code-viewer-block">
          {techDoc}
        </pre>
      </div>

      <style>{`
        .architecture-view-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .design-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 768px) {
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
          margin-bottom: 4px;
        }
        .design-val {
          font-size: 12.5px;
          color: var(--ink);
          font-weight: 500;
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
