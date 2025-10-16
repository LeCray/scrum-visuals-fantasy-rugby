# 🏉 URC Lineups - GraphQL Integration Guide

## Overview

The URC Lineups page fetches live squad data directly from the **official United Rugby Championship GraphQL API** at `https://unitedrugby.com/graphql`.

## 🎯 Features

### Live Data Integration
- ✅ Real-time squad data from official URC GraphQL API
- ✅ Team selection dropdown (all 16 URC teams)
- ✅ Automatic data fetching on team change
- ✅ Player headshots, stats, and positions
- ✅ Organized by Forwards and Backs

### UI/UX
- ✅ Dark glowing theme (Scrummy colors)
- ✅ Smooth Framer Motion animations
- ✅ Responsive two-column player cards
- ✅ Loading and error states
- ✅ Retry functionality on errors

## 📡 GraphQL Endpoint

```
POST https://unitedrugby.com/graphql
Content-Type: application/json
```

### Query Used (Updated for 2025 API)

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

**Note:** The URC API was refactored in 2025. The `squad` field no longer accepts arguments. Instead, we fetch all squads and filter by `currentClub` on the frontend.

## 🎨 Design System

### Colors (Scrummy Dark Theme)
- Background: `#0B0D18`
- Surface: `#121527`
- Text: `#E6E9F5`
- Accent: `#2D6CFF`
- Border Glow: `rgba(45,108,255,0.3)`

### Typography
- Bold, modern font weights
- High contrast for readability
- Glowing accents on interactive elements

### Animations
- Fade + slide-up on card appearance
- Staggered player card animations
- Smooth team switching transitions

## 🏴 Available Teams

| Team ID | Team Name | Region |
|---------|-----------|--------|
| 1641 | Leinster | Ireland |
| 1642 | Munster | Ireland |
| 1643 | Ulster | Ireland |
| 1644 | Connacht | Ireland |
| 1645 | Glasgow Warriors | Scotland |
| 1646 | Edinburgh | Scotland |
| 1647 | Cardiff | Wales |
| 1648 | Dragons | Wales |
| 1649 | Ospreys | Wales |
| 1650 | Scarlets | Wales |
| 1651 | Benetton | Italy |
| 1652 | Zebre Parma | Italy |
| 1653 | Bulls | South Africa |
| 1654 | Stormers | South Africa |
| 1655 | Sharks | South Africa |
| 1656 | Lions | South Africa |

## 🚀 Usage

### Access the Page
Navigate to: `/urc-lineups`

### Select a Team
1. Use the dropdown to select any URC team
2. Data automatically fetches and displays
3. View player details organized by position

## 📊 Data Structure

### Player Object
```typescript
interface Player {
  playerId: string;           // Unique player ID
  playerFirstName: string;    // First name
  playerLastName: string;     // Last name
  playerPosition: string;     // Position (e.g., "Prop", "Fly-Half")
  playerAge: number;          // Age in years
  knownName: string;          // Preferred/known name
  heroNumber: string;         // Jersey number
  headshots: string;          // Profile image URL
  playerHeight: number;       // Height in cm
  playerWeight: number;       // Weight in kg
}
```

### Display Format

**Player Card Layout:**
```
┌─────────────────────────────────────────┐
│  [IMG]  #15  Player Name                │
│         Position                        │
│                       Age: 28           │
│                       185cm             │
│                       95kg              │
└─────────────────────────────────────────┘
```

## 🔧 Technical Implementation

### Fetch Function
```typescript
const fetchLineup = async (teamId: string) => {
  const response = await fetch('https://unitedrugby.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: LINEUP_QUERY,
      // No variables needed - fetch all squads
    }),
  });
  
  const data = await response.json();
  
  // Filter by currentClub on the frontend
  const teamSquad = data.data.playerThemeSettings.squads.find(
    squad => squad.currentClub === teamId
  );
  
  setPlayers(teamSquad?.squad || []);
};
```

### Position Grouping
Players are automatically grouped into:
- **Forwards**: Prop, Hooker, Lock, Flanker, Number 8
- **Backs**: Scrum-Half, Fly-Half, Centre, Wing, Fullback
- **Squad**: Other positions

