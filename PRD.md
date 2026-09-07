# File 1: 01_BIRDEYE_PRD.md

# BirdEye - Product Requirements Document (PRD)
**Version:** 5.0 (Final Hackathon Build)
**Team Name:** RunTime[cite: 4]
**Target:** Single-Day Hackathon Delivery[cite: 1]

## 1. Executive Summary & Value Proposition
BirdEye is an AI-driven civic intelligence platform designed to transform how cities manage infrastructure maintenance. 

**The Core Problem:** Citizens lack a low-friction, anonymous way to report infrastructure flaws, while municipal bodies are paralyzed by duplicate complaints, unverified data, and inefficient routing[cite: 4].
**The BirdEye Solution:** A map-first web platform that gamifies civic reporting. It leverages AI Vision Language Models (VLM) to verify the authenticity of user-submitted photos, utilizes spatial logic and AI to deduplicate overlapping reports, and employs a LangChain orchestrator to dynamically route verified issues to the correct municipal department via Role-Based Access Control (RBAC).

This scoped MVP focuses strictly on "One-day feasibility" (20 marks) and delivering a "Working demonstration" (25 marks) that highlights end-to-end technical depth without feature bloat[cite: 1].

## 2. User Personas
*   **The Citizen (Mobile PWA):** Requires a frictionless, map-centric interface to drop geotagged reports in under 30 seconds[cite: 2]. Needs an anonymity shield to protect their identity from municipal scrutiny while earning gamified "Karma Points" for verified contributions[cite: 4].
*   **The Municipal Authority (Desktop Command Center):** Needs a deduplicated, verified, and route-optimized heatmap of civic issues[cite: 2]. They require a structured workflow to transition issues from *Reported* to *Resolved* rather than a raw, unstructured complaint inbox[cite: 2].

## 3. System Architecture & Tech Stack
The architecture ensures conflict-free parallel development across distinct domains[cite: 2].
*   **Frontend Framework:** Next.js (React) + Tailwind CSS[cite: 2].
*   **Map Engine:** Mapbox GL JS (or MapLibre/Stadia Maps)[cite: 2].
*   **Database & Spatial Engine:** PostgreSQL extended with PostGIS for high-performance geographic queries[cite: 2].
*   **Headless CMS & API:** Directus, generating instant REST/GraphQL endpoints and managing RBAC[cite: 2].
*   **AI Pipeline:** FastAPI microservice utilizing LangChain and a Vision Language Model (e.g., GPT-4o-mini) for image verification, semantic deduplication, and dynamic role assignment[cite: 2].
*   **Constraint:** The LangChain orchestration layer must communicate with Directus exclusively through role-scoped tooling, eliminating hardcoded Directus URLs[cite: 2].

## 4. Feature Specifications

### 4.1 Citizen Map-First Web App & Gamified Reporting
*   **Viewport Engine:** Render a full-screen `100vw/100vh` map that instantly requests `navigator.geolocation` on load and centers on the user[cite: 2].
*   **Design System Compliance:** Adhere strictly to designated tokens: Primary Action `#55B360`, App Background `#F7F8F5`, Primary Text `#293B46`, and Borders `#D7DADE`[cite: 3].
*   **Reporting Workflow:** Modal requires Category (Pothole, Garbage, Streetlights, Water), Title, and Photo Upload[cite: 4].
*   **Anonymity Shield:** A critical checkbox that strips PII from the public record to ensure safe civic participation (inspired by real-world activist protection)[cite: 4].
*   **Mutual Exclusion Rule:** Ensure that if a left navigation panel is open, any right-side panels are closed to prioritize map visibility[cite: 3].

### 4.2 Authority Command Center & Incident Triage
*   **Floating Navigation:** Top search bar and category filter chips resting above the map layer[cite: 3].
*   **Spatial Visualization:** Map clustering that groups dense issue reports into single clickable nodes[cite: 2].
*   **Triage Slide-Over Drawer (`400px` right panel)[cite: 3]:**
    *   Displays the AI-verified photo, geotagged address, and priority badge[cite: 3].
    *   Interactive 5-step visual stepper: `Reported -> Verified -> Assigned -> In Progress -> Resolved`[cite: 3].
    *   Administrative actions: `[Assign to Crew]` (triggers route optimization) and `[Mark Resolved]`[cite: 2, 3].

### 4.3 AI Vision Verification & LangChain Routing
*   **VLM Authenticity Verification:** Intercepts incoming photos and prompts a VLM to determine if the photo genuinely depicts the claimed civic infrastructure flaw[cite: 2]. Rejects low-confidence payloads to protect against spam[cite: 4].
*   **Dynamic Role-Scoped Routing:** A LangChain agent analyzes the verified report context and selects the correct municipal Directus Role ID (e.g., `role_road_infra_dept`)[cite: 2]. The payload is written to the database with this Role ID, ensuring it automatically populates on the correct department's dashboard without hardcoding API endpoints[cite: 2].

### 4.4 Two-Stage AI Deduplication Engine
*   **Stage 1 - Spatial Candidate Search (PostGIS):** Execute a PostGIS `ST_DWithin` query to locate any unresolved issues within a 50-meter radius of new coordinates[cite: 2].
*   **Stage 2 - Multimodal Semantic Similarity (VLM):** Pass new and existing candidate images/descriptions to the VLM to answer: *"Are these photos showing the exact same physical infrastructure defect from a different angle or time?"*
*   **Resolution Logic:** If **Duplicate**, reject new issue creation, increment the existing issue's `support_count`, and award the citizen +5 "Issue Verification" points[cite: 4]. If **Unique**, proceed to standard department routing[cite: 2].

## 5. Hackathon Demonstration Script (Stage 3 Focus)
To secure maximum points for the "Working demonstration" (25 marks), the final presentation should flow continuously without slides[cite: 1]:
1.  **Open on Mobile View (Citizen):** Drop a pin, take a photo of an issue (e.g., garbage), toggle the "Anonymity Shield", and submit[cite: 4].
2.  **Highlight the AI Deduplication (Backend Log):** Submit a second photo of the *same* garbage pile from a different angle. Show the console log catching the spatial collision (Stage 1) and the VLM marking it as a duplicate (Stage 2).
3.  **Open Desktop View (Authority):** Show the issue automatically routed to the Sanitation Department's heatmap[cite: 2]. Click the pin to open the Right Drawer, verify the incremented support count, and click "Mark Resolved"[cite: 3].
4.  **Close Loop (Citizen):** Show the citizen's profile updating instantly with +20 Karma Points[cite: 4].