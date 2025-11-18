import { supabase } from './supabase';

interface InstagramAnalytics {
  snapshot_date: string;
  followers_count?: number;
  total_views?: number;
  interactions_total?: number;
  posts_view_pct?: number;
  reels_view_pct?: number;
  stories_view_pct?: number;
}

interface FacebookAnalytics {
  snapshot_date: string;
  total_followers: number;
  total_views?: number;
  total_interactions?: number;
  engagement_rate?: number;
  top_age_gender_1?: string;
  top_age_gender_1_pct?: number;
}

interface TikTokFollowers {
  snapshot_date: string;
  total_followers: number;
  followers_gained: number;
}

interface TikTokOverview {
  snapshot_date: string;
  video_views: number;
  likes: number;
  comments: number;
  shares: number;
}

interface ThreadsAnalytics {
  snapshot_date: string;
  total_followers: number;
  total_views?: number;
  total_interactions?: number;
  engagement_rate?: number;
}

interface WeeklyData {
  weekNumber: number;
  weekStart: string;
  weekEnd: string;
  instagram?: {
    followers: number;
    followerGrowth: number;
    views: number;
    engagement: number;
    engagementRate: number;
    topContent: string[];
    reelsVsPosts: { reels: number; posts: number; stories: number };
  };
  facebook?: {
    followers: number;
    followerGrowth: number;
    views: number;
    engagement: number;
    engagementRate: number;
    demographics: { age: string; percentage: number }[];
  };
  tiktok?: {
    followers: number;
    followerGrowth: number;
    views: number;
    likes: number;
    engagement: number;
    topVideos: string[];
  };
  threads?: {
    followers: number;
    followerGrowth: number;
    views: number;
    engagement: number;
  };
}

