"""
Pydantic Request/Response Schemas
===================================
Shared data models for the AI service API.
"""

from pydantic import BaseModel, Field
from typing import Optional, List


class IssuePayload(BaseModel):
    """Incoming issue data from Directus webhook."""
    issue_id: str
    title: str
    description: Optional[str] = None
    category: str = Field(..., pattern="^(pothole|garbage|streetlights|water|other)$")
    latitude: float
    longitude: float
    photo_urls: List[str]
    reported_by: Optional[str] = None
    is_anonymous: bool = False


class VerificationResult(BaseModel):
    """Response from the VLM verification endpoint."""
    verified: bool
    confidence: float = Field(ge=0.0, le=1.0)
    reason: str


class DeduplicationResult(BaseModel):
    """Response from the deduplication endpoint."""
    is_duplicate: bool
    existing_issue_id: Optional[str] = None
    reason: str


class RoutingResult(BaseModel):
    """Response from the department routing endpoint."""
    department_role: Optional[str] = None
    reason: str
