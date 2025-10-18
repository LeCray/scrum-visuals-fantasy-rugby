# URC Match Lineups - Fixtures + JSON Approach

## 🎯 How It Works

### User Experience:
1. **See fixtures** - Upcoming URC matches displayed as cards
2. **Click a fixture** - Select the match you want to view
3. **View lineup** - Starting XV + bench displayed below with photos

### Behind the Scenes:
1. **Fixtures JSON** - Lists upcoming matches
2. **Lineup JSON** - One file per match with player names
3. **GraphQL Squad Data** - Adds photos, stats, positions automatically

**No scraping. No APIs. Just simple JSON files!**

---

## 🎛️ Admin Page

**URL:** `/urc-admin` (or click "Admin" button in URC Lineups header)

### Two HTML Parsers:
1. **Fixtures Parser** (left) ⚡ - Parse fixtures HTML → JSON
2. **Lineup Parser** (right) ⚡ - Parse lineup HTML → JSON

### Features:
- ⚡ **No manual JSON** - Just paste HTML!
- ✅ Auto-extracts all data
- ✅ Auto-copy to clipboard
- ✅ Shows where to paste files
- 🎯 **Simple & fast** - 2 minutes per match!

---

## ⚡ Fixtures Parser

### Quick Workflow:
1. **Go to** `unitedrugby.com/fixtures`
2. **Right-click** → **"View Page Source"**
3. **Find** & **copy** the fixtures section HTML
4. **Go to** `/urc-admin`
5. **Paste** HTML into **"Parse Fixtures HTML"** (left box)
6. **Click** "Parse HTML → JSON"
7. **Enter** when prompted for each fixture:
   - Match ID
   - Round (e.g., "Round 4")
   - Date (e.g., "Fri, 17 Oct 2025")
   - Time (e.g., "19:35")
   - Venue
   - Home/Away team names, IDs, abbreviations
8. **JSON generated** and copied to clipboard!
9. **Paste** into `src/lib/data/urc-fixtures.json`
10. **Commit & push**

---

## ⚡ Lineup Parser

### Quick Workflow:
1. **Go to** `stats.unitedrugby.com/match-centre/[match]`
2. **Click** the **"Lineup"** tab
3. **Right-click** → **"View Page Source"**
4. **Search** for `tabs-lineup` or player names
5. **Copy** the entire lineup section HTML
6. **Go to** `/urc-admin`
7. **Paste** HTML into **"Parse Lineup HTML"** (right box)
8. **Click** "Parse HTML → JSON"
9. **Enter** when prompted:
   - Match ID (e.g., `287881`)
   - Home Team Name (e.g., `Edinburgh`)
   - Home Team ID (e.g., `1641`)
   - Away Team Name (e.g., `Benetton`)
   - Away Team ID (e.g., `2019`)
10. **JSON generated** and copied to clipboard!
11. **Create file** `src/lib/data/urc-match-lineups/{matchId}.json` and paste
12. **Update** `urc-fixtures.json` to set `hasLineup: true`
13. **Commit & push**

### Why Use Parsers?
- ⚡ **10x faster** than manual JSON
- ✅ **No typos** in player names
- 🎯 **Extracts all 46 players** automatically
- 📝 **Formats positions** correctly
- 🔢 **Captures jersey numbers** automatically
- 🎨 **Simple 2-column layout**

---

## 📁 File Locations

### Fixtures
`src/lib/data/urc-fixtures.json`

### Lineups
`src/lib/data/urc-match-lineups/{matchId}.json` (one file per match)

---

## 📋 JSON Format Reference

### Fixtures Format:

```json
{
  "matchId": "287880",
  "round": "Round 4",
  "date": "Fri, 17 Oct 2025",
  "time": "14:45",
  "venue": "Dexcom Stadium",
  "home": {
    "team": "Connacht",
    "teamId": "5483",
    "abbreviation": "CON"
  },
  "away": {
    "team": "Bulls",
    "teamId": "5586",
    "abbreviation": "BUL"
  },
  "hasLineup": true
}
```

Set `hasLineup: true` when you've added the lineup JSON file.

---

## 📝 Adding a New Lineup

### Step 1: Get the Match ID
Example: `287880` from the match URL

### Step 2: Create JSON File
Create: `src/lib/data/urc-match-lineups/{MATCH_ID}.json`

Example: `src/lib/data/urc-match-lineups/287880.json`

### Step 3: Add Lineup Data

