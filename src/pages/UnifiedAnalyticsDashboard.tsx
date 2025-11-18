import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import * as d3 from "d3";
import { motion } from "framer-motion";
import { 
  TrendingUp, TrendingDown, Users, Eye, Heart, Upload, 
  Calendar, Clock, Instagram, ArrowUpRight, ArrowDownRight, ChevronLeft,
  Music, Twitter, Youtube, Facebook, MapPin, Globe, AtSign, MessageCircle, Repeat,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { generateAnalyticsPDF } from "@/lib/pdfExport";
import { generateSimpleWeeklyComparison } from "@/lib/simpleWeeklyComparison";
import { downloadRawDataReport, copyRawDataToClipboard } from "@/lib/exportRawData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface InstagramAnalytics {
  id: string;
  snapshot_date: string;
  profile_visits?: number;
  external_link_taps?: number;
  followers_count?: number;
  most_active_day?: string;
  most_active_hour?: string;
  most_active_hour_count?: number;
  total_views?: number;
  accounts_reached?: number;
  posts_view_pct?: number;
  reels_view_pct?: number;
  stories_view_pct?: number;
  interactions_total?: number;
  posts_interaction_pct?: number;
  reels_interaction_pct?: number;
  stories_interaction_pct?: number;
  followers_view_pct?: number;
  non_followers_view_pct?: number;
  followers_interaction_pct?: number;
  non_followers_interaction_pct?: number;
}

interface FacebookAnalytics {
  id: string;
  snapshot_date: string;
  total_followers: number;
  net_follows?: number;
  unfollows?: number;
  follows_from_posts_pct?: number;
  follows_from_videos_pct?: number;
  top_age_gender_1?: string;
  top_age_gender_1_pct?: number;
  top_age_gender_2?: string;
  top_age_gender_2_pct?: number;
  top_age_gender_3?: string;
  top_age_gender_3_pct?: number;
  top_country_1?: string;
  top_country_1_pct?: number;
  top_country_2?: string;
  top_country_2_pct?: number;
  top_country_3?: string;
  top_country_3_pct?: number;
  top_city_1?: string;
  top_city_1_pct?: number;
  top_city_2?: string;
  top_city_2_pct?: number;
  top_city_3?: string;
  top_city_3_pct?: number;
  total_views?: number;
  views_3_second?: number;
  views_1_minute?: number;
  views_multi_photo_pct?: number;
  views_video_pct?: number;
  views_multi_media_pct?: number;
  views_photo_pct?: number;
  views_reel_pct?: number;
  views_followers_pct?: number;
  views_non_followers_pct?: number;
  total_interactions?: number;
  reactions_count?: number;
  comments_count?: number;
  shares_count?: number;
  interactions_followers_pct?: number;
  interactions_non_followers_pct?: number;
  engagement_rate?: number;
}

interface ThreadsAnalytics {
  id: string;
  snapshot_date: string;
  total_followers: number;
  follower_growth?: number;
  total_views?: number;
  views_home_pct?: number;
  views_instagram_pct?: number;
  views_activity_tab_pct?: number;
  views_search_pct?: number;
  views_other_pct?: number;
  total_interactions?: number;
  likes_count?: number;
  quotes_count?: number;
  replies_count?: number;
  reposts_count?: number;
  engagement_rate?: number;
}

interface TikTokOverview {
  id: string;
  snapshot_date: string;
  video_views: number;
  profile_views: number;
  likes: number;
  comments: number;
  shares: number;
}

interface TikTokContent {
  id: string;
  video_title: string;
  video_link: string;
  post_date: string;
  snapshot_date: string;
  total_likes: number;
  total_comments: number;
  total_shares: number;
  total_views: number;
  total_engagement: number;
  engagement_rate: number;
}

interface TikTokViewers {
  id: string;
  snapshot_date: string;
  total_viewers: number;
  new_viewers: number;
  returning_viewers: number;
  new_viewers_pct: number;
  returning_viewers_pct: number;
}

interface TikTokFollowers {
  id: string;
  snapshot_date: string;
  total_followers: number;
  followers_gained: number;
}

interface TikTokGender {
  id: string;
  snapshot_date: string;
  gender: string;
  distribution_pct: number;
}

interface TikTokTerritory {
  id: string;
  snapshot_date: string;
  territory: string;
  distribution_pct: number;
}

interface TikTokActiveHours {
  id: string;
  snapshot_date: string;
  hour: number;
  active_followers: number;
}

