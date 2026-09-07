-- ==========================================
-- BirdEye Database Schema
-- Run this in Supabase SQL Editor
-- ==========================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tenants Collection (Municipal Wards)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    boundary JSONB  -- GeoJSON polygon (works without PostGIS extension)
);

-- 2. Issue Clusters (For Spatial Aggregation)
CREATE TABLE issue_clusters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    centroid_lat DOUBLE PRECISION NOT NULL,
    centroid_lng DOUBLE PRECISION NOT NULL,
    category VARCHAR(30) NOT NULL,
    total_reports INT DEFAULT 1,
    status VARCHAR(20) DEFAULT 'reported',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Civic Issues Collection
CREATE TABLE issues (
    id VARCHAR(30) PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    cluster_id UUID REFERENCES issue_clusters(id) ON DELETE SET NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    category VARCHAR(30) NOT NULL CHECK (category IN ('pothole', 'garbage', 'streetlights', 'water', 'other')),
    status VARCHAR(20) NOT NULL DEFAULT 'reported',
    severity VARCHAR(15) NOT NULL DEFAULT 'medium',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    address_text TEXT NOT NULL,
    photo_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
    reported_by UUID,
    is_anonymous BOOLEAN DEFAULT FALSE,
    support_count INT DEFAULT 1,
    assigned_department_role VARCHAR(50),
    ai_confidence_score FLOAT,
    ai_verification_reason TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Citizen Gamification Ledger
CREATE TABLE citizen_karma (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    points INT DEFAULT 0,
    valid_reports_count INT DEFAULT 0,
    verifications_count INT DEFAULT 0
);

-- Indexes for spatial-like queries (sort/filter by lat/lng)
CREATE INDEX idx_issues_lat ON issues (latitude);
CREATE INDEX idx_issues_lng ON issues (longitude);
CREATE INDEX idx_issues_category ON issues (category);
CREATE INDEX idx_issues_status ON issues (status);

-- ==========================================
-- Row Level Security (RLS)
-- ==========================================

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE issue_clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizen_karma ENABLE ROW LEVEL SECURITY;

-- Public read access (map & leaderboard)
CREATE POLICY "Public read tenants" ON tenants FOR SELECT USING (true);
CREATE POLICY "Public read clusters" ON issue_clusters FOR SELECT USING (true);
CREATE POLICY "Public read issues" ON issues FOR SELECT USING (true);
CREATE POLICY "Public read karma" ON citizen_karma FOR SELECT USING (true);

-- Allow anyone to insert issues (citizen reports)
CREATE POLICY "Anyone can insert issues" ON issues FOR INSERT WITH CHECK (true);

-- ==========================================
-- Supabase Storage Bucket (run separately)
-- ==========================================
-- Go to Supabase Dashboard → Storage → Create Bucket:
--   Name: issue-photos
--   Public: Yes (so photos are accessible via URL)