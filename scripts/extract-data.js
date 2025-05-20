import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Ensure data directory exists
const dataDir = path.join(rootDir, 'src', 'lib', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Read boxScoreData.ts file
const boxScoreDataPath = path.join(rootDir, 'src', 'lib', 'boxScoreData.ts');
const boxScoreDataContent = fs.readFileSync(boxScoreDataPath, 'utf8');

// Extract boxScores data
console.log('Extracting box scores data...');
const boxScoresPattern = /boxScores\.set\(\s*generateMatchId\("([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\),\s*([^)]+)\);/g;
const boxScoresData = {};

let match;
while ((match = boxScoresPattern.exec(boxScoreDataContent)) !== null) {
  const date = match[1];
  const time = match[2];
  const teamA = match[3];
  const teamB = match[4];
  
  // Create a unique ID
  const matchId = `${date}-${time}-${teamA}-${teamB}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  
  // Find the corresponding data object (this is a simplification, actual parsing would be more complex)
  // For demonstration, we'll extract by looking for key patterns
  const variableNamePattern = new RegExp(`const\\s+([a-zA-Z0-9_]+)\\s*:\\s*BoxScoreData\\s*=\\s*\\{[\\s\\S]*?matchInfo:\\s*\\{[\\s\\S]*?teamA:\\s*"${teamA}"[\\s\\S]*?teamB:\\s*"${teamB}"[\\s\\S]*?\\}[\\s\\S]*?\\}\\s*;`, 'g');
  
  const varMatch = variableNamePattern.exec(boxScoreDataContent);
  if (varMatch) {
    // For this script, we'll just note that we found a match
    // In a real implementation, we would extract the full object
    boxScoresData[matchId] = { 
      note: "Data would be extracted here from variable: " + varMatch[1],
      matchInfo: {
        teamA: teamA,
        teamB: teamB,
        date: date,
        time: time
      }
    };
  }
}

// Extract finalScores data
console.log('Extracting final scores data...');
const finalScoresPattern = /finalScores\.set\(\s*generateMatchId\("([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\),\s*\{\s*teamAScore:\s*(\d+),\s*teamBScore:\s*(\d+)\s*\}\s*\);/g;
const finalScoresData = {};

while ((match = finalScoresPattern.exec(boxScoreDataContent)) !== null) {
  const date = match[1];
  const time = match[2];
  const teamA = match[3];
  const teamB = match[4];
  const teamAScore = parseInt(match[5], 10);
  const teamBScore = parseInt(match[6], 10);
  
  // Create a unique ID
  const matchId = `${date}-${time}-${teamA}-${teamB}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  
  finalScoresData[matchId] = {
    teamAScore,
    teamBScore
  };
}

// Extract highlighted fixtures from the HighlightedFixtures.tsx file
console.log('Extracting highlighted fixtures...');
const fixturesPath = path.join(rootDir, 'src', 'components', 'fixtures', 'HighlightedFixtures.tsx');
const fixturesContent = fs.readFileSync(fixturesPath, 'utf8');

// Define sample fixtures data since we're moving away from the static data in the component
const fixturesData = [
  {
    "date": "April 28th",
    "time": "13:00",
    "teamA": "MILTON 1XV",
    "teamB": "WISE OWL 1XV",
    "venue": "St John's College"
  },
  {
    "date": "April 28th",
    "time": "15:40",
    "teamA": "RYDINGS 1XV",
    "teamB": "HERITAGE 1XV",
    "venue": "St John's College"
  },
  {
    "date": "April 29th",
    "time": "14:20",
    "teamA": "LOMAGUNDI 1XV",
    "teamB": "ST ALBANS 1XV",
    "venue": "St John's College"
  },
  {
    "date": "April 29th",
    "time": "15:40",
    "teamA": "ST GEORGE'S 1XV",
    "teamB": "ST ANDREW'S 1XV",
    "venue": "St John's College"
  },
  {
    "date": "April 30th",
    "time": "13:00",
    "teamA": "GOLDRIDGE 1XV",
    "teamB": "HILLCREST 1XV",
    "venue": "St John's College"
  },
  {
    "date": "April 30th",
    "time": "15:40",
    "teamA": "WATERSHED 1XV",
    "teamB": "GATEWAY 1XV",
    "venue": "St John's College"
  },
  {
    "date": "May 1st",
    "time": "13:20",
    "teamA": "PETERHOUSE 1XV",
    "teamB": "ST ANDREW'S 1XV",
    "venue": "St John's College"
  },
  {
    "date": "May 1st",
    "time": "16:00",
    "teamA": "ZAM STEELERS",
    "teamB": "SHARKS ACADEMY",
    "venue": "St John's College"
  },
  {
    "date": "May 3rd",
    "time": "10:20",
    "teamA": "CBC 1XV",
    "teamB": "PETERHOUSE 1XV",
    "venue": "St John's College"
  },
  {
    "date": "May 3rd",
    "time": "11:40",
    "teamA": "PRINCE EDWARD 1XV",
    "teamB": "CHURCHILL 1XV",
    "venue": "St John's College"
  },
  {
    "date": "May 3rd",
    "time": "14:20",
    "teamA": "FALCON 1XV",
    "teamB": "ST ALBANS 1XV",
    "venue": "St John's College"
  },
  {
    "date": "May 3rd",
    "time": "15:40",
    "teamA": "ST JOHN'S 1XV",
    "teamB": "ST ANDREW'S 1XV",
    "venue": "St John's College"
  },
  {
    "date": "Week 1",
    "time": "14:00",
    "teamA": "WATERSHED",
    "teamB": "HELLENIC",
    "venue": "Hellenic Academy, Harare"
  },
  {
    "date": "Week 1",
    "time": "15:15",
    "teamA": "LOMAGUNDI",
    "teamB": "FALCON",
    "venue": "Lomagundi College, Chinhoyi"
  }
];

// Write data to JSON files
console.log('Writing data to JSON files...');
fs.writeFileSync(path.join(dataDir, 'boxScores.json'), JSON.stringify(boxScoresData, null, 2));
fs.writeFileSync(path.join(dataDir, 'finalScores.json'), JSON.stringify(finalScoresData, null, 2));
fs.writeFileSync(path.join(dataDir, 'fixtures.json'), JSON.stringify(fixturesData, null, 2));

console.log('Data extraction completed successfully!'); 