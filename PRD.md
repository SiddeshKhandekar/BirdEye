# BirdEye - Product Requirements Document (PRD) v2.0

**AI-Powered Smart City & Neighborhood Surveillance SaaS - Hackathon Build**


**Status:** Locked for single-day build | Supersedes v1.0 (architecture and stack updated per revised spec)

## 1. Executive Summary & Value Proposition

BirdEye is a map-first, dual-loop SaaS platform for smart cities. It merges two workflows that are normally sold separately:

* **Civic loop:** citizens report infrastructure issues on a live map; an AI vision model validates the photo; the system deduplicates nearby reports and routes optimized fleet paths to municipal workers.


* **Security loop:** CCTV feeds are processed at the edge to detect, track, and OCR-read vehicle plates; loitering or blacklisted vehicles are flagged to a human reviewer, never auto-actioned.



Both loops write into the same multi-tenant spatial database, so a single ward or society sees infrastructure health and perimeter security side by side. The value proposition for judges: one data platform, two monetizable government/RWA use cases, one afternoon build.

## 2. User Personas

| Persona | Surface | Core Need |
| --- | --- | --- |
| **The Citizen**<br> | Mobile web (map-first PWA)

 | Report an issue in under 30 seconds, see it get picked up, get recognized for it

 |
| **The Authority/Municipal Worker**<br> | Mobile/desktop

 | A deduplicated, prioritized, route-optimized worklist not a raw complaint inbox

 |
| **The Society Admin / Local Police**<br> | Desktop command center

 | Real-time alerts on lingering/blacklisted vehicles, with one-tap human verification

 |

## 3. Scope & MVP Features (Strictly Scoped for a 1-Day Build)

| Feature | In MVP | Why / Why Not |
| --- | --- | --- |
| **Map-first citizen interface (Mapbox, full-screen, geolocation on load)**<br> | Yes

 | Core demo hook; judges see it in first 5 seconds

 |
| **Photo report submission + category tagging**<br> | Yes

 | Core civic loop input

 |
| **VLM-based photo verification ("is this actually a pothole/garbage?")**<br> | Yes

 | High wow-factor, directly scored under Technical Implementation

 |
| **Spatial deduplication (cluster reports within radius)**<br> | Yes

 | Required by spec; also a strong technical talking point

 |
| **Route optimization for municipal fleet**<br> | Yes (basic)

 | Use a mapping optimization API for a single demo (simplified) route, not a full VRP solver

 |
| **Leaderboard/gamification**<br> | Yes

 | Reuses points logic from v1.0; low build cost, good demo color

 |
| **CCTV upload $\rightarrow$ YOLOv8 detection $\rightarrow$ SORT tracking $\rightarrow$ EasyOCR plate read**<br> | Yes

 | Core security loop; process a short uploaded clip, not live RTSP, for demo reliability

 |
| **Loitering/blacklist flag $\rightarrow$ human review queue**<br> | Yes

 | Human-in-the-loop is both an ethical guardrail and a scoring point (responsible AI)

 |
| **LangChain orchestration $\rightarrow$ Directus role-based routing**<br> | Yes

 | Required by tech spec; demonstrates "AI decides which department owns this," a strong architecture story

 |
| **Multi-tenant isolation (society vs. ward)**<br> | Yes (minimal)

 | Two seeded tenants is enough to prove the SaaS story

 |
| **Live RTSP streaming, native mobile app, payments/billing, facial recognition**<br> | No

 | Explicitly out of scope not feasible in a day, and facial recognition is an ethical non-goal

 |

Scoring alignment: this scope is sized to hit "one-day feasibility" (Stage 1) while still supporting a demonstrable end-to-end prototype (Stage 2) and a 3-5 minute demo covering both loops (Stage 3).

## 4. User Stories & Acceptance Criteria

### 4.1 Citizen - Report an Issue

* **Story:** As a citizen, I want to open the app straight to a map and drop a geotagged photo report, so reporting takes under a minute.


* **AC1:** App requests geolocation on load; map centers on user location within 3 seconds.


* **AC2:** Reporting form is a floating sidebar over the map, not a separate page.


* **AC3:** On photo upload, a VLM call returns a verified/rejected classification before the report is accepted.


* **AC4:** If a similar report exists within a defined radius (e.g., 50m) and time window, the new submission is merged into the existing cluster, not created as a duplicate.



### 4.2 Municipal Worker - Resolve Efficiently

* **Story:** As a municipal worker, I want a deduplicated, routed worklist, so I don't waste trips on redundant or poorly sequenced stops.


* **AC1:** Worklist shows clustered issues, not raw duplicate reports.


* **AC2:** A "Generate Route" action returns an optimized stop order via a mapping optimization API.


* **AC3:** Marking a cluster "Resolved" awards points to all citizens who contributed reports to that cluster.



### 4.3 Society Admin / Police - Vehicle Screening

