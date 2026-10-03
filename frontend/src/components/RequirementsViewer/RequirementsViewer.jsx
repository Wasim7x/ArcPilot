import React from 'react';
import { safeText, safeList } from '../../utils/formatUtils';

export default function RequirementsViewer({ structured, legacyList }) {
  if (structured && typeof structured === 'object') {
    const frs = safeList(structured.functional_requirements);
    const nfrs = safeList(structured.non_functional_requirements);
    const integrations = safeList(structured.external_integrations);
    const roles = safeList(structured.user_roles);
    const summary = safeText(structured.summary);

    return (
      <div className="reqs-view-container" id="requirements-viewer">
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
              {frs.map((f, idx) => {
                const fid = safeText(f.id, `FR-${idx + 1}`);
                const ftitle = safeText(f.title, 'Functional Requirement');
                const fpriority = safeText(f.priority, 'High');
                const fdesc = safeText(f.description);
                const criteria = safeList(f.acceptance_criteria);

                return (
                  <div key={fid || idx} className="req-card">
                    <div className="req-header">
                      <span className="badge badge-blue">{fid}</span>
                      <span className="req-title">{ftitle}</span>
                      <span className="badge badge-yellow">{fpriority}</span>
                    </div>
                    {fdesc && <div className="req-desc">{fdesc}</div>}
                    {criteria.length > 0 && (
                      <div className="sub-criteria">
                        <div className="sub-criteria-heading">Acceptance Criteria:</div>
                        <ul className="sub-criteria-list">
                          {criteria.map((c, cIdx) => (
                            <li key={cIdx} className="sub-criteria-item">
                              <span className="sub-criteria-check">✓</span>
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
          </div>
        )}

        {nfrs.length > 0 && (
          <div className="req-group">
            <div className="section-heading">Non-Functional Requirements ({nfrs.length})</div>
            <div className="req-items-list">
              {nfrs.map((n, idx) => {
                const nid = safeText(n.id, `NFR-${idx + 1}`);
                const ncat = safeText(n.category, 'Quality Attribute');
                const ntarget = safeText(n.metric_target);
                const ndesc = safeText(n.description);

                return (
                  <div key={nid || idx} className="req-card">
                    <div className="req-header">
                      <span className="badge badge-yellow">{nid}</span>
                      <span className="req-title">{ncat}</span>
                      {ntarget && <span className="badge badge-green">{ntarget}</span>}
                    </div>
                    {ndesc && <div className="req-desc">{ndesc}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {integrations.length > 0 && (
          <div className="req-group">
            <div className="section-heading">External Integrations ({integrations.length})</div>
            <div className="req-items-list">
              {integrations.map((ext, idx) => {
                const ename = safeText(ext.name, `Integration ${idx + 1}`);
                const etype = safeText(ext.api_type, 'REST');
                const epurpose = safeText(ext.purpose);
                const envKeys = safeList(ext.env_var_keys);

                return (
                  <div key={ename || idx} className="req-card">
                    <div className="req-header">
                      <span className="req-title" style={{ fontWeight: 700 }}>{ename}</span>
                      <span className="badge badge-blue">{etype}</span>
                    </div>
                    {epurpose && <div className="req-desc">{epurpose}</div>}
                    {envKeys.length > 0 && (
                      <div className="env-keys-box">
                        <span className="env-label">Environment Keys:</span>{' '}
                        {envKeys.map((k, kIdx) => (
                          <code key={kIdx} className="env-key-tag">{safeText(k)}</code>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {roles.length > 0 && (
          <div className="req-group">
            <div className="section-heading">User Roles &amp; Permissions ({roles.length})</div>
            <div className="req-items-list">
              {roles.map((r, idx) => {
                const rname = safeText(r.role_name, `Role ${idx + 1}`);
                const rdesc = safeText(r.description);
                const perms = safeList(r.permissions);

                return (
                  <div key={rname || idx} className="req-card">
                    <div className="req-header">
                      <span className="req-title" style={{ fontWeight: 700 }}>{rname}</span>
                    </div>
                    {rdesc && <div className="req-desc">{rdesc}</div>}
                    {perms.length > 0 && (
                      <div className="sub-criteria">
                        <div className="sub-criteria-heading">Permissions:</div>
                        <div className="perms-flow">
                          {perms.map((p, pIdx) => (
                            <span key={pIdx} className="badge badge-blue">{safeText(p)}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <style>{`
          .reqs-view-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
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
            gap: 3px;
          }
          .sub-criteria-item {
            font-size: 11.5px;
            color: var(--ink2);
            display: flex;
            align-items: baseline;
            gap: 6px;
          }
          .sub-criteria-check {
            color: var(--green);
            font-size: 11px;
            font-weight: bold;
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
          .env-label {
            font-size: 10px;
            color: var(--ink3);
            text-transform: uppercase;
            font-weight: 600;
          }
          .env-key-tag {
            background: var(--bg4);
            padding: 2px 6px;
            border-radius: 4px;
            color: var(--accent-light);
            font-family: var(--mono);
            font-size: 11px;
          }
          .perms-flow {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }
        `}</style>
      </div>
    );
  }

  const legacy = safeList(legacyList);
  if (legacy.length > 0) {
    return (
      <div className="legacy-reqs-list">
        {legacy.map((r, i) => (
          <div key={i} className="legacy-item">• {safeText(r)}</div>
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
            width: 100%;
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
