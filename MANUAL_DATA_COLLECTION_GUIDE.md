# 📊 Manual Social Media Data Collection Guide

## Quick Weekly Routine (5 minutes)

### Step 1: Gather Your Stats

Open each platform and copy the numbers:

#### **Instagram**
1. Go to your profile
2. Copy:
   - Followers count
   - Recent posts (count from last week)
   - Check 1-2 recent posts for likes/comments
3. Note your best performing post URL

#### **TikTok**
1. Go to your profile
2. Copy:
   - Followers
   - Videos posted this week
   - Check recent videos for likes/comments/views
3. Note best video URL

#### **YouTube**
1. Go to YouTube Studio → Analytics
2. Copy:
   - Subscribers
   - Videos published (this period)
   - Views (recent)
3. Note your top video URL

#### **Facebook**
1. Go to your Page
2. Copy:
   - Page likes (followers)
   - Posts this week
   - Check recent posts for engagement
3. Note best post URL

#### **Twitter/X**
1. Go to your profile
2. Copy:
   - Followers
   - Tweets this week
   - Check recent tweets for engagement
3. Note best tweet URL

### Step 2: Create Your JSON File

Copy this template to a file called `social-stats.json`:

```json
[
  {
    "platform": "instagram",
    "date": "2025-10-15",
    "followers": 5000,
    "posts": 3,
    "likes": 250,
    "comments": 30,
    "shares": 0,
    "views": 5500,
    "engagement_rate": 5.6,
    "top_post_url": "https://www.instagram.com/p/your-post-id/"
  },
  {
    "platform": "tiktok",
    "date": "2025-10-15",
    "followers": 2000,
    "posts": 2,
    "likes": 500,
    "comments": 45,
    "shares": 20,
    "views": 15000,
    "engagement_rate": 28.3,
    "top_post_url": "https://www.tiktok.com/@scrummy/video/id"
  },
  {
    "platform": "youtube",
    "date": "2025-10-15",
    "followers": 500,
    "posts": 1,
    "likes": 85,
    "comments": 12,
    "shares": 0,
    "views": 3200,
    "engagement_rate": 19.4,
    "top_post_url": "https://www.youtube.com/watch?v=video-id"
  },
  {
    "platform": "facebook",
    "date": "2025-10-15",
    "followers": 1200,
    "posts": 2,
    "likes": 95,
    "comments": 18,
    "shares": 10,
    "views": 2500,
    "engagement_rate": 10.3,
    "top_post_url": "https://www.facebook.com/your-page/posts/id"
  },
  {
    "platform": "twitter",
    "date": "2025-10-15",
    "followers": 1000,
    "posts": 5,
    "likes": 75,
    "comments": 20,
    "shares": 15,
    "views": 2000,
    "engagement_rate": 11.0,
    "top_post_url": "https://twitter.com/scrummy/status/id"
  }
]
```

### Step 3: Fill In Your Numbers

Replace the numbers with your actual stats. You can:
- **Remove platforms** you don't use
- **Set to 0** if you don't have that metric
- **Leave out** `top_post_url` if you don't want to track it

### Step 4: Calculate Engagement Rate (Optional)

If you want to calculate engagement rate:

```
Engagement Rate = ((Likes + Comments + Shares) / Followers) × 100
```

Example:
- Likes: 250
- Comments: 30
- Shares: 10
- Followers: 5000
- **Engagement Rate**: (250 + 30 + 10) / 5000 × 100 = **5.8%**

Or just estimate it! It's not critical.

### Step 5: Upload to Analytics Hub

1. Go to: `http://localhost:8083/#/hub/upload`
2. Click "Choose File"
3. Select your `social-stats.json`
4. Click upload
5. ✅ Done! View your dashboard

## 📅 Recommended Schedule

### **Weekly Updates** (Recommended)
- **When**: Every Monday morning
- **Time**: 5-10 minutes
- **Best for**: Tracking trends, not too time-consuming

### **Bi-Weekly Updates**
- **When**: 1st and 15th of month
- **Time**: 5-10 minutes
- **Best for**: Less frequent checking

### **Monthly Updates**
- **When**: First of each month
- **Time**: 5-10 minutes
- **Best for**: Long-term trends only

## 💡 Pro Tips

### **Quick Template**
Save a file called `template.json` with your structure, then just update the numbers each time.

### **Date Format**
Always use: `YYYY-MM-DD` (e.g., `2025-10-15`)

### **Missing Data**
- Can't find shares on Instagram? Set to `0` or `null`
- Don't track views? Set to `0`
- Missing engagement rate? Set to `0` (dashboard will still work)

### **Bulk Updates**
You can include data for multiple dates in one file:

```json
[
  {
    "platform": "instagram",
    "date": "2025-10-01",
    "followers": 4500,
    ...
  },
  {
    "platform": "instagram",
    "date": "2025-10-08",
    "followers": 4750,
    ...
  },
  {
    "platform": "instagram",
    "date": "2025-10-15",
    "followers": 5000,
    ...
  }
]
```

## 🎯 Minimum Required Fields

Only these are **required**:
- `platform` (instagram, tiktok, youtube, facebook, twitter)
- `followers`
- `engagement_rate`

Everything else is optional!

### Minimal Example:
```json
[
  {
    "platform": "instagram",
    "followers": 5000,
    "posts": 0,
    "likes": 0,
    "comments": 0,
    "shares": 0,
    "views": 0,
    "engagement_rate": 4.5
  }
]
```

## 📱 Mobile-Friendly

You can also:
1. Use Notes app on your phone to create the JSON
2. Save as `stats.json`
3. AirDrop to your computer
4. Upload to Analytics Hub

## ✅ That's It!

Your Analytics Hub is ready to track your social media growth without any complicated APIs or scraping! 🎉

