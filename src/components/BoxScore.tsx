import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Types for our box score data
type Player = {
  name: string;
  position: string;
  tries: number;
  kicks: string;
  lineouts: string;
  penaltiesWon: number;
  penaltiesConceded: number;
};

type TeamStats = {
  totalTries: number;
  totalConversions: string;
  lineoutAccuracy: string;
  penaltiesWon: number;
  penaltiesConceded: number;
};

type BoxScoreProps = {
  matchInfo: {
    teamA: string;
    teamB: string;
    venue: string;
    date: string;
    kickoff: string;
    weather: string;
  };
  teamAPlayers: Player[];
  teamBPlayers: Player[];
  teamASummary: TeamStats;
  teamBSummary: TeamStats;
};

// Helper function to clean team names
const cleanTeamName = (teamName: string) => {
  return teamName.replace(/\s+[12]XV$/, '');
};

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
  "SHARKS ACADEMY": "/assets/Sharks.png",
  "PETERHOUSE 1XV": "/assets/Peterhouse.png",
  "MILTON 2XV": "/assets/Milton.png",
  "WISE OWL 2XV": "/assets/WiseOwl.png",
  "PRINCE EDWARD 2XV": "/assets/PrinceEdward.png",
};

// Helper to parse conversions and penalty kicks from summary string
function parseConversions(conversionStr: string) {
  // e.g. "1/1 PK" or "1/1" or "-"
  if (!conversionStr || conversionStr === "-") return { conversions: 0, penalties: 0 };
  if (conversionStr.includes("PK")) {
    // Penalty kicks only
    const match = conversionStr.match(/(\d+)\/(\d+) PK/);
    if (match) {
      return { conversions: 0, penalties: parseInt(match[1], 10) };
    }
  } else {
    // Conversions only
    const match = conversionStr.match(/(\d+)\/(\d+)/);
    if (match) {
      return { conversions: parseInt(match[1], 10), penalties: 0 };
    }
  }
  return { conversions: 0, penalties: 0 };
}

