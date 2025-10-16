import type { Handler } from '@netlify/functions';

/**
 * Scrapes URC match page HTML to extract lineup data
 * Returns list of players in starting XV + bench for the match
 */
export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const matchId = event.queryStringParameters?.matchId;
    
    if (!matchId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Match ID is required' }),
      };
    }

    console.log(`Fetching lineup for match ${matchId}...`);

    // Fetch the match page HTML
    const url = `https://stats.unitedrugby.com/match-centre/${matchId}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: `Failed to fetch match page: ${response.statusText}`,
          matchId 
        }),
      };
    }

    const html = await response.text();

    // Parse lineup data from HTML
    const lineup = parseLineupFromHTML(html, matchId);

    if (!lineup.home.starting.length && !lineup.away.starting.length) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          error: 'No lineup data found in match page',
          hint: 'Match may not have lineup published yet, or try a different match ID',
          matchId,
          debugInfo: {
            htmlLength: html.length,
            hasLineupClass: html.includes('lineup'),
            hasPlayerClass: html.includes('player'),
          }
        }),
      };
    }

    console.log(`Successfully extracted lineup for match ${matchId}`);

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lineup),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch lineup',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

/**
 * Parse lineup data from HTML
 * Returns structure: { home: { starting: [], bench: [] }, away: { starting: [], bench: [] } }
 */
function parseLineupFromHTML(html: string, matchId: string) {
  const lineup = {
    home: { starting: [] as any[], bench: [] as any[], team: '' },
    away: { starting: [] as any[], bench: [] as any[], team: '' },
    matchId,
  };

  try {
    // Try to extract data-lineup or data-match JSON from script tags
    const scriptMatch = html.match(/<script[^>]*>.*?window\.__INITIAL_STATE__\s*=\s*({.*?});/s);
    if (scriptMatch) {
      const data = JSON.parse(scriptMatch[1]);
      return parseStructuredData(data, matchId);
    }

    // Pattern 1: Look for JSON-LD structured data
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
    if (jsonLdMatch) {
      const jsonData = JSON.parse(jsonLdMatch[1]);
      if (jsonData.performer || jsonData.athlete) {
        return parseStructuredData(jsonData, matchId);
      }
    }

    // Pattern 2: Look for lineup in data attributes
    const dataLineupMatch = html.match(/data-lineup=['"]({.*?})['"]/);
    if (dataLineupMatch) {
      const data = JSON.parse(dataLineupMatch[1]);
      return parseStructuredData(data, matchId);
    }

    // Pattern 3: URC-specific HTML structure
    // First name: <h3 class="...font-medium..."><div><div>FirstName</div></div></h3>
    // Last name: <h3 class="...font-bold..."><div><div>LastName</div></div></h3>
    
    const firstNameRegex = /<h3[^>]*font-medium[^>]*>(?:<div>)*<div[^>]*>([^<]+)<\/div>/gi;
    const lastNameRegex = /<h3[^>]*font-bold[^>]*font-redhat[^>]*>(?:<div>)*<div[^>]*>([^<]+)<\/div>/gi;
    
    const firstNames = Array.from(html.matchAll(firstNameRegex)).map(m => m[1].trim());
    const lastNames = Array.from(html.matchAll(lastNameRegex)).map(m => m[1].trim());
    
    // Combine first and last names
    const playerCount = Math.min(firstNames.length, lastNames.length);
    
    for (let i = 0; i < playerCount; i++) {
      const fullName = `${firstNames[i]} ${lastNames[i]}`;
      const playerData = {
        name: fullName,
        firstName: firstNames[i],
        lastName: lastNames[i],
        position: '',
        number: i + 1,
      };
      
      // First 15 are starting, next are bench
      if (i < 15) {
        lineup.home.starting.push(playerData);
      } else if (i < 23) {
        lineup.home.bench.push(playerData);
      } else if (i < 30) {
        // Away team starting
        lineup.away.starting.push({ ...playerData, number: i - 22 });
      } else {
        // Away team bench
        lineup.away.bench.push({ ...playerData, number: i - 29 });
      }
    }

  } catch (error) {
    console.error('Error parsing HTML:', error);
  }

  return lineup;
}

/**
 * Parse structured JSON data from page
 */
function parseStructuredData(data: any, matchId: string) {
  const lineup = {
    home: { starting: [] as any[], bench: [] as any[], team: '' },
    away: { starting: [] as any[], bench: [] as any[], team: '' },
    matchId,
  };

  // Try various common data structures
  if (data.homeTeam?.lineup) {
    lineup.home.starting = data.homeTeam.lineup.starting || [];
    lineup.home.bench = data.homeTeam.lineup.bench || [];
    lineup.home.team = data.homeTeam.name || '';
  }

  if (data.awayTeam?.lineup) {
    lineup.away.starting = data.awayTeam.lineup.starting || [];
    lineup.away.bench = data.awayTeam.lineup.bench || [];
    lineup.away.team = data.awayTeam.name || '';
  }

  // Alternative structure
  if (data.match?.homeTeam) {
    lineup.home = parseTeamData(data.match.homeTeam);
  }
  if (data.match?.awayTeam) {
    lineup.away = parseTeamData(data.match.awayTeam);
  }

  return lineup;
}

function parseTeamData(teamData: any) {
  return {
    starting: teamData.lineup?.starting || teamData.starting || [],
    bench: teamData.lineup?.bench || teamData.bench || teamData.replacements || [],
    team: teamData.name || teamData.teamName || '',
  };
}
