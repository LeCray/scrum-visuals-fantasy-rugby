-- TikTok Analytics Schema V2
-- Enhanced schema to handle all 4-7 CSV exports from TikTok

-- ============================================================================
-- TABLE 1: Overview Metrics (Daily Totals)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tiktok_overview (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL UNIQUE,
    
    -- Core Metrics
    video_views INTEGER DEFAULT 0,
    profile_views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    
    -- Calculated
    total_engagement INTEGER GENERATED ALWAYS AS (likes + comments + shares) STORED,
    
    -- Metadata
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tiktok_overview_date ON tiktok_overview(snapshot_date DESC);

-- ============================================================================
-- TABLE 2: Content Performance (Individual Videos)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tiktok_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Video Identification
    video_title TEXT NOT NULL,
    video_link TEXT,
    post_date DATE,
    post_time TIME,
    snapshot_date DATE NOT NULL, -- When this data was collected
    
    -- Performance Metrics
    total_likes INTEGER DEFAULT 0,
    total_comments INTEGER DEFAULT 0,
    total_shares INTEGER DEFAULT 0,
    total_views INTEGER DEFAULT 0,
    
    -- Calculated
    total_engagement INTEGER GENERATED ALWAYS AS (total_likes + total_comments + total_shares) STORED,
    engagement_rate DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN total_views > 0 THEN (total_likes + total_comments + total_shares)::DECIMAL / total_views * 100 
            ELSE 0 
        END
    ) STORED,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint: same video on same snapshot date
    UNIQUE(video_title, snapshot_date)
);

CREATE INDEX IF NOT EXISTS idx_tiktok_content_post_date ON tiktok_content(post_date DESC);
CREATE INDEX IF NOT EXISTS idx_tiktok_content_snapshot ON tiktok_content(snapshot_date DESC);
CREATE INDEX IF NOT EXISTS idx_tiktok_content_views ON tiktok_content(total_views DESC);
CREATE INDEX IF NOT EXISTS idx_tiktok_content_engagement ON tiktok_content(total_engagement DESC);

-- ============================================================================
-- TABLE 3: Viewer Analytics (New vs Returning)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tiktok_viewers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL UNIQUE,
    
    -- Viewer Metrics
    total_viewers INTEGER DEFAULT 0,
    new_viewers INTEGER DEFAULT 0,
    returning_viewers INTEGER DEFAULT 0,
    
    -- Calculated Percentages
    new_viewers_pct DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN total_viewers > 0 THEN (new_viewers::DECIMAL / total_viewers * 100) 
            ELSE 0 
        END
    ) STORED,
    returning_viewers_pct DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN total_viewers > 0 THEN (returning_viewers::DECIMAL / total_viewers * 100) 
            ELSE 0 
        END
    ) STORED,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tiktok_viewers_date ON tiktok_viewers(snapshot_date DESC);

-- ============================================================================
-- TABLE 4: Follower Growth (Daily)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tiktok_followers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL UNIQUE,
    
    -- Follower Metrics
    total_followers INTEGER NOT NULL,
    followers_gained INTEGER DEFAULT 0, -- "Difference in followers from previous day"
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tiktok_followers_date ON tiktok_followers(snapshot_date DESC);

-- ============================================================================
-- TABLE 5: Follower Demographics - Gender
-- ============================================================================
CREATE TABLE IF NOT EXISTS tiktok_demographics_gender (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL,
    
    gender VARCHAR(50) NOT NULL,
    distribution_pct DECIMAL(5,2),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(snapshot_date, gender)
);

CREATE INDEX IF NOT EXISTS idx_tiktok_gender_date ON tiktok_demographics_gender(snapshot_date DESC);

-- ============================================================================
-- TABLE 6: Follower Demographics - Territory/Location
-- ============================================================================
CREATE TABLE IF NOT EXISTS tiktok_demographics_territory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL,
    
    territory VARCHAR(100) NOT NULL,
    distribution_pct DECIMAL(5,2),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(snapshot_date, territory)
);

CREATE INDEX IF NOT EXISTS idx_tiktok_territory_date ON tiktok_demographics_territory(snapshot_date DESC);

