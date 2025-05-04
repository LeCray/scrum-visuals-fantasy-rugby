import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { generateMatchId, getBoxScore, getFinalScore } from "@/lib/boxScoreData";

// Define types for our fixtures data
type Fixture = {
  time: string;
  teamA: string;
  teamB: string;
  status?: 'cancelled';
};

type FixtureDay = {
  date: string;
  day: string;
  fixtures: Fixture[];
};

// Map to track cancelled games
const cancelledGames = [
  { date: "April 29th", time: "9:00", teamA: "CHURCHILL 2XV", teamB: "LOMAGUNDI 2XV" }
];

const isCancelledGame = (date: string, time: string, teamA: string, teamB: string) => {
  return cancelledGames.some(game => 
    game.date === date && 
    game.time === time && 
    game.teamA === teamA && 
    game.teamB === teamB
  );
};

// Fixture data
const fixturesData: FixtureDay[] = [
  {
    date: "TODAY",
    day: "FEATURED MATCHES",
    fixtures: [
      { time: "11:30", teamA: "ZIMBABWE U20", teamB: "SHARKS ACADEMY" },
      { time: "14:30", teamA: "ZIMBABWE SABLES", teamB: "ZAMBIA" }
    ]
  },
  {
    date: "April 28th",
    day: "Monday",
    fixtures: [
      { time: "9:00",  teamA: "EAGLESVALE 2XV",  teamB: "WATERSHED 2XV" },
      { time: "10:20", teamA: "GOLDRIDGE 1XV",   teamB: "GATEWAY 1XV" },
      { time: "11:40", teamA: "WATERSHED 1XV",  teamB: "MIDLANDS CC 1XV" },
      { time: "13:00", teamA: "MILTON 1XV",     teamB: "WISE OWL 1XV" },
      { time: "14:20", teamA: "HILLCREST 1XV",  teamB: "EAGLESVALE 1XV" },
      { time: "15:40", teamA: "RYDINGS 1XV",    teamB: "HERITAGE 1XV" }
    ]
  },
  {
    date: "April 29th",
    day: "Tuesday",
    fixtures: [
      { time: "9:00",  teamA: "CHURCHILL 2XV", teamB: "LOMAGUNDI 2XV" },
      { time: "10:20", teamA: "FALCON 2XV",    teamB: "ST ALBANS 2XV" },
      { time: "11:40", teamA: "PETERHOUSE 2XV",teamB: "ST GEORGE'S 2XV" },
      { time: "13:00", teamA: "ST JOHN'S 2XV", teamB: "PRINCE EDWARD'S 2XV" },
      { time: "14:20", teamA: "LOMAGUNDI 1XV", teamB: "ST ALBANS 1XV" },
      { time: "15:40", teamA: "ST GEORGE'S 1XV",teamB: "ST ANDREW'S 1XV" }
    ]
  },
  {
    date: "April 30th",
    day: "Wednesday",
    fixtures: [
      { time: "10:20", teamA: "WATERSHED 2XV", teamB: "CBC 2XV" },
      { time: "11:40", teamA: "RYDINGS 1XV",   teamB: "MIDLANDS CC 1XV" },
      { time: "13:00", teamA: "GOLDRIDGE 1XV", teamB: "HILLCREST 1XV" },
      { time: "14:20", teamA: "EAGLESVALE 1XV",teamB: "HERITAGE 1XV" },
      { time: "15:40", teamA: "WATERSHED 1XV", teamB: "GATEWAY 1XV" }
    ]
  },
  {
    date: "May 1st",
    day: "Thursday",
    fixtures: [
      { time: "8:00",  teamA: "ST GEORGE'S 2XV",  teamB: "ST ALBANS 2XV" },
      { time: "9:20",  teamA: "ST GEORGE'S 1XV",  teamB: "PRINCE EDWARD 1XV" },
      { time: "10:40", teamA: "CBC 1XV",          teamB: "FALCON 1XV" },
      { time: "12:00", teamA: "LOMAGUNDI 1XV",   teamB: "CHURCHILL 1XV" },
      { time: "13:20", teamA: "PETERHOUSE 1XV", teamB: "ST ANDREW'S 1XV" },
      { time: "14:40", teamA: "ST JOHN'S 1XV",   teamB: "ST ALBANS 1XV" },
      { time: "16:00", teamA: "ZAM STEELERS",    teamB: "SHARKS ACADEMY" }
    ]
  },
  {
    date: "May 2nd",
    day: "Friday",
    fixtures: [
      { time: "9:00",  teamA: "MILTON 2XV",      teamB: "WISE OWL 2XV" },
      { time: "10:20", teamA: "EAGLESVALE 2XV", teamB: "CBC 2XV" },
      { time: "11:40", teamA: "MILTON 1XV",     teamB: "LOMAGUNDI 2XV" },
      { time: "13:00", teamA: "PRINCE EDWARD 2XV", teamB: "LORD BRIGHTON 2XV" },
      { time: "14:20", teamA: "RYDINGS 1XV",    teamB: "WISE OWL 1XV" },
      { time: "15:40", teamA: "PETERHOUSE 2XV",teamB: "FALCON 2XV" }
    ]
  },
  {
    date: "May 3rd",
    day: "Saturday",
    fixtures: [
      { time: "9:00",  teamA: "ST JOHN'S 2XV",  teamB: "ST ALBANS 2XV" },
      { time: "10:20", teamA: "CBC 1XV",       teamB: "PETERHOUSE 1XV" },
      { time: "11:40", teamA: "PRINCE EDWARD 1XV", teamB: "CHURCHILL 1XV" },
      { time: "13:00", teamA: "LOMAGUNDI 1XV",teamB: "ST GEORGE'S 1XV" },
      { time: "14:20", teamA: "FALCON 1XV",    teamB: "ST ALBANS 1XV" },
      { time: "15:40", teamA: "ST JOHN'S 1XV", teamB: "ST ANDREW'S 1XV" }
    ]
  }
];

