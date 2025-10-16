# URC Match Lineups Feature

## 🚦 Quick Start

### Feature Status
**✅ ENABLED** - Users will see two tabs: "Squad Rosters" and "Match Lineups"

To disable: Change line 67 in `src/pages/URCLineups.tsx` to `false`

### Deploy Now
```bash
git add .
git commit -m "Add URC Match Lineups with HTML scraping"
git push
```
**Result:** Users will see Match Lineups tab. No authentication required!

---

## 🎯 How It Works

### User Flow
1. User goes to your app's URC Lineups page
2. Clicks "Match Lineups" tab
3. Enters match ID (e.g., `287880`)
4. Lineup loads automatically (no auth needed!)

### Technical Flow
```
1. User enters match ID
2. Netlify Function fetches match page HTML from stats.unitedrugby.com
3. Function parses HTML to extract player names (starting XV + bench)
4. Returns structured lineup data
5. Frontend matches names against GraphQL squad data
6. Displays lineup with player photos, stats, positions
```

**File:** `netlify/functions/urc-lineup-proxy.ts`

### Why This Approach?
- ✅ **No authentication** - scrapes public HTML
- ✅ **Lightweight** - simple HTTP fetch + parsing
- ✅ **Combines data** - Scraped names + GraphQL squad details (photos, stats)
- ✅ **Fast** - no browser automation needed

---

## 🧪 Testing

### Test Locally
```bash
# 1. Change flag to true in URCLineups.tsx
const ENABLE_MATCH_LINEUPS = true;

# 2. Start dev server (NOT pnpm dev!)
netlify dev

# 3. Get session cookie
open https://stats.unitedrugby.com

# 4. Test in app
# Navigate to URC Lineups → Match Lineups → Enter ID: 287880
```

### Enable in Production
```bash
# 1. Change flag to true
# 2. Commit and push
git add src/pages/URCLineups.tsx
git commit -m "Enable Match Lineups"
git push
```

---

## 🛡️ Safety

- ✅ Feature hidden when flag = false
- ✅ Zero risk to existing site
- ✅ Easy to enable/disable (one line change)
- ✅ Instant rollback: change flag to false, push

---

## 🔧 Files Changed

**Created:**
- `netlify/functions/urc-lineup-proxy.ts` - Cookie pass-through proxy

**Modified:**
- `src/pages/URCLineups.tsx` - Added match lineups UI + feature flag
- `package.json` - Added `@netlify/functions` dependency

---

## 📝 Notes

- URC Stats API requires browser session cookies
- Netlify Function forwards cookies from user's browser
- Each user uses their own session (no shared cookies)
- Legal & compliant (official API, user's own session)


