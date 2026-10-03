/**
 * ArcPilot Centralized Workflow & System API Service
 */

export class ApiError extends Error {
  constructor(message, status, detail) {
    super(message);
    this.status = status;
    this.detail = detail;
    this.name = 'ApiError';
  }
}

async function request(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    let data;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMsg = (data && data.detail) || (data && data.message) || response.statusText || 'API request failed';
      throw new ApiError(errorMsg, response.status, data);
    }

    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(err.message || 'Network connection failed', 0, null);
  }
}

export const workflowApi = {
  async checkHealth(baseUrl = '') {
    return request(`${baseUrl}/health`);
  },

  async getLLMConfig(baseUrl = '') {
    return request(`${baseUrl}/config/llm`);
  },

  async configureLLM(baseUrl = '', config) {
    return request(`${baseUrl}/config/llm`, {
      method: 'POST',
      body: JSON.stringify(config),
    });
  },

  async startWorkflow(baseUrl = '', projectName, initialContext = {}) {
    return request(`${baseUrl}/workflow/start`, {
      method: 'POST',
      body: JSON.stringify({
        project_name: projectName,
        initial_context: initialContext,
      }),
    });
  },

  async submitRequirements(baseUrl = '', taskId, taskStatement) {
    return request(`${baseUrl}/workflow/${taskId}/requirements`, {
      method: 'POST',
      body: JSON.stringify({
        task: taskStatement,
      }),
    });
  },

  async submitReview(baseUrl = '', taskId, reviewData) {
    const payload = {
      workflow_id: taskId,
      stage: reviewData.stage,
      decision: reviewData.decision, // 'approve' | 'request_changes'
      feedback: reviewData.feedback || '',
      // Legacy fallback fields for maximum compatibility
      review_status: reviewData.decision === 'approve' ? 'approved' : 'needs_revision',
      feedback_reason: reviewData.feedback || '',
    };

    return request(`${baseUrl}/workflow/${taskId}/review`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async getState(baseUrl = '', taskId) {
    return request(`${baseUrl}/workflow/${taskId}/state`);
  },

  async listArtifacts(baseUrl = '', taskId) {
    return request(`${baseUrl}/workflow/${taskId}/artifacts`);
  },

  getDownloadZipUrl(baseUrl = '', taskId) {
    return `${baseUrl}/workflow/${taskId}/download`;
  },
};
