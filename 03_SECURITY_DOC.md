# File 3: 03_SECURITY_DOC.md

# BirdEye - Security Design Document
**Focus:** Threat Model, Controls, DPDP Act Alignment, and Anonymity

## 1. Security Principles
*   **Tenant isolation:** Enforced at the data layer (PostgreSQL Row Level Security via Directus `tenant_id`), not the app layer. Never rely on frontend logic alone to prevent one ward from seeing another's data[cite: 5].
*   **Least privilege by role:** Enforced through Directus's role system - citizens, municipal officers, and super admin each get the minimum access their workflow needs[cite: 5].
*   **No hardcoded credentials:** No service URLs in the AI orchestration layer. This is an architectural rule for the LangChain/Directus integration and limits leak vectors in hackathon codebases pushed to public repos[cite: 5].

## 2. Authentication & Authorization
*   **User Auth:** Directus built-in auth (email/password), JWT session tokens[cite: 5].
*   **Session Handling:** Short-lived JWT + refresh token using standard Directus config[cite: 5].
*   **Service Tokens:** One service token per workstream (e.g., AI-civic pipeline), scoped strictly to the collections that service needs[cite: 5]. 

## 3. Data Protection & Civic Anonymity
### 3.1 The Santosh Pandit Anonymity Shield
Drawing from real-world impacts where civic activists (e.g., Santosh Pandit) face scrutiny from authorities for highlighting infrastructure failures[cite: 4], BirdEye implements a strict anonymity layer:
*   Citizens can toggle an "Anonymous Reporting" checkmark[cite: 4].
*   This protects citizen identity from municipal scrutiny while still recording ground-truth evidence[cite: 4].
*   Gamification points are still linked to the backend `citizen_karma` ledger, allowing users to earn recognition based on a choice of anonymity[cite: 4].
*   Citizen phone numbers/emails (if collected for the leaderboard) are never exposed in any public-facing leaderboard API response; the system shows display name and points only[cite: 5].

### 3.2 In Transit & At Rest
*   All traffic over HTTPS/TLS is non-negotiable, given photo uploads happen over the wire[cite: 5].
*   Photos are stored in object storage (or Directus local storage), not the database itself; the database holds only references/metadata[cite: 5].

## 4. API & AI Pipeline Security
*   **Prompt Injection Risk (LangChain):** User-supplied text (report descriptions) is treated as untrusted input. The routing logic is constrained to a fixed set of valid roles the model can select from, not free-text output executed as a command[cite: 5].
*   **VLM Verification Abuse:** A citizen could submit a manipulated photo to farm points. The VLM's verdict acts as a gate, combined with rate limiting and the spatial deduplication logic, so a false "verified" result cannot be spammed at scale[cite: 5].
*   **Input Validation:** Strict validation on report submissions prevents malformed geo-coordinates or script injection via report description fields[cite: 5].

## 5. DPDP Act Alignment (Compliance Positioning)
*   **Purpose Limitation:** Data is used only for the stated civic reporting purpose[cite: 5].
*   **No Biometric/Facial Recognition:** A deliberate product boundary; pedestrian faces are explicitly not tracked or extracted by the VLM[cite: 5].