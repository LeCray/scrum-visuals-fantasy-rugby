# How to Use Supabase in Your Components

## ✅ Current Setup (Simplified)

Your Supabase client is now set up exactly like your example!

### **File: `src/lib/supabase.ts`**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
```

## 📝 Usage Examples

### **Example 1: Fetch Data in a Component**
```typescript
import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'

function MyComponent() {
  const [socialStats, setSocialStats] = useState([])

  useEffect(() => {
    async function getStats() {
      const { data, error } = await supabase
        .from('social_stats')
        .select('*')
      
      if (error) {
        console.error('Error:', error)
      } else if (data) {
        setSocialStats(data)
      }
    }

    getStats()
  }, [])

  return (
    <div>
      {socialStats.map((stat) => (
        <div key={stat.id}>
          {stat.platform}: {stat.followers} followers
        </div>
      ))}
    </div>
  )
}

export default MyComponent
```

### **Example 2: Insert Data**
```typescript
import supabase from '@/lib/supabase'

async function addSocialStats() {
  const { data, error } = await supabase
    .from('social_stats')
    .insert([
      {
        platform: 'instagram',
        followers: 4120,
        posts: 3,
        likes: 158,
        comments: 22,
        shares: 6,
        views: 4100,
        engagement_rate: 3.7,
        date: '2025-10-15'
      }
    ])
    .select()

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Success:', data)
  }
}
```

### **Example 3: Update Data**
```typescript
import supabase from '@/lib/supabase'

async function updateFollowers(platform: string, newFollowers: number) {
  const { data, error } = await supabase
    .from('social_stats')
    .update({ followers: newFollowers })
    .eq('platform', platform)
    .eq('date', new Date().toISOString().split('T')[0])
    .select()

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Updated:', data)
  }
}
```

## 🎯 Your Analytics Hub Already Uses This Pattern!

The Analytics Hub pages (`AnalyticsLive`, `AnalyticsHistory`, `AnalyticsWeekly`) all use the helper functions from `supabase.ts`:

- `getLatestSocialStats()` - Get latest data
- `getHistoricalSocialStats()` - Get historical data
- `updateSocialStats()` - Insert/update data

But you can also use the `supabase` client directly in any component!

## ✅ Current Status

- ✅ Supabase client configured
- ✅ Environment variables loaded from `.env.local`
- ✅ Database table created
- ✅ Real data in database (Instagram: 4,120 followers)
- ✅ Analytics Hub pages working
- ✅ Can use `supabase` client directly in any component

Just import it and use it! 🚀

