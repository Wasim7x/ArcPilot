import json
from typing import Any, Literal, TypedDict

from pydantic import BaseModel, Field

# ── Structured Requirement Models ──────────────────────────────────────────────

class FunctionalRequirement(BaseModel):
    id: str = Field(..., description="Unique identifier e.g. FR-01")
    title: str = Field(..., description="Short title of the functional requirement")
    description: str = Field(..., description="Clear, detailed description of functional behavior")
    priority: str = Field("High", description="Priority level: High, Medium, Low")
    acceptance_criteria: list[str] = Field(default_factory=list, description="Criteria for successful implementation")

class NonFunctionalRequirement(BaseModel):
    id: str = Field(..., description="Unique identifier e.g. NFR-01")
    category: str = Field(..., description="e.g. Performance, Security, Reliability, Usability")
    description: str = Field(..., description="Specification of the non-functional requirement")
    metric_target: str | None = Field(None, description="Measurable target e.g. '< 500ms latency'")

class ExternalIntegration(BaseModel):
    name: str = Field(..., description="Name of external service or API e.g. OpenWeatherMap")
    purpose: str = Field(..., description="Why this external service is required")
    api_type: str = Field("REST", description="API type e.g. REST, GraphQL, SDK")
    env_var_keys: list[str] = Field(default_factory=list, description="Environment variables needed for secrets")
    required: bool = Field(True, description="Whether core functionality depends on this service")

class UserRole(BaseModel):
    role_name: str = Field(..., description="e.g. Anonymous User, Registered User, Admin")
    description: str = Field(..., description="Role responsibilities and context")
    permissions: list[str] = Field(default_factory=list, description="Actions permitted for this role")

class ProjectRequirements(BaseModel):
    project_name: str = Field(..., description="Name of the project")
    summary: str = Field(..., description="Executive summary of the application")
    functional_requirements: list[FunctionalRequirement] = Field(default_factory=list)
    non_functional_requirements: list[NonFunctionalRequirement] = Field(default_factory=list)
    external_integrations: list[ExternalIntegration] = Field(default_factory=list)
    user_roles: list[UserRole] = Field(default_factory=list)
    constraints: list[str] = Field(default_factory=list)
    acceptance_criteria: list[str] = Field(default_factory=list)

# ── User Story Model ───────────────────────────────────────────────────────────

class UserStories(BaseModel):
    id: int = Field(..., description="Numeric identifier")
    story_id: str = Field("US-01", description="Formatted story ID e.g. US-01")
    title: str = Field(..., description="The title of the user story")
    description: str = Field(..., description="As a <role>, I want <feature> so that <benefit>")
    acceptance_criteria: list[str] = Field(default_factory=list, description="List of acceptance criteria")
    priority: str = Field("High", description="High, Medium, Low")
    status: str = Field("To Do", description="Current status of story", examples=["To Do", "In Progress", "Completed"])
    requirement_reference: list[str] = Field(default_factory=list, description="Mapped requirement IDs e.g. ['FR-01']")

UserStoryItem = UserStories

# ── Workflow Request / Response Models ─────────────────────────────────────────

class StartWorkflowRequest(BaseModel):
    project_name: str
    initial_context: dict[str, Any] | None = None

class StartWorkflowResponse(BaseModel):
    task_id: str
    status: str = Field(..., examples=["approved", "initialized", "in_progress"])
    next_required_input: str | None
    progress: int
    current_node: str

# ── Design Models ──────────────────────────────────────────────────────────────

class DesignDocument(BaseModel):
    functional: str = Field(..., description="Holds the functional design Document in Markdown")
    technical: str = Field(..., description="Holds the technical design Document in Markdown")
    review_status: str = Field("", description="Indicates whether the design document has been reviewed")
    feedback_reason: str = Field("", description="Holds the design feedback")
    architecture_overview: str | None = Field(None, description="Summary of system architecture")
    database_schema: str | None = Field(None, description="Database schemas and tables")
    api_specifications: str | None = Field(None, description="Key API endpoints specification")

# ── Static Analysis & Security Models ──────────────────────────────────────────

class StaticAnalysisFinding(BaseModel):
    file_path: str
    line: int
    column: int = 0
    rule_id: str
    message: str
    severity: str = "warning"  # "error", "warning", "info"

class StaticAnalysisResult(BaseModel):
    passed: bool
    total_issues: int
    errors: int
    warnings: int
    findings: list[StaticAnalysisFinding] = Field(default_factory=list)
    raw_output: str = ""

class SecurityFinding(BaseModel):
    id: str = Field(..., description="e.g. SEC-01")
    title: str = Field(..., description="Brief title of security vulnerability")
    severity: Literal["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"] = "MEDIUM"
    category: str = Field("Code Security", description="e.g. SQL Injection, Insecure Auth, Secret Leak")
    file_path: str | None = None
    line_number: int | None = None
    description: str
    mitigation: str

