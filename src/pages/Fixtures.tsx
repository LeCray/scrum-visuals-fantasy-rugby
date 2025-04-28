import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { generateMatchId, getBoxScore } from "@/lib/boxScoreData";

// Define types for our fixtures data
type Fixture = {
  time: string;
  teamA: string;
  teamB: string;
};

type FixtureDay = {
  date: string;
  day: string;
  fixtures: Fixture[];
};

// Fixture data
const fixturesData: FixtureDay[] = [
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
      { time: "13:00", teamA: "PRINCE EDWARD 2XV", teamB: "CHURCHILL 2XV" },
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
  "SHARKS ACADEMY": "/assets/SharksAcademy.png",
  "PETERHOUSE 1XV": "/assets/Peterhouse.png",
  "MILTON 2XV": "/assets/Milton.png",
  "WISE OWL 2XV": "/assets/WiseOwl.png",
  "PRINCE EDWARD 2XV": "/assets/PrinceEdward.png",
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
        <main className="relative z-10 px-4 md:px-8 mt-32 md:mt-24">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Legend for highlighted games */}
            <div className="flex flex-col items-center gap-2 text-scrummy-navyBlue">
              <div className="flex items-center gap-3">
                <img src="/assets/logo.png" alt="SCRUMMY" className="w-12 h-12" />
                <p className="text-base md:text-lg font-orbitron">Below is a schedule of all the Derby Day fixtures. Games marked with a<span className="text-scrummy-goldYellow"> yellow border</span> and SCRUMMY logo are ones that will have detailed player and game stats.</p>
              </div>
              <p className="text-sm text-scrummy-navyBlue/70 -mb-2">All times are in CAT (Central Africa Time)</p>
            </div>
            {fixturesData.map((day, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md">
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

                    // Get the box score for this fixture if it's highlighted
                    let scoreDisplay = null;
                    let showFinal = false;
                    if (isHighlighted) {
                      const boxScore = getBoxScore(day.date, f.time, f.teamA, f.teamB);
                      if (boxScore) {
                        const teamAConv = parseConversions(boxScore.teamASummary.totalConversions);
                        const teamBConv = parseConversions(boxScore.teamBSummary.totalConversions);
                        const teamApoints = boxScore.teamASummary.totalTries * 5 + teamAConv.conversions * 2 + teamAConv.penalties * 3;
                        const teamBpoints = boxScore.teamBSummary.totalTries * 5 + teamBConv.conversions * 2 + teamBConv.penalties * 3;
                        if (teamApoints !== 0 || teamBpoints !== 0) {
                          showFinal = true;
                          // Pad scores to two digits for uniformity
                          const teamAStr = String(teamApoints).padStart(2, '0');
                          const teamBStr = String(teamBpoints).padStart(2, '0');
                          scoreDisplay = (
                            <div className="text-2xl font-orbitron text-scrummy-goldYellow text-center">
                              {teamAStr} - {teamBStr}
                            </div>
                          );
                        } else {
                          scoreDisplay = null;
                        }
                      }
                    }

                    return (
                      <motion.div 
                        key={i} 
                        variants={itemVariants} 
                        whileHover={{ y: isHighlighted ? -8 : -5, transition: { duration: 0.2 } }}
                        onClick={() => handleFixtureClick(day.date, f.time, f.teamA, f.teamB)}
                        className={isHighlighted ? 'cursor-pointer' : ''}
                      >
                        <Card className={`h-full bg-white/60 transition-all duration-300 hover:bg-white/90 relative ${
                          isHighlighted
                            ? 'border-2 border-scrummy-goldYellow shadow-[0_0_15px_rgba(255,199,0,0.3)] hover:shadow-[0_0_20px_rgba(255,199,0,0.4)]'
                            : 'border-scrummy-lightblue'
                        }`}>
                          {isHighlighted && (
                            <img src="/assets/logo.png" alt="SCRUMMY" className="absolute top-2 right-2 w-14 h-14 opacity-80" />
                          )}
                          <CardContent className="p-4 flex flex-col">
                            <div className={`text-lg font-bold ${isHighlighted ? 'text-scrummy-navyBlue bg-scrummy-goldYellow' : 'text-scrummy-goldYellow bg-scrummy-navyBlue'} inline-flex rounded px-3 py-1 self-start mb-3`}>
                              {f.time}
                            </div>

                            <div className="flex flex-col items-center justify-between gap-2">
                              {/* FINAL label if score is present */}
                              {showFinal && (
                                <div className="text-lg md:text-xl font-bold font-orbitron text-scrummy-navyBlue mb-1 tracking-widest">
                                  FINAL
                                </div>
                              )}

                              <div className="flex items-center justify-between w-full gap-2">
                                {/* Team A */}
                                <div className="flex-1 text-center">
                                  {teamLogoMap[f.teamA] && (
                                    <img src={teamLogoMap[f.teamA]} alt={`${f.teamA} logo`} className="w-28 h-28 mx-auto mb-1 object-contain" />
                                  )}
                                  <p className={`font-medium text-scrummy-navyBlue ${isHighlighted ? 'font-bold' : ''}`}>{f.teamA}</p>
                                </div>

                                {/* Score or VS */}
                                <div className="flex-none px-2 flex flex-col items-center justify-center">
                                  {showFinal ? (
                                    scoreDisplay
                                  ) : (
                                    <p className="text-scrummy-navyBlue/60 font-semibold">vs</p>
                                  )}
                                </div>

                                {/* Team B */}
                                <div className="flex-1 text-center">
                                  {teamLogoMap[f.teamB] && (
                                    <img src={teamLogoMap[f.teamB]} alt={`${f.teamB} logo`} className="w-28 h-28 mx-auto mb-1 object-contain" />
                                  )}
                                  <p className={`font-medium text-scrummy-navyBlue ${isHighlighted ? 'font-bold' : ''}`}>{f.teamB}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            ))}
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
