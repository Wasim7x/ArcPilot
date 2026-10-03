import React, { useState } from 'react';

export default function WorkflowStage({
  taskId,
  workflowState,
  isWorkflowStarting,
  onStartWorkflow,
}) {
  const [projectName, setProjectName] = useState('AI Trip Planner');
  const [requirementsText, setRequirementsText] = useState(
    'Build an intelligent travel planning application where a user provides destination, duration, budget and interests. The system should retrieve relevant weather, currency and travel information and generate a personalized day-by-day itinerary.'
  );
  const [initError, setInitError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const hasSubmittedRequirements = Boolean(
    taskId &&
    (workflowState?.requirements ||
      workflowState?.structured_requirements ||
      (workflowState?.progress && workflowState.progress > 10))
  );

  const handleStartSubmit = (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      setInitError('Please enter a project name.');
      return;
    }
    if (!requirementsText.trim()) {
      setInitError('Please enter your project requirements description.');
      return;
    }
    setInitError('');
    onStartWorkflow({
      projectName: projectName.trim(),
      requirementsText: requirementsText.trim(),
    });
  };

  return (
    <div
      className={`init-card ${hasSubmittedRequirements ? 'card-completed' : 'card-active'}`}
      id="workflow-stage-card"
    >
      <div className="card-head">
        <div className={`card-badge ${hasSubmittedRequirements ? 'done' : 'active'}`}>
          {hasSubmittedRequirements ? '✓' : '01'}
        </div>
        <div className="card-title-group">
          <div className="card-title">
            {hasSubmittedRequirements ? `Project: ${projectName}` : 'Project Requirements Specification'}
          </div>
          <div className="card-sub">
            {hasSubmittedRequirements
              ? 'Requirements decomposed & structured with LLM'
              : 'Define requirements in natural language to initiate SDLC workflow'}
          </div>
        </div>
        {hasSubmittedRequirements && (
          <button
            type="button"
            className="btn-toggle-expand"
            onClick={() => setIsExpanded(!isExpanded)}
            title="Toggle prompt details"
          >
            {isExpanded ? 'Hide Details ▲' : 'Show Details ▼'}
          </button>
        )}
      </div>

      {(!hasSubmittedRequirements || isExpanded) && (
        <div className="init-body">
          {initError && (
            <div className="init-error-banner">
              <span>✕</span> {initError}
            </div>
          )}

          <div className="fld">
            <label htmlFor="input-project-name">Project Name</label>
            <input
              id="input-project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              disabled={hasSubmittedRequirements || isWorkflowStarting}
              placeholder="e.g. AI Trip Planner"
            />
          </div>

          <div className="fld">
            <label htmlFor="input-requirements-text">Natural-Language Requirements</label>
            <textarea
              id="input-requirements-text"
              className="init-ta"
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              disabled={hasSubmittedRequirements || isWorkflowStarting}
              rows={3}
              placeholder="Describe software requirements..."
            />
          </div>

          <div className="init-actions">
            {!hasSubmittedRequirements && (
              <button
                type="button"
                className="btn btn-accent btn-start-workflow"
                onClick={handleStartSubmit}
                disabled={isWorkflowStarting}
                id="btn-start-sdlc-workflow"
              >
                {isWorkflowStarting ? (
                  <>
                    <span className="spin" />
                    <span>Decomposing Requirements…</span>
                  </>
                ) : (
                  <>
                    <span>Start SDLC Workflow</span>
                    <span>→</span>
                  </>
                )}
              </button>
            )}

            {hasSubmittedRequirements && (
              <div className="status-locked-pill">
                <span className="pill-dot">✓</span>
                <span>Requirements Active in Workflow</span>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .init-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .init-card.card-active {
          border-color: rgba(99, 102, 241, 0.4);
        }
        .init-card.card-completed {
          opacity: 0.95;
        }
        .card-head {
          padding: 10px 16px;
          background: var(--bg3);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .card-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-family: var(--mono);
          font-weight: 700;
          color: var(--ink3);
          flex-shrink: 0;
        }
        .card-badge.active {
          background: var(--accent);
          color: #fff;
        }
        .card-badge.done {
          background: var(--green);
          color: #081c15;
        }
        .card-title-group {
          flex: 1;
        }
        .card-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }
        .card-sub {
          font-size: 11px;
          color: var(--ink3);
        }
        .btn-toggle-expand {
          background: var(--bg4);
          border: 1px solid var(--border);
          color: var(--ink2);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-toggle-expand:hover {
          color: var(--ink);
          border-color: var(--accent);
        }
        .init-body {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-top: 1px solid var(--border);
        }
        .init-error-banner {
          background: var(--red-bg);
          border: 1px solid var(--red-border);
          color: var(--red-light);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 11.5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .init-ta {
          width: 100%;
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--ink);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          font-family: var(--font);
          font-size: 12px;
          line-height: 1.5;
          resize: vertical;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .init-ta:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-bg);
        }
        .init-ta:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .init-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }
        .btn-start-workflow {
          padding: 8px 18px;
          font-size: 12px;
        }
        .status-locked-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--green-light);
          background: var(--green-bg);
          border: 1px solid var(--green-border);
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 500;
        }
        .pill-dot {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
