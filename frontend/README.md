# ArcPilot Frontend — Modern Scalable Architecture

This directory houses the modular React + Vite frontend for **ArcPilot** (AI SDLC Orchestrator).

## Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Topbar with session info and health probe
│   │   ├── Sidebar.jsx            # LLM provider configuration and multi-format exports
│   │   ├── WorkflowProgress.jsx   # Right sidebar with 13-stage track & dynamic progress
│   │   ├── ReviewPanel.jsx        # Reusable human review gate (Approve/Reject + Feedback)
│   │   ├── RequirementsPanel.jsx  # Structured requirements decomposition renderer
│   │   ├── UserStoriesPanel.jsx   # Agile user stories with acceptance criteria
│   │   ├── TraceabilityMatrix.jsx # Non-clipped, sticky-header traceability table
│   │   ├── ArtifactViewer.jsx     # Multi-tab artifact inspector with instant exports
│   │   ├── LoadingState.jsx       # Visual spinner and active stage indicator
│   │   └── ErrorState.jsx         # Contextual error card with retry action
│   ├── pages/
│   │   └── Orchestrator.jsx       # Main workspace aggregating workflow cards & inspector
│   ├── services/
│   │   └── api.js                 # Centralized API service with normalized models
│   ├── hooks/
│   │   └── useWorkflow.js         # Reactive workflow polling and state management
│   ├── types/
│   │   └── workflow.js            # 13-stage contract and review gate metadata
│   ├── utils/
│   │   └── export.js              # TXT, JSON, and HTML export file generation
│   ├── styles/
│   │   └── index.css              # Dark developer theme, tokens, and responsive layout
│   ├── App.jsx                    # Root layout orchestrator
│   └── main.jsx                   # Vite React application mounting
├── index.html                     # HTML root with DM Sans and IBM Plex Mono fonts
├── vite.config.js                 # Vite bundler configuration with backend proxy
└── package.json                   # Dependencies and build scripts
```

## Running & Building

- **Development server**: `npm run dev` (starts on port 5173 with proxy to backend port 8000)
- **Production build**: `npm run build` (outputs optimized bundle to `frontend/dist/`)
- **FastAPI serving**: The backend automatically serves `frontend/dist/` at `http://localhost:8000/` when built.