// Map team names to logo paths
const teamLogoMap: Record<string, string> = {
  "ZIMBABWE U20": "/assets/ZimbabweU20.png",
  "SHARKS ACADEMY": "/assets/SharksAcademy.png",
  "ZIMBABWE SABLES": "/assets/ZimSables.png",
  "ZAMBIA": "/assets/Zambia.png",
  "EAGLESVALE 2XV": "/assets/Eaglesvale.png",
  "WATERSHED 2XV": "/assets/Watershed.png",
  "GOLDRIDGE 1XV": "/assets/Goldridge.png",
  "GATEWAY 1XV": "/assets/Gateway.png",
  "WATERSHED 1XV": "/assets/Watershed.png",
  "MIDLANDS CC 1XV": "/assets/MidlandsCC.png",
  "MILTON 1XV": "/assets/Milton.png",
  "WISE OWL 1XV": "/assets/WiseOwl.png",
  "HILLCREST 1XV": "/assets/Hillcrest.png",
  "EAGLESVALE 1XV": "/assets/Eaglesvale.png",
  "RYDINGS 1XV": "/assets/Rydings.png",
  "HERITAGE 1XV": "/assets/Heritage.png",
  "CHURCHILL 2XV": "/assets/Churchill.png",
  "LOMAGUNDI 2XV": "/assets/Lomagundi.png",
  "FALCON 2XV": "/assets/Falcon.png",
  "ST ALBANS 2XV": "/assets/StAlbans.png",
  "PETERHOUSE 2XV": "/assets/Peterhouse.png",
  "ST GEORGE'S 2XV": "/assets/StGeorges.png",
  "ST JOHN'S 2XV": "/assets/StJohns.png",
  "PRINCE EDWARD'S 2XV": "/assets/PrinceEdward.png",
  "LOMAGUNDI 1XV": "/assets/Lomagundi.png",
  "ST ALBANS 1XV": "/assets/StAlbans.png",
  "ST GEORGE'S 1XV": "/assets/StGeorges.png",
  "ST ANDREW'S 1XV": "/assets/StAndrews.png",
  "CBC 2XV": "/assets/CBC.png",
  "PRINCE EDWARD 1XV": "/assets/PrinceEdward.png",
  "CBC 1XV": "/assets/CBC.png",
  "FALCON 1XV": "/assets/Falcon.png",
  "CHURCHILL 1XV": "/assets/Churchill.png",
  "ST JOHN'S 1XV": "/assets/StJohns.png",
  "ZAM STEELERS": "/assets/ZamSteelers.png",
  "PETERHOUSE 1XV": "/assets/Peterhouse.png",
  "MILTON 2XV": "/assets/Milton.png",
  "WISE OWL 2XV": "/assets/WiseOwl.png",
  "PRINCE EDWARD 2XV": "/assets/PrinceEdward.png",
  "LORD BRIGHTON 2XV": "/assets/LordBrighton.png"
};

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

