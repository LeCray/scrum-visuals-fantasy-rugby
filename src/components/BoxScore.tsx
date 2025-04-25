import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

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
  "SHARKS U20": "/assets/Sharks.png",
  "PETERHOUSE 1XV": "/assets/Peterhouse.png",
  "MILTON 2XV": "/assets/Milton.png",
  "WISE OWL 2XV": "/assets/WiseOwl.png",
  "PRINCE EDWARD 2XV": "/assets/PrinceEdward.png",
};

const BoxScore: React.FC<BoxScoreProps> = ({
  matchInfo,
  teamAPlayers,
  teamBPlayers,
  teamASummary,
  teamBSummary,
}) => {
  const cleanTeamA = cleanTeamName(matchInfo.teamA);
  const cleanTeamB = cleanTeamName(matchInfo.teamB);

  // Calculate total points (for now using dummy data, will be updated with real data)
  const teamAPoints = teamASummary.totalTries * 5; // Assuming no conversions for now
  const teamBPoints = teamBSummary.totalTries * 5; // Assuming no conversions for now

  return (
    <div className="relative text-scrummy-navyBlue min-h-screen pb-12">
      {/* Background Logo */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "url('/assets/logo.png')",
          backgroundSize: "80% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10">
        {/* Header Section */}
        <header className="relative py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/fixtures"
              className="inline-flex items-center text-scrummy-navyBlue hover:text-scrummy-goldYellow transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back to Fixtures</span>
            </Link>

            <div className="text-center mt-8">
              {/* Centered Large Logo */}
              <Link to="/" className="inline-block">
                <img
                  src="/assets/logo.png"
                  alt="SCRUMMY"
                  className="w-full max-w-[480px] h-auto mx-auto"
                />
              </Link>

              <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-6">
                <span className="text-scrummy-navyBlue">Rugby Match</span>{" "}
                <span className="text-scrummy-goldYellow">Box Score</span>
              </h1>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md max-w-4xl mx-auto">
                {/* Team Logos and Score */}
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="text-center">
                    <img
                      src={teamLogoMap[matchInfo.teamA]}
                      alt={`${cleanTeamA} logo`}
                      className="w-24 h-24 mx-auto mb-2 object-contain"
                    />
                    <h2 className="text-xl font-semibold">{cleanTeamA}</h2>
                  </div>

                  <div className="text-center px-8">
                    <div className="text-4xl font-bold font-orbitron text-scrummy-goldYellow mb-2">
                      {teamAPoints} - {teamBPoints}
                    </div>
                    <div className="text-sm text-scrummy-navyBlue/60">Final Score</div>
                  </div>

                  <div className="text-center">
                    <img
                      src={teamLogoMap[matchInfo.teamB]}
                      alt={`${cleanTeamB} logo`}
                      className="w-24 h-24 mx-auto mb-2 object-contain"
                    />
                    <h2 className="text-xl font-semibold">{cleanTeamB}</h2>
                  </div>
                </div>

                {/* Match Details */}
                <div className="text-scrummy-navyBlue/80 border-t border-scrummy-lightblue pt-4">
                  {matchInfo.venue} • {matchInfo.date} • {matchInfo.kickoff} • {matchInfo.weather}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Team A Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-scrummy-navyBlue mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
                {cleanTeamA}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-scrummy-navyBlue text-white">
                      <th className="p-3 text-left rounded-l-lg">
                        <div className="flex items-center gap-1">
                          <img src="/assets/Icons/Player.png" alt="Player" className="w-12 h-12" />
                          Player
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/assets/Icons/Tries.png" alt="Tries" className="w-12 h-12" />
                          Tries
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/assets/Icons/Kicks.png" alt="Kicks" className="w-12 h-12" />
                          Kicks (C/P)
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/assets/Icons/Lineouts.png" alt="Lineouts" className="w-12 h-12" />
                          Lineouts
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/assets/Icons/Pen.Won.png" alt="Penalties Won" className="w-12 h-12" />
                          Pen. Won
                        </div>
                      </th>
                      <th className="p-3 rounded-r-lg">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/assets/Icons/Pen.Conceded.png" alt="Penalties Conceded" className="w-12 h-12" />
                          Pen. Conceded
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamAPlayers.map((player, index) => (
                      <tr
                        key={index}
                        className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors"
                      >
                        <td className="p-3 text-left font-medium">{player.name} ({player.position})</td>
                        <td className="p-3 text-center">{player.tries}</td>
                        <td className="p-3 text-center">{player.kicks || "–"}</td>
                        <td className="p-3 text-center">{player.lineouts || "–"}</td>
                        <td className="p-3 text-center">{player.penaltiesWon}</td>
                        <td className="p-3 text-center">{player.penaltiesConceded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Team Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md my-8">
              <h2 className="text-2xl font-bold text-scrummy-navyBlue mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
                Match Summary
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-scrummy-navyBlue text-white">
                      <th className="p-3 text-left rounded-l-lg">Metric</th>
                      <th className="p-3">{cleanTeamA}</th>
                      <th className="p-3 rounded-r-lg">{cleanTeamB}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                      <td className="p-3 font-medium">Total Tries</td>
                      <td className="p-3 text-center">{teamASummary.totalTries}</td>
                      <td className="p-3 text-center">{teamBSummary.totalTries}</td>
                    </tr>
                    <tr className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                      <td className="p-3 font-medium">Total Conversions</td>
                      <td className="p-3 text-center">{teamASummary.totalConversions}</td>
                      <td className="p-3 text-center">{teamBSummary.totalConversions}</td>
                    </tr>
                    <tr className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                      <td className="p-3 font-medium">Lineout Accuracy</td>
                      <td className="p-3 text-center">{teamASummary.lineoutAccuracy}</td>
                      <td className="p-3 text-center">{teamBSummary.lineoutAccuracy}</td>
                    </tr>
                    <tr className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                      <td className="p-3 font-medium">Penalties Won</td>
                      <td className="p-3 text-center">{teamASummary.penaltiesWon}</td>
                      <td className="p-3 text-center">{teamBSummary.penaltiesWon}</td>
                    </tr>
                    <tr className="hover:bg-white/50 transition-colors">
                      <td className="p-3 font-medium">Penalties Conceded</td>
                      <td className="p-3 text-center">{teamASummary.penaltiesConceded}</td>
                      <td className="p-3 text-center">{teamBSummary.penaltiesConceded}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Team B Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-scrummy-navyBlue mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
                {cleanTeamB}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-scrummy-navyBlue text-white">
                      <th className="p-3 text-left rounded-l-lg">
                        <div className="flex items-center gap-1">
                          <img src="/assets/Icons/Player.png" alt="Player" className="w-12 h-12" />
                          Player
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/assets/Icons/Tries.png" alt="Tries" className="w-12 h-12" />
                          Tries
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/assets/Icons/Kicks.png" alt="Kicks" className="w-12 h-12" />
                          Kicks (C/P)
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/assets/Icons/Lineouts.png" alt="Lineouts" className="w-12 h-12" />
                          Lineouts
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/assets/Icons/Pen.Won.png" alt="Penalties Won" className="w-12 h-12" />
                          Pen. Won
                        </div>
                      </th>
                      <th className="p-3 rounded-r-lg">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/assets/Icons/Pen.Conceded.png" alt="Penalties Conceded" className="w-12 h-12" />
                          Pen. Conceded
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamBPlayers.map((player, index) => (
                      <tr
                        key={index}
                        className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors"
                      >
                        <td className="p-3 text-left font-medium">{player.name} ({player.position})</td>
                        <td className="p-3 text-center">{player.tries}</td>
                        <td className="p-3 text-center">{player.kicks || "–"}</td>
                        <td className="p-3 text-center">{player.lineouts || "–"}</td>
                        <td className="p-3 text-center">{player.penaltiesWon}</td>
                        <td className="p-3 text-center">{player.penaltiesConceded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md mt-8">
              <h2 className="text-2xl font-bold text-scrummy-navyBlue mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
                Key
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-scrummy-navyBlue/80">
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

            {/* Footer */}
            <div className="text-center text-sm text-scrummy-navyBlue/70 mt-8">
              <p>St John's College • MUKURU Derby Day 2025</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BoxScore; 