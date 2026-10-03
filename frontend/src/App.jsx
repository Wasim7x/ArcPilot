import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WorkflowProgress from './components/WorkflowProgress';
import Orchestrator from './pages/Orchestrator';
import { useWorkflow } from './hooks/useWorkflow';

export default function App() {
  const {
    baseUrl,
    setBaseUrl,
    systemStatus,
    activeProvider,
    llmConfig,
    isApplyingConfig,
    handleApplyConfig,
    taskId,
    workflowState,
    isWorkflowStarting,
    handleStartWorkflow,
    handleSubmitReview,
    isReviewSubmitting,
    reviewError,
    reviewSuccessMessage,
    onClearReviewError,
    activeTab,
    setActiveTab,
  } = useWorkflow();

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Header
        systemStatus={systemStatus}
        activeProvider={activeProvider}
        taskId={taskId}
      />

      {/* Left Sidebar: LLM Configuration & Exports */}
      <Sidebar
        baseUrl={baseUrl}
        setBaseUrl={setBaseUrl}
        llmConfig={llmConfig}
        onApplyConfig={handleApplyConfig}
        isApplyingConfig={isApplyingConfig}
        state={workflowState}
        taskId={taskId}
      />

      {/* Center Main Workspace */}
      <Orchestrator
        taskId={taskId}
        workflowState={workflowState}
        isWorkflowStarting={isWorkflowStarting}
        onStartWorkflow={handleStartWorkflow}
        onSubmitReview={handleSubmitReview}
        isReviewSubmitting={isReviewSubmitting}
        reviewError={reviewError}
        reviewSuccessMessage={reviewSuccessMessage}
        onClearReviewError={onClearReviewError}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        baseUrl={baseUrl}
      />

      {/* Right Sidebar: Dynamic 13-Stage Workflow Tracker */}
      <WorkflowProgress
        progress={workflowState?.progress || 0}
        currentNode={workflowState?.current_node}
        nextRequiredInput={workflowState?.next_required_input}
        currentStageLabel={workflowState?.current_stage_label}
        stages={workflowState?.stages}
        workflowStatus={workflowState?.status}
      />
    </div>
  );
}