```json
{
  "matchId": "287880",
  "home": {
    "team": "Connacht",
    "teamId": "5483",
    "starting": [
      { "name": "Finlay Bealham", "number": 1, "position": "Prop" },
      { "name": "Dylan Tierney-Martin", "number": 2, "position": "Hooker" },
      ...15 players total
    ],
    "bench": [
      { "name": "Tadgh McElroy", "number": 16, "position": "Hooker" },
      ...8 players total
    ]
  },
  "away": {
    "team": "Bulls",
    "teamId": "5586",
    "starting": [...],
    "bench": [...]
  }
}
```

### Step 4: Deploy
```bash
git add src/lib/data/urc-match-lineups/
git commit -m "Add lineup for match 287880"
git push
```

---

## 🗂️ JSON Template

Copy this template for new matches:

```json
{
  "matchId": "MATCH_ID_HERE",
  "home": {
    "team": "TEAM_NAME",
    "teamId": "TEAM_ID",
    "starting": [
      { "name": "First Last", "number": 1, "position": "Prop" },
      { "name": "First Last", "number": 2, "position": "Hooker" },
      { "name": "First Last", "number": 3, "position": "Prop" },
      { "name": "First Last", "number": 4, "position": "Lock" },
      { "name": "First Last", "number": 5, "position": "Lock" },
      { "name": "First Last", "number": 6, "position": "Flanker" },
      { "name": "First Last", "number": 7, "position": "Flanker" },
      { "name": "First Last", "number": 8, "position": "Number 8" },
      { "name": "First Last", "number": 9, "position": "Scrum-Half" },
      { "name": "First Last", "number": 10, "position": "Fly-Half" },
      { "name": "First Last", "number": 11, "position": "Wing" },
      { "name": "First Last", "number": 12, "position": "Centre" },
      { "name": "First Last", "number": 13, "position": "Centre" },
      { "name": "First Last", "number": 14, "position": "Wing" },
      { "name": "First Last", "number": 15, "position": "Fullback" }
    ],
    "bench": [
      { "name": "First Last", "number": 16, "position": "Hooker" },
      { "name": "First Last", "number": 17, "position": "Prop" },
      { "name": "First Last", "number": 18, "position": "Prop" },
      { "name": "First Last", "number": 19, "position": "Lock" },
      { "name": "First Last", "number": 20, "position": "Flanker" },
      { "name": "First Last", "number": 21, "position": "Scrum-Half" },
      { "name": "First Last", "number": 22, "position": "Fly-Half" },
      { "name": "First Last", "number": 23, "position": "Centre" }
    ]
  },
  "away": {
    "team": "TEAM_NAME",
    "teamId": "TEAM_ID",
    "starting": [...same format as home...],
    "bench": [...same format as home...]
  }
}
```

---

## 🔍 Finding Team IDs

Use these team IDs for `teamId` field:

| Team | ID |
|------|-----|
| Munster | 4377 |
| Lions | 5092 |
| Edinburgh | 1641 |
| Ospreys | 3533 |
| Zebre Parma | 4474 |
| Cardiff | 4471 |
| Benetton | 2019 |
| Scarlets | 3514 |
| Sharks | 3994 |
| Leinster | 5356 |
| Glasgow Warriors | 3098 |
| Dragons | 5057 |
| Connacht | 5483 |
| Bulls | 5586 |
| Stormers | 4568 |
| Ulster | 2129 |

---

## ✨ What Happens Automatically

When you load a lineup:

1. ✅ **Loads JSON** - Reads the lineup file
2. ✅ **Matches names** - Finds players in GraphQL squad data
3. ✅ **Adds photos** - Uses player headshots from squad
4. ✅ **Adds stats** - Shows height, weight, age, position
5. ✅ **Displays beautifully** - Shows starting XV + bench with all details

---

## 🎯 Example: Adding Match 287880

1. Create file: `src/lib/data/urc-match-lineups/287880.json`
2. Paste lineup data (see template above)
3. Make sure player names match exactly with squad data
4. Commit and push
5. Users can now enter `287880` in the Match Lineups tab!

---

## 📦 File Structure

```
src/lib/data/urc-match-lineups/
├── 287880.json  ← Connacht vs Bulls
├── 287881.json  ← Next match
├── 287882.json  ← Next match
└── ...
```

---

## 💡 Tips

- **Name matching**: Use exact names from squad data for best results
- **Keep it simple**: Just player names, numbers, positions
- **GraphQL does the rest**: Photos and stats come from squad data automatically
- **One file per match**: Easy to manage and update

---

## 🚀 Deploy

```bash
git add .
git commit -m "Add URC Match Lineups (JSON approach)"
git push
```

**That's it!** Simple, reliable, and easy to maintain. 🏉

