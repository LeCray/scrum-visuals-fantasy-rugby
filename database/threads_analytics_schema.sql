-- Threads Analytics Schema
-- Captures comprehensive Threads analytics data

CREATE TABLE IF NOT EXISTS threads_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  snapshot_date DATE NOT NULL UNIQUE,
  
  -- Follower Metrics
  total_followers INTEGER NOT NULL,
  follower_growth INTEGER,
  
  -- View Metrics
  total_views INTEGER,
  
  -- View Sources (%)
  views_home_pct DECIMAL(5,2),
  views_instagram_pct DECIMAL(5,2),
  views_activity_tab_pct DECIMAL(5,2),
  views_search_pct DECIMAL(5,2),
  views_other_pct DECIMAL(5,2),
  
  -- Interaction Metrics
  total_interactions INTEGER,
  likes_count INTEGER,
  quotes_count INTEGER,
  replies_count INTEGER,
  reposts_count INTEGER,
  
  -- Engagement Rate (calculated)
  engagement_rate DECIMAL(5,2),
  
  -- Additional Notes
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_threads_analytics_date ON threads_analytics(snapshot_date DESC);

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_threads_analytics_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_threads_analytics_timestamp ON threads_analytics;
CREATE TRIGGER update_threads_analytics_timestamp
  BEFORE UPDATE ON threads_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_threads_analytics_timestamp();

-- Comments for documentation
COMMENT ON TABLE threads_analytics IS 'Stores Threads analytics data collected manually from Threads Insights';
COMMENT ON COLUMN threads_analytics.snapshot_date IS 'Date when the analytics snapshot was taken';
COMMENT ON COLUMN threads_analytics.total_followers IS 'Total number of Threads followers';
COMMENT ON COLUMN threads_analytics.total_views IS 'Total thread views';
COMMENT ON COLUMN threads_analytics.likes_count IS 'Total likes on threads';
COMMENT ON COLUMN threads_analytics.quotes_count IS 'Total quote threads';
COMMENT ON COLUMN threads_analytics.replies_count IS 'Total replies to threads';
COMMENT ON COLUMN threads_analytics.reposts_count IS 'Total reposts of threads';
COMMENT ON COLUMN threads_analytics.views_home_pct IS 'Percentage of views from Home feed';
COMMENT ON COLUMN threads_analytics.views_instagram_pct IS 'Percentage of views from Instagram';
COMMENT ON COLUMN threads_analytics.views_activity_tab_pct IS 'Percentage of views from Activity Tab';
COMMENT ON COLUMN threads_analytics.views_search_pct IS 'Percentage of views from Search';
COMMENT ON COLUMN threads_analytics.views_other_pct IS 'Percentage of views from Other sources';
COMMENT ON COLUMN threads_analytics.engagement_rate IS 'Calculated as (total_interactions / total_followers) * 100';