* **Story:** As a society admin, I want suspicious vehicles flagged to me with evidence, so I can verify before acting.


* **AC1:** Uploaded/streamed clip is processed through YOLOv8 (detect) $\rightarrow$ SORT (track) $\rightarrow$ EasyOCR (plate read).


* **AC2:** A vehicle stationary beyond a configurable threshold, or matching a blacklist plate, creates a flagged-review entry with clip + snapshot + confidence score.


* **AC3:** Admin can mark Confirmed Threat / False Positive / Escalate; no automated action is taken without this step.


* **AC4:** LangChain orchestration assigns the record a department role (e.g., police, sanitation) in Directus dynamically, based on record type no hardcoded Directus URLs in the AI layer.



## 5. System Architecture & Tech Stack

```text
Citizen PWA (Next.js + Tailwind)      | Command Center Dashboard (Next.js + Tailwind)[cite: 9]
Mapbox GL JS (map-first)              | Mapbox GL JS (heatmap/alerts)                [cite: 9]
               │                                      │
               ▼                                      ▼
Directus (API/CMS layer)                                                             [cite: 9]
Auto-generated REST/GraphQL over PostgreSQL+PostGIS                                  [cite: 9]
Role-based collections: citizen / sanitation / police                                [cite: 9]
               │
               ▼
LangChain Orchestration Layer                                                        [cite: 9]
- Routes verified records to correct Directus role ID                                 [cite: 9]
- Never calls raw Directus URLs; all access via role-scoped tool                     [cite: 9]
               │
      ┌────────┴────────┬─────────────────────────┐
      ▼                 ▼                         ▼
VLM Verification  | Spatial Dedup +     | AI Security Pipeline                       [cite: 9]
(civic photo)     | Route Optimization  | YOLOv8 -> SORT -> EasyOCR                  [cite: 9]
                  | (PostGIS + Mapping  |                                            [cite: 9]
                  | Optimization API)   |                                            [cite: 9]

```

* **Tech stack (locked per spec):**
* **Frontend:** Next.js (React), Tailwind CSS, Mapbox GL JS.


* **Backend & DB:** PostgreSQL + PostGIS, Directus for instant API/CMS generation and role-based collections.


* **AI Pipeline:** YOLOv8 (vehicle detection), SORT (multi-object tracking), Easy OCR (plate reading), LangChain (orchestration + dynamic Directus role routing).




* **Integration rule:** the LangChain layer talks to Directus exclusively through role-scoped SDK/tooling - no explicit Directus URLs hardcoded in the AI layer. This keeps department routing dynamic and is a strong "why this is real architecture, not a demo hack" talking point for judges.



## 6. Hackathon Execution Strategy (Hour-by-Hour)

Assumes a 10-hour build window ending before a 1:00 PM (or equivalent) judging slot. Adjust start time to your actual schedule.

| Hour | Milestone | Owner(s) |
| --- | --- | --- |
| **0-1** | Repo setup, Directus schema (collections + roles) locked, API contract shared with all workstreams

 | Backend

 |
| **1-3** | Citizen PWA: map-first shell + geolocation + report form (mocked API)

 | Frontend

 |
| **1-3** | Dashboard shell: worklist + review queue UI (mocked data)

 | Dashboard

 |
| **1-4** | VLM verification call + spatial dedup logic against real PostGIS schema

 | AI-Civic

 |
| **1-4** | YOLOv8 + SORT + Easy OCR pipeline on sample clip

 | AI-Security

 |
| **3-5** | Wire citizen PWA to live Directus API; replace mocks

 | Frontend

 |
| **4-6** | LangChain orchestration: verified record $\rightarrow$ role-scoped Directus write

 | AI-Civic + Backend

 |
| **4-6** | Flagged-vehicle record $\rightarrow$ review queue write via same orchestration pattern

 | AI-Security + Backend

 |
| **5-7** | Route optimization API integration on worklist

 | Frontend/Dashboard

 |
| **6-8** | Wire dashboard to live flagged-review + worklist data

 | Dashboard

 |
| **7-8** | Multi-tenant isolation check (2 seeded tenants, confirm no data bleed)

 | Backend

 |
| **8-9** | End-to-end run-through: submit report $\rightarrow$ verify $\rightarrow$ dedup $\rightarrow$ route; upload clip $\rightarrow$ detect $\rightarrow$ flag $\rightarrow$ verify

 | All

 |
| **9-9.5** | Bug triage, fallback to seeded/recorded data for any flaky live component

 | All

 |
| **9.5-10** | Demo script rehearsal (3-5 min, both loops covered) + deck polish

 | All

 |

## 7. Dividing Work Across 5 Accounts (Conflict-Free Parallel Workflow)

**Goal:** 5 people (or 5 agent accounts, e.g. running parallel Antigravity/agentic coding sessions) work simultaneously without merge conflicts or blocking each other on a shared backend.

### 7.1 The Core Trick: Contract-First, Then Parallel

