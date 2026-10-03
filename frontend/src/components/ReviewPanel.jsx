import React, { useState, useEffect, useRef } from 'react';
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

  const [isRejecting, setIsRejecting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [clientValidationError, setClientValidationError] = useState('');

  // Track previous submission state to automatically exit feedback mode upon successful revision
  const prevSubmittingRef = useRef(isSubmitting);

  // Reset decision and feedback when stageKey changes
  useEffect(() => {
    setIsRejecting(false);
    setFeedback('');
    setClientValidationError('');
  }, [stageKey]);

  // When submission completes successfully (was submitting, now not, no error), return to default view
  useEffect(() => {
    if (prevSubmittingRef.current && !isSubmitting && !error) {
      setIsRejecting(false);
      setFeedback('');
      setClientValidationError('');
    }
    prevSubmittingRef.current = isSubmitting;
  }, [isSubmitting, error]);

  const handleApprove = (e) => {
    e?.preventDefault();
    if (isSubmitting) return;

    setClientValidationError('');
    if (onClearError) onClearError();

    onSubmitReview({
      stage: stageKey,
      decision: 'approve',
      feedback: '',
    });
  };

  const handleStartReject = () => {
    if (isSubmitting) return;
    setIsRejecting(true);
    setClientValidationError('');
    if (onClearError) onClearError();
  };

  const handleCancelReject = () => {
    if (isSubmitting) return;
    setIsRejecting(false);
    setClientValidationError('');
    if (onClearError) onClearError();
  };

  const handleSubmitFeedback = (e) => {
    e?.preventDefault();
    if (isSubmitting) return;

    if (!feedback.trim()) {
      setClientValidationError('Feedback comments are required when requesting revisions so the AI agent knows what to fix.');
      return;
    }

    setClientValidationError('');
    onSubmitReview({
      stage: stageKey,
      decision: 'request_changes',
      feedback: feedback.trim(),
    });
  };

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
                onClick={isRejecting ? handleSubmitFeedback : handleApprove}
                disabled={isSubmitting}
              >
                Retry
              </button>
            )}
          </div>
        )}

        {/* BEFORE REJECT: Show [ Approve & Continue ] and [ Reject / Request Changes ] side-by-side */}
        {!isRejecting ? (
          <div className="rp-initial-actions">
            <button
              type="button"
              className="btn-review-card btn-action-approve"
              onClick={handleApprove}
              disabled={isSubmitting}
              id="btn-select-approve"
            >
              {isSubmitting ? (
                <div className="btn-loading-state">
                  <span className="spin" />
                  <span className="btn-main-title">Submitting approval…</span>
                </div>
              ) : (
                <>
                  <div className="btn-icon-box">✓</div>
                  <div className="btn-text-wrap">
                    <div className="btn-main-title">{meta.approveLabel || 'Approve & Continue'}</div>
                    <div className="btn-sub-title">Accept artifacts and advance to {meta.nextStageLabel || 'next stage'}</div>
                  </div>
                </>
              )}
            </button>

            <button
              type="button"
              className="btn-review-card btn-action-reject"
              onClick={handleStartReject}
              disabled={isSubmitting}
              id="btn-select-reject"
            >
              <div className="btn-icon-box">✎</div>
              <div className="btn-text-wrap">
                <div className="btn-main-title">{meta.rejectLabel || 'Reject / Request Changes'}</div>
                <div className="btn-sub-title">Provide feedback to trigger artifact revision</div>
              </div>
            </button>
          </div>
        ) : (
          /* AFTER REJECT: Show Review Feedback textarea + [ Submit Feedback ] + [ Cancel ] */
          <div className="rp-feedback-view" id="feedback-form-container">
            <div className="feedback-view-header">
              <label htmlFor="review-feedback-textarea" className="feedback-view-title">
                Review Feedback &amp; Revision Notes <span className="required-tag">(Required)</span>
              </label>
              <div className="feedback-view-sub">
                Describe the specific changes or additions needed. The AI agent will revise the current stage artifacts.
              </div>
            </div>

            <textarea
              id="review-feedback-textarea"
              className={`feedback-ta ${clientValidationError && !feedback.trim() ? 'has-error' : ''}`}
              value={feedback}
              onChange={(e) => {
                setFeedback(e.target.value);
                if (clientValidationError) setClientValidationError('');
              }}
              placeholder={meta.feedbackPlaceholder || "Enter detailed feedback or requested revisions (e.g. 'Add user story for interactive budget calculator')..."}
              disabled={isSubmitting}
              rows={4}
              autoFocus
            />

            <div className="feedback-actions-row">
              <button
                type="button"
                className="btn btn-submit-feedback"
                onClick={handleSubmitFeedback}
                disabled={isSubmitting}
                id="btn-submit-review"
              >
                {isSubmitting ? (
                  <>
                    <span className="spin" />
                    <span>Submitting feedback &amp; generating revision…</span>
                  </>
                ) : (
                  <>
                    <span>✎ Submit Feedback</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-cancel-feedback"
                onClick={handleCancelReject}
                disabled={isSubmitting}
              >
                Cancel / Back
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .review-panel {
          background: var(--bg2);
          border: 2px solid rgba(99, 102, 241, 0.45);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          animation: fadeIn 0.25s ease;
          flex-shrink: 0;
        }
        .rp-header {
          padding: 12px 18px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(16, 185, 129, 0.08));
          border-bottom: 1px solid var(--border2);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rp-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.25);
          border: 1px solid rgba(129, 140, 248, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .rp-title-wrap {
          flex: 1;
        }
        .rp-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .rp-status-tag {
          font-size: 9.5px;
          font-family: var(--mono);
          padding: 2px 8px;
          border-radius: 10px;
          background: var(--yellow-bg);
          color: var(--yellow);
          border: 1px solid var(--yellow-border);
          text-transform: uppercase;
          font-weight: 600;
        }
        .rp-desc {
          font-size: 11px;
          color: var(--ink2);
          margin-top: 2px;
        }
        .rp-body {
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .review-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          line-height: 1.4;
        }
        .review-banner-success {
          background: var(--green-bg);
          border: 1px solid var(--green-border);
          color: var(--green-light);
        }
        .review-banner-error {
          background: var(--red-bg);
          border: 1px solid var(--red-border);
          color: var(--red-light);
        }
        .banner-icon {
          font-weight: bold;
          flex-shrink: 0;
        }
        .banner-text {
          flex: 1;
        }
        .banner-retry-btn {
          background: transparent;
          border: 1px solid currentColor;
          color: inherit;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 10.5px;
          font-weight: 600;
        }
        .banner-retry-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .rp-initial-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 640px) {
          .rp-initial-actions {
            grid-template-columns: 1fr;
          }
        }
        .btn-review-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          cursor: pointer;
          text-align: left;
          background: var(--bg3);
          transition: all 0.18s ease;
        }
        .btn-action-approve {
          border-color: rgba(16, 185, 129, 0.4);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), var(--bg3));
        }
        .btn-action-approve:hover:not(:disabled) {
          border-color: var(--green);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.22), var(--bg3));
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);
        }
        .btn-action-reject {
          border-color: rgba(244, 63, 94, 0.35);
          background: linear-gradient(135deg, rgba(244, 63, 94, 0.1), var(--bg3));
        }
        .btn-action-reject:hover:not(:disabled) {
          border-color: var(--red);
          background: linear-gradient(135deg, rgba(244, 63, 94, 0.2), var(--bg3));
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(244, 63, 94, 0.2);
        }
        .btn-review-card:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .btn-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .btn-action-approve .btn-icon-box {
          background: rgba(16, 185, 129, 0.25);
          color: var(--green-light);
          border: 1px solid var(--green-border);
        }
        .btn-action-reject .btn-icon-box {
          background: rgba(244, 63, 94, 0.2);
          color: var(--red-light);
          border: 1px solid var(--red-border);
        }
        .btn-text-wrap {
          flex: 1;
        }
        .btn-main-title {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .btn-action-approve .btn-main-title {
          color: #a7f3d0;
        }
        .btn-action-reject .btn-main-title {
          color: #fecdd3;
        }
        .btn-sub-title {
          font-size: 11px;
          color: var(--ink3);
          margin-top: 2px;
        }
        .btn-loading-state {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px;
        }
        .rp-feedback-view {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: fadeIn 0.2s ease;
        }
        .feedback-view-header {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .feedback-view-title {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .required-tag {
          color: var(--red);
          font-size: 11px;
          font-weight: 500;
        }
        .feedback-view-sub {
          font-size: 11px;
          color: var(--ink3);
        }
        .feedback-ta {
          width: 100%;
          min-height: 110px;
          max-height: 220px;
          background: var(--bg3);
          border: 1px solid var(--border2);
          color: var(--ink);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          font-family: var(--font);
          font-size: 12.5px;
          line-height: 1.5;
          resize: vertical;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .feedback-ta:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-bg);
        }
        .feedback-ta.has-error {
          border-color: var(--red);
          background: rgba(244, 63, 94, 0.05);
        }
        .feedback-ta:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .feedback-actions-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .btn-submit-feedback {
          background: var(--accent);
          color: #fff;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 12.5px;
        }
        .btn-submit-feedback:hover:not(:disabled) {
          box-shadow: 0 4px 14px var(--accent-glow);
        }
        .btn-cancel-feedback {
          background: transparent;
          color: var(--ink3);
          border: 1px solid var(--border);
          padding: 9px 14px;
          font-size: 12px;
        }
        .btn-cancel-feedback:hover:not(:disabled) {
          color: var(--ink);
          border-color: var(--border2);
        }
      `}</style>
    </div>
  );
}
