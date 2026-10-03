import React from 'react';

export default function UserStoriesPanel({ stories = [] }) {
  if (!Array.isArray(stories) || stories.length === 0) {
    return (
      <div className="empty-panel-state">
        <span className="empty-icon">📋</span>
        <div>User stories are pending generation. Submit requirements to generate stories.</div>
      </div>
    );
  }

  const getPriorityBadgeClass = (priority) => {
    const p = String(priority || 'HIGH').toUpperCase();
    if (p === 'HIGH' || p === 'CRITICAL') return 'badge badge-red';
    if (p === 'MEDIUM') return 'badge badge-yellow';
    return 'badge badge-blue';
  };

  return (
    <div className="stories-container">
      <div className="stories-header-meta">
        <span className="stories-count-label">Agile User Stories ({stories.length})</span>
        <span className="stories-sub-label">Decomposed from structured functional requirements</span>
      </div>

      <div className="stories-list">
        {stories.map((s, idx) => {
          const storyId = s.story_id || `US-${String(idx + 1).padStart(2, '0')}`;
          const title = s.title || `User Story ${idx + 1}`;
          const priority = s.priority || 'High';
          const status = s.status || 'To Do';
          const description = s.description || '';
          const criteria = Array.isArray(s.acceptance_criteria) ? s.acceptance_criteria : [];
          const reqRefs = Array.isArray(s.requirement_reference)
            ? s.requirement_reference
            : s.requirement_reference
            ? [s.requirement_reference]
            : [];

          return (
            <div key={storyId} className="story-card">
              <div className="story-header">
                <span className="story-id">{storyId}</span>
                <span className="story-title">{title}</span>
                <span className={getPriorityBadgeClass(priority)}>{priority}</span>
                <span className="badge badge-blue">{status}</span>
                {reqRefs.map((r) => (
                  <span key={r} className="badge badge-green">{r}</span>
                ))}
              </div>

              {description && <div className="story-desc">{description}</div>}

              {criteria.length > 0 && (
                <div className="criteria-section">
                  <div className="criteria-heading">Acceptance Criteria</div>
                  <ul className="criteria-list">
                    {criteria.map((c, cIdx) => (
                      <li key={cIdx} className="criteria-item">
                        <span className="criteria-check">✓</span>
                        <span>{typeof c === 'string' ? c : JSON.stringify(c)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .stories-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stories-header-meta {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--border);
        }
        .stories-count-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }
        .stories-sub-label {
          font-size: 11px;
          color: var(--ink3);
        }
        .stories-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .story-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          transition: border-color 0.18s;
        }
        .story-card:hover {
          border-color: var(--border2);
        }
        .story-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .story-id {
          font-family: var(--mono);
          font-weight: 700;
          color: var(--accent2);
          font-size: 11.5px;
        }
        .story-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          flex: 1;
        }
        .story-desc {
          font-size: 12px;
          color: var(--ink2);
          line-height: 1.6;
          margin-bottom: 10px;
        }
        .criteria-section {
          background: var(--bg4);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          margin-top: 6px;
        }
        .criteria-heading {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }
        .criteria-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .criteria-item {
          font-size: 11.5px;
          color: var(--ink2);
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.45;
        }
        .criteria-check {
          color: var(--green);
          font-weight: 700;
          font-size: 11px;
          flex-shrink: 0;
          margin-top: 1px;
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
