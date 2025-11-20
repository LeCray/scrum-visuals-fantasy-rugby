-- TikTok Analytics - CLEAN INSTALL
-- This will drop old tables and create new ones fresh

-- ============================================================================
-- STEP 1: DROP OLD TABLES & POLICIES
-- ============================================================================

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Allow authenticated read" ON tiktok_overview;
DROP POLICY IF EXISTS "Allow authenticated insert" ON tiktok_overview;
DROP POLICY IF EXISTS "Allow authenticated update" ON tiktok_overview;
DROP POLICY IF EXISTS "Allow authenticated delete" ON tiktok_overview;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_overview;

DROP POLICY IF EXISTS "Allow authenticated read" ON tiktok_content;
DROP POLICY IF EXISTS "Allow authenticated insert" ON tiktok_content;
DROP POLICY IF EXISTS "Allow authenticated update" ON tiktok_content;
DROP POLICY IF EXISTS "Allow authenticated delete" ON tiktok_content;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_content;

DROP POLICY IF EXISTS "Allow authenticated read" ON tiktok_viewers;
DROP POLICY IF EXISTS "Allow authenticated insert" ON tiktok_viewers;
DROP POLICY IF EXISTS "Allow authenticated update" ON tiktok_viewers;
DROP POLICY IF EXISTS "Allow authenticated delete" ON tiktok_viewers;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_viewers;

DROP POLICY IF EXISTS "Allow authenticated read" ON tiktok_followers;
DROP POLICY IF EXISTS "Allow authenticated insert" ON tiktok_followers;
DROP POLICY IF EXISTS "Allow authenticated update" ON tiktok_followers;
DROP POLICY IF EXISTS "Allow authenticated delete" ON tiktok_followers;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_followers;

DROP POLICY IF EXISTS "Allow authenticated read" ON tiktok_demographics_gender;
DROP POLICY IF EXISTS "Allow authenticated insert" ON tiktok_demographics_gender;
DROP POLICY IF EXISTS "Allow authenticated update" ON tiktok_demographics_gender;
DROP POLICY IF EXISTS "Allow authenticated delete" ON tiktok_demographics_gender;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_demographics_gender;

DROP POLICY IF EXISTS "Allow authenticated read" ON tiktok_demographics_territory;
DROP POLICY IF EXISTS "Allow authenticated insert" ON tiktok_demographics_territory;
DROP POLICY IF EXISTS "Allow authenticated update" ON tiktok_demographics_territory;
DROP POLICY IF EXISTS "Allow authenticated delete" ON tiktok_demographics_territory;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_demographics_territory;

DROP POLICY IF EXISTS "Allow authenticated read" ON tiktok_active_hours;
DROP POLICY IF EXISTS "Allow authenticated insert" ON tiktok_active_hours;
DROP POLICY IF EXISTS "Allow authenticated update" ON tiktok_active_hours;
DROP POLICY IF EXISTS "Allow authenticated delete" ON tiktok_active_hours;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tiktok_active_hours;

-- Drop old single table if it exists
DROP TABLE IF EXISTS tiktok_analytics CASCADE;

-- Drop new tables
DROP TABLE IF EXISTS tiktok_overview CASCADE;
DROP TABLE IF EXISTS tiktok_content CASCADE;
DROP TABLE IF EXISTS tiktok_viewers CASCADE;
DROP TABLE IF EXISTS tiktok_followers CASCADE;
DROP TABLE IF EXISTS tiktok_demographics_gender CASCADE;
DROP TABLE IF EXISTS tiktok_demographics_territory CASCADE;
DROP TABLE IF EXISTS tiktok_active_hours CASCADE;

-- ============================================================================
-- STEP 2: CREATE FRESH TABLES
-- ============================================================================

-- Table 1: Overview (Daily Totals)
CREATE TABLE tiktok_overview (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL UNIQUE,
    video_views INTEGER DEFAULT 0,
    profile_views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 2: Content (Individual Videos)
CREATE TABLE tiktok_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    video_title TEXT NOT NULL,
    video_link TEXT,
    post_date DATE,
    post_time TIME,
    snapshot_date DATE NOT NULL,
    total_likes INTEGER DEFAULT 0,
    total_comments INTEGER DEFAULT 0,
    total_shares INTEGER DEFAULT 0,
    total_views INTEGER DEFAULT 0,
    total_engagement INTEGER GENERATED ALWAYS AS (total_likes + total_comments + total_shares) STORED,
    engagement_rate DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN total_views > 0 THEN (total_likes + total_comments + total_shares)::DECIMAL / total_views * 100 
            ELSE 0 
        END
    ) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(video_title, snapshot_date)
);

-- Table 3: Viewers (New vs Returning)
CREATE TABLE tiktok_viewers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL UNIQUE,
    total_viewers INTEGER DEFAULT 0,
    new_viewers INTEGER DEFAULT 0,
    returning_viewers INTEGER DEFAULT 0,
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 4: Followers (Growth Tracking)
CREATE TABLE tiktok_followers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL UNIQUE,
    total_followers INTEGER NOT NULL,
    followers_gained INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 5: Gender Demographics
CREATE TABLE tiktok_demographics_gender (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL,
    gender VARCHAR(50) NOT NULL,
    distribution_pct DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(snapshot_date, gender)
);

-- Table 6: Territory Demographics
CREATE TABLE tiktok_demographics_territory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL,
    territory VARCHAR(100) NOT NULL,
    distribution_pct DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(snapshot_date, territory)
);

-- Table 7: Active Hours
CREATE TABLE tiktok_active_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_date DATE NOT NULL,
    hour INTEGER NOT NULL CHECK (hour >= 0 AND hour <= 23),
    active_followers INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(snapshot_date, hour)
);

-- ============================================================================
-- STEP 3: ENABLE RLS & CREATE POLICIES
-- ============================================================================

ALTER TABLE tiktok_overview ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_viewers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_demographics_gender ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_demographics_territory ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_active_hours ENABLE ROW LEVEL SECURITY;

-- Single policy for all operations (authenticated users only)
CREATE POLICY "Allow all for authenticated users" ON tiktok_overview FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON tiktok_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON tiktok_viewers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON tiktok_followers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON tiktok_demographics_gender FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON tiktok_demographics_territory FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON tiktok_active_hours FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================================
-- STEP 4: CREATE INDEXES
-- ============================================================================

CREATE INDEX idx_tiktok_overview_date ON tiktok_overview(snapshot_date DESC);
CREATE INDEX idx_tiktok_content_post_date ON tiktok_content(post_date DESC);
CREATE INDEX idx_tiktok_content_snapshot ON tiktok_content(snapshot_date DESC);
CREATE INDEX idx_tiktok_content_views ON tiktok_content(total_views DESC);
CREATE INDEX idx_tiktok_viewers_date ON tiktok_viewers(snapshot_date DESC);
CREATE INDEX idx_tiktok_followers_date ON tiktok_followers(snapshot_date DESC);
CREATE INDEX idx_tiktok_gender_date ON tiktok_demographics_gender(snapshot_date DESC);
CREATE INDEX idx_tiktok_territory_date ON tiktok_demographics_territory(snapshot_date DESC);
CREATE INDEX idx_tiktok_hours_date ON tiktok_active_hours(snapshot_date DESC);

-- ============================================================================
-- DONE! Tables created successfully.
-- ============================================================================











