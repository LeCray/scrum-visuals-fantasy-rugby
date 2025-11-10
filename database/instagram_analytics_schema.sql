-- Instagram Analytics Schema
-- Platform-specific detailed metrics from Instagram Insights
-- Manually entered twice weekly

CREATE TABLE IF NOT EXISTS instagram_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  snapshot_date DATE NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Profile Activity
  profile_activity_score INTEGER,
  profile_visits INTEGER,
  external_link_taps INTEGER,
  
  -- Followers
  followers_count INTEGER NOT NULL,
  most_active_day TEXT, -- 'M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'
  most_active_hour TEXT, -- '12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'
  most_active_hour_count INTEGER,
  
  -- Views & Reach
  total_views INTEGER,
  accounts_reached INTEGER,
  followers_view_pct DECIMAL(5,2), -- e.g., 36.7
  non_followers_view_pct DECIMAL(5,2), -- e.g., 63.3
  
  -- Views by Content Type
  posts_view_pct DECIMAL(5,2),
  reels_view_pct DECIMAL(5,2),
  stories_view_pct DECIMAL(5,2),
  
  -- Interactions
  interactions_total INTEGER,
  followers_interaction_pct DECIMAL(5,2),
  non_followers_interaction_pct DECIMAL(5,2),
  
  -- Interactions by Content Type
  posts_interaction_pct DECIMAL(5,2),
  reels_interaction_pct DECIMAL(5,2),
  stories_interaction_pct DECIMAL(5,2),
  
  -- Notes
  notes TEXT
);

-- Content Performance Tracker (all platforms)
CREATE TABLE IF NOT EXISTS content_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL, -- 'instagram', 'tiktok', 'twitter', etc.
  content_id TEXT NOT NULL, -- unique identifier for this content
  
  -- Content metadata
  post_url TEXT,
  post_date DATE NOT NULL,
  content_type TEXT NOT NULL, -- 'post', 'reel', 'story', 'video', 'tweet', etc.
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  
  -- Snapshot info
  snapshot_date DATE NOT NULL,
  
  -- Metrics (platform-specific, nullable)
  views INTEGER,
  likes INTEGER,
  comments INTEGER,
  saves INTEGER,
  shares INTEGER,
  retweets INTEGER, -- Twitter
  quote_tweets INTEGER, -- Twitter
  plays INTEGER, -- TikTok/YouTube
  watch_time_minutes INTEGER, -- YouTube
  
  -- Calculated total interactions
  total_interactions INTEGER GENERATED ALWAYS AS (
    COALESCE(likes, 0) + 
    COALESCE(comments, 0) + 
    COALESCE(saves, 0) + 
    COALESCE(shares, 0) + 
    COALESCE(retweets, 0) + 
    COALESCE(quote_tweets, 0)
  ) STORED,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint: same content measured on same date
  UNIQUE(platform, content_id, snapshot_date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_instagram_date ON instagram_analytics(snapshot_date DESC);
CREATE INDEX IF NOT EXISTS idx_content_platform_date ON content_performance(platform, snapshot_date DESC);
CREATE INDEX IF NOT EXISTS idx_content_platform_id ON content_performance(platform, content_id);
CREATE INDEX IF NOT EXISTS idx_content_type ON content_performance(platform, content_type);

-- Comments
COMMENT ON TABLE instagram_analytics IS 'Detailed Instagram analytics metrics, manually entered twice weekly';
COMMENT ON TABLE content_performance IS 'Individual content performance tracking across all platforms over time';








