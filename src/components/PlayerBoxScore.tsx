import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Types for player data
type PlayerData = {
  playerCode: string;
  playerNumber: number;
  team: string;
  totalActions: number;
  passesTotal: number;
  passesAccurate: number;
  passAccuracyPct: number;
  tacklesTotal: number;
  tacklesMissed: number;
  tackleSuccessPct: number;
  ballCarriesTotal: number;
  ballCarriesDominant: number;
  carryDominancePct: number;
  ruckArrivalsTotal: number;
  ruckArrivalsEffective: number;
  ruckEfficiencyPct: number;
  kicksTotal: number;
  kicksGood: number;
  kickSuccessPct: number;
  errors: number;
};

type PlayerBoxScoreProps = {
  matchInfo: {
    teamA: string;
    teamB: string;
  };
  playerData: PlayerData[];
};

// Position mapping based on jersey numbers
const getPositionName = (playerNumber: number): string => {
  const positions: Record<number, string> = {
    1: "Prop", 2: "Hooker", 3: "Prop",
    4: "Lock", 5: "Lock", 6: "Flanker", 
    7: "Flanker", 8: "Number 8", 9: "Scrum-half",
    10: "Fly-half", 11: "Wing", 12: "Centre",
    13: "Centre", 14: "Wing", 15: "Fullback",
    16: "Sub", 17: "Sub", 18: "Sub", 19: "Sub",
    20: "Sub", 21: "Sub", 22: "Sub", 23: "Sub"
  };
  return positions[playerNumber] || "Unknown";
};

// Helper function to clean team names
const cleanTeamName = (teamName: string) => {
  return teamName.replace(/\s+[12]XV$/, '');
};

