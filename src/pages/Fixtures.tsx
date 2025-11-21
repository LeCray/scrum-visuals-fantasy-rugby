import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown, RotateCcw, Calendar, ChevronRight as ChevronRightIcon } from "lucide-react";
import { generateMatchId, getFinalScore } from "@/lib/boxScoreData";
import { loadAllFixtures } from "@/lib/fixturesDataService";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

/* ---------------- THEME TOKENS (FROM HOMEPAGE) ---------------- */
const tokens = {
  bg: "#0B0D18",
  surface: "#121527",
  surface2: "#0E1222",
  text: "#E6E9F5",
  textMuted: "#A9B1C6",
  primary: "#2D6CFF",
  primary2: "#7A5CFF",
  gold: "#F9C94E",
};

const appGradient = "bg-[radial-gradient(1200px_600px_at_80%_-20%,rgba(45,108,255,.25),rgba(122,92,255,.12)_40%,transparent_70%),linear-gradient(180deg,#0B0D18_0%,#0B0D18_30%,#0E1222_100%)]";

// Types
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

const isHighlightedFixture = (date: string, time: string, teamA: string, teamB: string) => {
  const highlightedGames = [
    { date: "Week 1", time: "14:00", teamA: "HELLENIC", teamB: "WATERSHED" },
    { date: "Week 1", time: "15:15", teamA: "LOMAGUNDI", teamB: "FALCON" },
    { date: "Week 4", time: "14:00", teamA: "FALCON", teamB: "ST GEORGE'S" },
    { date: "Week 5", time: "15:00", teamA: "ST JOHNS", teamB: "FALCON" },
  ];
  return highlightedGames.some(game => 
    game.date === date && game.time === time && game.teamA === teamA && game.teamB === teamB
  );
};