-- ============================================================================
-- TABLE 7: Active Followers by Hour
-- ============================================================================
CREATE TABLE IF NOT EXISTS tiktok_active_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL,
    
    hour INTEGER NOT NULL CHECK (hour >= 0 AND hour <= 23),
    active_followers INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(snapshot_date, hour)
);

CREATE INDEX IF NOT EXISTS idx_tiktok_hours_date ON tiktok_active_hours(snapshot_date DESC);

-- ============================================================================
-- RLS POLICIES (Apply to all tables)
-- ============================================================================

-- Overview
ALTER TABLE tiktok_overview ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read" ON tiktok_overview FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON tiktok_overview FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON tiktok_overview FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON tiktok_overview FOR DELETE TO authenticated USING (true);

-- Content
ALTER TABLE tiktok_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read" ON tiktok_content FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON tiktok_content FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON tiktok_content FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON tiktok_content FOR DELETE TO authenticated USING (true);

-- Viewers
ALTER TABLE tiktok_viewers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read" ON tiktok_viewers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON tiktok_viewers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON tiktok_viewers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON tiktok_viewers FOR DELETE TO authenticated USING (true);

-- Followers
ALTER TABLE tiktok_followers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read" ON tiktok_followers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON tiktok_followers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON tiktok_followers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON tiktok_followers FOR DELETE TO authenticated USING (true);

-- Gender Demographics
ALTER TABLE tiktok_demographics_gender ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read" ON tiktok_demographics_gender FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON tiktok_demographics_gender FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON tiktok_demographics_gender FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON tiktok_demographics_gender FOR DELETE TO authenticated USING (true);

-- Territory Demographics
ALTER TABLE tiktok_demographics_territory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read" ON tiktok_demographics_territory FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON tiktok_demographics_territory FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON tiktok_demographics_territory FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON tiktok_demographics_territory FOR DELETE TO authenticated USING (true);

-- Active Hours
ALTER TABLE tiktok_active_hours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read" ON tiktok_active_hours FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON tiktok_active_hours FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON tiktok_active_hours FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON tiktok_active_hours FOR DELETE TO authenticated USING (true);

-- ============================================================================
-- TRIGGERS (Auto-update timestamps)
-- ============================================================================

-- Overview
CREATE OR REPLACE FUNCTION update_tiktok_overview_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tiktok_overview
    BEFORE UPDATE ON tiktok_overview
    FOR EACH ROW
    EXECUTE FUNCTION update_tiktok_overview_updated_at();

-- Content
CREATE OR REPLACE FUNCTION update_tiktok_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tiktok_content
    BEFORE UPDATE ON tiktok_content
    FOR EACH ROW
    EXECUTE FUNCTION update_tiktok_content_updated_at();

-- Viewers
CREATE OR REPLACE FUNCTION update_tiktok_viewers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tiktok_viewers
    BEFORE UPDATE ON tiktok_viewers
    FOR EACH ROW
    EXECUTE FUNCTION update_tiktok_viewers_updated_at();

-- Followers
CREATE OR REPLACE FUNCTION update_tiktok_followers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tiktok_followers
    BEFORE UPDATE ON tiktok_followers
    FOR EACH ROW
    EXECUTE FUNCTION update_tiktok_followers_updated_at();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE tiktok_overview IS 'Daily overview metrics from TikTok (CSV 1)';
COMMENT ON TABLE tiktok_content IS 'Individual video performance tracking (CSV 2)';
COMMENT ON TABLE tiktok_viewers IS 'Viewer composition - new vs returning (CSV 3)';
COMMENT ON TABLE tiktok_followers IS 'Daily follower growth tracking (CSV 4)';
COMMENT ON TABLE tiktok_demographics_gender IS 'Follower gender distribution (CSV 5)';
COMMENT ON TABLE tiktok_demographics_territory IS 'Follower geographic distribution (CSV 6)';
COMMENT ON TABLE tiktok_active_hours IS 'When followers are most active by hour (CSV 7)';








