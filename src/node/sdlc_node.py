import asyncio
import json
import re
from typing import Any

from src.logger import logger
from src.state.sdlc_state import (
    FunctionalRequirement,
    NonFunctionalRequirement,
    ProjectRequirements,
    SDLCState,
    TraceabilityItem,
    UserRole,
    UserStories,
)


def extract_text_content(response: Any) -> str:
    """
    Extract string content safely from any LLM response, handling
    both string and list-of-blocks formats (e.g. Gemini).
    """
    if response is None:
        return ""
    content = getattr(response, "content", response)
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for item in content:
            if isinstance(item, str):
                parts.append(item)
            elif isinstance(item, dict):
                if "text" in item:
                    parts.append(str(item["text"]))
                elif "content" in item:
                    parts.append(str(item["content"]))
            elif hasattr(item, "text"):
                parts.append(str(item.text))
            else:
                parts.append(str(item))
        return "".join(parts)
    return str(content)


class SDLCNode:
    def __init__(self, llm):
        self.llm = llm

    def project_initilization(self, state: SDLCState) -> SDLCState:
        """
        Performs the project initialization and sets up initial tracking.
        """
        logger.info(f"Initializing SDLC workflow for project: {state.get('project_name', 'Unnamed')}")
        state['progress'] = 10
        state['status'] = "in_progress"
        state['next_required_input'] = "requirements"
        state['current_node'] = 'project_initilization'
        if 'errors' not in state:
            state['errors'] = []
        if 'repair_attempts' not in state:
            state['repair_attempts'] = []
        if 'max_repair_attempts' not in state:
            state['max_repair_attempts'] = 3
        if 'current_repair_attempt' not in state:
            state['current_repair_attempt'] = 0
        return state

    def extract_structured_requirements(self, project_name: str, task_statement: str) -> ProjectRequirements:
        """
        Transforms natural-language project descriptions into structured, validated ProjectRequirements.
        Uses structured LLM output with a robust JSON fallback parser.
        """
        prompt = f"""
You are a Lead Software Architect and Requirements Engineering Specialist.
Analyze the following natural-language project request and decompose it into a comprehensive, structured software requirements specification.

Project Name: {project_name}
User Requirement:
\"\"\"{task_statement}\"\"\"

Generate a complete JSON object matching the following structure:
{{
  "project_name": "{project_name}",
  "summary": "Brief executive summary of the system",
  "functional_requirements": [
    {{
      "id": "FR-01",
      "title": "Short title",
      "description": "Precise functional requirement description",
      "priority": "High",
      "acceptance_criteria": ["Criteria 1", "Criteria 2"]
    }}
  ],
  "non_functional_requirements": [
    {{
      "id": "NFR-01",
      "category": "Performance",
      "description": "Latency / throughput target",
      "metric_target": "< 500ms"
    }}
  ],
  "external_integrations": [
    {{
      "name": "Integration Name",
      "purpose": "Why this API is needed",
      "api_type": "REST",
      "env_var_keys": ["API_KEY"],
      "required": true
    }}
  ],
  "user_roles": [
    {{
      "role_name": "Standard User",
      "description": "General consumer of the service",
      "permissions": ["Search", "View"]
    }}
  ],
  "constraints": ["Python 3.11+", "Modular architecture"],
  "acceptance_criteria": ["System must start cleanly", "All endpoints return proper status codes"]
}}

Only respond with the valid JSON object, without extra commentary or markdown fencing.
"""
        # Try structured output first if supported by the LLM
        try:
            if hasattr(self.llm, "with_structured_output"):
                structured_llm = self.llm.with_structured_output(ProjectRequirements)
                result = structured_llm.invoke(prompt)
                if isinstance(result, ProjectRequirements):
                    return result
                if isinstance(result, dict):
                    return ProjectRequirements(**result)
        except Exception as e:
            logger.info(f"Structured output call bypassed, falling back to direct prompt: {e}")

        # Fallback to direct prompt invocation + JSON parsing
        try:
            response = self.llm.invoke(prompt)
            content = extract_text_content(response)

            # Clean JSON markdown fences
            clean_json = content.strip()
            if clean_json.startswith("```"):
                clean_json = re.sub(r"^```(?:json)?", "", clean_json, flags=re.IGNORECASE)
                clean_json = re.sub(r"```$", "", clean_json).strip()

            data = json.loads(clean_json)
            return ProjectRequirements(**data)
        except Exception as parse_err:
            logger.warning(f"Direct LLM requirement extraction bypassed ({parse_err}). Building programmatic requirements.")
            # Fallback heuristic generator to ensure validity
            lines = [line_item.strip("-• *0123456789. ") for line_item in task_statement.splitlines() if line_item.strip()]

            if not lines:
                lines = [task_statement.strip()]

            frs = [
                FunctionalRequirement(
                    id=f"FR-{i+1:02d}",
                    title=f"Requirement {i+1}",
                    description=line,
                    priority="High",
                    acceptance_criteria=[f"Verify {line.lower()}"]
                ) for i, line in enumerate(lines[:6])
            ]
            nfrs = [
                NonFunctionalRequirement(id="NFR-01", category="Reliability", description="System handles API failures gracefully", metric_target="99.9% uptime"),
                NonFunctionalRequirement(id="NFR-02", category="Security", description="No credentials hardcoded in codebase", metric_target="100% compliant")
            ]
            return ProjectRequirements(
                project_name=project_name,
                summary=task_statement[:200],
                functional_requirements=frs,
                non_functional_requirements=nfrs,
                external_integrations=[],
                user_roles=[UserRole(role_name="User", description="Standard application user", permissions=["Access application"])],
                constraints=["Modern Python", "FastAPI / Modular"],
                acceptance_criteria=["All functional requirements verified", "Passing test suite"]
            )

    def get_requirements(self, state: SDLCState) -> SDLCState:
        """
        Processes user task description into structured requirements and updates state.
        Never leaves requirements empty or as 'pass'.
        """
        logger.info("Executing get_requirements node")
        project_name = state.get("project_name", "ArcPilot Project")
        task = state.get("task", "")

        # If task is not in state but requirements list is provided
        if not task and state.get("requirements"):
            task = "\n".join(state["requirements"])
        if not task:
            task = f"Build full production application for {project_name}"

        structured_reqs = self.extract_structured_requirements(project_name, task)

        # Keep legacy string list for backward compatibility with existing UI
        string_reqs = [
            f"{fr.id}: {fr.title} - {fr.description}"
            for fr in structured_reqs.functional_requirements
        ]
        if not string_reqs and state.get("requirements"):
            string_reqs = state["requirements"]

        state["requirements"] = string_reqs
        state["structured_requirements"] = structured_reqs.model_dump()
        state["current_node"] = "get_requirements"
        state["progress"] = 20
        state["next_required_input"] = "product_owner_review"
        return state

    async def generate_user_story(
        self, project_name: str, fr: FunctionalRequirement, feedback_reason: str, index: int
    ) -> UserStories:
        prompt = f"""
You are an expert Agile Product Owner. Convert this functional requirement into a comprehensive User Story:
Project: {project_name}
Requirement ID: {fr.id}
Requirement Title: {fr.title}
Requirement Description: {fr.description}
Acceptance Criteria: {', '.join(fr.acceptance_criteria)}
{f"Incorporate this feedback: {feedback_reason}" if feedback_reason else ""}

Provide a JSON object with:
{{
  "id": {index},
  "story_id": "US-{index:02d}",
  "title": "Clear user story title",
  "description": "As a [role], I want [feature] so that [benefit]",
  "acceptance_criteria": ["Criteria 1", "Criteria 2"],
  "priority": "{fr.priority}",
  "status": "To Do",
  "requirement_reference": ["{fr.id}"]
}}
Only return the JSON object.
"""
        try:
            if hasattr(self.llm, "with_structured_output"):
                structured_llm = self.llm.with_structured_output(UserStories)
                resp = await structured_llm.ainvoke(prompt)
                if isinstance(resp, UserStories):
                    return resp
                if isinstance(resp, dict):
                    return UserStories(**resp)
        except Exception:
            pass

        # Fallback to direct invoke
        try:
            response = await self.llm.ainvoke(prompt)
            content = extract_text_content(response)
            clean_json = content.strip().lstrip("```json").rstrip("```").strip()
            data = json.loads(clean_json)
            return UserStories(**data)
        except Exception as e:
            logger.warning(f"Fallback generation for story {index} due to LLM error/spike: {e}")
            return UserStories(
                id=index,
                story_id=f"US-{index:02d}",
                title=fr.title,
                description=f"As a user, I want {fr.description} so that the system fulfills {fr.id}.",
                acceptance_criteria=fr.acceptance_criteria or ["Successful execution without errors"],
                priority=fr.priority,
                status="To Do",
                requirement_reference=[fr.id]
            )

    async def auto_generate_user_stories(self, state: SDLCState) -> dict[str, Any]:
        """
        Auto generate the user stories based on the structured or list requirements.
        Ensures each story references one or more requirements.
        """
        logger.info("Executing auto_generate_user_stories node")
        project_name = state.get("project_name", "ArcPilot Project")
        feedback_reason = state.get("feedback_reason", "")

        structured = state.get("structured_requirements")
        fr_list: list[FunctionalRequirement] = []

        if structured and "functional_requirements" in structured:
            for fr_data in structured["functional_requirements"]:
                fr_list.append(FunctionalRequirement(**fr_data))
        else:
            # Reconstruct from string list
            req_strings = state.get("requirements", ["Core feature functionality"])
            for idx, r_str in enumerate(req_strings, start=1):
                fr_list.append(FunctionalRequirement(
                    id=f"FR-{idx:02d}",
                    title=f"Requirement {idx}",
                    description=r_str,
                    priority="High",
                    acceptance_criteria=[f"Verify {r_str}"]
                ))

        tasks = [
            self.generate_user_story(project_name, fr, feedback_reason, idx)
            for idx, fr in enumerate(fr_list, start=1)
        ]

        results = await asyncio.gather(*tasks, return_exceptions=True)
        user_stories: list[UserStories] = []
        for idx, res in enumerate(results, start=1):
            if isinstance(res, UserStories):
                user_stories.append(res)
            else:
                fr = fr_list[idx - 1] if idx - 1 < len(fr_list) else None
                user_stories.append(UserStories(
                    id=idx,
                    story_id=f"US-{idx:02d}",
                    title=fr.title if fr else f"Requirement {idx}",
                    description=f"As a user, I want {fr.description if fr else 'feature'} so that the system fulfills {fr.id if fr else idx}.",
                    acceptance_criteria=(fr.acceptance_criteria if fr else []) or ["Successful execution without errors"],
                    priority=fr.priority if fr else "High",
                    status="To Do",
                    requirement_reference=[fr.id] if fr else [f"FR-{idx:02d}"]
                ))

        # Build initial requirement traceability matrix
        matrix = []
        for story in user_stories:
            for req_id in story.requirement_reference:
                matrix.append(TraceabilityItem(
                    requirement_id=req_id,
                    requirement_title=story.title,
                    user_story_ids=[story.story_id],
                    design_sections=[],
                    code_files=[],
                    test_case_ids=[],
                    test_status="PENDING"
                ).model_dump())

        return {
            "user_stories": [s.model_dump() if hasattr(s, "model_dump") else s for s in user_stories],
            "traceability_matrix": matrix,
            "next_required_input": "product_owner_review",
            "current_node": "auto_generate_user_stories",
            "progress": 30
        }

    def product_owner_review_decision(self, state: SDLCState) -> SDLCState:
        """
        Reviews the product requirements and prepares the state for routing.
        """
        logger.info(f"Product owner decision received: {state.get('product_decision', 'unspecified')}")
        state['current_node'] = 'product_owner_review_decision'
        return state

    def product_decision_router(self, state: SDLCState) -> str:
        """
        Router function for product review decision.
        """
        decision = state.get("product_decision", "").strip().lower()
        if decision in ("approved", "approve", "yes", "accept"):
            return "approved"
        return "feedback"
