import React from 'react';

export default function ArtifactTabs({
  tabs = [],
  activeTab,
  onTabChange,
  onExport,
}) {
  return (
    <div className="inspector-head" id="artifact-tabs-bar">
      <div className="inspector-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`tab-btn-${t.id}`}
            className={`insp-tab ${t.id === activeTab ? 'active' : ''}`}
            onClick={() => onTabChange(t.id)}
          >
            <span>{t.label}</span>
            {t.count !== undefined && <span className="badge badge-blue">{t.count}</span>}
          </button>
        ))}
      </div>

      <div className="insp-actions">
        <button
          className="dl-mini-btn"
          onClick={() => onExport('txt')}
          title="Export Active Artifact as TXT"
          id="btn-export-active-txt"
        >
          TXT
        </button>
        <button
          className="dl-mini-btn"
          onClick={() => onExport('json')}
          title="Export Active Artifact as JSON"
          id="btn-export-active-json"
        >
          JSON
        </button>
        <button
          className="dl-mini-btn"
          onClick={() => onExport('html')}
          title="Export Active Artifact as HTML"
          id="btn-export-active-html"
        >
          HTML
        </button>
      </div>

      <style>{`
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
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 2px;
          max-width: 100%;
        }
        .insp-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          background: transparent;
          color: var(--ink2);
          font-family: var(--font);
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
          gap: 6px;
        }
        .dl-mini-btn {
          padding: 4px 8px;
          background: var(--bg4);
          border: 1px solid var(--border);
          color: var(--ink3);
          font-family: var(--mono);
          font-size: 10.5px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .dl-mini-btn:hover {
          color: var(--accent2);
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
}