const BoxScore: React.FC<BoxScoreProps> = ({
  matchInfo,
  teamAPlayers,
  teamBPlayers,
  teamASummary,
  teamBSummary,
}) => {
  const cleanTeamA = cleanTeamName(matchInfo.teamA);
  const cleanTeamB = cleanTeamName(matchInfo.teamB);
  const isMobile = useIsMobile();

  // Calculate total points (for now using dummy data, will be updated with real data)
  const teamAConv = parseConversions(teamASummary.totalConversions);
  const teamBConv = parseConversions(teamBSummary.totalConversions);
  const teamApoints = teamASummary.totalTries * 5 + teamAConv.conversions * 2 + teamAConv.penalties * 3;
  const teamBpoints = teamBSummary.totalTries * 5 + teamBConv.conversions * 2 + teamBConv.penalties * 3;

  // Pad scores to two digits for uniformity
  const teamAStr = String(teamApoints).padStart(2, '0');
  const teamBStr = String(teamBpoints).padStart(2, '0');

  return (
    <div className="relative text-scrummy-navyBlue min-h-screen pb-12">
      {/* Background Logo */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "url('/assets/logo.png')",
          backgroundSize: isMobile ? "120% auto" : "80% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10">
        {/* Header Section */}
        <header className="relative py-6 md:py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/fixtures"
              className="inline-flex items-center text-scrummy-navyBlue hover:text-scrummy-goldYellow transition-colors text-sm md:text-base"
            >
              <ChevronLeft size={isMobile ? 16 : 20} />
              <span>Back to Fixtures</span>
            </Link>

            <div className="text-center mt-4 md:mt-8">
              {/* Centered Large Logo */}
              <Link to="/" className="inline-block">
                <img
                  src="/assets/logo.png"
                  alt="SCRUMMY"
                  className="w-full max-w-[280px] md:max-w-[480px] h-auto mx-auto"
                />
              </Link>

              <h1 className="text-3xl md:text-6xl font-bold font-orbitron mb-4 md:mb-6">
                <span className="text-scrummy-navyBlue">Rugby Match</span>{" "}
                <span className="text-scrummy-goldYellow block md:inline">Box Score</span>
              </h1>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md max-w-4xl mx-auto">
                {/* Team Logos and Score */}
                <div className="flex items-center justify-center gap-3 md:gap-6 mb-4 md:mb-6">
                  <div className="text-center">
                    <img
                      src={teamLogoMap[matchInfo.teamA]}
                      alt={`${cleanTeamA} logo`}
                      className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-1 md:mb-2 object-contain"
                    />
                    <h2 className="text-base md:text-xl font-semibold">{cleanTeamA}</h2>
                  </div>

                  <div className="text-center px-4 md:px-8">
                    <div className="text-2xl md:text-4xl font-bold font-orbitron text-scrummy-goldYellow mb-1 md:mb-2">
                      {teamAStr} - {teamBStr}
                    </div>
                    <div className="text-xs md:text-sm text-scrummy-navyBlue/60">Final Score</div>
                  </div>

                  <div className="text-center">
                    <img
                      src={teamLogoMap[matchInfo.teamB]}
                      alt={`${cleanTeamB} logo`}
                      className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-1 md:mb-2 object-contain"
                    />
                    <h2 className="text-base md:text-xl font-semibold">{cleanTeamB}</h2>
                  </div>
                </div>

                {/* Match Details */}
                <div className="text-scrummy-navyBlue/80 border-t border-scrummy-lightblue pt-3 md:pt-4 text-xs md:text-base text-center md:text-left">
                  {matchInfo.venue} • {matchInfo.date} • {matchInfo.kickoff} • {matchInfo.weather}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-2 md:px-8">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
            {/* Team Stats Table Container */}
            {[
              { team: cleanTeamA, players: teamAPlayers },
              { team: cleanTeamB, players: teamBPlayers }
            ].map(({ team, players }, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-md">
                <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-3 md:mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
                  {team}
                </h2>
                <div className="overflow-x-auto -mx-3 md:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-scrummy-navyBlue text-white">
                          <th className="p-2 md:p-3 text-left rounded-l-lg whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <img src="/assets/Icons/Player.png" alt="Player" className="w-8 h-8 md:w-12 md:h-12" />
                              <span className="text-xs md:text-base">Player</span>
                            </div>
                          </th>
                          {[
                            { icon: "Tries.png", label: "Tries" },
                            { icon: "Kicks.png", label: "Kicks" },
                            { icon: "Lineouts.png", label: "Lineouts" },
                            { icon: "Pen.Won.png", label: "Won" },
                            { icon: "Pen.Conceded.png", label: "Conc." }
                          ].map((col, i) => (
                            <th key={i} className={`p-2 md:p-3 ${i === 4 ? 'rounded-r-lg' : ''}`}>
                              <div className="flex flex-col md:flex-row items-center justify-center gap-1">
                                <img 
                                  src={`/assets/Icons/${col.icon}`} 
                                  alt={col.label} 
                                  className="w-8 h-8 md:w-12 md:h-12"
                                />
                                <span className="text-[10px] md:text-base whitespace-nowrap">
                                  {col.label}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {players.map((player, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors"
                          >
                            <td className="p-2 md:p-3 text-left">
                              <div className="font-medium text-xs md:text-base">
                                <span className="block md:inline">{player.name}</span>
                                <span className="text-scrummy-navyBlue/70 text-[10px] md:text-sm md:ml-1">
                                  ({player.position})
                                </span>
                              </div>
                            </td>
                            <td className="p-2 md:p-3 text-center text-xs md:text-base">{player.tries}</td>
                            <td className="p-2 md:p-3 text-center text-xs md:text-base">{player.kicks || "–"}</td>
                            <td className="p-2 md:p-3 text-center text-xs md:text-base">{player.lineouts || "–"}</td>
                            <td className="p-2 md:p-3 text-center text-xs md:text-base">{player.penaltiesWon}</td>
                            <td className="p-2 md:p-3 text-center text-xs md:text-base">{player.penaltiesConceded}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}

            {/* Match Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-md">
              <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-3 md:mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
                Match Summary
              </h2>
              <div className="overflow-x-auto -mx-3 md:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-scrummy-navyBlue text-white">
                        <th className="p-2 md:p-3 text-left rounded-l-lg text-xs md:text-base">Metric</th>
                        <th className="p-2 md:p-3 text-center text-xs md:text-base">{cleanTeamA}</th>
                        <th className="p-2 md:p-3 text-center rounded-r-lg text-xs md:text-base">{cleanTeamB}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">Total Tries</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{teamASummary.totalTries}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{teamBSummary.totalTries}</td>
                      </tr>
                      <tr className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">Total Conversions</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{teamASummary.totalConversions}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{teamBSummary.totalConversions}</td>
                      </tr>
                      <tr className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">Lineout Accuracy</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{teamASummary.lineoutAccuracy}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{teamBSummary.lineoutAccuracy}</td>
                      </tr>
                      <tr className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">Penalties Won</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{teamASummary.penaltiesWon}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{teamBSummary.penaltiesWon}</td>
                      </tr>
                      <tr className="hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">Penalties Conceded</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{teamASummary.penaltiesConceded}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{teamBSummary.penaltiesConceded}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Key Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-md">
              <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-3 md:mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
                Key
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-scrummy-navyBlue/80 text-xs md:text-base">
                <div className="space-y-2">
                  <p><span className="font-semibold">C/P:</span> Conversions / Penalty Kicks made</p>
                  <p><span className="font-semibold">Lineout Throws:</span> Successful / Total (with %)</p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-semibold">Penalties Won:</span> Positive action earns team a penalty</p>
                  <p><span className="font-semibold">Penalties Conceded:</span> Infractions by the player</p>
                </div>
              </div>
            </div>

            <div className="text-center text-xs md:text-sm text-scrummy-navyBlue/70 mt-6 md:mt-8">
              <p>St John's College • MUKURU Derby Day 2025</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BoxScore; 