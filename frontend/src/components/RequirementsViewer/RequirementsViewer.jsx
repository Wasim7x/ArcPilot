import React from 'react';

export default function RequirementsViewer({ structured, legacyList }) {
  if (structured && typeof structured === 'object') {
    const frs = Array.isArray(structured.functional_requirements) ? structured.functional_requirements : [];
    const nfrs = Array.isArray(structured.non_functional_requirements) ? structured.non_functional_requirements : [];
    const integrations = Array.isArray(structured.external_integrations) ? structured.external_integrations : [];
    const roles = Array.isArray(structured.user_roles) ? structured.user_roles : [];
    const summary = structured.summary || '';

    return (
      <div className="reqs-scroll-container" id="requirements-viewer">
        {summary && (
          <div className="summary-card">
            <div className="section-label">Executive Summary</div>
            <div className="summary-text">{summary}</div>
          </div>
        )}

        {frs.length > 0 && (
          <div className="req-group">
            <div className="section-heading">Functional Requirements ({frs.length})</div>
            <div className="req-items-list">
              {frs.map((f, idx) => (
                <div key={f.id || idx} className="req-card">
                  <div className="req-header">
                    <span className="badge badge-blue">{f.id || `FR-${idx + 1}`}</span>
                    <span className="req-title">{f.title || 'Functional Requirement'}</span>
                    {f.priority && <span className="badge badge-yellow">{f.priority}</span>}
                  </div>
                  <div className="req-desc">{f.description}</div>
                  {Array.isArray(f.acceptance_criteria) && f.acceptance_criteria.length > 0 && (
                    <div className="sub-criteria">
                      <div className="sub-criteria-heading">Acceptance Criteria:</div>
                      <ul className="sub-criteria-list">
                        {f.acceptance_criteria.map((c, cIdx) => (
                          <li key={cIdx} className="sub-criteria-item">
                            <span className="sub-criteria-check">✓</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {nfrs.length > 0 && (
          <div className="req-group">
            <div className="section-heading">Non-Functional Requirements ({nfrs.length})</div>
            <div className="req-items-list">
              {nfrs.map((n, idx) => (
                <div key={n.id || idx} className="req-card">
                  <div className="req-header">
                    <span className="badge badge-yellow">{n.id || `NFR-${idx + 1}`}</span>
                    <span className="req-title">{n.category || 'Quality Attribute'}</span>
                    {n.metric_target && <span className="badge badge-green">{n.metric_target}</span>}
                  </div>
                  <div className="req-desc">{n.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {integrations.length > 0 && (
          <div className="req-group">
            <div className="section-heading">External Integrations ({integrations.length})</div>
            <div className="req-items-list">
              {integrations.map((ext, idx) => (
                <div key={ext.name || idx} className="req-card">
                  <div className="req-header">
                    <span className="req-title" style={{ fontWeight: 700 }}>{ext.name}</span>
                    <span className="badge badge-blue">{ext.api_type || 'REST'}</span>
                  </div>
                  <div className="req-desc">{ext.purpose}</div>
                  {Array.isArray(ext.env_var_keys) && ext.env_var_keys.length > 0 && (
                    <div className="env-keys-box">
                      <span className="env-label">Env Keys:</span>{' '}
                      {ext.env_var_keys.map((k) => (
                        <code key={k} className="env-key-tag">{k}</code>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {roles.length > 0 && (
          <div className="req-group">
            <div className="section-heading">User Roles &amp; Permissions ({roles.length})</div>
            <div className="req-items-list">
              {roles.map((r, idx) => (
                <div key={r.role_name || idx} className="req-card">
                  <div className="req-header">
                    <span className="req-title" style={{ fontWeight: 700 }}>{r.role_name}</span>
                  </div>
                  <div className="req-desc">{r.description}</div>
                  {Array.isArray(r.permissions) && r.permissions.length > 0 && (
                    <div className="sub-criteria">
                      <div className="sub-criteria-heading">Permissions:</div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                        {r.permissions.map((p, pIdx) => (
                          <span key={pIdx} className="badge badge-blue">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <style>{`
          .reqs-scroll-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
            overflow-y: auto;
            max-height: calc(100vh - 280px);
            padding-right: 6px;
          }
          .summary-card {
            background: var(--bg3);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 14px 16px;
          }
          .section-label {
            font-size: 10px;
            font-weight: 700;
            color: var(--accent2);
            text-transform: uppercase;
            letter-spacing: 1.2px;
            margin-bottom: 6px;
          }
          .summary-text {
            font-size: 13px;
            color: var(--ink);
            line-height: 1.6;
          }
          .req-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .section-heading {
            font-size: 11.5px;
            font-weight: 700;
            color: var(--ink3);
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .req-items-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .req-card {
            background: var(--bg3);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 12px 14px;
          }
          .req-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
          }
          .req-title {
            font-size: 12.5px;
            font-weight: 600;
            color: var(--ink);
            flex: 1;
          }
          .req-desc {
            font-size: 12px;
            color: var(--ink2);
            line-height: 1.5;
          }
          .sub-criteria {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid var(--border);
          }
          .sub-criteria-heading {
            font-size: 10px;
            color: var(--ink3);
            text-transform: uppercase;
            margin-bottom: 4px;
            font-weight: 600;
          }
          .sub-criteria-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .sub-criteria-item {
            font-size: 11px;
            color: var(--ink2);
            display: flex;
            align-items: flex-start;
            gap: 6px;
          }
          .sub-criteria-check {
            color: var(--green);
            font-weight: 700;
          }
          .env-keys-box {
            margin-top: 6px;
            font-size: 11px;
            color: var(--ink3);
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 6px;
          }
          .env-key-tag {
            background: var(--bg4);
            padding: 2px 6px;
            border-radius: 4px;
            color: var(--accent-light);
            font-family: var(--mono);
          }
        `}</style>
      </div>
    );
  }

  if (Array.isArray(legacyList) && legacyList.length > 0) {
    return (
      <div className="legacy-reqs-list reqs-scroll-container">
        {legacyList.map((r, i) => (
          <div key={i} className="legacy-item">• {r}</div>
        ))}
        <style>{`
          .legacy-reqs-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: var(--bg3);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 14px;
            overflow-y: auto;
            max-height: calc(100vh - 280px);
          }
          .legacy-item {
            font-size: 12px;
            color: var(--ink2);
            line-height: 1.6;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ color: 'var(--ink3)', textAlign: 'center', padding: '30px' }}>
      No requirements specifications recorded yet.
    </div>
  );
}
