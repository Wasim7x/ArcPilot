import React, { useState, useEffect } from 'react';
import { HUMAN_REVIEW_META } from '../types/workflow';

export default function ReviewPanel({
  stageKey,
  onSubmitReview,
  isSubmitting,
  error,
  successMessage,
  onClearError,
}) {
  const meta = HUMAN_REVIEW_META[stageKey] || {
    title: 'Human Review Gate',
    icon: '👤',
    stage: stageKey,
    desc: 'Review the generated artifacts and provide your approval or revision decision.',
    approveLabel: 'Approve & Continue',
    rejectLabel: 'Reject / Request Changes',
    nextStageLabel: 'Next Stage',
    feedbackPlaceholder: 'Enter feedback or requested revisions...',
  };

  const [decision, setDecision] = useState('approve'); // Default to 'approve'
  const [feedback, setFeedback] = useState('');
  const [clientValidationError, setClientValidationError] = useState('');

  // Reset decision and feedback when stage changes
  useEffect(() => {
    setDecision('approve');
    setFeedback('');
    setClientValidationError('');
  }, [stageKey]);

  const handleSelectDecision = (val) => {
    setDecision(val);
    setClientValidationError('');
    if (onClearError) onClearError();
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (isSubmitting) return;

    if (!decision) {
      setClientValidationError('Please select either "Approve & Continue" or "Reject / Request Changes".');
      return;
    }

    if (decision === 'request_changes' && !feedback.trim()) {
      setClientValidationError('Feedback comments are required when requesting revisions so the AI agent knows what to fix.');
      return;
    }

    setClientValidationError('');
    onSubmitReview({
      stage: stageKey,
      decision,
      feedback: feedback.trim(),
    });
  };

  const isApproved = decision === 'approve';
  const isRejected = decision === 'request_changes';

  return (
    <div className="review-panel" id="review-panel">
      {/* Review Gate Header */}
      <div className="rp-header">
        <div className="rp-icon">{meta.icon}</div>
        <div className="rp-title-wrap">
          <div className="rp-title">
            <span>{meta.title}</span>
            <span className="rp-status-tag">Waiting for Decision</span>
          </div>
          <div className="rp-desc">{meta.desc}</div>
        </div>
      </div>

      <div className="rp-body">
        {/* Success Feedback Banner */}
        {successMessage && (
          <div className="review-banner review-banner-success">
            <span className="banner-icon">✓</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Feedback Banner */}
        {(error || clientValidationError) && (
          <div className="review-banner review-banner-error">
            <span className="banner-icon">✕</span>
            <span className="banner-text">{clientValidationError || error}</span>
            {error && (
              <button
                type="button"
                className="banner-retry-btn"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Retry
              </button>
            )}
          </div>
        )}

        {/* Decision Toggle Cards */}
        <div className="decision-group">
          <button
            type="button"
            className={`decision-btn decision-btn-approve ${isApproved ? 'selected' : ''}`}
            onClick={() => handleSelectDecision('approve')}
            disabled={isSubmitting}
            id="btn-select-approve"
          >
            <div className="dec-icon-box">✓</div>
            <div className="dec-txt-box">
              <div className="dec-title">{meta.approveLabel || 'Approve & Continue'}</div>
              <div className="dec-sub">Accept artifacts and advance to {meta.nextStageLabel}</div>
            </div>
            {isApproved && <div className="dec-check-mark">SELECTED</div>}
          </button>

          <button
            type="button"
            className={`decision-btn decision-btn-reject ${isRejected ? 'selected' : ''}`}
            onClick={() => handleSelectDecision('request_changes')}
            disabled={isSubmitting}
            id="btn-select-reject"
          >
            <div className="dec-icon-box">✎</div>
            <div className="dec-txt-box">
              <div className="dec-title">{meta.rejectLabel || 'Reject / Request Changes'}</div>
              <div className="dec-sub">Provide feedback to trigger regeneration</div>
            </div>
            {isRejected && <div className="dec-check-mark">SELECTED</div>}
          </button>
        </div>

        {/* Controlled Feedback Textarea */}
        <div className="feedback-box">
          <div className="feedback-label">
            <label htmlFor="review-feedback-textarea">
              Review Feedback &amp; Revision Notes
            </label>
            <span className={`feedback-hint ${isRejected ? 'required-hint' : ''}`}>
              {isRejected ? '(Required for revisions)' : '(Optional feedback)'}
            </span>
          </div>
          <textarea
            id="review-feedback-textarea"
            className={`feedback-ta ${isRejected && !feedback.trim() && clientValidationError ? 'has-error' : ''}`}
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              if (clientValidationError) setClientValidationError('');
            }}
            placeholder={meta.feedbackPlaceholder}
            disabled={isSubmitting}
            rows={5}
          />
        </div>

        {/* Action Button Bar with Explicit Submit Review Button */}
        <div className="rp-actions">
          <button
            type="button"
            className={`btn-submit-decision ${isApproved ? 'btn-submit-approve' : 'btn-submit-reject'}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
            id="btn-submit-review"
          >
            {isSubmitting ? (
              <>
                <span className="spin" />
                <span>Submitting review to LangGraph…</span>
              </>
            ) : isApproved ? (
              <>
                <span>✓ Submit Approval &amp; Continue →</span>
              </>
            ) : (
              <>
                <span>✎ Submit Feedback &amp; Regenerate →</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .review-panel {
          background: var(--bg2);
          border: 2px solid rgba(99, 102, 241, 0.4);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          animation: fadeIn 0.25s ease;
          margin-bottom: 20px;
        }
        .rp-header {
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(16, 185, 129, 0.08));
          border-bottom: 1px solid var(--border2);
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .rp-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.25);
          border: 1px solid rgba(129, 140, 248, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .rp-title-wrap {
          flex: 1;
        }
        .rp-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .rp-status-tag {
          font-size: 10px;
          font-family: var(--mono);
          padding: 3px 9px;
          border-radius: 12px;
          background: var(--yellow-bg);
          color: var(--yellow);
          border: 1px solid var(--yellow-border);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .rp-desc {
          font-size: 12px;
          color: var(--ink2);
          margin-top: 4px;
          line-height: 1.5;
        }
        .rp-body {
          padding: 20px;
        }
        .review-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          margin-bottom: 16px;
          animation: fadeIn 0.2s ease;
        }
        .review-banner-success {
          background: var(--green-bg);
          color: var(--green-light);
          border: 1px solid var(--green-border);
        }
        .review-banner-error {
          background: var(--red-bg);
          color: var(--red-light);
          border: 1px solid var(--red-border);
        }
        .banner-icon {
          font-weight: 700;
          font-size: 14px;
        }
        .banner-text {
          flex: 1;
        }
        .banner-retry-btn {
          background: rgba(244, 63, 94, 0.2);
          border: 1px solid var(--red-border);
          color: var(--ink);
          border-radius: 4px;
          padding: 3px 8px;
          font-size: 11px;
          cursor: pointer;
          font-weight: 600;
        }
        .banner-retry-btn:hover {
          background: rgba(244, 63, 94, 0.4);
        }
        .decision-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 18px;
        }
        @media (max-width: 680px) {
          .decision-group {
            grid-template-columns: 1fr;
          }
        }
        .decision-btn {
          padding: 16px;
          border-radius: var(--radius-md);
          background: var(--bg3);
          border: 2px solid transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all 0.2s;
          font-family: var(--font);
          position: relative;
        }
        .decision-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .decision-btn-approve {
          border-color: rgba(16, 185, 129, 0.25);
          color: var(--green);
        }
        .decision-btn-approve:hover:not(:disabled) {
          background: rgba(16, 185, 129, 0.08);
          border-color: var(--green);
        }
        .decision-btn-approve.selected {
          background: rgba(16, 185, 129, 0.16);
          border-color: var(--green);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.25);
        }
        .decision-btn-reject {
          border-color: rgba(244, 63, 94, 0.25);
          color: var(--red);
        }
        .decision-btn-reject:hover:not(:disabled) {
          background: rgba(244, 63, 94, 0.08);
          border-color: var(--red);
        }
        .decision-btn-reject.selected {
          background: rgba(244, 63, 94, 0.16);
          border-color: var(--red);
          box-shadow: 0 0 20px rgba(244, 63, 94, 0.25);
        }
        .dec-icon-box {
          font-size: 22px;
          line-height: 1;
        }
        .dec-txt-box {
          display: flex;
          flex-direction: column;
          gap: 3px;
          text-align: left;
        }
        .dec-title {
          font-size: 13.5px;
          font-weight: 700;
        }
        .dec-sub {
          font-size: 11px;
          opacity: 0.8;
          font-weight: 400;
        }
        .dec-check-mark {
          margin-left: auto;
          font-size: 9px;
          font-family: var(--mono);
          font-weight: 700;
          letter-spacing: 0.8px;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
        }
        .feedback-box {
          margin-bottom: 18px;
        }
        .feedback-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink2);
          margin-bottom: 7px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .feedback-hint {
          font-size: 11px;
          color: var(--ink3);
          font-weight: 400;
        }
        .feedback-hint.required-hint {
          color: var(--yellow);
          font-weight: 600;
        }
        .feedback-ta {
          width: 100%;
          min-height: 140px;
          max-height: 260px;
          background: var(--bg3);
          border: 1px solid var(--border2);
          color: var(--ink);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          font-family: var(--font);
          font-size: 12.5px;
          line-height: 1.6;
          resize: vertical;
          overflow-y: auto;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .feedback-ta:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-bg);
        }
        .feedback-ta.has-error {
          border-color: var(--red);
          background: rgba(244, 63, 94, 0.04);
        }
        .rp-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .btn-submit-decision {
          width: 100%;
          padding: 13px 20px;
          border: none;
          border-radius: var(--radius-md);
          color: #fff;
          font-family: var(--font);
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .btn-submit-approve {
          background: linear-gradient(135deg, var(--green), #059669);
          color: #042f2e;
        }
        .btn-submit-approve:hover:not(:disabled) {
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
          transform: translateY(-1px);
        }
        .btn-submit-reject {
          background: linear-gradient(135deg, var(--red), #be123c);
          color: #fff;
        }
        .btn-submit-reject:hover:not(:disabled) {
          box-shadow: 0 4px 16px rgba(244, 63, 94, 0.35);
          transform: translateY(-1px);
        }
        .btn-submit-decision:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
}
