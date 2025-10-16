import { createClient } from '@supabase/supabase-js'

// Supabase configuration for Analytics Hub
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug: Check environment variables
console.log('🔍 Supabase Debug Info:')
console.log('URL exists:', !!supabaseUrl)
console.log('Key exists:', !!supabaseAnonKey)
console.log('URL value:', supabaseUrl)

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables not set. Analytics Hub will use mock data.')
  console.warn('Make sure .env.local file exists and dev server was restarted.')
} else {
  console.log('✅ Supabase credentials loaded successfully!')
}

// Create Supabase client (will be null if env vars not set)
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

console.log('Supabase client created:', !!supabase)

// Export as default and named export
export default supabase
export { supabase }

// Types for our analytics data - matching Supabase schema
export interface SocialStats {
  id: string
  platform: string
  followers: number
  posts: number
  likes: number
  comments: number
  shares: number
  views: number
  engagement_rate: number
  top_post_url?: string
  date: string
  created_at: string
}

// Input type for creating new stats
export interface CreateSocialStats {
  platform: string
  followers: number
  posts: number
  likes: number
  comments: number
  shares: number
  views: number
  engagement_rate: number
  top_post_url?: string
  date: string
}

// Mock data for development/testing - matching new schema
export const mockSocialStats: SocialStats[] = [
  {
    id: '1',
    platform: 'instagram',
    followers: 2543,
    posts: 3,
    likes: 150,
    comments: 25,
    shares: 6,
    views: 3200,
    engagement_rate: 4.2,
    top_post_url: 'https://www.instagram.com/p/abc123/',
    date: '2025-01-15',
    created_at: '2025-01-15T10:00:00Z'
  },
  {
    id: '2',
    platform: 'tiktok',
    followers: 1892,
    posts: 2,
    likes: 890,
    comments: 45,
    shares: 12,
    views: 12500,
    engagement_rate: 8.7,
    top_post_url: 'https://www.tiktok.com/@scrummy_hub/video/xyz789',
    date: '2025-01-15',
    created_at: '2025-01-15T10:00:00Z'
  },
  {
    id: '3',
    platform: 'facebook',
    followers: 1205,
    posts: 1,
    likes: 89,
    comments: 12,
    shares: 8,
    views: 2100,
    engagement_rate: 3.1,
    top_post_url: 'https://www.facebook.com/scrummy/posts/def456',
    date: '2025-01-15',
    created_at: '2025-01-15T10:00:00Z'
  },
  {
    id: '4',
    platform: 'twitter',
    followers: 987,
    posts: 5,
    likes: 67,
    comments: 15,
    shares: 23,
    views: 1800,
    engagement_rate: 2.8,
    top_post_url: 'https://twitter.com/scrummyapp_/status/ghi789',
    date: '2025-01-15',
    created_at: '2025-01-15T10:00:00Z'
  },
  {
    id: '5',
    platform: 'youtube',
    followers: 456,
    posts: 1,
    likes: 234,
    comments: 18,
    shares: 5,
    views: 8900,
    engagement_rate: 6.4,
    top_post_url: 'https://www.youtube.com/watch?v=jkl012',
    date: '2025-01-15',
    created_at: '2025-01-15T10:00:00Z'
  }
]

// API functions matching your exact requirements

// POST /api/update-social-stats
export const updateSocialStats = async (statsData: CreateSocialStats): Promise<boolean> => {
  if (supabase) {
    const { error } = await supabase
      .from('social_stats')
      .upsert([statsData], { 
        onConflict: 'platform,date',
        ignoreDuplicates: false 
      })
    
    if (error) {
      console.error('Error updating social stats:', error)
      return false
    }
    return true
  }
  return false
}

// GET /api/latest-social-stats - Returns most recent record for each platform
export const getLatestSocialStats = async (): Promise<SocialStats[]> => {
  if (!supabase) {
    console.log('⚠️ Supabase not connected - returning empty array')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('social_stats')
      .select('*')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('❌ Error fetching latest social stats:', error)
      return []
    }
    
    if (!data || data.length === 0) {
      console.log('📭 No data in database yet')
      return []
    }
    
    // Group by platform and get the latest for each
    const latestByPlatform = new Map<string, SocialStats>()
    data.forEach(stat => {
      if (!latestByPlatform.has(stat.platform)) {
        latestByPlatform.set(stat.platform, stat)
      }
    })
    
    const result = Array.from(latestByPlatform.values())
    console.log(`✅ Fetched ${result.length} platforms from Supabase`)
    return result
  } catch (err) {
    console.error('❌ Exception fetching stats:', err)
    return []
  }
}

// GET /api/historical-social-stats - Returns data grouped by time periods
export const getHistoricalSocialStats = async (days: number = 30, groupBy: 'day' | 'week' | 'month' = 'day'): Promise<SocialStats[]> => {
  if (!supabase) {
    console.log('⚠️ Supabase not connected - returning empty array')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('social_stats')
      .select('*')
      .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('date', { ascending: false })
    
    if (error) {
      console.error('Error fetching historical stats:', error)
      return []
    }
    
    if (!data || data.length === 0) {
      console.log('📭 No historical data in database yet')
      return []
    }
    
    return data
  } catch (err) {
    console.error('❌ Exception fetching historical stats:', err)
    return []
  }
}

// Helper function to create social stats data
export const createSocialStatsData = (data: {
  platform: string
  followers: number
  posts: number
  likes: number
  comments: number
  shares: number
  views: number
  engagement_rate: number
  top_post_url?: string
  date?: string
}): CreateSocialStats => {
  return {
    platform: data.platform,
    followers: data.followers,
    posts: data.posts,
    likes: data.likes,
    comments: data.comments,
    shares: data.shares,
    views: data.views,
    engagement_rate: data.engagement_rate,
    top_post_url: data.top_post_url,
    date: data.date || new Date().toISOString().split('T')[0]
  }
}
