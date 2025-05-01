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

export type TeamStats = {
  totalTries: number;
  totalConversions: string;
  lineoutAccuracy: string;
  penaltiesWon: number;
  penaltiesConceded: number;
};

export type BoxScoreData = {
  matchInfo: {
    teamA: string;
    teamB: string;
    venue: string;
    date: string;
    kickoff: string;
    weather: string;
  };
  teamAPlayers: Player[];
  teamBPlayers: Player[];
  teamASummary: TeamStats;
  teamBSummary: TeamStats;
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

// Function to get final score for a match
export const getFinalScore = (date: string, time: string, teamA: string, teamB: string) => {
  const matchId = generateMatchId(date, time, teamA, teamB);
  return finalScores.get(matchId);
};

// Export everything as before
export { generateMatchId }; 