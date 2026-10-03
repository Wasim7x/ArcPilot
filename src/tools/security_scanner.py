import json
import os
import re
import subprocess

from src.logger import logger
from src.state.sdlc_state import SecurityFinding, SecurityReport


class SecurityScannerTool:
    """
    Multi-layered Security Scanner combining SAST (Bandit), regex secret detection,
    and code pattern heuristics to detect vulnerabilities with categorized severities.
    """

    SECRET_PATTERNS = [
        (re.compile(r'(?i)(api[_-]?key|apikey|secret[_-]?key)\s*=\s*["\']([a-zA-Z0-9_\-]{16,})["\']'), "CRITICAL", "Hardcoded API Key/Secret", "Move sensitive credentials to environment variables and .env.example."),
        (re.compile(r'["\'](AIza[0-9A-Za-z\-_]{35})["\']'), "CRITICAL", "Google API Key Detected", "Store Google API keys in GEMINI_API_KEY environment variable."),
        (re.compile(r'["\'](sk-[a-zA-Z0-9]{20,})["\']'), "CRITICAL", "OpenAI API Key Detected", "Store OpenAI API keys in OPENAI_API_KEY environment variable."),
        (re.compile(r'["\'](gsk_[a-zA-Z0-9_\-]{20,})["\']'), "CRITICAL", "Groq API Key Detected", "Store Groq API keys in GROQ_API_KEY environment variable."),
        (re.compile(r'(?i)password\s*=\s*["\'][^"\']{4,}["\']'), "HIGH", "Hardcoded Plaintext Password", "Store passwords as hashed values and inject credentials via environment variables."),
    ]

    HEURISTIC_PATTERNS = [
        (re.compile(r'subprocess\.(Popen|run|call)\(.*shell\s*=\s*True.*\)', re.DOTALL), "HIGH", "Command Injection Risk", "Avoid shell=True with dynamic arguments; pass command arguments as a list."),
        (re.compile(r'os\.system\('), "HIGH", "Insecure os.system Call", "Use subprocess.run with argument list instead of os.system."),
        (re.compile(r'pickle\.loads?\('), "HIGH", "Unsafe Deserialization", "Avoid unpickling untrusted data; use json or safe serialization formats."),
        (re.compile(r'yaml\.load\(.*Loader\s*=\s*yaml\.(UnsafeLoader|Loader)\)'), "HIGH", "Insecure YAML Deserialization", "Use yaml.safe_load() instead."),
        (re.compile(r'verify\s*=\s*False'), "MEDIUM", "TLS Certificate Verification Disabled", "Enable TLS certificate verification (verify=True)."),
        (re.compile(r'SELECT\s+.*\s+FROM\s+.*%\s*\(.*\)'), "HIGH", "Potential SQL Injection", "Use parameterized queries or ORM models instead of string formatting."),
        (re.compile(r'eval\s*\('), "HIGH", "Dangerous eval() Usage", "Avoid dynamic evaluation of code with eval(); use ast.literal_eval if parsing literals."),
        (re.compile(r'exec\s*\('), "HIGH", "Dangerous exec() Usage", "Avoid dynamic execution of code strings."),
    ]

    @classmethod
    def scan_files_heuristics(cls, project_files: dict[str, str]) -> list[SecurityFinding]:
        findings: list[SecurityFinding] = []
        counter = 1

        for rel_path, content in project_files.items():
            lines = content.splitlines()

            # Check Secret Patterns
            for pattern, severity, title, mitigation in cls.SECRET_PATTERNS:
                for idx, line in enumerate(lines, start=1):
                    # Ignore .env.example or markdown documentation
                    if rel_path.endswith(".example") or rel_path.endswith(".md"):
                        continue
                    if pattern.search(line):
                        findings.append(SecurityFinding(
                            id=f"SEC-{counter:03d}",
                            title=title,
                            severity=severity,
                            category="Credential Security",
                            file_path=rel_path,
                            line_number=idx,
                            description=f"Potential exposed credential on line {idx} of {rel_path}.",
                            mitigation=mitigation
                        ))
                        counter += 1

            # Check Code Vulnerability Heuristics
            if rel_path.endswith(".py"):
                for pattern, severity, title, mitigation in cls.HEURISTIC_PATTERNS:
                    for idx, line in enumerate(lines, start=1):
                        if pattern.search(line):
                            findings.append(SecurityFinding(
                                id=f"SEC-{counter:03d}",
                                title=title,
                                severity=severity,
                                category="Code Vulnerability",
                                file_path=rel_path,
                                line_number=idx,
                                description=f"Identified {title} pattern in {rel_path}:{idx}.",
                                mitigation=mitigation
                            ))
                            counter += 1

        return findings

    @classmethod
    def run_bandit_on_dir(cls, project_dir: str) -> list[SecurityFinding]:
        findings: list[SecurityFinding] = []
        try:
            result = subprocess.run(
                ["bandit", "-r", project_dir, "-f", "json", "-q"],
                capture_output=True,
                text=True,
                timeout=25
            )
            if result.stdout:
                try:
                    data = json.loads(result.stdout)
                    results = data.get("results", [])
                    for idx, item in enumerate(results, start=100):
                        sev_raw = item.get("issue_severity", "MEDIUM").upper()
                        severity = "CRITICAL" if sev_raw == "HIGH" and item.get("issue_confidence") == "HIGH" else sev_raw
                        if severity not in ("CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"):
                            severity = "MEDIUM"

                        fpath = item.get("filename", "")
                        rel_path = os.path.relpath(fpath, project_dir) if project_dir in fpath else fpath

                        findings.append(SecurityFinding(
                            id=f"BANDIT-{idx:03d}",
                            title=f"Bandit {item.get('test_id', 'SAST')}: {item.get('issue_text', '')}",
                            severity=severity,
                            category="SAST",
                            file_path=rel_path,
                            line_number=item.get("line_number"),
                            description=item.get("issue_text", ""),
                            mitigation=item.get("more_info", "Follow secure coding guidelines.")
                        ))
                except json.JSONDecodeError:
                    pass
        except FileNotFoundError:
            logger.info("Bandit binary not found, relying on heuristic security analysis.")
        except subprocess.TimeoutExpired:
            logger.warning("Bandit scan timed out after 25s.")
        except Exception as e:
            logger.warning(f"Bandit scan error: {e}")

        return findings

    @classmethod
    def scan_project(cls, project_files: dict[str, str], project_dir: str | None = None) -> SecurityReport:
        findings = cls.scan_files_heuristics(project_files)

        if project_dir and os.path.isdir(project_dir):
            bandit_findings = cls.run_bandit_on_dir(project_dir)
            findings.extend(bandit_findings)

        crit_count = sum(1 for f in findings if f.severity == "CRITICAL")
        high_count = sum(1 for f in findings if f.severity == "HIGH")
        med_count = sum(1 for f in findings if f.severity == "MEDIUM")
        low_count = sum(1 for f in findings if f.severity == "LOW")
        info_count = sum(1 for f in findings if f.severity == "INFO")

        if crit_count > 0:
            status = "FAILED"
        elif high_count > 0:
            status = "NEEDS_REVISION"
        else:
            status = "PASSED"

        summary = f"Security Scan completed: {status}. Total findings: {len(findings)} (CRITICAL: {crit_count}, HIGH: {high_count}, MEDIUM: {med_count}, LOW: {low_count}, INFO: {info_count})."

        return SecurityReport(
            status=status,
            total_findings=len(findings),
            critical_count=crit_count,
            high_count=high_count,
            medium_count=med_count,
            low_count=low_count,
            info_count=info_count,
            findings=findings,
            summary=summary
        )
