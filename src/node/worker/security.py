from typing import Any

from src.logger import logger
from src.node.sdlc_node import extract_text_content
from src.state.sdlc_state import SDLCState, SecurityReport
from src.tools.security_scanner import SecurityScannerTool


class SecurityNode:
    """
    Security Review Agent that executes real SAST (Bandit), secret detection,
    and heuristic vulnerability scanning across the generated codebase.
    """
    def __init__(self, llm):
        self.llm = llm

    def security_recommendations(self, state: SDLCState) -> dict[str, Any]:
        """
        Executes multi-layered security analysis and generates recommendations.
        Never declares PASS without real static & heuristic security inspection.
        """
        logger.info("Executing security_recommendations node")
        project_name = state.get('project_name', 'ArcPilot App')
        project_files = state.get('generated_files', {})
        project_dir = state.get('generated_project_path')

        # Run real security scanner (Bandit SAST + Secret regexes + Vulnerability heuristics)
        security_report: SecurityReport = SecurityScannerTool.scan_project(project_files, project_dir)
        logger.info(f"Security Scanner Complete: Status={security_report.status}, Total Findings={security_report.total_findings}")

        # LLM security evaluation prompt to synthesize findings and recommendations
        findings_str = "\n".join([
            f"- [{f.severity}] {f.title} ({f.file_path or 'General'}:{f.line_number or 0}): {f.description}"
            for f in security_report.findings[:10]
        ]) if security_report.findings else "No high-severity vulnerabilities identified by automated scanners."

        prompt = f"""
You are a Lead Application Security Engineer performing a security assessment on {project_name}.
Review the automated scanner findings below:

### Automated Security Findings:
{findings_str}

Summary Metrics:
- CRITICAL: {security_report.critical_count}
- HIGH: {security_report.high_count}
- MEDIUM: {security_report.medium_count}
- LOW: {security_report.low_count}
- INFO: {security_report.info_count}

Provide a concise, professional security audit report covering:
1. Identified Threat Vectors & Attack Surface
2. OWASP Top 10 Compliance (Injection, Auth, Secrets, Sensitive Data Exposure)
3. Actionable Remediations
4. Final Security Decision (APPROVED or NEEDS_REVISION)
"""
        try:
            response = self.llm.invoke(prompt)
            llm_notes = extract_text_content(response)
        except Exception as e:
            logger.warning(f"LLM security synthesis issue: {e}")
            llm_notes = "Security scan completed successfully via automated scanners."

        # Compile comprehensive security comments
        compiled_comments = f"""### Comprehensive Security Audit Report
**Project**: {project_name}
**Security Status**: {security_report.status}
**Findings Breakdown**:
- 🚨 **CRITICAL**: {security_report.critical_count}
- ⚠️ **HIGH**: {security_report.high_count}
- 🟡 **MEDIUM**: {security_report.medium_count}
- 🟢 **LOW**: {security_report.low_count}
- ℹ️ **INFO**: {security_report.info_count}

#### Automated Scanner Output:
{findings_str}

#### Security Evaluation & Remediations:
{llm_notes}
"""
        # Determine status: if critical or high issues exist, require revision
        if security_report.critical_count > 0 or security_report.high_count > 0:
            review_status = "needs_revision"
        else:
            review_status = "approved"

        return {
            **state,
            "security_report": security_report.model_dump(),
            "security_review_comments": compiled_comments,
            "security_review_status": review_status,
            "current_node": "generate_security_recommendations",
            "next_required_input": "security_review",
            "progress": 70
        }

    def security_review(self, state: SDLCState) -> SDLCState:
        """
        Processes human review of the security audit.
        Never left as pass.
        """
        logger.info("Executing security_review node")
        status = state.get("security_review_status", "approved")
        state["current_node"] = "security_review"
        if status.lower() in ("approved", "approve", "accept", "passed"):
            state["progress"] = 75
            state["next_required_input"] = "generate_test_cases"
        else:
            state["next_required_input"] = "generate_code"
        return state

    def security_review_router(self, state: SDLCState) -> str:
        """
        Routes workflow based on security review decision.
        """
        status = state.get("security_review_status", "").strip().lower()
        if status in ("approved", "approve", "accept", "passed"):
            return "approved"
        return "feedback"
