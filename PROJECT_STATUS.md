# BirdEye - Project Status & Tracking

> **Note:** This file serves as the living status report for the BirdEye project. It will be explicitly updated every time we make changes and finish a module or significant task.

## Current Overall Status
**Phase:** Module 1: Infrastructure Foundation (Not Started)
**Progress:** 0 / 5 Modules Completed

---

## The 5-Module Work Breakdown

### Module 1: Infrastructure Foundation
**Status: ⏳ Not Started**
- Setup PostgreSQL + PostGIS database schema
- Configure Directus Headless CMS & Role-Based Access Control (RBAC)
- Scaffold Next.js (`apps/web`) and FastAPI (`apps/ai-service`)
- Docker Compose configuration for local dev environment

### Module 2: Map & Citizen MVP (Frontend)
**Status: ⏳ Not Started**
- Implement full-screen Mapbox canvas with geolocation
- Create issue markers, pins, and clustering logic
- Build Citizen Report Modal (photo, category, anon shield)
- Connect Directus API to submit issues

### Module 3: AI Pipeline (Backend)
**Status: ⏳ Not Started**
- Set up FastAPI microservice receiving Directus webhooks
- VLM Verifier Agent: photo authenticity
- AI Deduplication Engine: PostGIS `ST_DWithin` + VLM confirmation
- LangChain Router: automated department assignment

### Module 4: Authority Command Center
**Status: ⏳ Not Started**
- Implement floating UI (Search bar, Filter chips) for desktop
- Build 400px Triage Drawer with status stepper
- Setup role-restricted views (Civic vs. Security modes)
- Wire up issue state transition logic with Directus

### Module 5: Gamification, Security & Polish
**Status: ⏳ Not Started**
- Build Citizen Karma points leaderboard
- Enforce Anonymity Shield at the API layer (strip PII)
- UI polish, micro-interactions, responsive touch fixes
- End-to-end hackathon demo flow rehearsal

---

*Last Updated: 2026-09-07*