/* ---------------- PRIMITIVES (FROM HOMEPAGE) ---------------- */
const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Fixtures: React.FC = () => {
  const navigate = useNavigate();
  
  // Data state
  const [loading, setLoading] = useState(true);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [teamLogos, setTeamLogos] = useState<Record<string, string>>({});
  const [fixturesData, setFixturesData] = useState<Record<string, FixtureDay[]>>({});

  // Filter state
  const [selectedCompetition, setSelectedCompetition] = useState("sbr2025");
  const [selectedSeason, setSelectedSeason] = useState("2025");
  const [teamSearch, setTeamSearch] = useState("");
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  
  // Dropdown state
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);
  const [showWeekDropdown, setShowWeekDropdown] = useState(false);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadAllFixtures();
        setCompetitions(data.competitions);
        setTeamLogos(data.teamLogos);
        setFixturesData({
          derby_day: data.derbyDay,
          zim: data.zimSables,
          sa_schools: data.saSchools,
          sbr2025: data.sbr2025
        });
      } catch (error) {
        console.error('Error loading fixtures:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.relative')) {
        setShowCompetitionDropdown(false);
        setShowWeekDropdown(false);
      }
    };

    if (showCompetitionDropdown || showWeekDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showCompetitionDropdown, showWeekDropdown]);

  const getCurrentFixtures = (): FixtureDay[] => {
    const fixtures = fixturesData[selectedCompetition] || [];
    if (teamSearch.trim()) {
      const searchTerm = teamSearch.toUpperCase();
      return fixtures.map(day => ({
        ...day,
        fixtures: day.fixtures.filter(f => 
          f.teamA.includes(searchTerm) || f.teamB.includes(searchTerm)
        )
      })).filter(day => day.fixtures.length > 0);
    }
    return fixtures;
  };

  const allFixtures = getCurrentFixtures();
  const currentCompetition = competitions.find(c => c.id === selectedCompetition);

  const handlePrevWeek = () => {
    if (currentWeekIndex > 0) setCurrentWeekIndex(currentWeekIndex - 1);
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < allFixtures.length - 1) setCurrentWeekIndex(currentWeekIndex + 1);
  };

  const handleReset = () => {
    setTeamSearch("");
    setCurrentWeekIndex(0);
    setSelectedCompetition("sbr2025");
    setShowCompetitionDropdown(false);
    setShowWeekDropdown(false);
  };

  const handleCompetitionChange = (competitionId: string) => {
    setSelectedCompetition(competitionId);
    setCurrentWeekIndex(0);
    setShowCompetitionDropdown(false);
  };

  const handleWeekChange = (weekIndex: number) => {
    setCurrentWeekIndex(weekIndex);
    setShowWeekDropdown(false);
  };

  const handleFixtureClick = (date: string, time: string, teamA: string, teamB: string) => {
    if (isHighlightedFixture(date, time, teamA, teamB)) {
      const matchId = generateMatchId(date, time, teamA, teamB);
      navigate(`/box-score/${matchId}`);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${appGradient}`} style={{ color: tokens.text }}>
        <Nav />
        <Container>
          <div className="flex items-center justify-center py-32">
            <div className="text-2xl font-bold">Loading...</div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${appGradient}`} style={{ color: tokens.text }}>
      <Nav />

      {/* HERO SECTION */}
      <section className="relative text-white pt-20 pb-20 md:pt-28 md:pb-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2D6CFF] to-[#7A5CFF] flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Schools Rugby{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9C94E] to-[#E3B43F]">
                Fixtures & Results
              </span>
            </h1>
            <p className="mt-4 md:mt-6 text-white/70 max-w-2xl mx-auto">
              Complete coverage of school boy rugby across Zimbabwe and South Africa – fixtures, predictions & live results.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* FIXTURES SECTION */}
      <section className="py-14 md:py-20">
        <Container>
          {/* Filters - Minimal */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            {/* Competition Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowCompetitionDropdown(!showCompetitionDropdown);
                  setShowWeekDropdown(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 font-medium transition-all hover:bg-white/10 text-sm"
              >
                <span>{currentCompetition?.display_name || 'Competition'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showCompetitionDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-[#121527] border border-white/10 shadow-xl z-50 overflow-hidden">
                  {competitions.map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => handleCompetitionChange(comp.id)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        selectedCompetition === comp.id 
                          ? 'bg-white/10 text-white font-semibold' 
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {comp.display_name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Week Dropdown */}
            {allFixtures.length > 0 && (
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowWeekDropdown(!showWeekDropdown);
                    setShowCompetitionDropdown(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 font-medium transition-all hover:bg-white/10 text-sm"
                >
                  <span>{allFixtures[currentWeekIndex]?.date || 'Week'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showWeekDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-[#121527] border border-white/10 shadow-xl z-50 max-h-80 overflow-y-auto">
                    {allFixtures.map((week, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleWeekChange(idx)}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                          currentWeekIndex === idx 
                            ? 'bg-white/10 text-white font-semibold' 
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {week.date}
                        <span className="text-xs text-white/50 ml-2">({week.fixtures.length} fixtures)</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleReset}
              disabled={selectedCompetition === "sbr2025" && currentWeekIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 font-medium transition-all hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          {/* Week Navigation */}
          {allFixtures[currentWeekIndex] && (
            <div className="mb-10 flex items-center justify-between text-white">
              <button
                onClick={handlePrevWeek}
                disabled={currentWeekIndex === 0}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold">{allFixtures[currentWeekIndex].date}</h2>
                <p className="text-white/70 mt-1 text-sm">{allFixtures[currentWeekIndex].day}</p>
              </div>

              <button
                onClick={handleNextWeek}
                disabled={currentWeekIndex === allFixtures.length - 1}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Fixtures - Clean List */}
          {!allFixtures[currentWeekIndex] || allFixtures[currentWeekIndex].fixtures.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">No Fixtures Found</h3>
              <p className="text-sm text-white/70">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
              {allFixtures[currentWeekIndex].fixtures.map((fixture, idx) => {
                const isHighlighted = isHighlightedFixture(
                  allFixtures[currentWeekIndex].date,
                  fixture.time,
                  fixture.teamA,
                  fixture.teamB
                );
                const isCancelled = fixture.status === 'cancelled';
                const finalScore = getFinalScore(
                  allFixtures[currentWeekIndex].date,
                  fixture.time,
                  fixture.teamA,
                  fixture.teamB
                );
                const isClickable = isHighlighted && !isCancelled;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    onClick={() => isClickable && handleFixtureClick(
                      allFixtures[currentWeekIndex].date,
                      fixture.time,
                      fixture.teamA,
                      fixture.teamB
                    )}
                    className={`group relative py-4 px-4 transition-all ${
                      isClickable ? 'cursor-pointer hover:bg-white/5' : ''
                    }`}
                    style={{
                      borderLeftWidth: isHighlighted ? '3px' : '0px',
                      borderLeftColor: isHighlighted ? tokens.gold : 'transparent',
                      paddingLeft: isHighlighted ? '16px' : '16px'
                    }}
                  >
                    <div className="flex items-center justify-center gap-4">
                      {/* Team A - Right Aligned */}
                      <div className="flex-1 text-right">
                        <span className="font-semibold text-sm">
                          {fixture.teamA}
                        </span>
                      </div>

                      {/* Team A Logo */}
                      <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                        {teamLogos[fixture.teamA] && (
                          <img 
                            src={teamLogos[fixture.teamA]} 
                            alt={fixture.teamA}
                            className="max-w-full max-h-full object-contain"
                            style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.4))' }}
                          />
                        )}
                      </div>

                      {/* Score/Time - Center */}
                      <div className="flex-shrink-0 text-center min-w-[80px]">
                        {isCancelled ? (
                          <span className="text-red-400 text-xs font-bold">CANCELLED</span>
                        ) : finalScore ? (
                          <div className="font-bold text-base">
                            {finalScore.teamAScore} - {finalScore.teamBScore}
                          </div>
                        ) : (
                          <div className="text-sm font-medium text-white/70">{fixture.time}</div>
                        )}
                      </div>

                      {/* Team B Logo */}
                      <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                        {teamLogos[fixture.teamB] && (
                          <img 
                            src={teamLogos[fixture.teamB]} 
                            alt={fixture.teamB}
                            className="max-w-full max-h-full object-contain"
                            style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.4))' }}
                          />
                        )}
                      </div>

                      {/* Team B - Left Aligned */}
                      <div className="flex-1 text-left">
                        <span className="font-semibold text-sm">
                          {fixture.teamB}
                        </span>
                      </div>
                    </div>

                    {/* Stats Badge */}
                    {isHighlighted && !isCancelled && (
                      <div className="absolute top-2 right-2">
                        <div 
                          className="px-2 py-0.5 rounded text-xs font-bold"
                          style={{ background: tokens.gold, color: '#000' }}
                        >
                          STATS
                        </div>
                      </div>
                    )}

                    {/* Arrow for clickable */}
                    {isClickable && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <ChevronRightIcon className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                      </div>
                    )}

                    {/* Bottom border - inset from edges */}
                    {idx < allFixtures[currentWeekIndex].fixtures.length - 1 && (
                      <div className="absolute bottom-0 left-1/4 right-1/4 border-b border-white/10"></div>
                    )}
                  </motion.div>
                );
              })}

              {/* Footer Note */}
              {allFixtures[currentWeekIndex]?.fixtures.some(f => 
                isHighlightedFixture(allFixtures[currentWeekIndex].date, f.time, f.teamA, f.teamB)
              ) && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: tokens.gold }}></div>
                    <p className="text-sm text-white/70">
                      Games with a <span style={{ color: tokens.gold }} className="font-semibold">yellow border</span> have detailed stats
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Fixtures;
