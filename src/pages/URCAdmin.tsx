import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Upload, FileJson, CheckCircle, AlertCircle, Database } from 'lucide-react';
import { Button } from '../components/ui/button';
import { saveFixtures, saveLineup, getFixtures, type URCFixture } from '../lib/urcSupabaseService';

const URCAdmin: React.FC = () => {
  const [fixturesHtml, setFixturesHtml] = useState('');
  const [lineupHtml, setLineupHtml] = useState('');
  const [fixturesStatus, setFixturesStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lineupStatus, setLineupStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fixturesMessage, setFixturesMessage] = useState('');
  const [lineupMessage, setLineupMessage] = useState('');
  const [parsedFixtures, setParsedFixtures] = useState('');
  const [parsedLineup, setParsedLineup] = useState('');
  const [fixturesData, setFixturesData] = useState<URCFixture[]>([]);

  // Load fixtures from Supabase on mount
  useEffect(() => {
    const loadFixtures = async () => {
      const fixtures = await getFixtures();
      setFixturesData(fixtures);
    };
    loadFixtures();
  }, []);

  const parseFixturesHtml = async () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(fixturesHtml, 'text/html');
      
      const fixtureCards = doc.querySelectorAll('.fixture-card');
      const fixtures: any[] = [];
      const round = prompt('What round are these fixtures? (e.g., Round 4)') || 'Round 4';
      
      fixtureCards.forEach((card) => {
        // Get match ID
        const matchId = card.getAttribute('data-match-id') || '';
        
        // Get team abbreviations
        const homeAbbr = card.querySelector('.team-name.home-name')?.textContent?.trim() || '';
        const awayAbbr = card.querySelector('.team-name.away-name')?.textContent?.trim() || '';
        
        // Get team IDs from background divs
        const homeBgDiv = card.querySelector('[class*="home-team-bg-"]');
        const awayBgDiv = card.querySelector('[class*="away-team-bg-"]');
        const homeTeamId = homeBgDiv?.className.match(/home-team-bg-(\d+)/)?.[1] || '';
        const awayTeamId = awayBgDiv?.className.match(/away-team-bg-(\d+)/)?.[1] || '';
        
        // Get date and time
        const dateTimeText = card.querySelector('.match-date-time')?.textContent?.trim() || '';
        // Parse "Fri 17 Oct | 14:45" into separate parts
        const [datePart, timePart] = dateTimeText.split('|').map(s => s.trim());
        
        // Convert "Fri 17 Oct" to "Fri, 17 Oct 2025"
        const date = datePart ? datePart.replace(/(\w{3}) (\d+)/, '$1, $2') + ' 2025' : '';
        const time = timePart || '';
        
        // Map abbreviations to full team names
        const teamNameMap: Record<string, string> = {
          'EDI': 'Edinburgh', 'BEN': 'Benetton', 'CON': 'Connacht', 'BUL': 'Bulls',
          'DRA': 'Dragons', 'CAR': 'Cardiff', 'LIO': 'Lions', 'SCA': 'Scarlets',
          'SHA': 'Sharks', 'ULS': 'Ulster', 'LEI': 'Leinster', 'MUN': 'Munster',
          'ZEB': 'Zebre', 'STO': 'Stormers', 'OSP': 'Ospreys', 'GLA': 'Glasgow Warriors'
        };
        
        const homeTeam = teamNameMap[homeAbbr] || homeAbbr;
        const awayTeam = teamNameMap[awayAbbr] || awayAbbr;
        
        if (matchId && homeAbbr && awayAbbr) {
          fixtures.push({
            matchId,
            round,
            date,
            time,
            venue: 'TBD',
            home: {
              team: homeTeam,
              teamId: homeTeamId,
              abbreviation: homeAbbr
            },
            away: {
              team: awayTeam,
              teamId: awayTeamId,
              abbreviation: awayAbbr
            },
            hasLineup: false
          });
        }
      });
      
      const formattedJson = JSON.stringify(fixtures, null, 2);
      setParsedFixtures(formattedJson);
      
      // Save to Supabase
      const saved = await saveFixtures(fixtures);
      
      if (saved) {
        setFixturesStatus('success');
        setFixturesMessage(`✅ Saved ${fixtures.length} fixture(s) to Supabase! JSON also copied to clipboard.`);
        
        // Reload fixtures from Supabase
        const updatedFixtures = await getFixtures();
        setFixturesData(updatedFixtures);
      } else {
        setFixturesStatus('error');
        setFixturesMessage('❌ Failed to save to Supabase. Check console for details.');
      }
      
      navigator.clipboard.writeText(formattedJson);
    } catch (err) {
      setFixturesStatus('error');
      setFixturesMessage(err instanceof Error ? err.message : 'Failed to parse fixtures');
      console.error('Parse error:', err);
    }
  };

  const parseLineupHtml = async () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(lineupHtml, 'text/html');
      
      // Extract all player rows
      const playerRows = doc.querySelectorAll('.relative.w-full.group');
      
      const homeStarting: any[] = [];
      const homeBench: any[] = [];
      const awayStarting: any[] = [];
      const awayBench: any[] = [];
      
      playerRows.forEach((row) => {
        // Get jersey number (center of row)
        const numberSpan = row.querySelector('.text-\\[\\#FFFFFF\\].h2.font-urcSans, span.text-white.text-\\[16px\\].font-urcSans, span.text-white.text-\\[24px\\].font-urcSans');
        const number = numberSpan ? parseInt(numberSpan.textContent?.trim() || '0') : 0;
        
        if (number === 0) return;
        
        // Get position
        const positionH3 = row.querySelector('h3.uppercase.font-medium');
        const position = positionH3 ? positionH3.textContent?.trim() || '' : '';
        
        // Get home player (left side)
        const homeFirstName = row.querySelector('.text-white.font-medium.h3 div div, .text-white.text-\\[12px\\].font-medium.font-redhat div div');
        const homeLastName = row.querySelector('.text-white.font-bold.font-redhat.h3 div div, .text-white.text-\\[12px\\].font-bold.font-redhat div div');
        
        if (homeFirstName && homeLastName) {
          const firstName = homeFirstName.textContent?.trim() || '';
          const lastName = homeLastName.textContent?.trim() || '';
          const fullName = `${firstName} ${lastName}`;
          
          const playerData = {
            name: fullName,
            number: number,
            position: position
              .replace(/LOOSEHEAD PROP/i, 'Prop')
              .replace(/TIGHTHEAD PROP/i, 'Prop')
              .replace(/HOOKER/i, 'Hooker')
              .replace(/SECOND ROW/i, 'Lock')
              .replace(/FLANKER/i, 'Flanker')
              .replace(/NUMBER EIGHT/i, 'Number 8')
              .replace(/SCRUM HALF/i, 'Scrum-Half')
              .replace(/FLY HALF/i, 'Fly-Half')
              .replace(/LEFT WING/i, 'Wing')
              .replace(/RIGHT WING/i, 'Wing')
              .replace(/INSIDE CENTRE/i, 'Centre')
              .replace(/OUTSIDE CENTRE/i, 'Centre')
              .replace(/FULL BACK/i, 'Fullback')
              .replace(/SUB \d+/i, position)
          };
          
          if (number <= 15) {
            homeStarting.push(playerData);
          } else {
            homeBench.push(playerData);
          }
        }
        
        // Get away player (right side) - they're in the same row
        const awayNames = row.querySelectorAll('.text-white.text-white.font-medium.h3 div div, .text-white.text-white.text-\\[12px\\].font-medium.font-redhat div div');
        const awayLastNames = row.querySelectorAll('.text-white.text-white.font-bold.font-redhat.h3 div div, .text-white.text-white.text-\\[12px\\].font-bold.font-redhat div div');
        
        if (awayNames.length > 1 && awayLastNames.length > 1) {
          const firstName = awayNames[1]?.textContent?.trim() || '';
          const lastName = awayLastNames[1]?.textContent?.trim() || '';
          const fullName = `${firstName} ${lastName}`;
          
          const playerData = {
            name: fullName,
            number: number,
            position: position
              .replace(/LOOSEHEAD PROP/i, 'Prop')
              .replace(/TIGHTHEAD PROP/i, 'Prop')
              .replace(/HOOKER/i, 'Hooker')
              .replace(/SECOND ROW/i, 'Lock')
              .replace(/FLANKER/i, 'Flanker')
              .replace(/NUMBER EIGHT/i, 'Number 8')
              .replace(/SCRUM HALF/i, 'Scrum-Half')
              .replace(/FLY HALF/i, 'Fly-Half')
              .replace(/LEFT WING/i, 'Wing')
              .replace(/RIGHT WING/i, 'Wing')
              .replace(/INSIDE CENTRE/i, 'Centre')
              .replace(/OUTSIDE CENTRE/i, 'Centre')
              .replace(/FULL BACK/i, 'Fullback')
              .replace(/SUB \d+/i, position)
          };
          
          if (number <= 15) {
            awayStarting.push(playerData);
          } else {
            awayBench.push(playerData);
          }
        }
      });
      
          // Get match ID and look up fixture data
          const matchId = prompt('Enter Match ID:') || '';
          
          if (!matchId) {
            throw new Error('Match ID is required');
          }
          
          // Find the fixture by matchId
          const fixture = fixturesData.find(f => f.matchId === matchId);
          
          if (!fixture) {
            throw new Error(`No fixture found for Match ID: ${matchId}. Please add the fixture first!`);
          }
          
          const homeTeam = fixture.home.team;
          const homeTeamId = fixture.home.teamId;
          const awayTeam = fixture.away.team;
          const awayTeamId = fixture.away.teamId;
      
      const lineupData = {
        matchId: matchId,
        home: {
          team: homeTeam,
          teamId: homeTeamId,
          starting: homeStarting,
          bench: homeBench
        },
        away: {
          team: awayTeam,
          teamId: awayTeamId,
          starting: awayStarting,
          bench: awayBench
        }
      };
      
      const formattedJson = JSON.stringify(lineupData, null, 2);
      setParsedLineup(formattedJson);
      
      // Save to Supabase
      const saved = await saveLineup(lineupData);
      
      if (saved) {
        setLineupStatus('success');
        setLineupMessage(`✅ Saved lineup for match ${matchId} to Supabase! ${homeStarting.length + awayStarting.length} players parsed.`);
        
        // Reload fixtures to update hasLineup status
        const updatedFixtures = await getFixtures();
        setFixturesData(updatedFixtures);
      } else {
        setLineupStatus('error');
        setLineupMessage('❌ Failed to save to Supabase. Check console for details.');
      }
      
      // Copy to clipboard
      navigator.clipboard.writeText(formattedJson);
    } catch (err) {
      setLineupStatus('error');
      setLineupMessage(err instanceof Error ? err.message : 'Failed to parse HTML');
      console.error('Parse error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D18] text-[#E6E9F5]">
      {/* Header */}
      <header className="bg-[#121527] border-b border-[#2D6CFF]/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/urc-lineups" 
              className="flex items-center gap-2 text-[#E6E9F5] hover:text-[#2D6CFF] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Back to URC Lineups</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#2D6CFF]" />
              <span className="font-bold text-lg">URC Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Fixtures HTML Parser */}
          <div className="bg-[#121527] rounded-xl p-6 border border-[#2D6CFF]/30">
            <div className="flex items-center gap-3 mb-6">
              <FileJson className="w-6 h-6 text-[#2D6CFF]" />
              <h2 className="text-2xl font-bold">Parse Fixtures HTML</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#E6E9F5]/70 mb-2">
                  Paste Fixtures HTML
                </label>
                <textarea
                  value={fixturesHtml}
                  onChange={(e) => {
                    setFixturesHtml(e.target.value);
                    setFixturesStatus('idle');
                  }}
                  placeholder={`Paste HTML from URC fixtures page...

1. Go to unitedrugby.com/fixtures
2. Right-click > "View Page Source"
3. Find the fixtures section
4. Copy and paste here
5. Click "Parse HTML"`}
                  className="w-full h-96 px-4 py-3 bg-[#0B0D18] border-2 border-[#2D6CFF]/30 rounded-lg text-[#E6E9F5] font-mono text-xs focus:border-[#2D6CFF] focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/50 transition-all"
                />
              </div>

              <Button
                onClick={parseFixturesHtml}
                className="w-full bg-[#2D6CFF] hover:bg-[#2D6CFF]/80 text-white font-semibold"
              >
                <Upload className="w-4 h-4 mr-2" />
                Parse HTML → JSON
              </Button>

              {fixturesStatus !== 'idle' && (
                <div className={`flex items-start gap-2 p-4 rounded-lg ${
                  fixturesStatus === 'success' 
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  {fixturesStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="text-sm">
                    {fixturesMessage}
                    {fixturesStatus === 'success' && parsedFixtures && (
                      <div className="mt-2">
                        <div className="text-xs opacity-70 mb-2">✓ JSON copied to clipboard!</div>
                        <textarea
                          value={parsedFixtures}
                          readOnly
                          className="w-full h-32 px-2 py-1 bg-black/30 rounded text-xs font-mono overflow-auto"
                        />
                        <div className="mt-2 text-xs opacity-70">
                          Paste into: <code className="bg-black/30 px-1 rounded">src/lib/data/urc-fixtures.json</code>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-[#0B0D18] rounded-lg border border-[#2D6CFF]/20">
              <h3 className="text-sm font-semibold mb-2">⚡ Fixtures Parser</h3>
              <ul className="text-xs text-[#E6E9F5]/60 space-y-1">
                <li>• Paste HTML from fixtures page</li>
                <li>• You'll be prompted for match details</li>
                <li>• Generates fixture JSON automatically</li>
                <li>• Copy and save to urc-fixtures.json</li>
              </ul>
            </div>
          </div>

          {/* Lineup HTML Parser */}
          <div className="bg-[#121527] rounded-xl p-6 border border-[#2D6CFF]/30">
            <div className="flex items-center gap-3 mb-6">
              <FileJson className="w-6 h-6 text-[#2D6CFF]" />
              <h2 className="text-2xl font-bold">Parse Lineup HTML</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#E6E9F5]/70 mb-2">
                  Paste Lineup HTML
                </label>
                <textarea
                  value={lineupHtml}
                  onChange={(e) => {
                    setLineupHtml(e.target.value);
                    setLineupStatus('idle');
                  }}
                  placeholder={`Paste HTML from stats.unitedrugby.com lineup page...

1. Go to stats.unitedrugby.com/match-centre/[match]
2. Click "Lineup" tab
3. Right-click > "View Page Source"
4. Find the lineup section (search "tabs-lineup")
5. Copy and paste here
6. Click "Parse HTML"`}
                  className="w-full h-96 px-4 py-3 bg-[#0B0D18] border-2 border-[#2D6CFF]/30 rounded-lg text-[#E6E9F5] font-mono text-xs focus:border-[#2D6CFF] focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/50 transition-all"
                />
              </div>

              <Button
                onClick={parseLineupHtml}
                className="w-full bg-[#2D6CFF] hover:bg-[#2D6CFF]/80 text-white font-semibold"
              >
                <Upload className="w-4 h-4 mr-2" />
                Parse HTML → JSON
              </Button>

              {lineupStatus !== 'idle' && (
                <div className={`flex items-start gap-2 p-4 rounded-lg ${
                  lineupStatus === 'success' 
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  {lineupStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="text-sm">
                    {lineupMessage}
                    {lineupStatus === 'success' && parsedLineup && (
                      <div className="mt-2">
                        <div className="text-xs opacity-70 mb-2">✓ JSON copied to clipboard!</div>
                        <textarea
                          value={parsedLineup}
                          readOnly
                          className="w-full h-32 px-2 py-1 bg-black/30 rounded text-xs font-mono overflow-auto"
                        />
                        <div className="mt-2 text-xs opacity-70">
                          Paste into: <code className="bg-black/30 px-1 rounded">src/lib/data/urc-match-lineups/</code>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

                <div className="mt-6 p-4 bg-[#0B0D18] rounded-lg border border-[#2D6CFF]/20">
                  <h3 className="text-sm font-semibold mb-2">⚡ Lineup Parser</h3>
                  <ul className="text-xs text-[#E6E9F5]/60 space-y-1">
                    <li>• Extracts both home & away teams</li>
                    <li>• Gets all player names & numbers</li>
                    <li>• Only asks for Match ID (auto-fills team info!)</li>
                    <li>• Generates complete lineup JSON!</li>
                  </ul>
                </div>
          </div>

        </div>

        {/* Instructions */}
        <div className="mt-8 bg-[#121527] rounded-xl p-6 border border-[#2D6CFF]/30">
          <h2 className="text-xl font-bold mb-4">📝 How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#E6E9F5]/70">
            <div>
              <h3 className="font-semibold text-[#E6E9F5] mb-2">⚡ Parse Fixtures HTML</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to unitedrugby.com/fixtures</li>
                <li>Right-click → View Page Source</li>
                <li>Copy fixtures section HTML</li>
                <li>Paste in left box → Click "Parse HTML"</li>
                <li>Enter match details when prompted</li>
                <li>Save to <code className="text-[#2D6CFF]">urc-fixtures.json</code></li>
                <li>Commit and push</li>
              </ol>
            </div>
                <div>
                  <h3 className="font-semibold text-[#E6E9F5] mb-2">⚡ Parse Lineup HTML</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Go to stats.unitedrugby.com match page</li>
                    <li>Click "Lineup" tab</li>
                    <li>Right-click → View Page Source</li>
                    <li>Copy lineup HTML (search "tabs-lineup")</li>
                    <li>Paste in right box → Click "Parse HTML"</li>
                    <li>Enter match ID (team info auto-fills!)</li>
                    <li>Save to <code className="text-[#2D6CFF]">.../urc-match-lineups/{'{matchId}'}.json</code></li>
                    <li>Update fixture hasLineup to true</li>
                    <li>Commit and push</li>
                  </ol>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URCAdmin;

