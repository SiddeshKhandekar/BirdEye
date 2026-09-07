CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Tenants Collection (Municipal Wards)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    boundary GEOMETRY(Polygon, 4326)
);

-- 2. Issue Clusters (For Spatial Aggregation)
CREATE TABLE issue_clusters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    centroid GEOMETRY(Point, 4326) NOT NULL,
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
    location GEOMETRY(Point, 4326) NOT NULL,
    address_text TEXT NOT NULL,
    photo_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
    reported_by UUID,
    is_anonymous BOOLEAN DEFAULT FALSE,
    support_count INT DEFAULT 1,
    assigned_department_role VARCHAR(50),
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

CREATE INDEX idx_issues_location ON issues USING GIST(location);
CREATE INDEX idx_clusters_centroid ON issue_clusters USING GIST(centroid);