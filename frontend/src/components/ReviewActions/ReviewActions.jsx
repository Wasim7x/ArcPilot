import React from 'react';

export default function ReviewActions({
  decision,
  onSelectDecision,
  onSubmit,
  isSubmitting,
  approveLabel = 'Approve & Continue',
  rejectLabel = 'Reject / Request Changes',
  nextStageLabel = 'Next Stage',
}) {
  const isApproved = decision === 'approve';
  const isRejected = decision === 'request_changes';

  return (
    <div className="review-actions-wrapper" id="review-actions-wrapper">
      {/* Decision Selection Cards */}
      <div className="decision-group">
        <button
          type="button"
          className={`decision-btn decision-btn-approve ${isApproved ? 'selected' : ''}`}
          onClick={() => onSelectDecision('approve')}
          disabled={isSubmitting}
          id="btn-select-approve"
        >
          <div className="dec-icon-box">✓</div>
          <div className="dec-txt-box">
            <div className="dec-title">{approveLabel}</div>
            <div className="dec-sub">Accept artifacts and advance to {nextStageLabel}</div>
          </div>
          {isApproved && <div className="dec-check-mark">SELECTED</div>}
        </button>

        <button
          type="button"
          className={`decision-btn decision-btn-reject ${isRejected ? 'selected' : ''}`}
          onClick={() => onSelectDecision('request_changes')}
          disabled={isSubmitting}
          id="btn-select-reject"
        >
          <div className="dec-icon-box">✕</div>
          <div className="dec-txt-box">
            <div className="dec-title">{rejectLabel}</div>
            <div className="dec-sub">Provide feedback to trigger regeneration</div>
          </div>
          {isRejected && <div className="dec-check-mark">SELECTED</div>}
        </button>
      </div>

      {/* Primary Action Button */}
      <div className="rp-actions">
        <button
          type="button"
          className={`btn-submit-decision ${isApproved ? 'btn-submit-approve' : 'btn-submit-reject'}`}
          onClick={onSubmit}
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

      <style>{`
        .review-actions-wrapper {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .decision-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 768px) {
          .decision-group {
            grid-template-columns: 1fr;
          }
        }
        .decision-btn {
          padding: 14px 16px;
          border-radius: var(--radius-md);
          background: var(--bg3);
          border: 2px solid transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.18s;
          font-family: var(--font);
          position: relative;
          text-align: left;
        }
        .decision-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }
        .decision-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
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
          background: rgba(16, 185, 129, 0.15);
          border-color: var(--green);
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.25);
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
          background: rgba(244, 63, 94, 0.15);
          border-color: var(--red);
          box-shadow: 0 0 16px rgba(244, 63, 94, 0.25);
        }
        .dec-icon-box {
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
        }
        .dec-txt-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }
        .dec-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }
        .dec-sub {
          font-size: 11px;
          opacity: 0.8;
          color: var(--ink2);
        }
        .dec-check-mark {
          font-size: 9.5px;
          font-family: var(--mono);
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 10px;
          background: currentColor;
          color: var(--bg);
          letter-spacing: 0.5px;
        }
        .rp-actions {
          display: flex;
          align-items: center;
        }
        .btn-submit-decision {
          width: 100%;
          padding: 12px 18px;
          border: none;
          border-radius: var(--radius-sm);
          font-family: var(--font);
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.18s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-submit-approve {
          background: linear-gradient(135deg, var(--green), #059669);
          color: #fff;
        }
        .btn-submit-approve:hover:not(:disabled) {
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
        }
        .btn-submit-reject {
          background: linear-gradient(135deg, var(--accent), #4338ca);
          color: #fff;
        }
        .btn-submit-reject:hover:not(:disabled) {
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
        }
        .btn-submit-decision:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
