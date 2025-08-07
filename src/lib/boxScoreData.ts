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

finalScores.set(
  generateMatchId("Week 4", "15:30", "ST JOHNS", "WISE OWL"),
  { teamAScore: 54, teamBScore: 21 }
);

finalScores.set(
  generateMatchId("Week 5", "15:00", "ST JOHNS", "FALCON"),
  { teamAScore: 26, teamBScore: 22 }
);

finalScores.set(
  generateMatchId("Week 5", "15:30", "ST GEORGES", "CBC"),
  { teamAScore: 43, teamBScore: 5 }
);

finalScores.set(
  generateMatchId("Week 5", "13:45", "HELLENIC", "PETERHOUSE"),
  { teamAScore: 26, teamBScore: 33 }
);

finalScores.set(
  generateMatchId("Week 4", "15:30", "KYLE", "LOMAGUNDI"),
  { teamAScore: 17, teamBScore: 58 }////
);

finalScores.set(
  generateMatchId("Week 5", "10:15", "GATEWAY", "ST JOHNS HIGH"),
  { teamAScore: 56, teamBScore: 0 }////
);

finalScores.set(
  generateMatchId("Week 5", "11:00", "MILTON", "GIFFORD"),
  { teamAScore: 57, teamBScore: 7 }////
);

finalScores.set(
  generateMatchId("Week 5", "12:00", "PETRA", "THORNHILL"),
  { teamAScore: 70, teamBScore: 0 }////
);

finalScores.set(
  generateMatchId("Week 5", "12:30", "HERITAGE", "WATERSHED"),
  { teamAScore: 10, teamBScore: 7 }////
);

finalScores.set(
  generateMatchId("Week 5", "13:45", "LOMAGUNDI", "CHURCHILL"),
  { teamAScore: 44, teamBScore: 20 }////
);

finalScores.set(
  generateMatchId("Week 5", "15:00", "MUTARE", "HILLCREST"),
  { teamAScore: 12, teamBScore: 13 }////
);

