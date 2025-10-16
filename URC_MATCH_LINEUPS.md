# URC Match Lineups Feature

## 🚦 Quick Start

### Feature Status
**✅ ENABLED** - Users will see two tabs: "Squad Rosters" and "Match Lineups"

To disable: Change line 67 in `src/pages/URCLineups.tsx` to `false`

### Deploy Now
```bash
git add .
git commit -m "Add URC Match Lineups feature"
git push
```
**Result:** Users will see Match Lineups tab. They need to visit stats.unitedrugby.com first to get a session cookie.

---

## 🎯 How It Works

### User Flow (When Enabled)
1. User visits https://stats.unitedrugby.com (gets session cookie)
2. User goes to your app's URC Lineups page
3. Clicks "Match Lineups" tab
4. Enters match ID (e.g., `287880`)
5. Lineup loads using their browser's session cookie

### Technical Flow
```
Browser (has cookie) → Netlify Function → URC Stats API
                       (forwards cookie)
```

**File:** `netlify/functions/urc-lineup-proxy.ts`

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