// Add function to check if a fixture is highlighted
const isHighlightedFixture = (date: string, time: string, teamA: string, teamB: string) => {
  const highlightedGames = [
    { date: "TODAY", time: "11:30", teamA: "ZIMBABWE U20", teamB: "SHARKS ACADEMY" },
    { date: "TODAY", time: "14:30", teamA: "ZIMBABWE SABLES", teamB: "ZAMBIA" },
    { date: "April 28th", time: "13:00", teamA: "MILTON 1XV", teamB: "WISE OWL 1XV" },
    { date: "April 28th", time: "15:40", teamA: "RYDINGS 1XV", teamB: "HERITAGE 1XV" },
    { date: "April 29th", time: "14:20", teamA: "LOMAGUNDI 1XV", teamB: "ST ALBANS 1XV" },
    { date: "April 29th", time: "15:40", teamA: "ST GEORGE'S 1XV", teamB: "ST ANDREW'S 1XV" },
    { date: "April 30th", time: "13:00", teamA: "GOLDRIDGE 1XV", teamB: "HILLCREST 1XV" },
    { date: "April 30th", time: "15:40", teamA: "WATERSHED 1XV", teamB: "GATEWAY 1XV" },
    { date: "May 1st", time: "13:20", teamA: "PETERHOUSE 1XV", teamB: "ST ANDREW'S 1XV" },
    { date: "May 1st", time: "16:00", teamA: "ZAM STEELERS", teamB: "SHARKS ACADEMY" },
    { date: "May 3rd", time: "10:20", teamA: "CBC 1XV", teamB: "PETERHOUSE 1XV" },
    { date: "May 3rd", time: "11:40", teamA: "PRINCE EDWARD 1XV", teamB: "CHURCHILL 1XV" },
    { date: "May 3rd", time: "14:20", teamA: "FALCON 1XV", teamB: "ST ALBANS 1XV" },
    { date: "May 3rd", time: "15:40", teamA: "ST JOHN'S 1XV", teamB: "ST ANDREW'S 1XV" }
  ];

  return highlightedGames.some(game => 
    game.date === date && 
    game.time === time && 
    game.teamA === teamA && 
    game.teamB === teamB
  );
};

// Helper to parse conversions and penalty kicks from summary string
function parseConversions(conversionStr: string) {
  // e.g. "1/1 PK" or "1/1" or "1/1 C, 2/2 PK" or "-"
  if (!conversionStr || conversionStr === "-") return { conversions: 0, penalties: 0 };
  let conversions = 0;
  let penalties = 0;
  // Split by comma if both are present
  const parts = conversionStr.split(',').map(s => s.trim());
  for (const part of parts) {
    if (part.includes('PK')) {
      const match = part.match(/(\d+)\/(\d+) PK/);
      if (match) {
        penalties += parseInt(match[1], 10);
      }
    } else if (part.includes('C')) {
      const match = part.match(/(\d+)\/(\d+) C/);
      if (match) {
        conversions += parseInt(match[1], 10);
      }
    } else {
      // fallback: if just "1/1" assume conversions
      const match = part.match(/(\d+)\/(\d+)/);
      if (match) {
        conversions += parseInt(match[1], 10);
      }
    }
  }
  return { conversions, penalties };
}

