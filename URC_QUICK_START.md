# 🚀 URC Lineups - Quick Start

## Access the Page

Navigate to: **`/urc-lineups`**

Or add a link in your navigation:
```tsx
<Link to="/urc-lineups">URC Lineups</Link>
```

## How It Works

1. **Page loads** → Fetches Leinster squad by default
2. **Select team** → Dropdown shows all 16 URC teams
3. **Auto-fetch** → New squad data loads instantly
4. **View lineup** → Players organized by Forwards/Backs

## GraphQL Endpoint

```
POST https://unitedrugby.com/graphql
```

**Query (Updated for 2025 API):**
```graphql
query {
  playerThemeSettings {
    squads {
      currentClub
      squad {
        playerId
        knownName
        playerFirstName
        playerLastName
        playerPosition
        playerAge
        heroNumber
        headshots
        playerHeight
        playerWeight
      }
    }
  }
}
```

**No variables needed** - we fetch all squads and filter on the frontend by `currentClub`.

## Team IDs Reference

Quick copy-paste for testing:

```
Leinster: 1641
Munster: 1642
Ulster: 1643
Connacht: 1644
Glasgow Warriors: 1645
Edinburgh: 1646
Cardiff: 1647
Dragons: 1648
Ospreys: 1649
Scarlets: 1650
Benetton: 1651
Zebre Parma: 1652
Bulls: 1653
Stormers: 1654
Sharks: 1655
Lions: 1656
```

## Testing in Browser Console

```javascript
// Test the GraphQL endpoint (2025 API)
fetch('https://unitedrugby.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query {
        playerThemeSettings {
          squads {
            currentClub
            squad {
              knownName
              playerPosition
            }
          }
        }
      }
    `
    // No variables needed
  })
})
.then(r => r.json())
.then(d => {
  console.log(d);
  // Then filter by currentClub in your code
  const leinsterSquad = d.data.playerThemeSettings.squads.find(
    s => s.currentClub === '1641'
  );
  console.log('Leinster:', leinsterSquad);
});
```

## Customization

### Change Default Team

In `URCLineups.tsx`, line 70:
```typescript
const [selectedTeam, setSelectedTeam] = useState('1641'); // Change this ID
```

### Add More Teams

In `URCLineups.tsx`, add to `URC_TEAMS` array:
```typescript
{ id: 'XXXX', name: 'Team Name', region: 'Country' },
```

### Modify Colors

Current theme:
```typescript
Background: #0B0D18
Surface: #121527
Text: #E6E9F5
Accent: #2D6CFF
Border: rgba(45,108,255,0.3)
```

Search and replace these hex codes in the file to customize.

### Adjust Position Grouping

In `URCLineups.tsx`, lines 104-110:
```typescript
const forwards = players.filter(p => 
  ['Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8']
    .some(pos => p.playerPosition?.includes(pos))
);

const backs = players.filter(p => 
  ['Scrum-Half', 'Fly-Half', 'Centre', 'Wing', 'Fullback']
    .some(pos => p.playerPosition?.includes(pos))
);
```

## Features

✅ **Live Data** - Real-time from URC GraphQL API  
✅ **16 Teams** - All URC teams included  
✅ **Auto-Fetch** - Changes on team selection  
✅ **Headshots** - Player images when available  
✅ **Stats** - Age, height, weight displayed  
✅ **Responsive** - Works on mobile & desktop  
✅ **Animations** - Smooth Framer Motion effects  
✅ **Error Handling** - Retry on failures  
✅ **Loading States** - Visual feedback  
✅ **Dark Theme** - Scrummy glowing UI  

## Troubleshooting

**No data showing?**
- Check browser console for errors
- Verify team ID is correct (1641-1656)
- Check network tab for API response

**Images not loading?**
- Some players may not have headshots
- Fallback avatar shown automatically
- CORS or broken URLs handled gracefully

**Build errors?**
- Run `pnpm install` to ensure dependencies
- Check TypeScript types are correct
- Verify all imports are valid

## API Response Structure

```json
{
  "data": {
    "playerThemeSettings": {
      "squads": [
        {
          "currentClub": "1641",
          "squad": [
            {
              "playerId": "123",
              "playerFirstName": "John",
              "playerLastName": "Doe",
              "playerPosition": "Fly-Half",
              "playerAge": 28,
              "knownName": "Johnny Doe",
              "heroNumber": "10",
              "headshots": "https://...",
              "playerHeight": 185,
              "playerWeight": 92
            }
          ]
        }
      ]
    }
  }
}
```

## File Location

```
src/pages/URCLineups.tsx
```

## Dependencies Used

- React
- Framer Motion (animations)
- React Router (navigation)
- Lucide React (icons)
- Tailwind CSS (styling)

## Build & Deploy

```bash
# Build
pnpm run build

# Preview
pnpm run preview

# Deploy
# Built files in /dist ready for deployment
```

## Summary

**What:** Live URC squad lineups  
**Where:** `/urc-lineups`  
**Source:** https://unitedrugby.com/graphql  
**Teams:** All 16 URC teams  
**Data:** Player names, positions, stats, photos  
**Theme:** Dark glowing Scrummy UI  
**Status:** ✅ Production Ready  

---

**That's it! Navigate to `/urc-lineups` and enjoy! 🏉**