finalScores.set(
  generateMatchId("Week 5", "15:30", "PRINCE EDWARD", "EAGLESVALE"),
  { teamAScore: 15, teamBScore: 18 }////
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

// Define tries with timestamps and conversion status for St. John's vs Wise Owl
const stJohnsVsWiseOwlStJohnsTries: TryScore[] = [
  { time: "07:07", hasConversion: true },
  { time: "10:42", hasConversion: true },
  { time: "14:50", hasConversion: true },
  { time: "18:46", hasConversion: false },
  { time: "40:17", hasConversion: true },
  { time: "49:39", hasConversion: true },
  { time: "57:24", hasConversion: true },
  { time: "67:47", hasConversion: true }
];

const stJohnsVsWiseOwlWiseOwlTries: TryScore[] = [
  { time: "22:37", hasConversion: true },
  { time: "28:28", hasConversion: true },
  { time: "32:20", hasConversion: true }
];

// Define kicking data from the field position diagrams - St John's had several kicks from various positions
const stJohnsVsWiseOwlStJohnsKicks: KickAtGoal[] = [
  { x: 0.4, y: 0.3, successful: true },   // Conversion
  { x: 0.6, y: 0.4, successful: true },   // Conversion
  { x: 0.3, y: 0.5, successful: true },   // Conversion
  { x: 0.7, y: 0.6, successful: false },  // Missed conversion
  { x: 0.2, y: 0.4, successful: true },   // Conversion
  { x: 0.8, y: 0.3, successful: true },   // Conversion
  { x: 0.5, y: 0.7, successful: true },   // Conversion
  { x: 0.6, y: 0.5, successful: true }    // Conversion
];

const stJohnsVsWiseOwlWiseOwlKicks: KickAtGoal[] = [
  { x: 0.7, y: 0.3, successful: true },   // Conversion
  { x: 0.3, y: 0.6, successful: true },   // Conversion
  { x: 0.4, y: 0.4, successful: true }    // Conversion
];

// Create a box score for the St. John's vs Wise Owl CBZ Week 4 game
const stJohnsVsWiseOwlCBZ: BoxScoreData = {
  matchInfo: {
    teamA: "ST JOHNS",
    teamB: "WISE OWL",
    venue: "CBZ Sports Club, Harare",
    date: "Week 4",
    kickoff: "15:30",
    weather: "Sunny, 24°C",
  },
  teamAPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 2, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "7/8", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "4/4", penaltiesWon: 0, penaltiesConceded: 0 },
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
    { name: "-", position: "10", tries: 0, kicks: "3/3", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "3/4", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "2/3", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamASummary: {
    totalTries: 8,
    totalConversions: "7/8 C",
    lineoutAccuracy: "7/8 (88%)",
    penaltiesWon: 0,
    penaltiesConceded: 22,
    possession: 46,
    scrums: { total: 0, won: 0 },
    lineouts: { total: 8, won: 7 },
    turnovers: 0,
    knockOns: 0,
    mauls: { total: 0, won: 0 },
    kicks: {
      fromHand: { total: 7, reclaimed: 0 },
      inField: { total: 5, reclaimed: 0 },
      toTouch: { total: 1 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 8, successful: 7 }
    },
    attackingPenalties: 0,
    defensivePenalties: 22,
    scrumPenalties: 0
  },
  teamBSummary: {
    totalTries: 3,
    totalConversions: "3/3 C",
    lineoutAccuracy: "5/7 (71%)",
    penaltiesWon: 0,
    penaltiesConceded: 0,
    possession: 54,
    scrums: { total: 0, won: 0 },
    lineouts: { total: 7, won: 5 },
    turnovers: 0,
    knockOns: 0,
    mauls: { total: 0, won: 0 },
    kicks: {
      fromHand: { total: 4, reclaimed: 1 },
      inField: { total: 4, reclaimed: 1 },
      toTouch: { total: 0 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 3, successful: 3 }
    },
    attackingPenalties: 0,
    defensivePenalties: 0,
    scrumPenalties: 0
  },
  tryDataA: stJohnsVsWiseOwlStJohnsTries,
  tryDataB: stJohnsVsWiseOwlWiseOwlTries,
  kickDataA: stJohnsVsWiseOwlStJohnsKicks,
  kickDataB: stJohnsVsWiseOwlWiseOwlKicks
};

// Add the CBZ Week 4 St Johns vs Wise Owl box score to the map
boxScores.set(
  generateMatchId("Week 4", "15:30", "ST JOHNS", "WISE OWL"),
  stJohnsVsWiseOwlCBZ
);

// Define tries and penalties with timestamps for St. Johns vs Falcon Week 5
const stJohnsVsFalconStJohnsScoring: TryScore[] = [
  { time: "09:08", hasConversion: true },  // Try (Con) - 7 points
  { time: "16:06", hasConversion: false, isPenalty: true },  // Penalty - 3 points
  { time: "53:45", hasConversion: false, isPenalty: true },  // Penalty - 3 points
  { time: "60:30", hasConversion: false, isPenalty: true },  // Penalty - 3 points
  { time: "63:33", hasConversion: false, isPenalty: true },  // Drop Goal - 3 points
  { time: "73:44", hasConversion: true }   // Try (Con) - 7 points
];

const stJohnsVsFalconFalconScoring: TryScore[] = [
  { time: "13:08", hasConversion: false, isPenalty: true },  // Penalty - 3 points
  { time: "18:04", hasConversion: true },  // Try (Con) - 7 points
  { time: "24:42", hasConversion: false, isPenalty: true },  // Penalty - 3 points
  { time: "37:50", hasConversion: false, isPenalty: true },  // Penalty - 3 points
  { time: "51:32", hasConversion: false, isPenalty: true },  // Penalty - 3 points
  { time: "58:17", hasConversion: false, isPenalty: true }   // Penalty - 3 points
];

// Define kicking data from the field position diagrams
const stJohnsVsFalconStJohnsKicks: KickAtGoal[] = [
  { x: 0.5, y: 0.4, successful: true },   // Conversion
  { x: 0.3, y: 0.6, successful: true },   // Penalty
  { x: 0.7, y: 0.3, successful: true },   // Penalty
  { x: 0.4, y: 0.5, successful: true },   // Penalty
  { x: 0.6, y: 0.7, successful: true }    // Conversion
];

const stJohnsVsFalconFalconKicks: KickAtGoal[] = [
  { x: 0.2, y: 0.4, successful: true },   // Penalty
  { x: 0.8, y: 0.5, successful: true },   // Conversion
  { x: 0.6, y: 0.3, successful: true },   // Penalty
  { x: 0.4, y: 0.6, successful: true },   // Penalty
  { x: 0.7, y: 0.2, successful: true },   // Penalty
  { x: 0.3, y: 0.7, successful: true }    // Penalty
];

// Create a box score for the St. Johns vs Falcon CBZ Week 5 game
const stJohnsVsFalconCBZ: BoxScoreData = {
  matchInfo: {
    teamA: "ST JOHNS",
    teamB: "FALCON",
    venue: "CBZ Sports Club, Harare",
    date: "Week 5",
    kickoff: "15:00",
    weather: "Sunny, 22°C",
  },
  teamAPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "5/5", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "4/4", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "3/4", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamBPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "6/6", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "1/3", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "0/3", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamASummary: {
    totalTries: 2,
    totalConversions: "2/2 C, 3/3 PK, 1/1 DG",
    lineoutAccuracy: "7/8 (88%)",
    penaltiesWon: 0,
    penaltiesConceded: 13,
    possession: 44,
    scrums: { total: 7, won: 6 },
    lineouts: { total: 8, won: 7 },
    turnovers: 1,
    knockOns: 9,
    mauls: { total: 5, won: 5 },
    kicks: {
      fromHand: { total: 8, reclaimed: 3 },
      inField: { total: 5, reclaimed: 3 },
      toTouch: { total: 2 },
      dropOuts: { total: 2, reclaimed: 1 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 5, successful: 5 }
    },
    attackingPenalties: 7,
    defensivePenalties: 4,
    scrumPenalties: 1
  },
  teamBSummary: {
    totalTries: 1,
    totalConversions: "1/1 C, 5/5 PK",
    lineoutAccuracy: "1/6 (17%)",
    penaltiesWon: 0,
    penaltiesConceded: 12,
    possession: 56,
    scrums: { total: 11, won: 11 },
    lineouts: { total: 6, won: 1 },
    turnovers: 5,
    knockOns: 6,
    mauls: { total: 2, won: 2 },
    kicks: {
      fromHand: { total: 12, reclaimed: 2 },
      inField: { total: 7, reclaimed: 2 },
      toTouch: { total: 5 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 6, successful: 6 }
    },
    attackingPenalties: 3,
    defensivePenalties: 3,
    scrumPenalties: 2
  },
  tryDataA: stJohnsVsFalconStJohnsScoring,
  tryDataB: stJohnsVsFalconFalconScoring,
  kickDataA: stJohnsVsFalconStJohnsKicks,
  kickDataB: stJohnsVsFalconFalconKicks
};

// Add the CBZ Week 5 St Johns vs Falcon box score to the map
boxScores.set(
  generateMatchId("Week 5", "15:00", "ST JOHNS", "FALCON"),
  stJohnsVsFalconCBZ
);

// Define tries and penalties with timestamps for St. Georges vs CBC Week 5
const stGeorgesVsCbcStGeorgesScoring: TryScore[] = [
  { time: "02:30", hasConversion: false, isPenalty: true },  // Penalty - 3 points
  { time: "12:37", hasConversion: true },   // Try (Con) - 7 points
  { time: "18:37", hasConversion: true },   // Try (Con) - 7 points
  { time: "31:11", hasConversion: false },  // Try (No Con) - 5 points
  { time: "37:50", hasConversion: true },   // Try (Con) - 7 points
  { time: "65:07", hasConversion: true },   // Try (Con) - 7 points
  { time: "73:53", hasConversion: true }    // Try (Con) - 7 points
];

const stGeorgesVsCbcCbcScoring: TryScore[] = [
  { time: "62:20", hasConversion: false }   // Try (No Con) - 5 points
];

// Define kicking data from the field position diagrams
const stGeorgesVsCbcStGeorgesKicks: KickAtGoal[] = [
  { x: 0.5, y: 0.4, successful: true },    // Penalty
  { x: 0.4, y: 0.3, successful: true },    // Conversion
  { x: 0.6, y: 0.5, successful: true },    // Conversion
  { x: 0.3, y: 0.6, successful: false },   // Missed conversion
  { x: 0.7, y: 0.4, successful: true },    // Conversion
  { x: 0.2, y: 0.5, successful: true },    // Conversion
  { x: 0.8, y: 0.3, successful: true },    // Conversion
  { x: 0.4, y: 0.7, successful: false },   // Missed kick
  { x: 0.6, y: 0.2, successful: false }    // Missed kick
];

const stGeorgesVsCbcCbcKicks: KickAtGoal[] = [
  { x: 0.7, y: 0.6, successful: false },   // Missed kick
  { x: 0.3, y: 0.4, successful: false },   // Missed conversion
  { x: 0.5, y: 0.3, successful: false }    // Missed kick
];

// Create a box score for the St. Georges vs CBC Week 5 game
const stGeorgesVsCbcCBZ: BoxScoreData = {
  matchInfo: {
    teamA: "ST GEORGES",
    teamB: "CBC",
    venue: "CBZ Sports Club, Harare",
    date: "Week 5",
    kickoff: "15:30",
    weather: "Sunny, 23°C",
  },
  teamAPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 2, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "6/9", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "5/6", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "4/6", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamBPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "0/3", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "3/4", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "2/3", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamASummary: {
    totalTries: 6,
    totalConversions: "5/6 C, 1/3 PK",
    lineoutAccuracy: "9/12 (75%)",
    penaltiesWon: 0,
    penaltiesConceded: 5,
    possession: 54,
    scrums: { total: 9, won: 9 },
    lineouts: { total: 12, won: 9 },
    turnovers: 5,
    knockOns: 8,
    mauls: { total: 2, won: 2 },
    kicks: {
      fromHand: { total: 10, reclaimed: 2 },
      inField: { total: 8, reclaimed: 2 },
      toTouch: { total: 2 },
      dropOuts: { total: 1, reclaimed: 1 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 9, successful: 6 }
    },
    attackingPenalties: 3,
    defensivePenalties: 2,
    scrumPenalties: 0
  },
  teamBSummary: {
    totalTries: 1,
    totalConversions: "0/1 C",
    lineoutAccuracy: "5/7 (71%)",
    penaltiesWon: 0,
    penaltiesConceded: 8,
    possession: 46,
    scrums: { total: 7, won: 7 },
    lineouts: { total: 7, won: 5 },
    turnovers: 8,
    knockOns: 6,
    mauls: { total: 4, won: 3 },
    kicks: {
      fromHand: { total: 13, reclaimed: 1 },
      inField: { total: 10, reclaimed: 1 },
      toTouch: { total: 3 },
      dropOuts: { total: 1, reclaimed: 1 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 3, successful: 0 }
    },
    attackingPenalties: 5,
    defensivePenalties: 3,
    scrumPenalties: 0
  },
  tryDataA: stGeorgesVsCbcStGeorgesScoring,
  tryDataB: stGeorgesVsCbcCbcScoring,
  kickDataA: stGeorgesVsCbcStGeorgesKicks,
  kickDataB: stGeorgesVsCbcCbcKicks
};

// Add the CBZ Week 5 St Georges vs CBC box score to the map
boxScores.set(
  generateMatchId("Week 5", "15:30", "ST GEORGES", "CBC"),
  stGeorgesVsCbcCBZ
);

// Define tries and penalties with timestamps for Hellenic vs Peterhouse Week 5
const hellenicVsPeterhouseHellenicScoring: TryScore[] = [
  { time: "03:47", hasConversion: false },  // Try (No Con) - 5 points
  { time: "18:57", hasConversion: true },   // Try (Con) - 7 points
  { time: "70:32", hasConversion: true },   // Try (Con) - 7 points
  { time: "76:34", hasConversion: true }    // Try (Con) - 7 points
];

const hellenicVsPeterhousePeterhouseScoring: TryScore[] = [
  { time: "21:43", hasConversion: false },  // Try (No Con) - 5 points
  { time: "37:19", hasConversion: true },   // Try (Con) - 7 points
  { time: "38:45", hasConversion: true },   // Try (Con) - 7 points
  { time: "61:58", hasConversion: true },   // Try (Con) - 7 points
  { time: "67:10", hasConversion: true }    // Try (Con) - 7 points
];

// Define kicking data from the field position diagrams
const hellenicVsPeterhouseHellenicKicks: KickAtGoal[] = [
  { x: 0.3, y: 0.4, successful: false },   // Missed kick
  { x: 0.2, y: 0.6, successful: true },    // Successful conversion
  { x: 0.8, y: 0.5, successful: true },    // Successful conversion
  { x: 0.7, y: 0.3, successful: true }     // Successful conversion
];

const hellenicVsPeterhousePeterhouseKicks: KickAtGoal[] = [
  { x: 0.6, y: 0.4, successful: false },   // Missed conversion
  { x: 0.4, y: 0.5, successful: true },    // Successful conversion
  { x: 0.5, y: 0.3, successful: true },    // Successful conversion
  { x: 0.3, y: 0.6, successful: true },    // Successful conversion
  { x: 0.7, y: 0.4, successful: true }     // Successful conversion
];

// Create a box score for the Hellenic vs Peterhouse Week 5 game
const hellenicVsPeterhouseCBZ: BoxScoreData = {
  matchInfo: {
    teamA: "HELLENIC",
    teamB: "PETERHOUSE",
    venue: "CBZ Sports Club, Harare",
    date: "Week 5",
    kickoff: "13:45",
    weather: "Sunny, 24°C",
  },
  teamAPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "3/4", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "4/5", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "3/4", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamBPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 2, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "4/5", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "5/6", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "4/5", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamASummary: {
    totalTries: 4,
    totalConversions: "3/4 C",
    lineoutAccuracy: "7/9 (78%)",
    penaltiesWon: 0,
    penaltiesConceded: 11,
    possession: 43,
    scrums: { total: 8, won: 7 },
    lineouts: { total: 9, won: 7 },
    turnovers: 6,
    knockOns: 5,
    mauls: { total: 3, won: 2 },
    kicks: {
      fromHand: { total: 8, reclaimed: 2 },
      inField: { total: 6, reclaimed: 2 },
      toTouch: { total: 2 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 4, successful: 3 }
    },
    attackingPenalties: 4,
    defensivePenalties: 5,
    scrumPenalties: 1,
    penaltyCauses: {
      offside: 3,
      ruckOffence: 2,
      notReleasePlayer: 1,
      notReleasingBall: 2,
      dangerousTackle: 1,
      scrum: 1,
      violentFoulPlay: 1
    }
  },
  teamBSummary: {
    totalTries: 5,
    totalConversions: "4/5 C",
    lineoutAccuracy: "9/11 (82%)",
    penaltiesWon: 0,
    penaltiesConceded: 15,
    possession: 57,
    scrums: { total: 9, won: 8 },
    lineouts: { total: 11, won: 9 },
    turnovers: 4,
    knockOns: 3,
    mauls: { total: 4, won: 4 },
    kicks: {
      fromHand: { total: 9, reclaimed: 1 },
      inField: { total: 5, reclaimed: 1 },
      toTouch: { total: 3 },
      dropOuts: { total: 2, reclaimed: 2 },
      goalLine: { total: 2, reclaimed: 2 },
      directToTouch: { total: 0 },
      success: { total: 5, successful: 4 }
    },
    attackingPenalties: 11,
    defensivePenalties: 2,
    scrumPenalties: 0,
    penaltyCauses: {
      offside: 6,
      ruckOffence: 4,
      notReleasePlayer: 2,
      notReleasingBall: 1,
      dangerousTackle: 1,
      scrum: 0,
      violentFoulPlay: 1
    }
  },
  tryDataA: hellenicVsPeterhouseHellenicScoring,
  tryDataB: hellenicVsPeterhousePeterhouseScoring,
  kickDataA: hellenicVsPeterhouseHellenicKicks,
  kickDataB: hellenicVsPeterhousePeterhouseKicks
};

// Add the CBZ Week 5 Hellenic vs Peterhouse box score to the map
boxScores.set(
  generateMatchId("Week 5", "13:45", "HELLENIC", "PETERHOUSE"),
  hellenicVsPeterhouseCBZ
);

// Add CBZ Week 6 (July 5th) final scores
finalScores.set(
  generateMatchId("Week 6", "9:00", "MIDLANDS CC", "CBC"),
  { teamAScore: 15, teamBScore: 19 }
);

finalScores.set(
  generateMatchId("Week 6", "10:00", "BMC", "TYNWALD"),
  { teamAScore: 26, teamBScore: 5 }
);

finalScores.set(
  generateMatchId("Week 6", "11:00", "HILLCREST", "KYLE"),
  { teamAScore: 26, teamBScore: 24 }
);

finalScores.set(
  generateMatchId("Week 6", "12:00", "RYDINGS", "MILTON"),
  { teamAScore: 13, teamBScore: 20 }
);

finalScores.set(
  generateMatchId("Week 6", "13:00", "MARIST", "ST JOSEPH"),
  { teamAScore: 26, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 6", "14:00", "ST AUGUSTINES", "MUTAMBARA"),
  { teamAScore: 29, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 6", "15:00", "MUTARE", "ST JOSEPH"),
  { teamAScore: 36, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 6", "9:30", "ST AUGUSTINES", "FIRST CLASS"),
  { teamAScore: 35, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 6", "10:30", "FIRST CLASS", "MUTAMBARA"),
  { teamAScore: 31, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 6", "11:30", "MUTARE", "FIRST CLASS"),
  { teamAScore: 38, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 6", "12:30", "MARIST", "ST AUGUSTINES"),
  { teamAScore: 21, teamBScore: 7 }
);

// Manicaland U20 Nash Rugby Final
finalScores.set(
  generateMatchId("Week 6", "13:30", "MUTARE", "MARIST"),
  { teamAScore: 27, teamBScore: 8 }
);

finalScores.set(
  generateMatchId("Week 6", "14:30", "MUTARE", "MARIST"),
  { teamAScore: 15, teamBScore: 7 }
);

finalScores.set(
  generateMatchId("Week 6", "15:30", "PLUMTREE", "PETRA"),
  { teamAScore: 52, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 6", "16:00", "PETERHOUSE", "WISE OWL"),
  { teamAScore: 62, teamBScore: 10 }
);

// Add scores for Week 7 CBZ Schools Rugby matches - 12 July 2025
finalScores.set(
  generateMatchId("Week 7", "14:00", "KYLE", "CHURCHILL"),
  { teamAScore: 5, teamBScore: 24 }
);

finalScores.set(
  generateMatchId("Week 7", "14:00", "WISE OWL", "PRINCE EDWARD"),
  { teamAScore: 25, teamBScore: 19 }
);

finalScores.set(
  generateMatchId("Week 7", "14:00", "HELLENIC", "FALCON"),
  { teamAScore: 29, teamBScore: 36 }
);

finalScores.set(
  generateMatchId("Week 7", "14:00", "ST JOHNS", "LOMAGUNDI"),
  { teamAScore: 15, teamBScore: 28 }
);

finalScores.set(
  generateMatchId("Week 7", "14:00", "GOROMONZI", "SAMUEL CENTENARY"),
  { teamAScore: 19, teamBScore: 7 }
);

finalScores.set(
  generateMatchId("Week 7", "14:00", "TYNWALD", "NATTIE COLLEGE"),
  { teamAScore: 18, teamBScore: 17 }
);

// Add scores for Week 8 CBZ Schools Rugby matches - 19 July 2025
finalScores.set(
  generateMatchId("Week 8", "14:00", "MIDLANDS CC", "NATTIE COLLEGE"),
  { teamAScore: 54, teamBScore: 0 }
);

finalScores.set(
  generateMatchId("Week 8", "14:00", "CHURCHILL", "WISE OWL"),
  { teamAScore: 28, teamBScore: 25 }
);

finalScores.set(
  generateMatchId("Week 8", "14:00", "LORD BRIGHTON", "ALLAN WILSON"),
  { teamAScore: 19, teamBScore: 17 }
);

finalScores.set(
  generateMatchId("Week 8", "14:00", "LOMAGUNDI", "HELLENIC"),
  { teamAScore: 43, teamBScore: 29 }
);

finalScores.set(
  generateMatchId("Week 8", "14:00", "BMC", "RYDINGS"),
  { teamAScore: 19, teamBScore: 26 }
);

finalScores.set(
  generateMatchId("Week 8", "14:00", "ST JOHNS", "PH"),
  { teamAScore: 20, teamBScore: 22 }
);

finalScores.set(
  generateMatchId("Week 8", "14:00", "ST GEORGES", "PRINCE EDWARD"),
  { teamAScore: 41, teamBScore: 27 }
);

finalScores.set(
  generateMatchId("Week 8", "14:00", "CBC", "WATERSHED"),
  { teamAScore: 57, teamBScore: 17 }
);

finalScores.set(
  generateMatchId("Week 8", "14:00", "HILLCREST", "HERITAGE"),
  { teamAScore: 25, teamBScore: 30 }
);

finalScores.set(
  generateMatchId("Week 8", "14:00", "GATEWAY", "EAGLESVALE"),
  { teamAScore: 5, teamBScore: 27 }
);

// Add scores for Week 9 CBZ Schools Rugby matches - 26 July 2025
finalScores.set(
  generateMatchId("Week 9", "14:00", "LOMAGUNDI", "CBC"),
  { teamAScore: 35, teamBScore: 27 }
);

finalScores.set(
  generateMatchId("Week 9", "14:00", "HILLCREST", "EAGLESVALE"),
  { teamAScore: 5, teamBScore: 39 }
);

finalScores.set(
  generateMatchId("Week 9", "14:00", "ST JOHNS", "ST GEORGES"),
  { teamAScore: 29, teamBScore: 27 }
);

finalScores.set(
  generateMatchId("Week 9", "14:00", "PETERHOUSE", "FALCON"),
  { teamAScore: 20, teamBScore: 29 }
);

finalScores.set(
  generateMatchId("Week 9", "14:00", "CHURCHILL", "PRINCE EDWARD"),
  { teamAScore: 29, teamBScore: 8 }
);

finalScores.set(
  generateMatchId("Week 9", "14:00", "WATERSHED", "MIDLANDS CC"),
  { teamAScore: 15, teamBScore: 34 }
);

finalScores.set(
  generateMatchId("Week 9", "14:00", "GOLDRIDGE", "HERITAGE"),
  { teamAScore: 9, teamBScore: 20 }
);

finalScores.set(
  generateMatchId("Week 9", "14:00", "MILTON", "PLUMTREE"),
  { teamAScore: 5, teamBScore: 15 }
);

finalScores.set(
  generateMatchId("Week 9", "14:00", "WISE OWL", "KUTAMA"),
  { teamAScore: 37, teamBScore: 50 }
);

finalScores.set(
  generateMatchId("Week 9", "14:00", "BMC", "LORD BRIGHTON"),
  { teamAScore: 26, teamBScore: 31 }
);

// CBZ Week 9 St Johns vs St Georges Boxscore Data
const stJohnsVsStGeorgesCBZWeek9: BoxScoreData = {
  matchInfo: {
    teamA: "ST JOHNS",
    teamB: "ST GEORGES",
    venue: "CBZ Sports Club, Harare",
    date: "Week 9",
    kickoff: "14:00",
    weather: "Clear, 22°C"
  },
  teamAPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "7/9", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "5/4", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamBPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "3/6", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "5/8", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamASummary: {
    totalTries: 2,
    totalConversions: "2/2",
    lineoutAccuracy: "4/4",
    penaltiesWon: 0,
    penaltiesConceded: 11,
    possession: 52,
    scrums: { total: 10, won: 8 },
    lineouts: { total: 4, won: 5 },
    mauls: { total: 3, won: 2 },
    turnovers: 4,
    knockOns: 5,
    cards: { yellow: 1, red: 0 }
  },
  teamBSummary: {
    totalTries: 4,
    totalConversions: "2/4",
    lineoutAccuracy: "5/8",
    penaltiesWon: 0,
    penaltiesConceded: 10,
    possession: 48,
    scrums: { total: 6, won: 6 },
    lineouts: { total: 8, won: 5 },
    mauls: { total: 4, won: 2 },
    turnovers: 2,
    knockOns: 9,
    cards: { yellow: 0, red: 0 }
  },
  tryDataA: [
    {
      time: "2:49",
      hasConversion: true,
      isPenalty: false
    },
    {
      time: "49:34",
      hasConversion: true,
      isPenalty: false
    },
    // Penalty goals
    {
      time: "22:10",
      hasConversion: false,
      isPenalty: true
    },
    {
      time: "35:42",
      hasConversion: false,
      isPenalty: true
    },
    {
      time: "43:23",
      hasConversion: false,
      isPenalty: true
    },
    {
      time: "62:34",
      hasConversion: false,
      isPenalty: true
    },
    {
      time: "69:44",
      hasConversion: false,
      isPenalty: true
    }
  ],
  tryDataB: [
    {
      time: "23:09",
      hasConversion: false,
      isPenalty: false
    },
    {
      time: "29:32",
      hasConversion: true,
      isPenalty: false
    },
    {
      time: "44:14",
      hasConversion: true,
      isPenalty: false
    },
    {
      time: "64:51",
      hasConversion: false,
      isPenalty: false
    },
    // Penalty goal
    {
      time: "54:04",
      hasConversion: false,
      isPenalty: true
    }
  ],
  kickDataA: [
    { x: 0.5, y: 0.3, successful: true },  // Conversion 2:49
    { x: 0.35, y: 0.25, successful: true }, // Penalty 22:10
    { x: 0.65, y: 0.28, successful: true }, // Penalty 35:42
    { x: 0.5, y: 0.42, successful: true },  // Penalty 43:23
    { x: 0.5, y: 0.18, successful: true },  // Conversion 49:34
    { x: 0.65, y: 0.38, successful: true }, // Penalty 62:34
    { x: 0.35, y: 0.32, successful: true }  // Penalty 69:44
  ],
  kickDataB: [
    { x: 0.35, y: 0.45, successful: false }, // Missed penalty 14:33
    { x: 0.5, y: 0.25, successful: true },   // Conversion 29:32
    { x: 0.65, y: 0.2, successful: true },   // Conversion 44:14
    { x: 0.5, y: 0.33, successful: true },   // Penalty 54:04
    { x: 0.35, y: 0.28, successful: false }, // Missed conversion 64:51
    { x: 0.5, y: 0.35, successful: false }   // Missed penalty 66:16
  ]
};

// Add the CBZ Week 9 boxscore to the map
const stJohnsVsStGeorgesWeek9MatchId = generateMatchId("Week 9", "14:00", "ST JOHNS", "ST GEORGES");
boxScores.set(stJohnsVsStGeorgesWeek9MatchId, stJohnsVsStGeorgesCBZWeek9);

// Add score for Week 10 CBZ Schools Rugby match - 02 Aug 2025
finalScores.set(
  generateMatchId("Week 10", "14:00", "FALCON", "ST JOHNS"),
  { teamAScore: 33, teamBScore: 14 }
);

// Define tries with timestamps and conversion status for Falcon vs St Johns Week 10
const falconVsStJohnsWeek10FalconTries: TryScore[] = [
  { time: "100:09", hasConversion: false },  // H 13 first try (6009s / 60 = 100:09)
  { time: "106:13", hasConversion: true },   // H 15 try (6373s / 60 = 106:13)
  { time: "140:44", hasConversion: true },   // H 7 try (8444s / 60 = 140:44)
  { time: "145:00", hasConversion: true },   // H 10 try (8700s / 60 = 145:00)
  { time: "157:59", hasConversion: false }   // H 13 second try (9479s / 60 = 157:59)
];

const falconVsStJohnsWeek10StJohnsTries: TryScore[] = [
  { time: "123:42", hasConversion: false },  // O 2 try (7422s / 60 = 123:42)
  { time: "137:54", hasConversion: false }   // O 14 try (8274s / 60 = 137:54)
];

// Define kicking data based on try conversions
const falconVsStJohnsWeek10FalconKicks: KickAtGoal[] = [
  { x: 0.4, y: 0.5, successful: false },  // Missed conversion for first try
  { x: 0.6, y: 0.3, successful: true },   // Successful conversion 
  { x: 0.3, y: 0.6, successful: true },   // Successful conversion
  { x: 0.7, y: 0.4, successful: true },   // Successful conversion
  { x: 0.5, y: 0.7, successful: false }   // Missed conversion for last try
];

const falconVsStJohnsWeek10StJohnsKicks: KickAtGoal[] = [
  { x: 0.2, y: 0.4, successful: false },  // Missed conversion
  { x: 0.8, y: 0.6, successful: false }   // Missed conversion
];

// Create a box score for the Falcon vs St Johns CBZ Week 10 game
const falconVsStJohnsWeek10: BoxScoreData = {
  matchInfo: {
    teamA: "FALCON",
    teamB: "ST JOHNS",
    venue: "CBZ Sports Club, Harare",
    date: "Week 10",
    kickoff: "14:00",
    weather: "Sunny, 24°C",
  },
  teamAPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 2, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 1, kicks: "3/5", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "11/17", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "7/10", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamBPlayers: [
    { name: "-", position: "15", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "14", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "13", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "10", tries: 0, kicks: "0/2", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "5", tries: 0, kicks: "-", lineouts: "6/8", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "4", tries: 0, kicks: "-", lineouts: "2/4", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "2", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "-", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamASummary: {
    totalTries: 5,
    totalConversions: "3/5 C",
    lineoutAccuracy: "18/27 (67%)",
    penaltiesWon: 0,
    penaltiesConceded: 0,
    possession: 54,
    scrums: { total: 28, won: 24 },
    lineouts: { total: 27, won: 18 },
    turnovers: 5,
    knockOns: 0,
    mauls: { total: 0, won: 0 },
    kicks: {
      fromHand: { total: 28, reclaimed: 24 },
      inField: { total: 0, reclaimed: 0 },
      toTouch: { total: 0 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 5, successful: 3 }
    },
    attackingPenalties: 0,
    defensivePenalties: 0,
    scrumPenalties: 0
  },
  teamBSummary: {
    totalTries: 2,
    totalConversions: "0/2 C",
    lineoutAccuracy: "8/12 (67%)",
    penaltiesWon: 0,
    penaltiesConceded: 0,
    possession: 46,
    scrums: { total: 25, won: 16 },
    lineouts: { total: 12, won: 8 },
    turnovers: 0,
    knockOns: 0,
    mauls: { total: 0, won: 0 },
    kicks: {
      fromHand: { total: 25, reclaimed: 16 },
      inField: { total: 0, reclaimed: 0 },
      toTouch: { total: 0 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 2, successful: 0 }
    },
    attackingPenalties: 0,
    defensivePenalties: 0,
    scrumPenalties: 0
  },
  tryDataA: falconVsStJohnsWeek10FalconTries,
  tryDataB: falconVsStJohnsWeek10StJohnsTries,
  kickDataA: falconVsStJohnsWeek10FalconKicks,
  kickDataB: falconVsStJohnsWeek10StJohnsKicks
};

// Add the CBZ Week 10 Falcon vs St Johns box score to the map
boxScores.set(
  generateMatchId("Week 10", "14:00", "FALCON", "ST JOHNS"),
  falconVsStJohnsWeek10
);

// Player data processing for Falcon vs St Johns Week 10
export const falconVsStJohnsPlayerData = [
  // Falcon College players (H team)
  { playerCode: "H 2", playerNumber: 2, team: "FALCON", totalActions: 118, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 7, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 2, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 34, ruckArrivalsEffective: 23, ruckEfficiencyPct: 67.6, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 8", playerNumber: 8, team: "FALCON", totalActions: 103, passesTotal: 7, passesAccurate: 7, passAccuracyPct: 100.0, tacklesTotal: 2, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 3, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 27, ruckArrivalsEffective: 12, ruckEfficiencyPct: 44.4, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 7", playerNumber: 7, team: "FALCON", totalActions: 89, passesTotal: 1, passesAccurate: 1, passAccuracyPct: 100.0, tacklesTotal: 8, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 1, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 25, ruckArrivalsEffective: 18, ruckEfficiencyPct: 72.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 5", playerNumber: 5, team: "FALCON", totalActions: 89, passesTotal: 2, passesAccurate: 2, passAccuracyPct: 100.0, tacklesTotal: 4, tacklesMissed: 1, tackleSuccessPct: 75.0, ballCarriesTotal: 8, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 17, ruckArrivalsEffective: 11, ruckEfficiencyPct: 64.7, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 9", playerNumber: 9, team: "FALCON", totalActions: 84, passesTotal: 69, passesAccurate: 69, passAccuracyPct: 100.0, tacklesTotal: 0, tacklesMissed: 0, tackleSuccessPct: 0.0, ballCarriesTotal: 3, ballCarriesDominant: 1, carryDominancePct: 33.3, ruckArrivalsTotal: 1, ruckArrivalsEffective: 0, ruckEfficiencyPct: 0.0, kicksTotal: 8, kicksGood: 8, kickSuccessPct: 100.0, errors: 0 },
  { playerCode: "H 6", playerNumber: 6, team: "FALCON", totalActions: 84, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 2, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 0, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 24, ruckArrivalsEffective: 17, ruckEfficiencyPct: 70.8, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 4", playerNumber: 4, team: "FALCON", totalActions: 84, passesTotal: 3, passesAccurate: 3, passAccuracyPct: 100.0, tacklesTotal: 6, tacklesMissed: 2, tackleSuccessPct: 66.7, ballCarriesTotal: 11, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 10, ruckArrivalsEffective: 7, ruckEfficiencyPct: 70.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 1", playerNumber: 1, team: "FALCON", totalActions: 73, passesTotal: 1, passesAccurate: 1, passAccuracyPct: 100.0, tacklesTotal: 4, tacklesMissed: 4, tackleSuccessPct: 0.0, ballCarriesTotal: 8, ballCarriesDominant: 4, carryDominancePct: 50.0, ruckArrivalsTotal: 10, ruckArrivalsEffective: 8, ruckEfficiencyPct: 80.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 3", playerNumber: 3, team: "FALCON", totalActions: 67, passesTotal: 4, passesAccurate: 4, passAccuracyPct: 100.0, tacklesTotal: 3, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 4, ballCarriesDominant: 1, carryDominancePct: 25.0, ruckArrivalsTotal: 10, ruckArrivalsEffective: 5, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 10", playerNumber: 10, team: "FALCON", totalActions: 64, passesTotal: 24, passesAccurate: 23, passAccuracyPct: 95.8, tacklesTotal: 9, tacklesMissed: 6, tackleSuccessPct: 33.3, ballCarriesTotal: 6, ballCarriesDominant: 1, carryDominancePct: 16.7, ruckArrivalsTotal: 6, ruckArrivalsEffective: 4, ruckEfficiencyPct: 66.7, kicksTotal: 5, kicksGood: 4, kickSuccessPct: 80.0, errors: 0 },
  { playerCode: "H 12", playerNumber: 12, team: "FALCON", totalActions: 53, passesTotal: 6, passesAccurate: 6, passAccuracyPct: 100.0, tacklesTotal: 6, tacklesMissed: 3, tackleSuccessPct: 50.0, ballCarriesTotal: 8, ballCarriesDominant: 1, carryDominancePct: 12.5, ruckArrivalsTotal: 10, ruckArrivalsEffective: 8, ruckEfficiencyPct: 80.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 13", playerNumber: 13, team: "FALCON", totalActions: 40, passesTotal: 1, passesAccurate: 1, passAccuracyPct: 100.0, tacklesTotal: 6, tacklesMissed: 2, tackleSuccessPct: 66.7, ballCarriesTotal: 6, ballCarriesDominant: 2, carryDominancePct: 33.3, ruckArrivalsTotal: 8, ruckArrivalsEffective: 6, ruckEfficiencyPct: 75.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 15", playerNumber: 15, team: "FALCON", totalActions: 36, passesTotal: 2, passesAccurate: 2, passAccuracyPct: 100.0, tacklesTotal: 0, tacklesMissed: 0, tackleSuccessPct: 0.0, ballCarriesTotal: 8, ballCarriesDominant: 3, carryDominancePct: 37.5, ruckArrivalsTotal: 2, ruckArrivalsEffective: 1, ruckEfficiencyPct: 50.0, kicksTotal: 15, kicksGood: 12, kickSuccessPct: 80.0, errors: 0 },
  { playerCode: "H 14", playerNumber: 14, team: "FALCON", totalActions: 28, passesTotal: 1, passesAccurate: 1, passAccuracyPct: 100.0, tacklesTotal: 2, tacklesMissed: 1, tackleSuccessPct: 50.0, ballCarriesTotal: 5, ballCarriesDominant: 3, carryDominancePct: 60.0, ruckArrivalsTotal: 6, ruckArrivalsEffective: 3, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "H 11", playerNumber: 11, team: "FALCON", totalActions: 28, passesTotal: 1, passesAccurate: 1, passAccuracyPct: 100.0, tacklesTotal: 0, tacklesMissed: 0, tackleSuccessPct: 0.0, ballCarriesTotal: 4, ballCarriesDominant: 1, carryDominancePct: 25.0, ruckArrivalsTotal: 10, ruckArrivalsEffective: 6, ruckEfficiencyPct: 60.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },

  // St John's players (O team)
  { playerCode: "O 7", playerNumber: 7, team: "ST JOHNS", totalActions: 87, passesTotal: 4, passesAccurate: 3, passAccuracyPct: 75.0, tacklesTotal: 16, tacklesMissed: 3, tackleSuccessPct: 81.3, ballCarriesTotal: 2, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 8, ruckArrivalsEffective: 4, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 6", playerNumber: 6, team: "ST JOHNS", totalActions: 77, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 18, tacklesMissed: 2, tackleSuccessPct: 88.9, ballCarriesTotal: 1, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 9, ruckArrivalsEffective: 5, ruckEfficiencyPct: 55.6, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 5", playerNumber: 5, team: "ST JOHNS", totalActions: 73, passesTotal: 2, passesAccurate: 1, passAccuracyPct: 50.0, tacklesTotal: 12, tacklesMissed: 3, tackleSuccessPct: 75.0, ballCarriesTotal: 1, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 8, ruckArrivalsEffective: 6, ruckEfficiencyPct: 75.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 2", playerNumber: 2, team: "ST JOHNS", totalActions: 68, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 12, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 4, ballCarriesDominant: 1, carryDominancePct: 25.0, ruckArrivalsTotal: 2, ruckArrivalsEffective: 1, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 8", playerNumber: 8, team: "ST JOHNS", totalActions: 66, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 11, tacklesMissed: 2, tackleSuccessPct: 81.8, ballCarriesTotal: 3, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 6, ruckArrivalsEffective: 2, ruckEfficiencyPct: 33.3, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 3", playerNumber: 3, team: "ST JOHNS", totalActions: 62, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 6, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 0, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 8, ruckArrivalsEffective: 3, ruckEfficiencyPct: 37.5, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 12", playerNumber: 12, team: "ST JOHNS", totalActions: 54, passesTotal: 2, passesAccurate: 2, passAccuracyPct: 100.0, tacklesTotal: 16, tacklesMissed: 6, tackleSuccessPct: 62.5, ballCarriesTotal: 4, ballCarriesDominant: 1, carryDominancePct: 25.0, ruckArrivalsTotal: 8, ruckArrivalsEffective: 4, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 4", playerNumber: 4, team: "ST JOHNS", totalActions: 54, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 9, tacklesMissed: 1, tackleSuccessPct: 88.9, ballCarriesTotal: 0, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 4, ruckArrivalsEffective: 2, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 10", playerNumber: 10, team: "ST JOHNS", totalActions: 52, passesTotal: 4, passesAccurate: 4, passAccuracyPct: 100.0, tacklesTotal: 10, tacklesMissed: 5, tackleSuccessPct: 50.0, ballCarriesTotal: 5, ballCarriesDominant: 1, carryDominancePct: 20.0, ruckArrivalsTotal: 1, ruckArrivalsEffective: 1, ruckEfficiencyPct: 100.0, kicksTotal: 20, kicksGood: 12, kickSuccessPct: 60.0, errors: 0 },
  { playerCode: "O 9", playerNumber: 9, team: "ST JOHNS", totalActions: 49, passesTotal: 33, passesAccurate: 33, passAccuracyPct: 100.0, tacklesTotal: 5, tacklesMissed: 2, tackleSuccessPct: 60.0, ballCarriesTotal: 3, ballCarriesDominant: 1, carryDominancePct: 33.3, ruckArrivalsTotal: 2, ruckArrivalsEffective: 0, ruckEfficiencyPct: 0.0, kicksTotal: 1, kicksGood: 1, kickSuccessPct: 100.0, errors: 0 },
  { playerCode: "O 1", playerNumber: 1, team: "ST JOHNS", totalActions: 45, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 11, tacklesMissed: 1, tackleSuccessPct: 90.9, ballCarriesTotal: 1, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 4, ruckArrivalsEffective: 1, ruckEfficiencyPct: 25.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 14", playerNumber: 14, team: "ST JOHNS", totalActions: 28, passesTotal: 2, passesAccurate: 2, passAccuracyPct: 100.0, tacklesTotal: 12, tacklesMissed: 6, tackleSuccessPct: 50.0, ballCarriesTotal: 2, ballCarriesDominant: 1, carryDominancePct: 50.0, ruckArrivalsTotal: 2, ruckArrivalsEffective: 1, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 17", playerNumber: 17, team: "ST JOHNS", totalActions: 19, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 4, tacklesMissed: 1, tackleSuccessPct: 75.0, ballCarriesTotal: 0, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 1, ruckArrivalsEffective: 0, ruckEfficiencyPct: 0.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 11", playerNumber: 11, team: "ST JOHNS", totalActions: 17, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 8, tacklesMissed: 5, tackleSuccessPct: 37.5, ballCarriesTotal: 1, ballCarriesDominant: 1, carryDominancePct: 100.0, ruckArrivalsTotal: 4, ruckArrivalsEffective: 2, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 13", playerNumber: 13, team: "ST JOHNS", totalActions: 16, passesTotal: 2, passesAccurate: 2, passAccuracyPct: 100.0, tacklesTotal: 9, tacklesMissed: 1, tackleSuccessPct: 88.9, ballCarriesTotal: 0, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 2, ruckArrivalsEffective: 2, ruckEfficiencyPct: 100.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 15", playerNumber: 15, team: "ST JOHNS", totalActions: 16, passesTotal: 2, passesAccurate: 1, passAccuracyPct: 50.0, tacklesTotal: 4, tacklesMissed: 3, tackleSuccessPct: 25.0, ballCarriesTotal: 1, ballCarriesDominant: 1, carryDominancePct: 100.0, ruckArrivalsTotal: 1, ruckArrivalsEffective: 0, ruckEfficiencyPct: 0.0, kicksTotal: 4, kicksGood: 3, kickSuccessPct: 75.0, errors: 0 },
  { playerCode: "O 21", playerNumber: 21, team: "ST JOHNS", totalActions: 15, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 7, tacklesMissed: 4, tackleSuccessPct: 42.9, ballCarriesTotal: 1, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 3, ruckArrivalsEffective: 1, ruckEfficiencyPct: 33.3, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 }
];

// Add score for Week 10 Peterhouse vs St Georges match
finalScores.set(
  generateMatchId("Week 10", "15:00", "PETERHOUSE", "ST GEORGES"),
  { teamAScore: 17, teamBScore: 31 }
);

// Add all Week 10 match scores
finalScores.set(
  generateMatchId("Week 10", "14:00", "LOMAGUNDI", "PRINCE EDWARD"),
  { teamAScore: 64, teamBScore: 10 }
);

finalScores.set(
  generateMatchId("Week 10", "14:00", "MARONDERA", "MUTARE"),
  { teamAScore: 13, teamBScore: 16 }
);

finalScores.set(
  generateMatchId("Week 10", "14:00", "WISE OWL", "HILLCREST"),
  { teamAScore: 53, teamBScore: 36 }
);

// PH 17-31 Saints is already added above as PETERHOUSE vs ST GEORGES

finalScores.set(
  generateMatchId("Week 10", "14:00", "HERITAGE", "KYLE"),
  { teamAScore: 30, teamBScore: 16 }
);

finalScores.set(
  generateMatchId("Week 10", "14:00", "ST IGNATIUS", "TYNWALD"),
  { teamAScore: 38, teamBScore: 3 }
);

finalScores.set(
  generateMatchId("Week 10", "14:00", "WATERSHED", "GATEWAY"),
  { teamAScore: 30, teamBScore: 29 }
);

finalScores.set(
  generateMatchId("Week 10", "14:00", "CBC", "HELLENIC"),
  { teamAScore: 26, teamBScore: 24 }
);

finalScores.set(
  generateMatchId("Week 10", "14:00", "EAGLESVALE", "MIDLANDS CC"),
  { teamAScore: 24, teamBScore: 12 }
);

// Falcon 33-14 Johns is already added above as FALCON vs ST JOHNS

// Define tries with timestamps and conversion status for Peterhouse vs St Georges Week 10
const peterhouseVsStGeorgesWeek10PeterhouseTries: TryScore[] = [
  { time: "33:19", hasConversion: true },   // H 11 try (1999s / 60 = 33:19)
  { time: "68:57", hasConversion: true },   // H 7 try (4137s / 60 = 68:57)
  { time: "45:00", hasConversion: false, isPenalty: true }        // Penalty goal (3 points)
];

const peterhouseVsStGeorgesWeek10StGeorgesTries: TryScore[] = [
  { time: "41:26", hasConversion: true },   // O 99 try (2486s / 60 = 41:26) - 5+2=7
  { time: "46:50", hasConversion: false },  // O 8 try (2810s / 60 = 46:50) - 5+0=5  
  { time: "71:25", hasConversion: true },   // O 6 try (4285s / 60 = 71:25) - 5+2=7
  { time: "25:00", hasConversion: false, isPenalty: true },       // Penalty goal 1 (3 points)
  { time: "55:00", hasConversion: false, isPenalty: true },       // Penalty goal 2 (3 points)
  { time: "65:00", hasConversion: false, isPenalty: true },       // Penalty goal 3 (3 points)
  { time: "75:00", hasConversion: false, isPenalty: true }        // Penalty goal 4 (3 points)
];

// Define kicking data based on try conversions and penalty goals
const peterhouseVsStGeorgesWeek10PeterhouseKicks: KickAtGoal[] = [
  { x: 0.5, y: 0.4, successful: true },    // Conversion for H 11 try
  { x: 0.6, y: 0.3, successful: true },    // Conversion for H 7 try
  { x: 0.4, y: 0.6, successful: true }     // Penalty goal (3 points)
];

const peterhouseVsStGeorgesWeek10StGeorgesKicks: KickAtGoal[] = [
  { x: 0.3, y: 0.5, successful: true },    // Conversion for O 99 try
  { x: 0.7, y: 0.4, successful: true },    // Conversion for O 8 try
  { x: 0.2, y: 0.6, successful: true },    // Conversion for O 6 try
  { x: 0.8, y: 0.3, successful: true },    // Penalty goal 1 (3 points)
  { x: 0.5, y: 0.7, successful: true },    // Penalty goal 2 (3 points)
  { x: 0.4, y: 0.2, successful: true },    // Penalty goal 3 (3 points)
  { x: 0.6, y: 0.8, successful: true }     // Penalty goal 4 (3 points)
];

// Create a box score for the Peterhouse vs St Georges Week 10 game
const peterhouseVsStGeorgesWeek10: BoxScoreData = {
  matchInfo: {
    teamA: "PETERHOUSE",
    teamB: "ST GEORGES",
    venue: "Peterhouse School, Marondera",
    date: "Week 10",
    kickoff: "15:00",
    weather: "Sunny, 26°C",
  },
  teamAPlayers: [
    { name: "Fantiso Panashe", position: "15", tries: 0, kicks: "3/5", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Musekiwa Russell", position: "14", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Maringa Andrew Cpt", position: "13", tries: 0, kicks: "8/8", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Chikwanda Christian", position: "12", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Masamha Munashe", position: "11", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Watt James", position: "10", tries: 0, kicks: "13/13", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Grant Reece", position: "9", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Madzima Tendayi", position: "8", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Zimbango Prosper", position: "7", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Dube Bongani", position: "6", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Mawoyo Mufarowashe", position: "5", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Musavaya Bernard", position: "4", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Mutyatyu Mukudzei vc", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Kafesu Taro", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Ndimutseyi Tanatswa", position: "1", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamBPlayers: [
    { name: "Zane Sibanda", position: "15", tries: 0, kicks: "0/1", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Dylan Burton", position: "14", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Scott Wenham", position: "13", tries: 0, kicks: "1/1", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "James Thompson (c)", position: "12", tries: 0, kicks: "1/2", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Max Mugari", position: "11", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Callum Orford", position: "10", tries: 0, kicks: "21/22", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Joshua Littlewood", position: "9", tries: 0, kicks: "5/5", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Joshua Saunders", position: "8", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Takomborerwa Chigangacha", position: "7", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Tian Muller", position: "6", tries: 1, kicks: "0/1", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Alastair Carle", position: "5", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Ruan Nel", position: "4", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Ethan Fouché", position: "3", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Jasper May", position: "2", tries: 0, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "Tinotenda Dhimairo", position: "1", tries: 0, kicks: "0/1", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 },
    { name: "O 99", position: "99", tries: 1, kicks: "-", lineouts: "-", penaltiesWon: 0, penaltiesConceded: 0 }
  ],
  teamASummary: {
    totalTries: 2,
    totalConversions: "2/2 C",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
    possession: 47,
    scrums: { total: 0, won: 0 },
    lineouts: { total: 0, won: 0 },
    turnovers: 0,
    knockOns: 0,
    mauls: { total: 0, won: 0 },
    kicks: {
      fromHand: { total: 26, reclaimed: 24 },
      inField: { total: 0, reclaimed: 0 },
      toTouch: { total: 0 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 3, successful: 3 }
    },
    attackingPenalties: 0,
    defensivePenalties: 0,
    scrumPenalties: 0
  },
  teamBSummary: {
    totalTries: 3,
    totalConversions: "3/3 C",
    lineoutAccuracy: "-",
    penaltiesWon: 0,
    penaltiesConceded: 0,
    possession: 53,
    scrums: { total: 0, won: 0 },
    lineouts: { total: 0, won: 0 },
    turnovers: 0,
    knockOns: 0,
    mauls: { total: 0, won: 0 },
    kicks: {
      fromHand: { total: 33, reclaimed: 28 },
      inField: { total: 0, reclaimed: 0 },
      toTouch: { total: 0 },
      dropOuts: { total: 0, reclaimed: 0 },
      goalLine: { total: 0 },
      directToTouch: { total: 0 },
      success: { total: 7, successful: 7 }
    },
    attackingPenalties: 0,
    defensivePenalties: 0,
    scrumPenalties: 0
  },
  tryDataA: peterhouseVsStGeorgesWeek10PeterhouseTries,
  tryDataB: peterhouseVsStGeorgesWeek10StGeorgesTries,
  kickDataA: peterhouseVsStGeorgesWeek10PeterhouseKicks,
  kickDataB: peterhouseVsStGeorgesWeek10StGeorgesKicks
};

// Add the Week 10 Peterhouse vs St Georges box score to the map
boxScores.set(
  generateMatchId("Week 10", "15:00", "PETERHOUSE", "ST GEORGES"),
  peterhouseVsStGeorgesWeek10
);

// Player data processing for Peterhouse vs St Georges Week 10
export const peterhouseVsStGeorgesPlayerData = [
  // Peterhouse players (H team)
  { playerCode: "Kafesu Taro", playerNumber: 2, team: "PETERHOUSE", totalActions: 88, passesTotal: 2, passesAccurate: 2, passAccuracyPct: 100.0, tacklesTotal: 16, tacklesMissed: 4, tackleSuccessPct: 75.0, ballCarriesTotal: 5, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 7, ruckArrivalsEffective: 4, ruckEfficiencyPct: 57.1, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Mutyatyu Mukudzei vc", playerNumber: 3, team: "PETERHOUSE", totalActions: 86, passesTotal: 1, passesAccurate: 1, passAccuracyPct: 100.0, tacklesTotal: 15, tacklesMissed: 4, tackleSuccessPct: 73.3, ballCarriesTotal: 11, ballCarriesDominant: 1, carryDominancePct: 9.1, ruckArrivalsTotal: 10, ruckArrivalsEffective: 8, ruckEfficiencyPct: 80.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Dube Bongani", playerNumber: 6, team: "PETERHOUSE", totalActions: 83, passesTotal: 2, passesAccurate: 2, passAccuracyPct: 100.0, tacklesTotal: 19, tacklesMissed: 3, tackleSuccessPct: 84.2, ballCarriesTotal: 4, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 17, ruckArrivalsEffective: 9, ruckEfficiencyPct: 52.9, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Musavaya Bernard", playerNumber: 4, team: "PETERHOUSE", totalActions: 82, passesTotal: 1, passesAccurate: 1, passAccuracyPct: 100.0, tacklesTotal: 15, tacklesMissed: 2, tackleSuccessPct: 86.7, ballCarriesTotal: 4, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 13, ruckArrivalsEffective: 8, ruckEfficiencyPct: 61.5, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Madzima Tendayi", playerNumber: 8, team: "PETERHOUSE", totalActions: 81, passesTotal: 3, passesAccurate: 3, passAccuracyPct: 100.0, tacklesTotal: 10, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 5, ballCarriesDominant: 2, carryDominancePct: 40.0, ruckArrivalsTotal: 8, ruckArrivalsEffective: 5, ruckEfficiencyPct: 62.5, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Zimbango Prosper", playerNumber: 7, team: "PETERHOUSE", totalActions: 65, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 21, tacklesMissed: 5, tackleSuccessPct: 76.2, ballCarriesTotal: 5, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 9, ruckArrivalsEffective: 8, ruckEfficiencyPct: 88.9, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Mawoyo Mufarowashe", playerNumber: 5, team: "PETERHOUSE", totalActions: 65, passesTotal: 5, passesAccurate: 5, passAccuracyPct: 100.0, tacklesTotal: 7, tacklesMissed: 2, tackleSuccessPct: 71.4, ballCarriesTotal: 4, ballCarriesDominant: 2, carryDominancePct: 50.0, ruckArrivalsTotal: 5, ruckArrivalsEffective: 5, ruckEfficiencyPct: 100.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Grant Reece", playerNumber: 9, team: "PETERHOUSE", totalActions: 64, passesTotal: 42, passesAccurate: 42, passAccuracyPct: 100.0, tacklesTotal: 8, tacklesMissed: 3, tackleSuccessPct: 62.5, ballCarriesTotal: 2, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 3, ruckArrivalsEffective: 3, ruckEfficiencyPct: 100.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Ndimutseyi Tanatswa", playerNumber: 1, team: "PETERHOUSE", totalActions: 56, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 6, tacklesMissed: 1, tackleSuccessPct: 83.3, ballCarriesTotal: 0, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 12, ruckArrivalsEffective: 3, ruckEfficiencyPct: 25.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Watt James", playerNumber: 10, team: "PETERHOUSE", totalActions: 52, passesTotal: 13, passesAccurate: 13, passAccuracyPct: 100.0, tacklesTotal: 7, tacklesMissed: 2, tackleSuccessPct: 71.4, ballCarriesTotal: 2, ballCarriesDominant: 1, carryDominancePct: 50.0, ruckArrivalsTotal: 8, ruckArrivalsEffective: 7, ruckEfficiencyPct: 87.5, kicksTotal: 13, kicksGood: 13, kickSuccessPct: 100.0, errors: 0 },
  { playerCode: "Maringa Andrew Cpt", playerNumber: 13, team: "PETERHOUSE", totalActions: 49, passesTotal: 11, passesAccurate: 10, passAccuracyPct: 90.9, tacklesTotal: 9, tacklesMissed: 1, tackleSuccessPct: 88.9, ballCarriesTotal: 1, ballCarriesDominant: 1, carryDominancePct: 100.0, ruckArrivalsTotal: 6, ruckArrivalsEffective: 5, ruckEfficiencyPct: 83.3, kicksTotal: 8, kicksGood: 8, kickSuccessPct: 100.0, errors: 0 },
  { playerCode: "Chikwanda Christian", playerNumber: 12, team: "PETERHOUSE", totalActions: 48, passesTotal: 4, passesAccurate: 4, passAccuracyPct: 100.0, tacklesTotal: 15, tacklesMissed: 5, tackleSuccessPct: 66.7, ballCarriesTotal: 4, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 11, ruckArrivalsEffective: 5, ruckEfficiencyPct: 45.5, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Mahlangu Themba", playerNumber: 17, team: "PETERHOUSE", totalActions: 41, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 8, tacklesMissed: 3, tackleSuccessPct: 62.5, ballCarriesTotal: 3, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 9, ruckArrivalsEffective: 3, ruckEfficiencyPct: 33.3, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Fantiso Panashe", playerNumber: 15, team: "PETERHOUSE", totalActions: 29, passesTotal: 3, passesAccurate: 3, passAccuracyPct: 100.0, tacklesTotal: 5, tacklesMissed: 2, tackleSuccessPct: 60.0, ballCarriesTotal: 2, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 4, ruckArrivalsEffective: 2, ruckEfficiencyPct: 50.0, kicksTotal: 5, kicksGood: 3, kickSuccessPct: 60.0, errors: 0 },
  { playerCode: "Musekiwa Russell", playerNumber: 14, team: "PETERHOUSE", totalActions: 28, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 16, tacklesMissed: 1, tackleSuccessPct: 93.8, ballCarriesTotal: 3, ballCarriesDominant: 1, carryDominancePct: 33.3, ruckArrivalsTotal: 2, ruckArrivalsEffective: 2, ruckEfficiencyPct: 100.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Masamha Munashe", playerNumber: 11, team: "PETERHOUSE", totalActions: 15, passesTotal: 1, passesAccurate: 1, passAccuracyPct: 100.0, tacklesTotal: 2, tacklesMissed: 1, tackleSuccessPct: 50.0, ballCarriesTotal: 2, ballCarriesDominant: 1, carryDominancePct: 50.0, ruckArrivalsTotal: 1, ruckArrivalsEffective: 1, ruckEfficiencyPct: 100.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Maertens Douglas", playerNumber: 23, team: "PETERHOUSE", totalActions: 12, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 4, tacklesMissed: 2, tackleSuccessPct: 50.0, ballCarriesTotal: 2, ballCarriesDominant: 1, carryDominancePct: 50.0, ruckArrivalsTotal: 1, ruckArrivalsEffective: 1, ruckEfficiencyPct: 100.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },

  // St Georges players (O team)
  { playerCode: "Tian Muller", playerNumber: 6, team: "ST GEORGES", totalActions: 112, passesTotal: 1, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 12, tacklesMissed: 4, tackleSuccessPct: 66.7, ballCarriesTotal: 10, ballCarriesDominant: 2, carryDominancePct: 20.0, ruckArrivalsTotal: 21, ruckArrivalsEffective: 12, ruckEfficiencyPct: 57.1, kicksTotal: 1, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 99", playerNumber: 99, team: "ST GEORGES", totalActions: 111, passesTotal: 2, passesAccurate: 2, passAccuracyPct: 100.0, tacklesTotal: 10, tacklesMissed: 1, tackleSuccessPct: 90.0, ballCarriesTotal: 6, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 27, ruckArrivalsEffective: 14, ruckEfficiencyPct: 51.9, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Jasper May", playerNumber: 2, team: "ST GEORGES", totalActions: 106, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 10, tacklesMissed: 2, tackleSuccessPct: 80.0, ballCarriesTotal: 7, ballCarriesDominant: 1, carryDominancePct: 14.3, ruckArrivalsTotal: 26, ruckArrivalsEffective: 19, ruckEfficiencyPct: 73.1, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Callum Orford", playerNumber: 10, team: "ST GEORGES", totalActions: 99, passesTotal: 14, passesAccurate: 14, passAccuracyPct: 100.0, tacklesTotal: 8, tacklesMissed: 3, tackleSuccessPct: 62.5, ballCarriesTotal: 4, ballCarriesDominant: 2, carryDominancePct: 50.0, ruckArrivalsTotal: 21, ruckArrivalsEffective: 14, ruckEfficiencyPct: 66.7, kicksTotal: 22, kicksGood: 21, kickSuccessPct: 95.5, errors: 0 },
  { playerCode: "Joshua Saunders", playerNumber: 8, team: "ST GEORGES", totalActions: 98, passesTotal: 5, passesAccurate: 5, passAccuracyPct: 100.0, tacklesTotal: 14, tacklesMissed: 4, tackleSuccessPct: 71.4, ballCarriesTotal: 11, ballCarriesDominant: 1, carryDominancePct: 9.1, ruckArrivalsTotal: 18, ruckArrivalsEffective: 13, ruckEfficiencyPct: 72.2, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Ethan Fouché", playerNumber: 3, team: "ST GEORGES", totalActions: 92, passesTotal: 1, passesAccurate: 1, passAccuracyPct: 100.0, tacklesTotal: 9, tacklesMissed: 2, tackleSuccessPct: 77.8, ballCarriesTotal: 6, ballCarriesDominant: 1, carryDominancePct: 16.7, ruckArrivalsTotal: 17, ruckArrivalsEffective: 8, ruckEfficiencyPct: 47.1, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Tinotenda Dhimairo", playerNumber: 1, team: "ST GEORGES", totalActions: 91, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 12, tacklesMissed: 1, tackleSuccessPct: 91.7, ballCarriesTotal: 9, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 13, ruckArrivalsEffective: 5, ruckEfficiencyPct: 38.5, kicksTotal: 1, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Takomborerwa Chigangacha", playerNumber: 7, team: "ST GEORGES", totalActions: 89, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 5, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 2, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 26, ruckArrivalsEffective: 16, ruckEfficiencyPct: 61.5, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Joshua Littlewood", playerNumber: 9, team: "ST GEORGES", totalActions: 76, passesTotal: 58, passesAccurate: 58, passAccuracyPct: 100.0, tacklesTotal: 4, tacklesMissed: 3, tackleSuccessPct: 25.0, ballCarriesTotal: 1, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 2, ruckArrivalsEffective: 1, ruckEfficiencyPct: 50.0, kicksTotal: 5, kicksGood: 5, kickSuccessPct: 100.0, errors: 0 },
  { playerCode: "Ruan Nel", playerNumber: 4, team: "ST GEORGES", totalActions: 59, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 7, tacklesMissed: 1, tackleSuccessPct: 85.7, ballCarriesTotal: 6, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 17, ruckArrivalsEffective: 8, ruckEfficiencyPct: 47.1, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "Scott Wenham", playerNumber: 13, team: "ST GEORGES", totalActions: 52, passesTotal: 3, passesAccurate: 2, passAccuracyPct: 66.7, tacklesTotal: 8, tacklesMissed: 2, tackleSuccessPct: 75.0, ballCarriesTotal: 8, ballCarriesDominant: 3, carryDominancePct: 37.5, ruckArrivalsTotal: 14, ruckArrivalsEffective: 10, ruckEfficiencyPct: 71.4, kicksTotal: 1, kicksGood: 1, kickSuccessPct: 100.0, errors: 0 },
  { playerCode: "James Thompson (c)", playerNumber: 12, team: "ST GEORGES", totalActions: 46, passesTotal: 4, passesAccurate: 4, passAccuracyPct: 100.0, tacklesTotal: 4, tacklesMissed: 2, tackleSuccessPct: 50.0, ballCarriesTotal: 13, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 9, ruckArrivalsEffective: 6, ruckEfficiencyPct: 66.7, kicksTotal: 2, kicksGood: 1, kickSuccessPct: 50.0, errors: 0 },
  { playerCode: "O 20", playerNumber: 20, team: "ST GEORGES", totalActions: 24, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 4, tacklesMissed: 2, tackleSuccessPct: 50.0, ballCarriesTotal: 2, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 5, ruckArrivalsEffective: 3, ruckEfficiencyPct: 60.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 21", playerNumber: 21, team: "ST GEORGES", totalActions: 24, passesTotal: 14, passesAccurate: 13, passAccuracyPct: 92.9, tacklesTotal: 1, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 2, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 2, ruckArrivalsEffective: 1, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 15", playerNumber: 15, team: "ST GEORGES", totalActions: 22, passesTotal: 1, passesAccurate: 1, passAccuracyPct: 100.0, tacklesTotal: 1, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 4, ballCarriesDominant: 3, carryDominancePct: 75.0, ruckArrivalsTotal: 4, ruckArrivalsEffective: 3, ruckEfficiencyPct: 75.0, kicksTotal: 1, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 14", playerNumber: 14, team: "ST GEORGES", totalActions: 15, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 4, tacklesMissed: 1, tackleSuccessPct: 75.0, ballCarriesTotal: 3, ballCarriesDominant: 1, carryDominancePct: 33.3, ruckArrivalsTotal: 4, ruckArrivalsEffective: 2, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 5", playerNumber: 5, team: "ST GEORGES", totalActions: 14, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 3, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 0, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 2, ruckArrivalsEffective: 2, ruckEfficiencyPct: 100.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 11", playerNumber: 11, team: "ST GEORGES", totalActions: 9, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 1, tacklesMissed: 1, tackleSuccessPct: 0.0, ballCarriesTotal: 3, ballCarriesDominant: 2, carryDominancePct: 66.7, ruckArrivalsTotal: 2, ruckArrivalsEffective: 0, ruckEfficiencyPct: 0.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 23", playerNumber: 23, team: "ST GEORGES", totalActions: 9, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 1, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 0, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 4, ruckArrivalsEffective: 2, ruckEfficiencyPct: 50.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 },
  { playerCode: "O 16", playerNumber: 16, team: "ST GEORGES", totalActions: 7, passesTotal: 0, passesAccurate: 0, passAccuracyPct: 0.0, tacklesTotal: 2, tacklesMissed: 0, tackleSuccessPct: 100.0, ballCarriesTotal: 1, ballCarriesDominant: 0, carryDominancePct: 0.0, ruckArrivalsTotal: 2, ruckArrivalsEffective: 2, ruckEfficiencyPct: 100.0, kicksTotal: 0, kicksGood: 0, kickSuccessPct: 0.0, errors: 0 }
];