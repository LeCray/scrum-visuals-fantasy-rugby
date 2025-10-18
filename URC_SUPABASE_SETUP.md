# URC Supabase Integration - Setup Guide

## 🎯 What Changed

The URC Fixtures and Lineups now use **Supabase** instead of JSON files!

### Benefits:
- ✅ **No Git Commits** - Update lineups from anywhere
- ✅ **Auto-Save** - Parse HTML → Auto-saves to Supabase
- ✅ **Real-time Updates** - Changes appear instantly
- ✅ **No File Management** - No more manual JSON editing

---

## 📋 Setup Steps

### 1. Run the SQL Schema

Go to your Supabase project → SQL Editor and run:

```sql
-- File: database/urc_schema.sql
-- Creates urc_fixtures and urc_lineups tables with proper RLS policies
```

Copy the entire content from `/database/urc_schema.sql` and execute it.

### 2. Verify Tables Created

In Supabase → Table Editor, you should see:
- ✅ `urc_fixtures` (11 columns)
- ✅ `urc_lineups` (9 columns)

### 3. Verify RLS Policies

Both tables should have:
- ✅ Allow public read access
- ✅ Allow public insert access
- ✅ Allow public update access
- ✅ Allow public delete access

---

## 🚀 How It Works Now

### Admin Workflow:

1. **Parse Fixtures HTML**
   - Paste HTML → Click "Parse HTML → JSON"
   - Enter round number
   - ✅ **Auto-saves to Supabase** (no manual file editing!)

2. **Parse Lineup HTML**
   - Paste HTML → Click "Parse HTML → JSON"
   - Enter match ID only (team info auto-fills from Supabase!)
   - ✅ **Auto-saves to Supabase** + **Auto-updates fixture's hasLineup flag**

### User Experience:

1. Go to `/urc-lineups`
2. Fixtures load from Supabase automatically
3. Click a fixture → Lineup loads from Supabase
4. All real-time, no page refresh needed!

---

## 📁 Files Changed

### New Files:
- `database/urc_schema.sql` - Supabase table schema
- `src/lib/urcSupabaseService.ts` - API functions for fixtures/lineups

### Updated Files:
- `src/pages/URCAdmin.tsx` - Auto-saves to Supabase after parsing
- `src/pages/URCLineups.tsx` - Fetches from Supabase instead of JSON

### Old Files (No Longer Used):
- `src/lib/data/urc-fixtures.json` - ~~Replaced by Supabase~~
- `src/lib/data/urc-match-lineups/*.json` - ~~Replaced by Supabase~~

---

## 🔧 API Functions

### Fixtures:

```typescript
import { getFixtures, saveFixtures } from '../lib/urcSupabaseService';

// Get all fixtures
const fixtures = await getFixtures();

// Save multiple fixtures
const success = await saveFixtures(fixturesArray);
```

### Lineups:

```typescript
import { getLineup, saveLineup } from '../lib/urcSupabaseService';

// Get lineup for a match
const lineup = await getLineup('287879');

// Save lineup (also updates fixture.has_lineup = true)
const success = await saveLineup(lineupObject);
```

---

## 🎯 Database Schema

### `urc_fixtures` Table:

| Column | Type | Description |
|--------|------|-------------|
| `match_id` | TEXT (PK) | Unique match identifier |
| `round` | TEXT | Round number (e.g., "Round 4") |
| `date` | TEXT | Match date |
| `time` | TEXT | Match time |
| `venue` | TEXT | Match venue |
| `home_team` | TEXT | Home team name |
| `home_team_id` | TEXT | Home team ID |
| `home_abbreviation` | TEXT | Home team abbreviation |
| `away_team` | TEXT | Away team name |
| `away_team_id` | TEXT | Away team ID |
| `away_abbreviation` | TEXT | Away team abbreviation |
| `has_lineup` | BOOLEAN | Whether lineup exists |
| `created_at` | TIMESTAMP | Auto-generated |
| `updated_at` | TIMESTAMP | Auto-updated |

### `urc_lineups` Table:

| Column | Type | Description |
|--------|------|-------------|
| `match_id` | TEXT (PK, FK) | References urc_fixtures(match_id) |
| `home_team` | TEXT | Home team name |
| `home_team_id` | TEXT | Home team ID |
| `home_starting` | JSONB | Array of starting players |
| `home_bench` | JSONB | Array of bench players |
| `away_team` | TEXT | Away team name |
| `away_team_id` | TEXT | Away team ID |
| `away_starting` | JSONB | Array of starting players |
| `away_bench` | JSONB | Array of bench players |
| `created_at` | TIMESTAMP | Auto-generated |
| `updated_at` | TIMESTAMP | Auto-updated |

---

## ✨ Migration (If Needed)

If you have existing JSON data you want to migrate:

1. Go to `/urc-admin`
2. **Fixtures**: Copy content from `urc-fixtures.json`, paste in "Fixtures Parser", click parse
3. **Lineups**: For each match:
   - Go to stats.unitedrugby.com lineup page
   - Copy HTML source
   - Paste in "Lineup Parser"
   - Enter match ID
   - Done!

The parser will auto-save everything to Supabase.

---

## 🔍 Troubleshooting

### Issue: "Supabase not connected"

**Solution**: Check that environment variables are set:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Issue: "Error saving to Supabase"

**Solution**: 
1. Check RLS policies are enabled
2. Check table names match exactly (`urc_fixtures`, `urc_lineups`)
3. Check Supabase project is active

### Issue: "No fixtures showing"

**Solution**:
1. Check Supabase → Table Editor → `urc_fixtures` has data
2. Check browser console for errors
3. Verify network tab shows successful requests

---

## 🎉 You're Done!

Now you can update URC fixtures and lineups without ever touching code or committing files!

Just parse → auto-saves → appears instantly! 🔥