class SecurityReport(BaseModel):
    status: str = "PASSED"  # "PASSED", "NEEDS_REVISION", "FAILED"
    total_findings: int = 0
    critical_count: int = 0
    high_count: int = 0
    medium_count: int = 0
    low_count: int = 0
    info_count: int = 0
    findings: list[SecurityFinding] = Field(default_factory=list)
    summary: str = ""

# ── Test Execution & QA Models ─────────────────────────────────────────────────

class TestCaseExecutionItem(BaseModel):
    __test__ = False
    test_id: str
    name: str
    status: Literal["PASS", "FAIL", "ERROR", "SKIP"]
    duration_seconds: float = 0.0
    error_message: str | None = None
    stdout: str | None = None

class TestExecutionReport(BaseModel):
    __test__ = False
    total_tests: int = 0
    passed: int = 0
    failed: int = 0
    errors: int = 0
    skipped: int = 0
    duration_seconds: float = 0.0
    exit_code: int = 0
    test_results: list[TestCaseExecutionItem] = Field(default_factory=list)
    raw_stdout: str = ""
    raw_stderr: str = ""
    summary: str = ""


class QAFailureAnalysis(BaseModel):
    test_id: str
    failure_reason: str
    affected_requirement: str
    affected_code_file: str
    recommended_fix: str

class QAReport(BaseModel):
    overall_status: Literal["PASS", "FAIL", "NEEDS_REVISION"] = "PASS"
    total_tests: int = 0
    passed: int = 0
    failed: int = 0
    quality_gate_passed: bool = True
    failure_analyses: list[QAFailureAnalysis] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)
    summary: str = ""

# ── Traceability & Repair Models ───────────────────────────────────────────────

class TraceabilityItem(BaseModel):
    requirement_id: str
    requirement_title: str
    user_story_ids: list[str] = Field(default_factory=list)
    design_sections: list[str] = Field(default_factory=list)
    code_files: list[str] = Field(default_factory=list)
    test_case_ids: list[str] = Field(default_factory=list)
    test_status: str = "UNTESTED"

class RepairAttempt(BaseModel):
    attempt_number: int
    timestamp: str
    failed_tests: list[str] = Field(default_factory=list)
    patched_files: list[str] = Field(default_factory=list)
    changes_summary: str
    result_status: str

class DeploymentResult(BaseModel):
    status: Literal["success", "failed", "pending"] = "pending"
    build_successful: bool = False
    dependencies_verified: bool = False
    smoke_test_passed: bool = False
    health_check_passed: bool = False
    artifacts_path: str = ""
    docker_ready: bool = False
    message: str = ""
    details: dict[str, Any] = Field(default_factory=dict)

# ── Complete SDLC State ────────────────────────────────────────────────────────

class SDLCState(TypedDict, total=False):
    # Core project identity & lifecycle
    task_id: str
    project_name: str
    task: str
    requirements: list[str]

    structured_requirements: dict[str, Any] | None
    user_stories: list[Any]
    progress: int
    next_required_input: str | None
    current_node: str
    status: Literal["initialized", "in_progress", "completed", "error", "failed_requires_human_review"]

    # Product Owner stage
    product_decision: str
    feedback_reason: str

    # Design stage
    design_documents: Any  # DesignDocument or dict
    technical_documents: str | None

    # Code generation stage
    code_generated: str
    generated_project_path: str | None
    generated_files: dict[str, str]

    # Code review & Static Analysis stage
    code_review_comments: str
    code_review_status: str
    code_review_feedback: str
    static_analysis: dict[str, Any] | None

    # Security review stage
    security_review_comments: str
    security_review_status: str
    security_review_feedback: str
    security_report: dict[str, Any] | None

    # Testing stage
    test_cases: str
    test_case_review_status: str
    test_case_review_feedback: str
    test_execution_results: dict[str, Any] | None

    # QA Testing & Debug loop
    qa_testing_status: str
    qa_testing_comments: str
    qa_testing_feedback: str
    qa_report: dict[str, Any] | None
    current_repair_attempt: int
    max_repair_attempts: int
    repair_attempts: list[dict[str, Any]]

    # Traceability
    traceability_matrix: list[dict[str, Any]]

    # Deployment stage
    deployment_status: str
    deployment_feedback: str
    deployment_result: dict[str, Any] | None

    # Diagnostics & Logs
    errors: list[str]
    timestamps: dict[str, str]

# ── Serialization Helper ───────────────────────────────────────────────────────

class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, BaseModel):
            return obj.model_dump()
        return super().default(obj)
