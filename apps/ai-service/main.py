"""
BirdEye AI Microservice
=======================
FastAPI server handling VLM verification, spatial deduplication,
and LangChain-based department routing.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="BirdEye AI Service",
    description="AI pipeline for civic issue verification, deduplication & routing",
    version="0.1.0",
)

# CORS — allow Directus and Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Service health endpoint for Docker healthcheck."""
    return {"status": "ok", "service": "birdeye-ai"}


@app.post("/verify")
async def verify_issue(payload: dict):
    """
    Endpoint: VLM Photo Authenticity Verification.
    Called via Directus webhook on new issue creation.
    Returns: {verified: bool, confidence: float, reason: str}
    """
    # TODO: Module 3 — Wire up VLM verifier agent
    return {
        "verified": False,
        "confidence": 0.0,
        "reason": "Module 3: VLM verifier not yet implemented",
    }


@app.post("/deduplicate")
async def deduplicate_issue(payload: dict):
    """
    Endpoint: Spatial + Semantic Deduplication.
    Stage 1: PostGIS ST_DWithin (50m radius)
    Stage 2: VLM semantic comparison
    """
    # TODO: Module 3 — Wire up deduplication engine
    return {
        "is_duplicate": False,
        "existing_issue_id": None,
        "reason": "Module 3: Deduplication engine not yet implemented",
    }


@app.post("/route")
async def route_issue(payload: dict):
    """
    Endpoint: LangChain Department Routing.
    Selects the correct municipal Directus Role ID.
    """
    # TODO: Module 3 — Wire up LangChain router agent
    return {
        "department_role": None,
        "reason": "Module 3: LangChain router not yet implemented",
    }
