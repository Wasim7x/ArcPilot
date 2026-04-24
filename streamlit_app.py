import streamlit as st
import requests
import json

# ── Page config ──────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="SDLC Workflow Studio",
    page_icon="⚙️",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Custom CSS ────────────────────────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
    --bg:        #0d0f14;
    --surface:   #161921;
    --border:    #252a35;
    --accent:    #00e5c3;
    --accent2:   #7c6af7;
    --danger:    #ff4d6d;
    --warn:      #ffb830;
    --text:      #e8ecf2;
    --muted:     #626b7e;
    --success:   #00e5c3;
}

html, body, [data-testid="stAppViewContainer"] {
    background: var(--bg) !important;
    color: var(--text) !important;
    font-family: 'DM Sans', sans-serif;
}

[data-testid="stSidebar"] {
    background: var(--surface) !important;
    border-right: 1px solid var(--border);
}

/* Headings */
h1, h2, h3 { font-family: 'Space Mono', monospace !important; }
h1 { color: var(--accent) !important; letter-spacing: -1px; }
h2 { color: var(--text) !important; font-size: 1.15rem !important; }
h3 { color: var(--muted) !important; font-size: .9rem !important; text-transform: uppercase; letter-spacing: 2px; }

/* Inputs */
input, textarea, select, [data-baseweb="input"] input,
[data-baseweb="textarea"] textarea {
    background: var(--bg) !important;
    border: 1px solid var(--border) !important;
    color: var(--text) !important;
    border-radius: 6px !important;
    font-family: 'DM Sans', sans-serif !important;
}
input:focus, textarea:focus {
    border-color: var(--accent) !important;
    box-shadow: 0 0 0 2px rgba(0,229,195,.15) !important;
}

/* Selectbox */
[data-baseweb="select"] > div {
    background: var(--bg) !important;
    border-color: var(--border) !important;
    color: var(--text) !important;
}

/* Buttons */
.stButton > button {
    background: var(--accent) !important;
    color: #0d0f14 !important;
    border: none !important;
    border-radius: 6px !important;
    font-family: 'Space Mono', monospace !important;
    font-weight: 700 !important;
    font-size: .78rem !important;
    letter-spacing: 1px !important;
    padding: .55rem 1.4rem !important;
    transition: opacity .2s, transform .1s !important;
}
.stButton > button:hover  { opacity: .85 !important; transform: translateY(-1px); }
.stButton > button:active { transform: translateY(0); }

/* Secondary buttons (danger/neutral) */
.btn-danger > button { background: var(--danger) !important; }

/* Cards */
.card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1.2rem 1.4rem;
    margin-bottom: 1rem;
}
.card-accent { border-left: 3px solid var(--accent); }
.card-warn   { border-left: 3px solid var(--warn); }
.card-danger { border-left: 3px solid var(--danger); }

/* Badges */
.badge {
    display: inline-block;
    padding: .2rem .65rem;
    border-radius: 4px;
    font-family: 'Space Mono', monospace;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .5px;
}
.badge-green  { background: rgba(0,229,195,.12); color: var(--accent); border: 1px solid rgba(0,229,195,.25); }
.badge-purple { background: rgba(124,106,247,.12); color: var(--accent2); border: 1px solid rgba(124,106,247,.25); }
.badge-red    { background: rgba(255,77,109,.12); color: var(--danger); border: 1px solid rgba(255,77,109,.25); }
.badge-warn   { background: rgba(255,184,48,.12); color: var(--warn); border: 1px solid rgba(255,184,48,.25); }

/* Progress node pill */
.node-pill {
    display: inline-flex; align-items: center; gap: .4rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: .25rem .75rem;
    font-size: .78rem;
    color: var(--muted);
    margin: .2rem;
}
.node-pill.active { border-color: var(--accent); color: var(--accent); }
.node-pill .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); }
.node-pill.active .dot { background: var(--accent); box-shadow: 0 0 6px var(--accent); }

/* Expander */
[data-testid="stExpander"] {
    background: var(--surface) !important;
    border: 1px solid var(--border) !important;
    border-radius: 8px !important;
}

/* Dividers */
hr { border-color: var(--border) !important; }

/* Monospace outputs */
.mono {
    font-family: 'Space Mono', monospace;
    font-size: .78rem;
    color: var(--accent);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: .8rem 1rem;
    white-space: pre-wrap;
    word-break: break-word;
    overflow: auto;
    max-height: 340px;
}

