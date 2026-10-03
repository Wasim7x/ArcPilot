import React from 'react';

export default function FeedbackForm({
  feedback,
  onChangeFeedback,
  isRejected,
  placeholder,
  disabled,
  hasError,
}) {
  return (
    <div className="feedback-box" id="feedback-form-container">
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
        className={`feedback-ta ${hasError ? 'has-error' : ''}`}
        value={feedback}
        onChange={(e) => onChangeFeedback(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={4}
      />

      <style>{`
        .feedback-box {
          margin-bottom: 4px;
        }
        .feedback-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .feedback-label label {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink2);
        }
        .feedback-hint {
          font-size: 11px;
          color: var(--ink3);
        }
        .feedback-hint.required-hint {
          color: var(--red-light);
          font-weight: 600;
        }
        .feedback-ta {
          width: 100%;
          min-height: 100px;
          max-height: 220px;
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
          background: rgba(244, 63, 94, 0.05);
        }
        .feedback-ta:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