const PlayerBoxScore: React.FC<PlayerBoxScoreProps> = ({
  matchInfo,
  playerData
}) => {
  const isMobile = useIsMobile();
  const [showAllTeamA, setShowAllTeamA] = useState(false);
  const [showAllTeamB, setShowAllTeamB] = useState(false);

  const cleanTeamA = cleanTeamName(matchInfo.teamA);
  const cleanTeamB = cleanTeamName(matchInfo.teamB);

  // Separate players by team
  const teamAPlayers = playerData.filter(p => p.team === cleanTeamA);
  const teamBPlayers = playerData.filter(p => p.team !== cleanTeamA);

  // Sort players by total actions (most active first)
  const sortedTeamA = teamAPlayers.sort((a, b) => b.totalActions - a.totalActions);
  const sortedTeamB = teamBPlayers.sort((a, b) => b.totalActions - a.totalActions);

  // Separate players by attacking and defensive positions
  const attackingPositions = [8, 9, 10, 11, 12, 13, 14, 15]; // Backs + Number 8
  const defensivePositions = [1, 2, 3, 4, 5, 6, 7]; // Forwards

  const teamAAttackers = sortedTeamA.filter(p => attackingPositions.includes(p.playerNumber));
  const teamADefenders = sortedTeamA.filter(p => defensivePositions.includes(p.playerNumber));
  const teamBAttackers = sortedTeamB.filter(p => attackingPositions.includes(p.playerNumber));
  const teamBDefenders = sortedTeamB.filter(p => defensivePositions.includes(p.playerNumber));

  // Get top 5 or all players based on state for each category
  const displayTeamAAttackers = showAllTeamA ? teamAAttackers : teamAAttackers.slice(0, 5);
  const displayTeamADefenders = showAllTeamA ? teamADefenders : teamADefenders.slice(0, 5);
  const displayTeamBAttackers = showAllTeamB ? teamBAttackers : teamBAttackers.slice(0, 5);
  const displayTeamBDefenders = showAllTeamB ? teamBDefenders : teamBDefenders.slice(0, 5);



  return (
    <div className="space-y-6 md:space-y-8">
      {/* Team A Section */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navyBlue font-orbitron text-center">
          {cleanTeamA} Players
        </h2>
        
        {/* Attacking Stats Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
          <h4 className="text-lg font-semibold text-scrummy-navyBlue mb-3 text-center">Attacking Stats</h4>
          <div className="overflow-x-auto -mx-3 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-scrummy-navyBlue text-white">
                    <th className="p-2 md:p-3 text-left rounded-l-lg text-xs md:text-base">Player</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Position</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Passes</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base hidden md:table-cell">Pass %</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Carries</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Kicks</th>
                    <th className="p-2 md:p-3 text-center rounded-r-lg text-xs md:text-base hidden md:table-cell">Kick %</th>
                  </tr>
                </thead>
                <tbody>
                  {displayTeamAAttackers.map((player, index) => {
                    return (
                      <tr key={index} className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">{player.playerCode}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{getPositionName(player.playerNumber)}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">
                          {player.passesTotal > 0 ? `${player.passesAccurate}/${player.passesTotal}` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base hidden md:table-cell">
                          {player.passesTotal > 0 ? `${player.passAccuracyPct.toFixed(0)}%` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">
                          {player.ballCarriesTotal > 0 ? `${player.ballCarriesTotal} (${player.carryDominancePct.toFixed(0)}% dom)` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">
                          {player.kicksTotal > 0 ? `${player.kicksGood}/${player.kicksTotal}` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base hidden md:table-cell">
                          {player.kicksTotal > 0 ? `${player.kickSuccessPct.toFixed(0)}%` : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Defensive Stats Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
          <h4 className="text-lg font-semibold text-scrummy-navyBlue mb-3 text-center">Defensive Stats</h4>
          <div className="overflow-x-auto -mx-3 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-scrummy-navyBlue text-white">
                    <th className="p-2 md:p-3 text-left rounded-l-lg text-xs md:text-base">Player</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Position</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Tackles</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base hidden md:table-cell">Tackle %</th>
                    <th className="p-2 md:p-3 text-center rounded-r-lg text-xs md:text-base">Errors</th>
                  </tr>
                </thead>
                <tbody>
                  {displayTeamADefenders.map((player, index) => {
                    return (
                      <tr key={index} className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">{player.playerCode}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{getPositionName(player.playerNumber)}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">
                          {player.tacklesTotal > 0 ? `${player.tacklesTotal - player.tacklesMissed}/${player.tacklesTotal}` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base hidden md:table-cell">
                          {player.tacklesTotal > 0 ? `${player.tackleSuccessPct.toFixed(0)}%` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{player.errors}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* See More Button */}
        {(teamAAttackers.length > 5 || teamADefenders.length > 5) && (
          <div className="text-center">
            <button
              onClick={() => setShowAllTeamA(!showAllTeamA)}
              className="px-6 py-2 bg-scrummy-navyBlue text-white rounded-lg hover:bg-scrummy-navyBlue/80 transition-colors"
            >
              {showAllTeamA ? 'Show Less' : `See All ${sortedTeamA.length} Players`}
            </button>
          </div>
        )}
      </div>

      {/* Team B Section */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navyBlue font-orbitron text-center">
          {cleanTeamB} Players
        </h2>
        
        {/* Attacking Stats Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
          <h4 className="text-lg font-semibold text-scrummy-navyBlue mb-3 text-center">Attacking Stats</h4>
          <div className="overflow-x-auto -mx-3 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-scrummy-navyBlue text-white">
                    <th className="p-2 md:p-3 text-left rounded-l-lg text-xs md:text-base">Player</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Position</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Passes</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base hidden md:table-cell">Pass %</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Carries</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Kicks</th>
                    <th className="p-2 md:p-3 text-center rounded-r-lg text-xs md:text-base hidden md:table-cell">Kick %</th>
                  </tr>
                </thead>
                <tbody>
                  {displayTeamBAttackers.map((player, index) => {
                    return (
                      <tr key={index} className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">{player.playerCode}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{getPositionName(player.playerNumber)}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">
                          {player.passesTotal > 0 ? `${player.passesAccurate}/${player.passesTotal}` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base hidden md:table-cell">
                          {player.passesTotal > 0 ? `${player.passAccuracyPct.toFixed(0)}%` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">
                          {player.ballCarriesTotal > 0 ? `${player.ballCarriesTotal} (${player.carryDominancePct.toFixed(0)}% dom)` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">
                          {player.kicksTotal > 0 ? `${player.kicksGood}/${player.kicksTotal}` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base hidden md:table-cell">
                          {player.kicksTotal > 0 ? `${player.kickSuccessPct.toFixed(0)}%` : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Defensive Stats Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
          <h4 className="text-lg font-semibold text-scrummy-navyBlue mb-3 text-center">Defensive Stats</h4>
          <div className="overflow-x-auto -mx-3 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-scrummy-navyBlue text-white">
                    <th className="p-2 md:p-3 text-left rounded-l-lg text-xs md:text-base">Player</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Position</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base">Tackles</th>
                    <th className="p-2 md:p-3 text-center text-xs md:text-base hidden md:table-cell">Tackle %</th>
                    <th className="p-2 md:p-3 text-center rounded-r-lg text-xs md:text-base">Errors</th>
                  </tr>
                </thead>
                <tbody>
                  {displayTeamBDefenders.map((player, index) => {
                    return (
                      <tr key={index} className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">{player.playerCode}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{getPositionName(player.playerNumber)}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">
                          {player.tacklesTotal > 0 ? `${player.tacklesTotal - player.tacklesMissed}/${player.tacklesTotal}` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base hidden md:table-cell">
                          {player.tacklesTotal > 0 ? `${player.tackleSuccessPct.toFixed(0)}%` : '-'}
                        </td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{player.errors}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* See More Button */}
        {(teamBAttackers.length > 5 || teamBDefenders.length > 5) && (
          <div className="text-center">
            <button
              onClick={() => setShowAllTeamB(!showAllTeamB)}
              className="px-6 py-2 bg-scrummy-navyBlue text-white rounded-lg hover:bg-scrummy-navyBlue/80 transition-colors"
            >
              {showAllTeamB ? 'Show Less' : `See All ${sortedTeamB.length} Players`}
            </button>
          </div>
        )}
      </div>

      {/* Player Analysis */}
             <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md">
         <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
           Match Analysis & Player Insights
         </h2>
         
         <div className="space-y-5 text-sm md:text-base">
           {/* Match Stars */}
           <div>
             <h3 className="text-lg font-semibold text-scrummy-navyBlue mb-3">Match Stars</h3>
             <div className="space-y-3 text-scrummy-navyBlue/80">
               <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border-l-4 border-yellow-400">
                 <p className="leading-relaxed">
                   <strong className="text-yellow-700">{sortedTeamA[0]?.playerCode} ({getPositionName(sortedTeamA[0]?.playerNumber)})</strong> was {cleanTeamA}'s engine room with an outstanding <strong>{sortedTeamA[0]?.totalActions} total actions</strong>. 
                   {sortedTeamA[0]?.passesTotal > 0 && (
                     <> Their distribution was clinical at <strong>{sortedTeamA[0]?.passAccuracyPct.toFixed(0)}% accuracy ({sortedTeamA[0]?.passesAccurate}/{sortedTeamA[0]?.passesTotal})</strong>, providing the platform for {cleanTeamA}'s attacking structure.</>
                   )}
                   {sortedTeamA[0]?.tacklesTotal > 0 && (
                     <> Defensively solid with <strong>{sortedTeamA[0]?.tackleSuccessPct.toFixed(0)}% tackle success</strong>, they rarely missed their assignments.</>
                   )}
                   {sortedTeamA[0]?.errors === 0 ? (
                     <> Most impressively, they made <strong>zero errors</strong>, showcasing perfect decision-making under pressure.</>
                   ) : (
                     <> Despite {sortedTeamA[0]?.errors} handling errors, their overall impact was decisive.</>
                   )}
                 </p>
               </div>
               
               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-400">
                 <p className="leading-relaxed">
                   <strong className="text-blue-700">{sortedTeamB[0]?.playerCode} ({getPositionName(sortedTeamB[0]?.playerNumber)})</strong> led {cleanTeamB}'s resistance with <strong>{sortedTeamB[0]?.totalActions} total actions</strong>. 
                   {sortedTeamB[0]?.tacklesTotal > 0 && (
                     <> As a defensive anchor, they completed <strong>{sortedTeamB[0]?.tackleSuccessPct.toFixed(0)}% of tackles ({(sortedTeamB[0]?.tacklesTotal - sortedTeamB[0]?.tacklesMissed)}/{sortedTeamB[0]?.tacklesTotal})</strong>, providing crucial stops when {cleanTeamB} was under pressure.</>
                   )}
                   {sortedTeamB[0]?.passesTotal > 0 && (
                     <> Their <strong>{sortedTeamB[0]?.passAccuracyPct.toFixed(0)}% pass accuracy</strong> kept {cleanTeamB}'s attacks flowing smoothly.</>
                   )}
                   {sortedTeamB[0]?.ballCarriesTotal > 0 && (
                     <> With <strong>{sortedTeamB[0]?.ballCarriesTotal} carries at {sortedTeamB[0]?.carryDominancePct.toFixed(0)}% dominance</strong>, they consistently gained ground in contact.</>
                   )}
                 </p>
               </div>
             </div>
           </div>

           {/* Key Battles */}
           <div>
             <h3 className="text-lg font-semibold text-scrummy-navyBlue mb-3">Key Positional Battles</h3>
             <div className="space-y-3 text-scrummy-navyBlue/80">
               {(() => {
                 const scrumHalves = [...sortedTeamA, ...sortedTeamB].filter(p => p.playerNumber === 9);
                 if (scrumHalves.length === 2) {
                   const [sh1, sh2] = scrumHalves;
                   const teamAsh = sh1.team === cleanTeamA ? sh1 : sh2;
                   const teamBsh = sh1.team === cleanTeamA ? sh2 : sh1;
                   return (
                     <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-l-4 border-green-400">
                       <h4 className="font-semibold text-green-800 mb-2">Scrum-half Showdown</h4>
                       <p className="leading-relaxed">
                         <strong>{teamAsh.playerCode}</strong> ({cleanTeamA}) vs <strong>{teamBsh.playerCode}</strong> ({cleanTeamB}) - The battle for game control. 
                         {teamAsh.playerCode} distributed <strong>{teamAsh.passesAccurate}/{teamAsh.passesTotal} passes at {teamAsh.passAccuracyPct.toFixed(0)}%</strong> compared to 
                         {teamBsh.playerCode}'s <strong>{teamBsh.passesAccurate}/{teamBsh.passesTotal} at {teamBsh.passAccuracyPct.toFixed(0)}%</strong>. 
                         {teamAsh.passAccuracyPct > teamBsh.passAccuracyPct ? (
                           <> {teamAsh.playerCode}'s superior accuracy gave {cleanTeamA} cleaner ball and better attacking platforms.</>
                         ) : (
                           <> {teamBsh.playerCode}'s precision distribution kept {cleanTeamB} competitive in the territorial battle.</>
                         )}
                       </p>
                     </div>
                   );
                 }
                 return null;
               })()}

               {(() => {
                 const flyHalves = [...sortedTeamA, ...sortedTeamB].filter(p => p.playerNumber === 10);
                 if (flyHalves.length === 2) {
                   const [fh1, fh2] = flyHalves;
                   const teamAfh = fh1.team === cleanTeamA ? fh1 : fh2;
                   const teamBfh = fh1.team === cleanTeamA ? fh2 : fh1;
                   return (
                     <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-3 rounded-lg border-l-4 border-purple-400">
                       <h4 className="font-semibold text-purple-800 mb-2">Fly-half Tactical Duel</h4>
                       <p className="leading-relaxed">
                         <strong>{teamAfh.playerCode}</strong> vs <strong>{teamBfh.playerCode}</strong> - The tactical masterminds. 
                         Kicking battle: {teamAfh.playerCode} landed <strong>{teamAfh.kicksGood}/{teamAfh.kicksTotal} ({teamAfh.kickSuccessPct.toFixed(0)}%)</strong> 
                         while {teamBfh.playerCode} managed <strong>{teamBfh.kicksGood}/{teamBfh.kicksTotal} ({teamBfh.kickSuccessPct.toFixed(0)}%)</strong>. 
                         {teamAfh.kickSuccessPct > teamBfh.kickSuccessPct ? (
                           <> {teamAfh.playerCode}'s superior boot control gave {cleanTeamA} crucial territorial advantage and field position dominance.</>
                         ) : (
                           <> {teamBfh.playerCode}'s tactical kicking kept {cleanTeamB} in the territorial contest despite other pressures.</>
                         )}
                       </p>
                     </div>
                   );
                 }
                 return null;
               })()}
             </div>
           </div>

           {/* Performance Highlights */}
           <div>
             <h3 className="text-lg font-semibold text-scrummy-navyBlue mb-3">Performance Highlights</h3>
             <div className="space-y-3 text-scrummy-navyBlue/80">
               {(() => {
                 const bestPasser = [...sortedTeamA, ...sortedTeamB]
                   .filter(p => p.passesTotal >= 5)
                   .sort((a, b) => b.passAccuracyPct - a.passAccuracyPct)[0];
                 return bestPasser && (
                   <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border-l-4 border-cyan-400">
                     <h4 className="font-semibold text-cyan-800 mb-2">Distribution Master</h4>
                     <p className="leading-relaxed">
                       <strong>{bestPasser.playerCode} ({getPositionName(bestPasser.playerNumber)})</strong> achieved exceptional 
                       <strong> {bestPasser.passAccuracyPct.toFixed(0)}% pass accuracy</strong> with {bestPasser.passesAccurate}/{bestPasser.passesTotal} completions. 
                       This clinical distribution was the foundation of their team's attacking structure, as every accurate pass maintained momentum and created space for teammates. 
                       The {getPositionName(bestPasser.playerNumber)} position demands this precision, and {bestPasser.playerCode} delivered when it mattered most.
                     </p>
                   </div>
                 );
               })()}

               {(() => {
                 const bestTackler = [...sortedTeamA, ...sortedTeamB]
                   .filter(p => p.tacklesTotal >= 5)
                   .sort((a, b) => b.tackleSuccessPct - a.tackleSuccessPct)[0];
                 return bestTackler && (
                   <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border-l-4 border-red-400">
                     <h4 className="font-semibold text-red-800 mb-2">Defensive Wall</h4>
                     <p className="leading-relaxed">
                       <strong>{bestTackler.playerCode} ({getPositionName(bestTackler.playerNumber)})</strong> was a defensive fortress with 
                       <strong> {bestTackler.tackleSuccessPct.toFixed(0)}% tackle success</strong> ({bestTackler.tacklesTotal - bestTackler.tacklesMissed}/{bestTackler.tacklesTotal} completions). 
                       This dominant tackling performance disrupted the opposition's attacking rhythm and forced them into errors. 
                       Their {bestTackler.tackleSuccessPct.toFixed(0)}% success rate shows they rarely missed their target, providing the platform for turnovers and counter-attacks.
                     </p>
                   </div>
                 );
               })()}
             </div>
           </div>

           {/* Areas for Development */}
           <div>
             <h3 className="text-lg font-semibold text-scrummy-navyBlue mb-3">Development Areas</h3>
             <div className="space-y-3 text-scrummy-navyBlue/80">
               {(() => {
                 const strugglers = [...sortedTeamA, ...sortedTeamB]
                   .filter(p => (p.tackleSuccessPct < 60 && p.tacklesTotal > 0) || p.errors >= 2)
                   .slice(0, 2);
                 
                 return strugglers.length > 0 ? strugglers.map((player, index) => (
                   <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg border-l-4 border-orange-400">
                     <h4 className="font-semibold text-orange-800 mb-2">
                       {player.playerCode} ({getPositionName(player.playerNumber)}) - {player.team}
                     </h4>
                     <p className="leading-relaxed">
                       {player.tackleSuccessPct < 60 && player.tacklesTotal > 0 && (
                         <>
                           Struggled defensively with only <strong>{player.tackleSuccessPct.toFixed(0)}% tackle success</strong> 
                           ({player.tacklesTotal - player.tacklesMissed}/{player.tacklesTotal}). As a {getPositionName(player.playerNumber)}, 
                           this position requires solid defensive reads and technique. The missed tackles likely came from poor body position or 
                           rushing the contact, allowing attackers to offload or break through the line.
                         </>
                       )}
                       {player.errors >= 2 && (
                         <>
                           {player.tackleSuccessPct < 60 ? ' Additionally, their ' : ''}
                           <strong>{player.errors} handling errors</strong> disrupted team momentum at crucial moments. 
                           These errors suggest decision-making under pressure needs improvement, possibly rushing plays instead of securing possession first.
                         </>
                       )}
                     </p>
                   </div>
                 )) : (
                   <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-l-4 border-green-400">
                     <p className="leading-relaxed">
                       Outstanding performance across both teams - all players maintained high standards with minimal errors and strong execution rates. 
                       This speaks to the quality of coaching and preparation from both schools.
                     </p>
                   </div>
                 );
               })()}
             </div>
           </div>

           {/* Game Impact Summary */}
           <div>
             <h3 className="text-lg font-semibold text-scrummy-navyBlue mb-3">Match Defining Factors</h3>
             <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border-l-4 border-gray-400">
               <p className="text-scrummy-navyBlue/80 leading-relaxed">
                 {cleanTeamA}'s victory was built on superior work rate and clinical execution in key moments. 
                 Their forward pack's dominance in the contact area, combined with accurate distribution from the half-backs, 
                 created the platform for their attacking success. The {((sortedTeamA.reduce((sum, p) => sum + p.totalActions, 0) / sortedTeamA.length) - (sortedTeamB.reduce((sum, p) => sum + p.totalActions, 0) / sortedTeamB.length)).toFixed(0)} 
                 action differential per player highlights {cleanTeamA}'s higher intensity and involvement throughout the match. 
                 {cleanTeamB} showed resilience in defense but struggled to match the pace and precision of {cleanTeamA}'s attacking phases.
               </p>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default PlayerBoxScore;