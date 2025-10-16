import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Users, Loader2, AlertCircle, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

// GraphQL Query - Updated for 2025 URC API (no arguments on squad field)
const LINEUP_QUERY = `
  query {
    playerThemeSettings {
      squads {
        currentClub
        squad {
          playerId
          knownName
          playerFirstName
          playerLastName
          playerPosition
          playerAge
          heroNumber
          headshots
          playerHeight
          playerWeight
        }
      }
    }
  }
`;

// Types
interface Player {
  playerId: string;
  playerFirstName: string;
  playerLastName: string;
  playerPosition: string;
  playerAge: number;
  knownName: string;
  heroNumber: string;
  headshots: string;
  playerHeight: number;
  playerWeight: number;
}

interface Squad {
  currentClub: string;
  squad: Player[];
}

interface LineupData {
  playerThemeSettings: {
    squads: Squad[];
  };
}

// Team info type
type TeamInfo = {
  id: string;
  name: string;
  playerCount: number;
  region?: string;
};

// 🚦 FEATURE FLAG: Match Lineups
// Set to 'true' when ready to enable the Match Lineups feature (uses Netlify Function proxy)
// Set to 'false' to hide the feature and only show Squad Rosters
const ENABLE_MATCH_LINEUPS = true;

// Team ID to Name mapping (identified by player rosters)
const TEAM_NAMES: Record<string, { name: string; region: string }> = {
  '4377': { name: 'Munster', region: 'Ireland' },
  '5092': { name: 'Lions', region: 'South Africa' },
  '1641': { name: 'Edinburgh', region: 'Scotland' },
  '3533': { name: 'Ospreys', region: 'Wales' },
  '4474': { name: 'Zebre Parma', region: 'Italy' },
  '4471': { name: 'Cardiff', region: 'Wales' },
  '2019': { name: 'Benetton', region: 'Italy' },
  '3514': { name: 'Scarlets', region: 'Wales' },
  '3994': { name: 'Sharks', region: 'South Africa' },
  '5356': { name: 'Leinster', region: 'Ireland' },
  '3098': { name: 'Glasgow Warriors', region: 'Scotland' },
  '5057': { name: 'Dragons', region: 'Wales' },
  '5483': { name: 'Connacht', region: 'Ireland' },
  '1527': { name: 'Cheetahs', region: 'South Africa' },
  '5586': { name: 'Bulls', region: 'South Africa' },
  '2129': { name: 'Ulster', region: 'Ireland' },
  '4568': { name: 'Stormers', region: 'South Africa' },
};

