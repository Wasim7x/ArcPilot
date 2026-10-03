import React from 'react';
import { safeText, safeList } from '../../utils/formatUtils';

export default function UserStoriesViewer({ stories = [] }) {
  const storyList = safeList(stories);

  if (storyList.length === 0) {
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
    <div className="stories-view-container" id="user-stories-viewer">
      <div className="stories-header-meta">
        <span className="stories-count-label">Agile User Stories ({storyList.length})</span>
        <span className="stories-sub-label">Decomposed from structured functional requirements</span>
      </div>

      <div className="stories-list">
        {storyList.map((s, idx) => {
          const storyId = safeText(s.story_id, `US-${String(idx + 1).padStart(2, '0')}`);
          const title = safeText(s.title, `User Story ${idx + 1}`);
          const priority = safeText(s.priority, 'High');
          const status = safeText(s.status, 'To Do');
          const description = safeText(s.description);
          const criteria = safeList(s.acceptance_criteria);
          const reqRefs = safeList(s.requirement_reference);

          return (
            <div key={storyId} className="story-card">
              <div className="story-header">
                <span className="story-id">{storyId}</span>
                <span className="story-title">{title}</span>
                <span className={getPriorityBadgeClass(priority)}>{priority}</span>
                <span className="badge badge-blue">{status}</span>
                {reqRefs.map((r, rIdx) => (
                  <span key={rIdx} className="badge badge-green">{safeText(r)}</span>
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
                        <span>{safeText(c)}</span>
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
        .stories-view-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .stories-header-meta {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding-bottom: 8px;
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
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: border-color 0.15s;
        }
        .story-card:hover {
          border-color: var(--border2);
        }
        .story-header {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .story-id {
          font-family: var(--mono);
          font-size: 11.5px;
          font-weight: 700;
          color: var(--accent2);
        }
        .story-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          flex: 1;
        }
        .story-desc {
          font-size: 12.5px;
          color: var(--ink2);
          line-height: 1.5;
        }
        .criteria-section {
          margin-top: 4px;
          padding-top: 8px;
          border-top: 1px solid var(--border);
        }
        .criteria-heading {
          font-size: 10px;
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
          gap: 4px;
        }
        .criteria-item {
          font-size: 12px;
          color: var(--ink2);
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .criteria-check {
          color: var(--green);
          font-size: 11px;
          font-weight: bold;
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