Everything downstream of Hour 1 depends on the Directus schema being locked first. Once the collections, fields, and roles are defined and shared as a single source of truth (a schema doc or exported Directus schema JSON), every other account can build against that contract independently - including with mocked responses and only needs to swap mocks for live calls later. This is what prevents conflicts: nobody is guessing at another account's data shape.

### 7.2 Account Assignments

| Account | Module | Owns these files/paths | Depends on |
| --- | --- | --- | --- |
| **Account 1 - Backend/Data**<br> | Directus schema, PostgreSQL+PostGIS setup, role definitions, seed data for 2 tenants

 | `/directus/`, `/db/` schema contract doc

 | Nothing (goes first)

 |
| **Account 2 - Citizen Frontend**<br> | Map-first PWA, report form, leaderboard

 | `/apps/citizen/`<br> | Schema contract (mocked until Hour 3)

 |
| **Account 3 - Dashboard Frontend**<br> | Command center: worklist, review queue, heatmap

 | `/apps/dashboard/`<br> | Schema contract (mocked until Hour 6)

 |
| **Account 4 - AI Civic Pipeline**<br> | VLM verification, spatial dedup, route optimization, Lang Chain routing for civic records

 | `/services/ai-civic/`<br> | Schema contract

 |
| **Account 5 - AI Security Pipeline**<br> | YOLOv8 + SORT + EasyOCR, loitering/blacklist logic, LangChain routing for security records

 | `/services/ai-security/`<br> | Schema contract

 |

### 7.3 Repo & Branching Strategy (No-Conflict Rules)

* One monorepo, one main branch, protected. Each account works only inside its own top-level folder (table above) - this alone eliminates ~90% of merge conflicts since file paths never overlap.


* Branch naming: `feat/<account-name>/<short-task>` (e.g. `feat/ai-security/yolov8-detect`). No shared branches.


* Sync checkpoints, not continuous merging: merge to main at the Hour 3, Hour 6, and Hour 8 milestones from the execution plan above not ad hoc so nobody is rebasing against a half-finished sibling module.


* Shared contract lives in one file (e.g. `/contracts/schema.md` or an exported Directus schema), owned by Account 1, edited only by Account 1. Everyone else treats it as read-only and flags Account 1 if a field needs to change this prevents silent schema drift between accounts.


* Integration is Account 1 + one rotating "integrator" role at each sync checkpoint: that person merges all branches, resolves any path overlaps (should be near-zero given the folder split), and does a smoke test before the next hour block starts.


* If using parallel agentic coding sessions (e.g. multiple Antigravity workspaces) instead of 5 humans: run each account as its own workspace/agent session pointed at its own folder and its own branch, with the contract file mounted read-only into every session. Each agent session should be told explicitly which folder it owns and instructed never to modify files outside it - this is the same discipline as the human version, just enforced at the prompt level too.



### 7.4 What Each Account Needs Before It Can Start

* Account 1 publishes the schema contract (collections, field names/types, roles) - target: within Hour 1.


* Accounts 2-5 each build against a mocked version of that contract immediately, in parallel, without waiting on live Directus.


* Each account swaps its mock for the live Directus/LangChain call only at its assigned sync checkpoint (Hour 3 for frontend civic loop, Hour 6 for security loop and dashboard) - never before, so nobody is debugging a moving target mid-sprint.



## 8. Future Roadmap (Post-Hackathon Scalability)

* Live RTSP ingestion replacing uploaded-clip demo mode, with edge inference to cut bandwidth costs.


* Native mobile app once PWA validates the flow with real users.


* Payments/billing integration for self-serve Society Standard tier signup.


* DPDP Act-aligned data retention policy (raw footage TTL, consent signage tracking) - position as a compliance differentiator when pitching to municipal/police clients.


* Full VRP-based fleet routing beyond the single-route demo, for cities with larger worker fleets.


* Cross-tenant escalation workflow, where a society opts to share a confirmed threat with the local police tenant.



## 9. Changelog from v1.0

* Adopted map-first interface as the primary citizen entry point (previously map was one of several views).


* Added VLM-based photo verification and spatial deduplication as explicit MVP features, not "should-have".


* Replaced generic "AI vehicle detection" with the specified YOLOv8 $\rightarrow$ SORT $\rightarrow$ EasyOCR pipeline.


* Replaced Supabase with PostgreSQL + PostGIS + Directus, and added LangChain as the orchestration/routing layer with a strict no-hardcoded-URL integration rule.


* Restructured the document to match the requested output order (Exec Summary $\rightarrow$ Personas $\rightarrow$ Scope $\rightarrow$ User Stories/AC $\rightarrow$ Architecture $\rightarrow$ Execution Strategy $\rightarrow$ Roadmap).


* Added Section 7: a conflict-free, contract-first workflow for dividing the build across 5 accounts (human or parallel agentic sessions), including branch strategy and sync checkpoints.