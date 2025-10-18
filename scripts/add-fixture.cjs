#!/usr/bin/env node

/**
 * Quick script to add a new fixture
 * Usage: node scripts/add-fixture.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

const TEAMS = {
  'Munster': { id: '4377', abbr: 'MUN' },
  'Lions': { id: '5092', abbr: 'LIO' },
  'Edinburgh': { id: '1641', abbr: 'EDI' },
  'Ospreys': { id: '3533', abbr: 'OSP' },
  'Zebre Parma': { id: '4474', abbr: 'ZEB' },
  'Cardiff': { id: '4471', abbr: 'CAR' },
  'Benetton': { id: '2019', abbr: 'BEN' },
  'Scarlets': { id: '3514', abbr: 'SCA' },
  'Sharks': { id: '3994', abbr: 'SHA' },
  'Leinster': { id: '5356', abbr: 'LEI' },
  'Glasgow Warriors': { id: '3098', abbr: 'GLA' },
  'Dragons': { id: '5057', abbr: 'DRA' },
  'Connacht': { id: '5483', abbr: 'CON' },
  'Bulls': { id: '5586', abbr: 'BUL' },
  'Stormers': { id: '4568', abbr: 'STO' },
  'Ulster': { id: '2129', abbr: 'ULS' }
};

async function main() {
  console.log('\n🏉 Add URC Fixture\n');

  const matchId = await question('Match ID (from URL): ');
  const round = await question('Round (e.g., Round 4): ');
  const date = await question('Date (e.g., Fri, 17 Oct 2025): ');
  const time = await question('Time (e.g., 14:45): ');
  const venue = await question('Venue: ');
  
  console.log('\nAvailable teams:');
  Object.keys(TEAMS).forEach((team, i) => {
    if (i % 2 === 0) console.log();
    process.stdout.write(`${team.padEnd(20)}`);
  });
  console.log('\n');

  const homeTeam = await question('Home team: ');
  const awayTeam = await question('Away team: ');

  const home = TEAMS[homeTeam];
  const away = TEAMS[awayTeam];

  if (!home || !away) {
    console.log('❌ Invalid team name. Please use exact name from list above.');
    rl.close();
    return;
  }

  const fixture = {
    matchId,
    round,
    date,
    time,
    venue,
    home: {
      team: homeTeam,
      teamId: home.id,
      abbreviation: home.abbr
    },
    away: {
      team: awayTeam,
      teamId: away.id,
      abbreviation: away.abbr
    },
    hasLineup: false
  };

  // Read existing fixtures
  const fixturesPath = path.join(__dirname, '../src/lib/data/urc-fixtures.json');
  let fixtures = [];
  
  try {
    const data = fs.readFileSync(fixturesPath, 'utf8');
    fixtures = JSON.parse(data);
  } catch (err) {
    console.log('Creating new fixtures file...');
  }

  // Add new fixture
  fixtures.push(fixture);

  // Save
  fs.writeFileSync(fixturesPath, JSON.stringify(fixtures, null, 2));

  console.log('\n✅ Fixture added to src/lib/data/urc-fixtures.json');
  console.log(`\n📋 Next steps:`);
  console.log(`   1. When lineup is announced, run: node scripts/add-lineup.js ${matchId}`);
  console.log(`   2. Or manually create: src/lib/data/urc-match-lineups/${matchId}.json`);
  console.log(`   3. Update hasLineup to true in fixtures.json`);
  console.log(`   4. git add, commit, push!`);

  rl.close();
}

main().catch(console.error);