interface ReportData {
  reportPeriod: string;
  generatedDate: string;
  weeklyData: WeeklyData[];
  summary: {
    totalFollowers: number;
    totalFollowerGrowth: number;
    totalViews: number;
    totalEngagement: number;
    avgEngagementRate: number;
    bestWeek: number;
    bestPlatform: string;
  };
  insights: {
    keyWins: string[];
    opportunities: string[];
    recommendations: string[];
  };
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Safely gets a number value, returning 0 for invalid values
 */
const safeNumber = (value: any): number => {
  const num = Number(value);
  if (isNaN(num) || !isFinite(num)) return 0;
  return num;
};

/**
 * Safely calculates percentage growth
 */
const safeGrowth = (current: number, previous: number): number => {
  if (!previous || previous === 0 || !isFinite(previous)) return 0;
  if (!current || !isFinite(current)) return 0;
  
  const growth = ((current - previous) / previous) * 100;
  return isFinite(growth) ? growth : 0;
};

/**
 * Safely sums an array of numbers
 */
const safeSum = (values: any[]): number => {
  return values.reduce((sum, val) => sum + safeNumber(val), 0);
};

export const fetchAndProcessWeeklyData = async (): Promise<ReportData> => {
  try {
    console.log('📊 Fetching weekly data for comprehensive report...');
    
    // Fetch last 60 days of data
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const startDate = sixtyDaysAgo.toISOString().split('T')[0];

    // Fetch all platform data
    const [
      { data: igData, error: igError },
      { data: fbData, error: fbError },
      { data: threadsData, error: threadsError },
      { data: tiktokFollowers, error: tiktokFollowersError },
      { data: tiktokOverview, error: tiktokOverviewError }
    ] = await Promise.all([
      supabase.from('instagram_analytics').select('*').gte('snapshot_date', startDate).order('snapshot_date'),
      supabase.from('facebook_analytics').select('*').gte('snapshot_date', startDate).order('snapshot_date'),
      supabase.from('threads_analytics').select('*').gte('snapshot_date', startDate).order('snapshot_date'),
      supabase.from('tiktok_followers').select('*').gte('snapshot_date', startDate).order('snapshot_date'),
      supabase.from('tiktok_overview').select('*').gte('snapshot_date', startDate).order('snapshot_date')
    ]);

    // Log any errors
    if (igError) console.error('Instagram data error:', igError);
    if (fbError) console.error('Facebook data error:', fbError);
    if (threadsError) console.error('Threads data error:', threadsError);
    if (tiktokFollowersError) console.error('TikTok followers error:', tiktokFollowersError);
    if (tiktokOverviewError) console.error('TikTok overview error:', tiktokOverviewError);

    console.log('✅ Data fetched:', {
      instagram: igData?.length || 0,
      facebook: fbData?.length || 0,
      threads: threadsData?.length || 0,
      tiktokFollowers: tiktokFollowers?.length || 0,
      tiktokOverview: tiktokOverview?.length || 0
    });

  // Group data by weeks
  const weeklyData: WeeklyData[] = [];
  
  for (let weekNum = 0; weekNum < 8; weekNum++) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - ((7 - weekNum) * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const weekStartStr = weekStart.toISOString().split('T')[0];
    const weekEndStr = weekEnd.toISOString().split('T')[0];

    // Filter data for this week
    const weekIgData = (igData || []).filter(d => d.snapshot_date >= weekStartStr && d.snapshot_date <= weekEndStr);
    const weekFbData = (fbData || []).filter(d => d.snapshot_date >= weekStartStr && d.snapshot_date <= weekEndStr);
    const weekThreadsData = (threadsData || []).filter(d => d.snapshot_date >= weekStartStr && d.snapshot_date <= weekEndStr);
    const weekTiktokFollowers = (tiktokFollowers || []).filter(d => d.snapshot_date >= weekStartStr && d.snapshot_date <= weekEndStr);
    const weekTiktokOverview = (tiktokOverview || []).filter(d => d.snapshot_date >= weekStartStr && d.snapshot_date <= weekEndStr);

    const weekData: WeeklyData = {
      weekNumber: weekNum + 1,
      weekStart: weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weekEnd: weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    // Process Instagram
    if (weekIgData.length > 0) {
      const latestIg = weekIgData[weekIgData.length - 1];
      const firstIg = weekIgData[0];
      const followers = safeNumber(latestIg.followers_count);
      const firstFollowers = safeNumber(firstIg.followers_count);
      const followerGrowth = safeGrowth(followers, firstFollowers);
      const totalViews = safeSum(weekIgData.map(d => d.total_views));
      const totalEngagement = safeSum(weekIgData.map(d => d.interactions_total));

      weekData.instagram = {
        followers,
        followerGrowth,
        views: totalViews,
        engagement: totalEngagement,
        engagementRate: followers > 0 ? (totalEngagement / followers) * 100 : 0,
        topContent: [],
        reelsVsPosts: {
          reels: safeNumber(latestIg.reels_view_pct),
          posts: safeNumber(latestIg.posts_view_pct),
          stories: safeNumber(latestIg.stories_view_pct)
        }
      };
    }

    // Process Facebook
    if (weekFbData.length > 0) {
      const latestFb = weekFbData[weekFbData.length - 1];
      const firstFb = weekFbData[0];
      const followers = safeNumber(latestFb.total_followers);
      const firstFollowers = safeNumber(firstFb.total_followers);
      const followerGrowth = safeGrowth(followers, firstFollowers);

      weekData.facebook = {
        followers,
        followerGrowth,
        views: safeSum(weekFbData.map(d => d.total_views)),
        engagement: safeSum(weekFbData.map(d => d.total_interactions)),
        engagementRate: safeNumber(latestFb.engagement_rate),
        demographics: latestFb.top_age_gender_1 ? [{
          age: String(latestFb.top_age_gender_1),
          percentage: safeNumber(latestFb.top_age_gender_1_pct)
        }] : []
      };
    }

    // Process TikTok
    if (weekTiktokFollowers.length > 0 && weekTiktokOverview.length > 0) {
      const latestFollowers = weekTiktokFollowers[weekTiktokFollowers.length - 1];
      const followers = safeNumber(latestFollowers.total_followers);
      const followerGained = safeSum(weekTiktokFollowers.map(d => d.followers_gained));
      const totalViews = safeSum(weekTiktokOverview.map(d => d.video_views));
      const totalLikes = safeSum(weekTiktokOverview.map(d => d.likes));
      const totalEngagement = safeSum(weekTiktokOverview.map(d => 
        safeNumber(d.likes) + safeNumber(d.comments) + safeNumber(d.shares)
      ));

      weekData.tiktok = {
        followers,
        followerGrowth: followers > 0 ? (followerGained / followers) * 100 : 0,
        views: totalViews,
        likes: totalLikes,
        engagement: totalEngagement,
        topVideos: []
      };
    }

    // Process Threads
    if (weekThreadsData.length > 0) {
      const latestThreads = weekThreadsData[weekThreadsData.length - 1];
      const firstThreads = weekThreadsData[0];
      const followers = safeNumber(latestThreads.total_followers);
      const firstFollowers = safeNumber(firstThreads.total_followers);
      const followerGrowth = safeGrowth(followers, firstFollowers);

      weekData.threads = {
        followers,
        followerGrowth,
        views: safeSum(weekThreadsData.map(d => d.total_views)),
        engagement: safeSum(weekThreadsData.map(d => d.total_interactions))
      };
    }

    weeklyData.push(weekData);
  }

  // Calculate summary
  const latestWeek = weeklyData[weeklyData.length - 1];
  const firstWeek = weeklyData[0];

  const latestTotalFollowers = (latestWeek.instagram?.followers || 0) + 
                               (latestWeek.facebook?.followers || 0) + 
                               (latestWeek.tiktok?.followers || 0) + 
                               (latestWeek.threads?.followers || 0);

  const firstTotalFollowers = (firstWeek.instagram?.followers || 0) + 
                              (firstWeek.facebook?.followers || 0) + 
                              (firstWeek.tiktok?.followers || 0) + 
                              (firstWeek.threads?.followers || 0);

  const totalFollowerGrowth = safeGrowth(latestTotalFollowers, firstTotalFollowers);

  const totalViews = safeSum(weeklyData.map(week => 
    safeNumber(week.instagram?.views) + 
    safeNumber(week.facebook?.views) + 
    safeNumber(week.tiktok?.views) + 
    safeNumber(week.threads?.views)
  ));

  const totalEngagement = safeSum(weeklyData.map(week => 
    safeNumber(week.instagram?.engagement) + 
    safeNumber(week.facebook?.engagement) + 
    safeNumber(week.tiktok?.engagement) + 
    safeNumber(week.threads?.engagement)
  ));

  const avgEngagementRate = weeklyData.length > 0 
    ? safeSum(weeklyData.map(week => {
        const weekRate = (safeNumber(week.instagram?.engagementRate) + safeNumber(week.facebook?.engagementRate)) / 2;
        return weekRate;
      })) / weeklyData.length
    : 0;

  // Find best week
  const bestWeek = weeklyData.reduce((best, week, index) => {
    const weekTotal = (week.instagram?.engagement || 0) + (week.facebook?.engagement || 0) + (week.tiktok?.engagement || 0);
    const bestTotal = (best.instagram?.engagement || 0) + (best.facebook?.engagement || 0) + (best.tiktok?.engagement || 0);
    return weekTotal > bestTotal ? week : best;
  });

  // Determine best platform
  const platformTotals = {
    instagram: weeklyData.reduce((sum, w) => sum + (w.instagram?.engagement || 0), 0),
    facebook: weeklyData.reduce((sum, w) => sum + (w.facebook?.engagement || 0), 0),
    tiktok: weeklyData.reduce((sum, w) => sum + (w.tiktok?.engagement || 0), 0),
    threads: weeklyData.reduce((sum, w) => sum + (w.threads?.engagement || 0), 0)
  };

  const bestPlatform = Object.entries(platformTotals).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  // Generate insights
  const keyWins: string[] = [];
  const opportunities: string[] = [];
  const recommendations: string[] = [];

  if (totalFollowerGrowth > 10) {
    keyWins.push(`Exceptional audience growth of ${totalFollowerGrowth.toFixed(1)}% across all platforms over 8 weeks`);
  } else if (totalFollowerGrowth > 5) {
    keyWins.push(`Strong follower growth of ${totalFollowerGrowth.toFixed(1)}% demonstrating effective audience building`);
  }

  if (avgEngagementRate > 3) {
    keyWins.push(`Outstanding average engagement rate of ${avgEngagementRate.toFixed(1)}% shows highly engaged audience`);
  }

  keyWins.push(`${bestPlatform.charAt(0).toUpperCase() + bestPlatform.slice(1)} emerged as the top performing platform with highest engagement`);

  // Opportunities
  if (totalFollowerGrowth < 3) {
    opportunities.push(`Follower growth is below industry average - focus on content that drives shares and discovery`);
    recommendations.push(`Increase posting frequency on high-performing platforms and test new content formats`);
  }

  if (avgEngagementRate < 2) {
    opportunities.push(`Engagement rate has room for improvement - audience is watching but not interacting`);
    recommendations.push(`Add more calls-to-action in captions and Stories to encourage comments and shares`);
  }

  opportunities.push(`Week ${bestWeek.weekNumber} showed peak performance - analyze what content worked and replicate`);
  recommendations.push(`Post during identified peak engagement times and maintain consistent posting schedule`);
  recommendations.push(`Leverage cross-platform promotion to drive followers from ${bestPlatform} to other channels`);

    const reportData: ReportData = {
      reportPeriod: `${firstWeek.weekStart} - ${latestWeek.weekEnd}`,
      generatedDate: new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      weeklyData,
      summary: {
        totalFollowers: latestTotalFollowers,
        totalFollowerGrowth,
        totalViews,
        totalEngagement,
        avgEngagementRate,
        bestWeek: bestWeek.weekNumber,
        bestPlatform: bestPlatform.charAt(0).toUpperCase() + bestPlatform.slice(1)
      },
      insights: {
        keyWins,
        opportunities,
        recommendations
      }
    };

    console.log('✅ Data processing complete');
    return reportData;
    
  } catch (error) {
    console.error('❌ Error fetching/processing weekly data:', error);
    throw error;
  }
};

