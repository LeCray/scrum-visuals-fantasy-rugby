# Adding New Game Data to the Rugby Stats Application

This guide explains how to add new games, final scores, and boxscore data to the rugby stats application.

## 1. Adding a New Game/Fixture

To add a new game to the application, you need to modify two files:

### A. Add to Fixtures Data (`src/lib/data/fixtures.json`)

Add your new fixture to the fixtures.json file, following this format:

```json
{
  "date": "May 10th",
  "time": "14:00",
  "teamA": "TEAM A NAME",
  "teamB": "TEAM B NAME",
  "venue": "Match Venue"
}
```

### B. Add to Highlighted Fixtures List (`src/pages/Fixtures.tsx`)

To make the fixture appear in highlighted games, add it to the `highlightedGames` array in the `isHighlightedFixture` function:

```javascript
const highlightedGames = [
  // ... existing games
  { date: "May 10th", time: "14:00", teamA: "TEAM A NAME", teamB: "TEAM B NAME" },
];
```

## 2. Adding Final Score Data

Final scores are stored in `src/lib/boxScoreData.ts` using the `finalScores` Map.

Add your score by following these steps:

1. Generate a match ID using the existing pattern (lowercase, hyphenated format)
2. Add the final score to the `finalScores` Map

```typescript
// Example: Add a final score
const matchId = generateMatchId("May 10th", "14:00", "TEAM A NAME", "TEAM B NAME");
finalScores.set(matchId, { teamAScore: 27, teamBScore: 15 });
```

## 3. Adding Boxscore Data

Boxscore data requires more detailed information. Follow these steps:

### A. Create a New BoxScore Object

In `src/lib/boxScoreData.ts`, create a new BoxScoreData object:

```typescript
const teamAvsTeamB: BoxScoreData = {
  matchInfo: {
    teamA: "TEAM A NAME",
    teamB: "TEAM B NAME",
    venue: "Match Venue",
    date: "May 10th, 2025",
    kickoff: "14:00",
    weather: "Condition, Temperature", // e.g., "Sunny, 25°C"
  },
  // Team A players data
  teamAPlayers: [
    { 
      name: "Player Name", 
      position: "Position", // e.g., "FL", "SO", "HK"
      tries: 0, 
      kicks: "-", 
      lineouts: "-", 
      penaltiesWon: 0, 
      penaltiesConceded: 0 
    },
    // Add more players as needed
  ],
  // Team B players data
  teamBPlayers: [
    { 
      name: "Player Name", 
      position: "Position",
      tries: 0, 
      kicks: "-", 
      lineouts: "-", 
      penaltiesWon: 0, 
      penaltiesConceded: 0 
    },
    // Add more players as needed
  ],
  // Team statistics
  teamASummary: {
    totalTries: 3,
    totalConversions: "2/3 C, 1/2 PK", // Format: "Conversions/Attempts C, Penalties/Attempts PK"
    lineoutAccuracy: "5/7 (71%)",
    penaltiesWon: 4,
    penaltiesConceded: 7,
  },
  teamBSummary: {
    totalTries: 2,
    totalConversions: "1/2 C, 1/1 PK",
    lineoutAccuracy: "4/6 (67%)",
    penaltiesWon: 3,
    penaltiesConceded: 8,
  },
  // Try data - important for proper score calculation
  tryDataA: [
    {
      player: "Player Name",
      minute: 23,
      hasConversion: true,
      isPenalty: false // Regular try (5 points + 2 if converted)
    },
    {
      player: "Player Name",
      minute: 45,
      hasConversion: false,
      isPenalty: true // Penalty kick (3 points)
    }
    // Add more tries/penalties as needed
  ],
  tryDataB: [
    // Same format as tryDataA
  ],
  // Kick data (optional)
  kickDataA: [
    {
      player: "Kicker Name",
      minute: 23,
      isSuccessful: true,
      type: "C" // "C" for conversion, "P" for penalty
    }
    // Add more kicks as needed
  ],
  kickDataB: [
    // Same format as kickDataA
  ]
};
```

### B. Add the BoxScore to the Map

Add your new boxscore to the `boxScores` Map:

```typescript
// Add the boxscore to the map
const matchId = generateMatchId("May 10th", "14:00", "TEAM A NAME", "TEAM B NAME");
boxScores.set(matchId, teamAvsTeamB);
```

## 4. Understanding Tab Filtering

The application uses tabs to organize fixtures by competition or category. There are four main tabs:

1. **CBZ Schools Rugby** (key: "sbr2025")
2. **SA Schools Rugby** (key: "sa_schools")
3. **Zim Sables Games** (key: "zim")
4. **Derby Day** (key: "derby")

### A. How to Add a Fixture to a Specific Tab

When adding a new fixture, you need to add it to the correct fixture array in `src/pages/Fixtures.tsx` based on which tab it should appear under:

- For **CBZ Schools Rugby** tab: Add to `sbr2025Games` array
- For **SA Schools Rugby** tab: Add to `saSchoolsRugby` array
- For **Zim Sables Games** tab: Add to `zimSablesGames` array
- For **Derby Day** tab: Add to `derbyDay` array

Example for adding to CBZ Schools Rugby (sbr2025Games):

```javascript
const sbr2025Games: FixtureDay[] = [
  // ... existing weeks
  {
    date: "Week 11", // Use the appropriate week number
    day: "09 Aug",   // Day and date
    month: "August", // Month (important for filtering)
    fixtures: [
      { time: "14:00", teamA: "TEAM A NAME", teamB: "TEAM B NAME", location: "Venue Location" },
      // Add more fixtures for this week as needed
    ]
  }
];
```

### B. Filters Within Tabs

Each tab has specific filtering capabilities:

1. **CBZ Schools Rugby** and **SA Schools Rugby** tabs can be filtered by:
   - **Month**: Users can select a specific month to view only those fixtures
   - **Team Search**: Users can search for fixtures involving a specific team

2. **Derby Day** and **Zim Sables Games** tabs show all fixtures in those categories without additional filtering.

### C. Highlighting Games Across Tabs

The highlighted games (with yellow borders) can come from any tab. The key is to add the game to the `highlightedGames` array as described in section 1B. This allows these games to have detailed statistics accessed by clicking on them.

## Important Notes

1. **Match IDs**: Always use the `generateMatchId` function to create consistent match IDs
2. **Score Calculation**: The application calculates scores based on try and kick data:
   - Regular try = 5 points
   - Conversion = 2 points
   - Penalty kick = 3 points
3. **Consistency**: Make sure the team names, date, and time are consistent across all files
4. **Penalties vs Tries**: Use `isPenalty: true` in try data to indicate it's a penalty kick (3 points)

## Example of Complete Addition

Here's a complete example showing all the changes needed to add a new game:

1. Add to the appropriate fixtures array in `Fixtures.tsx` based on which tab it should appear under
2. Add to `fixtures.json` to make it a highlighted fixture
3. Add to highlightedGames list in `Fixtures.tsx` to show the yellow border
4. Create boxscore data in `boxScoreData.ts`
5. Add to boxScores Map
6. (Optional) Add to finalScores Map if you want to display the score without detailed boxscore data 