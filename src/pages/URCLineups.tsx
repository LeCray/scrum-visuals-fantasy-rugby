import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Users, Loader2, AlertCircle, Calendar, Upload } from 'lucide-react';
import { getFixtures, getLineup } from '../lib/urcSupabaseService';

// GraphQL Query for squad data
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

// Team ID to Name mapping
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
  const [mode, setMode] = useState<'squads' | 'lineups'>('lineups');
  const [allSquads, setAllSquads] = useState<Squad[]>([]);
  const [availableTeams, setAvailableTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [squadPlayers, setSquadPlayers] = useState<Player[]>([]);
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [selectedFixture, setSelectedFixture] = useState<any>(null);
  const [lineupPlayers, setLineupPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch squad data from GraphQL
  const fetchAllSquads = async () => {
    try {
      const response = await fetch('https://unitedrugby.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: LINEUP_QUERY }),
      });

      const result = await response.json();
      const squads = result.data.playerThemeSettings.squads;
      setAllSquads(squads);

      // Build available teams list
      const teams = squads
        .filter((squad: Squad) => squad.squad && squad.squad.length > 0)
        .map((squad: Squad) => {
          const teamInfo = TEAM_NAMES[squad.currentClub];
          return {
            id: squad.currentClub,
            name: teamInfo ? teamInfo.name : `Team ${squad.currentClub}`,
            playerCount: squad.squad.length,
            region: teamInfo?.region
          };
        })
        .sort((a: any, b: any) => b.playerCount - a.playerCount);

      setAvailableTeams(teams);
      
      // Select first team by default
      if (teams.length > 0) {
        setSelectedTeam(teams[0].id);
        setSquadPlayers(squads.find((s: Squad) => s.currentClub === teams[0].id)?.squad || []);
      }
    } catch (err) {
      console.error('Error fetching squads:', err);
      setError('Unable to load squad data');
    }
  };

  const handleTeamChange = (teamId: string) => {
    setSelectedTeam(teamId);
    const teamSquad = allSquads.find(squad => squad.currentClub === teamId);
    setSquadPlayers(teamSquad?.squad || []);
  };

  // Load fixtures from Supabase
  const loadFixtures = async () => {
    try {
      const data = await getFixtures();
      setFixtures(data);
    } catch (err) {
      console.error('Error loading fixtures:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load lineup for selected fixture
  const loadLineup = async (matchId: string, homeTeamId: string, awayTeamId: string) => {
    setLoading(true);
    setError(null);

    try {
      const lineupData = await getLineup(matchId);

      if (!lineupData) {
        throw new Error(`Lineup not available for this match yet`);
      }
      const homeSquad = allSquads.find(squad => squad.currentClub === homeTeamId);
      const awaySquad = allSquads.find(squad => squad.currentClub === awayTeamId);

      // Enrich HOME team lineup with squad data (photos, stats)
      const enrichedHomeStarters = lineupData.home.starting.map((player: any) => {
        const squadPlayer = homeSquad?.squad.find(p => 
          `${p.playerFirstName} ${p.playerLastName}`.toLowerCase() === player.name.toLowerCase() ||
          p.knownName?.toLowerCase() === player.name.toLowerCase()
        );
        return squadPlayer ? { ...squadPlayer, lineupNumber: player.number, lineupPosition: player.position } : player;
      });

      const enrichedHomeBench = (lineupData.home.bench || []).map((player: any) => {
        const squadPlayer = homeSquad?.squad.find(p => 
          `${p.playerFirstName} ${p.playerLastName}`.toLowerCase() === player.name.toLowerCase() ||
          p.knownName?.toLowerCase() === player.name.toLowerCase()
        );
        return squadPlayer ? { ...squadPlayer, lineupNumber: player.number, lineupPosition: player.position } : player;
      });

      // Enrich AWAY team lineup with squad data (photos, stats)
      const enrichedAwayStarters = lineupData.away.starting.map((player: any) => {
        const squadPlayer = awaySquad?.squad.find(p => 
          `${p.playerFirstName} ${p.playerLastName}`.toLowerCase() === player.name.toLowerCase() ||
          p.knownName?.toLowerCase() === player.name.toLowerCase()
        );
        return squadPlayer ? { ...squadPlayer, lineupNumber: player.number, lineupPosition: player.position } : player;
      });

      const enrichedAwayBench = (lineupData.away.bench || []).map((player: any) => {
        const squadPlayer = awaySquad?.squad.find(p => 
          `${p.playerFirstName} ${p.playerLastName}`.toLowerCase() === player.name.toLowerCase() ||
          p.knownName?.toLowerCase() === player.name.toLowerCase()
        );
        return squadPlayer ? { ...squadPlayer, lineupNumber: player.number, lineupPosition: player.position } : player;
      });

      // Combine both teams
      setLineupPlayers([
        { team: 'home', starting: enrichedHomeStarters, bench: enrichedHomeBench },
        { team: 'away', starting: enrichedAwayStarters, bench: enrichedAwayBench }
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lineup');
      setLineupPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFixtureClick = (fixture: any) => {
    setSelectedFixture(fixture);
    loadLineup(fixture.matchId, fixture.home.teamId, fixture.away.teamId);
  };

  useEffect(() => {
    fetchAllSquads();
    loadFixtures();
  }, []);

  // Extract home and away lineups
  const homeLineup = lineupPlayers.length > 0 && lineupPlayers[0]?.team === 'home' ? lineupPlayers[0] : null;
  const awayLineup = lineupPlayers.length > 0 && lineupPlayers[1]?.team === 'away' ? lineupPlayers[1] : null;

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

            <Link 
              to="/urc-admin" 
              className="flex items-center gap-2 text-[#E6E9F5] hover:text-[#2D6CFF] transition-colors bg-[#0B0D18] px-4 py-2 rounded-lg border border-[#2D6CFF]/30"
            >
              <Upload className="w-4 h-4" />
              <span className="font-semibold">Admin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <section className="py-8 bg-gradient-to-b from-[#121527] to-[#0B0D18]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-black text-[#E6E9F5] mb-2">
              URC Lineups
            </h1>
            <p className="text-[#E6E9F5]/70">
              {mode === 'squads' ? 'Browse team squads' : 'Select a fixture to view match-day lineup'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mode Selector */}
      <section className="py-6 bg-[#0B0D18] border-b border-[#2D6CFF]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setMode('squads')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                mode === 'squads'
                  ? 'bg-[#2D6CFF] text-white'
                  : 'bg-[#121527] text-[#E6E9F5]/70 hover:text-[#E6E9F5]'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Squad Rosters
            </button>
            <button
              onClick={() => setMode('lineups')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                mode === 'lineups'
                  ? 'bg-[#2D6CFF] text-white'
                  : 'bg-[#121527] text-[#E6E9F5]/70 hover:text-[#E6E9F5]'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Match Lineups
            </button>
          </div>
        </div>
      </section>

      {/* Squad Rosters Mode */}
      {mode === 'squads' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-md mx-auto mb-8">
              <label htmlFor="team-select" className="block text-sm font-semibold text-[#E6E9F5]/70 mb-2">
                Select Team
              </label>
              <select
                id="team-select"
                value={selectedTeam}
                onChange={(e) => handleTeamChange(e.target.value)}
                className="w-full px-4 py-3 bg-[#121527] border-2 border-[#2D6CFF]/30 rounded-lg text-[#E6E9F5] font-semibold focus:border-[#2D6CFF] focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/50 transition-all"
              >
                {availableTeams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name} {team.region ? `(${team.region})` : ''} - {team.playerCount} players
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#2D6CFF]" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {squadPlayers.map((player, idx) => (
                  <motion.div
                    key={player.playerId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="bg-[#121527] rounded-lg p-4 flex items-center gap-4 border border-[#2D6CFF]/20"
                  >
                    {player.headshots ? (
                      <img 
                        src={player.headshots} 
                        alt={player.knownName || `${player.playerFirstName} ${player.playerLastName}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#2D6CFF]/20 flex items-center justify-center">
                        <Users className="w-8 h-8 text-[#2D6CFF]" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-bold">
                        {player.knownName || `${player.playerFirstName} ${player.playerLastName}`}
                      </div>
                      <div className="text-sm text-[#E6E9F5]/60">
                        {player.playerPosition} • #{player.heroNumber}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Match Lineups Mode - Fixtures Grid */}
      {mode === 'lineups' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-[#2D6CFF]" />
              <h2 className="text-xl font-bold">Upcoming Fixtures</h2>
            </div>

            {loading && !selectedFixture ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#2D6CFF]" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fixtures.map((fixture) => (
                  <motion.div
                    key={fixture.matchId}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFixtureClick(fixture)}
                    className={`
                      cursor-pointer rounded-xl p-6 border-2 transition-all
                      ${selectedFixture?.matchId === fixture.matchId
                        ? 'bg-[#2D6CFF]/20 border-[#2D6CFF]'
                        : 'bg-[#121527] border-[#2D6CFF]/30 hover:border-[#2D6CFF]/60'
                      }
                      ${!fixture.hasLineup ? 'opacity-50' : ''}
                    `}
                  >
                    <div className="text-xs text-[#E6E9F5]/50 mb-3">
                      {fixture.round} • {fixture.date} • {fixture.time}
                    </div>
                    
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 text-right">
                        <div className="font-bold text-lg">{fixture.home.team}</div>
                        <div className="text-sm text-[#E6E9F5]/60">{fixture.home.abbreviation}</div>
                      </div>
                      
                      <div className="text-2xl font-bold text-[#2D6CFF]">vs</div>
                      
                      <div className="flex-1 text-left">
                        <div className="font-bold text-lg">{fixture.away.team}</div>
                        <div className="text-sm text-[#E6E9F5]/60">{fixture.away.abbreviation}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-center">
                      {fixture.hasLineup ? (
                        <span className="text-green-400">✓ Lineup Available</span>
                      ) : (
                        <span className="text-[#E6E9F5]/40">Lineup not yet available</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lineup Display - Match Lineups Mode Only */}
      {mode === 'lineups' && selectedFixture && (
        <section className="py-8 bg-[#121527]/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-center mb-2">
                {selectedFixture.home.team} vs {selectedFixture.away.team}
              </h2>
              <p className="text-sm text-[#E6E9F5]/60 text-center">
                {selectedFixture.date} • {selectedFixture.time} • {selectedFixture.venue}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#2D6CFF]" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center gap-2 py-12 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            ) : homeLineup && awayLineup ? (
              <div className="space-y-8">
                {/* Starting XV */}
                <div>
                  <h3 className="text-xl font-bold mb-6 text-center text-[#2D6CFF] uppercase tracking-wider">Starting XV</h3>
                  
                  {/* FORWARDS */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-center mb-6 text-[#E6E9F5] uppercase tracking-widest">Forwards</h4>
                    <div className="space-y-3">
                      {homeLineup.starting.slice(0, 8).map((homePlayer: any, idx: number) => {
                        const awayPlayer = awayLineup.starting[idx];
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-4"
                          >
                            {/* Home Player */}
                            <div className="flex-1 flex items-center gap-3 bg-green-900/30 rounded-lg p-3 border border-green-700/50">
                              {homePlayer.headshots ? (
                                <img 
                                  src={homePlayer.headshots} 
                                  alt={homePlayer.knownName || `${homePlayer.playerFirstName} ${homePlayer.playerLastName}`}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-green-700/30 flex items-center justify-center">
                                  <Users className="w-6 h-6 text-green-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm text-white truncate">
                                  {homePlayer.knownName || `${homePlayer.playerFirstName} ${homePlayer.playerLastName}` || homePlayer.name}
                                </div>
                                <div className="text-xs text-green-300/70">{homePlayer.lineupPosition || homePlayer.playerPosition}</div>
                              </div>
                            </div>

                            {/* Position Number */}
                            <div className="flex-shrink-0 w-16 text-center">
                              <div className="text-2xl font-bold text-white">
                                {homePlayer.lineupNumber}
                              </div>
                            </div>

                            {/* Away Player */}
                            <div className="flex-1 flex items-center gap-3 bg-blue-900/30 rounded-lg p-3 border border-blue-700/50 flex-row-reverse">
                              {awayPlayer.headshots ? (
                                <img 
                                  src={awayPlayer.headshots} 
                                  alt={awayPlayer.knownName || `${awayPlayer.playerFirstName} ${awayPlayer.playerLastName}`}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-blue-700/30 flex items-center justify-center">
                                  <Users className="w-6 h-6 text-blue-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0 text-right">
                                <div className="font-bold text-sm text-white truncate">
                                  {awayPlayer.knownName || `${awayPlayer.playerFirstName} ${awayPlayer.playerLastName}` || awayPlayer.name}
                                </div>
                                <div className="text-xs text-blue-300/70">{awayPlayer.lineupPosition || awayPlayer.playerPosition}</div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* BACKS */}
                  <div>
                    <h4 className="text-sm font-bold text-center mb-6 text-[#E6E9F5] uppercase tracking-widest">Backs</h4>
                    <div className="space-y-3">
                      {homeLineup.starting.slice(8, 15).map((homePlayer: any, idx: number) => {
                        const awayPlayer = awayLineup.starting[idx + 8];
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (8 + idx) * 0.05 }}
                            className="flex items-center gap-4"
                          >
                            {/* Home Player */}
                            <div className="flex-1 flex items-center gap-3 bg-green-900/30 rounded-lg p-3 border border-green-700/50">
                              {homePlayer.headshots ? (
                                <img 
                                  src={homePlayer.headshots} 
                                  alt={homePlayer.knownName || `${homePlayer.playerFirstName} ${homePlayer.playerLastName}`}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-green-700/30 flex items-center justify-center">
                                  <Users className="w-6 h-6 text-green-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm text-white truncate">
                                  {homePlayer.knownName || `${homePlayer.playerFirstName} ${homePlayer.playerLastName}` || homePlayer.name}
                                </div>
                                <div className="text-xs text-green-300/70">{homePlayer.lineupPosition || homePlayer.playerPosition}</div>
                              </div>
                            </div>

                            {/* Position Number */}
                            <div className="flex-shrink-0 w-16 text-center">
                              <div className="text-2xl font-bold text-white">
                                {homePlayer.lineupNumber}
                              </div>
                            </div>

                            {/* Away Player */}
                            <div className="flex-1 flex items-center gap-3 bg-blue-900/30 rounded-lg p-3 border border-blue-700/50 flex-row-reverse">
                              {awayPlayer.headshots ? (
                                <img 
                                  src={awayPlayer.headshots} 
                                  alt={awayPlayer.knownName || `${awayPlayer.playerFirstName} ${awayPlayer.playerLastName}`}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-blue-700/30 flex items-center justify-center">
                                  <Users className="w-6 h-6 text-blue-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0 text-right">
                                <div className="font-bold text-sm text-white truncate">
                                  {awayPlayer.knownName || `${awayPlayer.playerFirstName} ${awayPlayer.playerLastName}` || awayPlayer.name}
                                </div>
                                <div className="text-xs text-blue-300/70">{awayPlayer.lineupPosition || awayPlayer.playerPosition}</div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bench */}
                <div>
                  <h3 className="text-xl font-bold mb-6 text-center text-[#2D6CFF] uppercase tracking-wider">Replacements</h3>
                  <div className="space-y-3">
                    {homeLineup.bench.map((homePlayer: any, idx: number) => {
                      const awayPlayer = awayLineup.bench[idx];
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (15 + idx) * 0.05 }}
                          className="flex items-center gap-4"
                        >
                          {/* Home Player */}
                          <div className="flex-1 flex items-center gap-3 bg-green-900/20 rounded-lg p-2 border border-green-700/30">
                            {homePlayer.headshots ? (
                              <img 
                                src={homePlayer.headshots} 
                                alt={homePlayer.knownName || `${homePlayer.playerFirstName} ${homePlayer.playerLastName}`}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-green-700/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-green-400" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-xs text-white truncate">
                                {homePlayer.knownName || `${homePlayer.playerFirstName} ${homePlayer.playerLastName}` || homePlayer.name}
                              </div>
                            </div>
                          </div>

                          {/* Number */}
                          <div className="flex-shrink-0 w-12 text-center">
                            <div className="text-lg font-bold text-white">
                              {homePlayer.lineupNumber}
                            </div>
                          </div>

                          {/* Away Player */}
                          <div className="flex-1 flex items-center gap-3 bg-blue-900/20 rounded-lg p-2 border border-blue-700/30 flex-row-reverse">
                            {awayPlayer.headshots ? (
                              <img 
                                src={awayPlayer.headshots} 
                                alt={awayPlayer.knownName || `${awayPlayer.playerFirstName} ${awayPlayer.playerLastName}`}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-blue-700/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-400" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0 text-right">
                              <div className="font-semibold text-xs text-white truncate">
                                {awayPlayer.knownName || `${awayPlayer.playerFirstName} ${awayPlayer.playerLastName}` || awayPlayer.name}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#E6E9F5]/60">
                Select a fixture above to view lineups
              </div>
            )}
          </div>
        </section>
      )}

      {/* Empty State - Match Lineups Mode Only */}
      {mode === 'lineups' && !selectedFixture && !loading && (
        <div className="py-20 text-center text-[#E6E9F5]/50">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p>Select a fixture above to view the match-day lineup</p>
        </div>
      )}
    </div>
  );
};

export default URCLineups;
