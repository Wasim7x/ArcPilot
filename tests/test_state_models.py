import json

from src.state.sdlc_state import (
    CustomEncoder,
    DesignDocument,
    ExternalIntegration,
    FunctionalRequirement,
    NonFunctionalRequirement,
    ProjectRequirements,
    SecurityFinding,
    SecurityReport,
    TestCaseExecutionItem,
    TestExecutionReport,
    UserRole,
    UserStories,
)


def test_functional_requirement_model():
    fr = FunctionalRequirement(
        id="FR-01",
        title="Destination Weather",
        description="Retrieve weather for selected destination",
        priority="High",
        acceptance_criteria=["Return temp and condition"]
    )
    assert fr.id == "FR-01"
    assert fr.priority == "High"
    assert len(fr.acceptance_criteria) == 1

def test_project_requirements_model():
    reqs = ProjectRequirements(
        project_name="AI Trip Planner",
        summary="Automated travel planning application",
        functional_requirements=[
            FunctionalRequirement(
                id="FR-01",
                title="Weather Info",
                description="Fetch destination forecast",
                priority="High"
            )
        ],
        non_functional_requirements=[
            NonFunctionalRequirement(
                id="NFR-01",
                category="Performance",
                description="Fast response time",
                metric_target="< 500ms"
            )
        ],
        external_integrations=[
            ExternalIntegration(
                name="WeatherAPI",
                purpose="Forecast retrieval",
                api_type="REST",
                env_var_keys=["WEATHER_API_KEY"]
            )
        ],
        user_roles=[UserRole(role_name="Traveler", description="Plans itineraries")]
    )
    dump = reqs.model_dump()
    assert dump["project_name"] == "AI Trip Planner"
    assert len(dump["functional_requirements"]) == 1
    assert len(dump["external_integrations"]) == 1

def test_user_stories_model():
    us = UserStories(
        id=1,
        story_id="US-01",
        title="Check Destination Weather",
        description="As a traveler, I want to see weather forecasts so that I can pack appropriately.",
        acceptance_criteria=["Weather displayed on itinerary", "Forecast available for all days"],
        priority="High",
        status="To Do",
        requirement_reference=["FR-01"]
    )
    assert us.id == 1
    assert us.requirement_reference == ["FR-01"]
    assert len(us.acceptance_criteria) == 2

def test_design_document_model():
    doc = DesignDocument(
        functional="# Functional Design\nDetails",
        technical="# Technical Design\nFastAPI backend",
        review_status="approved",
        feedback_reason="Looks good"
    )
    assert doc.review_status == "approved"
    assert "FastAPI" in doc.technical

def test_security_report_model():
    report = SecurityReport(
        status="PASSED",
        total_findings=1,
        critical_count=0,
        high_count=0,
        medium_count=1,
        low_count=0,
        info_count=0,
        findings=[
            SecurityFinding(
                id="SEC-01",
                title="TLS Verification",
                severity="MEDIUM",
                description="verify=False in test script",
                mitigation="Set verify=True"
            )
        ]
    )
    assert report.status == "PASSED"
    assert report.total_findings == 1

def test_test_execution_report_model():
    report = TestExecutionReport(
        total_tests=3,
        passed=3,
        failed=0,
        errors=0,
        skipped=0,
        duration_seconds=0.12,
        exit_code=0,
        test_results=[
            TestCaseExecutionItem(test_id="T1", name="test_sample", status="PASS", duration_seconds=0.04)
        ]
    )
    assert report.total_tests == 3
    assert report.passed == 3
    assert report.exit_code == 0

def test_custom_encoder():
    fr = FunctionalRequirement(id="FR-01", title="Test", description="Desc")
    encoded = json.dumps({"fr": fr}, cls=CustomEncoder)
    assert "FR-01" in encoded