## 🎭 States

### Loading State
```
[Spinner Animation]
"Fetching latest lineups…"
```

### Error State
```
[Alert Icon]
"Unable to load lineups"
[Retry Button]
```

### Empty State
```
[Users Icon]
"No lineup data available for this team."
```

### Success State
```
Team Name (Region)
X players in squad

[Forwards Section]
[Player Cards...]

[Backs Section]
[Player Cards...]
```

## 🌐 API Response Example

```json
{
  "data": {
    "playerThemeSettings": {
      "squads": [
        {
          "currentClub": "1641",
          "squad": [
            {
              "playerId": "12345",
              "playerFirstName": "Johnny",
              "playerLastName": "Sexton",
              "playerPosition": "Fly-Half",
              "playerAge": 38,
              "knownName": "Johnny Sexton",
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

## ⚡ Performance

- **Lazy Loading**: Images load on demand
- **Staggered Animations**: Cards animate in sequence (30ms delay)
- **Optimized Fetching**: Only fetches on team change
- **Error Recovery**: Retry button for failed requests

## 🎯 User Experience

1. **Initial Load**: Leinster squad loads by default
2. **Team Selection**: Dropdown shows all 16 teams with regions
3. **Auto-Fetch**: Data fetches automatically on selection
4. **Visual Feedback**: Loading spinner during fetch
5. **Error Handling**: Clear error message with retry option
6. **Success**: Beautiful card layout with player details

## 📱 Responsive Design

### Mobile
- Single column layout
- Stacked player info
- Touch-friendly dropdowns
- Optimized image sizes

### Desktop
- Two-column player details
- Wider cards for better readability
- Hover effects on cards
- Larger headshot images

## 🔐 API Notes

### No Authentication Required
The GraphQL endpoint is public and doesn't require API keys or tokens.

### CORS Enabled
The endpoint supports cross-origin requests from web applications.

### Rate Limiting
Unknown - monitor for rate limit errors and implement caching if needed.

## 🚀 Future Enhancements

### Potential Features
1. **Player Search**: Filter players by name or position
2. **Squad Comparison**: Compare two teams side-by-side
3. **Player Details**: Click player for detailed stats
4. **Team Stats**: Show team average age, height, weight
5. **Formation View**: Visual field position display
6. **Export Lineup**: Download as PDF or image
7. **Match Lineups**: Show starting XV for specific matches

### Implementation Ideas

```typescript
// Player search
const [searchTerm, setSearchTerm] = useState('');
const filteredPlayers = players.filter(p => 
  p.knownName.toLowerCase().includes(searchTerm.toLowerCase())
);

// Team comparison
const [compareTeam, setCompareTeam] = useState('');
// Fetch both teams and display side-by-side

// Player modal
const [selectedPlayer, setSelectedPlayer] = useState(null);
// Show detailed stats in modal
```

## 📝 Disclaimer

> Data provided directly from the official United Rugby Championship API (unitedrugby.com/graphql). Displayed for informational use only.

## 🛠️ Troubleshooting

### Issue: No players showing
**Solution**: Check browser console for API errors. Verify team ID is correct.

### Issue: Images not loading
**Solution**: Images may have CORS restrictions or broken URLs. Fallback avatar is shown automatically.

### Issue: GraphQL error
**Solution**: Check query syntax and variables format. Ensure API endpoint is accessible.

### Issue: Slow loading
**Solution**: Check network connection. API response time may vary.

## ✅ Summary

The URC Lineups page provides:
- ✅ Live GraphQL integration with official URC API
- ✅ Beautiful dark-themed UI matching Scrummy design
- ✅ Smooth animations and transitions
- ✅ Responsive layout for all devices
- ✅ Comprehensive error handling
- ✅ All 16 URC teams supported
- ✅ Production-ready implementation

**Access at**: `/urc-lineups`

---

**Implementation Date**: October 16, 2025  
**API Source**: https://unitedrugby.com/graphql  
**Status**: ✅ Production Ready

