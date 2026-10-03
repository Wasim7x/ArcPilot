import React, { useEffect } from 'react';
import ArtifactTabs from '../ArtifactTabs';
import UserStoriesViewer from '../UserStoriesViewer';
import RequirementsViewer from '../RequirementsViewer';
import TraceabilityMatrix from '../TraceabilityMatrix';
import ArchitectureViewer from '../ArchitectureViewer';
import CodeViewer from '../CodeViewer';
import SecurityViewer from '../SecurityViewer';
import QAViewer from '../QAViewer';
import DeploymentViewer from '../DeploymentViewer';
import { exportArtifact } from '../../utils/export';

export default function ArtifactViewer({
  state,
  activeTab,
  onTabChange,
  taskId,
  baseUrl,
}) {
  // Build tabs dynamically based on real generated state
  const tabs = [];

  if (state?.user_stories && state.user_stories.length > 0) {
    tabs.push({ id: 'user_stories', label: '📋 User Stories', count: state.user_stories.length });
  }
  if (state?.structured_requirements || state?.requirements) {
    tabs.push({ id: 'requirements', label: '📄 Requirements Spec' });
  }
  if (state?.traceability_matrix && state.traceability_matrix.length > 0) {
    tabs.push({ id: 'traceability', label: '🔗 Traceability Matrix', count: state.traceability_matrix.length });
  }
  if (state?.design_documents) {
    tabs.push({ id: 'design', label: '🏗️ Architecture Design' });
  }
  if (state?.generated_files && Object.keys(state.generated_files).length > 0) {
    tabs.push({ id: 'code', label: '💻 Code Implementation', count: Object.keys(state.generated_files).length });
  }
  if (state?.security_report || state?.security_review_comments) {
    tabs.push({ id: 'security', label: '🔒 Security Audit' });
  }
  if (state?.test_cases || state?.qa_report || state?.test_execution_results) {
    tabs.push({ id: 'qa', label: '🧪 Tests & QA Report' });
  }
  if (state?.deployment_result || state?.deployment_status === 'success') {
    tabs.push({ id: 'deployment', label: '🚀 Deployment Package' });
  }

  // Ensure active tab points to a valid generated tab
  useEffect(() => {
    if (tabs.length > 0 && !tabs.some((t) => t.id === activeTab)) {
      onTabChange(tabs[0].id);
    }
  }, [tabs, activeTab, onTabChange]);

  if (tabs.length === 0) {
    return (
      <div className="content-inspector empty-inspector" id="artifact-inspector-empty">
        <span className="empty-insp-icon">📂</span>
        <div className="empty-insp-title">No Artifacts Generated Yet</div>
        <div className="empty-insp-desc">
          Artifacts such as requirements, user stories, architecture specs, and code files will appear here automatically as SDLC workflow stages advance.
        </div>
        <style>{`
          .content-inspector {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
            background: var(--bg2);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-md);
          }
          .empty-inspector {
            padding: 40px 20px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }
          .empty-insp-icon {
            font-size: 32px;
            opacity: 0.5;
          }
          .empty-insp-title {
            font-size: 15px;
            font-weight: 700;
            color: var(--ink);
          }
          .empty-insp-desc {
            font-size: 12px;
            color: var(--ink3);
            max-width: 480px;
            line-height: 1.5;
          }
        `}</style>
      </div>
    );
  }

  const currentTabObj = tabs.find((t) => t.id === activeTab) || tabs[0];
  const currentTabId = currentTabObj.id;

  const handleExport = (format) => {
    let payload = state;
    if (currentTabId === 'user_stories') payload = state?.user_stories;
    else if (currentTabId === 'requirements') payload = state?.structured_requirements || state?.requirements;
    else if (currentTabId === 'traceability') payload = state?.traceability_matrix;
    else if (currentTabId === 'design') payload = state?.design_documents;
    else if (currentTabId === 'code') payload = state?.generated_files;
    else if (currentTabId === 'security') payload = state?.security_report || state?.security_review_comments;
    else if (currentTabId === 'qa') payload = { report: state?.qa_report, tests: state?.test_cases };
    else if (currentTabId === 'deployment') payload = state?.deployment_result;

    exportArtifact(currentTabId, format, payload, taskId);
  };

  return (
    <div className="content-inspector" id="content-inspector">
      <ArtifactTabs
        tabs={tabs}
        activeTab={currentTabId}
        onTabChange={onTabChange}
        onExport={handleExport}
      />

      <div className="inspector-body" id="inspector-body">
        {currentTabId === 'user_stories' && (
          <UserStoriesViewer stories={state?.user_stories} />
        )}

        {currentTabId === 'requirements' && (
          <RequirementsViewer
            structured={state?.structured_requirements}
            legacyList={state?.requirements}
          />
        )}

        {currentTabId === 'traceability' && (
          <TraceabilityMatrix matrix={state?.traceability_matrix} />
        )}

        {currentTabId === 'design' && (
          <ArchitectureViewer
            designDocuments={state?.design_documents}
            technicalDocuments={state?.technical_documents}
          />
        )}

        {currentTabId === 'code' && (
          <CodeViewer
            generatedFiles={state?.generated_files}
            staticAnalysis={state?.static_analysis}
            comments={state?.code_review_comments}
          />
        )}

        {currentTabId === 'security' && (
          <SecurityViewer
            securityReport={state?.security_report}
            reviewComments={state?.security_review_comments}
          />
        )}

        {currentTabId === 'qa' && (
          <QAViewer
            qaReport={state?.qa_report}
            testCases={state?.test_cases}
            repairAttempts={state?.repair_attempts}
          />
        )}

        {currentTabId === 'deployment' && (
          <DeploymentViewer
            deploymentResult={state?.deployment_result}
            deploymentFeedback={state?.deployment_feedback}
            taskId={taskId}
            baseUrl={baseUrl}
          />
        )}
      </div>

      <style>{`
        .content-inspector {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .inspector-body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
