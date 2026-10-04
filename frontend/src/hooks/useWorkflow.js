import { useState, useEffect, useRef, useCallback } from 'react';
import { workflowApi } from '../services/api';

export const getInitialBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    // When running inside Vite dev server (port 5173), target local backend port 8000
    if (origin && origin.includes(':5173')) {
      return 'http://localhost:8000';
    }
    // In production (e.g. deployed on Render or Docker), use current site origin
    if (origin && origin.startsWith('http')) {
      return origin;
    }
  }
  return 'http://localhost:8000';
};

export function useWorkflow(defaultBaseUrl = getInitialBaseUrl()) {
  const [baseUrl, setBaseUrl] = useState(defaultBaseUrl);
  const [systemStatus, setSystemStatus] = useState('connecting'); // 'connecting' | 'healthy' | 'offline'
  const [activeProvider, setActiveProvider] = useState('');
  const [llmConfig, setLlmConfig] = useState({ provider: 'Groq', model: 'llama-3.3-70b-versatile' });
  const [isApplyingConfig, setIsApplyingConfig] = useState(false);

  const [taskId, setTaskId] = useState(null);
  const [workflowState, setWorkflowState] = useState(null);
  const [isWorkflowStarting, setIsWorkflowStarting] = useState(false);

  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState('');

  const [activeTab, setActiveTab] = useState('user_stories');

  const pollIntervalRef = useRef(null);

  // Stop polling helper
  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  // Sync state helper
  const syncState = useCallback((data) => {
    if (!data) return;
    const rawState = data.data || data.state || data;
    const summary = data.workflow || data;

    // Merge state with workflow summary
    const merged = {
      ...rawState,
      ...summary,
      // preserve sub-objects
      user_stories: rawState.user_stories || summary.user_stories,
      structured_requirements: rawState.structured_requirements || summary.structured_requirements,
      traceability_matrix: rawState.traceability_matrix || summary.traceability_matrix,
      design_documents: rawState.design_documents || summary.design_documents,
      generated_files: rawState.generated_files || summary.generated_files,
      security_report: rawState.security_report || summary.security_report,
      qa_report: rawState.qa_report || summary.qa_report,
      test_cases: rawState.test_cases || summary.test_cases,
      deployment_result: rawState.deployment_result || summary.deployment_result,
    };

    setWorkflowState(merged);

    // If waiting for product owner review, default active tab to user_stories if not set
    if (merged.next_required_input === 'product_owner_review' && merged.user_stories?.length) {
      setActiveTab((curr) => curr || 'user_stories');
    }
  }, []);

  // Poll state
  const startPolling = useCallback((id) => {
    stopPolling();
    pollIntervalRef.current = setInterval(async () => {
      try {
        const stateData = await workflowApi.getState(baseUrl, id);
        syncState(stateData);

        const status = stateData.status || stateData.workflow?.status;
        if (status === 'waiting_for_input' || status === 'completed' || status === 'error') {
          stopPolling();
        }
      } catch (err) {
        // Silently continue polling on transient network hiccups
      }
    }, 2000);
  }, [baseUrl, stopPolling, syncState]);

  // Initial Health Probe
  const probeHealth = useCallback(async () => {
    try {
      const health = await workflowApi.checkHealth(baseUrl);
      setSystemStatus('healthy');
      setActiveProvider(health.active_provider || 'Groq');

      const config = await workflowApi.getLLMConfig(baseUrl);
      if (config) {
        setLlmConfig(config);
      }
    } catch (err) {
      setSystemStatus('offline');
    }
  }, [baseUrl]);

  useEffect(() => {
    probeHealth();
    return () => stopPolling();
  }, [probeHealth, stopPolling]);

  // Apply LLM Configuration
  const handleApplyConfig = async ({ provider, model, apiKey, url }) => {
    setIsApplyingConfig(true);
    if (url && url !== baseUrl) setBaseUrl(url);

    try {
      const res = await workflowApi.configureLLM(url || baseUrl, {
        provider,
        model,
        api_key: apiKey || null,
      });
      if (res.status === 'ok') {
        setLlmConfig({ provider: res.provider, model: res.model });
        setActiveProvider(res.provider);
        setSystemStatus('healthy');
      }
    } catch (err) {
      alert(`LLM Configuration error: ${err.message}`);
    } finally {
      setIsApplyingConfig(false);
    }
  };

  // Start Workflow & Submit Requirements
  const handleStartWorkflow = async ({ projectName, requirementsText }) => {
    setIsWorkflowStarting(true);
    setReviewError('');
    setReviewSuccessMessage('');

    try {
      // 1. Initialize SDLC workflow session
      const startRes = await workflowApi.startWorkflow(baseUrl, projectName);
      const newTaskId = startRes.task_id;
      setTaskId(newTaskId);

      // 2. Submit initial requirements to decompose into structured models and stories
      const reqRes = await workflowApi.submitRequirements(baseUrl, newTaskId, requirementsText);
      syncState(reqRes);

      // 3. Begin tracking
      startPolling(newTaskId);
    } catch (err) {
      setReviewError(err.message || 'Failed to start workflow');
    } finally {
      setIsWorkflowStarting(false);
    }
  };

  // Submit Review Decision (Approve or Reject/Request Changes)
  const handleSubmitReview = async ({ stage, decision, feedback }) => {
    if (!taskId || isReviewSubmitting) return;

    setIsReviewSubmitting(true);
    setReviewError('');

    try {
      if (decision === 'approve') {
        setReviewSuccessMessage('✓ Review approved. Resuming LangGraph and advancing stage…');
      } else {
        setReviewSuccessMessage('✓ Review submitted. Regenerating artifacts according to your feedback…');
      }

      const reviewRes = await workflowApi.submitReview(baseUrl, taskId, {
        stage,
        decision,
        feedback,
      });

      // Synchronize latest state from authoritative backend response
      syncState(reviewRes);

      // Resume polling to track active automated execution
      startPolling(taskId);

      // Clear success banner after 4 seconds
      setTimeout(() => {
        setReviewSuccessMessage('');
      }, 4000);
    } catch (err) {
      setReviewSuccessMessage('');
      setReviewError(err.message || 'Failed to submit review');
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  return {
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
    onClearReviewError: () => setReviewError(''),
    activeTab,
    setActiveTab,
  };
}