const Fixtures: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleFixtureClick = (date: string, time: string, teamA: string, teamB: string) => {
    if (isHighlightedFixture(date, time, teamA, teamB)) {
      const matchId = generateMatchId(date, time, teamA, teamB);
      navigate(`/box-score/${matchId}`);
    }
  };

  return (
    <div className="relative text-scrummy-navyBlue">
      <div className="relative z-20">
        {/* Logo background overlay */}
        <div
          className="absolute inset-x-0 top-[120px] md:top-[180px] h-[500px] pointer-events-none"
          style={{
            backgroundImage: "url('/assets/logo.png')",
            backgroundSize: "contain",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat"
          }}
        />

        {/* HEADER */}
        <header className="relative py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <Link to="/" className="text-scrummy-navyBlue hover:text-scrummy-goldYellow flex items-center gap-1">
              <ChevronLeft size={20} /> <span>Back to Home</span>
            </Link>
            <motion.h1
              className="mt-8 text-4xl md:text-7xl font-bold text-center mb-16 md:mb-24 font-orbitron relative z-10"
              initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
            >
              <span className="text-scrummy-navyBlue">Derby Day 2025</span>
              <span className="block text-scrummy-goldYellow">Rugby Fixtures</span>
            </motion.h1>
          </div>
        </header>

        {/* MAIN content */}
        <main className="relative z-10 px-4 md:px-8 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto space-y-4 mt-24">
            {/* Legend for highlighted games */}
            <div className="flex flex-col items-center gap-1 text-scrummy-navyBlue">
              <div className="flex items-center gap-3">
                <img src="/assets/logo.png" alt="SCRUMMY" className="w-12 h-12" />
                <p className="text-base md:text-lg font-orbitron">Below is a schedule of all the Derby Day fixtures. Games marked with a<span className="text-scrummy-goldYellow"> yellow border</span> and SCRUMMY logo are ones that will have detailed player and game stats.</p>
              </div>
              <p className="text-sm text-scrummy-navyBlue/70">All times are in CAT (Central Africa Time)</p>
            </div>

            <div className="mt-16 space-y-8">
              {fixturesData.map((day, idx) => (
                <div key={idx} className={`bg-white/60 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md ${day.day === "FEATURED MATCHES" ? "col-span-full" : ""}`}>
                  {day.day === "FEATURED MATCHES" ? (
                    <>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 font-orbitron border-b border-scrummy-goldYellow pb-4 flex flex-col md:flex-row md:items-end">
                        <span className="text-scrummy-navyBlue">{day.date}</span>
                        <span className="text-scrummy-goldYellow text-2xl md:ml-3">{day.day}</span>
                      </h2>
                      <motion.div
                        className="grid grid-cols-1 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {day.fixtures.map((f, i) => (
                          <motion.div key={i} variants={itemVariants} className="w-full">
                            <Card
                              className="transition-all duration-300 hover:shadow-lg h-[280px] w-full relative border-2 border-scrummy-goldYellow hover:shadow-[0_0_20px_rgba(255,199,0,0.4)] cursor-pointer bg-gradient-to-br from-white/90 to-white/70"
                              onClick={() => handleFixtureClick(day.date, f.time, f.teamA, f.teamB)}
                            >
                              <img 
                                src="/assets/logo.png" 
                                alt="SCRUMMY" 
                                className="absolute top-4 right-4 w-12 h-12 opacity-80" 
                              />
                              <CardContent className="p-6 flex flex-col h-full">
                                <div className="text-xl font-bold text-scrummy-navyBlue bg-scrummy-goldYellow inline-flex rounded-lg px-4 py-2 self-start mb-4">
                                  {f.time}
                                </div>
                                <div className="flex items-center justify-center flex-grow gap-8 md:gap-16">
                                  {/* Team A */}
                                  <div className="flex-1 text-center">
                                    {teamLogoMap[f.teamA] && (
                                      <img 
                                        src={teamLogoMap[f.teamA]} 
                                        alt={`${f.teamA} logo`} 
                                        className="w-32 h-32 mx-auto mb-2 object-contain" 
                                      />
                                    )}
                                    <p className="text-xl font-bold text-scrummy-navyBlue">{f.teamA}</p>
                                  </div>
                                  {/* VS */}
                                  <div className="flex-none">
                                    <p className="text-3xl font-bold text-scrummy-goldYellow">VS</p>
                                  </div>
                                  {/* Team B */}
                                  <div className="flex-1 text-center">
                                    {teamLogoMap[f.teamB] && (
                                      <img 
                                        src={teamLogoMap[f.teamB]} 
                                        alt={`${f.teamB} logo`} 
                                        className="w-32 h-32 mx-auto mb-2 object-contain" 
                                      />
                                    )}
                                    <p className="text-xl font-bold text-scrummy-navyBlue">{f.teamB}</p>
                                  </div>
                                </div>
                                {/* Add streaming link for first match */}
                                {day.day === "FEATURED MATCHES" && f.time === "11:30" && (
                                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                    <a 
                                      href="https://www.facebook.com/stories/103595778471519/UzpfSVNDOjkzMTQzOTcyNTY2OTIxNg==/?view_single=1&source=shared_permalink&mibextid=wwXIfr"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-[#0c5bce] transition-colors"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                      </svg>
                                      Watch Live on Facebook
                                    </a>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl md:text-2xl font-semibold mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 flex flex-col md:flex-row md:items-end">
                        <span className="text-scrummy-navyBlue">{day.date}</span>
                        <span className="text-scrummy-goldYellow text-lg md:ml-3">{day.day}</span>
                      </h2>
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {day.fixtures.map((f, i) => {
                          const isHighlighted = isHighlightedFixture(day.date, f.time, f.teamA, f.teamB);
                          const isCancelled = isCancelledGame(day.date, f.time, f.teamA, f.teamB);

                          // Get the final score for this fixture
                          let scoreDisplay = null;
                          let showFinal = false;
                          const finalScore = getFinalScore(day.date, f.time, f.teamA, f.teamB);
                          if (finalScore && !isCancelled) {
                            showFinal = true;
                            // Pad scores to two digits for uniformity
                            const teamAStr = String(finalScore.teamAScore).padStart(2, '0');
                            const teamBStr = String(finalScore.teamBScore).padStart(2, '0');
                            scoreDisplay = (
                              <div className="text-2xl font-orbitron text-scrummy-goldYellow text-center">
                                {teamAStr} - {teamBStr}
                              </div>
                            );
                          }

                          return (
                            <motion.div key={i} variants={itemVariants}>
                              <Card
                                className={`transition-all duration-300 hover:shadow-lg h-[240px] w-full relative ${
                                  isHighlighted && !isCancelled
                                    ? "border-2 border-scrummy-goldYellow hover:shadow-[0_0_20px_rgba(255,199,0,0.4)] cursor-pointer"
                                    : isCancelled
                                    ? "bg-white/60 opacity-75"
                                    : "bg-white/80 hover:bg-white/90 cursor-pointer"
                                }`}
                                onClick={() => !isCancelled && handleFixtureClick(day.date, f.time, f.teamA, f.teamB)}
                              >
                                {isHighlighted && !isCancelled && (
                                  <img 
                                    src="/assets/logo.png" 
                                    alt="SCRUMMY" 
                                    className="absolute top-2 right-2 w-12 h-12 opacity-80" 
                                  />
                                )}
                                <CardContent className="p-2 pt-1 flex flex-col h-full">
                                  <div className={`text-lg font-bold ${
                                    isCancelled 
                                      ? 'text-red-500 bg-red-50'
                                      : isHighlighted 
                                        ? 'text-scrummy-navyBlue bg-scrummy-goldYellow' 
                                        : 'text-scrummy-goldYellow bg-scrummy-navyBlue'
                                  } inline-flex rounded px-2 py-1 self-start mb-0.5 mt-2 ml-2`}>
                                    {f.time}
                                  </div>

                                  <div className="flex flex-col items-center justify-start flex-grow -mt-1">
                                    {/* Status label */}
                                    {isCancelled ? (
                                      <div className="text-base font-bold font-orbitron text-red-500 mb-0.5 tracking-widest">
                                        CANCELLED
                                      </div>
                                    ) : showFinal && (
                                      <div className="text-base font-bold font-orbitron text-scrummy-navyBlue mb-0.5 tracking-widest">
                                        FINAL
                                      </div>
                                    )}

                                    <div className="flex items-center justify-center w-full gap-4 -mt-6">
                                      {/* Team A */}
                                      <div className="flex-1 text-center">
                                        {teamLogoMap[f.teamA] && (
                                          <img 
                                            src={teamLogoMap[f.teamA]} 
                                            alt={`${f.teamA} logo`} 
                                            className={`w-28 h-28 mx-auto mb-0.5 object-contain ${isCancelled ? 'opacity-50' : ''}`} 
                                          />
                                        )}
                                        <p className={`text-base font-medium ${
                                          isCancelled 
                                            ? 'text-scrummy-navyBlue/50'
                                            : `text-scrummy-navyBlue ${isHighlighted ? 'font-bold' : ''}`
                                        }`}>{f.teamA}</p>
                                      </div>

                                      {/* Score or VS */}
                                      <div className="flex-none flex flex-col items-center justify-center">
                                        {isCancelled ? (
                                          <p className="text-red-500/70 font-semibold text-base">cancelled</p>
                                        ) : showFinal ? (
                                          scoreDisplay
                                        ) : (
                                          <p className="text-scrummy-navyBlue/60 font-semibold text-base">vs</p>
                                        )}
                                      </div>

                                      {/* Team B */}
                                      <div className="flex-1 text-center">
                                        {teamLogoMap[f.teamB] && (
                                          <img 
                                            src={teamLogoMap[f.teamB]} 
                                            alt={`${f.teamB} logo`} 
                                            className={`w-28 h-28 mx-auto mb-0.5 object-contain ${isCancelled ? 'opacity-50' : ''}`} 
                                          />
                                        )}
                                        <p className={`text-base font-medium ${
                                          isCancelled 
                                            ? 'text-scrummy-navyBlue/50'
                                            : `text-scrummy-navyBlue ${isHighlighted ? 'font-bold' : ''}`
                                        }`}>{f.teamB}</p>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-12 text-center text-sm text-scrummy-navyBlue/70">
              <p>St John's College • MUKURU Derby Day 2025</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Fixtures;
