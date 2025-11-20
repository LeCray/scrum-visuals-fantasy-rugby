-- TikTok Analytics Schema
-- Tracks TikTok performance metrics over time

CREATE TABLE IF NOT EXISTS tiktok_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Temporal
    snapshot_date DATE NOT NULL UNIQUE,
    
    -- Views Metrics
    video_views INTEGER DEFAULT 0,
    profile_views INTEGER DEFAULT 0,
    
    -- Engagement Metrics
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    
    -- Calculated Metrics
    total_engagement INTEGER GENERATED ALWAYS AS (likes + comments + shares) STORED,
    engagement_rate DECIMAL(5,2), -- Manual calculation based on followers if needed
    
    -- Metadata
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tiktok_analytics_date ON tiktok_analytics(snapshot_date DESC);
CREATE INDEX IF NOT EXISTS idx_tiktok_analytics_created ON tiktok_analytics(created_at DESC);

-- RLS Policies (adjust based on your auth setup)
ALTER TABLE tiktok_analytics ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read
CREATE POLICY "Allow authenticated read access" ON tiktok_analytics
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert access" ON tiktok_analytics
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update access" ON tiktok_analytics
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete access" ON tiktok_analytics
    FOR DELETE
    TO authenticated
    USING (true);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_tiktok_analytics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tiktok_analytics_updated_at
    BEFORE UPDATE ON tiktok_analytics
    FOR EACH ROW
    EXECUTE FUNCTION update_tiktok_analytics_updated_at();

-- Comments
COMMENT ON TABLE tiktok_analytics IS 'Stores TikTok performance metrics over time';
COMMENT ON COLUMN tiktok_analytics.snapshot_date IS 'Date of the analytics snapshot';
COMMENT ON COLUMN tiktok_analytics.video_views IS 'Total video views for the period';
COMMENT ON COLUMN tiktok_analytics.profile_views IS 'Total profile views for the period';
COMMENT ON COLUMN tiktok_analytics.likes IS 'Total likes received';
COMMENT ON COLUMN tiktok_analytics.comments IS 'Total comments received';
COMMENT ON COLUMN tiktok_analytics.shares IS 'Total shares/reposts';
COMMENT ON COLUMN tiktok_analytics.total_engagement IS 'Auto-calculated: likes + comments + shares';
COMMENT ON COLUMN tiktok_analytics.engagement_rate IS 'Engagement rate percentage (calculated based on followers)';