const URCLineups: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [availableTeams, setAvailableTeams] = useState<TeamInfo[]>([]);
  const [allSquads, setAllSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchId, setMatchId] = useState<string>('');
  const [matchLineupData, setMatchLineupData] = useState<any>(null);
  const [showMatchInput, setShowMatchInput] = useState(false);

  const fetchAllSquads = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://unitedrugby.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: LINEUP_QUERY,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: { data: LineupData } = await response.json();
      
      if (data.data?.playerThemeSettings?.squads?.length > 0) {
        const squads = data.data.playerThemeSettings.squads;
        setAllSquads(squads);
        
        // Build team list from available squads
        const teams = squads
          .filter(squad => squad.squad && squad.squad.length > 0)
          .map(squad => {
            const teamInfo = TEAM_NAMES[squad.currentClub];
            return {
              id: squad.currentClub,
              name: teamInfo ? teamInfo.name : `Team ${squad.currentClub}`,
              playerCount: squad.squad.length,
              region: teamInfo?.region
            };
          })
          .sort((a, b) => {
            // Sort by name alphabetically
            return a.name.localeCompare(b.name);
          });
        
        setAvailableTeams(teams);
        
        // Select first team by default
        if (teams.length > 0 && !selectedTeam) {
          setSelectedTeam(teams[0].id);
          setPlayers(squads.find(s => s.currentClub === teams[0].id)?.squad || []);
        }
      }
    } catch (err) {
      console.error('Error fetching squads:', err);
      setError('Unable to load squads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamChange = (teamId: string) => {
    setSelectedTeam(teamId);
    const teamSquad = allSquads.find(squad => squad.currentClub === teamId);
    setPlayers(teamSquad?.squad || []);
    setMatchLineupData(null); // Clear match-specific data when switching teams
  };

  const fetchMatchLineup = async (matchIdValue: string) => {
    if (!matchIdValue) return;

    setLoading(true);
    setError(null);

    try {
      // Call Netlify Function to scrape lineup from match page HTML
      const response = await fetch(`/.netlify/functions/urc-lineup-proxy?matchId=${matchIdValue}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Match lineup data:', data);
      
      setMatchLineupData(data);
      
      // Extract players from match lineup
      // The actual structure will depend on what the API returns
      // Common patterns:
      if (data.home?.starting || data.home?.lineup) {
        const homeStarters = data.home.starting || data.home.lineup || [];
        const homeReplacements = data.home.replacements || data.home.bench || [];
        setPlayers([...homeStarters, ...homeReplacements]);
      } else if (data.homeTeam?.players) {
        setPlayers(data.homeTeam.players);
      } else if (data.lineup) {
        setPlayers(data.lineup);
      } else {
        // Show raw data in console for debugging
        console.log('Unknown lineup structure. Full data:', data);
        setError('Lineup data received but format is unexpected. Check browser console for details.');
      }
      
    } catch (err) {
      console.error('Error fetching match lineup:', err);
      setError(`Unable to load match lineup. ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMatchIdSubmit = () => {
    if (matchId.trim()) {
      // Extract match ID from URL if user pastes full URL
      const extractedId = extractMatchIdFromUrl(matchId.trim());
      fetchMatchLineup(extractedId);
    }
  };

  const extractMatchIdFromUrl = (input: string): string => {
    // Check if input is a URL
    if (input.includes('stats.unitedrugby.com')) {
      // Extract match ID from URL like:
      // https://stats.unitedrugby.com/match-centre/.../287880#tabs-lineup
      const match = input.match(/\/(\d+)(?:#|$)/);
      return match ? match[1] : input;
    }
    return input;
  };

  useEffect(() => {
    fetchAllSquads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only fetch once on mount

  const selectedTeamData = availableTeams.find(t => t.id === selectedTeam);

  // Group players by position
  const forwards = players.filter(p => 
    ['Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8'].some(pos => p.playerPosition?.includes(pos))
  );
  const backs = players.filter(p => 
    ['Scrum-Half', 'Fly-Half', 'Centre', 'Wing', 'Fullback'].some(pos => p.playerPosition?.includes(pos))
  );
  const other = players.filter(p => !forwards.includes(p) && !backs.includes(p));

  return (
    <div className="min-h-screen bg-[#0B0D18] text-[#E6E9F5]">
      {/* Header */}
      <header className="bg-[#121527] border-b border-[#2D6CFF]/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-[#E6E9F5] hover:text-[#2D6CFF] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Back to SCRUMMY</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#2D6CFF]" />
              <span className="font-bold text-lg">URC Lineups</span>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#121527] to-[#0B0D18]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-black text-[#E6E9F5] mb-4">
              United Rugby Championship Lineups
            </h1>
            <p className="text-[#E6E9F5]/70 text-lg">
              Live squad data from the official URC API
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mode Selector */}
      {ENABLE_MATCH_LINEUPS && (
        <section className="py-6 bg-[#0B0D18] border-b border-[#2D6CFF]/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowMatchInput(false);
                  setMatchLineupData(null);
                }}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  !showMatchInput
                    ? 'bg-[#2D6CFF] text-white'
                    : 'bg-[#121527] text-[#E6E9F5]/70 hover:text-[#E6E9F5]'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Squad Rosters
              </button>
              <button
                onClick={() => setShowMatchInput(true)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  showMatchInput
                    ? 'bg-[#2D6CFF] text-white'
                    : 'bg-[#121527] text-[#E6E9F5]/70 hover:text-[#E6E9F5]'
                }`}
              >
                <Search className="w-4 h-4 inline mr-2" />
                Match Lineups
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Team Selector or Match ID Input */}
      <section className="py-8 bg-[#0B0D18]">
        <div className="max-w-7xl mx-auto px-4">
          {(!ENABLE_MATCH_LINEUPS || !showMatchInput) ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <label htmlFor="team-select" className="block text-sm font-semibold text-[#E6E9F5]/70 mb-2">
                Select Team
              </label>
              <select
                id="team-select"
                value={selectedTeam}
                onChange={(e) => handleTeamChange(e.target.value)}
                className="w-full px-4 py-3 bg-[#121527] border-2 border-[#2D6CFF]/30 rounded-lg text-[#E6E9F5] font-semibold focus:border-[#2D6CFF] focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/50 transition-all"
                disabled={loading || availableTeams.length === 0}
              >
                {availableTeams.length === 0 ? (
                  <option>Loading teams...</option>
                ) : (
                  availableTeams.map(team => (
                    <option key={team.id} value={team.id}>
                      {team.name} {team.region ? `(${team.region})` : ''} - {team.playerCount} players
                    </option>
                  ))
                )}
              </select>
            </motion.div>
          ) : ENABLE_MATCH_LINEUPS ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <label htmlFor="match-id" className="block text-sm font-semibold text-[#E6E9F5]/70 mb-2">
                Enter Match ID
              </label>
              <div className="flex gap-3">
                <Input
                  id="match-id"
                  type="text"
                  value={matchId}
                  onChange={(e) => setMatchId(e.target.value)}
                  placeholder="287880 or paste full URL"
                  className="flex-1 bg-[#121527] border-2 border-[#2D6CFF]/30 text-[#E6E9F5] placeholder:text-[#E6E9F5]/40"
                  onKeyDown={(e) => e.key === 'Enter' && handleMatchIdSubmit()}
                />
                <Button
                  onClick={handleMatchIdSubmit}
                  className="bg-[#2D6CFF] hover:bg-[#2D6CFF]/80 text-white font-semibold px-6"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Load Lineup
                </Button>
              </div>
              <div className="text-[#E6E9F5]/50 text-xs mt-3 space-y-2">
                <p>
                  💡 <strong className="text-[#E6E9F5]/70">Option 1:</strong> Copy match ID from URL. Example:{' '}
                  <code className="bg-[#121527] px-1 rounded text-[#2D6CFF]">287880</code> from{' '}
                  <code className="bg-[#121527] px-1 rounded">...bulls.../287880#tabs-lineup</code>
                </p>
                <p>
                  💡 <strong className="text-[#E6E9F5]/70">Option 2:</strong> Paste the full match URL - we'll extract the ID automatically
                </p>
                <p className="text-green-400/70 text-xs">
                  ✅ No authentication required - lineups load automatically
                </p>
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* Content */}
      <section className="py-8 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <Loader2 className="w-12 h-12 text-[#2D6CFF] animate-spin mb-4" />
                <p className="text-[#E6E9F5]/70 text-lg">Fetching latest lineups…</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md text-center">
                  <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <p className="text-red-400 font-semibold mb-2">Unable to load squads</p>
                  <p className="text-[#E6E9F5]/60 text-sm">{error}</p>
                  <button
                    onClick={() => fetchAllSquads()}
                    className="mt-4 px-4 py-2 bg-[#2D6CFF] text-white rounded-lg hover:bg-[#2D6CFF]/80 transition-colors font-semibold"
                  >
                    Retry
                  </button>
                </div>
              </motion.div>
            ) : players.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <Users className="w-16 h-16 text-[#E6E9F5]/30 mx-auto mb-4" />
                <p className="text-[#E6E9F5]/70">No lineup data available for this team.</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Team Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-[#2D6CFF] mb-2">
                    {selectedTeamData?.name || 'Team Squad'}
                  </h2>
                  {selectedTeamData?.region && (
                    <p className="text-[#E6E9F5]/60">{selectedTeamData.region}</p>
                  )}
                  <p className="text-[#E6E9F5]/50 text-sm mt-2">
                    {players.length} player{players.length !== 1 ? 's' : ''} in squad
                  </p>
                </div>

                {/* Forwards */}
                {forwards.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[#2D6CFF] mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#2D6CFF] rounded"></span>
                      Forwards
                    </h3>
                    <div className="grid gap-3">
                      {forwards.map((player, index) => (
                        <PlayerCard key={player.playerId} player={player} index={index} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Backs */}
                {backs.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[#2D6CFF] mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#2D6CFF] rounded"></span>
                      Backs
                    </h3>
                    <div className="grid gap-3">
                      {backs.map((player, index) => (
                        <PlayerCard key={player.playerId} player={player} index={index} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Other */}
                {other.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[#2D6CFF] mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#2D6CFF] rounded"></span>
                      Squad
                    </h3>
                    <div className="grid gap-3">
                      {other.map((player, index) => (
                        <PlayerCard key={player.playerId} player={player} index={index} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="border-t border-[#2D6CFF]/20 py-6 bg-[#121527]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-[#E6E9F5]/50 text-sm">
            Data provided directly from the official United Rugby Championship API (unitedrugby.com/graphql). 
            Displayed for informational use only.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Player Card Component
const PlayerCard: React.FC<{ player: Player; index: number }> = ({ player, index }) => {
  const displayName = player.knownName || `${player.playerFirstName} ${player.playerLastName}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className="bg-[#121527] border border-[#2D6CFF]/30 rounded-lg p-4 hover:border-[#2D6CFF] transition-all hover:shadow-lg hover:shadow-[#2D6CFF]/20"
    >
      <div className="flex items-center gap-4">
        {/* Player Image */}
        <div className="flex-shrink-0">
          {player.headshots ? (
            <img
              src={player.headshots}
              alt={displayName}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#2D6CFF]/50"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#2D6CFF]/20 flex items-center justify-center border-2 border-[#2D6CFF]/50">
              <Users className="w-8 h-8 text-[#2D6CFF]" />
            </div>
          )}
        </div>

        {/* Player Info - Left Side */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            {player.heroNumber && (
              <span className="text-2xl font-black text-[#2D6CFF]">
                #{player.heroNumber}
              </span>
            )}
            <h4 className="text-lg font-bold text-[#E6E9F5] truncate">
              {displayName}
            </h4>
          </div>
          <p className="text-[#E6E9F5]/70 font-semibold">
            {player.playerPosition || 'Position N/A'}
          </p>
        </div>

        {/* Player Stats - Right Side */}
        <div className="text-right flex-shrink-0">
          <div className="flex flex-col gap-1">
            {player.playerAge && (
              <p className="text-sm text-[#E6E9F5]/60">
                Age: <span className="font-semibold text-[#E6E9F5]">{player.playerAge}</span>
              </p>
            )}
            {player.playerHeight && (
              <p className="text-sm text-[#E6E9F5]/60">
                {player.playerHeight}cm
              </p>
            )}
            {player.playerWeight && (
              <p className="text-sm text-[#E6E9F5]/60">
                {player.playerWeight}kg
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default URCLineups;

