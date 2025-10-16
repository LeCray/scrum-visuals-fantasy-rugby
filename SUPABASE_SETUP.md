# Supabase Backend Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

## 2. Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the social_stats table
CREATE TABLE social_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  followers INTEGER NOT NULL,
  posts INTEGER NOT NULL,
  likes INTEGER NOT NULL,
  comments INTEGER NOT NULL,
  shares INTEGER NOT NULL,
  views INTEGER NOT NULL,
  engagement_rate FLOAT NOT NULL,
  top_post_url TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique combination of platform and date
  UNIQUE(platform, date)
);

-- Enable Row Level Security
ALTER TABLE social_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for API access
CREATE POLICY "Allow public read access" ON social_stats
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON social_stats
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON social_stats
  FOR UPDATE USING (true);

-- Create indexes for better performance
CREATE INDEX idx_social_stats_platform ON social_stats(platform);
CREATE INDEX idx_social_stats_date ON social_stats(date);
CREATE INDEX idx_social_stats_platform_date ON social_stats(platform, date);
```

## 3. Environment Variables

Create `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. API Endpoints

The following endpoints will be available:

### POST /api/update-social-stats
Insert new social media data

### GET /api/latest-social-stats  
Get most recent record for each platform

### GET /api/historical-social-stats
Get historical data grouped by time periods

## 5. Testing

Use the Supabase dashboard or API client to test the endpoints with sample data.
