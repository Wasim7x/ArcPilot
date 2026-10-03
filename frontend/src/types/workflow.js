/**
 * Authoritative SDLC Workflow Definitions and Metadata
 */

export const WORKFLOW_STAGES = [
  { id: 'requirements', label: 'Requirements', desc: 'Decomposition & Spec', type: 'input' },
  { id: 'user_stories', label: 'User Stories', desc: 'Agile Stories & Matrix', type: 'automated' },
  { id: 'product_owner_review', label: 'Product Owner Review', desc: 'Review & Approval Gate', type: 'human_review' },
  { id: 'design', label: 'Architecture & Design', desc: 'Functional & Tech Specs', type: 'automated' },
  { id: 'design_review', label: 'Design Review', desc: 'Architecture Signoff Gate', type: 'human_review' },
  { id: 'code_generation', label: 'Code Generation', desc: 'Multi-File Backend & AST', type: 'automated' },
  { id: 'code_review', label: 'Code Review', desc: 'Quality & AST Review Gate', type: 'human_review' },
  { id: 'security_review', label: 'Security Review', desc: 'SAST & Secret Audit Gate', type: 'human_review' },
  { id: 'test_generation', label: 'Test Case Generation', desc: 'Unit & API Test Suite', type: 'automated' },
  { id: 'test_cases_review', label: 'Test Cases Review', desc: 'Coverage & Test Gate', type: 'human_review' },
  { id: 'qa_testing', label: 'QA Testing & Repair', desc: 'Subprocess Execution & Fix', type: 'automated' },
  { id: 'qa_testing_review', label: 'QA Testing Review', desc: 'Quality Gate Signoff', type: 'human_review' },
  { id: 'deployment', label: 'Deployment & Packaging', desc: 'Docker & ZIP Archive', type: 'automated' },
];

export const HUMAN_REVIEW_META = {
  product_owner_review: {
    title: 'Product Owner Review Gate',
    icon: '👤',
    stage: 'product_owner_review',
    desc: 'Review the generated requirements and agile user stories before architecture design begins.',
    approveLabel: 'Approve & Continue',
    rejectLabel: 'Reject / Request Changes',
    nextStageLabel: 'Architecture & Design',
    feedbackPlaceholder: 'Enter feedback or requested revisions (e.g. The user stories should include acceptance criteria for budget validation and weather-based recommendations)...',
    primaryTab: 'user_stories',
  },
  design_review: {
    title: 'Architecture & Design Review Gate',
    icon: '🏗️',
    stage: 'design_review',
    desc: 'Review the Functional Design (FDD) and Technical Architecture (TDD) before code implementation.',
    approveLabel: 'Approve & Continue',
    rejectLabel: 'Reject / Request Changes',
    nextStageLabel: 'Code Generation',
    feedbackPlaceholder: 'Enter architecture feedback or schema changes required...',
    primaryTab: 'design',
  },
  code_review: {
    title: 'Code Review & Quality Gate',
    icon: '💻',
    stage: 'code_review',
    desc: 'Review the multi-file implementation and automated AST/static syntax analysis report.',
    approveLabel: 'Approve & Continue',
    rejectLabel: 'Reject / Request Changes',
    nextStageLabel: 'Security Review',
    feedbackPlaceholder: 'Enter code quality revision notes or refactoring requests...',
    primaryTab: 'code',
  },
  security_review: {
    title: 'Security & Vulnerability Review Gate',
    icon: '🔒',
    stage: 'security_review',
    desc: 'Review Bandit SAST scan findings, secret audit logs, and security recommendations.',
    approveLabel: 'Approve & Continue',
    rejectLabel: 'Reject / Request Changes',
    nextStageLabel: 'Test Generation',
    feedbackPlaceholder: 'Enter security remediation requirements...',
    primaryTab: 'security',
  },
  test_cases_review: {
    title: 'Test Cases Review Gate',
    icon: '🧪',
    stage: 'test_cases_review',
    desc: 'Review the generated test suite covering functional requirements and integration points.',
    approveLabel: 'Approve & Continue',
    rejectLabel: 'Reject / Request Changes',
    nextStageLabel: 'QA Testing',
    feedbackPlaceholder: 'Enter missing edge cases or additional test scenarios required...',
    primaryTab: 'qa',
  },
  qa_testing_review: {
    title: 'QA Testing Review & Signoff',
    icon: '🚦',
    stage: 'qa_testing_review',
    desc: 'Review test execution outputs, assertion outcomes, and automated repair attempt history.',
    approveLabel: 'Approve & Continue',
    rejectLabel: 'Reject / Request Changes',
    nextStageLabel: 'Deployment & Packaging',
    feedbackPlaceholder: 'Enter QA feedback or unresolved test failures to repair...',
    primaryTab: 'qa',
  },
};

export const LLM_MODELS = {
  Groq: ['qwen/qwen3.8-27b', 'openai/gpt-oss-120b', 'llama-3.3-70b-versatile', 'llama-3.1-70b-versatile', 'mixtral-8x7b-32768', 'gemma2-9b-it'],
  OpenAI: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  Gemini: ['gemini-3.8-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'],
};
