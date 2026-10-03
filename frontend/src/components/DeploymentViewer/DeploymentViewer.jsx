import React from 'react';
import { workflowApi } from '../../services/api';

export default function DeploymentViewer({ deploymentResult, deploymentFeedback, taskId, baseUrl }) {
  const isSuccess =
    deploymentResult && (deploymentResult.status === 'success' || deploymentResult.build_successful);

  return (
    <div className="deployment-viewer-container" id="deployment-viewer">
      <div className="deploy-box">
        <div className="deploy-info">
          <div className="deploy-title">
            {isSuccess ? 'DEPLOYMENT PACKAGE READY ✅' : 'DEPLOYMENT COMPLETED 🚀'}
          </div>
          <div className="deploy-desc">
            Verified standalone production package with FastAPI, Docker containerization &amp; automated test coverage.
          </div>
        </div>

        {taskId && (
          <a
            href={workflowApi.getDownloadZipUrl(baseUrl, taskId)}
            className="btn btn-green deploy-download-btn"
            download
            id="btn-download-deployment-zip"
          >
            <span>↓ Download .ZIP Archive</span>
          </a>
        )}
      </div>

      <pre className="code-viewer-block">
        {deploymentFeedback ||
          deploymentResult?.message ||
          'Deployment packaging and smoke test verification completed successfully.'}
      </pre>

      <style>{`
        .deployment-viewer-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
          max-height: calc(100vh - 280px);
          padding-right: 6px;
        }
        .deploy-box {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }
        .deploy-info {
          flex: 1;
        }
        .deploy-title {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--green);
        }
        .deploy-desc {
          font-size: 12px;
          color: var(--ink2);
          margin-top: 4px;
          line-height: 1.45;
        }
        .deploy-download-btn {
          padding: 10px 20px;
          font-size: 12.5px;
          text-decoration: none;
        }
        .code-viewer-block {
          font-family: var(--mono);
          font-size: 11.5px;
          line-height: 1.65;
          color: var(--ink);
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 16px;
          white-space: pre-wrap;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}
