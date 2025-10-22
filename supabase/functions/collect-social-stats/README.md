# Collect Social Stats - Supabase Edge Function

Automatically collects social media analytics from Instagram, YouTube, Facebook, Twitter/X, and TikTok.

## 🚀 Setup

### 1. Install Supabase CLI

```bash
brew install supabase/tap/supabase
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Link Your Project

```bash
supabase link --project-ref your-project-ref
```

Your project ref is in your Supabase URL: `https://YOUR-PROJECT-REF.supabase.co`

### 4. Set Environment Variables

Go to your Supabase Dashboard → Settings → Edge Functions → Add secret

```bash
# Required for function to work
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Instagram (Meta Graph API)
INSTAGRAM_ACCESS_TOKEN=your-token
INSTAGRAM_USER_ID=your-user-id

# YouTube (Google Cloud Console)
YOUTUBE_API_KEY=your-api-key
YOUTUBE_CHANNEL_ID=your-channel-id

# Facebook (Meta Graph API)
FACEBOOK_ACCESS_TOKEN=your-token
FACEBOOK_PAGE_ID=your-page-id

# Twitter/X (Twitter API v2)
TWITTER_BEARER_TOKEN=your-bearer-token
TWITTER_USER_ID=your-user-id

# TikTok (TikTok Business API - optional)
TIKTOK_ACCESS_TOKEN=your-token
TIKTOK_USER_ID=your-user-id
```

## 📝 Getting API Keys

### Instagram
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create an app
3. Add Instagram Graph API
4. Get User Access Token
5. Find your Instagram User ID

### YouTube
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project
3. Enable YouTube Data API v3
4. Create credentials → API Key
5. Find your Channel ID in YouTube Studio

### Facebook
1. Same as Instagram (Meta for Developers)
2. Add Pages API
3. Get Page Access Token
4. Find your Page ID in Page Settings

### Twitter/X
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create an app (requires $100/month for Basic tier)
3. Get Bearer Token
4. Find your User ID

### TikTok
1. Apply for [TikTok for Business](https://business-api.tiktok.com/)
2. Requires business account approval
3. Get access token after approval

## 🧪 Deploy Function

```bash
# Deploy the function
supabase functions deploy collect-social-stats

# Deploy with environment variables
supabase functions deploy collect-social-stats --no-verify-jwt
```

## 🔧 Test the Function

### Test Mode (doesn't insert data)

```bash
curl -X POST 'https://your-project-ref.supabase.co/functions/v1/collect-social-stats?test=true' \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### Production Mode (inserts data)

```bash
curl -X POST 'https://your-project-ref.supabase.co/functions/v1/collect-social-stats' \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## 📊 Response Format

### Success Response

```json
{
  "success": true,
  "date": "2025-10-15",
  "summary": {
    "collected": 5,
    "inserted": 5,
    "failed": 0
  },
  "results": [
    {
      "platform": "instagram",
      "success": true
    }
  ],
  "collection_errors": []
}
```

### Test Mode Response

```json
{
  "success": true,
  "test_mode": true,
  "payloads": [
    {
      "platform": "instagram",
      "date": "2025-10-15",
      "followers": 5000,
      "posts": 3,
      "likes": 250,
      "comments": 30,
      "shares": null,
      "views": null,
      "engagement_rate": 4.5,
      "top_post_url": "https://www.instagram.com/p/abc123/"
    }
  ],
  "errors": [],
  "message": "Test run complete - no data was inserted"
}
```

## 🔍 View Logs

```bash
supabase functions logs collect-social-stats
```

## 🔄 Manual Trigger

You can trigger the function manually from your Analytics Hub:

1. Go to `/hub/upload`
2. Or call the function URL directly via fetch/curl

## ⏰ Scheduling (Future)

When ready to automate, you can:

1. **GitHub Actions** - Free cron scheduler
2. **External cron service** - cron-job.org, etc.
3. **Supabase pg_cron** - PostgreSQL extension

## 🐛 Troubleshooting

### Function doesn't deploy
- Make sure you're logged in: `supabase login`
- Check your project is linked: `supabase projects list`

### Missing credentials error
- Check environment variables are set in Supabase Dashboard
- Verify variable names match exactly

### API errors
- Check API quotas (YouTube: 10,000/day)
- Verify tokens haven't expired
- Test API calls separately first

## 📚 API Documentation Links

- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [TikTok Business API](https://business-api.tiktok.com/portal/docs)


