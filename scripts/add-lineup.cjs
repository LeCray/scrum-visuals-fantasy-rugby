#!/usr/bin/env node

/**
 * Quick script to create a lineup template
 * Usage: node scripts/add-lineup.js <matchId>
 */

const fs = require('fs');
const path = require('path');

const matchId = process.argv[2];

if (!matchId) {
  console.log('❌ Please provide a match ID');
  console.log('Usage: node scripts/add-lineup.js 287880');
  process.exit(1);
}

// Read fixtures to get team info
const fixturesPath = path.join(__dirname, '../src/lib/data/urc-fixtures.json');
let fixture;

try {
  const fixtures = JSON.parse(fs.readFileSync(fixturesPath, 'utf8'));
  fixture = fixtures.find(f => f.matchId === matchId);
  
  if (!fixture) {
    console.log(`❌ Fixture ${matchId} not found in urc-fixtures.json`);
    console.log('   Add the fixture first with: node scripts/add-fixture.js');
    process.exit(1);
  }
} catch (err) {
  console.log('❌ Error reading fixtures.json');
  process.exit(1);
}

// Create lineup template
const lineupTemplate = {
  matchId,
  home: {
    team: fixture.home.team,
    teamId: fixture.home.teamId,
    starting: [
      { name: "First Last", number: 1, position: "Prop" },
      { name: "First Last", number: 2, position: "Hooker" },
      { name: "First Last", number: 3, position: "Prop" },
      { name: "First Last", number: 4, position: "Lock" },
      { name: "First Last", number: 5, position: "Lock" },
      { name: "First Last", number: 6, position: "Flanker" },
      { name: "First Last", number: 7, position: "Flanker" },
      { name: "First Last", number: 8, position: "Number 8" },
      { name: "First Last", number: 9, position: "Scrum-Half" },
      { name: "First Last", number: 10, position: "Fly-Half" },
      { name: "First Last", number: 11, position: "Wing" },
      { name: "First Last", number: 12, position: "Centre" },
      { name: "First Last", number: 13, position: "Centre" },
      { name: "First Last", number: 14, position: "Wing" },
      { name: "First Last", number: 15, position: "Fullback" }
    ],
    bench: [
      { name: "First Last", number: 16, position: "Hooker" },
      { name: "First Last", number: 17, position: "Prop" },
      { name: "First Last", number: 18, position: "Prop" },
      { name: "First Last", number: 19, position: "Lock" },
      { name: "First Last", number: 20, position: "Flanker" },
      { name: "First Last", number: 21, position: "Scrum-Half" },
      { name: "First Last", number: 22, position: "Fly-Half" },
      { name: "First Last", number: 23, position: "Centre" }
    ]
  },
  away: {
    team: fixture.away.team,
    teamId: fixture.away.teamId,
    starting: [],
    bench: []
  }
};

// Create directory if it doesn't exist
const lineupsDir = path.join(__dirname, '../src/lib/data/urc-match-lineups');
if (!fs.existsSync(lineupsDir)) {
  fs.mkdirSync(lineupsDir, { recursive: true });
}

// Save lineup template
const lineupPath = path.join(lineupsDir, `${matchId}.json`);

if (fs.existsSync(lineupPath)) {
  console.log(`⚠️  Lineup file already exists: ${lineupPath}`);
  console.log('   Edit it manually or delete it first');
  process.exit(1);
}

fs.writeFileSync(lineupPath, JSON.stringify(lineupTemplate, null, 2));

console.log(`\n✅ Lineup template created: src/lib/data/urc-match-lineups/${matchId}.json`);
console.log(`\n📋 Next steps:`);
console.log(`   1. Edit the file and replace "First Last" with actual player names`);
console.log(`   2. Make sure names match GraphQL squad data exactly`);
console.log(`   3. Update hasLineup to true in urc-fixtures.json`);
console.log(`   4. git add, commit, push!`);
console.log(`\n💡 Tip: You can copy/paste player names from the Squad Rosters view`);

