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

// New interface for weekly aggregated data
export interface WeeklyAggregatedStats {
  weekNumber: number
  weekStart: string
  weekEnd: string
  year: number
  platforms: {
    [platform: string]: {
      followers: number // Latest in week
      totalPosts: number // Sum for week
      totalLikes: number // Sum for week
      totalComments: number // Sum for week
      totalShares: number // Sum for week
      totalViews: number // Sum for week
      avgEngagement: number // Average for week
      topPostUrl?: string
    }
  }
  aggregated: {
    totalFollowers: number // Sum across all platforms
    totalPosts: number // Sum across all platforms
    totalLikes: number
    totalComments: number
    totalInteractions: number // likes + comments + shares
    avgEngagement: number // Average across all platforms
  }
}

// GET /api/weekly-aggregated-stats - Returns data grouped and aggregated by week
export const getWeeklyAggregatedStats = async (weeks: number = 8): Promise<WeeklyAggregatedStats[]> => {
  if (!supabase) {
    console.log('⚠️ Supabase not connected - returning empty array')
    return []
  }

  try {
    // Calculate date range (approximately weeks * 7 days + buffer)
    const daysToFetch = weeks * 7 + 7 // Extra week for buffer
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysToFetch)
    const startDateStr = startDate.toISOString().split('T')[0]
    
    console.log(`📅 Fetching data from ${startDateStr} for weekly aggregation`)
    
    // Fetch all data for the period
    const { data, error } = await supabase
      .from('social_stats')
      .select('*')
      .gte('date', startDateStr)
      .order('date', { ascending: true })
    
    if (error) {
      console.error('❌ Error fetching data for weekly aggregation:', error)
      return []
    }
    
    if (!data || data.length === 0) {
      console.log('📭 No data available for weekly aggregation')
      return []
    }
    
    console.log(`✅ Fetched ${data.length} records for weekly aggregation`)
    
    // Group data by ISO week
    const weeklyGroups = new Map<string, SocialStats[]>()
    
    data.forEach((stat) => {
      const date = new Date(stat.date)
      const year = date.getFullYear()
      
      // Get ISO week number (Sunday start)
      const firstDayOfYear = new Date(year, 0, 1)
      const dayOfYear = Math.floor((date.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000))
      const weekNumber = Math.ceil((dayOfYear + firstDayOfYear.getDay() + 1) / 7)
      
      // Create week key
      const weekKey = `${year}-W${weekNumber.toString().padStart(2, '0')}`
      
      if (!weeklyGroups.has(weekKey)) {
        weeklyGroups.set(weekKey, [])
      }
      weeklyGroups.get(weekKey)!.push(stat)
    })
    
    // Convert to aggregated weekly data
    const weeklyStats: WeeklyAggregatedStats[] = []
    const sortedWeeks = Array.from(weeklyGroups.keys()).sort().slice(-weeks) // Get last N weeks
    
    sortedWeeks.forEach((weekKey) => {
      const weekData = weeklyGroups.get(weekKey)!
      const [yearStr, weekStr] = weekKey.split('-W')
      const year = parseInt(yearStr)
      const weekNumber = parseInt(weekStr)
      
      // Calculate week start and end dates
      const firstDayOfYear = new Date(year, 0, 1)
      const daysToAdd = (weekNumber - 1) * 7 - firstDayOfYear.getDay()
      const weekStart = new Date(year, 0, 1 + daysToAdd)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      
      // Group by platform
      const platformGroups = new Map<string, SocialStats[]>()
      weekData.forEach((stat) => {
        if (!platformGroups.has(stat.platform)) {
          platformGroups.set(stat.platform, [])
        }
        platformGroups.get(stat.platform)!.push(stat)
      })
      
      // Aggregate per platform
      const platforms: WeeklyAggregatedStats['platforms'] = {}
      let totalFollowers = 0
      let totalPosts = 0
      let totalLikes = 0
      let totalComments = 0
      let totalShares = 0
      let totalViews = 0
      let totalEngagementSum = 0
      let platformCount = 0
      
      platformGroups.forEach((stats, platform) => {
        // Sort by date to get latest
        stats.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        
        // Get latest follower count for this platform in this week
        const latestFollowers = stats[0].followers
        
        // Sum all posts, likes, comments, etc. for this week
        const weekTotalPosts = stats.reduce((sum, s) => sum + s.posts, 0)
        const weekTotalLikes = stats.reduce((sum, s) => sum + s.likes, 0)
        const weekTotalComments = stats.reduce((sum, s) => sum + s.comments, 0)
        const weekTotalShares = stats.reduce((sum, s) => sum + s.shares, 0)
        const weekTotalViews = stats.reduce((sum, s) => sum + s.views, 0)
        const weekAvgEngagement = stats.reduce((sum, s) => sum + s.engagement_rate, 0) / stats.length
        
        platforms[platform] = {
          followers: latestFollowers,
          totalPosts: weekTotalPosts,
          totalLikes: weekTotalLikes,
          totalComments: weekTotalComments,
          totalShares: weekTotalShares,
          totalViews: weekTotalViews,
          avgEngagement: weekAvgEngagement,
          topPostUrl: stats[0].top_post_url
        }
        
        totalFollowers += latestFollowers
        totalPosts += weekTotalPosts
        totalLikes += weekTotalLikes
        totalComments += weekTotalComments
        totalShares += weekTotalShares
        totalViews += weekTotalViews
        totalEngagementSum += weekAvgEngagement
        platformCount++
      })
      
      weeklyStats.push({
        weekNumber,
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0],
        year,
        platforms,
        aggregated: {
          totalFollowers,
          totalPosts,
          totalLikes,
          totalComments,
          totalInteractions: totalLikes + totalComments + totalShares,
          avgEngagement: platformCount > 0 ? totalEngagementSum / platformCount : 0
        }
      })
    })
    
    console.log(`✅ Processed ${weeklyStats.length} weeks of aggregated data`)
    return weeklyStats
    
  } catch (err) {
    console.error('❌ Exception during weekly aggregation:', err)
    return []
  }
}
