import React, { useState, useEffect } from 'react';
import { HUMAN_REVIEW_META } from '../../types/workflow';
import ReviewActions from '../ReviewActions';
import FeedbackForm from '../FeedbackForm';

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

  const [decision, setDecision] = useState('approve');
  const [feedback, setFeedback] = useState('');
  const [clientValidationError, setClientValidationError] = useState('');

  // Reset decision and feedback when review stage changes
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

  const isRejected = decision === 'request_changes';

  return (
    <div className="review-panel sticky-review-gate" id="review-panel">
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

        {/* Reusable Review Actions */}
        <ReviewActions
          decision={decision}
          onSelectDecision={handleSelectDecision}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          approveLabel={meta.approveLabel}
          rejectLabel={meta.rejectLabel}
          nextStageLabel={meta.nextStageLabel}
        />

        {/* Feedback Field */}
        <div className="feedback-section-wrap" style={{ marginTop: '14px' }}>
          <FeedbackForm
            feedback={feedback}
            onChangeFeedback={(text) => {
              setFeedback(text);
              if (clientValidationError) setClientValidationError('');
            }}
            isRejected={isRejected}
            placeholder={meta.feedbackPlaceholder}
            disabled={isSubmitting}
            hasError={Boolean(isRejected && !feedback.trim() && clientValidationError)}
          />
        </div>
      </div>

      <style>{`
        .sticky-review-gate {
          position: sticky;
          top: 0;
          z-index: 15;
          background: var(--bg2);
          border: 2px solid rgba(99, 102, 241, 0.45);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          animation: fadeIn 0.25s ease;
          backdrop-filter: blur(8px);
        }
        .rp-header {
          padding: 14px 18px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(16, 185, 129, 0.08));
          border-bottom: 1px solid var(--border2);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rp-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.25);
          border: 1px solid rgba(129, 140, 248, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .rp-title-wrap {
          flex: 1;
        }
        .rp-title {
          font-size: 15px;
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
          padding: 2px 8px;
          border-radius: 12px;
          background: var(--yellow-bg);
          color: var(--yellow);
          border: 1px solid var(--yellow-border);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .rp-desc {
          font-size: 11.5px;
          color: var(--ink2);
          margin-top: 3px;
          line-height: 1.45;
        }
        .rp-body {
          padding: 16px 18px;
        }
        .review-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          margin-bottom: 12px;
        }
        .review-banner-success {
          background: var(--green-bg);
          color: var(--green);
          border: 1px solid var(--green-border);
        }
        .review-banner-error {
          background: var(--red-bg);
          color: var(--red);
          border: 1px solid var(--red-border);
        }
        .banner-icon {
          font-weight: 700;
          flex-shrink: 0;
        }
        .banner-text {
          flex: 1;
        }
        .banner-retry-btn {
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--ink);
          border-radius: 4px;
          padding: 3px 8px;
          font-size: 11px;
          cursor: pointer;
        }
        .banner-retry-btn:hover {
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
}
