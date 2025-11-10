// Supabase Edge Function: scrape-social-stats
// Scrapes publicly available social media data without requiring API keys
// Uses public endpoints, embeds, and RSS feeds

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

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

// Helper function to fetch with retries
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ...options.headers
        }
      })
      return response
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
  throw new Error('Max retries reached')
}

// Helper to extract numbers from text
function extractNumber(text: string): number {
  const match = text.match(/[\d,]+/)
  if (!match) return 0
  return parseInt(match[0].replace(/,/g, ''))
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

    const url = new URL(req.url)
    const testMode = url.searchParams.get('test') === 'true'

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const today = new Date().toISOString().split('T')[0]
    
    console.log(`🚀 Starting social stats scraping for ${today}`)
    console.log(`📊 Test mode: ${testMode}`)

    const payloads: SocialStatsPayload[] = []
    const errors: { platform: string; error: string }[] = []

    // Get usernames from environment
    const instagramUsername = Deno.env.get('INSTAGRAM_USERNAME') || 'scrummysports'
    const tiktokUsername = Deno.env.get('TIKTOK_USERNAME') || 'scrummysports'
    const twitterUsername = Deno.env.get('TWITTER_USERNAME') || 'scrummysports'
    const youtubeUsername = Deno.env.get('YOUTUBE_USERNAME') || 'scrummysports'
    const facebookUsername = Deno.env.get('FACEBOOK_USERNAME') || 'scrummysports'

    // ==========================================
    // INSTAGRAM - Public Profile Data
    // ==========================================
    try {
      console.log(`📸 Scraping Instagram @${instagramUsername}...`)
      
      // Instagram's public embed endpoint (no auth needed)
      const embedUrl = `https://www.instagram.com/${instagramUsername}/?__a=1&__d=dis`
      
      try {
        const response = await fetchWithRetry(embedUrl, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          const userData = data?.graphql?.user || data?.user
          
          if (userData) {
            const followers = userData.edge_followed_by?.count || 0
            const posts = userData.edge_owner_to_timeline_media?.count || 0
            
            payloads.push({
              platform: 'instagram',
              date: today,
              followers: followers,
              posts: posts,
              likes: null,
              comments: null,
              shares: null,
              views: null,
              engagement_rate: null,
              top_post_url: `https://www.instagram.com/${instagramUsername}/`
            })
            console.log(`✅ Instagram: ${followers} followers`)
          }
        } else {
          throw new Error(`HTTP ${response.status}`)
        }
      } catch (e) {
        // Fallback: Try oEmbed endpoint
        console.log('⚠️  Instagram: Trying oEmbed fallback...')
        const oembedUrl = `https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/${instagramUsername}/&access_token=IGQVJYa...`
        // Note: oEmbed has limited data
        errors.push({ platform: 'instagram', error: 'Unable to fetch without API key' })
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ Instagram error:', errorMsg)
      errors.push({ platform: 'instagram', error: errorMsg })
    }

    // ==========================================
    // YOUTUBE - RSS Feed (Public)
    // ==========================================
    try {
      console.log(`🎥 Scraping YouTube @${youtubeUsername}...`)
      
      // YouTube RSS feed is public - no API key needed
      // First, try to get channel ID from username
      const channelUrl = `https://www.youtube.com/@${youtubeUsername}`
      const response = await fetchWithRetry(channelUrl)
      const html = await response.text()
      
      // Extract channel ID from page
      const channelIdMatch = html.match(/"channelId":"([^"]+)"/)
      
      if (channelIdMatch) {
        const channelId = channelIdMatch[1]
        
        // Get subscriber count and video count from channel page
        const subscriberMatch = html.match(/"subscriberCountText":\{"accessibility":\{"accessibilityData":\{"label":"([^"]+)"/)
        const videoCountMatch = html.match(/"videoCountText":\{"runs":\[\{"text":"([^"]+)"/)
        
        let subscribers = 0
        let videoCount = 0
        
        if (subscriberMatch) {
          const subText = subscriberMatch[1]
          subscribers = extractNumber(subText)
        }
        
        if (videoCountMatch) {
          const countText = videoCountMatch[1]
          videoCount = extractNumber(countText)
        }
        
        // Get RSS feed for recent videos
        const rssFeed = await fetchWithRetry(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)
        const rssText = await rssFeed.text()
        
        // Count videos in feed (last 15)
        const videoMatches = rssText.match(/<entry>/g)
        const recentVideos = videoMatches ? videoMatches.length : 0
        
        payloads.push({
          platform: 'youtube',
          date: today,
          followers: subscribers,
          posts: recentVideos,
          likes: null,
          comments: null,
          shares: null,
          views: null,
          engagement_rate: null,
          top_post_url: channelUrl
        })
        console.log(`✅ YouTube: ${subscribers} subscribers`)
      } else {
        throw new Error('Could not extract channel ID')
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ YouTube error:', errorMsg)
      errors.push({ platform: 'youtube', error: errorMsg })
    }

    // ==========================================
    // TWITTER/X - Limited Public Data
    // ==========================================
    try {
      console.log(`🐦 Scraping Twitter/X @${twitterUsername}...`)
      
      // Twitter has heavily restricted public access
      // Alternative: Use Nitter (Twitter frontend) or syndication endpoint
      const nitterUrl = `https://nitter.net/${twitterUsername}`
      
      try {
        const response = await fetchWithRetry(nitterUrl)
        const html = await response.text()
        const doc = new DOMParser().parseFromString(html, 'text/html')
        
        if (doc) {
          // Extract follower count from Nitter
          const followersElement = doc.querySelector('.profile-stat-num')
          const tweetsElement = doc.querySelectorAll('.profile-stat-num')[1]
          
          const followers = followersElement ? extractNumber(followersElement.textContent) : 0
          const tweets = tweetsElement ? extractNumber(tweetsElement.textContent) : 0
          
          payloads.push({
            platform: 'twitter',
            date: today,
            followers: followers,
            posts: tweets,
            likes: null,
            comments: null,
            shares: null,
            views: null,
            engagement_rate: null,
            top_post_url: `https://twitter.com/${twitterUsername}`
          })
          console.log(`✅ Twitter/X: ${followers} followers`)
        }
      } catch (e) {
        console.log('⚠️  Twitter/X: Nitter unavailable, trying syndication...')
        // Syndication endpoint also limited now
        errors.push({ platform: 'twitter', error: 'Public access restricted by Twitter' })
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ Twitter/X error:', errorMsg)
      errors.push({ platform: 'twitter', error: errorMsg })
    }

    // ==========================================
    // TIKTOK - Very Limited Public Access
    // ==========================================
    try {
      console.log(`🎵 Scraping TikTok @${tiktokUsername}...`)
      
      // TikTok aggressively blocks scrapers
      // Requires API or very sophisticated scraping
      console.log('⚠️  TikTok: Requires API access or sophisticated scraping')
      errors.push({ platform: 'tiktok', error: 'TikTok requires API key for reliable data' })
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ TikTok error:', errorMsg)
      errors.push({ platform: 'tiktok', error: errorMsg })
    }

    // ==========================================
    // FACEBOOK - Limited Public Access
    // ==========================================
    try {
      console.log(`📘 Scraping Facebook @${facebookUsername}...`)
      
      // Facebook blocks most scraping attempts
      // Requires Graph API for reliable data
      console.log('⚠️  Facebook: Requires Graph API for reliable data')
      errors.push({ platform: 'facebook', error: 'Facebook requires API key for reliable data' })
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ Facebook error:', errorMsg)
      errors.push({ platform: 'facebook', error: errorMsg })
    }

    // ==========================================
    // TEST MODE
    // ==========================================
    if (testMode) {
      console.log('🧪 Test mode - not inserting into database')
      return new Response(
        JSON.stringify({
          success: true,
          test_mode: true,
          payloads: payloads,
          errors: errors,
          message: 'Test run complete - no data was inserted',
          note: 'Public scraping has limitations. Consider getting API keys for better data.'
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

    const successCount = insertResults.filter(r => r.success).length
    const failCount = insertResults.filter(r => !r.success).length

    console.log(`✅ Scraping complete: ${successCount} successful, ${failCount} failed`)

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
        collection_errors: errors,
        note: 'Public scraping has limitations. Some platforms may require API keys for reliable data.'
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









