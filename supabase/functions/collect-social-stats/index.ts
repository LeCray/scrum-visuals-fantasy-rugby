// Supabase Edge Function: collect-social-stats
// Collects social media analytics from multiple platforms and stores in database

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

interface SocialStatsPayload {
  platform: string
  date: string
  followers: number
  posts: number
  likes: number | null
  comments: number | null
  shares: number | null
  views: number | null
  engagement_rate: number | null
  top_post_url: string | null
}

serve(async (req) => {
  try {
    // CORS headers
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      })
    }

    // Get test mode from query params
    const url = new URL(req.url)
    const testMode = url.searchParams.get('test') === 'true'

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get today's date
    const today = new Date().toISOString().split('T')[0]
    
    console.log(`🚀 Starting social stats collection for ${today}`)
    console.log(`📊 Test mode: ${testMode}`)

    const payloads: SocialStatsPayload[] = []
    const errors: { platform: string; error: string }[] = []

    // ==========================================
    // INSTAGRAM - Meta Graph API
    // ==========================================
    try {
      console.log('📸 Fetching Instagram stats...')
      const instagramToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')
      const instagramUserId = Deno.env.get('INSTAGRAM_USER_ID')
      
      if (instagramToken && instagramUserId) {
        // Get basic profile stats
        const profileRes = await fetch(
          `https://graph.instagram.com/${instagramUserId}?fields=followers_count,media_count&access_token=${instagramToken}`
        )
        const profileData = await profileRes.json()

        // Get recent media for engagement calculation
        const mediaRes = await fetch(
          `https://graph.instagram.com/${instagramUserId}/media?fields=like_count,comments_count,timestamp&limit=10&access_token=${instagramToken}`
        )
        const mediaData = await mediaRes.json()

        // Calculate engagement
        let totalLikes = 0
        let totalComments = 0
        let postCount = 0
        let topPostUrl = null

        if (mediaData.data && mediaData.data.length > 0) {
          postCount = mediaData.data.length
          mediaData.data.forEach((post: any) => {
            totalLikes += post.like_count || 0
            totalComments += post.comments_count || 0
          })
          topPostUrl = `https://www.instagram.com/p/${mediaData.data[0].id}/`
        }

        const engagementRate = profileData.followers_count > 0
          ? ((totalLikes + totalComments) / profileData.followers_count * 100).toFixed(2)
          : 0

        payloads.push({
          platform: 'instagram',
          date: today,
          followers: profileData.followers_count || 0,
          posts: postCount,
          likes: totalLikes,
          comments: totalComments,
          shares: null,
          views: null,
          engagement_rate: parseFloat(engagementRate as string),
          top_post_url: topPostUrl
        })
        console.log('✅ Instagram: Success')
      } else {
        console.log('⚠️  Instagram: Missing credentials')
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ Instagram error:', errorMsg)
      errors.push({ platform: 'instagram', error: errorMsg })
    }

    // ==========================================
    // YOUTUBE - YouTube Data API v3
    // ==========================================
    try {
      console.log('🎥 Fetching YouTube stats...')
      const youtubeKey = Deno.env.get('YOUTUBE_API_KEY')
      const channelId = Deno.env.get('YOUTUBE_CHANNEL_ID')
      
      if (youtubeKey && channelId) {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${youtubeKey}`
        )
        const data = await res.json()

        if (data.items && data.items.length > 0) {
          const stats = data.items[0].statistics
          const snippet = data.items[0].snippet

          // Get recent videos for engagement
          const videosRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${youtubeKey}`
          )
          const videosData = await videosRes.json()

          let topVideoUrl = null
          if (videosData.items && videosData.items.length > 0) {
            const videoId = videosData.items[0].id.videoId
            topVideoUrl = `https://www.youtube.com/watch?v=${videoId}`
          }

          const engagementRate = parseInt(stats.subscriberCount) > 0
            ? (parseInt(stats.viewCount) / parseInt(stats.subscriberCount) * 100).toFixed(2)
            : 0

          payloads.push({
            platform: 'youtube',
            date: today,
            followers: parseInt(stats.subscriberCount || 0),
            posts: parseInt(stats.videoCount || 0),
            likes: null,
            comments: null,
            shares: null,
            views: parseInt(stats.viewCount || 0),
            engagement_rate: parseFloat(engagementRate as string),
            top_post_url: topVideoUrl
          })
          console.log('✅ YouTube: Success')
        }
      } else {
        console.log('⚠️  YouTube: Missing credentials')
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ YouTube error:', errorMsg)
      errors.push({ platform: 'youtube', error: errorMsg })
    }

    // ==========================================
    // FACEBOOK - Meta Graph API
    // ==========================================
    try {
      console.log('📘 Fetching Facebook stats...')
      const facebookToken = Deno.env.get('FACEBOOK_ACCESS_TOKEN')
      const pageId = Deno.env.get('FACEBOOK_PAGE_ID')
      
      if (facebookToken && pageId) {
        const res = await fetch(
          `https://graph.facebook.com/v18.0/${pageId}?fields=followers_count,fan_count&access_token=${facebookToken}`
        )
        const data = await res.json()

        // Get recent posts
        const postsRes = await fetch(
          `https://graph.facebook.com/v18.0/${pageId}/posts?fields=likes.summary(true),comments.summary(true),shares&limit=10&access_token=${facebookToken}`
        )
        const postsData = await postsRes.json()

        let totalLikes = 0
        let totalComments = 0
        let totalShares = 0
        let postCount = 0
        let topPostUrl = null

        if (postsData.data && postsData.data.length > 0) {
          postCount = postsData.data.length
          postsData.data.forEach((post: any) => {
            totalLikes += post.likes?.summary?.total_count || 0
            totalComments += post.comments?.summary?.total_count || 0
            totalShares += post.shares?.count || 0
          })
          topPostUrl = `https://www.facebook.com/${pageId}/posts/${postsData.data[0].id}`
        }

        const followers = data.fan_count || data.followers_count || 0
        const engagementRate = followers > 0
          ? ((totalLikes + totalComments + totalShares) / followers * 100).toFixed(2)
          : 0

        payloads.push({
          platform: 'facebook',
          date: today,
          followers: followers,
          posts: postCount,
          likes: totalLikes,
          comments: totalComments,
          shares: totalShares,
          views: null,
          engagement_rate: parseFloat(engagementRate as string),
          top_post_url: topPostUrl
        })
        console.log('✅ Facebook: Success')
      } else {
        console.log('⚠️  Facebook: Missing credentials')
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ Facebook error:', errorMsg)
      errors.push({ platform: 'facebook', error: errorMsg })
    }

    // ==========================================
    // TWITTER/X - Twitter API v2
    // ==========================================
    try {
      console.log('🐦 Fetching Twitter/X stats...')
      const twitterToken = Deno.env.get('TWITTER_BEARER_TOKEN')
      const twitterUserId = Deno.env.get('TWITTER_USER_ID')
      
      if (twitterToken && twitterUserId) {
        // Get user info
        const userRes = await fetch(
          `https://api.twitter.com/2/users/${twitterUserId}?user.fields=public_metrics`,
          {
            headers: {
              'Authorization': `Bearer ${twitterToken}`
            }
          }
        )
        const userData = await userRes.json()

        // Get recent tweets
        const tweetsRes = await fetch(
          `https://api.twitter.com/2/users/${twitterUserId}/tweets?max_results=10&tweet.fields=public_metrics`,
          {
            headers: {
              'Authorization': `Bearer ${twitterToken}`
            }
          }
        )
        const tweetsData = await tweetsRes.json()

        let totalLikes = 0
        let totalComments = 0
        let totalRetweets = 0
        let postCount = 0
        let topTweetUrl = null

        if (tweetsData.data && tweetsData.data.length > 0) {
          postCount = tweetsData.data.length
          tweetsData.data.forEach((tweet: any) => {
            totalLikes += tweet.public_metrics?.like_count || 0
            totalComments += tweet.public_metrics?.reply_count || 0
            totalRetweets += tweet.public_metrics?.retweet_count || 0
          })
          topTweetUrl = `https://twitter.com/i/status/${tweetsData.data[0].id}`
        }

        const followers = userData.data?.public_metrics?.followers_count || 0
        const engagementRate = followers > 0
          ? ((totalLikes + totalComments + totalRetweets) / followers * 100).toFixed(2)
          : 0

        payloads.push({
          platform: 'twitter',
          date: today,
          followers: followers,
          posts: postCount,
          likes: totalLikes,
          comments: totalComments,
          shares: totalRetweets,
          views: null,
          engagement_rate: parseFloat(engagementRate as string),
          top_post_url: topTweetUrl
        })
        console.log('✅ Twitter/X: Success')
      } else {
        console.log('⚠️  Twitter/X: Missing credentials')
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ Twitter/X error:', errorMsg)
      errors.push({ platform: 'twitter', error: errorMsg })
    }

    // ==========================================
    // TIKTOK - TikTok Business API
    // ==========================================
    try {
      console.log('🎵 Fetching TikTok stats...')
      const tiktokToken = Deno.env.get('TIKTOK_ACCESS_TOKEN')
      const tiktokUserId = Deno.env.get('TIKTOK_USER_ID')
      
      if (tiktokToken && tiktokUserId) {
        // Note: TikTok API requires business account
        console.log('⚠️  TikTok: API integration requires business account')
        // Placeholder for when you get TikTok Business API access
      } else {
        console.log('⚠️  TikTok: Missing credentials')
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ TikTok error:', errorMsg)
      errors.push({ platform: 'tiktok', error: errorMsg })
    }

    // ==========================================
    // TEST MODE - Just return data without inserting
    // ==========================================
    if (testMode) {
      console.log('🧪 Test mode - not inserting into database')
      return new Response(
        JSON.stringify({
          success: true,
          test_mode: true,
          payloads: payloads,
          errors: errors,
          message: 'Test run complete - no data was inserted'
        }, null, 2),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }

    // ==========================================
    // INSERT INTO DATABASE
    // ==========================================
    const insertResults = []
    
    for (const payload of payloads) {
      try {
        const { data, error } = await supabase
          .from('social_stats')
          .upsert(payload, {
            onConflict: 'platform,date'
          })
          .select()

        if (error) {
          console.error(`❌ Insert error for ${payload.platform}:`, error)
          insertResults.push({ platform: payload.platform, success: false, error: error.message })
        } else {
          console.log(`✅ Inserted: ${payload.platform} - ${payload.date}`)
          insertResults.push({ platform: payload.platform, success: true })
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        console.error(`❌ Exception inserting ${payload.platform}:`, errorMsg)
        insertResults.push({ platform: payload.platform, success: false, error: errorMsg })
      }
    }

    // ==========================================
    // RETURN RESULTS
    // ==========================================
    const successCount = insertResults.filter(r => r.success).length
    const failCount = insertResults.filter(r => !r.success).length

    console.log(`✅ Collection complete: ${successCount} successful, ${failCount} failed`)

    return new Response(
      JSON.stringify({
        success: true,
        date: today,
        summary: {
          collected: payloads.length,
          inserted: successCount,
          failed: failCount
        },
        results: insertResults,
        collection_errors: errors
      }, null, 2),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )

  } catch (error) {
    console.error('❌ Fatal error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
})


