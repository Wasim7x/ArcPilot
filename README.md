# ArcPilot — Autonomous AI SDLC Orchestration Platform

[![CI](https://github.com/Wasim7x/ArcPilot/actions/workflows/ci.yml/badge.svg)](https://github.com/Wasim7x/ArcPilot/actions/workflows/ci.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-2.0.0-009688.svg?style=flat&logo=FastAPI&logoColor=white)](https://fastapi.tiangolo.com)
[![LangGraph](https://img.shields.io/badge/Orchestration-LangGraph-blue.svg)](https://langchain-ai.github.io/langgraph/)
[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.12%20%7C%203.14-3776AB.svg?logo=python&logoColor=white)](https://python.org)
[![Security: Bandit](https://img.shields.io/badge/security-bandit-yellow.svg)](https://github.com/PyCQA/bandit)
[![Code style: ruff](https://img.shields.io/badge/code%20style-ruff-000000.svg)](https://github.com/astral-sh/ruff)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ArcPilot** is an enterprise-grade autonomous Software Development Life Cycle (SDLC) orchestration platform. It transforms natural-language project requirements into complete, validated, tested, hardened, and containerized runnable software applications.

---

## 🏛 System Architecture & Workflow

ArcPilot leverages **LangGraph** for deterministic workflow state orchestration, cyclic human-in-the-loop validation, and an automated debug/repair loop.

```text
               Natural-Language Project Requirement
                                ↓
                      Requirements Agent
        (Structured Decomposition: FR, NFR, Integrations)
                                ↓
                       User Story Agent
             (Agile Stories & Traceability Matrix)
                                ↓
                      Product Owner Review [HITL]
                                ↓
                    Architecture & Design Agent
             (Comprehensive Functional & Technical Specs)
                                ↓
                        Design Review [HITL]
                                ↓
                          Coding Agent
         (Multi-File Generation: Backend, Models, Clients)
                                ↓
                       Code Review Agent
             (AST Verification + Static Analysis Ruff)
                                ↓
                        Code Review [HITL]
                                ↓
                      Security Review Agent
           (Bandit SAST + Secret Scanning + Vulnerability)
                                ↓
                      Security Review [HITL]
                                ↓
                     Test Generation Agent
               (Unit, Integration, Edge Case Tests)
                                ↓
                       Test Review [HITL]
                                ↓
                     Test Execution Engine
             (Isolated Process Execution in Sandbox)
                                ↓
                           QA Agent
                (Quality Gate & Failure Analysis)
                                ↓
               ┌────────────────┴────────────────┐
               │                                 │
          Tests Passed                      Tests Failed
               │                                 │
               │                        Debugging / Repair Loop
               │                     (Patch Code & Re-run Tests)
               │                     [Configurable Max 3 Tries]
               │                                 │
               └────────────────┬────────────────┘
                                ↓
                     QA Testing Review [HITL]
                                ↓
                         Deployment Agent
          (Dependency Check, Docker Config, Smoke Testing)
                                ↓
               Verified Application Package (.zip)
```

---

## ⚡ Core Features

- **Multi-LLM Provider Support**: Unified abstraction supporting **Ollama** (Local Qwen, Llama, etc.), **Groq**, **OpenAI**, and **Google Gemini** with environment variable fallbacks and runtime hot-swapping.
- **Structured Requirements**: Transforms unconstrained natural language into structured Pydantic specifications (Functional, Non-Functional, External Integrations, User Roles, Constraints, and Acceptance Criteria).
- **Multi-File Project Generator**: Generates full, production-ready project hierarchies (FastAPI backend, models, resilient API clients with offline mock fallbacks, unit & API tests, Dockerfile, docker-compose, and documentation).
- **Real Static Code Analysis**: AST-level syntax and structural analysis coupled with automated Ruff linter execution.
- **Multi-Layered Security Scanner**: Real SAST (Bandit), regex secret detection, insecure deserialization prevention, SQL/command injection heuristics, and categorized severity scoring (CRITICAL, HIGH, MEDIUM, LOW, INFO).
- **Real Isolated Test Execution**: Subprocess-isolated test execution with environment variable sanitization (preventing host secret leaks), configurable timeout protection, and exit-code parsing.
- **Automated Debug & Repair Loop**: When test failures occur, the QA Agent diagnoses failure tracebacks and instructs the Debugging Agent to patch the code and re-execute tests automatically (up to `MAX_REPAIR_ATTEMPTS=3`).
- **Requirement Traceability**: Bidirectional mapping from Requirement IDs $\to$ User Stories $\to$ Design Sections $\to$ Code Files $\to$ Test Cases $\to$ Test Status.
- **Human-In-The-Loop (HITL)**: Native LangGraph interrupts across every major phase (Requirements, Stories, Design, Code, Security, Tests, QA).
- **Resilient State Management**: Workflow state namespacing (`sdlc:{workflow_id}:state`) with Redis storage and automatic in-memory fallback.
- **Artifact Packaging**: Exports deployable applications as `.zip` bundles ready for remote Linux server deployment.

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Python 3.10+ (tested on Python 3.11, 3.12, 3.14)
- Git
- Redis (optional — in-memory fallback is active by default)
- Docker & Docker Compose (optional for containerized deployment)

### 2. Local Installation

```bash
# Clone the repository
git clone https://github.com/Wasim7x/ArcPilot.git
cd ArcPilot

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate       # On Linux / macOS
# or: .\venv\Scripts\activate  # On Windows

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Configuration

Copy the example environment configuration:

```bash
cp .env.example .env
```

Configure your LLM provider credentials in `.env`:

# Choose provider: "ollama", "groq", "openai", "gemini", or "mock"
LLM_PROVIDER=ollama
LLM_MODEL=qwen3.8:27b

# Local Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen3.8:27b

# Cloud API Keys (optional if using local Ollama)
# GROQ_API_KEY=gsk_your_groq_api_key_here
# OPENAI_API_KEY=sk-your_openai_api_key_here
# GEMINI_API_KEY=AIza_your_gemini_api_key_here

# Redis (optional)
ENABLE_REDIS=false
REDIS_URL=redis://localhost:6379/0

# SDLC Settings
MAX_REPAIR_ATTEMPTS=3
TEST_TIMEOUT=45
PORT=8000
```

#### Running with Local Ollama:
1. Install Ollama from [ollama.com](https://ollama.com).
2. Start Ollama:
   ```bash
   ollama serve
   ```
3. Pull the recommended model:
   ```bash
   ollama pull qwen3.8:27b
   ```
4. Set in `.env`:
   ```env
   LLM_PROVIDER=ollama
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=qwen3.8:27b
   ```
5. Start ArcPilot.

> **Hardware note**: Running a 27B parameter model locally requires sufficient system RAM/GPU resources (recommended: 8GB+ VRAM GPU and 32GB system RAM).


### 4. Running ArcPilot

```bash
# Start the FastAPI server
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

Access the interactive API documentation at:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Production Web UI**: [http://localhost:8000/](http://localhost:8000/) (Served directly by FastAPI from `frontend/dist/`)
- **Frontend Dev Server**: Run `npm run dev` in `frontend/` to access [http://localhost:5173/](http://localhost:5173/)

---

## 🌐 Remote Linux Server Deployment

### Method A: Docker Compose Deployment (Recommended)

1. **Clone the repository on the remote server**:
   ```bash
   git clone https://github.com/Wasim7x/ArcPilot.git
   cd ArcPilot
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   nano .env
   ```
   *Ensure you set `GROQ_API_KEY` (or `OPENAI_API_KEY` / `GEMINI_API_KEY`), and set `ENABLE_REDIS=true`.*

3. **Launch with Docker Compose**:
   ```bash
   docker compose up -d --build
   ```

4. **Verify container health**:
   ```bash
   docker compose ps
   curl -f http://localhost:8000/health
   ```

5. **Inspect application logs**:
   ```bash
   docker compose logs -f arcpilot
   ```

---

### Method B: Systemd Service Deployment (Bare Metal / VM)

1. **Setup project directory and permissions**:
   ```bash
   sudo mkdir -p /opt/arcpilot
   sudo chown -R $USER:$USER /opt/arcpilot
   git clone https://github.com/Wasim7x/ArcPilot.git /opt/arcpilot
   cd /opt/arcpilot
   ```

2. **Create Python virtual environment**:
   ```bash
   python3 -m venv /opt/arcpilot/venv
   /opt/arcpilot/venv/bin/pip install --upgrade pip
   /opt/arcpilot/venv/bin/pip install -r requirements.txt
   ```

3. **Create Systemd Service**:
   ```bash
   sudo nano /etc/systemd/system/arcpilot.service
   ```

   Paste the following service definition:
   ```ini
   [Unit]
   Description=ArcPilot Autonomous SDLC Orchestrator
   After=network.target

   [Service]
   Type=simple
   User=ubuntu
   WorkingDirectory=/opt/arcpilot
   EnvironmentFile=/opt/arcpilot/.env
   ExecStart=/opt/arcpilot/venv/bin/uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4
   Restart=always
   RestartSec=5

   [Install]
   WantedBy=multi-user.target
   ```

4. **Enable and start the service**:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable arcpilot
   sudo systemctl start arcpilot
   sudo systemctl status arcpilot
   ```

---

## 📡 API Reference

| Endpoint | Method | Description |
|---|---|---|
| `GET /health` | `GET` | Health diagnostic probe (service, version, Redis status, graph status) |
| `GET /ready` | `GET` | Readiness probe |
| `POST /config/llm` | `POST` | Configure or hot-swap LLM provider (`Groq`, `OpenAI`, `Gemini`, `Mock`) |
| `GET /config/llm` | `GET` | Retrieve active LLM provider (credentials masked) |
| `POST /sdlc/workflow/start` | `POST` | Initialize a new SDLC workflow session |
| `POST /sdlc/workflow/{task_id}/requirements` | `POST` | Submit natural-language task requirement and begin SDLC |
| `POST /sdlc/workflow/{task_id}/product_owner_review` | `POST` | Submit Product Owner decision (`approved` / `needs_revision`) |
| `POST /sdlc/workflow/{task_id}/design_review` | `POST` | Submit Design review decision |
| `POST /sdlc/workflow/{task_id}/code_review` | `POST` | Submit Code review decision |
| `POST /sdlc/workflow/{task_id}/security_review` | `POST` | Submit Security audit decision |
| `POST /sdlc/workflow/{task_id}/test_cases_review` | `POST` | Submit Test suite review decision |
| `POST /sdlc/workflow/{task_id}/qa_testing_review` | `POST` | Submit QA testing review decision |
| `GET /sdlc/workflow/{task_id}/state` | `GET` | Inspect complete persisted workflow state |
| `GET /sdlc/workflow/{task_id}/download` | `GET` | Download full generated application as `.zip` archive |
| `GET /sdlc/workflow/{task_id}/artifacts` | `GET` | List all files in the generated project workspace |

---

## 🧪 Testing and Quality Gate

Run the complete test suite:

```bash
# Execute unit, integration, and E2E tests
python -m pytest -v tests/

# Execute static code analysis with Ruff
ruff check .

# Execute security scan with Bandit
bandit -r src -ll
```

---

## 🔒 Security Best Practices

1. **Credentials Isolation**: Never hardcode secrets in source files. ArcPilot masks sensitive tokens from all logs and API responses.
2. **Subprocess Sandboxing**: Generated code execution strips host environment variables (including all LLM API keys and database credentials).
3. **Execution Timeouts**: Isolated test executions are strictly capped by `TEST_TIMEOUT` (default: 45 seconds).
4. **State Isolation**: Redis keys use unique prefixes (`sdlc:{task_id}:state`) preventing cross-workflow data contamination.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