const UnifiedAnalyticsDashboard: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [instagramData, setInstagramData] = useState<InstagramAnalytics[]>([]);
  const [facebookData, setFacebookData] = useState<FacebookAnalytics[]>([]);
  const [threadsData, setThreadsData] = useState<ThreadsAnalytics[]>([]);
  
  // TikTok data from 7 tables
  const [tiktokOverview, setTiktokOverview] = useState<TikTokOverview[]>([]);
  const [tiktokContent, setTiktokContent] = useState<TikTokContent[]>([]);
  const [tiktokViewers, setTiktokViewers] = useState<TikTokViewers[]>([]);
  const [tiktokFollowers, setTiktokFollowers] = useState<TikTokFollowers[]>([]);
  const [tiktokGender, setTiktokGender] = useState<TikTokGender[]>([]);
  const [tiktokTerritory, setTiktokTerritory] = useState<TikTokTerritory[]>([]);
  const [tiktokActiveHours, setTiktokActiveHours] = useState<TikTokActiveHours[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [exportingRawData, setExportingRawData] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, [selectedPlatform, timeRange]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const { data: igData } = await supabase
        .from('instagram_analytics')
        .select('*')
        .order('snapshot_date', { ascending: true });

      const { data: fbData } = await supabase
        .from('facebook_analytics')
        .select('*')
        .order('snapshot_date', { ascending: true });

      const { data: threadsDataResult } = await supabase
        .from('threads_analytics')
        .select('*')
        .order('snapshot_date', { ascending: true });

      // Fetch all 7 TikTok tables
      const { data: tiktokOverviewData } = await supabase
        .from('tiktok_overview')
        .select('*')
        .order('snapshot_date', { ascending: true });

      const { data: tiktokContentData } = await supabase
        .from('tiktok_content')
        .select('*')
        .order('total_views', { ascending: false });

      const { data: tiktokViewersData } = await supabase
        .from('tiktok_viewers')
        .select('*')
        .order('snapshot_date', { ascending: true });

      const { data: tiktokFollowersData } = await supabase
        .from('tiktok_followers')
        .select('*')
        .order('snapshot_date', { ascending: true });

      const { data: tiktokGenderData } = await supabase
        .from('tiktok_demographics_gender')
        .select('*')
        .order('distribution_pct', { ascending: false });

      const { data: tiktokTerritoryData } = await supabase
        .from('tiktok_demographics_territory')
        .select('*')
        .order('distribution_pct', { ascending: false });

      const { data: tiktokActiveHoursData } = await supabase
        .from('tiktok_active_hours')
        .select('*')
        .order('hour', { ascending: true });

      setInstagramData(igData || []);
      setFacebookData(fbData || []);
      setThreadsData(threadsDataResult || []);
      setTiktokOverview(tiktokOverviewData || []);
      setTiktokContent(tiktokContentData || []);
      setTiktokViewers(tiktokViewersData || []);
      setTiktokFollowers(tiktokFollowersData || []);
      setTiktokGender(tiktokGenderData || []);
      setTiktokTerritory(tiktokTerritoryData || []);
      setTiktokActiveHours(tiktokActiveHoursData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = () => {
    if (instagramData.length === 0) {
      return {
        totalFollowers: 0,
        followerGrowth: 0,
        totalViews: 0,
        viewGrowth: 0,
        totalInteractions: 0,
        interactionGrowth: 0,
        engagementRate: 0,
        profileVisits: 0,
        linkTaps: 0,
        accountsReached: 0
      };
    }

    const latest = instagramData[instagramData.length - 1];
    const previous = instagramData.length > 1 ? instagramData[instagramData.length - 2] : latest;

    const followerGrowth = previous.followers_count 
      ? ((latest.followers_count - previous.followers_count) / previous.followers_count * 100).toFixed(1)
      : 0;

    const viewGrowth = previous.total_views && latest.total_views
      ? ((latest.total_views - previous.total_views) / previous.total_views * 100).toFixed(1)
      : 0;

    const interactionGrowth = previous.interactions_total && latest.interactions_total
      ? ((latest.interactions_total - previous.interactions_total) / previous.interactions_total * 100).toFixed(1)
      : 0;

    const engagementRate = latest.followers_count && latest.interactions_total
      ? ((latest.interactions_total / latest.followers_count) * 100).toFixed(1)
      : 0;

    return {
      totalFollowers: latest.followers_count || 0,
      followerGrowth: parseFloat(followerGrowth),
      totalViews: latest.total_views || 0,
      viewGrowth: parseFloat(viewGrowth),
      totalInteractions: latest.interactions_total || 0,
      interactionGrowth: parseFloat(interactionGrowth),
      engagementRate: parseFloat(engagementRate),
      profileVisits: latest.profile_visits || 0,
      linkTaps: latest.external_link_taps || 0,
      accountsReached: latest.accounts_reached || 0
    };
  };

  const calculateFacebookMetrics = () => {
    if (facebookData.length === 0) {
      return {
        totalFollowers: 0,
        followerGrowth: 0,
        netFollows: 0,
        totalViews: 0,
        viewGrowth: 0,
        totalInteractions: 0,
        interactionGrowth: 0,
        engagementRate: 0,
        reactionsCount: 0,
        commentsCount: 0,
        sharesCount: 0
      };
    }

    const latest = facebookData[facebookData.length - 1];
    const previous = facebookData.length > 1 ? facebookData[facebookData.length - 2] : latest;

    const followerGrowth = previous.total_followers 
      ? ((latest.total_followers - previous.total_followers) / previous.total_followers * 100).toFixed(1)
      : 0;

    const viewGrowth = previous.total_views && latest.total_views
      ? ((latest.total_views - previous.total_views) / previous.total_views * 100).toFixed(1)
      : 0;

    const interactionGrowth = previous.total_interactions && latest.total_interactions
      ? ((latest.total_interactions - previous.total_interactions) / previous.total_interactions * 100).toFixed(1)
      : 0;

    return {
      totalFollowers: latest.total_followers || 0,
      followerGrowth: parseFloat(followerGrowth),
      netFollows: latest.net_follows || 0,
      totalViews: latest.total_views || 0,
      viewGrowth: parseFloat(viewGrowth),
      totalInteractions: latest.total_interactions || 0,
      interactionGrowth: parseFloat(interactionGrowth),
      engagementRate: latest.engagement_rate || 0,
      reactionsCount: latest.reactions_count || 0,
      commentsCount: latest.comments_count || 0,
      sharesCount: latest.shares_count || 0
    };
  };

  const calculateThreadsMetrics = () => {
    if (threadsData.length === 0) {
      return {
        totalFollowers: 0,
        followerGrowth: 0,
        totalViews: 0,
        viewGrowth: 0,
        totalInteractions: 0,
        interactionGrowth: 0,
        engagementRate: 0,
        likesCount: 0,
        quotesCount: 0,
        repliesCount: 0,
        repostsCount: 0
      };
    }

    const latest = threadsData[threadsData.length - 1];
    const previous = threadsData.length > 1 ? threadsData[threadsData.length - 2] : latest;

    const followerGrowth = previous.total_followers 
      ? ((latest.total_followers - previous.total_followers) / previous.total_followers * 100).toFixed(1)
      : 0;

    const viewGrowth = previous.total_views && latest.total_views
      ? ((latest.total_views - previous.total_views) / previous.total_views * 100).toFixed(1)
      : 0;

    const interactionGrowth = previous.total_interactions && latest.total_interactions
      ? ((latest.total_interactions - previous.total_interactions) / previous.total_interactions * 100).toFixed(1)
      : 0;

    return {
      totalFollowers: latest.total_followers || 0,
      followerGrowth: parseFloat(followerGrowth),
      totalViews: latest.total_views || 0,
      viewGrowth: parseFloat(viewGrowth),
      totalInteractions: latest.total_interactions || 0,
      interactionGrowth: parseFloat(interactionGrowth),
      engagementRate: latest.engagement_rate || 0,
      likesCount: latest.likes_count || 0,
      quotesCount: latest.quotes_count || 0,
      repliesCount: latest.replies_count || 0,
      repostsCount: latest.reposts_count || 0
    };
  };

  const calculateTikTokMetrics = () => {
    if (tiktokOverview.length === 0) {
      return {
        totalVideoViews: 0,
        videoViewGrowth: 0,
        totalProfileViews: 0,
        profileViewGrowth: 0,
        totalLikes: 0,
        likesGrowth: 0,
        totalComments: 0,
        commentsGrowth: 0,
        totalShares: 0,
        sharesGrowth: 0,
        totalEngagement: 0,
        engagementGrowth: 0,
        totalFollowers: tiktokFollowers.length > 0 ? tiktokFollowers[tiktokFollowers.length - 1].total_followers : 0,
        followerGrowth: 0,
        totalVideos: tiktokContent.length
      };
    }

    const latest = tiktokOverview[tiktokOverview.length - 1];
    const previous = tiktokOverview.length > 1 ? tiktokOverview[tiktokOverview.length - 2] : latest;

    const videoViewGrowth = previous.video_views 
      ? ((latest.video_views - previous.video_views) / previous.video_views * 100).toFixed(1)
      : 0;

    const profileViewGrowth = previous.profile_views 
      ? ((latest.profile_views - previous.profile_views) / previous.profile_views * 100).toFixed(1)
      : 0;

    const likesGrowth = previous.likes 
      ? ((latest.likes - previous.likes) / previous.likes * 100).toFixed(1)
      : 0;

    const commentsGrowth = previous.comments 
      ? ((latest.comments - previous.comments) / previous.comments * 100).toFixed(1)
      : 0;

    const sharesGrowth = previous.shares 
      ? ((latest.shares - previous.shares) / previous.shares * 100).toFixed(1)
      : 0;

    const totalEngagement = (latest.likes || 0) + (latest.comments || 0) + (latest.shares || 0);
    const previousEngagement = (previous.likes || 0) + (previous.comments || 0) + (previous.shares || 0);
    
    const engagementGrowth = previousEngagement 
      ? ((totalEngagement - previousEngagement) / previousEngagement * 100).toFixed(1)
      : 0;

    // Get follower data
    const latestFollowers = tiktokFollowers.length > 0 ? tiktokFollowers[tiktokFollowers.length - 1] : null;
    const previousFollowers = tiktokFollowers.length > 1 ? tiktokFollowers[tiktokFollowers.length - 2] : latestFollowers;
    
    const followerGrowth = latestFollowers && previousFollowers && previousFollowers.total_followers
      ? ((latestFollowers.total_followers - previousFollowers.total_followers) / previousFollowers.total_followers * 100).toFixed(1)
      : 0;

    return {
      totalVideoViews: latest.video_views || 0,
      videoViewGrowth: parseFloat(videoViewGrowth),
      totalProfileViews: latest.profile_views || 0,
      profileViewGrowth: parseFloat(profileViewGrowth),
      totalLikes: latest.likes || 0,
      likesGrowth: parseFloat(likesGrowth),
      totalComments: latest.comments || 0,
      commentsGrowth: parseFloat(commentsGrowth),
      totalShares: latest.shares || 0,
      sharesGrowth: parseFloat(sharesGrowth),
      totalEngagement,
      engagementGrowth: parseFloat(engagementGrowth),
      totalFollowers: latestFollowers ? latestFollowers.total_followers : 0,
      followerGrowth: parseFloat(followerGrowth),
      totalVideos: tiktokContent.length
    };
  };

  const metrics = calculateMetrics();
  const fbMetrics = calculateFacebookMetrics();
  const threadsMetrics = calculateThreadsMetrics();
  const tiktokMetrics = calculateTikTokMetrics();
  const latest = instagramData.length > 0 ? instagramData[instagramData.length - 1] : null;
  const latestFb = facebookData.length > 0 ? facebookData[facebookData.length - 1] : null;
  const latestThreads = threadsData.length > 0 ? threadsData[threadsData.length - 1] : null;
  const latestTikTokOverview = tiktokOverview.length > 0 ? tiktokOverview[tiktokOverview.length - 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // Prepare timeline data
  const timelineData = instagramData.map(item => ({
    date: new Date(item.snapshot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    followers: item.followers_count || 0,
    views: item.total_views || 0,
    interactions: item.interactions_total || 0
  }));

  // Content performance data (Instagram)
  const contentPerformance = latest ? [
    { type: 'Posts', views: latest.posts_view_pct || 0, interactions: latest.posts_interaction_pct || 0 },
    { type: 'Reels', views: latest.reels_view_pct || 0, interactions: latest.reels_interaction_pct || 0 },
    { type: 'Stories', views: latest.stories_view_pct || 0, interactions: latest.stories_interaction_pct || 0 }
  ] : [];

  // Platform comparison data for overview
  const platformData = [
    { 
      platform: 'Instagram', 
      followers: metrics.totalFollowers, 
      views: metrics.totalViews, 
      interactions: metrics.totalInteractions,
      engagement: metrics.engagementRate,
      hasData: instagramData.length > 0,
      icon: <Instagram className="w-4 h-4" />,
      color: 'from-pink-500 to-purple-500'
    },
    { 
      platform: 'Facebook', 
      followers: fbMetrics.totalFollowers, 
      views: fbMetrics.totalViews, 
      interactions: fbMetrics.totalInteractions,
      engagement: fbMetrics.engagementRate,
      hasData: facebookData.length > 0,
      icon: <Facebook className="w-4 h-4" />,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      platform: 'Threads', 
      followers: threadsMetrics.totalFollowers, 
      views: threadsMetrics.totalViews, 
      interactions: threadsMetrics.totalInteractions,
      engagement: threadsMetrics.engagementRate,
      hasData: threadsData.length > 0,
      icon: <AtSign className="w-4 h-4" />,
      color: 'from-purple-500 to-indigo-500'
    },
    { 
      platform: 'TikTok', 
      followers: tiktokMetrics.totalFollowers, 
      views: tiktokMetrics.totalVideoViews, 
      interactions: tiktokMetrics.totalEngagement,
      engagement: tiktokMetrics.totalVideoViews > 0 
        ? ((tiktokMetrics.totalEngagement / tiktokMetrics.totalVideoViews) * 100).toFixed(2)
        : 0,
      hasData: tiktokOverview.length > 0 || tiktokContent.length > 0,
      icon: <Music className="w-4 h-4" />,
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      platform: 'Twitter', 
      followers: 0, 
      views: 0, 
      interactions: 0,
      engagement: 0,
      hasData: false,
      icon: <Twitter className="w-4 h-4" />,
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      platform: 'YouTube', 
      followers: 0, 
      views: 0, 
      interactions: 0,
      engagement: 0,
      hasData: false,
      icon: <Youtube className="w-4 h-4" />,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const totalAcrossPlatforms = {
    followers: platformData.reduce((sum, p) => sum + p.followers, 0),
    views: platformData.reduce((sum, p) => sum + p.views, 0),
    interactions: platformData.reduce((sum, p) => sum + p.interactions, 0),
    avgEngagement: platformData.filter(p => p.hasData).reduce((sum, p) => sum + p.engagement, 0) / platformData.filter(p => p.hasData).length || 0
  };

  const handleGenerateWeeklyReport = async () => {
    console.log('📊 User clicked Weekly Report button');
    setGeneratingReport(true);
    try {
      await generateSimpleWeeklyComparison();
      console.log('✅ Report generated successfully!');
    } catch (error: any) {
      console.error('❌ Error generating weekly report:', error);
      alert(`Failed to generate report: ${error.message || 'Unknown error'}\n\nCheck console for details.`);
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleExportRawData = async () => {
    console.log('📋 User clicked Export Raw Data button');
    setExportingRawData(true);
    try {
      await downloadRawDataReport();
      console.log('✅ Raw data exported successfully!');
      alert('✅ Raw data downloaded!\n\nOpen the .txt file and copy it to ChatGPT with the prompt:\n"Create a professional analytics report from this data"');
    } catch (error: any) {
      console.error('❌ Error exporting raw data:', error);
      alert(`Failed to export data: ${error.message || 'Unknown error'}\n\nCheck console for details.`);
    } finally {
      setExportingRawData(false);
    }
  };

  const handleCopyRawData = async () => {
    console.log('📋 User clicked Copy Raw Data button');
    setExportingRawData(true);
    try {
      await copyRawDataToClipboard();
      console.log('✅ Raw data copied to clipboard!');
    } catch (error: any) {
      console.error('❌ Error copying raw data:', error);
      alert(`Failed to copy data: ${error.message || 'Unknown error'}\n\nCheck console for details.`);
    } finally {
      setExportingRawData(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      console.log('Starting PDF export...');
      
      // Prepare summary data for all platforms
      const platformSummaries = [
        {
          platform: 'Instagram',
          followers: metrics.totalFollowers,
          followerGrowth: metrics.followGrowth,
          views: metrics.totalViews,
          viewGrowth: 0, // Could calculate if we track view growth
          engagement: metrics.totalInteractions,
          engagementGrowth: 0,
          engagementRate: metrics.engagementRate
        },
        {
          platform: 'Facebook',
          followers: fbMetrics.totalFollowers,
          followerGrowth: fbMetrics.followGrowth,
          views: fbMetrics.totalViews,
          viewGrowth: fbMetrics.viewGrowth,
          engagement: fbMetrics.totalInteractions,
          engagementGrowth: 0,
          engagementRate: fbMetrics.engagementRate
        },
        {
          platform: 'Threads',
          followers: threadsMetrics.totalFollowers,
          followerGrowth: threadsMetrics.followGrowth,
          views: threadsMetrics.totalViews,
          viewGrowth: threadsMetrics.viewGrowth,
          engagement: threadsMetrics.totalInteractions,
          engagementGrowth: 0,
          engagementRate: threadsMetrics.engagementRate
        },
        {
          platform: 'TikTok',
          followers: tiktokMetrics.totalFollowers,
          followerGrowth: tiktokMetrics.followerGrowth,
          views: tiktokMetrics.totalVideoViews,
          viewGrowth: tiktokMetrics.videoViewGrowth,
          engagement: tiktokMetrics.totalEngagement,
          engagementGrowth: tiktokMetrics.engagementGrowth,
          engagementRate: tiktokMetrics.totalVideoViews > 0 
            ? ((tiktokMetrics.totalEngagement / tiktokMetrics.totalVideoViews) * 100)
            : 0
        }
      ];

      console.log('Platform summaries:', platformSummaries);

      // Get readable time range label
      const timeRangeLabels: { [key: string]: string } = {
        '7d': 'Last 7 Days',
        '30d': 'Last 30 Days',
        '90d': 'Last 90 Days',
        'all': 'All Time'
      };

      const timeRangeLabel = timeRangeLabels[timeRange] || 'Last 30 Days';
      console.log('Generating PDF for:', timeRangeLabel);

      await generateAnalyticsPDF(platformSummaries, timeRangeLabel);
      
      console.log('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check the console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Compact Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-slate-400 hover:text-slate-300 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white">Analytics Hub</h1>
              <p className="text-xs text-slate-400">
                {selectedPlatform === 'all' ? 'All Platforms Overview' : `${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} Analytics`} 
                {latest && ` • Last updated ${new Date(latest.snapshot_date).toLocaleDateString()}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-32 h-9 bg-slate-800 border-slate-700 text-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="instagram">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-3 h-3" />
                    <span>Instagram</span>
                  </div>
                </SelectItem>
                <SelectItem value="facebook">
                  <div className="flex items-center gap-2">
                    <Facebook className="w-3 h-3" />
                    <span>Facebook</span>
                  </div>
                </SelectItem>
                <SelectItem value="threads">
                  <div className="flex items-center gap-2">
                    <AtSign className="w-3 h-3" />
                    <span>Threads</span>
                  </div>
                </SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-24 h-9 bg-slate-800 border-slate-700 text-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              size="sm" 
              onClick={handleGenerateWeeklyReport}
              disabled={generatingReport}
              className="h-9 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-xs px-3"
            >
              <Calendar className="w-3 h-3 mr-1.5" />
              {generatingReport ? 'Generating...' : '📊 Weekly Report'}
            </Button>

            <Button 
              size="sm" 
              onClick={handleCopyRawData}
              disabled={exportingRawData}
              className="h-9 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs px-3"
            >
              <Download className="w-3 h-3 mr-1.5" />
              {exportingRawData ? 'Exporting...' : '📋 Raw Data for AI'}
            </Button>

            <Button 
              size="sm" 
              onClick={handleExportPDF}
              className="h-9 bg-green-600 hover:bg-green-700 text-white text-xs px-3"
            >
              <Download className="w-3 h-3 mr-1.5" />
              Quick Export
            </Button>

            <Link to="/hub/upload">
              <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3">
                <Upload className="w-3 h-3 mr-1.5" />
                Add Data
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-[1600px] mx-auto px-6 py-4">
        {selectedPlatform === 'all' ? (
          /* ALL PLATFORMS OVERVIEW */
          <>
            {/* Total Metrics Across All Platforms */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {/* Total Followers */}
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-xs text-slate-400 font-medium">{platformData.filter(p => p.hasData).length}/{platformData.length} Active</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{totalAcrossPlatforms.followers.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">Total Followers</p>
                </CardContent>
              </Card>

              {/* Total Views */}
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Eye className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">{totalAcrossPlatforms.views.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">Total Views</p>
                </CardContent>
              </Card>

              {/* Total Interactions */}
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Heart className="w-5 h-5 text-pink-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">{totalAcrossPlatforms.interactions.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">Total Interactions</p>
                </CardContent>
              </Card>

              {/* Avg Engagement */}
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">{totalAcrossPlatforms.avgEngagement.toFixed(1)}%</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">Avg Engagement</p>
                </CardContent>
              </Card>
            </div>

            {/* Platform Comparison Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {platformData.map((platform) => (
                <Card 
                  key={platform.platform}
                  className={`bg-slate-900 border-slate-800 ${!platform.hasData && 'opacity-60'}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${platform.color}`}>
                          {platform.icon}
                        </div>
                        <div>
                          <CardTitle className="text-sm font-semibold text-white">{platform.platform}</CardTitle>
                          <p className="text-xs text-slate-500">
                            {platform.hasData ? 'Active' : 'No data yet'}
                          </p>
                        </div>
                      </div>
                      {!platform.hasData && (
                        <Link to="/hub/upload">
                          <Button size="sm" variant="outline" className="h-7 text-xs border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                            Add Data
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {platform.hasData ? (
                      <div className="grid grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Followers</p>
                          <p className="text-lg font-bold text-white">{platform.followers.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Views</p>
                          <p className="text-lg font-bold text-white">{platform.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Interactions</p>
                          <p className="text-lg font-bold text-white">{platform.interactions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Engagement</p>
                          <p className="text-lg font-bold text-white">{platform.engagement}%</p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 text-center">
                        <p className="text-sm text-slate-500">Connect {platform.platform} to see analytics</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Platform Performance Comparison Chart */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white">Platform Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={platformData.filter(p => p.hasData)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="platform" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="followers" fill="#3b82f6" name="Followers" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="interactions" fill="#8b5cf6" name="Interactions" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        ) : selectedPlatform === 'instagram' ? (
          /* INSTAGRAM-SPECIFIC VIEW */
          <>
        {/* Top KPI Row - 6 columns */}
        <div className="grid grid-cols-6 gap-3 mb-4">
          {/* Followers */}
          <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <Users className="w-4 h-4 text-blue-400" />
                {metrics.followerGrowth !== 0 && (
                  <span className={`text-xs flex items-center gap-0.5 font-medium ${metrics.followerGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {metrics.followerGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(metrics.followerGrowth)}%
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-white">{metrics.totalFollowers.toLocaleString()}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Followers</p>
            </CardContent>
          </Card>

          {/* Views */}
          <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <Eye className="w-4 h-4 text-purple-400" />
                {metrics.viewGrowth !== 0 && (
                  <span className={`text-xs flex items-center gap-0.5 font-medium ${metrics.viewGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {metrics.viewGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(metrics.viewGrowth)}%
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-white">{metrics.totalViews.toLocaleString()}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Total Views</p>
            </CardContent>
          </Card>

          {/* Interactions */}
          <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <Heart className="w-4 h-4 text-pink-400" />
                {metrics.interactionGrowth !== 0 && (
                  <span className={`text-xs flex items-center gap-0.5 font-medium ${metrics.interactionGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {metrics.interactionGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(metrics.interactionGrowth)}%
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-white">{metrics.totalInteractions.toLocaleString()}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Interactions</p>
            </CardContent>
          </Card>

          {/* Engagement Rate */}
          <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-xl font-bold text-white">{metrics.engagementRate}%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Engagement</p>
            </CardContent>
          </Card>

          {/* Profile Visits */}
          <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xl font-bold text-white">{metrics.profileVisits.toLocaleString()}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Profile Visits</p>
            </CardContent>
          </Card>

          {/* Accounts Reached */}
          <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xl font-bold text-white">{metrics.accountsReached.toLocaleString()}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Reach</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - 3 Column Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column - Growth Trends */}
          <div className="col-span-2 space-y-4">
            {/* Follower Growth Chart */}
            {timelineData.length > 1 && (
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white">Growth Trends</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        labelStyle={{ color: '#f1f5f9' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Line type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={2} name="Followers" dot={false} />
                      <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} name="Views" dot={false} />
                      <Line type="monotone" dataKey="interactions" stroke="#ec4899" strokeWidth={2} name="Interactions" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Content Performance Comparison */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white">Content Performance</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={contentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="type" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="views" fill="#8b5cf6" name="Views %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="interactions" fill="#ec4899" name="Interactions %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Audience Breakdown Tables */}
            <div className="grid grid-cols-2 gap-4">
              {/* Views Breakdown */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-white uppercase tracking-wide">Views Source</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400">Followers</span>
                        <span className="text-sm font-semibold text-white">{latest.followers_view_pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${latest.followers_view_pct}%` }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400">Non-Followers</span>
                        <span className="text-sm font-semibold text-white">{latest.non_followers_view_pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${latest.non_followers_view_pct}%` }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interactions Breakdown */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-white uppercase tracking-wide">Interaction Source</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400">Followers</span>
                        <span className="text-sm font-semibold text-white">{latest.followers_interaction_pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: `${latest.followers_interaction_pct}%` }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400">Non-Followers</span>
                        <span className="text-sm font-semibold text-white">{latest.non_followers_interaction_pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${latest.non_followers_interaction_pct}%` }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Activity & Insights */}
          <div className="space-y-4">
            {/* Most Active Times */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white">Audience Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Most Active Day</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {latest.most_active_day}
                  </p>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Peak Hour</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {latest.most_active_hour}
                  </p>
                  {latest.most_active_hour_count && (
                    <p className="text-xs text-slate-400 mt-1">{latest.most_active_hour_count} active followers</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Profile Activity */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white">Profile Activity</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Profile Visits</span>
                    <span className="text-lg font-bold text-white">{metrics.profileVisits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Link Taps</span>
                    <span className="text-lg font-bold text-white">{metrics.linkTaps}</span>
                  </div>
                  {latest.profile_activity_score && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                      <span className="text-xs text-slate-400">Activity Score</span>
                      <span className="text-lg font-bold text-green-400">
                        {latest.profile_activity_score}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Content Type Summary */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-white">Content Mix</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Posts</span>
                      <span className="text-slate-300">{latest.posts_view_pct}% views • {latest.posts_interaction_pct}% inter.</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${latest.posts_view_pct}%` }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Reels</span>
                      <span className="text-slate-300">{latest.reels_view_pct}% views • {latest.reels_interaction_pct}% inter.</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: `${latest.reels_view_pct}%` }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Stories</span>
                      <span className="text-slate-300">{latest.stories_view_pct}% views • {latest.stories_interaction_pct}% inter.</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: `${latest.stories_view_pct}%` }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </>
        ) : selectedPlatform === 'facebook' ? (
          /* FACEBOOK-SPECIFIC VIEW */
          <>
            {!latestFb ? (
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-white mb-3">No Facebook Data Yet</h3>
                  <p className="text-sm text-slate-400 mb-4">Add Facebook analytics to see insights</p>
                  <Link to="/hub/upload">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Data
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Top KPI Row - 6 columns */}
                <div className="grid grid-cols-6 gap-3 mb-4">
                  {/* Followers */}
                  <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        {fbMetrics.followerGrowth !== 0 && (
                          <span className={`text-xs flex items-center gap-0.5 font-medium ${fbMetrics.followerGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {fbMetrics.followerGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {Math.abs(fbMetrics.followerGrowth)}%
                          </span>
                        )}
                      </div>
                      <p className="text-xl font-bold text-white">{fbMetrics.totalFollowers.toLocaleString()}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Followers</p>
                    </CardContent>
                  </Card>

                  {/* Net Follows */}
                  <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <p className="text-xl font-bold text-white">{fbMetrics.netFollows.toLocaleString()}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Net Follows</p>
                    </CardContent>
                  </Card>

                  {/* Views */}
                  <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <Eye className="w-4 h-4 text-purple-400" />
                        {fbMetrics.viewGrowth !== 0 && (
                          <span className={`text-xs flex items-center gap-0.5 font-medium ${fbMetrics.viewGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {fbMetrics.viewGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {Math.abs(fbMetrics.viewGrowth)}%
                          </span>
                        )}
                      </div>
                      <p className="text-xl font-bold text-white">{fbMetrics.totalViews.toLocaleString()}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Total Views</p>
                    </CardContent>
                  </Card>

                  {/* Interactions */}
                  <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <Heart className="w-4 h-4 text-pink-400" />
                        {fbMetrics.interactionGrowth !== 0 && (
                          <span className={`text-xs flex items-center gap-0.5 font-medium ${fbMetrics.interactionGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {fbMetrics.interactionGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {Math.abs(fbMetrics.interactionGrowth)}%
                          </span>
                        )}
                      </div>
                      <p className="text-xl font-bold text-white">{fbMetrics.totalInteractions.toLocaleString()}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Interactions</p>
                    </CardContent>
                  </Card>

                  {/* Engagement Rate */}
                  <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <p className="text-xl font-bold text-white">{fbMetrics.engagementRate}%</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Engagement</p>
                    </CardContent>
                  </Card>

                  {/* Reactions */}
                  <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <Heart className="w-4 h-4 text-red-400" />
                      </div>
                      <p className="text-xl font-bold text-white">{fbMetrics.reactionsCount.toLocaleString()}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">Reactions</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Left Column - Demographics & Content */}
                  <div className="col-span-2 space-y-4">
                    {/* Demographics Cards */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Age & Gender */}
                      <Card className="bg-slate-900 border-slate-800">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-400" />
                            <CardTitle className="text-sm font-medium text-white">Age & Gender</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            {latestFb.top_age_gender_1 && (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">{latestFb.top_age_gender_1}</span>
                                <span className="text-sm font-bold text-white">{latestFb.top_age_gender_1_pct}%</span>
                              </div>
                            )}
                            {latestFb.top_age_gender_2 && (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">{latestFb.top_age_gender_2}</span>
                                <span className="text-sm font-bold text-white">{latestFb.top_age_gender_2_pct}%</span>
                              </div>
                            )}
                            {latestFb.top_age_gender_3 && (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">{latestFb.top_age_gender_3}</span>
                                <span className="text-sm font-bold text-white">{latestFb.top_age_gender_3_pct}%</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Countries */}
                      <Card className="bg-slate-900 border-slate-800">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-green-400" />
                            <CardTitle className="text-sm font-medium text-white">Top Countries</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            {latestFb.top_country_1 && (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">{latestFb.top_country_1}</span>
                                <span className="text-sm font-bold text-white">{latestFb.top_country_1_pct}%</span>
                              </div>
                            )}
                            {latestFb.top_country_2 && (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">{latestFb.top_country_2}</span>
                                <span className="text-sm font-bold text-white">{latestFb.top_country_2_pct}%</span>
                              </div>
                            )}
                            {latestFb.top_country_3 && (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">{latestFb.top_country_3}</span>
                                <span className="text-sm font-bold text-white">{latestFb.top_country_3_pct}%</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Cities */}
                      <Card className="bg-slate-900 border-slate-800">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-purple-400" />
                            <CardTitle className="text-sm font-medium text-white">Top Cities</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            {latestFb.top_city_1 && (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">{latestFb.top_city_1}</span>
                                <span className="text-sm font-bold text-white">{latestFb.top_city_1_pct}%</span>
                              </div>
                            )}
                            {latestFb.top_city_2 && (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">{latestFb.top_city_2}</span>
                                <span className="text-sm font-bold text-white">{latestFb.top_city_2_pct}%</span>
                              </div>
                            )}
                            {latestFb.top_city_3 && (
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">{latestFb.top_city_3}</span>
                                <span className="text-sm font-bold text-white">{latestFb.top_city_3_pct}%</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Content Type Performance */}
                    <Card className="bg-slate-900 border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-white">Views by Content Type</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {latestFb.views_multi_photo_pct && (
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">Multi Photo</span>
                                <span className="text-white">{latestFb.views_multi_photo_pct}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${latestFb.views_multi_photo_pct}%` }} />
                              </div>
                            </div>
                          )}
                          {latestFb.views_video_pct && (
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">Video</span>
                                <span className="text-white">{latestFb.views_video_pct}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: `${latestFb.views_video_pct}%` }} />
                              </div>
                            </div>
                          )}
                          {latestFb.views_multi_media_pct && (
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">Multi Media</span>
                                <span className="text-white">{latestFb.views_multi_media_pct}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500" style={{ width: `${latestFb.views_multi_media_pct}%` }} />
                              </div>
                            </div>
                          )}
                          {latestFb.views_photo_pct && (
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">Photo</span>
                                <span className="text-white">{latestFb.views_photo_pct}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: `${latestFb.views_photo_pct}%` }} />
                              </div>
                            </div>
                          )}
                          {latestFb.views_reel_pct && (
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">Reel</span>
                                <span className="text-white">{latestFb.views_reel_pct}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500" style={{ width: `${latestFb.views_reel_pct}%` }} />
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Audience Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Views Breakdown */}
                      <Card className="bg-slate-900 border-slate-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xs font-medium text-white uppercase tracking-wide">Views by Audience</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-slate-400">Followers</span>
                                <span className="text-sm font-semibold text-white">{latestFb.views_followers_pct}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${latestFb.views_followers_pct}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-slate-400">Non-Followers</span>
                                <span className="text-sm font-semibold text-white">{latestFb.views_non_followers_pct}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: `${latestFb.views_non_followers_pct}%` }} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Interactions Breakdown */}
                      <Card className="bg-slate-900 border-slate-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xs font-medium text-white uppercase tracking-wide">Interactions by Audience</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-slate-400">Followers</span>
                                <span className="text-sm font-semibold text-white">{latestFb.interactions_followers_pct}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500" style={{ width: `${latestFb.interactions_followers_pct}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-slate-400">Non-Followers</span>
                                <span className="text-sm font-semibold text-white">{latestFb.interactions_non_followers_pct}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: `${latestFb.interactions_non_followers_pct}%` }} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Right Column - View Quality & Interaction Details */}
                  <div className="space-y-4">
                    {/* View Quality */}
                    <Card className="bg-slate-900 border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-white">View Quality</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                            <div className="flex items-center gap-2 mb-1">
                              <Eye className="w-4 h-4 text-purple-400" />
                              <span className="text-xs text-slate-400 uppercase tracking-wide">Total Views</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{fbMetrics.totalViews.toLocaleString()}</p>
                          </div>
                          <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4 text-cyan-400" />
                              <span className="text-xs text-slate-400 uppercase tracking-wide">3-Second Views</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{latestFb.views_3_second || 0}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {fbMetrics.totalViews > 0 ? ((latestFb.views_3_second || 0) / fbMetrics.totalViews * 100).toFixed(1) : 0}% retention
                            </p>
                          </div>
                          <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4 text-green-400" />
                              <span className="text-xs text-slate-400 uppercase tracking-wide">1-Minute Views</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{latestFb.views_1_minute || 0}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {fbMetrics.totalViews > 0 ? ((latestFb.views_1_minute || 0) / fbMetrics.totalViews * 100).toFixed(1) : 0}% retention
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Interaction Breakdown */}
                    <Card className="bg-slate-900 border-slate-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-white">Interaction Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">Reactions</span>
                            <span className="text-lg font-bold text-white">{fbMetrics.reactionsCount}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">Comments</span>
                            <span className="text-lg font-bold text-white">{fbMetrics.commentsCount}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">Shares</span>
                            <span className="text-lg font-bold text-white">{fbMetrics.sharesCount}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                            <span className="text-xs text-slate-400">Total</span>
                            <span className="text-lg font-bold text-green-400">{fbMetrics.totalInteractions}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Follows Source */}
                    {(latestFb.follows_from_posts_pct || latestFb.follows_from_videos_pct) && (
                      <Card className="bg-slate-900 border-slate-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-white">Follows Source</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {latestFb.follows_from_posts_pct && (
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-slate-400">From Posts</span>
                                  <span className="text-white">{latestFb.follows_from_posts_pct}%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-500" style={{ width: `${latestFb.follows_from_posts_pct}%` }} />
                                </div>
                              </div>
                            )}
                            {latestFb.follows_from_videos_pct && (
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-slate-400">From Videos</span>
                                  <span className="text-white">{latestFb.follows_from_videos_pct}%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-purple-500" style={{ width: `${latestFb.follows_from_videos_pct}%` }} />
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        ) : selectedPlatform === 'threads' ? (
          /* THREADS-SPECIFIC VIEW */
          <>
            {!latestThreads ? (
              <div className="text-center py-12">
                <AtSign className="w-12 h-12 mx-auto text-slate-700 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No Threads Data Yet</h3>
                <p className="text-slate-400 mb-6">Start tracking your Threads analytics</p>
                <Link to="/hub/upload">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Add Threads Data
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* KPIs Grid */}
                <div className="grid grid-cols-6 gap-4 mb-6">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Followers</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{threadsMetrics.totalFollowers.toLocaleString()}</p>
                      {threadsMetrics.followerGrowth !== 0 && (
                        <p className={`text-xs mt-1 flex items-center gap-1 ${threadsMetrics.followerGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {threadsMetrics.followerGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(threadsMetrics.followerGrowth)}%
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Growth</span>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {latestThreads.follower_growth > 0 ? '+' : ''}{latestThreads.follower_growth || 0}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Period change</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Eye className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Views</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{threadsMetrics.totalViews.toLocaleString()}</p>
                      {threadsMetrics.viewGrowth !== 0 && (
                        <p className={`text-xs mt-1 flex items-center gap-1 ${threadsMetrics.viewGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {threadsMetrics.viewGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(threadsMetrics.viewGrowth)}%
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="w-4 h-4 text-pink-400" />
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Interactions</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{threadsMetrics.totalInteractions.toLocaleString()}</p>
                      {threadsMetrics.interactionGrowth !== 0 && (
                        <p className={`text-xs mt-1 flex items-center gap-1 ${threadsMetrics.interactionGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {threadsMetrics.interactionGrowth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(threadsMetrics.interactionGrowth)}%
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Engagement</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{threadsMetrics.engagementRate.toFixed(2)}%</p>
                      <p className="text-xs text-slate-400 mt-1">Rate</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Likes</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{threadsMetrics.likesCount.toLocaleString()}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {threadsMetrics.totalInteractions > 0 ? ((threadsMetrics.likesCount / threadsMetrics.totalInteractions) * 100).toFixed(1) : 0}% of total
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Views by Source */}
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                        <Eye className="w-4 h-4 text-cyan-400" />
                        Views by Source
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {latestThreads.views_home_pct != null && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400">Home</span>
                              <span className="text-white">{latestThreads.views_home_pct}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500" style={{ width: `${latestThreads.views_home_pct}%` }} />
                            </div>
                          </div>
                        )}
                        {latestThreads.views_instagram_pct != null && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400">Instagram</span>
                              <span className="text-white">{latestThreads.views_instagram_pct}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-pink-500" style={{ width: `${latestThreads.views_instagram_pct}%` }} />
                            </div>
                          </div>
                        )}
                        {latestThreads.views_activity_tab_pct != null && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400">Activity Tab</span>
                              <span className="text-white">{latestThreads.views_activity_tab_pct}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-cyan-500" style={{ width: `${latestThreads.views_activity_tab_pct}%` }} />
                            </div>
                          </div>
                        )}
                        {latestThreads.views_search_pct != null && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400">Search</span>
                              <span className="text-white">{latestThreads.views_search_pct}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: `${latestThreads.views_search_pct}%` }} />
                            </div>
                          </div>
                        )}
                        {latestThreads.views_other_pct != null && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400">Other</span>
                              <span className="text-white">{latestThreads.views_other_pct}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-slate-600" style={{ width: `${latestThreads.views_other_pct}%` }} />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Interaction Breakdown */}
                  <Card className="bg-slate-900 border-slate-800 col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-400" />
                        Interaction Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <Heart className="w-4 h-4 text-red-400" />
                              <span className="text-xs text-slate-400 uppercase tracking-wide">Likes</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{threadsMetrics.likesCount.toLocaleString()}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {threadsMetrics.totalInteractions > 0 ? ((threadsMetrics.likesCount / threadsMetrics.totalInteractions) * 100).toFixed(1) : 0}% of interactions
                            </p>
                          </div>

                          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle className="w-4 h-4 text-cyan-400" />
                              <span className="text-xs text-slate-400 uppercase tracking-wide">Quotes</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{threadsMetrics.quotesCount.toLocaleString()}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {threadsMetrics.totalInteractions > 0 ? ((threadsMetrics.quotesCount / threadsMetrics.totalInteractions) * 100).toFixed(1) : 0}% of interactions
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle className="w-4 h-4 text-green-400" />
                              <span className="text-xs text-slate-400 uppercase tracking-wide">Replies</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{threadsMetrics.repliesCount.toLocaleString()}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {threadsMetrics.totalInteractions > 0 ? ((threadsMetrics.repliesCount / threadsMetrics.totalInteractions) * 100).toFixed(1) : 0}% of interactions
                            </p>
                          </div>

                          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <Repeat className="w-4 h-4 text-purple-400" />
                              <span className="text-xs text-slate-400 uppercase tracking-wide">Reposts</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{threadsMetrics.repostsCount.toLocaleString()}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {threadsMetrics.totalInteractions > 0 ? ((threadsMetrics.repostsCount / threadsMetrics.totalInteractions) * 100).toFixed(1) : 0}% of interactions
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </>
        ) : selectedPlatform === 'tiktok' ? (
          /* TIKTOK-SPECIFIC VIEW */
          <>
            {!latestTikTokOverview && tiktokContent.length === 0 ? (
              <div className="text-center py-12">
                <Music className="w-12 h-12 mx-auto text-slate-700 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No TikTok Data Yet</h3>
                <p className="text-slate-400 mb-6">Start tracking your TikTok analytics by uploading your CSVs</p>
                <Link to="/hub/upload">
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload TikTok Data
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* KPIs Grid - 8 cards */}
                <div className="grid grid-cols-8 gap-3 mb-6">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Video Views</span>
                      </div>
                      <p className="text-xl font-bold text-white">{tiktokMetrics.totalVideoViews.toLocaleString()}</p>
                      {tiktokMetrics.videoViewGrowth !== 0 && (
                        <p className={`text-[10px] mt-1 flex items-center gap-1 ${tiktokMetrics.videoViewGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tiktokMetrics.videoViewGrowth > 0 ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
                          {Math.abs(tiktokMetrics.videoViewGrowth)}%
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-3 h-3 text-purple-400" />
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Profile Views</span>
                      </div>
                      <p className="text-xl font-bold text-white">{tiktokMetrics.totalProfileViews.toLocaleString()}</p>
                      {tiktokMetrics.profileViewGrowth !== 0 && (
                        <p className={`text-[10px] mt-1 flex items-center gap-1 ${tiktokMetrics.profileViewGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tiktokMetrics.profileViewGrowth > 0 ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
                          {Math.abs(tiktokMetrics.profileViewGrowth)}%
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="w-3 h-3 text-red-400" />
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Likes</span>
                      </div>
                      <p className="text-xl font-bold text-white">{tiktokMetrics.totalLikes.toLocaleString()}</p>
                      {tiktokMetrics.likesGrowth !== 0 && (
                        <p className={`text-[10px] mt-1 flex items-center gap-1 ${tiktokMetrics.likesGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tiktokMetrics.likesGrowth > 0 ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
                          {Math.abs(tiktokMetrics.likesGrowth)}%
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageCircle className="w-3 h-3 text-green-400" />
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Comments</span>
                      </div>
                      <p className="text-xl font-bold text-white">{tiktokMetrics.totalComments.toLocaleString()}</p>
                      {tiktokMetrics.commentsGrowth !== 0 && (
                        <p className={`text-[10px] mt-1 flex items-center gap-1 ${tiktokMetrics.commentsGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tiktokMetrics.commentsGrowth > 0 ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
                          {Math.abs(tiktokMetrics.commentsGrowth)}%
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Repeat className="w-3 h-3 text-blue-400" />
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Shares</span>
                      </div>
                      <p className="text-xl font-bold text-white">{tiktokMetrics.totalShares.toLocaleString()}</p>
                      {tiktokMetrics.sharesGrowth !== 0 && (
                        <p className={`text-[10px] mt-1 flex items-center gap-1 ${tiktokMetrics.sharesGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tiktokMetrics.sharesGrowth > 0 ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
                          {Math.abs(tiktokMetrics.sharesGrowth)}%
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-3 h-3 text-amber-400" />
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Engagement</span>
                      </div>
                      <p className="text-xl font-bold text-white">{tiktokMetrics.totalEngagement.toLocaleString()}</p>
                      {tiktokMetrics.engagementGrowth !== 0 && (
                        <p className={`text-[10px] mt-1 flex items-center gap-1 ${tiktokMetrics.engagementGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tiktokMetrics.engagementGrowth > 0 ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
                          {Math.abs(tiktokMetrics.engagementGrowth)}%
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-3 h-3 text-pink-400" />
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Followers</span>
                      </div>
                      <p className="text-xl font-bold text-white">{tiktokMetrics.totalFollowers.toLocaleString()}</p>
                      {tiktokMetrics.followerGrowth !== 0 && (
                        <p className={`text-[10px] mt-1 flex items-center gap-1 ${tiktokMetrics.followerGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tiktokMetrics.followerGrowth > 0 ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
                          {Math.abs(tiktokMetrics.followerGrowth)}%
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Music className="w-3 h-3 text-indigo-400" />
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Videos</span>
                      </div>
                      <p className="text-xl font-bold text-white">{tiktokMetrics.totalVideos}</p>
                      <p className="text-[10px] text-slate-400 mt-1">Total posts</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Videos & Follower Growth */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {/* Top Performing Videos */}
                  <Card className="bg-slate-900 border-slate-800 col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        Top Performing Videos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {tiktokContent.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-4">No video data yet</p>
                      ) : (
                        <div className="space-y-2">
                          {tiktokContent.slice(0, 5).map((video, index) => (
                            <div key={video.id} className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                                  {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <a 
                                    href={video.video_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs font-medium text-white hover:text-cyan-400 block truncate"
                                  >
                                    {video.video_title}
                                  </a>
                                  <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
                                    <span className="flex items-center gap-1">
                                      <Eye className="w-3 h-3" /> {video.total_views.toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Heart className="w-3 h-3" /> {video.total_likes.toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MessageCircle className="w-3 h-3" /> {video.total_comments.toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Repeat className="w-3 h-3" /> {video.total_shares.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs font-bold text-green-400">{video.engagement_rate.toFixed(1)}%</p>
                                  <p className="text-[10px] text-slate-400">ER</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Follower Growth Chart */}
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-pink-400" />
                        Follower Growth
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {tiktokFollowers.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-4">No follower data yet</p>
                      ) : (
                        <div className="space-y-3">
                          {tiktokFollowers.slice(-7).map((day) => (
                            <div key={day.id} className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-400">
                                {new Date(day.snapshot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-white">{day.total_followers.toLocaleString()}</span>
                                {day.followers_gained !== 0 && (
                                  <span className={`text-[10px] flex items-center gap-0.5 ${day.followers_gained > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {day.followers_gained > 0 ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
                                    {Math.abs(day.followers_gained)}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Audience & Demographics */}
                <div className="grid grid-cols-4 gap-6 mb-6">
                  {/* Audience Composition */}
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        Audience
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {tiktokViewers.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-4">No viewer data yet</p>
                      ) : (
                        <div className="space-y-4">
                          {(() => {
                            const latestViewer = tiktokViewers[tiktokViewers.length - 1];
                            return (
                              <>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-400">New Viewers</span>
                                    <span className="text-white">{latestViewer.new_viewers_pct.toFixed(1)}%</span>
                                  </div>
                                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-500" style={{ width: `${latestViewer.new_viewers_pct}%` }} />
                                  </div>
                                  <p className="text-[10px] text-slate-400 mt-1">{latestViewer.new_viewers.toLocaleString()} viewers</p>
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-400">Returning Viewers</span>
                                    <span className="text-white">{latestViewer.returning_viewers_pct.toFixed(1)}%</span>
                                  </div>
                                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500" style={{ width: `${latestViewer.returning_viewers_pct}%` }} />
                                  </div>
                                  <p className="text-[10px] text-slate-400 mt-1">{latestViewer.returning_viewers.toLocaleString()} viewers</p>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Gender Demographics */}
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-pink-400" />
                        Gender
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {tiktokGender.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-4">No gender data yet</p>
                      ) : (
                        <div className="space-y-3">
                          {tiktokGender.map((demo) => (
                            <div key={demo.id}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">{demo.gender}</span>
                                <span className="text-white">{demo.distribution_pct.toFixed(1)}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500" 
                                  style={{ width: `${demo.distribution_pct}%` }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Top Territories */}
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        Top Territories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {tiktokTerritory.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-4">No territory data yet</p>
                      ) : (
                        <div className="space-y-2">
                          {tiktokTerritory.slice(0, 5).map((terr) => (
                            <div key={terr.id} className="flex items-center justify-between">
                              <span className="text-xs text-slate-300">{terr.territory}</span>
                              <span className="text-xs font-medium text-white">{terr.distribution_pct.toFixed(1)}%</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Best Times to Post */}
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        Best Times
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {tiktokActiveHours.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-4">No activity data yet</p>
                      ) : (
                        <div className="space-y-2">
                          {tiktokActiveHours
                            .sort((a, b) => b.active_followers - a.active_followers)
                            .slice(0, 5)
                            .map((hour) => (
                              <div key={hour.id} className="flex items-center justify-between">
                                <span className="text-xs text-slate-300">
                                  {hour.hour.toString().padStart(2, '0')}:00
                                </span>
                                <div className="flex items-center gap-2">
                                  <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-amber-500" 
                                      style={{ 
                                        width: `${(hour.active_followers / Math.max(...tiktokActiveHours.map(h => h.active_followers))) * 100}%` 
                                      }} 
                                    />
                                  </div>
                                  <span className="text-xs font-medium text-white w-12 text-right">
                                    {hour.active_followers.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </>
        ) : null}
      </main>
    </div>
  );
};

export default UnifiedAnalyticsDashboard;
