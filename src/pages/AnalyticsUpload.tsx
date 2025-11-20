import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Upload, Check, X, FileJson, Instagram, Save, Facebook, AtSign, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateSocialStats, createSocialStatsData, supabase } from "@/lib/supabase";

interface UploadResult {
  platform: string;
  success: boolean;
  error?: string;
}

const AnalyticsUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [jsonPreview, setJsonPreview] = useState<string>("");
  
  // Instagram form state
  const [instagramData, setInstagramData] = useState({
    snapshot_date: new Date().toISOString().split('T')[0],
    profile_activity_score: '',
    profile_visits: '',
    external_link_taps: '',
    followers_count: '',
    most_active_day: '',
    most_active_hour: '',
    most_active_hour_count: '',
    total_views: '',
    accounts_reached: '',
    followers_view_pct: '',
    non_followers_view_pct: '',
    posts_view_pct: '',
    reels_view_pct: '',
    stories_view_pct: '',
    interactions_total: '',
    followers_interaction_pct: '',
    non_followers_interaction_pct: '',
    posts_interaction_pct: '',
    reels_interaction_pct: '',
    stories_interaction_pct: '',
    notes: ''
  });
  const [instagramSaving, setInstagramSaving] = useState(false);
  const [instagramSuccess, setInstagramSuccess] = useState(false);
  const [instagramError, setInstagramError] = useState<string | null>(null);

  // Facebook form state
  const [facebookData, setFacebookData] = useState({
    snapshot_date: new Date().toISOString().split('T')[0],
    total_followers: '',
    net_follows: '',
    unfollows: '',
    follows_from_posts_pct: '',
    follows_from_videos_pct: '',
    top_age_gender_1: '',
    top_age_gender_1_pct: '',
    top_age_gender_2: '',
    top_age_gender_2_pct: '',
    top_age_gender_3: '',
    top_age_gender_3_pct: '',
    top_country_1: '',
    top_country_1_pct: '',
    top_country_2: '',
    top_country_2_pct: '',
    top_country_3: '',
    top_country_3_pct: '',
    top_city_1: '',
    top_city_1_pct: '',
    top_city_2: '',
    top_city_2_pct: '',
    top_city_3: '',
    top_city_3_pct: '',
    total_views: '',
    views_3_second: '',
    views_1_minute: '',
    views_multi_photo_pct: '',
    views_video_pct: '',
    views_multi_media_pct: '',
    views_photo_pct: '',
    views_reel_pct: '',
    views_followers_pct: '',
    views_non_followers_pct: '',
    total_interactions: '',
    reactions_count: '',
    comments_count: '',
    shares_count: '',
    interactions_followers_pct: '',
    interactions_non_followers_pct: '',
    notes: ''
  });
  const [facebookSaving, setFacebookSaving] = useState(false);
  const [facebookSuccess, setFacebookSuccess] = useState(false);
  const [facebookError, setFacebookError] = useState<string | null>(null);

  // Threads form state
  const [threadsData, setThreadsData] = useState({
    snapshot_date: new Date().toISOString().split('T')[0],
    total_followers: '',
    follower_growth: '',
    total_views: '',
    views_home_pct: '',
    views_instagram_pct: '',
    views_activity_tab_pct: '',
    views_search_pct: '',
    views_other_pct: '',
    total_interactions: '',
    likes_count: '',
    quotes_count: '',
    replies_count: '',
    reposts_count: '',
    notes: ''
  });
  const [threadsSaving, setThreadsSaving] = useState(false);
  const [threadsSuccess, setThreadsSuccess] = useState(false);
  const [threadsError, setThreadsError] = useState<string | null>(null);

  // TikTok multi-CSV state
  const [tiktokSaving, setTiktokSaving] = useState(false);
  const [tiktokSuccess, setTiktokSuccess] = useState(false);
  const [tiktokError, setTiktokError] = useState<string | null>(null);
  
  // Individual CSV states
  const [tiktokCsvs, setTiktokCsvs] = useState({
    overview: { file: null as File | null, data: [] as any[], uploaded: false },
    content: { file: null as File | null, data: [] as any[], uploaded: false },
    viewers: { file: null as File | null, data: [] as any[], uploaded: false },
    followers: { file: null as File | null, data: [] as any[], uploaded: false },
    gender: { file: null as File | null, data: [] as any[], uploaded: false },
    territory: { file: null as File | null, data: [] as any[], uploaded: false },
    hours: { file: null as File | null, data: [] as any[], uploaded: false }
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setResults([]);

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      setJsonPreview(JSON.stringify(data, null, 2));

      // Handle array or single object
      const dataArray = Array.isArray(data) ? data : [data];
      const uploadResults: UploadResult[] = [];

      for (const item of dataArray) {
        try {
          // Validate required fields
          if (!item.platform || !item.followers || item.engagement_rate === undefined) {
            uploadResults.push({
              platform: item.platform || 'Unknown',
              success: false,
              error: 'Missing required fields (platform, followers, engagement_rate)'
            });
            continue;
          }

          // Create properly formatted data
          const statsData = createSocialStatsData({
            platform: item.platform,
            followers: item.followers,
            posts: item.posts || 0,
            likes: item.likes || 0,
            comments: item.comments || 0,
            shares: item.shares || 0,
            views: item.views || 0,
            engagement_rate: item.engagement_rate,
            top_post_url: item.top_post_url,
            date: item.date // If not provided, will use today
          });

          const success = await updateSocialStats(statsData);
          
          uploadResults.push({
            platform: item.platform,
            success,
            error: success ? undefined : 'Failed to insert into database'
          });
        } catch (error) {
          uploadResults.push({
            platform: item.platform || 'Unknown',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      setResults(uploadResults);
    } catch (error) {
      setResults([{
        platform: 'File',
        success: false,
        error: error instanceof Error ? error.message : 'Invalid JSON file'
      }]);
    } finally {
      setUploading(false);
    }
  };

  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;

  const handleInstagramSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInstagramSaving(true);
    setInstagramError(null);

    try {
      const payload = {
        snapshot_date: instagramData.snapshot_date,
        profile_activity_score: instagramData.profile_activity_score ? parseInt(instagramData.profile_activity_score) : null,
        profile_visits: instagramData.profile_visits ? parseInt(instagramData.profile_visits) : null,
        external_link_taps: instagramData.external_link_taps ? parseInt(instagramData.external_link_taps) : null,
        followers_count: parseInt(instagramData.followers_count),
        most_active_day: instagramData.most_active_day || null,
        most_active_hour: instagramData.most_active_hour || null,
        most_active_hour_count: instagramData.most_active_hour_count ? parseInt(instagramData.most_active_hour_count) : null,
        total_views: instagramData.total_views ? parseInt(instagramData.total_views) : null,
        accounts_reached: instagramData.accounts_reached ? parseInt(instagramData.accounts_reached) : null,
        followers_view_pct: instagramData.followers_view_pct ? parseFloat(instagramData.followers_view_pct) : null,
        non_followers_view_pct: instagramData.non_followers_view_pct ? parseFloat(instagramData.non_followers_view_pct) : null,
        posts_view_pct: instagramData.posts_view_pct ? parseFloat(instagramData.posts_view_pct) : null,
        reels_view_pct: instagramData.reels_view_pct ? parseFloat(instagramData.reels_view_pct) : null,
        stories_view_pct: instagramData.stories_view_pct ? parseFloat(instagramData.stories_view_pct) : null,
        interactions_total: instagramData.interactions_total ? parseInt(instagramData.interactions_total) : null,
        followers_interaction_pct: instagramData.followers_interaction_pct ? parseFloat(instagramData.followers_interaction_pct) : null,
        non_followers_interaction_pct: instagramData.non_followers_interaction_pct ? parseFloat(instagramData.non_followers_interaction_pct) : null,
        posts_interaction_pct: instagramData.posts_interaction_pct ? parseFloat(instagramData.posts_interaction_pct) : null,
        reels_interaction_pct: instagramData.reels_interaction_pct ? parseFloat(instagramData.reels_interaction_pct) : null,
        stories_interaction_pct: instagramData.stories_interaction_pct ? parseFloat(instagramData.stories_interaction_pct) : null,
        notes: instagramData.notes || null
      };

      const { error } = await supabase
        .from('instagram_analytics')
        .upsert(payload, { onConflict: 'snapshot_date' });

      if (error) throw error;

      setInstagramSuccess(true);
      setTimeout(() => {
        setInstagramSuccess(false);
        // Reset form
        setInstagramData({
          snapshot_date: new Date().toISOString().split('T')[0],
          profile_activity_score: '',
          profile_visits: '',
          external_link_taps: '',
          followers_count: '',
          most_active_day: '',
          most_active_hour: '',
          most_active_hour_count: '',
          total_views: '',
          accounts_reached: '',
          followers_view_pct: '',
          non_followers_view_pct: '',
          posts_view_pct: '',
          reels_view_pct: '',
          stories_view_pct: '',
          interactions_total: '',
          followers_interaction_pct: '',
          non_followers_interaction_pct: '',
          posts_interaction_pct: '',
          reels_interaction_pct: '',
          stories_interaction_pct: '',
          notes: ''
        });
      }, 2000);
    } catch (error) {
      setInstagramError(error instanceof Error ? error.message : 'Failed to save');
      console.error('Instagram save error:', error);
    } finally {
      setInstagramSaving(false);
    }
  };

  const handleFacebookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFacebookSaving(true);
    setFacebookError(null);

    try {
      // Calculate engagement rate
      const followers = parseInt(facebookData.total_followers);
      const interactions = facebookData.total_interactions ? parseInt(facebookData.total_interactions) : 0;
      const engagementRate = followers > 0 ? ((interactions / followers) * 100).toFixed(2) : null;

      const payload = {
        snapshot_date: facebookData.snapshot_date,
        total_followers: followers,
        net_follows: facebookData.net_follows ? parseInt(facebookData.net_follows) : null,
        unfollows: facebookData.unfollows ? parseInt(facebookData.unfollows) : null,
        follows_from_posts_pct: facebookData.follows_from_posts_pct ? parseFloat(facebookData.follows_from_posts_pct) : null,
        follows_from_videos_pct: facebookData.follows_from_videos_pct ? parseFloat(facebookData.follows_from_videos_pct) : null,
        top_age_gender_1: facebookData.top_age_gender_1 || null,
        top_age_gender_1_pct: facebookData.top_age_gender_1_pct ? parseFloat(facebookData.top_age_gender_1_pct) : null,
        top_age_gender_2: facebookData.top_age_gender_2 || null,
        top_age_gender_2_pct: facebookData.top_age_gender_2_pct ? parseFloat(facebookData.top_age_gender_2_pct) : null,
        top_age_gender_3: facebookData.top_age_gender_3 || null,
        top_age_gender_3_pct: facebookData.top_age_gender_3_pct ? parseFloat(facebookData.top_age_gender_3_pct) : null,
        top_country_1: facebookData.top_country_1 || null,
        top_country_1_pct: facebookData.top_country_1_pct ? parseFloat(facebookData.top_country_1_pct) : null,
        top_country_2: facebookData.top_country_2 || null,
        top_country_2_pct: facebookData.top_country_2_pct ? parseFloat(facebookData.top_country_2_pct) : null,
        top_country_3: facebookData.top_country_3 || null,
        top_country_3_pct: facebookData.top_country_3_pct ? parseFloat(facebookData.top_country_3_pct) : null,
        top_city_1: facebookData.top_city_1 || null,
        top_city_1_pct: facebookData.top_city_1_pct ? parseFloat(facebookData.top_city_1_pct) : null,
        top_city_2: facebookData.top_city_2 || null,
        top_city_2_pct: facebookData.top_city_2_pct ? parseFloat(facebookData.top_city_2_pct) : null,
        top_city_3: facebookData.top_city_3 || null,
        top_city_3_pct: facebookData.top_city_3_pct ? parseFloat(facebookData.top_city_3_pct) : null,
        total_views: facebookData.total_views ? parseInt(facebookData.total_views) : null,
        views_3_second: facebookData.views_3_second ? parseInt(facebookData.views_3_second) : null,
        views_1_minute: facebookData.views_1_minute ? parseInt(facebookData.views_1_minute) : null,
        views_multi_photo_pct: facebookData.views_multi_photo_pct ? parseFloat(facebookData.views_multi_photo_pct) : null,
        views_video_pct: facebookData.views_video_pct ? parseFloat(facebookData.views_video_pct) : null,
        views_multi_media_pct: facebookData.views_multi_media_pct ? parseFloat(facebookData.views_multi_media_pct) : null,
        views_photo_pct: facebookData.views_photo_pct ? parseFloat(facebookData.views_photo_pct) : null,
        views_reel_pct: facebookData.views_reel_pct ? parseFloat(facebookData.views_reel_pct) : null,
        views_followers_pct: facebookData.views_followers_pct ? parseFloat(facebookData.views_followers_pct) : null,
        views_non_followers_pct: facebookData.views_non_followers_pct ? parseFloat(facebookData.views_non_followers_pct) : null,
        total_interactions: interactions || null,
        reactions_count: facebookData.reactions_count ? parseInt(facebookData.reactions_count) : null,
        comments_count: facebookData.comments_count ? parseInt(facebookData.comments_count) : null,
        shares_count: facebookData.shares_count ? parseInt(facebookData.shares_count) : null,
        interactions_followers_pct: facebookData.interactions_followers_pct ? parseFloat(facebookData.interactions_followers_pct) : null,
        interactions_non_followers_pct: facebookData.interactions_non_followers_pct ? parseFloat(facebookData.interactions_non_followers_pct) : null,
        engagement_rate: engagementRate ? parseFloat(engagementRate) : null,
        notes: facebookData.notes || null
      };

      const { error } = await supabase
        .from('facebook_analytics')
        .upsert(payload, { onConflict: 'snapshot_date' });

      if (error) throw error;

      setFacebookSuccess(true);
      setTimeout(() => {
        setFacebookSuccess(false);
        // Reset form
        setFacebookData({
          snapshot_date: new Date().toISOString().split('T')[0],
          total_followers: '',
          net_follows: '',
          unfollows: '',
          follows_from_posts_pct: '',
          follows_from_videos_pct: '',
          top_age_gender_1: '',
          top_age_gender_1_pct: '',
          top_age_gender_2: '',
          top_age_gender_2_pct: '',
          top_age_gender_3: '',
          top_age_gender_3_pct: '',
          top_country_1: '',
          top_country_1_pct: '',
          top_country_2: '',
          top_country_2_pct: '',
          top_country_3: '',
          top_country_3_pct: '',
          top_city_1: '',
          top_city_1_pct: '',
          top_city_2: '',
          top_city_2_pct: '',
          top_city_3: '',
          top_city_3_pct: '',
          total_views: '',
          views_3_second: '',
          views_1_minute: '',
          views_multi_photo_pct: '',
          views_video_pct: '',
          views_multi_media_pct: '',
          views_photo_pct: '',
          views_reel_pct: '',
          views_followers_pct: '',
          views_non_followers_pct: '',
          total_interactions: '',
          reactions_count: '',
          comments_count: '',
          shares_count: '',
          interactions_followers_pct: '',
          interactions_non_followers_pct: '',
          notes: ''
        });
      }, 2000);
    } catch (error) {
      setFacebookError(error instanceof Error ? error.message : 'Failed to save');
      console.error('Facebook save error:', error);
    } finally {
      setFacebookSaving(false);
    }
  };

  const handleThreadsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setThreadsSaving(true);
    setThreadsError(null);

    try {
      // Calculate engagement rate
      const followers = parseInt(threadsData.total_followers);
      const interactions = threadsData.total_interactions ? parseInt(threadsData.total_interactions) : 0;
      const engagementRate = followers > 0 ? ((interactions / followers) * 100).toFixed(2) : null;

      const payload = {
        snapshot_date: threadsData.snapshot_date,
        total_followers: followers,
        follower_growth: threadsData.follower_growth ? parseInt(threadsData.follower_growth) : null,
        total_views: threadsData.total_views ? parseInt(threadsData.total_views) : null,
        views_home_pct: threadsData.views_home_pct ? parseFloat(threadsData.views_home_pct) : null,
        views_instagram_pct: threadsData.views_instagram_pct ? parseFloat(threadsData.views_instagram_pct) : null,
        views_activity_tab_pct: threadsData.views_activity_tab_pct ? parseFloat(threadsData.views_activity_tab_pct) : null,
        views_search_pct: threadsData.views_search_pct ? parseFloat(threadsData.views_search_pct) : null,
        views_other_pct: threadsData.views_other_pct ? parseFloat(threadsData.views_other_pct) : null,
        total_interactions: interactions || null,
        likes_count: threadsData.likes_count ? parseInt(threadsData.likes_count) : null,
        quotes_count: threadsData.quotes_count ? parseInt(threadsData.quotes_count) : null,
        replies_count: threadsData.replies_count ? parseInt(threadsData.replies_count) : null,
        reposts_count: threadsData.reposts_count ? parseInt(threadsData.reposts_count) : null,
        engagement_rate: engagementRate ? parseFloat(engagementRate) : null,
        notes: threadsData.notes || null
      };

      const { error } = await supabase
        .from('threads_analytics')
        .upsert(payload, { onConflict: 'snapshot_date' });

      if (error) throw error;

      setThreadsSuccess(true);
      setTimeout(() => {
        setThreadsSuccess(false);
        // Reset form
        setThreadsData({
          snapshot_date: new Date().toISOString().split('T')[0],
          total_followers: '',
          follower_growth: '',
          total_views: '',
          views_home_pct: '',
          views_instagram_pct: '',
          views_activity_tab_pct: '',
          views_search_pct: '',
          views_other_pct: '',
          total_interactions: '',
          likes_count: '',
          quotes_count: '',
          replies_count: '',
          reposts_count: '',
          notes: ''
        });
      }, 2000);
    } catch (error) {
      setThreadsError(error instanceof Error ? error.message : 'Failed to save');
      console.error('Threads save error:', error);
    } finally {
      setThreadsSaving(false);
    }
  };

  // TikTok Multi-CSV Handler
  const identifyTiktokCsvType = (headers: string[]): string | null => {
    const h = headers.map(h => h.toLowerCase().trim());
    
    // Overview CSV: Date, Video Views, Profile Views, Likes, Comments, Shares
    if (h.includes('date') && h.includes('video views') && h.includes('profile views') && h.includes('likes')) {
      return 'overview';
    }
    // Content CSV: Time, Video title, Video link, Post time, Total likes, Total comments, Total shares, Total views
    if (h.includes('time') && h.includes('video title') && h.includes('video link') && h.includes('total views')) {
      return 'content';
    }
    // Viewers CSV: Date, Total Viewers, New Viewers, Returning Viewers
    if (h.includes('date') && h.includes('total viewers') && h.includes('new viewers')) {
      return 'viewers';
    }
    // Followers Growth CSV: Date, Followers, Difference in followers from previous day
    if (h.includes('date') && h.includes('followers') && h.includes('difference in followers')) {
      return 'followers';
    }
    // Gender CSV: Gender, Distribution
    if (h.includes('gender') && h.includes('distribution') && !h.includes('date')) {
      return 'gender';
    }
    // Territory CSV: Top territories, Distribution
    if (h.includes('top territories') && h.includes('distribution')) {
      return 'territory';
    }
    // Active Hours CSV: Date, Hour, Active followers
    if (h.includes('date') && h.includes('hour') && h.includes('active followers')) {
      return 'hours';
    }
    
    return null;
  };

  const handleTiktokCsvUpload = (csvType: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        setTiktokError(`${csvType} CSV is empty or invalid`);
        return;
      }

      // Parse CSV
      const headers = lines[0].split(',').map(h => h.trim().replace(/['"]/g, ''));
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/['"]/g, ''));
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        return row;
      });

      // Verify CSV type
      const detectedType = identifyTiktokCsvType(headers);
      if (detectedType && detectedType !== csvType) {
        setTiktokError(`This appears to be a ${detectedType} CSV, not ${csvType}. Please upload the correct file.`);
        return;
      }

      setTiktokCsvs(prev => ({
        ...prev,
        [csvType]: { file, data, uploaded: false }
      }));
      setTiktokError(null);
    };

    reader.onerror = () => {
      setTiktokError(`Failed to read ${csvType} CSV file`);
    };

    reader.readAsText(file);
  };

  const uploadTiktokCsv = async (csvType: string) => {
    const csvData = tiktokCsvs[csvType as keyof typeof tiktokCsvs];
    if (!csvData || csvData.data.length === 0) {
      setTiktokError(`No ${csvType} data to upload - CSV appears to be empty`);
      return;
    }

    // Check if CSV has only headers (no actual data rows)
    const hasData = csvData.data.some(row => {
      const values = Object.values(row);
      return values.some(val => val && val !== '');
    });

    if (!hasData) {
      setTiktokError(`${csvType} CSV contains only headers with no data rows. This CSV is empty from TikTok.`);
      // Mark as "uploaded" since there's nothing to upload
      setTiktokCsvs(prev => ({
        ...prev,
        [csvType]: { ...prev[csvType as keyof typeof prev], uploaded: true }
      }));
      return;
    }

    setTiktokSaving(true);
    setTiktokError(null);

    try {
      let records: any[] = [];
      let tableName = '';
      let conflictColumn = 'snapshot_date';

      // Helper function to parse TikTok date format "October 14" to "2024-10-14"
      const parseTikTokDate = (dateStr: string): string => {
        if (!dateStr) return new Date().toISOString().split('T')[0];
        
        // If already in YYYY-MM-DD format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        
        // Parse "October 14" format
        const year = new Date().getFullYear();
        try {
          const date = new Date(`${dateStr} ${year}`);
          if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
          }
        } catch (e) {
          console.warn('Failed to parse date:', dateStr);
        }
        
        return new Date().toISOString().split('T')[0];
      };

      switch (csvType) {
        case 'overview':
          tableName = 'tiktok_overview';
          records = csvData.data.map(row => ({
            snapshot_date: parseTikTokDate(row['Date'] || row['date']),
            video_views: parseInt(row['Video Views'] || row['video_views'] || '0') || 0,
            profile_views: parseInt(row['Profile Views'] || row['profile_views'] || '0') || 0,
            likes: parseInt(row['Likes'] || row['likes'] || '0') || 0,
            comments: parseInt(row['Comments'] || row['comments'] || '0') || 0,
            shares: parseInt(row['Shares'] || row['shares'] || '0') || 0
          }));
          break;

        case 'content':
          tableName = 'tiktok_content';
          conflictColumn = 'video_title,snapshot_date';
          // Use "Time" column as snapshot date (when data was captured)
          const snapshotDate = parseTikTokDate(csvData.data[0]?.['Time'] || csvData.data[0]?.['time']);
          records = csvData.data.map(row => ({
            video_title: row['Video title'] || row['video_title'] || 'Untitled',
            video_link: row['Video link'] || row['video_link'] || '',
            post_date: row['Post time'] ? parseTikTokDate(row['Post time'].split(' ')[0]) : null,
            post_time: null, // TikTok doesn't provide post time, just date
            snapshot_date: snapshotDate,
            total_likes: parseInt(row['Total likes'] || row['total_likes'] || '0') || 0,
            total_comments: parseInt(row['Total comments'] || row['total_comments'] || '0') || 0,
            total_shares: parseInt(row['Total shares'] || row['total_shares'] || '0') || 0,
            total_views: parseInt(row['Total views'] || row['total_views'] || '0') || 0
          }));
          break;

        case 'viewers':
          tableName = 'tiktok_viewers';
          records = csvData.data.map(row => ({
            snapshot_date: parseTikTokDate(row['Date'] || row['date']),
            total_viewers: parseInt(row['Total Viewers'] || row['Total Viewer'] || row['total_viewers'] || '0') || 0,
            new_viewers: parseInt(row['New Viewers'] || row['New Viewer'] || row['new_viewers'] || '0') || 0,
            returning_viewers: parseInt(row['Returning Viewers'] || row['Returning Viewer'] || row['returning_viewers'] || '0') || 0
          }));
          break;

        case 'followers':
          tableName = 'tiktok_followers';
          records = csvData.data.map(row => ({
            snapshot_date: parseTikTokDate(row['Date'] || row['date']),
            total_followers: parseInt(row['Followers'] || row['followers'] || '0') || 0,
            followers_gained: parseInt(row['Difference in followers from previous day'] || row['followers_gained'] || '0') || 0
          }));
          break;

        case 'gender':
          tableName = 'tiktok_demographics_gender';
          conflictColumn = 'snapshot_date,gender';
          const genderDate = new Date().toISOString().split('T')[0];
          records = csvData.data.map(row => ({
            snapshot_date: genderDate,
            gender: row['Gender'] || row['gender'] || 'Unknown',
            distribution_pct: parseFloat(row['Distribution'] || row['distribution'] || '0') || 0
          }));
          break;

        case 'territory':
          tableName = 'tiktok_demographics_territory';
          conflictColumn = 'snapshot_date,territory';
          const territoryDate = new Date().toISOString().split('T')[0];
          records = csvData.data.map(row => ({
            snapshot_date: territoryDate,
            // Fix: Column is "Top territories" not "Top territories Distribution"
            territory: row['Top territories'] || row['Territory'] || row['territory'] || 'Unknown',
            distribution_pct: parseFloat(row['Distribution'] || row['distribution'] || '0') || 0
          }));
          break;

        case 'hours':
          tableName = 'tiktok_active_hours';
          conflictColumn = 'snapshot_date,hour';
          const hoursDate = parseTikTokDate(csvData.data[0]?.['Date'] || csvData.data[0]?.['date']);
          records = csvData.data.map(row => ({
            snapshot_date: hoursDate,
            hour: parseInt(row['Hour'] || row['hour'] || '0') || 0,
            active_followers: parseInt(row['Active followers'] || row['active_followers'] || '0') || 0
          }));
          break;
      }

      const { error } = await supabase
        .from(tableName)
        .upsert(records, { onConflict: conflictColumn });

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      setTiktokCsvs(prev => ({
        ...prev,
        [csvType]: { ...prev[csvType as keyof typeof prev], uploaded: true }
      }));

      setTiktokSuccess(true);
      setTimeout(() => setTiktokSuccess(false), 3000);
    } catch (error: any) {
      const errorMessage = error?.message || error?.hint || `Failed to upload ${csvType}`;
      setTiktokError(errorMessage);
      console.error(`TikTok ${csvType} upload error:`, error);
      console.error('Full error object:', JSON.stringify(error, null, 2));
    } finally {
      setTiktokSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/hub" className="flex items-center gap-2 text-scrummy-navy hover:text-scrummy-blue transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <img src="/assets/logo.png" alt="SCRUMMY" className="h-10" />
            <span className="font-orbitron font-bold text-scrummy-navy">Upload Data</span>
          </div>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-scrummy-navy leading-tight mb-4">
              Analytics <span className="text-scrummy-goldYellow">Data Entry</span>
            </h1>
            <p className="text-lg text-gray-600">
              Manual entry for platform-specific analytics or JSON bulk upload
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="instagram" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram Entry
              </TabsTrigger>
              <TabsTrigger value="facebook" className="flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Facebook Entry
              </TabsTrigger>
              <TabsTrigger value="threads" className="flex items-center gap-2">
                <AtSign className="w-4 h-4" />
                Threads Entry
              </TabsTrigger>
              <TabsTrigger value="tiktok" className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                TikTok Entry
              </TabsTrigger>
              <TabsTrigger value="json" className="flex items-center gap-2">
                <FileJson className="w-4 h-4" />
                JSON Upload
              </TabsTrigger>
            </TabsList>

            {/* Instagram Entry Tab */}
            <TabsContent value="instagram">
              <form onSubmit={handleInstagramSubmit}>
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-6">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Instagram className="w-6 h-6 text-pink-600" />
                      <h3 className="text-2xl font-semibold text-scrummy-navy">
                        Instagram Analytics Entry
                      </h3>
                    </div>

                    {/* Success/Error Messages */}
                    {instagramSuccess && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
                        <Check className="w-5 h-5" />
                        <span>Data saved successfully!</span>
                      </div>
                    )}
                    {instagramError && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                        <X className="w-5 h-5" />
                        <span>{instagramError}</span>
                      </div>
                    )}

                    {/* Snapshot Date */}
                    <div className="mb-6">
                      <Label htmlFor="snapshot_date" className="text-lg font-semibold">
                        Snapshot Date *
                      </Label>
                      <Input
                        id="snapshot_date"
                        type="date"
                        value={instagramData.snapshot_date}
                        onChange={(e) => setInstagramData({ ...instagramData, snapshot_date: e.target.value })}
                        required
                        className="mt-2 max-w-xs"
                      />
                    </div>

                    <div className="space-y-8">
                      {/* Profile Activity Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">📊 Profile Activity</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="profile_activity_score">Profile Activity Score</Label>
                            <Input
                              id="profile_activity_score"
                              type="number"
                              value={instagramData.profile_activity_score}
                              onChange={(e) => setInstagramData({ ...instagramData, profile_activity_score: e.target.value })}
                              placeholder="250"
                            />
                          </div>
                          <div>
                            <Label htmlFor="profile_visits">Profile Visits</Label>
                            <Input
                              id="profile_visits"
                              type="number"
                              value={instagramData.profile_visits}
                              onChange={(e) => setInstagramData({ ...instagramData, profile_visits: e.target.value })}
                              placeholder="244"
                            />
                          </div>
                          <div>
                            <Label htmlFor="external_link_taps">External Link Taps</Label>
                            <Input
                              id="external_link_taps"
                              type="number"
                              value={instagramData.external_link_taps}
                              onChange={(e) => setInstagramData({ ...instagramData, external_link_taps: e.target.value })}
                              placeholder="6"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Followers Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">👥 Followers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <Label htmlFor="followers_count">Total Followers *</Label>
                            <Input
                              id="followers_count"
                              type="number"
                              value={instagramData.followers_count}
                              onChange={(e) => setInstagramData({ ...instagramData, followers_count: e.target.value })}
                              placeholder="2563"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="most_active_day">Most Active Day</Label>
                            <Select
                              value={instagramData.most_active_day}
                              onValueChange={(value) => setInstagramData({ ...instagramData, most_active_day: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="M">Monday</SelectItem>
                                <SelectItem value="Tu">Tuesday</SelectItem>
                                <SelectItem value="W">Wednesday</SelectItem>
                                <SelectItem value="Th">Thursday</SelectItem>
                                <SelectItem value="F">Friday</SelectItem>
                                <SelectItem value="Sa">Saturday</SelectItem>
                                <SelectItem value="Su">Sunday</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="most_active_hour">Most Active Hour</Label>
                            <Select
                              value={instagramData.most_active_hour}
                              onValueChange={(value) => setInstagramData({ ...instagramData, most_active_hour: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select hour" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="12a">12 AM</SelectItem>
                                <SelectItem value="3a">3 AM</SelectItem>
                                <SelectItem value="6a">6 AM</SelectItem>
                                <SelectItem value="9a">9 AM</SelectItem>
                                <SelectItem value="12p">12 PM</SelectItem>
                                <SelectItem value="3p">3 PM</SelectItem>
                                <SelectItem value="6p">6 PM</SelectItem>
                                <SelectItem value="9p">9 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="most_active_hour_count">Peak Hour Count</Label>
                            <Input
                              id="most_active_hour_count"
                              type="number"
                              value={instagramData.most_active_hour_count}
                              onChange={(e) => setInstagramData({ ...instagramData, most_active_hour_count: e.target.value })}
                              placeholder="949"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Views Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">👁️ Views & Reach</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div>
                            <Label htmlFor="total_views">Total Views</Label>
                            <Input
                              id="total_views"
                              type="number"
                              value={instagramData.total_views}
                              onChange={(e) => setInstagramData({ ...instagramData, total_views: e.target.value })}
                              placeholder="32371"
                            />
                          </div>
                          <div>
                            <Label htmlFor="accounts_reached">Accounts Reached</Label>
                            <Input
                              id="accounts_reached"
                              type="number"
                              value={instagramData.accounts_reached}
                              onChange={(e) => setInstagramData({ ...instagramData, accounts_reached: e.target.value })}
                              placeholder="4957"
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Viewer Breakdown (%)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor="followers_view_pct">Followers %</Label>
                            <Input
                              id="followers_view_pct"
                              type="number"
                              step="0.1"
                              value={instagramData.followers_view_pct}
                              onChange={(e) => setInstagramData({ ...instagramData, followers_view_pct: e.target.value })}
                              placeholder="36.7"
                            />
                          </div>
                          <div>
                            <Label htmlFor="non_followers_view_pct">Non-Followers %</Label>
                            <Input
                              id="non_followers_view_pct"
                              type="number"
                              step="0.1"
                              value={instagramData.non_followers_view_pct}
                              onChange={(e) => setInstagramData({ ...instagramData, non_followers_view_pct: e.target.value })}
                              placeholder="63.3"
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Views by Content Type (%)</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="posts_view_pct">Posts %</Label>
                            <Input
                              id="posts_view_pct"
                              type="number"
                              step="0.1"
                              value={instagramData.posts_view_pct}
                              onChange={(e) => setInstagramData({ ...instagramData, posts_view_pct: e.target.value })}
                              placeholder="63.9"
                            />
                          </div>
                          <div>
                            <Label htmlFor="reels_view_pct">Reels %</Label>
                            <Input
                              id="reels_view_pct"
                              type="number"
                              step="0.1"
                              value={instagramData.reels_view_pct}
                              onChange={(e) => setInstagramData({ ...instagramData, reels_view_pct: e.target.value })}
                              placeholder="24.1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="stories_view_pct">Stories %</Label>
                            <Input
                              id="stories_view_pct"
                              type="number"
                              step="0.1"
                              value={instagramData.stories_view_pct}
                              onChange={(e) => setInstagramData({ ...instagramData, stories_view_pct: e.target.value })}
                              placeholder="11.9"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interactions Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">❤️ Interactions</h4>
                        <div className="mb-4">
                          <Label htmlFor="interactions_total">Total Interactions</Label>
                          <Input
                            id="interactions_total"
                            type="number"
                            value={instagramData.interactions_total}
                            onChange={(e) => setInstagramData({ ...instagramData, interactions_total: e.target.value })}
                            placeholder="321"
                            className="max-w-xs"
                          />
                        </div>
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Interaction Source (%)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor="followers_interaction_pct">From Followers %</Label>
                            <Input
                              id="followers_interaction_pct"
                              type="number"
                              step="0.1"
                              value={instagramData.followers_interaction_pct}
                              onChange={(e) => setInstagramData({ ...instagramData, followers_interaction_pct: e.target.value })}
                              placeholder="77.6"
                            />
                          </div>
                          <div>
                            <Label htmlFor="non_followers_interaction_pct">From Non-Followers %</Label>
                            <Input
                              id="non_followers_interaction_pct"
                              type="number"
                              step="0.1"
                              value={instagramData.non_followers_interaction_pct}
                              onChange={(e) => setInstagramData({ ...instagramData, non_followers_interaction_pct: e.target.value })}
                              placeholder="22.4"
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Interactions by Content Type (%)</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="posts_interaction_pct">Posts %</Label>
                            <Input
                              id="posts_interaction_pct"
                              type="number"
                              step="0.1"
                              value={instagramData.posts_interaction_pct}
                              onChange={(e) => setInstagramData({ ...instagramData, posts_interaction_pct: e.target.value })}
                              placeholder="43.6"
                            />
                          </div>
                          <div>
                            <Label htmlFor="reels_interaction_pct">Reels %</Label>
                            <Input
                              id="reels_interaction_pct"
                              type="number"
                              step="0.1"
                              value={instagramData.reels_interaction_pct}
                              onChange={(e) => setInstagramData({ ...instagramData, reels_interaction_pct: e.target.value })}
                              placeholder="54.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="stories_interaction_pct">Stories %</Label>
                            <Input
                              id="stories_interaction_pct"
                              type="number"
                              step="0.1"
                              value={instagramData.stories_interaction_pct}
                              onChange={(e) => setInstagramData({ ...instagramData, stories_interaction_pct: e.target.value })}
                              placeholder="1.9"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Notes Section */}
                      <div className="border-t pt-6">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          value={instagramData.notes}
                          onChange={(e) => setInstagramData({ ...instagramData, notes: e.target.value })}
                          placeholder="Any additional notes about this period..."
                          rows={3}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex gap-4">
                      <Button
                        type="submit"
                        disabled={instagramSaving}
                        className="bg-scrummy-navy hover:bg-scrummy-blue text-white"
                      >
                        {instagramSaving ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Instagram Data
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* Facebook Entry Tab */}
            <TabsContent value="facebook">
              <form onSubmit={handleFacebookSubmit}>
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-6">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Facebook className="w-6 h-6 text-blue-600" />
                      <h3 className="text-2xl font-semibold text-scrummy-navy">
                        Facebook Analytics Entry
                      </h3>
                    </div>

                    {/* Success/Error Messages */}
                    {facebookSuccess && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
                        <Check className="w-5 h-5" />
                        <span>Data saved successfully!</span>
                      </div>
                    )}
                    {facebookError && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                        <X className="w-5 h-5" />
                        <span>{facebookError}</span>
                      </div>
                    )}

                    {/* Snapshot Date */}
                    <div className="mb-6">
                      <Label htmlFor="fb_snapshot_date" className="text-lg font-semibold">
                        Snapshot Date *
                      </Label>
                      <Input
                        id="fb_snapshot_date"
                        type="date"
                        value={facebookData.snapshot_date}
                        onChange={(e) => setFacebookData({ ...facebookData, snapshot_date: e.target.value })}
                        required
                        className="mt-2 max-w-xs"
                      />
                    </div>

                    <div className="space-y-8">
                      {/* Followers Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">👥 Followers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <Label htmlFor="fb_total_followers">Total Followers *</Label>
                            <Input
                              id="fb_total_followers"
                              type="number"
                              value={facebookData.total_followers}
                              onChange={(e) => setFacebookData({ ...facebookData, total_followers: e.target.value })}
                              placeholder="600"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_net_follows">Net Follows</Label>
                            <Input
                              id="fb_net_follows"
                              type="number"
                              value={facebookData.net_follows}
                              onChange={(e) => setFacebookData({ ...facebookData, net_follows: e.target.value })}
                              placeholder="6"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_unfollows">Unfollows</Label>
                            <Input
                              id="fb_unfollows"
                              type="number"
                              value={facebookData.unfollows}
                              onChange={(e) => setFacebookData({ ...facebookData, unfollows: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-4 mb-2 font-semibold">Follows by Content Type (%)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fb_follows_from_posts_pct">From Posts %</Label>
                            <Input
                              id="fb_follows_from_posts_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.follows_from_posts_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, follows_from_posts_pct: e.target.value })}
                              placeholder="52.4"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_follows_from_videos_pct">From Videos %</Label>
                            <Input
                              id="fb_follows_from_videos_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.follows_from_videos_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, follows_from_videos_pct: e.target.value })}
                              placeholder="47.6"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Demographics Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">📊 Demographics (Top 3)</h4>
                        
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Age & Gender</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor="fb_top_age_gender_1">Top Age/Gender #1</Label>
                            <Input
                              id="fb_top_age_gender_1"
                              type="text"
                              value={facebookData.top_age_gender_1}
                              onChange={(e) => setFacebookData({ ...facebookData, top_age_gender_1: e.target.value })}
                              placeholder="25-34 Men"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_age_gender_1_pct">Percentage %</Label>
                            <Input
                              id="fb_top_age_gender_1_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.top_age_gender_1_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, top_age_gender_1_pct: e.target.value })}
                              placeholder="30.4"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_age_gender_2">Top Age/Gender #2</Label>
                            <Input
                              id="fb_top_age_gender_2"
                              type="text"
                              value={facebookData.top_age_gender_2}
                              onChange={(e) => setFacebookData({ ...facebookData, top_age_gender_2: e.target.value })}
                              placeholder="35-44 Men"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_age_gender_2_pct">Percentage %</Label>
                            <Input
                              id="fb_top_age_gender_2_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.top_age_gender_2_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, top_age_gender_2_pct: e.target.value })}
                              placeholder="25.8"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_age_gender_3">Top Age/Gender #3</Label>
                            <Input
                              id="fb_top_age_gender_3"
                              type="text"
                              value={facebookData.top_age_gender_3}
                              onChange={(e) => setFacebookData({ ...facebookData, top_age_gender_3: e.target.value })}
                              placeholder="25-34 Women"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_age_gender_3_pct">Percentage %</Label>
                            <Input
                              id="fb_top_age_gender_3_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.top_age_gender_3_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, top_age_gender_3_pct: e.target.value })}
                              placeholder="15.2"
                            />
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-2 font-semibold">Countries</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor="fb_top_country_1">Top Country #1</Label>
                            <Input
                              id="fb_top_country_1"
                              type="text"
                              value={facebookData.top_country_1}
                              onChange={(e) => setFacebookData({ ...facebookData, top_country_1: e.target.value })}
                              placeholder="Zimbabwe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_country_1_pct">Percentage %</Label>
                            <Input
                              id="fb_top_country_1_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.top_country_1_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, top_country_1_pct: e.target.value })}
                              placeholder="76.6"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_country_2">Top Country #2</Label>
                            <Input
                              id="fb_top_country_2"
                              type="text"
                              value={facebookData.top_country_2}
                              onChange={(e) => setFacebookData({ ...facebookData, top_country_2: e.target.value })}
                              placeholder="South Africa"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_country_2_pct">Percentage %</Label>
                            <Input
                              id="fb_top_country_2_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.top_country_2_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, top_country_2_pct: e.target.value })}
                              placeholder="8.6"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_country_3">Top Country #3</Label>
                            <Input
                              id="fb_top_country_3"
                              type="text"
                              value={facebookData.top_country_3}
                              onChange={(e) => setFacebookData({ ...facebookData, top_country_3: e.target.value })}
                              placeholder="United Kingdom"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_country_3_pct">Percentage %</Label>
                            <Input
                              id="fb_top_country_3_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.top_country_3_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, top_country_3_pct: e.target.value })}
                              placeholder="3.2"
                            />
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-2 font-semibold">Cities</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fb_top_city_1">Top City #1</Label>
                            <Input
                              id="fb_top_city_1"
                              type="text"
                              value={facebookData.top_city_1}
                              onChange={(e) => setFacebookData({ ...facebookData, top_city_1: e.target.value })}
                              placeholder="Harare, Zimbabwe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_city_1_pct">Percentage %</Label>
                            <Input
                              id="fb_top_city_1_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.top_city_1_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, top_city_1_pct: e.target.value })}
                              placeholder="69.9"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_city_2">Top City #2</Label>
                            <Input
                              id="fb_top_city_2"
                              type="text"
                              value={facebookData.top_city_2}
                              onChange={(e) => setFacebookData({ ...facebookData, top_city_2: e.target.value })}
                              placeholder="Bulawayo, Zimbabwe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_city_2_pct">Percentage %</Label>
                            <Input
                              id="fb_top_city_2_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.top_city_2_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, top_city_2_pct: e.target.value })}
                              placeholder="13.4"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_city_3">Top City #3</Label>
                            <Input
                              id="fb_top_city_3"
                              type="text"
                              value={facebookData.top_city_3}
                              onChange={(e) => setFacebookData({ ...facebookData, top_city_3: e.target.value })}
                              placeholder="Mutare, Zimbabwe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_top_city_3_pct">Percentage %</Label>
                            <Input
                              id="fb_top_city_3_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.top_city_3_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, top_city_3_pct: e.target.value })}
                              placeholder="4.5"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Views Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">👁️ Views</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <Label htmlFor="fb_total_views">Total Views</Label>
                            <Input
                              id="fb_total_views"
                              type="number"
                              value={facebookData.total_views}
                              onChange={(e) => setFacebookData({ ...facebookData, total_views: e.target.value })}
                              placeholder="270"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_views_3_second">3-Second Views</Label>
                            <Input
                              id="fb_views_3_second"
                              type="number"
                              value={facebookData.views_3_second}
                              onChange={(e) => setFacebookData({ ...facebookData, views_3_second: e.target.value })}
                              placeholder="23"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_views_1_minute">1-Minute Views</Label>
                            <Input
                              id="fb_views_1_minute"
                              type="number"
                              value={facebookData.views_1_minute}
                              onChange={(e) => setFacebookData({ ...facebookData, views_1_minute: e.target.value })}
                              placeholder="1"
                            />
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Views by Content Type (%)</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                          <div>
                            <Label htmlFor="fb_views_multi_photo_pct">Multi Photo %</Label>
                            <Input
                              id="fb_views_multi_photo_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.views_multi_photo_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, views_multi_photo_pct: e.target.value })}
                              placeholder="34.8"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_views_video_pct">Video %</Label>
                            <Input
                              id="fb_views_video_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.views_video_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, views_video_pct: e.target.value })}
                              placeholder="24.0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_views_multi_media_pct">Multi Media %</Label>
                            <Input
                              id="fb_views_multi_media_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.views_multi_media_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, views_multi_media_pct: e.target.value })}
                              placeholder="20.4"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_views_photo_pct">Photo %</Label>
                            <Input
                              id="fb_views_photo_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.views_photo_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, views_photo_pct: e.target.value })}
                              placeholder="16.7"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_views_reel_pct">Reel %</Label>
                            <Input
                              id="fb_views_reel_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.views_reel_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, views_reel_pct: e.target.value })}
                              placeholder="4.1"
                            />
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-2 font-semibold">Views by Audience (%)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fb_views_followers_pct">Followers %</Label>
                            <Input
                              id="fb_views_followers_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.views_followers_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, views_followers_pct: e.target.value })}
                              placeholder="4.4"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_views_non_followers_pct">Non-Followers %</Label>
                            <Input
                              id="fb_views_non_followers_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.views_non_followers_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, views_non_followers_pct: e.target.value })}
                              placeholder="95.6"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interactions Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">💬 Interactions</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <Label htmlFor="fb_total_interactions">Total Interactions</Label>
                            <Input
                              id="fb_total_interactions"
                              type="number"
                              value={facebookData.total_interactions}
                              onChange={(e) => setFacebookData({ ...facebookData, total_interactions: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_reactions_count">Reactions</Label>
                            <Input
                              id="fb_reactions_count"
                              type="number"
                              value={facebookData.reactions_count}
                              onChange={(e) => setFacebookData({ ...facebookData, reactions_count: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_comments_count">Comments</Label>
                            <Input
                              id="fb_comments_count"
                              type="number"
                              value={facebookData.comments_count}
                              onChange={(e) => setFacebookData({ ...facebookData, comments_count: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_shares_count">Shares</Label>
                            <Input
                              id="fb_shares_count"
                              type="number"
                              value={facebookData.shares_count}
                              onChange={(e) => setFacebookData({ ...facebookData, shares_count: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-2 font-semibold">Interactions by Audience (%)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fb_interactions_followers_pct">Followers %</Label>
                            <Input
                              id="fb_interactions_followers_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.interactions_followers_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, interactions_followers_pct: e.target.value })}
                              placeholder="50.0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fb_interactions_non_followers_pct">Non-Followers %</Label>
                            <Input
                              id="fb_interactions_non_followers_pct"
                              type="number"
                              step="0.1"
                              value={facebookData.interactions_non_followers_pct}
                              onChange={(e) => setFacebookData({ ...facebookData, interactions_non_followers_pct: e.target.value })}
                              placeholder="50.0"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Notes Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">📝 Notes</h4>
                        <div>
                          <Label htmlFor="fb_notes">Additional Notes (Optional)</Label>
                          <Textarea
                            id="fb_notes"
                            value={facebookData.notes}
                            onChange={(e) => setFacebookData({ ...facebookData, notes: e.target.value })}
                            placeholder="Any additional observations or context..."
                            className="mt-2 h-24"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-end gap-4">
                      <Button
                        type="submit"
                        disabled={facebookSaving}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                      >
                        {facebookSaving ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Facebook Data
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* Threads Entry Tab */}
            <TabsContent value="threads">
              <form onSubmit={handleThreadsSubmit}>
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-6">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <AtSign className="w-6 h-6 text-purple-600" />
                      <h3 className="text-2xl font-semibold text-scrummy-navy">
                        Threads Analytics Entry
                      </h3>
                    </div>

                    {/* Success/Error Messages */}
                    {threadsSuccess && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
                        <Check className="w-5 h-5" />
                        <span>Data saved successfully!</span>
                      </div>
                    )}
                    {threadsError && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                        <X className="w-5 h-5" />
                        <span>{threadsError}</span>
                      </div>
                    )}

                    {/* Snapshot Date */}
                    <div className="mb-6">
                      <Label htmlFor="threads_snapshot_date" className="text-lg font-semibold">
                        Snapshot Date *
                      </Label>
                      <Input
                        id="threads_snapshot_date"
                        type="date"
                        value={threadsData.snapshot_date}
                        onChange={(e) => setThreadsData({ ...threadsData, snapshot_date: e.target.value })}
                        required
                        className="mt-2 max-w-xs"
                      />
                    </div>

                    <div className="space-y-8">
                      {/* Followers Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">👥 Followers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="threads_total_followers">Total Followers *</Label>
                            <Input
                              id="threads_total_followers"
                              type="number"
                              value={threadsData.total_followers}
                              onChange={(e) => setThreadsData({ ...threadsData, total_followers: e.target.value })}
                              placeholder="332"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="threads_follower_growth">Follower Growth</Label>
                            <Input
                              id="threads_follower_growth"
                              type="number"
                              value={threadsData.follower_growth}
                              onChange={(e) => setThreadsData({ ...threadsData, follower_growth: e.target.value })}
                              placeholder="+15"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Views Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">👁️ Views</h4>
                        <div className="mb-4">
                          <Label htmlFor="threads_total_views">Total Views</Label>
                          <Input
                            id="threads_total_views"
                            type="number"
                            value={threadsData.total_views}
                            onChange={(e) => setThreadsData({ ...threadsData, total_views: e.target.value })}
                            placeholder="117"
                          />
                        </div>

                        <p className="text-sm text-gray-600 mb-2 font-semibold">View Sources (%)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="threads_views_home_pct">Home %</Label>
                            <Input
                              id="threads_views_home_pct"
                              type="number"
                              step="0.1"
                              value={threadsData.views_home_pct}
                              onChange={(e) => setThreadsData({ ...threadsData, views_home_pct: e.target.value })}
                              placeholder="42.7"
                            />
                          </div>
                          <div>
                            <Label htmlFor="threads_views_instagram_pct">Instagram %</Label>
                            <Input
                              id="threads_views_instagram_pct"
                              type="number"
                              step="0.1"
                              value={threadsData.views_instagram_pct}
                              onChange={(e) => setThreadsData({ ...threadsData, views_instagram_pct: e.target.value })}
                              placeholder="28.2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="threads_views_activity_tab_pct">Activity Tab %</Label>
                            <Input
                              id="threads_views_activity_tab_pct"
                              type="number"
                              step="0.1"
                              value={threadsData.views_activity_tab_pct}
                              onChange={(e) => setThreadsData({ ...threadsData, views_activity_tab_pct: e.target.value })}
                              placeholder="17.9"
                            />
                          </div>
                          <div>
                            <Label htmlFor="threads_views_search_pct">Search %</Label>
                            <Input
                              id="threads_views_search_pct"
                              type="number"
                              step="0.1"
                              value={threadsData.views_search_pct}
                              onChange={(e) => setThreadsData({ ...threadsData, views_search_pct: e.target.value })}
                              placeholder="8.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="threads_views_other_pct">Other %</Label>
                            <Input
                              id="threads_views_other_pct"
                              type="number"
                              step="0.1"
                              value={threadsData.views_other_pct}
                              onChange={(e) => setThreadsData({ ...threadsData, views_other_pct: e.target.value })}
                              placeholder="2.6"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interactions Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">💬 Interactions</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div>
                            <Label htmlFor="threads_total_interactions">Total Interactions</Label>
                            <Input
                              id="threads_total_interactions"
                              type="number"
                              value={threadsData.total_interactions}
                              onChange={(e) => setThreadsData({ ...threadsData, total_interactions: e.target.value })}
                              placeholder="1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="threads_likes_count">Likes</Label>
                            <Input
                              id="threads_likes_count"
                              type="number"
                              value={threadsData.likes_count}
                              onChange={(e) => setThreadsData({ ...threadsData, likes_count: e.target.value })}
                              placeholder="1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="threads_quotes_count">Quotes</Label>
                            <Input
                              id="threads_quotes_count"
                              type="number"
                              value={threadsData.quotes_count}
                              onChange={(e) => setThreadsData({ ...threadsData, quotes_count: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="threads_replies_count">Replies</Label>
                            <Input
                              id="threads_replies_count"
                              type="number"
                              value={threadsData.replies_count}
                              onChange={(e) => setThreadsData({ ...threadsData, replies_count: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="threads_reposts_count">Reposts</Label>
                            <Input
                              id="threads_reposts_count"
                              type="number"
                              value={threadsData.reposts_count}
                              onChange={(e) => setThreadsData({ ...threadsData, reposts_count: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Notes Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-scrummy-navy mb-4">📝 Notes</h4>
                        <div>
                          <Label htmlFor="threads_notes">Additional Notes (Optional)</Label>
                          <Textarea
                            id="threads_notes"
                            value={threadsData.notes}
                            onChange={(e) => setThreadsData({ ...threadsData, notes: e.target.value })}
                            placeholder="Any additional observations or context..."
                            className="mt-2 h-24"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-end gap-4">
                      <Button
                        type="submit"
                        disabled={threadsSaving}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                      >
                        {threadsSaving ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Threads Data
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            {/* TikTok Entry Tab */}
            <TabsContent value="tiktok">
              <div className="space-y-6">
                {/* Header Card */}
                <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Music className="w-8 h-8 text-cyan-600" />
                      <div>
                        <h3 className="text-xl font-bold text-cyan-900">TikTok Multi-CSV Upload</h3>
                        <p className="text-sm text-cyan-700">
                          TikTok provides multiple CSV exports. Upload each one below for comprehensive analytics.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 border border-cyan-200">
                      <p className="text-xs text-cyan-800 font-medium">
                        💡 Tip: Export all CSVs from TikTok Analytics dashboard, then upload them here. The system will automatically detect and validate each CSV type.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Upload Cards for each CSV type */}
                {[
                  { 
                    key: 'overview', 
                    name: '1. Overview Data', 
                    desc: 'Daily totals: Video Views, Profile Views, Likes, Comments, Shares',
                    icon: '📊',
                    required: true
                  },
                  { 
                    key: 'content', 
                    name: '2. Content Performance', 
                    desc: 'Individual video tracking with titles, links, and metrics',
                    icon: '🎬',
                    required: false
                  },
                  { 
                    key: 'viewers', 
                    name: '3. Viewer Composition', 
                    desc: 'New vs Returning viewer breakdown',
                    icon: '👥',
                    required: false
                  },
                  { 
                    key: 'followers', 
                    name: '4. Follower Growth', 
                    desc: 'Daily follower counts and changes',
                    icon: '📈',
                    required: false
                  },
                  { 
                    key: 'gender', 
                    name: '5. Gender Demographics', 
                    desc: 'Follower gender distribution percentages',
                    icon: '⚧️',
                    required: false
                  },
                  { 
                    key: 'territory', 
                    name: '6. Geographic Data', 
                    desc: 'Top territories and countries distribution',
                    icon: '🌍',
                    required: false
                  },
                  { 
                    key: 'hours', 
                    name: '7. Active Hours', 
                    desc: 'When your followers are most active (by hour)',
                    icon: '⏰',
                    required: false
                  }
                ].map((csv) => {
                  const csvState = tiktokCsvs[csv.key as keyof typeof tiktokCsvs];
                  return (
                    <Card 
                      key={csv.key} 
                      className={`bg-white/80 backdrop-blur-sm border-2 ${
                        csvState.uploaded 
                          ? 'border-green-300 bg-green-50/30' 
                          : csvState.file 
                          ? 'border-cyan-300' 
                          : 'border-gray-200'
                      } shadow-md hover:shadow-lg transition-all`}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{csv.icon}</span>
                            <div>
                              <h4 className="font-semibold text-scrummy-navy flex items-center gap-2">
                                {csv.name}
                                {csv.required && (
                                  <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded">Required</span>
                                )}
                              </h4>
                              <p className="text-xs text-gray-600 mt-1">{csv.desc}</p>
                            </div>
                          </div>
                          {csvState.uploaded && (
                            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                              <Check className="w-4 h-4" />
                              Uploaded
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <input
                              type="file"
                              accept=".csv"
                              onChange={handleTiktokCsvUpload(csv.key)}
                              className="hidden"
                              id={`tiktok-${csv.key}`}
                              disabled={csvState.uploaded}
                            />
                            <label htmlFor={`tiktok-${csv.key}`} className="block">
                              <Button 
                                type="button" 
                                variant="outline" 
                                className={`w-full text-sm ${
                                  csvState.uploaded ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                }`}
                                disabled={csvState.uploaded}
                                asChild
                              >
                                <span>
                                  {csvState.file 
                                    ? `📄 ${csvState.file.name}` 
                                    : '📂 Choose CSV File'
                                  }
                                </span>
                              </Button>
                            </label>
                          </div>

                          {csvState.data.length > 0 && !csvState.uploaded && (
                            <Button
                              onClick={() => uploadTiktokCsv(csv.key)}
                              disabled={tiktokSaving}
                              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6"
                            >
                              {tiktokSaving ? (
                                <>
                                  <Upload className="w-4 h-4 mr-2 animate-pulse" />
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload ({csvState.data.length})
                                </>
                              )}
                            </Button>
                          )}
                        </div>

                        {csvState.data.length > 0 && !csvState.uploaded && (
                          <div className="mt-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded border border-green-200">
                            ✓ {csvState.data.length} record{csvState.data.length !== 1 ? 's' : ''} parsed and ready to upload
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Success/Error Messages */}
                {tiktokSuccess && (
                  <Card className="bg-green-50 border-2 border-green-200">
                    <CardContent className="p-4">
                      <p className="text-sm text-green-800 flex items-center gap-2 font-medium">
                        <Check className="w-5 h-5" />
                        CSV uploaded successfully! Data has been saved to the database.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {tiktokError && (
                  <Card className="bg-red-50 border-2 border-red-200">
                    <CardContent className="p-4">
                      <p className="text-sm text-red-800 flex items-center gap-2 font-medium">
                        <X className="w-5 h-5" />
                        {tiktokError}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Progress Tracker */}
                <Card className="bg-slate-50 border-2 border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Upload Progress</span>
                      <span className="text-sm text-slate-600">
                        {Object.values(tiktokCsvs).filter(csv => csv.uploaded).length} / 7 CSVs uploaded
                      </span>
                    </div>
                    <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-600 transition-all duration-500"
                        style={{ 
                          width: `${(Object.values(tiktokCsvs).filter(csv => csv.uploaded).length / 7) * 100}%` 
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* JSON Upload Tab */}
            <TabsContent value="json">
              {/* Upload Card */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-6">
                <CardContent className="p-8">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-scrummy-goldYellow transition-colors">
                <FileJson className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-scrummy-navy mb-2">
                  Drop JSON file or click to upload
                </h3>
                <p className="text-gray-600 mb-4">
                  Supports single object or array of social media stats
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label htmlFor="file-upload" className="inline-block">
                  <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Choose File'}
                  </div>
                </label>
                  </div>
                </CardContent>
              </Card>

              {/* JSON Format Example */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-6">
                <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-scrummy-navy mb-4">
                📋 Expected JSON Format
              </h3>
              <p className="text-gray-600 mb-4">Single object:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`{
  "platform": "instagram",
  "followers": 5000,
  "posts": 3,
  "likes": 250,
  "comments": 30,
  "shares": 10,
  "views": 5500,
  "engagement_rate": 4.5,
  "top_post_url": "https://instagram.com/p/...",
  "date": "2025-10-15"
}`}
              </pre>
              <p className="text-gray-600 mb-4">Or array of objects:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "platform": "instagram",
    "followers": 5000,
    ...
  },
  {
    "platform": "tiktok",
    "followers": 2000,
    ...
  }
]`}
              </pre>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Only <code>platform</code>, <code>followers</code>, and <code>engagement_rate</code> are required. 
                  If <code>date</code> is omitted, today's date will be used.
                </p>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {results.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-scrummy-navy">
                    Upload Results
                  </h3>
                  <div className="flex gap-4">
                    {successCount > 0 && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">{successCount} successful</span>
                      </div>
                    )}
                    {failCount > 0 && (
                      <div className="flex items-center gap-2 text-red-600">
                        <X className="w-5 h-5" />
                        <span className="font-semibold">{failCount} failed</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        result.success ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {result.success ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                        <span className="font-semibold capitalize">{result.platform}</span>
                      </div>
                      {result.error && (
                        <span className="text-sm text-red-600">{result.error}</span>
                      )}
                    </div>
                  ))}
                </div>

                {successCount > 0 && (
                  <div className="mt-6 text-center">
                    <Link to="/hub">
                      <Button className="bg-scrummy-navy hover:bg-scrummy-blue text-white">
                        View Dashboard
                      </Button>
                    </Link>
                  </div>
                )}
                </CardContent>
              </Card>
            )}

            {/* JSON Preview */}
            {jsonPreview && (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-scrummy-navy mb-4">
                    📄 Uploaded JSON Preview
                  </h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                    {jsonPreview}
                  </pre>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsUpload;
