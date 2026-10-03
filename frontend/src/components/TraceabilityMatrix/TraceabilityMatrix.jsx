import React from 'react';

export default function TraceabilityMatrix({ matrix = [] }) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    return (
      <div className="empty-matrix-state">
        <span className="empty-matrix-icon">🔗</span>
        <div>Traceability matrix will be generated after requirements and user stories are analyzed.</div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const s = String(status || 'PENDING').toUpperCase();
    if (s === 'PASS' || s === 'PASSED') return 'badge badge-green';
    if (s === 'FAIL' || s === 'FAILED') return 'badge badge-red';
    return 'badge badge-yellow';
  };

  return (
    <div className="traceability-container" id="traceability-matrix-viewer">
      <div className="traceability-meta">
        <div className="meta-left">
          <span className="meta-title">Traceability &amp; Verification Matrix</span>
          <span className="badge badge-blue">{matrix.length} Mapped Links</span>
        </div>
        <div className="meta-hint">
          Scroll horizontally for extended columns or vertically to view all requirement mappings.
        </div>
      </div>

      <div className="matrix-scroll-wrapper">
        <table className="matrix-table">
          <thead>
            <tr>
              <th style={{ minWidth: '190px' }}>Requirement</th>
              <th style={{ minWidth: '140px' }}>User Stories</th>
              <th style={{ minWidth: '150px' }}>Design Sections</th>
              <th style={{ minWidth: '160px' }}>Code Files</th>
              <th style={{ minWidth: '140px' }}>Test Cases</th>
              <th style={{ minWidth: '110px', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, idx) => {
              const reqId = row.requirement_id || `REQ-${idx + 1}`;
              const reqTitle = row.requirement_title || '';
              const userStories = Array.isArray(row.user_story_ids) ? row.user_story_ids : [];
              const designSecs = Array.isArray(row.design_sections) ? row.design_sections : [];
              const codeFiles = Array.isArray(row.code_files) ? row.code_files : [];
              const testCases = Array.isArray(row.test_case_ids) ? row.test_case_ids : [];
              const testStatus = row.test_status || 'PENDING';

              return (
                <tr key={`${reqId}-${idx}`}>
                  <td>
                    <div className="req-cell">
                      <span className="req-id">{reqId}</span>
                      {reqTitle && <span className="req-title">{reqTitle}</span>}
                    </div>
                  </td>
                  <td>
                    <div className="badge-flow">
                      {userStories.length > 0 ? (
                        userStories.map((u) => (
                          <span key={u} className="badge badge-blue">{u}</span>
                        ))
                      ) : (
                        <span className="cell-muted">—</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="badge-flow">
                      {designSecs.length > 0 ? (
                        designSecs.map((d) => (
                          <span key={d} className="badge badge-yellow">{d}</span>
                        ))
                      ) : (
                        <span className="cell-muted">—</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="badge-flow">
                      {codeFiles.length > 0 ? (
                        codeFiles.slice(0, 4).map((c) => (
                          <span key={c} className="badge badge-green" title={c}>{c}</span>
                        ))
                      ) : (
                        <span className="cell-muted">—</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="badge-flow">
                      {testCases.length > 0 ? (
                        testCases.map((t) => (
                          <span key={t} className="badge badge-blue">{t}</span>
                        ))
                      ) : (
                        <span className="cell-muted">—</span>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={getStatusBadge(testStatus)}>
                      {testStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        .traceability-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }
        .traceability-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          padding: 4px 2px;
        }
        .meta-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .meta-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }
        .meta-hint {
          font-size: 11px;
          color: var(--ink3);
        }
        .matrix-scroll-wrapper {
          width: 100%;
          overflow-x: auto;
          overflow-y: auto;
          max-height: calc(100vh - 300px);
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        .matrix-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          text-align: left;
        }
        .matrix-table thead {
          position: sticky;
          top: 0;
          z-index: 5;
          background: var(--bg4);
        }
        .matrix-table th {
          padding: 10px 14px;
          color: var(--ink2);
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 1px;
          font-weight: 700;
          border-bottom: 2px solid var(--border2);
          white-space: nowrap;
        }
        .matrix-table td {
          padding: 10px 14px;
          border-bottom: 1px solid var(--border);
          color: var(--ink2);
          vertical-align: top;
        }
        .matrix-table tbody tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }
        .req-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .req-id {
          font-family: var(--mono);
          font-weight: 700;
          color: var(--accent2);
          font-size: 12px;
        }
        .req-title {
          font-size: 11px;
          color: var(--ink3);
          line-height: 1.4;
          word-break: break-word;
        }
        .badge-flow {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .cell-muted {
          color: var(--ink3);
          font-size: 12px;
        }
        .empty-matrix-state {
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
        .empty-matrix-icon {
          font-size: 28px;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
