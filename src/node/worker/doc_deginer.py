import sys
from typing import Any

from src.exception import ArcPilotException
from src.logger import logger
from src.node.sdlc_node import extract_text_content
from src.state.sdlc_state import DesignDocument, SDLCState


class DesignNode:
    """
    Responsible for generating comprehensive Functional and Technical Architecture Design Documents
    based on the requirements and user stories, as well as handling design review decisions.
    """
    def __init__(self, llm):
        self.llm = llm

    def create_design_document(self, state: SDLCState) -> dict[str, Any]:
        """
        Generates both functional and technical design documents.
        """
        logger.info("Executing create_design_document node")
        requirements = state.get('requirements', [])
        user_stories = state.get('user_stories', [])
        project_name = state.get('project_name', 'ArcPilot Project')
        structured_reqs = state.get('structured_requirements', {})

        design_feedback = None
        docs = state.get('design_documents')
        if docs:
            if isinstance(docs, dict):
                design_feedback = docs.get('feedback_reason')
            elif hasattr(docs, 'feedback_reason'):
                design_feedback = docs.feedback_reason

        functional_documents = self.generate_functional_design(
            project_name=project_name,
            requirements=requirements,
            user_stories=user_stories,
            structured_reqs=structured_reqs,
            design_feedback=design_feedback
        )

        technical_documents = self.generate_technical_design(
            project_name=project_name,
            requirements=requirements,
            user_stories=user_stories,
            structured_reqs=structured_reqs,
            design_feedback=design_feedback
        )

        design_documents = DesignDocument(
            functional=functional_documents,
            technical=technical_documents,
            review_status="pending",
            feedback_reason=design_feedback or "",
            architecture_overview="Modular Service-Oriented Architecture with FastAPI",
            database_schema="In-memory / SQLite relational schema",
            api_specifications="REST API endpoints"
        )

        # Update traceability matrix with design sections
        matrix = state.get("traceability_matrix", [])
        for item in matrix:
            item["design_sections"] = [
                f"FDD: Functional Requirements ({item.get('requirement_id')})",
                f"TDD: Component Implementation ({item.get('requirement_id')})"
            ]

        return {
            **state,
            "current_node": "create_design_document",
            "next_required_input": "design_review",
            "progress": 40,
            "design_documents": design_documents.model_dump(),
            "technical_documents": technical_documents,
            "traceability_matrix": matrix
        }

    def generate_functional_design(
        self, project_name: str, requirements: Any, user_stories: Any,
        structured_reqs: dict[str, Any], design_feedback: str | None
    ) -> str:
        """
        Generates comprehensive Functional Design Document in Markdown format.
        """
        logger.info("Generating Functional Design Document")
        prompt = f"""
Create a comprehensive, production-grade Functional Design Document for {project_name} in Markdown format.

Requirements:
{self._format_list(requirements)}

User Stories:
{self._format_user_stories(user_stories)}

{f"Feedback to incorporate from previous review: {design_feedback}" if design_feedback else ""}

The Functional Design Document must be exhaustive and structured with the following exact sections:
# Functional Design Document: {project_name}

## 1. Executive Summary and Scope
- Project Purpose and Target Audience
- Core Value Proposition
- In-Scope Features and Out-of-Scope Boundaries

## 2. Actors, Personas and User Roles
- Detailed list of actors, credentials, permissions, and roles

## 3. End-to-End User Journeys and Workflows
- Step-by-step user interaction flows (e.g. Input submission, Processing, Results display)
- Textual flowcharts and state transitions

## 4. Detailed Functional Requirements Breakdown
- Deep dive into each requirement ID (e.g. FR-01, FR-02)
- Inputs, Processing rules, Expected outputs, Edge cases

## 5. Business Rules and Validation Criteria
- Input validation (ranges, required fields, constraints)
- Business logic constraints and computation policies

## 6. Error Handling and User Feedback Policies
- User-facing error messages, HTTP status mapping, graceful degradation

## 7. External Integrations and Data Flow
- Third-party APIs, communication protocols, fallback behaviors

Format the document cleanly in standard Markdown with headers, tables, and bullet points.
"""
        try:
            response = self.llm.invoke(prompt)
            content = extract_text_content(response)
            return content
        except Exception as e:
            logger.error(f"Error generating functional design document: {e}")
            raise ArcPilotException(e, sys)

    def generate_technical_design(
        self, project_name: str, requirements: Any, user_stories: Any,
        structured_reqs: dict[str, Any], design_feedback: str | None
    ) -> str:
        """
        Generates comprehensive Technical Design Document in Markdown format.
        """
        logger.info("Generating Technical Design Document")
        prompt = f"""
Create an in-depth, production-ready Technical Design Document for {project_name} in Markdown format.

Requirements:
{self._format_list(requirements)}

User Stories:
{self._format_user_stories(user_stories)}

{f"Feedback to incorporate: {design_feedback}" if design_feedback else ""}

The Technical Design Document must include the following comprehensive sections:
# Technical Design Document: {project_name}

## 1. System Architecture Overview
- High-level architecture (Layered / Clean Architecture / Modular Monolith)
- Component diagrams described in text or ASCII
- Separation of concerns (Routers, Services, Clients, Models)

## 2. Technology Stack & Framework Selection
- Backend: Python 3.11+, FastAPI, Pydantic v2, Uvicorn
- Testing: Pytest, Unittest
- Security: Bandit, Ruff, Hash verification

## 3. Data Models and Database Schema
- Table schemas, primary/foreign keys, field types, constraints (represented as Markdown tables)
- Data serialization and Pydantic schemas

## 4. API Endpoint Specifications
- Exact HTTP Methods, URL paths, Request body schemas, Response schemas, and Status codes

## 5. External API Integrations & Resiliency
- Client adapters with timeouts, retries, and offline mock fallbacks
- Environment variable specifications for configuration

## 6. Security Architecture & Threat Modeling
- Secret management via environment variables
- Input sanitization, parameterization, and CORS policies

## 7. Logging, Metrics, and Observability
- Structured logging format, health probe endpoints (/health, /ready)

## 8. Deployment and Containerization Strategy
- Docker container specification, multi-stage build strategy, non-root execution

Use proper Markdown tables, code blocks with syntax highlighting, and precise technical detail.
"""
        try:
            response = self.llm.invoke(prompt)
            content = extract_text_content(response)
            return content
        except Exception as e:
            logger.error(f"Error generating technical design document: {e}")
            raise ArcPilotException(e, sys)

    def design_review(self, state: SDLCState) -> SDLCState:
        """
        Processes human review of the design documents.
        Never left as pass.
        """
        logger.info("Processing design review decision")
        docs = state.get("design_documents", {})
        review_status = "approved"
        feedback = ""

        if isinstance(docs, dict):
            review_status = docs.get("review_status", "approved")
            feedback = docs.get("feedback_reason", "")
        elif hasattr(docs, "review_status"):
            review_status = getattr(docs, "review_status", "approved")
            feedback = getattr(docs, "feedback_reason", "")

        if feedback:
            state["feedback_reason"] = feedback

        state["current_node"] = "design_review"

        if review_status.strip().lower() in ("approved", "approve", "accept"):
            state["progress"] = 45
            state["next_required_input"] = "generate_code"
        else:
            state["next_required_input"] = "create_design_document"

        return state

    def design_review_router(self, state: SDLCState) -> str:
        """
        Routes the workflow based on the design review decision.
        """
        docs = state.get("design_documents", {})
        status = ""
        if isinstance(docs, dict):
            status = docs.get("review_status", "")
        elif hasattr(docs, "review_status"):
            status = getattr(docs, "review_status", "")

        status = str(status).strip().lower()
        if status in ("approved", "approve", "yes", "accept"):
            return "approved"
        return "feedback"

    def _format_list(self, items: Any) -> str:
        if not items:
            return "No requirements specified."
        if isinstance(items, list):
            return "\n".join([f"- {item}" for item in items])
        return str(items)

    def _format_user_stories(self, stories: Any) -> str:
        if not stories:
            return "No user stories available."
        formatted = []
        for s in stories:
            if isinstance(s, dict):
                formatted.append(f"- [{s.get('story_id', 'US')}] {s.get('title', '')}: {s.get('description', '')}")
            elif hasattr(s, "title"):
                formatted.append(f"- [{getattr(s, 'story_id', 'US')}] {s.title}: {getattr(s, 'description', '')}")
            else:
                formatted.append(f"- {s!s}")
        return "\n".join(formatted)
