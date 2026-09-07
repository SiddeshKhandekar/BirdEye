# Module 1: Infrastructure Foundation — Detailed Plan

> **Objective:** Set up the complete development environment so that all 4 services (PostgreSQL+PostGIS, Directus CMS, FastAPI AI, Next.js Frontend) can boot with a single `docker compose up` command, with RBAC roles configured, database schema loaded, and stub endpoints responding.

---

## Files Created in This Module

| File | Purpose |
|---|---|
| `.gitignore` | Protects API keys (Stadia Maps, Mapbox, OpenAI), env files, node_modules, build artifacts |
| `.env.example` | Template for all environment variables across services |
| `docker-compose.yml` | Orchestrates postgres, directus, ai-service, web — with healthchecks and named volumes |
| `apps/ai-service/Dockerfile` | Python 3.11 container for FastAPI |
| `apps/ai-service/requirements.txt` | FastAPI, LangChain, OpenAI, Pydantic, etc. |
| `apps/ai-service/main.py` | FastAPI app with `/health`, `/verify`, `/deduplicate`, `/route` stub endpoints |
| `apps/ai-service/agents/verifier.py` | Placeholder — VLM photo authenticity (Module 3) |
| `apps/ai-service/agents/deduplicator.py` | Placeholder — Spatial + semantic dedup (Module 3) |
| `apps/ai-service/agents/router.py` | Placeholder — LangChain dept routing (Module 3) |
| `apps/ai-service/tools/directus_tools.py` | Placeholder — Role-scoped Directus SDK wrappers (Module 3) |
| `apps/ai-service/models/schemas.py` | Pydantic models: `IssuePayload`, `VerificationResult`, `DeduplicationResult`, `RoutingResult` |
| `apps/web/Dockerfile` | Node 20 container for Next.js dev server |
| `docs/DIRECTUS_RBAC_SETUP.md` | Step-by-step RBAC role/permission config guide for Directus |
| `db/init-postgis.sql` | *(Already existed)* — PostGIS schema with tenants, issues, clusters, karma |

---

## Architecture Diagram (Module 1 Scope)

```
docker compose up
       │
       ├── postgres (PostGIS 15-3.3)     ← runs init-postgis.sql on first boot
       │     └── birdeye DB: tenants, issues, issue_clusters, citizen_karma
       │
       ├── directus (latest)             ← connects to postgres, exposes port 8055
       │     └── Admin UI: configure RBAC roles manually (see docs/DIRECTUS_RBAC_SETUP.md)
       │
       ├── ai-service (FastAPI)          ← port 8000, stub endpoints ready
       │     └── /health → 200 OK
       │     └── /verify, /deduplicate, /route → placeholder responses
       │
       └── web (Next.js)                 ← port 3000, to be scaffolded with npx in Module 2
```

---

## Steps to Boot the Environment

### Prerequisites
- Docker Desktop installed and running
- Git (for cloning)

### Quick Start
```bash
# 1. Clone and enter project
cd BirdEye

# 2. Create your local env file
cp .env.example .env
# Edit .env → fill in your API keys and passwords

# 3. Boot all services
docker compose up -d

# 4. Verify
# PostgreSQL: localhost:5432
# Directus Admin: http://localhost:8055
# AI Service Health: http://localhost:8000/health
# Frontend: http://localhost:3000 (after Module 2 scaffold)
```

### Post-Boot Directus Setup
1. Log into Directus at `http://localhost:8055` with admin credentials from `.env`
2. Navigate to **Settings → Data Model** — verify tables (issues, tenants, etc.) are visible
3. Follow `docs/DIRECTUS_RBAC_SETUP.md` to create the 5 RBAC roles
4. Generate a static token for the `ai_service` role → paste into `.env` as `DIRECTUS_SERVICE_TOKEN`
5. Create the webhook flow: `items.create` on `issues` → POST to `http://ai-service:8000/verify`

---

## What's Next → Module 2 (Map & Citizen MVP)
- Initialize Next.js app inside `apps/web` with `npx create-next-app`
- Install Tailwind CSS, Mapbox GL JS
- Build `MapCanvas.tsx`, `IssueMarker.tsx`, `ReportModal.tsx`
- Connect to Directus REST API for issue CRUD
