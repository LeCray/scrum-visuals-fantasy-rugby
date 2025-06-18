// Types from BoxScore component
export type Player = {
  name: string;
  position: string;
  tries: number;
  kicks: string;
  lineouts: string;
  penaltiesWon: number;
  penaltiesConceded: number;
};

// Type for try scoring data
export type TryScore = {
  time: string;
  hasConversion: boolean;
  isPenalty?: boolean;
};

// Type for kick data
export type KickAtGoal = {
  x: number;
  y: number;
  successful: boolean;
};

// Define the structure for a team summary
export type TeamStats = {
  totalTries: number;
  totalConversions: string;
  lineoutAccuracy: string;
  penaltiesWon: number;
  penaltiesConceded: number;
  possession?: number;
  scrums?: { total: number; won: number };
  lineouts?: { total: number; won: number };
  turnovers?: number;
  knockOns?: number;
  // New stats from screenshots
  cards?: { yellow: number; red: number };
  mauls?: { total: number; won: number };
  kicks?: {
    fromHand?: { total: number; reclaimed: number };
    inField?: { total: number; reclaimed: number };
    toTouch?: { total: number };
    dropOuts?: { total: number; reclaimed: number };
    goalLine?: { total: number; reclaimed?: number };
    directToTouch?: { total: number };
    success?: { total: number; successful: number };
  };
  attackingPenalties?: number;
  defensivePenalties?: number;
  scrumPenalties?: number;
  penaltyCauses?: {
    offside?: number;
    ruckOffence?: number;
    notReleasePlayer?: number;
    violentFoulPlay?: number;
    notReleasingBall?: number;
    dangerousTackle?: number;
    scrum?: number;
  };
};

// Define the structure for a box score
export type BoxScoreData = {
  matchInfo: {
    teamA: string;
    teamB: string;
    venue: string;
    date: string;
    kickoff: string;
    weather: string;
  };
  teamAPlayers: Array<{
    name: string;
    position: string;
    tries: number;
    kicks: string;
    lineouts: string;
    penaltiesWon: number;
    penaltiesConceded: number;
  }>;
  teamBPlayers: Array<{
    name: string;
    position: string;
    tries: number;
    kicks: string;
    lineouts: string;
    penaltiesWon: number;
    penaltiesConceded: number;
  }>;
  teamASummary: TeamStats;
  teamBSummary: TeamStats;
  tryDataA?: TryScore[];
  tryDataB?: TryScore[];
  kickDataA?: KickAtGoal[];
  kickDataB?: KickAtGoal[];
};

