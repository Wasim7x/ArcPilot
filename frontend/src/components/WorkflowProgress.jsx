import React from 'react';
import { WORKFLOW_STAGES } from '../types/workflow';

export default function WorkflowProgress({
  progress = 0,
  currentNode,
  nextRequiredInput,
  currentStageLabel,
  stages = [],
  workflowStatus = 'idle',
}) {
  const stageMap = {};
  if (Array.isArray(stages)) {
    stages.forEach((s) => {
      stageMap[s.id] = s;
    });
  }

  const validProgress = Math.min(100, Math.max(0, parseInt(progress, 10) || 0));

  return (
    <aside className="sb-right">
      <div className="sb-title">Workflow Progress</div>

      {/* Dynamic Progress Metric Card */}
      <div className="prog-card">
        <div className="prog-bar">
          <div className="prog-fill" style={{ width: `${validProgress}%` }} />
        </div>
        <div className="prog-row">
          <span className="prog-label">{currentStageLabel || 'Initialized'}</span>
          <span className="prog-pct">{validProgress}%</span>
        </div>
      </div>

      {/* Distinction between CURRENT NODE and NEXT REQUIRED INPUT */}
      <div className="node-status-group">
        {currentNode && (
          <div className="info-box node-box">
            <div className="info-box-label">CURRENT PROCESSING NODE</div>
            <div className="info-box-val">{currentNode}</div>
          </div>
        )}

        {nextRequiredInput && nextRequiredInput !== 'end' && (
          <div className="info-box next-box">
            <div className="info-box-label">WAITING FOR HUMAN INPUT</div>
            <div className="info-box-val next-val">{nextRequiredInput}</div>
          </div>
        )}
      </div>

      {/* 13 Stage Authoritative Track */}
      <div className="stages-track">
        {WORKFLOW_STAGES.map((s, idx) => {
          const stageState = stageMap[s.id] || {};
          let status = stageState.status || (idx === 0 ? 'active' : 'locked');

          let icon = idx + 1;
          let subtext = s.desc;

          if (status === 'completed') {
            icon = '✓';
            subtext = 'Completed';
          } else if (status === 'waiting_for_input') {
            icon = '⏳';
            subtext = 'Waiting for decision';
          } else if (status === 'active') {
            icon = '⟳';
            subtext = 'In Progress…';
          }

          return (
            <div key={s.id} className={`stage-item ${status}`}>
              <div className="stage-node">{icon}</div>
              <div className="stage-info">
                <div className="stage-name">{s.label}</div>
                <div className="stage-desc">{subtext}</div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .sb-right {
          background: var(--bg2);
          border-left: 1px solid var(--border);
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .prog-card {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .prog-bar {
          height: 6px;
          background: var(--bg4);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .prog-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--green));
          border-radius: 4px;
          transition: width 0.45s ease;
        }
        .prog-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .prog-label {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--ink2);
        }
        .prog-pct {
          font-size: 13.5px;
          font-family: var(--mono);
          font-weight: 700;
          color: var(--green);
        }
        .node-status-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .info-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 9px 12px;
        }
        .info-box-label {
          font-size: 9px;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 3px;
          font-weight: 700;
        }
        .info-box-val {
          font-size: 11.5px;
          font-family: var(--mono);
          color: var(--accent2);
          word-break: break-all;
        }
        .next-box {
          border-color: rgba(245, 158, 11, 0.3);
          background: rgba(245, 158, 11, 0.06);
        }
        .next-box .info-box-label {
          color: var(--yellow);
        }
        .next-box .next-val {
          color: var(--yellow);
          font-weight: 700;
        }
        .stages-track {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stage-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          transition: all 0.18s;
        }
        .stage-item.completed {
          opacity: 1;
        }
        .stage-item.completed .stage-node {
          background: var(--green);
          border-color: var(--green);
          color: #081c15;
          font-weight: 700;
        }
        .stage-item.completed .stage-name {
          color: var(--green);
          font-weight: 600;
        }
        .stage-item.waiting_for_input {
          background: rgba(245, 158, 11, 0.08);
          border-color: rgba(245, 158, 11, 0.3);
          opacity: 1;
        }
        .stage-item.waiting_for_input .stage-node {
          background: var(--yellow);
          border-color: var(--yellow);
          color: #1c1305;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
          animation: pulse 1.8s infinite;
        }
        .stage-item.waiting_for_input .stage-name {
          color: var(--yellow);
          font-weight: 700;
        }
        .stage-item.active {
          background: rgba(99, 102, 241, 0.08);
          border-color: rgba(99, 102, 241, 0.3);
          opacity: 1;
        }
        .stage-item.active .stage-node {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          animation: pulse 1.8s infinite;
        }
        .stage-item.active .stage-name {
          color: var(--accent2);
          font-weight: 700;
        }
        .stage-item.locked {
          opacity: 0.38;
        }
        .stage-node {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--bg4);
          border: 1.5px solid var(--border2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-family: var(--mono);
          font-weight: 700;
          color: var(--ink3);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .stage-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .stage-name {
          font-size: 12px;
          color: var(--ink);
        }
        .stage-desc {
          font-size: 10px;
          color: var(--ink3);
          font-family: var(--mono);
          margin-top: 1px;
        }
      `}</style>
    </aside>
  );
}
