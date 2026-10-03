import React from 'react';
import WorkflowStage from '../../components/WorkflowStage';
import ReviewPanel from '../../components/ReviewPanel';
import ArtifactViewer from '../../components/ArtifactViewer';
import LoadingState from '../../components/LoadingState';

export default function Orchestrator({
  taskId,
  workflowState,
  isWorkflowStarting,
  onStartWorkflow,
  onSubmitReview,
  isReviewSubmitting,
  reviewError,
  reviewSuccessMessage,
  onClearReviewError,
  activeTab,
  onTabChange,
  baseUrl,
}) {
  const nextRequiredInput = workflowState?.next_required_input;
  const isWaitingForReview = Boolean(
    nextRequiredInput &&
    nextRequiredInput !== 'requirements' &&
    nextRequiredInput !== 'end' &&
    nextRequiredInput !== 'completed' &&
    nextRequiredInput !== 'none'
  );

  return (
    <main className="main-workspace" id="main-content">
      {/* Initiation & Requirements Stage Card */}
      <WorkflowStage
        taskId={taskId}
        workflowState={workflowState}
        isWorkflowStarting={isWorkflowStarting}
        onStartWorkflow={onStartWorkflow}
      />

      {/* Dedicated Sticky Human Review Gate (Visible when waiting for human decision) */}
      {isWaitingForReview && (
        <ReviewPanel
          stageKey={nextRequiredInput}
          onSubmitReview={onSubmitReview}
          isSubmitting={isReviewSubmitting}
          error={reviewError}
          successMessage={reviewSuccessMessage}
          onClearError={onClearReviewError}
        />
      )}

      {/* Loading state indicator when workflow is processing non-interactive automated stages */}
      {workflowState?.status === 'in_progress' && !isWaitingForReview && !isWorkflowStarting && (
        <LoadingState
          message={`Executing ${workflowState?.current_node || 'stage'}… Analyzing and generating artifacts.`}
        />
      )}

      {/* Multi-Tab Artifact Inspector */}
      <ArtifactViewer
        state={workflowState}
        activeTab={activeTab}
        onTabChange={onTabChange}
        taskId={taskId}
        baseUrl={baseUrl}
      />

      <style>{`
        .main-workspace {
          grid-column: 2;
          grid-row: 2;
          min-height: 0;
          height: 100%;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: var(--bg);
          overflow: hidden;
        }
        @media (max-height: 680px) {
          .main-workspace {
            overflow-y: auto;
          }
        }
      `}</style>
    </main>
  );
}
