-- Facebook Analytics Schema
-- Captures comprehensive Facebook page analytics data

CREATE TABLE IF NOT EXISTS facebook_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  snapshot_date DATE NOT NULL UNIQUE,
  
  -- Follower Metrics
  total_followers INTEGER NOT NULL,
  net_follows INTEGER,
  unfollows INTEGER,
  follows_from_posts_pct DECIMAL(5,2),
  follows_from_videos_pct DECIMAL(5,2),
  
  -- Demographics (Top 3 for each)
  -- Age & Gender
  top_age_gender_1 VARCHAR(50),
  top_age_gender_1_pct DECIMAL(5,2),
  top_age_gender_2 VARCHAR(50),
  top_age_gender_2_pct DECIMAL(5,2),
  top_age_gender_3 VARCHAR(50),
  top_age_gender_3_pct DECIMAL(5,2),
  
  -- Countries
  top_country_1 VARCHAR(100),
  top_country_1_pct DECIMAL(5,2),
  top_country_2 VARCHAR(100),
  top_country_2_pct DECIMAL(5,2),
  top_country_3 VARCHAR(100),
  top_country_3_pct DECIMAL(5,2),
  
  -- Cities
  top_city_1 VARCHAR(100),
  top_city_1_pct DECIMAL(5,2),
  top_city_2 VARCHAR(100),
  top_city_2_pct DECIMAL(5,2),
  top_city_3 VARCHAR(100),
  top_city_3_pct DECIMAL(5,2),
  
  -- Views Metrics
  total_views INTEGER,
  views_3_second INTEGER,
  views_1_minute INTEGER,
  
  -- Views by Content Type
  views_multi_photo_pct DECIMAL(5,2),
  views_video_pct DECIMAL(5,2),
  views_multi_media_pct DECIMAL(5,2),
  views_photo_pct DECIMAL(5,2),
  views_reel_pct DECIMAL(5,2),
  
  -- Views by Audience Type
  views_followers_pct DECIMAL(5,2),
  views_non_followers_pct DECIMAL(5,2),
  
  -- Interaction Metrics
  total_interactions INTEGER,
  reactions_count INTEGER,
  comments_count INTEGER,
  shares_count INTEGER,
  
  -- Interactions by Type (if available)
  interactions_by_reaction_pct DECIMAL(5,2),
  interactions_by_comment_pct DECIMAL(5,2),
  interactions_by_share_pct DECIMAL(5,2),
  
  -- Interactions by Content Type (if available)
  interactions_posts_pct DECIMAL(5,2),
  interactions_videos_pct DECIMAL(5,2),
  interactions_photos_pct DECIMAL(5,2),
  interactions_reels_pct DECIMAL(5,2),
  
  -- Interactions by Audience
  interactions_followers_pct DECIMAL(5,2),
  interactions_non_followers_pct DECIMAL(5,2),
  
  -- Engagement Rate (calculated)
  engagement_rate DECIMAL(5,2),
  
  -- Additional Notes
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_facebook_analytics_date ON facebook_analytics(snapshot_date DESC);

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_facebook_analytics_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_facebook_analytics_timestamp ON facebook_analytics;
CREATE TRIGGER update_facebook_analytics_timestamp
  BEFORE UPDATE ON facebook_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_facebook_analytics_timestamp();

-- Comments for documentation
COMMENT ON TABLE facebook_analytics IS 'Stores Facebook page analytics data collected manually from Facebook Insights';
COMMENT ON COLUMN facebook_analytics.snapshot_date IS 'Date when the analytics snapshot was taken';
COMMENT ON COLUMN facebook_analytics.total_followers IS 'Total number of page followers';
COMMENT ON COLUMN facebook_analytics.net_follows IS 'Net new follows (follows minus unfollows)';
COMMENT ON COLUMN facebook_analytics.engagement_rate IS 'Calculated as (total_interactions / total_followers) * 100';











