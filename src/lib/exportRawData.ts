import { supabase } from './supabase';

/**
 * Exports all social media data week by week for the past 8 weeks
 * Returns formatted text that can be copied and pasted into ChatGPT
 */
export const exportRawWeeklyData = async (): Promise<string> => {
  console.log('📊 Fetching raw data for export...');
  
  try {
    // Fetch 60 days of data for all platforms
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const startDateStr = sixtyDaysAgo.toISOString().split('T')[0];

    console.log('📅 Fetching data from:', startDateStr);

    const [igResult, fbResult, threadsResult, tiktokFollowersResult, tiktokOverviewResult] = await Promise.all([
      supabase.from('instagram_analytics').select('*').gte('snapshot_date', startDateStr).order('snapshot_date'),
      supabase.from('facebook_analytics').select('*').gte('snapshot_date', startDateStr).order('snapshot_date'),
      supabase.from('threads_analytics').select('*').gte('snapshot_date', startDateStr).order('snapshot_date'),
      supabase.from('tiktok_followers').select('*').gte('snapshot_date', startDateStr).order('snapshot_date'),
      supabase.from('tiktok_overview').select('*').gte('snapshot_date', startDateStr).order('snapshot_date')
    ]);

    const igData = igResult.data || [];
    const fbData = fbResult.data || [];
    const threadsData = threadsResult.data || [];
    const tiktokFollowers = tiktokFollowersResult.data || [];
    const tiktokOverview = tiktokOverviewResult.data || [];

    console.log('✅ Data fetched:', { 
      instagram: igData.length, 
      facebook: fbData.length, 
      threads: threadsData.length, 
      tiktok: tiktokFollowers.length 
    });

    // Helper function to get week dates
    const getWeekDates = (weeksAgo: number) => {
      const today = new Date();
      const weekEnd = new Date(today);
      weekEnd.setDate(today.getDate() - (weeksAgo * 7));
      
      const weekStart = new Date(weekEnd);
      weekStart.setDate(weekEnd.getDate() - 6);
      
      return { start: weekStart, end: weekEnd };
    };

    // Build the report text
    let report = `SOCIAL MEDIA ANALYTICS - 8-WEEK RAW DATA EXPORT
Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Period: Last 8 weeks

================================================================
`;

    // Process each week
    for (let weekNum = 7; weekNum >= 0; weekNum--) {
      const { start, end } = getWeekDates(weekNum);
      const startStr = start.toISOString().split('T')[0];
      const endStr = end.toISOString().split('T')[0];
      const weekNumber = 8 - weekNum;

      report += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      report += `WEEK ${weekNumber}: ${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\n`;
      report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

      // Filter data for this week
      const weekIg = igData.filter(d => d.snapshot_date >= startStr && d.snapshot_date <= endStr);
      const weekFb = fbData.filter(d => d.snapshot_date >= startStr && d.snapshot_date <= endStr);
      const weekThreads = threadsData.filter(d => d.snapshot_date >= startStr && d.snapshot_date <= endStr);
      const weekTikTokF = tiktokFollowers.filter(d => d.snapshot_date >= startStr && d.snapshot_date <= endStr);
      const weekTikTokO = tiktokOverview.filter(d => d.snapshot_date >= startStr && d.snapshot_date <= endStr);

      // INSTAGRAM
      report += `📸 INSTAGRAM\n`;
      report += `${'─'.repeat(60)}\n`;
      
      if (weekIg.length > 0) {
        const latest = weekIg[weekIg.length - 1];
        const totalViews = weekIg.reduce((sum, d) => sum + (d.total_views || 0), 0);
        const totalEngagement = weekIg.reduce((sum, d) => sum + (d.interactions_total || 0), 0);
        
        report += `Total Followers: ${latest.followers_count?.toLocaleString() || 0}\n`;
        report += `Total Views: ${totalViews.toLocaleString()}\n`;
        report += `Total Engagement: ${totalEngagement.toLocaleString()}\n`;
        report += `Profile Views: ${latest.profile_views?.toLocaleString() || 0}\n`;
        report += `Reach: ${latest.accounts_reached?.toLocaleString() || 0}\n`;
        report += `Impressions: ${latest.total_impressions?.toLocaleString() || 0}\n`;
        report += `Website Clicks: ${latest.website_clicks || 0}\n`;
        report += `Email Clicks: ${latest.email_clicks || 0}\n`;
        report += `Phone Clicks: ${latest.phone_clicks || 0}\n`;
        report += `\nContent Breakdown:\n`;
        report += `  - Posts: ${latest.posts_view_pct || 0}%\n`;
        report += `  - Reels: ${latest.reels_view_pct || 0}%\n`;
        report += `  - Stories: ${latest.stories_view_pct || 0}%\n`;
        report += `\nDaily Snapshots (${weekIg.length} days):\n`;
        weekIg.forEach(d => {
          report += `  ${d.snapshot_date}: ${d.followers_count?.toLocaleString() || 0} followers, ${d.total_views?.toLocaleString() || 0} views\n`;
        });
      } else {
        report += `No data available for this week\n`;
      }

      // FACEBOOK
      report += `\n📘 FACEBOOK\n`;
      report += `${'─'.repeat(60)}\n`;
      
      if (weekFb.length > 0) {
        const latest = weekFb[weekFb.length - 1];
        const totalViews = weekFb.reduce((sum, d) => sum + (d.total_views || 0), 0);
        const totalEngagement = weekFb.reduce((sum, d) => sum + (d.total_interactions || 0), 0);
        
        report += `Total Followers: ${latest.total_followers?.toLocaleString() || 0}\n`;
        report += `Page Likes: ${latest.page_likes?.toLocaleString() || 0}\n`;
        report += `Total Views: ${totalViews.toLocaleString()}\n`;
        report += `Total Engagement: ${totalEngagement.toLocaleString()}\n`;
        report += `Post Reach: ${latest.post_reach?.toLocaleString() || 0}\n`;
        report += `Post Impressions: ${latest.post_impressions?.toLocaleString() || 0}\n`;
        report += `Engagement Rate: ${latest.engagement_rate?.toFixed(2) || 0}%\n`;
        report += `\nTop Demographics:\n`;
        report += `  1. ${latest.top_age_gender_1 || 'N/A'}: ${latest.top_age_gender_1_pct || 0}%\n`;
        report += `  2. ${latest.top_age_gender_2 || 'N/A'}: ${latest.top_age_gender_2_pct || 0}%\n`;
        report += `  3. ${latest.top_age_gender_3 || 'N/A'}: ${latest.top_age_gender_3_pct || 0}%\n`;
        report += `\nDaily Snapshots (${weekFb.length} days):\n`;
        weekFb.forEach(d => {
          report += `  ${d.snapshot_date}: ${d.total_followers?.toLocaleString() || 0} followers, ${d.total_views?.toLocaleString() || 0} views\n`;
        });
      } else {
        report += `No data available for this week\n`;
      }

      // TIKTOK
      report += `\n🎵 TIKTOK\n`;
      report += `${'─'.repeat(60)}\n`;
      
      if (weekTikTokF.length > 0 && weekTikTokO.length > 0) {
        const latestFollowers = weekTikTokF[weekTikTokF.length - 1];
        const totalViews = weekTikTokO.reduce((sum, d) => sum + (d.video_views || 0), 0);
        const totalLikes = weekTikTokO.reduce((sum, d) => sum + (d.likes || 0), 0);
        const totalComments = weekTikTokO.reduce((sum, d) => sum + (d.comments || 0), 0);
        const totalShares = weekTikTokO.reduce((sum, d) => sum + (d.shares || 0), 0);
        const followersGained = weekTikTokF.reduce((sum, d) => sum + (d.followers_gained || 0), 0);
        
        report += `Total Followers: ${latestFollowers.total_followers?.toLocaleString() || 0}\n`;
        report += `Followers Gained This Week: ${followersGained.toLocaleString()}\n`;
        report += `Total Video Views: ${totalViews.toLocaleString()}\n`;
        report += `Total Likes: ${totalLikes.toLocaleString()}\n`;
        report += `Total Comments: ${totalComments.toLocaleString()}\n`;
        report += `Total Shares: ${totalShares.toLocaleString()}\n`;
        report += `Total Engagement: ${(totalLikes + totalComments + totalShares).toLocaleString()}\n`;
        report += `\nDaily Follower Growth:\n`;
        weekTikTokF.forEach(d => {
          report += `  ${d.snapshot_date}: ${d.total_followers?.toLocaleString() || 0} (${d.followers_gained > 0 ? '+' : ''}${d.followers_gained || 0})\n`;
        });
        if (weekTikTokO.length > 0) {
          report += `\nDaily Video Performance:\n`;
          weekTikTokO.forEach(d => {
            report += `  ${d.snapshot_date}: ${d.video_views?.toLocaleString() || 0} views, ${d.likes?.toLocaleString() || 0} likes\n`;
          });
        }
      } else {
        report += `No data available for this week\n`;
      }

      // THREADS
      report += `\n@ THREADS\n`;
      report += `${'─'.repeat(60)}\n`;
      
      if (weekThreads.length > 0) {
        const latest = weekThreads[weekThreads.length - 1];
        const totalViews = weekThreads.reduce((sum, d) => sum + (d.total_views || 0), 0);
        const totalEngagement = weekThreads.reduce((sum, d) => sum + (d.total_interactions || 0), 0);
        
        report += `Total Followers: ${latest.total_followers?.toLocaleString() || 0}\n`;
        report += `Total Views: ${totalViews.toLocaleString()}\n`;
        report += `Total Engagement: ${totalEngagement.toLocaleString()}\n`;
        report += `Engagement Rate: ${latest.engagement_rate?.toFixed(2) || 0}%\n`;
        report += `\nDaily Snapshots (${weekThreads.length} days):\n`;
        weekThreads.forEach(d => {
          report += `  ${d.snapshot_date}: ${d.total_followers?.toLocaleString() || 0} followers, ${d.total_views?.toLocaleString() || 0} views\n`;
        });
      } else {
        report += `No data available for this week\n`;
      }
    }

    // Summary section
    report += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    report += `SUMMARY - 8-WEEK COMPARISON\n`;
    report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Calculate totals
    if (igData.length > 0) {
      const first = igData[0];
      const last = igData[igData.length - 1];
      const growth = first.followers_count ? ((last.followers_count - first.followers_count) / first.followers_count * 100).toFixed(2) : '0';
      report += `📸 Instagram: ${first.followers_count?.toLocaleString()} → ${last.followers_count?.toLocaleString()} (${growth}% growth)\n`;
    }

    if (fbData.length > 0) {
      const first = fbData[0];
      const last = fbData[fbData.length - 1];
      const growth = first.total_followers ? ((last.total_followers - first.total_followers) / first.total_followers * 100).toFixed(2) : '0';
      report += `📘 Facebook: ${first.total_followers?.toLocaleString()} → ${last.total_followers?.toLocaleString()} (${growth}% growth)\n`;
    }

    if (tiktokFollowers.length > 0) {
      const first = tiktokFollowers[0];
      const last = tiktokFollowers[tiktokFollowers.length - 1];
      const growth = first.total_followers ? ((last.total_followers - first.total_followers) / first.total_followers * 100).toFixed(2) : '0';
      report += `🎵 TikTok: ${first.total_followers?.toLocaleString()} → ${last.total_followers?.toLocaleString()} (${growth}% growth)\n`;
    }

    if (threadsData.length > 0) {
      const first = threadsData[0];
      const last = threadsData[threadsData.length - 1];
      const growth = first.total_followers ? ((last.total_followers - first.total_followers) / first.total_followers * 100).toFixed(2) : '0';
      report += `@ Threads: ${first.total_followers?.toLocaleString()} → ${last.total_followers?.toLocaleString()} (${growth}% growth)\n`;
    }

    report += `\n================================================================\n`;
    report += `END OF REPORT\n`;
    report += `\nInstructions: Copy this entire report and paste it into ChatGPT\n`;
    report += `with the prompt: "Create a professional analytics report from this data"\n`;

    console.log('✅ Raw data export complete');
    return report;

  } catch (error) {
    console.error('❌ Error exporting data:', error);
    throw error;
  }
};

/**
 * Downloads the raw data as a text file
 */
export const downloadRawDataReport = async (): Promise<void> => {
  try {
    const reportText = await exportRawWeeklyData();
    
    // Create a blob and download
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `social-media-raw-data-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('✅ Report downloaded successfully');
  } catch (error) {
    console.error('❌ Error downloading report:', error);
    throw error;
  }
};

/**
 * Copies the raw data to clipboard
 */
export const copyRawDataToClipboard = async (): Promise<void> => {
  try {
    const reportText = await exportRawWeeklyData();
    await navigator.clipboard.writeText(reportText);
    console.log('✅ Report copied to clipboard');
    alert('✅ Raw data copied to clipboard! You can now paste it into ChatGPT.');
  } catch (error) {
    console.error('❌ Error copying to clipboard:', error);
    throw error;
  }
};



