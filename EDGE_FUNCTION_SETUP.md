# 🚀 Edge Function Setup Guide

Complete guide to deploying the `collect-social-stats` Supabase Edge Function.

## ✅ What Was Created

- **Edge Function:** `supabase/functions/collect-social-stats/index.ts`
- **Documentation:** `supabase/functions/collect-social-stats/README.md`
- **Platforms Supported:** Instagram, YouTube, Facebook, Twitter/X, TikTok

## 📋 Prerequisites

1. **Supabase CLI** installed
2. **API Keys** from social media platforms
3. **Supabase Project** (you already have this)

## 🔧 Step-by-Step Setup

### 1. Install Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Verify installation
supabase --version
```

### 2. Login to Supabase

```bash
supabase login
```

This will open your browser to authenticate.

### 3. Link Your Project

```bash
cd /Users/b-rad/Desktop/scrum-visuals-fantasy-rugby
supabase link --project-ref xvrelebmkoldyhgtvshu
```

### 4. Set Environment Secrets

Go to your Supabase Dashboard:
- https://supabase.com/dashboard/project/xvrelebmkoldyhgtvshu/settings/functions

Click "Add secret" for each of these:

#### Required (Already Have):
```
SUPABASE_URL=https://xvrelebmkoldyhgtvshu.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<from dashboard → Settings → API>
```

#### Social Media APIs (Add as you get them):

**Instagram:**
```
INSTAGRAM_ACCESS_TOKEN=<your_token>
INSTAGRAM_USER_ID=<your_user_id>
```

**YouTube:**
```
YOUTUBE_API_KEY=<your_api_key>
YOUTUBE_CHANNEL_ID=<your_channel_id>
```

**Facebook:**
```
FACEBOOK_ACCESS_TOKEN=<your_token>
FACEBOOK_PAGE_ID=<your_page_id>
```

**Twitter/X:**
```
TWITTER_BEARER_TOKEN=<your_bearer_token>
TWITTER_USER_ID=<your_user_id>
```

**TikTok (Optional):**
```
TIKTOK_ACCESS_TOKEN=<your_token>
TIKTOK_USER_ID=<your_user_id>
```

### 5. Deploy the Function

```bash
cd /Users/b-rad/Desktop/scrum-visuals-fantasy-rugby
supabase functions deploy collect-social-stats --no-verify-jwt
```

### 6. Test the Function

**Test Mode (doesn't insert data):**
```bash
curl -X POST 'https://xvrelebmkoldyhgtvshu.supabase.co/functions/v1/collect-social-stats?test=true' \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Production Mode (inserts data):**
```bash
curl -X POST 'https://xvrelebmkoldyhgtvshu.supabase.co/functions/v1/collect-social-stats' \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Get your ANON_KEY from: Settings → API → anon public

## 🔑 Getting API Keys

### Instagram (Free)
1. Go to https://developers.facebook.com/
2. Create App → Business Type
3. Add "Instagram Graph API" product
4. Get User Access Token
5. Find Instagram User ID: https://www.instagram.com/YOUR_USERNAME/?__a=1

### YouTube (Free - 10k requests/day)
1. Go to https://console.cloud.google.com/
2. Create new project
3. Enable "YouTube Data API v3"
4. Credentials → Create API Key
5. Get Channel ID from YouTube Studio

### Facebook (Free)
1. Same as Instagram (Meta for Developers)
2. Add "Facebook Pages" product
3. Get Page Access Token
4. Find Page ID in Page Settings

### Twitter/X ($100/month)
1. Go to https://developer.twitter.com/
2. Sign up for Basic tier ($100/month)
3. Create app
4. Get Bearer Token
5. Find User ID from profile

### TikTok (Business Account Required)
1. Apply at https://business-api.tiktok.com/
2. Requires business account approval
3. Wait for approval
4. Get access credentials

## 🧪 Manual Testing

### From Your Analytics Hub

Add a button to trigger the function:

```typescript
async function collectStats() {
  const response = await fetch(
    'https://xvrelebmkoldyhgtvshu.supabase.co/functions/v1/collect-social-stats',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    }
  )
  const data = await response.json()
  console.log(data)
}
```

### View Logs

```bash
supabase functions logs collect-social-stats --follow
```

## ✅ What It Does

1. **Fetches data** from each platform's API
2. **Calculates engagement** rates
3. **Inserts/updates** data in `social_stats` table
4. **Returns results** with success/failure for each platform

## 🔄 Next Steps (After Testing)

Once everything works:

1. **Set up scheduling** (GitHub Actions, cron-job.org, etc.)
2. **Monitor function logs** regularly
3. **Check API quotas** (especially YouTube)
4. **Rotate access tokens** when they expire

## 🐛 Common Issues

**"Missing credentials"**
- Check environment variables are set in Supabase Dashboard
- Verify exact variable names

**"API quota exceeded"**
- YouTube: 10,000 requests/day limit
- Wait 24 hours or upgrade quota

**"Token expired"**
- Instagram/Facebook tokens expire
- Regenerate from Meta Developer Portal

**"Unauthorized"**
- Check your Bearer token in the curl command
- Use the ANON key, not SERVICE_ROLE key for testing

## 📚 Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Instagram API Docs](https://developers.facebook.com/docs/instagram-api)
- [YouTube API Docs](https://developers.google.com/youtube/v3)
- [Twitter API Docs](https://developer.twitter.com/en/docs/twitter-api)

---

Your Edge Function is ready! Start by getting API keys and testing with `?test=true` mode.

