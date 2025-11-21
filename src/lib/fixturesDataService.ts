// Service to load fixtures data from CSV files

type Fixture = {
  time: string;
  teamA: string;
  teamB: string;
  status?: 'cancelled';
  location?: string;
};

type FixtureDay = {
  date: string;
  day: string;
  fixtures: Fixture[];
  month?: string;
};

type Competition = {
  id: string;
  name: string;
  display_name: string;
  has_matchweeks: boolean;
  season: string;
};

// Parse CSV string to array of objects
function parseCSV(csvText: string): any[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  });
}

// Group fixtures by date
function groupFixturesByDate(rows: any[]): FixtureDay[] {
  const grouped = new Map<string, FixtureDay>();
  
  rows.forEach(row => {
    const key = `${row.date}-${row.day}`;
    
    if (!grouped.has(key)) {
      grouped.set(key, {
        date: row.date,
        day: row.day,
        month: row.month || undefined,
        fixtures: []
      });
    }
    
    const fixture: Fixture = {
      time: row.time,
      teamA: row.teamA,
      teamB: row.teamB,
    };
    
    if (row.location) fixture.location = row.location;
    if (row.status === 'cancelled') fixture.status = 'cancelled';
    
    grouped.get(key)!.fixtures.push(fixture);
  });
  
  return Array.from(grouped.values());
}

// Load and parse team logos CSV
export async function loadTeamLogos(): Promise<Record<string, string>> {
  try {
    const response = await fetch('/data/fixtures/team_logos.csv');
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    const logoMap: Record<string, string> = {};
    rows.forEach(row => {
      logoMap[row.team_name] = row.logo_path;
    });
    
    return logoMap;
  } catch (error) {
    console.error('Error loading team logos:', error);
    return {};
  }
}

// Load Derby Day fixtures
export async function loadDerbyDayFixtures(): Promise<FixtureDay[]> {
  try {
    const response = await fetch('/data/fixtures/derby_day.csv');
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    return groupFixturesByDate(rows);
  } catch (error) {
    console.error('Error loading derby day fixtures:', error);
    return [];
  }
}

// Load Zim Sables fixtures
export async function loadZimSablesFixtures(): Promise<FixtureDay[]> {
  try {
    const response = await fetch('/data/fixtures/zim_sables.csv');
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    return groupFixturesByDate(rows);
  } catch (error) {
    console.error('Error loading zim sables fixtures:', error);
    return [];
  }
}

// Load SA Schools fixtures
export async function loadSASchoolsFixtures(): Promise<FixtureDay[]> {
  try {
    const response = await fetch('/data/fixtures/sa_schools.csv');
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    return groupFixturesByDate(rows);
  } catch (error) {
    console.error('Error loading SA schools fixtures:', error);
    return [];
  }
}

// Load SBR 2025 fixtures
export async function loadSBR2025Fixtures(): Promise<FixtureDay[]> {
  try {
    const response = await fetch('/data/fixtures/sbr2025.csv');
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    return groupFixturesByDate(rows);
  } catch (error) {
    console.error('Error loading SBR 2025 fixtures:', error);
    return [];
  }
}

// Load competitions
export async function loadCompetitions(): Promise<Competition[]> {
  try {
    const response = await fetch('/data/fixtures/competitions.csv');
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      display_name: row.display_name,
      has_matchweeks: row.has_matchweeks === 'true',
      season: row.season
    }));
  } catch (error) {
    console.error('Error loading competitions:', error);
    return [];
  }
}

// Load all fixtures at once
export async function loadAllFixtures() {
  const [competitions, teamLogos, derbyDay, zimSables, saSchools, sbr2025] = await Promise.all([
    loadCompetitions(),
    loadTeamLogos(),
    loadDerbyDayFixtures(),
    loadZimSablesFixtures(),
    loadSASchoolsFixtures(),
    loadSBR2025Fixtures()
  ]);
  
  return {
    competitions,
    teamLogos,
    derbyDay,
    zimSables,
    saSchools,
    sbr2025
  };
}

