import { BoxScoreData, FinalScore, HighlightedFixture } from './types';

// Cache for loaded data
let boxScoresCache: Record<string, BoxScoreData> | null = null;
let finalScoresCache: Record<string, FinalScore> | null = null;
let fixturesCache: HighlightedFixture[] | null = null;

// Function to generate match ID (same as in original code)
const generateMatchId = (date: string, time: string, teamA: string, teamB: string): string => {
  return `${date}-${time}-${teamA}-${teamB}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
};

// Load box scores data
async function loadBoxScores(): Promise<Record<string, BoxScoreData>> {
  if (boxScoresCache) return boxScoresCache;
  
  try {
    const response = await fetch('/src/lib/data/boxScores.json');
    boxScoresCache = await response.json();
    return boxScoresCache;
  } catch (error) {
    console.error('Failed to load box scores data:', error);
    return {};
  }
}

// Load final scores data
async function loadFinalScores(): Promise<Record<string, FinalScore>> {
  if (finalScoresCache) return finalScoresCache;
  
  try {
    const response = await fetch('/src/lib/data/finalScores.json');
    finalScoresCache = await response.json();
    return finalScoresCache;
  } catch (error) {
    console.error('Failed to load final scores data:', error);
    return {};
  }
}

// Load highlighted fixtures data
export async function loadFixtures(): Promise<HighlightedFixture[]> {
  if (fixturesCache) return fixturesCache;
  
  try {
    const response = await fetch('/src/lib/data/fixtures.json');
    fixturesCache = await response.json();
    return fixturesCache;
  } catch (error) {
    console.error('Failed to load fixtures data:', error);
    return [];
  }
}

// Get box score for a match - mirrors the original API
export async function getBoxScore(date: string, time: string, teamA: string, teamB: string): Promise<BoxScoreData | null> {
  const boxScores = await loadBoxScores();
  const matchId = generateMatchId(date, time, teamA, teamB);
  return boxScores[matchId] || null;
}

// Get final score for a match - mirrors the original API
export async function getFinalScore(date: string, time: string, teamA: string, teamB: string): Promise<FinalScore | undefined> {
  const finalScores = await loadFinalScores();
  const matchId = generateMatchId(date, time, teamA, teamB);
  return finalScores[matchId];
}

// Get highlighted fixtures - matches the original data format
export async function getHighlightedFixtures(): Promise<HighlightedFixture[]> {
  return await loadFixtures();
}

// Initialize data loading on module import
void loadBoxScores();
void loadFinalScores();
void loadFixtures(); 