/* Sidebar label */
.sidebar-label {
    font-family: 'Space Mono', monospace;
    font-size: .65rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: .2rem;
}
</style>
""", unsafe_allow_html=True)


# ── Constants ─────────────────────────────────────────────────────────────────
LLM_PROVIDERS = {
    "Groq": {
        "models": ["llama-3.3-70b-versatile", "llama-3.1-70b-versatile", "mixtral-8x7b-32768", "gemma2-9b-it"],
        "key_name": "GROQ_API_KEY",
        "placeholder": "gsk_...",
    },
    "OpenAI": {
        "models": ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"],
        "key_name": "OPENAI_API_KEY",
        "placeholder": "sk-...",
    },
    "Gemini": {
        "models": ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
        "key_name": "GOOGLE_API_KEY",
        "placeholder": "AIza...",
    },
}

REVIEW_STAGES = [
    ("product_owner_review",  "Product Owner Review", "product_owner"),
    ("design_review",         "Design Review",        "design"),
    ("code_review",           "Code Review",          "code"),
    ("security_review",       "Security Review",      "security"),
    ("test_cases_review",     "Test Cases Review",    "testcase"),
    ("qa_testing_review",     "QA Testing Review",    "qa"),
]

BASE_URL = "http://localhost:8000"


# ── Session state defaults ────────────────────────────────────────────────────
def _init_state():
    defaults = {
        "task_id": None,
        "workflow_status": None,
        "current_node": None,
        "progress": [],
        "next_required_input": None,
        "last_response": None,
        "review_stage_idx": 0,
        "workflow_started": False,
        "requirements_submitted": False,
        "api_configured": False,
    }
    for k, v in defaults.items():
        if k not in st.session_state:
            st.session_state[k] = v

_init_state()


# ── Helper: API call ──────────────────────────────────────────────────────────
def api_post(path: str, payload: dict) -> dict | None:
    try:
        r = requests.post(f"{BASE_URL}{path}", json=payload, timeout=120)
        r.raise_for_status()
        return r.json()
    except requests.exceptions.ConnectionError:
        st.error("❌  Cannot reach the FastAPI server. Make sure it's running on `localhost:8000`.")
    except requests.exceptions.HTTPError as e:
        st.error(f"❌  HTTP {e.response.status_code}: {e.response.text}")
    except Exception as e:
        st.error(f"❌  Unexpected error: {e}")
    return None


def configure_api(provider: str, model: str, api_key: str) -> bool:
    payload = {"provider": provider, "model": model, "api_key": api_key}
    r = api_post("/config/llm", payload)
    return r is not None and r.get("status") == "ok"


# ── Sidebar ───────────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("## ⚙️ SDLC Studio")
    st.markdown("---")

    st.markdown('<p class="sidebar-label">LLM Configuration</p>', unsafe_allow_html=True)

    provider = st.selectbox("Provider", list(LLM_PROVIDERS.keys()), key="provider")
    pinfo = LLM_PROVIDERS[provider]

    model = st.selectbox("Model", pinfo["models"], key="model")

    api_key = st.text_input(
        f"{pinfo['key_name']}",
        type="password",
        placeholder=pinfo["placeholder"],
        key="api_key",
    )

    server_url = st.text_input("API Server URL", value=BASE_URL, key="server_url")
    BASE_URL = server_url

    if st.button("💾  Apply Configuration"):
        if not api_key.strip():
            st.warning("Please enter your API key.")
        else:
            with st.spinner("Configuring..."):
                ok = configure_api(provider, model, api_key.strip())
            if ok:
                st.session_state.api_configured = True
                st.success("✅  LLM configured!")
            else:
                st.error("Failed to apply config (server may be unavailable).")

    st.markdown("---")

    if st.session_state.api_configured:
        st.markdown(
            f'<span class="badge badge-green">● CONFIGURED</span>&nbsp;'
            f'<span class="badge badge-purple">{provider} / {model}</span>',
            unsafe_allow_html=True,
        )
    else:
        st.markdown('<span class="badge badge-warn">● NOT CONFIGURED</span>', unsafe_allow_html=True)

    st.markdown("---")

    if st.session_state.task_id:
        st.markdown('<p class="sidebar-label">Active Task</p>', unsafe_allow_html=True)
        st.markdown(
            f'<div class="mono">{st.session_state.task_id}</div>',
            unsafe_allow_html=True,
        )

    if st.session_state.progress:
        st.markdown('<p class="sidebar-label">Progress</p>', unsafe_allow_html=True)
        # Handle both list and int types for progress
        progress_items = st.session_state.progress if isinstance(st.session_state.progress, list) else []
        if progress_items:
            for node in progress_items:
                st.markdown(
                    f'<span class="node-pill active"><span class="dot"></span>{node}</span>',
                    unsafe_allow_html=True,
                )
        elif isinstance(st.session_state.progress, int):
            # Display progress as percentage
            st.markdown(
                f'<span class="node-pill active"><span class="dot"></span>{st.session_state.progress}%</span>',
                unsafe_allow_html=True,
            )

    if st.session_state.task_id:
        st.markdown("---")
        if st.button("🔄  Reset Workflow"):
            for k in list(st.session_state.keys()):
                del st.session_state[k]
            _init_state()
            st.rerun()


# ── Main layout ───────────────────────────────────────────────────────────────
st.markdown("# SDLC Workflow Studio")
st.markdown(
    '<p style="color:var(--muted);font-size:.9rem;margin-top:-.5rem;">AI-powered Software Development Lifecycle Automation</p>',
    unsafe_allow_html=True,
)
st.markdown("---")

# ── STEP 1 — Start workflow ───────────────────────────────────────────────────
with st.container():
    st.markdown("### 01 — Start Workflow")

    col1, col2 = st.columns([3, 1])
    with col1:
        project_name = st.text_input(
            "Project Name",
            placeholder="e.g. E-Commerce Platform v2",
            disabled=st.session_state.workflow_started,
        )
    with col2:
        st.markdown("<br>", unsafe_allow_html=True)
        start_clicked = st.button(
            "🚀  Start",
            disabled=st.session_state.workflow_started or not project_name.strip(),
        )

    if start_clicked and project_name.strip():
        with st.spinner("Initialising workflow…"):
            resp = api_post("/sdlc/workflow/start", {"project_name": project_name.strip()})
        if resp:
            st.session_state.task_id = resp.get("task_id")
            st.session_state.workflow_status = resp.get("status")
            st.session_state.current_node = resp.get("current_node")
            st.session_state.progress = resp.get("progress", [])
            st.session_state.next_required_input = resp.get("next_required_input")
            st.session_state.workflow_started = True
            st.session_state.last_response = resp
            st.rerun()

    if st.session_state.workflow_started:
        st.markdown(
            f'<div class="card card-accent">'
            f'<b>Task ID:</b> <code>{st.session_state.task_id}</code>&nbsp;&nbsp;'
            f'<span class="badge badge-green">{st.session_state.workflow_status or "running"}</span>'
            f'</div>',
            unsafe_allow_html=True,
        )

# ── STEP 2 — Requirements ─────────────────────────────────────────────────────
if st.session_state.workflow_started:
    st.markdown("---")
    st.markdown("### 02 — Define Requirements")

    task_statement = st.text_area(
        "Task Statement",
        placeholder="Describe what the software should do…\ne.g. Build an e-commerce app with product catalog, cart, payments and order tracking.",
        height=130,
        disabled=st.session_state.requirements_submitted,
    )

    if st.button("📋  Submit Requirements", disabled=st.session_state.requirements_submitted):
        if not task_statement.strip():
            st.warning("Please enter a task statement.")
        else:
            with st.spinner("Processing requirements with LLM…"):
                resp = api_post(
                    f"/sdlc/workflow/{st.session_state.task_id}/requirements",
                    {"task": task_statement.strip()},
                )
            if resp:
                st.session_state.requirements_submitted = True
                st.session_state.last_response = resp
                data = resp.get("data", {})
                if isinstance(data, dict):
                    st.session_state.progress = data.get("progress", st.session_state.progress)
                    st.session_state.current_node = data.get("current_node", st.session_state.current_node)
                st.rerun()

    if st.session_state.requirements_submitted and st.session_state.last_response:
        with st.expander("📄  Requirements Response", expanded=False):
            st.markdown(
                f'<div class="mono">{json.dumps(st.session_state.last_response, indent=2)}</div>',
                unsafe_allow_html=True,
            )

# ── STEP 3 — Review stages ────────────────────────────────────────────────────
if st.session_state.requirements_submitted:
    st.markdown("---")
    st.markdown("### 03 — Review Stages")

    tabs = st.tabs([label for _, label, _ in REVIEW_STAGES])

    for i, (endpoint_suffix, label, review_type) in enumerate(REVIEW_STAGES):
        with tabs[i]:
            st.markdown(f"#### {label}")

            col_l, col_r = st.columns(2)
            with col_l:
                review_status = st.selectbox(
                    "Decision",
                    ["approved", "rejected", "needs_revision"],
                    key=f"status_{review_type}",
                )
            with col_r:
                feedback = st.text_area(
                    "Feedback / Reason",
                    placeholder="Optional notes or rejection reason…",
                    height=90,
                    key=f"feedback_{review_type}",
                )

            if st.button(f"✅  Submit {label}", key=f"submit_{review_type}"):
                with st.spinner(f"Submitting {label}…"):
                    resp = api_post(
                        f"/sdlc/workflow/{st.session_state.task_id}/{endpoint_suffix}",
                        {
                            "review_status": review_status,
                            "feedback_reason": feedback.strip(),
                        },
                    )
                if resp:
                    st.session_state.last_response = resp
                    data = resp.get("data", {})
                    if isinstance(data, dict):
                        st.session_state.progress = data.get("progress", st.session_state.progress)
                        st.session_state.current_node = data.get("current_node", st.session_state.current_node)
                        st.session_state.workflow_status = data.get("status", st.session_state.workflow_status)
                    st.success(f"✅  {label} submitted!")

                    with st.expander("📄  Full Response", expanded=False):
                        st.markdown(
                            f'<div class="mono">{json.dumps(resp, indent=2)}</div>',
                            unsafe_allow_html=True,
                        )
                    st.rerun()

# ── Footer ────────────────────────────────────────────────────────────────────
st.markdown("---")
st.markdown(
    '<p style="color:var(--muted);font-size:.75rem;text-align:center;">'
    'SDLC Workflow Studio &nbsp;·&nbsp; Powered by LangGraph + FastAPI'
    '</p>',
    unsafe_allow_html=True,
)