// Example box score data for one match
const exampleBoxScore: BoxScoreData = {
  matchInfo: {
    teamA: "MILTON 1XV",
    teamB: "WISE OWL 1XV",
    venue: "St John's College",
    date: "April 28th, 2025",
    kickoff: "13:00",
    weather: "Sunny, 22°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 1,
    totalConversions: "1/1 PK",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 1,
    totalConversions: "1/1",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

// Function to generate a unique ID for each match
const generateMatchId = (date: string, time: string, teamA: string, teamB: string) => {
  return `${date}-${time}-${teamA}-${teamB}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
};

// Map to store box scores by match ID
export const boxScores = new Map<string, BoxScoreData>();

// Add example box score
boxScores.set(
  generateMatchId("April 28th", "13:00", "MILTON 1XV", "WISE OWL 1XV"),
  exampleBoxScore
);

// Sample box scores for all highlighted matches
const rydingsVsHeritage: BoxScoreData = {
  matchInfo: {
    teamA: "RYDINGS 1XV",
    teamB: "HERITAGE 1XV",
    venue: "St John's College",
    date: "April 28th, 2025",
    kickoff: "15:40",
    weather: "Partly Cloudy, 24°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 2,
    totalConversions: "0/0 C, 3/3 PK",
    lineoutAccuracy: "4/7 (57%)",
    penaltiesWon: 3,
    penaltiesConceded: 9,
  },
  teamBSummary: {
    totalTries: 2,
    totalConversions: "1/1 C, 2/2 PK",
    lineoutAccuracy: "4/5 (80%)",
    penaltiesWon: 2,
    penaltiesConceded: 10,
  },
};

const lomagundiVsStAlbans: BoxScoreData = {
  matchInfo: {
    teamA: "LOMAGUNDI 1XV",
    teamB: "ST ALBANS 1XV",
    venue: "St John's College",
    date: "April 29th, 2025",
    kickoff: "14:20",
    weather: "Sunny, 26°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 3,
    totalConversions: "3/3 C, 1/1 PK",
    lineoutAccuracy: "-",
    penaltiesWon: 1,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 3,
    totalConversions: "3/3 C, 1/1 PK",
    lineoutAccuracy: "-",
    penaltiesWon: 1,
    penaltiesConceded: 0,
  },
};

const stGeorgesVsStAndrews: BoxScoreData = {
  matchInfo: {
    teamA: "ST GEORGE'S 1XV",
    teamB: "ST ANDREW'S 1XV",
    venue: "St John's College",
    date: "April 29th, 2025",
    kickoff: "15:40",
    weather: "Clear, 25°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 0,
    totalConversions: "2/2 PK",
    lineoutAccuracy: "-",
    penaltiesWon: 2,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 7,
    totalConversions: "1/3 C, 2/2 PK",
    lineoutAccuracy: "-",
    penaltiesWon: 2,
    penaltiesConceded: 0,
  },
};

// Add all box scores to the map
boxScores.set(
  generateMatchId("April 28th", "15:40", "RYDINGS 1XV", "HERITAGE 1XV"),
  rydingsVsHeritage
);

boxScores.set(
  generateMatchId("April 29th", "14:20", "LOMAGUNDI 1XV", "ST ALBANS 1XV"),
  lomagundiVsStAlbans
);

boxScores.set(
  generateMatchId("April 29th", "15:40", "ST GEORGE'S 1XV", "ST ANDREW'S 1XV"),
  stGeorgesVsStAndrews
);

const goldridgeVsHillcrest: BoxScoreData = {
  matchInfo: {
    teamA: "GOLDRIDGE 1XV",
    teamB: "HILLCREST 1XV",
    venue: "St John's College",
    date: "April 30th, 2025",
    kickoff: "13:00",
    weather: "Sunny, 27°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 2,
    totalConversions: "1/1 C",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 8,
    totalConversions: "5/8 C",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

const watershedVsGateway: BoxScoreData = {
  matchInfo: {
    teamA: "WATERSHED 1XV",
    teamB: "GATEWAY 1XV",
    venue: "St John's College",
    date: "April 30th, 2025",
    kickoff: "15:40",
    weather: "Partly Cloudy, 25°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 2,
    totalConversions: "2/2 C",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 3,
    totalConversions: "3/3 C, 1/1 PK",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

const peterhouseVsStAndrews: BoxScoreData = {
  matchInfo: {
    teamA: "PETERHOUSE 1XV",
    teamB: "ST ANDREW'S 1XV",
    venue: "St John's College",
    date: "May 1st, 2025",
    kickoff: "13:20",
    weather: "Sunny, 24°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 4,
    totalConversions: "2/2 C",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 8,
    totalConversions: "3/3 C",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

// Add these box scores to the map
boxScores.set(
  generateMatchId("April 30th", "13:00", "GOLDRIDGE 1XV", "HILLCREST 1XV"),
  goldridgeVsHillcrest
);

boxScores.set(
  generateMatchId("April 30th", "15:40", "WATERSHED 1XV", "GATEWAY 1XV"),
  watershedVsGateway
);

boxScores.set(
  generateMatchId("May 1st", "13:20", "PETERHOUSE 1XV", "ST ANDREW'S 1XV"),
  peterhouseVsStAndrews
);

const falconsVsEagles: BoxScoreData = {
  matchInfo: {
    teamA: "FALCON 1XV",
    teamB: "EAGLES 1XV",
    venue: "St John's College",
    date: "May 1st, 2025",
    kickoff: "15:00",
    weather: "Clear, 26°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

const churchillVsPlumtree: BoxScoreData = {
  matchInfo: {
    teamA: "CHURCHILL 1XV",
    teamB: "PLUMTREE 1XV",
    venue: "St John's College",
    date: "May 2nd, 2025",
    kickoff: "13:00",
    weather: "Sunny, 28°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

const princeEdwardVsStJohns: BoxScoreData = {
  matchInfo: {
    teamA: "PRINCE EDWARD 1XV",
    teamB: "ST JOHN'S 1XV",
    venue: "St John's College",
    date: "May 2nd, 2025",
    kickoff: "15:00",
    weather: "Partly Cloudy, 25°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

// Add these box scores to the map
boxScores.set(
  generateMatchId("May 1st", "15:00", "FALCON 1XV", "EAGLES 1XV"),
  falconsVsEagles
);

boxScores.set(
  generateMatchId("May 2nd", "13:00", "CHURCHILL 1XV", "PLUMTREE 1XV"),
  churchillVsPlumtree
);

boxScores.set(
  generateMatchId("May 2nd", "15:00", "PRINCE EDWARD 1XV", "ST JOHN'S 1XV"),
  princeEdwardVsStJohns
);

const zamSteelersVsSharks: BoxScoreData = {
  matchInfo: {
    teamA: "ZAM STEELERS",
    teamB: "SHARKS ACADEMY",
    venue: "St John's College",
    date: "May 1st, 2025",
    kickoff: "16:00",
    weather: "Clear, 24°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 2,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 13,
    totalConversions: "1/13 C",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

const cbcVsPeterhouse: BoxScoreData = {
  matchInfo: {
    teamA: "CBC 1XV",
    teamB: "PETERHOUSE 1XV",
    venue: "St John's College",
    date: "May 3rd, 2025",
    kickoff: "14:30",
    weather: "Clear, 27°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

const princeEdwardVsChurchill: BoxScoreData = {
  matchInfo: {
    teamA: "PRINCE EDWARD 1XV",
    teamB: "CHURCHILL 1XV",
    venue: "St John's College",
    date: "May 3rd, 2025",
    kickoff: "15:45",
    weather: "Partly Cloudy, 26°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

const falconVsStAlbans: BoxScoreData = {
  matchInfo: {
    teamA: "FALCON 1XV",
    teamB: "ST ALBANS 1XV",
    venue: "St John's College",
    date: "May 4th, 2025",
    kickoff: "13:00",
    weather: "Sunny, 25°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

const stJohnsVsStAndrews: BoxScoreData = {
  matchInfo: {
    teamA: "ST JOHN'S 1XV",
    teamB: "ST ANDREW'S 1XV",
    venue: "St John's College",
    date: "May 4th, 2025",
    kickoff: "15:00",
    weather: "Clear, 24°C",
  },
  teamAPlayers: [
    { name: "-", position: "FL", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "SO", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "PR", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "HK", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "FH", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
  teamBSummary: {
    totalTries: 0,
    totalConversions: "-",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
  },
};

// Add these box scores to the map
boxScores.set(
  generateMatchId("May 1st", "16:00", "ZAM STEELERS", "SHARKS ACADEMY"),
  zamSteelersVsSharks
);

boxScores.set(
  generateMatchId("May 3rd", "10:20", "CBC 1XV", "PETERHOUSE 1XV"),
  cbcVsPeterhouse
);

boxScores.set(
  generateMatchId("May 3rd", "11:40", "PRINCE EDWARD 1XV", "CHURCHILL 1XV"),
  princeEdwardVsChurchill
);

boxScores.set(
  generateMatchId("May 3rd", "14:20", "FALCON 1XV", "ST ALBANS 1XV"),
  falconVsStAlbans
);

boxScores.set(
  generateMatchId("May 3rd", "15:40", "ST JOHN'S 1XV", "ST ANDREW'S 1XV"),
  stJohnsVsStAndrews
);

// Lomagundi vs Watershed (example data)
const lomagundiVsWatershed: BoxScoreData = {
  matchInfo: {
    teamA: "LOMAGUNDI 1XV",
    teamB: "WATERSHED 1XV",
    venue: "Lomagundi College, Chinhoyi",
    date: "May 10th, 2025",
    kickoff: "14:00",
    weather: "Sunny, 27°C",
  },
  teamAPlayers: [
    { name: "M. Mhaka", position: "15", tries: 1, kicks: "1/1 C", lineouts: "2/2", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "T. Marais", position: "14", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "L. Kawadza", position: "13", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "K. Makunike", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "N. Chibaya", position: "11", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "L. Makore", position: "10", tries: 0, kicks: "2/3 PK", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "B. Nyika", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "T. Mugabe", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
  ],
  teamBPlayers: [
    { name: "T. Makombe", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "K. Nyamushita", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Z. Chaita", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "F. Wilson", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "S. Gurupira", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "E. Mandizvidza", position: "10", tries: 0, kicks: "1/2 C, 1/1 PK", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "R. Tshuma", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "A. Majoni", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 0 },
  ],
  teamASummary: {
    totalTries: 3,
    totalConversions: "1/1 C, 2/3 PK",
    lineoutAccuracy: "2/2 (100%)",
    penaltiesWon: 3,
    penaltiesConceded: 2,
    possession: 55,
    scrums: { total: 6, won: 5 },
    lineouts: { total: 4, won: 3 },
    turnovers: 4,
    knockOns: 3,
    cards: { yellow: 0, red: 0 },
    mauls: { total: 1, won: 1 },
    kicks: {
      fromHand: { total: 6, reclaimed: 2 },
      inField: { total: 3, reclaimed: 1 },
      toTouch: { total: 2 },
      dropOuts: { total: 1, reclaimed: 1 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 3, successful: 2 }
    },
    attackingPenalties: 2,
    defensivePenalties: 1,
    scrumPenalties: 0
  },
  teamBSummary: {
    totalTries: 1,
    totalConversions: "1/2 C, 1/1 PK",
    lineoutAccuracy: "1/2 (50%)",
    penaltiesWon: 1,
    penaltiesConceded: 3,
    possession: 45,
    scrums: { total: 5, won: 4 },
    lineouts: { total: 2, won: 1 },
    turnovers: 5,
    knockOns: 4,
    cards: { yellow: 1, red: 0 },
    mauls: { total: 0, won: 0 },
    kicks: {
      fromHand: { total: 5, reclaimed: 1 },
      inField: { total: 2, reclaimed: 0 },
      toTouch: { total: 1 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 2, successful: 1 }
    },
    attackingPenalties: 1,
    defensivePenalties: 2,
    scrumPenalties: 1
  }
};

// Add to boxScores map
boxScores.set(
  generateMatchId("May 10th", "14:00", "LOMAGUNDI 1XV", "WATERSHED 1XV"),
  lomagundiVsWatershed
);

// Function to get box score by match details
export const getBoxScore = (date: string, time: string, teamA: string, teamB: string) => {
  const matchId = generateMatchId(date, time, teamA, teamB);
  return boxScores.get(matchId) || null;
};

// Type for final scores
export type FinalScore = {
  teamAScore: number;
  teamBScore: number;
};

// Map to store final scores independently from box scores
export const finalScores = new Map<string, FinalScore>();

// Add some example final scores
finalScores.set(
  generateMatchId("April 28th", "9:00", "EAGLESVALE 2XV", "WATERSHED 2XV"),
  { teamAScore: 24, teamBScore: 28 }
);

finalScores.set(
  generateMatchId("April 28th", "10:20", "GOLDRIDGE 1XV", "GATEWAY 1XV"),
  { teamAScore: 22, teamBScore: 22 }
);

finalScores.set(
  generateMatchId("April 28th", "11:40", "WATERSHED 1XV", "MIDLANDS CC 1XV"),
  { teamAScore: 19, teamBScore: 28 }
);

finalScores.set(
  generateMatchId("April 28th", "13:00", "MILTON 1XV", "WISE OWL 1XV"),
  { teamAScore: 8, teamBScore: 7 }
);

finalScores.set(
  generateMatchId("April 28th", "14:20", "HILLCREST 1XV", "EAGLESVALE 1XV"),
  { teamAScore: 21, teamBScore: 49 }
);

finalScores.set(
  generateMatchId("April 28th", "15:40", "RYDINGS 1XV", "HERITAGE 1XV"),
  { teamAScore: 19, teamBScore: 18 }
);

finalScores.set(
  generateMatchId("April 29th", "10:20", "FALCON 2XV", "ST ALBANS 2XV"),
  { teamAScore: 10, teamBScore: 15 }
);

finalScores.set(
  generateMatchId("April 29th", "11:40", "PETERHOUSE 2XV", "ST GEORGE'S 2XV"),
  { teamAScore: 24, teamBScore: 38 }
);

finalScores.set(
  generateMatchId("April 29th", "13:00", "ST JOHN'S 2XV", "PRINCE EDWARD'S 2XV"),
  { teamAScore: 31, teamBScore: 24 }
);

finalScores.set(
  generateMatchId("April 29th", "14:20", "LOMAGUNDI 1XV", "ST ALBANs 1XV"),
  { teamAScore: 24, teamBScore: 24 }
);

finalScores.set(
  generateMatchId("April 29th", "15:40", "ST GEORGE'S 1XV", "ST ANDREW'S 1XV"),
  { teamAScore: 6, teamBScore: 43 }
);

finalScores.set(
  generateMatchId("April 30th", "9:00", "WISE OWL 2XV", "LOMAGUNDI 2XV"),
  { teamAScore: 19, teamBScore: 22 }
);
finalScores.set(
  generateMatchId("April 30th", "10:20", "WATERSHED 2XV", "CBC 2XV"),
  { teamAScore: 27, teamBScore: 29 }
);

finalScores.set(
  generateMatchId("April 30th", "11:40", "RYDINGS 1XV", "MIDLANDS CC 1XV"),
  { teamAScore: 18, teamBScore: 32 }
);

finalScores.set(
  generateMatchId("April 30th", "13:00", "GOLDRIDGE 1XV", "HILLCREST 1XV"),
  { teamAScore: 12, teamBScore: 50 }
);

finalScores.set(
  generateMatchId("April 30th", "14:20", "EAGLESVALE 1XV", "HERITAGE 1XV"),
  { teamAScore: 8, teamBScore: 7 }
);

finalScores.set(
  generateMatchId("April 30th", "15:40", "WATERSHED 1XV", "GATEWAY 1XV"),
  { teamAScore: 14, teamBScore: 24 }
);

finalScores.set(
  generateMatchId("May 1st", "8:00", "ST GEORGE'S 2XV", "ST ALBANs 2XV"),
  { teamAScore: 21, teamBScore: 8 }
);

finalScores.set(
  generateMatchId("May 1st", "9:20", "ST GEORGE'S 1XV", "PRINCE EDWARD 1XV"),
  { teamAScore: 35, teamBScore: 15 }
);

finalScores.set(
  generateMatchId("May 1st", "10:40", "CBC 1XV", "FALCON 1XV"),
  { teamAScore: 7, teamBScore: 29 }
);

finalScores.set(
  generateMatchId("May 1st", "12:00", "LOMAGUNDI 1XV", "CHURCHILL 1XV"),
  { teamAScore: 29, teamBScore: 20 }
);

finalScores.set(
  generateMatchId("May 1st", "13:20", "PETERHOUSE 1XV", "ST ANDREW'S 1XV"),
  { teamAScore: 24, teamBScore: 46 }
);

finalScores.set(
  generateMatchId("May 1st", "14:40", "ST JOHN'S 1XV", "ST ALBANS 1XV"),
  { teamAScore: 14, teamBScore: 26 }
);

finalScores.set(
  generateMatchId("May 1st", "16:00", "ZAM STEELERS", "SHARKS ACADEMY"),
  { teamAScore: 10, teamBScore: 67 }
);

finalScores.set(
  generateMatchId("May 2nd", "9:00", "MILTON 2XV", "WISE OWL 2XV"),
  { teamAScore: 5, teamBScore: 43 }
);

finalScores.set(
  generateMatchId("May 2nd", "10:20", "EAGLESVALE 2XV", "CBC 2XV"),
  { teamAScore: 10, teamBScore: 20 }
);

finalScores.set(
  generateMatchId("May 2nd", "11:40", "MILTON 1XV", "LOMAGUNDI 2XV"),
  { teamAScore: 34, teamBScore: 22 }
);

finalScores.set(
  generateMatchId("May 2nd", "14:20", "RYDINGS 1XV", "WISE OWL 1XV"),
  { teamAScore: 6, teamBScore: 60 }
);

finalScores.set(
  generateMatchId("May 2nd", "13:00", "PRINCE EDWARD 2XV", "LORD BRIGHTON 2XV"),
  { teamAScore: 57, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("May 2nd", "15:40", "PETERHOUSE 2XV", "FALCON 2XV"),
  { teamAScore: 43, teamBScore: 13 }
);

finalScores.set(
  generateMatchId("TODAY", "11:30", "ZIMBABWE U20", "SHARKS ACADEMY"),
  { teamAScore: 46, teamBScore: 39 }
);

finalScores.set(
  generateMatchId("TODAY", "14:30", "ZIMBABWE SABLES", "ZAMBIA"),
  { teamAScore: 70, teamBScore: 15 }
);

finalScores.set(
  generateMatchId("May 3rd", "9:00", "ST JOHN'S 2XV", "ST ALBANS 2XV"),
  { teamAScore: 14, teamBScore:14  }
);

finalScores.set(
  generateMatchId("May 3rd", "10:20", "CBC 1XV", "PETERHOUSE 1XV"),
  { teamAScore: 10, teamBScore:32  }
);

finalScores.set(
  generateMatchId("May 3rd", "11:40", "PRINCE EDWARD 1XV", "CHURCHILL 1XV"),
  { teamAScore: 3, teamBScore: 23 }
);

finalScores.set(
  generateMatchId("May 3rd", "13:00", "LOMAGUNDI 1XV", "ST GEORGE'S 1XV"),
  { teamAScore: 39, teamBScore: 15 }
);

finalScores.set(
  generateMatchId("May 3rd", "14:20", "FALCON 1XV", "ST ALBANS 1XV"),
  { teamAScore: 14, teamBScore: 17 }
);

finalScores.set(
  generateMatchId("May 3rd", "15:40", "ST JOHN'S 1XV", "ST ANDREW'S 1XV"),
  { teamAScore: 39, teamBScore: 41 }
);

finalScores.set(
  generateMatchId("May 4th", "11:30", "ZIMBABWE U20", "SHARKS ACADEMY"),
  { teamAScore: 46, teamBScore: 39 }
);

finalScores.set(
  generateMatchId("May 4th", "14:30", "ZIMBABWE SABLES", "ZAMBIA"),
  { teamAScore: 70, teamBScore: 15 }
);

// Function to get final score for a match
export const getFinalScore = (date: string, time: string, teamA: string, teamB: string) => {
  const matchId = generateMatchId(date, time, teamA, teamB);
  return finalScores.get(matchId);
};

// Add scores for May 16th SA Schools Rugby games
finalScores.set(
  generateMatchId("May 16th", "TBD", "ST CHARLES COLLEGE", "CLIFTON SCHOOL"),
  { teamAScore: 47, teamBScore: 14 }
);

finalScores.set(
  generateMatchId("May 16th", "TBD", "MICHAELHOUSE", "NORTHWOOD SCHOOL"),
  { teamAScore: 29, teamBScore: 43 }
);

finalScores.set(
  generateMatchId("May 16th", "TBD", "KEARSNEY COLLEGE", "DURBAN HIGH SCHOOL"),
  { teamAScore: 20, teamBScore: 42 }
);

finalScores.set(
  generateMatchId("May 16th", "TBD", "MARITZBURG COLLEGE", "WESTVILLE BOYS' HIGH SCHOOL"),
  { teamAScore: 21, teamBScore: 22 }
);

finalScores.set(
  generateMatchId("May 16th", "TBD", "HILTON COLLEGE", "GLENWOOD HIGH SCHOOL"),
  { teamAScore: 53, teamBScore: 15 }
);

finalScores.set(
  generateMatchId("May 16th", "TBD", "TIER 2 URBAN", "TIER 2 CD"),
  { teamAScore: 8, teamBScore: 40 }
);

finalScores.set(
  generateMatchId("May 24th", "TBD", "QUEEN'S COLLEGE", "GREY HIGH SCHOOL"),
  { teamAScore: 25, teamBScore: 24 }
);


// Add scores for May 31st SA Schools Rugby matches
finalScores.set(
  generateMatchId("May 31st", "TBD", "PRETORIA BOYS HIGH SCHOOL", "MICHEALHOUSE"),
  { teamAScore: 24, teamBScore: 31 }
);

finalScores.set(
  generateMatchId("May 31st", "TBD", "MARITZBURG COLLEGE", "KEARSNEY COLLEGE"),
  { teamAScore: 35, teamBScore: 20 }
);

finalScores.set(
  generateMatchId("May 31st", "TBD", "WESTVILLE BOYS' HIGH SCHOOL", "GLENWOOD HIGH SCHOOL"),
  { teamAScore: 42, teamBScore: 25 }
);

finalScores.set(
  generateMatchId("May 31st", "TBD", "DURBAN HIGH SCHOOL", "HILTON COLLEGE"),
  { teamAScore: 26, teamBScore: 18 }
);

finalScores.set(
  generateMatchId("May 31st", "TBD", "GREY HIGH SCHOOL", "ST ANDREW'S"),
  { teamAScore: 27, teamBScore: 28 }
);

finalScores.set(
  generateMatchId("May 31st", "TBD", "GREYTOWN HIGH SCHOOL", "LADYSMITH HIGH SCHOOL"),
  { teamAScore: 13, teamBScore: 12 }
);

finalScores.set(
  generateMatchId("May 31st", "TBD", "VRYHEID LANDBOU SCHOOL", "DUNDEE HIGH SCHOOL"),
  { teamAScore: 27, teamBScore: 24 }
);

// Add scores for CBZ Schools Rugby matches
finalScores.set(
  generateMatchId("Week 1", "14:00", "ST JOHNS", "PRINCE EDWARD"),
  { teamAScore: 32, teamBScore: 27 }
);

finalScores.set(
  generateMatchId("Week 1", "14:00", "KYLE", "ST GEORGES"),
  { teamAScore: 15, teamBScore: 31 }
);

finalScores.set(
  generateMatchId("Week 1", "14:00", "HELLENIC", "WATERSHED"),
  { teamAScore: 41, teamBScore: 10 }
);

// Add score for Rydings vs Nattie College match
finalScores.set(
  generateMatchId("Week 1", "TBA", "NATTIE COLLEGE", "RYDINGS"),
  { teamAScore: 26, teamBScore: 62 }
);

// Add score for Gateway vs Hillcrest match
finalScores.set(
  generateMatchId("Week 1", "14:00", "GATEWAY", "HILLCREST"),
  { teamAScore: 24, teamBScore: 34 }
);

// Add score for Wise Owl vs Churchill match
finalScores.set(
  generateMatchId("Week 1", "14:30", "WISE OWL", "CHURCHILL"),
  { teamAScore: 33, teamBScore: 30 }
);

// Add score for Allan Wilson vs Milton match
finalScores.set(
  generateMatchId("Week 1", "14:00", "ALLAN WILSON", "MILTON"),
  { teamAScore: 5, teamBScore: 38 }
);

finalScores.set(
  generateMatchId("Week 1", "14:00", "GOLDRIDGE", "EAGLESVALE"),
  { teamAScore: 3, teamBScore: 43 }
);

finalScores.set(
  generateMatchId("Week 1", "14:00", "MIDLANDS CC", "HERITAGE"),
  { teamAScore: 18, teamBScore: 21 }
);

finalScores.set(
  generateMatchId("Week 1", "14:00", "PETERHOUSE", "CBC"),
  { teamAScore: 37, teamBScore: 7 }
);

finalScores.set(
  generateMatchId("Week 1", "15:15", "LOMAGUNDI", "FALCON"),
  { teamAScore: 48, teamBScore: 16 }
);

finalScores.set(
  generateMatchId("Week 2", "11:30", "GATEWAY", "HERITAGE"),
  { teamAScore: 5, teamBScore: 24 }
);

finalScores.set(
  generateMatchId("Week 2", "12:30", "WATERSHED", "HILLCREST"),
  { teamAScore: 32, teamBScore: 24 }
);

finalScores.set(
  generateMatchId("Week 2", "15:00", "HELLENIC", "EAGLESVALE"),
  { teamAScore: 35, teamBScore: 30 }
);

finalScores.set(
  generateMatchId("Week 2", "15:30", "PRINCE EDWARD", "CHURCHILL"),
  { teamAScore: 26, teamBScore: 27 }
);

finalScores.set(
  generateMatchId("Week 2", "15:30", "ST GEORGES", "ST JOHNS"),
  { teamAScore: 45, teamBScore: 29 }
);

finalScores.set(
  generateMatchId("Week 2", "15:30", "FALCON", "CBC"),
  { teamAScore: 10, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 2", "TBD", "PETERHOUSE", "LOMAGUNDI"),
  { teamAScore: 46, teamBScore: 23 }
);

// Add scores for Week 3 CBZ Schools Rugby matches
finalScores.set(
  generateMatchId("Week 3", "09:00", "ST GEORGES 4TH", "ALLAN WILSON 1ST"),
  { teamAScore: 10, teamBScore: 25 }
);

finalScores.set(
  generateMatchId("Week 3", "10:30", "PETRA", "GATEWAY"),
  { teamAScore: 0, teamBScore: 48 }
);

finalScores.set(
  generateMatchId("Week 3", "12:05", "MIDLANDS CC", "GOLDRIDGE"),
  { teamAScore: 8, teamBScore: 14 }
);

finalScores.set(
  generateMatchId("Week 3", "12:30", "HERITAGE", "RYDINGS"),
  { teamAScore: 31, teamBScore: 20 }
);

finalScores.set(
  generateMatchId("Week 3", "12:30", "ELIS ROBINS", "MUTARE"),
  { teamAScore: 14, teamBScore: 17 }
);

finalScores.set(
  generateMatchId("Week 3", "12:50", "PRINCE EDWARD", "HILLCREST"),
  { teamAScore: 70, teamBScore: 15 }
);

finalScores.set(
  generateMatchId("Week 3", "13:20", "MILTON", "CHURCHILL"),
  { teamAScore: 5, teamBScore: 55 }
);

finalScores.set(
  generateMatchId("Week 3", "14:00", "ST GEORGES", "LOMAGUNDI"),
  { teamAScore: 34, teamBScore: 33 }
);

finalScores.set(
  generateMatchId("Week 3", "14:45", "HELLENIC", "ST JOHNS"),
  { teamAScore: 0, teamBScore: 33 }
);

finalScores.set(
  generateMatchId("Week 3", "15:00", "WISE OWL", "PLUMTREE"),
  { teamAScore: 31, teamBScore: 5 }
);

finalScores.set(
  generateMatchId("Week 3", "15:30", "KYLE", "WATERSHED"),
  { teamAScore: 29, teamBScore: 20 }
);

finalScores.set(
  generateMatchId("Week 3", "15:30", "FALCON", "PETERHOUSE"),
  { teamAScore: 30, teamBScore: 31 }
);

finalScores.set(
  generateMatchId("Week 3", "15:30", "CBC", "EAGLESVALE"),
  { teamAScore: 30, teamBScore: 7 }
);

finalScores.set(
  generateMatchId("Week 4", "11:30", "MIDLANDS CC", "GATEWAY"),
  { teamAScore: 23, teamBScore: 18 }
);

finalScores.set(
  generateMatchId("Week 4", "12:00", "BMC", "ELLIS ROBINS"),
  { teamAScore: 21, teamBScore: 15 }
);

finalScores.set(
  generateMatchId("Week 4", "12:00", "MILTON", "WISE OWL"),
  { teamAScore: 17, teamBScore: 18 }
);

finalScores.set(
  generateMatchId("Week 4", "12:30", "MUTARE", "VICTORIA HIGH"),
  { teamAScore: 49, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 4", "13:00", "HILLCREST", "WATERSHED"),
  { teamAScore: 32, teamBScore: 3 }
);

finalScores.set(
  generateMatchId("Week 4", "13:30", "HELLENIC", "HERITAGE"),
  { teamAScore: 50, teamBScore: 19 }
);

finalScores.set(
  generateMatchId("Week 4", "14:45", "PETERHOUSE", "ST JOHNS"),
  { teamAScore: 20, teamBScore: 19 }
);

finalScores.set(
  generateMatchId("Week 4", "15:00", "CHURCHILL", "ALLAN WILSON"),
  { teamAScore: 57, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 4", "15:00", "EAGLESVALE", "PETRA"),
  { teamAScore: 53, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 4", "15:30", "KYLE", "LOMAGUNDI"),
  { teamAScore: 17, teamBScore: 58 }
);
// Define tries with timestamps and conversion status for Hellenic vs Watershed
const hellenicTries = [
  { time: "08:52", hasConversion: true },
  { time: "17:15", hasConversion: false },
  { time: "26:15", hasConversion: false },
  { time: "29:17", hasConversion: false },
  { time: "56:02", hasConversion: true },
  { time: "60:54", hasConversion: true },
  { time: "70:47", hasConversion: false }
];

const watershedTries = [
  { time: "40:04", hasConversion: false },
  { time: "72:47", hasConversion: false }
];

// Define kicking data for Hellenic vs Watershed
const hellenicKicks = [
  { x: 0.3, y: 0.3, successful: true },
  { x: 0.7, y: 0.3, successful: false },
  { x: 0.2, y: 0.7, successful: false },
  { x: 0.8, y: 0.7, successful: false }
];

const watershedKicks = [
  { x: 0.7, y: 0.7, successful: false },
  { x: 0.8, y: 0.7, successful: false }
];

// Create a box score for the Hellenic vs Watershed game
const watershedVsHellenic: BoxScoreData = {
  matchInfo: {
    teamA: "HELLENIC",
    teamB: "WATERSHED",
    venue: "Hellenic Academy, Harare",
    date: "Week 1",
    kickoff: "14:00",
    weather: "Sunny, 25°C",
  },
  teamAPlayers: [
    { name: "C. Dube", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "M. Nyoni", position: "14", tries: 2, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "J. Munemo", position: "13", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "T. Kambarami", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "D. Mbano", position: "11", tries: 2, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "A. Pasipanodya", position: "10", tries: 0, kicks: "4/5 C, 1/1 PK", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "K. Madzivanyika", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "S. Madhume", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "M. Mushangwe", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 2, penaltiesConceded: 0 },
    { name: "R. Chirume", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 1 },
    { name: "T. Savanhu", position: "5", tries: 0, kicks: "-", lineouts: "4/4", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "B. Kudakwashe", position: "4", tries: 0, kicks: "-", lineouts: "5/6", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "G. Chitsaka", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "F. Marowa", position: "2", tries: 0, kicks: "-", lineouts: "3/3", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "L. Musariri", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamBPlayers: [
    { name: "T. Makombe", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "K. Nyamushita", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Z. Chaita", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "F. Wilson", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "S. Gurupira", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "E. Mandizvidza", position: "10", tries: 0, kicks: "1/2 C, 1/1 PK", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "R. Tshuma", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "A. Majoni", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "T. Jonasi", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 2, penaltiesConceded: 0 },
    { name: "N. Mushonga", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "B. Gumbo", position: "5", tries: 0, kicks: "-", lineouts: "3/5", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "P. Kateera", position: "4", tries: 0, kicks: "-", lineouts: "2/3", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "K. Matsika", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "L. Musonza", position: "2", tries: 0, kicks: "-", lineouts: "1/1", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "D. Zimucha", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamASummary: {
    totalTries: 6,
    totalConversions: "4/5 C, 1/1 PK",
    lineoutAccuracy: "12/13 (92%)",
    penaltiesWon: 5,
    penaltiesConceded: 5,
    possession: 64,
    scrums: { total: 7, won: 7 },
    lineouts: { total: 9, won: 4 },
    turnovers: 5,
    knockOns: 11,
    mauls: { total: 0, won: 0 },
    kicks: {
      fromHand: { total: 5, reclaimed: 2 },
      inField: { total: 4, reclaimed: 2 },
      toTouch: { total: 0 },
      dropOuts: { total: 2, reclaimed: 1 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 4, successful: 1 }
    },
    attackingPenalties: 4,
    defensivePenalties: 1,
    scrumPenalties: 0
  },
  teamBSummary: {
    totalTries: 1,
    totalConversions: "1/2 C, 1/1 PK",
    lineoutAccuracy: "6/9 (67%)",
    penaltiesWon: 4,
    penaltiesConceded: 12,
    possession: 36,
    scrums: { total: 11, won: 9 },
    lineouts: { total: 2, won: 1 },
    turnovers: 10,
    knockOns: 6,
    mauls: { total: 0, won: 0 },
    kicks: {
      fromHand: { total: 14, reclaimed: 0 },
      inField: { total: 10, reclaimed: 0 },
      toTouch: { total: 4 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 2, successful: 0 }
    },
    attackingPenalties: 7,
    defensivePenalties: 4,
    scrumPenalties: 0
  },
  tryDataA: hellenicTries,
  tryDataB: watershedTries,
  kickDataA: hellenicKicks,
  kickDataB: watershedKicks
};

// Add the box score to the map
boxScores.set(
  generateMatchId("Week 1", "14:00", "HELLENIC", "WATERSHED"),
  watershedVsHellenic
);

// Define tries with timestamps and conversion status
const lomagundiTries = [
  { time: "09:18", hasConversion: true },
  { time: "22:44", hasConversion: false, isPenalty: true },
  { time: "37:34", hasConversion: true },
  { time: "51:04", hasConversion: false },
  { time: "54:11", hasConversion: false },
  { time: "56:12", hasConversion: true },
  { time: "57:50", hasConversion: true },
  { time: "67:21", hasConversion: true }
];

const falconTries = [
  { time: "01:44", hasConversion: false, isPenalty: true },
  { time: "24:46", hasConversion: false },
  { time: "31:46", hasConversion: false },
  { time: "50:48", hasConversion: false, isPenalty: true }
];

// Define kicking data
const lomagundiKicks = [
  { x: 0.7, y: 0.3, successful: true },
  { x: 0.3, y: 0.5, successful: true },
  { x: 0.6, y: 0.2, successful: true },
  { x: 0.8, y: 0.5, successful: false },
  { x: 0.2, y: 0.3, successful: true },
  { x: 0.5, y: 0.4, successful: true }
];

const falconKicks = [
  { x: 0.3, y: 0.8, successful: true },
  { x: 0.7, y: 0.8, successful: true },
  { x: 0.6, y: 0.6, successful: false },
  { x: 0.2, y: 0.7, successful: false },
  { x: 0.8, y: 0.8, successful: false }
];

// Create a box score for the Lomagundi vs Falcon game
const lomagundiVsFalcon: BoxScoreData = {
  matchInfo: {
    teamA: "LOMAGUNDI",
    teamB: "FALCON",
    venue: "Lomagundi College, Chinhoyi",
    date: "Week 1",
    kickoff: "15:15",
    weather: "Sunny, 26°C",
  },
  teamAPlayers: [
    { name: "M. Mhaka", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "T. Marais", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "L. Kawadza", position: "13", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "K. Makunike", position: "12", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "N. Chibaya", position: "11", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "L. Makore", position: "10", tries: 0, kicks: "5/7 C, 1/2 PK", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 2 },
    { name: "B. Nyika", position: "9", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "T. Mugabe", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "G. Chimwanza", position: "7", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 2, penaltiesConceded: 0 },
    { name: "D. Mutsvairo", position: "6", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "C. Mutasa", position: "5", tries: 0, kicks: "-", lineouts: "3/5", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "J. Mpofu", position: "4", tries: 0, kicks: "-", lineouts: "2/8", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "R. Chigwere", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "P. Ndlovu", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "M. Chipuriro", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamBPlayers: [
    { name: "A. Sibanda", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "R. Ncube", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "T. Dube", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "L. Moyo", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "B. Ndlovu", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "K. Maposa", position: "10", tries: 0, kicks: "0/2 C, 2/3 PK", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "M. Ndoro", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 2 },
    { name: "S. Chigwada", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "N. Masuku", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 2, penaltiesConceded: 1 },
    { name: "P. Moyo", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 2 },
    { name: "T. Mazarire", position: "5", tries: 0, kicks: "-", lineouts: "2/2", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "J. Kambarami", position: "4", tries: 0, kicks: "-", lineouts: "2/4", penaltiesWon: 1, penaltiesConceded: 0 },
    { name: "L. Chirinda", position: "3", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 2 },
    { name: "B. Ndebele", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 1 },
    { name: "S. Musariri", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 7 }
  ],
  teamASummary: {
    totalTries: 7,
    totalConversions: "5/7 C, 1/2 PK",
    lineoutAccuracy: "5/13 (38%)",
    penaltiesWon: 4,
    penaltiesConceded: 9,
    possession: 36,
    scrums: { total: 3, won: 3 },
    lineouts: { total: 13, won: 5 },
    turnovers: 7,
    knockOns: 6,
    cards: { yellow: 1, red: 1 },
    mauls: { total: 0, won: 0 },
    kicks: {
      fromHand: { total: 5, reclaimed: 0 },
      inField: { total: 3, reclaimed: 1 },
      toTouch: { total: 2 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 10, successful: 6 }
    },
    attackingPenalties: 7,
    defensivePenalties: 2,
    scrumPenalties: 0,
    penaltyCauses: {
      offside: 2,
      ruckOffence: 1,
      notReleasePlayer: 1,
      violentFoulPlay: 2,
      notReleasingBall: 1,
      dangerousTackle: 0,
      scrum: 0
    }
  },
  teamBSummary: {
    totalTries: 2,
    totalConversions: "0/2 C, 2/3 PK",
    lineoutAccuracy: "4/6 (67%)",
    penaltiesWon: 4,
    penaltiesConceded: 17,
    possession: 64,
    scrums: { total: 9, won: 9 },
    lineouts: { total: 6, won: 4 },
    turnovers: 4,
    knockOns: 3,
    cards: { yellow: 1, red: 0 },
    mauls: { total: 3, won: 3 },
    kicks: {
      fromHand: { total: 13, reclaimed: 0 },
      inField: { total: 8, reclaimed: 1 },
      toTouch: { total: 5 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 2 },
      success: { total: 5, successful: 2 }
    },
    attackingPenalties: 12,
    defensivePenalties: 4,
    scrumPenalties: 1,
    penaltyCauses: {
      offside: 6,
      ruckOffence: 1,
      notReleasePlayer: 1,
      violentFoulPlay: 1,
      notReleasingBall: 0,
      dangerousTackle: 2,
      scrum: 1
    }
  },
  tryDataA: lomagundiTries,
  tryDataB: falconTries,
  kickDataA: lomagundiKicks,
  kickDataB: falconKicks
};

// Add the box score to the map
boxScores.set(
  generateMatchId("Week 1", "15:15", "LOMAGUNDI", "FALCON"),
  lomagundiVsFalcon
);

// Export functions
export { generateMatchId }; 

// Add scores for May 31st SA Schools Rugby matches
finalScores.set(
  generateMatchId("May 31st", "TBD", "PRETORIA BOYS HIGH SCHOOL", "MICHEALHOUSE"),
  { teamAScore: 24, teamBScore: 31 }
);

// Add scores for CBZ Schools Rugby matches
// ... existing code ...

// Add CBZ Week 4 score for Falcon vs St. George's
finalScores.set(
  generateMatchId("Week 4", "14:00", "FALCON", "ST GEORGE'S"),
  { teamAScore: 20, teamBScore: 24 }
);

// Define tries with timestamps and conversion status for Falcon vs St. George's
const falconVsStGeorgesFalconTries: TryScore[] = [
  { time: "54:15", hasConversion: true },
  { time: "64:45", hasConversion: true }
];

const falconVsStGeorgesFalconPenalties: TryScore[] = [
  { time: "06:03", hasConversion: false, isPenalty: true },
  { time: "13:28", hasConversion: false, isPenalty: true }
];

const falconVsStGeorgesStGeorgesTries: TryScore[] = [
  { time: "00:53", hasConversion: true },
  { time: "07:36", hasConversion: true },
  { time: "45:25", hasConversion: true }
];

const falconVsStGeorgesStGeorgesPenalties: TryScore[] = [
  { time: "51:33", hasConversion: false, isPenalty: true }
];

// Combine tries and penalties for scoring timeline
const falconVsStGeorgesFalconScoring = [...falconVsStGeorgesFalconTries, ...falconVsStGeorgesFalconPenalties];
const falconVsStGeorgesStGeorgesScoring = [...falconVsStGeorgesStGeorgesTries, ...falconVsStGeorgesStGeorgesPenalties];

// Define kicking data from the field position diagrams
const falconVsStGeorgesFalconKicks: KickAtGoal[] = [
  { x: 0.3, y: 0.5, successful: true }, // Penalty kick
  { x: 0.7, y: 0.4, successful: true }, // Penalty kick
  { x: 0.4, y: 0.6, successful: true }, // Conversion
  { x: 0.6, y: 0.3, successful: true }  // Conversion
];

const falconVsStGeorgesStGeorgesKicks: KickAtGoal[] = [
  { x: 0.2, y: 0.4, successful: true }, // Conversion
  { x: 0.8, y: 0.5, successful: true }, // Conversion
  { x: 0.5, y: 0.7, successful: true }, // Conversion
  { x: 0.6, y: 0.2, successful: false }, // Missed kick
  { x: 0.4, y: 0.8, successful: false }, // Missed kick
  { x: 0.3, y: 0.3, successful: true }  // Penalty kick
];

// Create a box score for the Falcon vs St. George's CBZ Week 4 game
const falconVsStGeorgesCBZ: BoxScoreData = {
  matchInfo: {
    teamA: "FALCON",
    teamB: "ST GEORGE'S",
    venue: "CBZ Sports Club, Harare",
    date: "Week 4",
    kickoff: "14:00",
    weather: "Partly Cloudy, 23°C",
  },
  teamAPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "4/4", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "3/3", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 1, kicks: "-", lineouts: "3/4", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamBPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "4/6", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "4/5", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "3/5", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamASummary: {
    totalTries: 2,
    totalConversions: "2/2 C, 2/2 PK",
    lineoutAccuracy: "6/7 (86%)",
    penaltiesWon: 0,
    penaltiesConceded: 10,
    possession: 63,
    scrums: { total: 8, won: 8 },
    lineouts: { total: 7, won: 6 },
    turnovers: 6,
    knockOns: 3,
    mauls: { total: 4, won: 4 },
    kicks: {
      fromHand: { total: 12, reclaimed: 3 },
      inField: { total: 9, reclaimed: 2 },
      toTouch: { total: 3 },
      dropOuts: { total: 2, reclaimed: 1 },
      goalLine: { total: 1, reclaimed: 0 },
      directToTouch: { total: 0 },
      success: { total: 4, successful: 4 }
    },
    attackingPenalties: 3,
    defensivePenalties: 7,
    scrumPenalties: 0
  },
  teamBSummary: {
    totalTries: 3,
    totalConversions: "3/3 C, 1/1 PK",
    lineoutAccuracy: "7/10 (70%)",
    penaltiesWon: 0,
    penaltiesConceded: 10,
    possession: 37,
    scrums: { total: 2, won: 1 },
    lineouts: { total: 10, won: 7 },
    turnovers: 8,
    knockOns: 9,
    mauls: { total: 4, won: 4 },
    kicks: {
      fromHand: { total: 8, reclaimed: 0 },
      inField: { total: 5, reclaimed: 0 },
      toTouch: { total: 1 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 1, reclaimed: 1 },
      directToTouch: { total: 0 },
      success: { total: 6, successful: 4 }
    },
    attackingPenalties: 4,
    defensivePenalties: 3,
    scrumPenalties: 1
  },
  tryDataA: falconVsStGeorgesFalconScoring,
  tryDataB: falconVsStGeorgesStGeorgesScoring,
  kickDataA: falconVsStGeorgesFalconKicks,
  kickDataB: falconVsStGeorgesStGeorgesKicks
};

// Add the CBZ Week 4 box score to the map
boxScores.set(
  generateMatchId("Week 4", "14:00", "FALCON", "ST GEORGE'S"),
  falconVsStGeorgesCBZ
);