import type { Handler } from '@netlify/functions';

/**
 * Netlify Function: Browser Cookie Pass-Through Proxy
 * 
 * This function forwards cookies from the user's browser to the URC Stats API.
 * The user must have an active session (by visiting stats.unitedrugby.com in their browser).
 * 
 * Flow:
 * 1. Client makes request with their browser cookies
 * 2. Netlify Function receives cookies and forwards them to URC API
 * 3. URC API recognizes the session and returns data
 * 4. Function returns data to client
 */
export const handler: Handler = async (event) => {
  // Enable CORS with credentials
  const headers = {
    'Access-Control-Allow-Origin': event.headers.origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Cookie',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const matchId = event.queryStringParameters?.matchId;
    
    if (!matchId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Match ID is required',
          usage: 'Call with ?matchId=287880'
        }),
      };
    }

    // Get cookies from the client's browser
    const clientCookies = event.headers.cookie || event.headers.Cookie || '';
    
    console.log(`Fetching lineup for match ${matchId}`);
    console.log(`Client cookies present: ${clientCookies ? 'Yes' : 'No'}`);

    // Forward the request with browser cookies
    const response = await fetch(
      `https://stats.unitedrugby.com/api/match/${matchId}/lineups`,
      {
        headers: {
          'Cookie': clientCookies, // Pass through browser session
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'application/json',
          'Referer': 'https://stats.unitedrugby.com',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: `URC API returned ${response.status}: ${response.statusText}`,
          details: errorText,
          hint: clientCookies 
            ? 'Session may have expired. Try visiting stats.unitedrugby.com in your browser to refresh it.'
            : 'No session cookie found. Please visit stats.unitedrugby.com in your browser first.',
          matchId,
        }),
      };
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error('Proxy error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

