// Types for rugby match data
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
    goalLine?: { total: number };
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
  teamAPlayers: Array<Player>;
  teamBPlayers: Array<Player>;
  teamASummary: TeamStats;
  teamBSummary: TeamStats;
  tryDataA?: TryScore[];
  tryDataB?: TryScore[];
  kickDataA?: KickAtGoal[];
  kickDataB?: KickAtGoal[];
};

// Type for final scores
export type FinalScore = {
  teamAScore: number;
  teamBScore: number;
};

// Type for highlighted fixture data
export type HighlightedFixture = {
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  venue: string;
}; 