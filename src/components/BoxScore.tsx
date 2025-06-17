import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { TeamStats, TryScore, KickAtGoal } from "@/lib/boxScoreData";

// Types for our box score data
type BoxScoreProps = {
  matchInfo: {
    teamA: string;
    teamB: string;
    venue: string;
    date: string;
    kickoff: string;
    weather: string;
  };
  teamASummary: TeamStats;
  teamBSummary: TeamStats;
  tryDataA?: TryScore[];
  tryDataB?: TryScore[];
  kickDataA?: KickAtGoal[];
  kickDataB?: KickAtGoal[];
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
  "WATERSHED": "/assets/Watershed.png",
  "HELLENIC": "/assets/Hellenic.png",
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
  "LOMAGUNDI": "/assets/Lomagundi.png",
  "ST ALBANS 1XV": "/assets/StAlbans.png",
  "ST GEORGE'S 1XV": "/assets/StGeorges.png",
  "ST GEORGE'S": "/assets/StGeorges.png",
  "ST ANDREW'S 1XV": "/assets/StAndrews.png",
  "CBC 2XV": "/assets/CBC.png",
  "PRINCE EDWARD 1XV": "/assets/PrinceEdward.png",
  "CBC 1XV": "/assets/CBC.png",
  "FALCON 1XV": "/assets/Falcon.png",
  "FALCON": "/assets/Falcon.png",
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

// Card component for showing possession stats
const PossessionCard: React.FC<{
  teamA: string;
  teamB: string;
  possessionA: number;
  possessionB: number;
}> = ({ teamA, teamB, possessionA, possessionB }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-3 md:mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
        Possession
      </h2>

      <div className="relative pt-10 pb-2">
        {/* Team names at top */}
        <div className="absolute top-0 left-0 flex justify-between w-full px-2">
          <span className="font-bold text-sm md:text-base text-blue-700">{teamA}</span>
          <span className="font-bold text-sm md:text-base text-cyan-600">{teamB}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-10 md:h-14 bg-gray-100 rounded-lg overflow-hidden flex shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white font-bold relative"
            style={{ width: `${possessionA}%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg md:text-xl drop-shadow-md">{possessionA}%</span>
            </div>
            <div className="absolute right-0 h-full w-0.5 bg-white"></div>
          </div>
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 flex items-center justify-center text-white font-bold relative"
            style={{ width: `${possessionB}%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg md:text-xl drop-shadow-md">{possessionB}%</span>
            </div>
          </div>
        </div>

        {/* Additional context */}
        <div className="mt-3 text-center text-xs md:text-sm text-gray-500">
          Based on time with ball in play
        </div>
      </div>
    </div>
  );
};

// Dot visualization component
const DotVisualizer: React.FC<{
  count: number;
  colorClass: string;
  size?: 'sm' | 'md';
  max?: number;
}> = ({ count, colorClass, size = 'md', max = 15 }) => {
  // If we have too many dots, we'll show a number instead
  if (count > max) {
    return (
      <div className={`inline-flex items-center justify-center ${colorClass} text-white rounded-full font-bold px-2.5 py-1`}>
        {count}
      </div>
    );
  }
  
  // For smaller counts, show animated dots
  const dots = Array.from({ length: count }, (_, i) => i);
  const sizeClass = size === 'sm' ? 'w-3 h-3 md:w-4 md:h-4' : 'w-4 h-4 md:w-5 md:h-5';
  
  return (
    <div className="flex flex-wrap gap-1.5 justify-center">
      {dots.map((_, i) => (
        <div 
          key={i} 
          className={`${sizeClass} rounded-full ${colorClass} shadow-sm transition-all duration-300 ease-in-out`}
          style={{ 
            animationDelay: `${i * 0.05}s`,
            animation: 'pulse 2s infinite' 
          }}
        ></div>
      ))}
    </div>
  );
};

// Penalties Card component
const PenaltiesCard: React.FC<{
  teamA: string;
  teamB: string;
  penaltiesA: number;
  penaltiesB: number;
  attackingPenaltiesA?: number;
  attackingPenaltiesB?: number;
  defensivePenaltiesA?: number;
  defensivePenaltiesB?: number;
  scrumPenaltiesA?: number;
  scrumPenaltiesB?: number;
  penaltyCausesA?: {
    offside?: number;
    ruckOffence?: number;
    notReleasePlayer?: number;
    violentFoulPlay?: number;
    notReleasingBall?: number;
    dangerousTackle?: number;
    scrum?: number;
  };
  penaltyCausesB?: {
    offside?: number;
    ruckOffence?: number;
    notReleasePlayer?: number;
    violentFoulPlay?: number;
    notReleasingBall?: number;
    dangerousTackle?: number;
    scrum?: number;
  };
}> = ({ 
  teamA, teamB, penaltiesA, penaltiesB, 
  attackingPenaltiesA = 0, attackingPenaltiesB = 0,
  defensivePenaltiesA = 0, defensivePenaltiesB = 0, 
  scrumPenaltiesA = 0, scrumPenaltiesB = 0,
  penaltyCausesA = {}, penaltyCausesB = {}
}) => {
  
  // Helper component for penalty category
  const PenaltyCategory = ({ title, teamACount, teamBCount, isLast = false }: { 
    title: string; 
    teamACount: number; 
    teamBCount: number;
    isLast?: boolean;
  }) => (
    <div className={`${!isLast ? 'mb-5' : ''}`}>
      <div className="text-center font-semibold mb-2 text-gray-700">{title}</div>
      <div className="grid grid-cols-2 gap-1">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-2 shadow-sm">
          <DotVisualizer count={teamACount} colorClass="bg-blue-600" />
          <div className="text-center text-blue-700 font-bold mt-3 flex items-center justify-center gap-1.5">
            <span className="text-lg">{teamACount}</span>
            <span className="text-xs text-blue-600">Penalties</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-cyan-50 rounded-lg p-2 shadow-sm">
          <DotVisualizer count={teamBCount} colorClass="bg-cyan-500" />
          <div className="text-center text-cyan-700 font-bold mt-3 flex items-center justify-center gap-1.5">
            <span className="text-lg">{teamBCount}</span>
            <span className="text-xs text-cyan-600">Penalties</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-4 md:mb-5 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
        Penalties Conceded
      </h2>
      
      <div className="relative">
        <div className="absolute -top-2 left-0 flex justify-between w-full px-2">
          <span className="font-bold text-sm text-blue-700">{teamA}</span>
          <span className="font-bold text-sm text-cyan-600">{teamB}</span>
        </div>
        
        <div className="pt-4">
          {/* All Penalties */}
          <PenaltyCategory 
            title="All Penalties" 
            teamACount={penaltiesA} 
            teamBCount={penaltiesB} 
          />
          
          {/* Attacking Penalties */}
          <PenaltyCategory 
            title="Attacking Penalties" 
            teamACount={attackingPenaltiesA} 
            teamBCount={attackingPenaltiesB} 
          />
          
          {/* Defensive Penalties */}
          <PenaltyCategory 
            title="Defensive Penalties" 
            teamACount={defensivePenaltiesA} 
            teamBCount={defensivePenaltiesB} 
          />
          
          {/* Scrum Penalties */}
          <PenaltyCategory 
            title="Scrum Penalties" 
            teamACount={scrumPenaltiesA} 
            teamBCount={scrumPenaltiesB}
          />
          
          {/* Penalty Causes */}
          {(Object.values(penaltyCausesA).some(v => v && v > 0) || 
           Object.values(penaltyCausesB).some(v => v && v > 0)) && (
            <div className="mt-6">
              <h3 className="text-center font-bold text-gray-700 mb-4">Penalty Causes</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {penaltyCausesA.offside && (
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span>Offside</span>
                      <span className="font-bold">{penaltyCausesA.offside}</span>
        </div>
                  )}
                  {penaltyCausesA.ruckOffence && (
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span>Ruck Offence</span>
                      <span className="font-bold">{penaltyCausesA.ruckOffence}</span>
                    </div>
                  )}
                  {penaltyCausesA.notReleasePlayer && (
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span>Not Release Player</span>
                      <span className="font-bold">{penaltyCausesA.notReleasePlayer}</span>
                    </div>
                  )}
                  {penaltyCausesA.violentFoulPlay && (
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span>Violent Play</span>
                      <span className="font-bold">{penaltyCausesA.violentFoulPlay}</span>
                    </div>
                  )}
                  {penaltyCausesA.notReleasingBall && (
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span>Not Release Ball</span>
                      <span className="font-bold">{penaltyCausesA.notReleasingBall}</span>
                    </div>
                  )}
                  {penaltyCausesA.dangerousTackle && (
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span>Dangerous Tackle</span>
                      <span className="font-bold">{penaltyCausesA.dangerousTackle}</span>
                    </div>
                  )}
                  {penaltyCausesA.scrum && (
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span>Scrum</span>
                      <span className="font-bold">{penaltyCausesA.scrum}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  {penaltyCausesB.offside && (
                    <div className="flex justify-between bg-cyan-50 p-2 rounded">
                      <span>Offside</span>
                      <span className="font-bold">{penaltyCausesB.offside}</span>
                    </div>
                  )}
                  {penaltyCausesB.ruckOffence && (
                    <div className="flex justify-between bg-cyan-50 p-2 rounded">
                      <span>Ruck Offence</span>
                      <span className="font-bold">{penaltyCausesB.ruckOffence}</span>
                    </div>
                  )}
                  {penaltyCausesB.notReleasePlayer && (
                    <div className="flex justify-between bg-cyan-50 p-2 rounded">
                      <span>Not Release Player</span>
                      <span className="font-bold">{penaltyCausesB.notReleasePlayer}</span>
                    </div>
                  )}
                  {penaltyCausesB.violentFoulPlay && (
                    <div className="flex justify-between bg-cyan-50 p-2 rounded">
                      <span>Violent Play</span>
                      <span className="font-bold">{penaltyCausesB.violentFoulPlay}</span>
                    </div>
                  )}
                  {penaltyCausesB.notReleasingBall && (
                    <div className="flex justify-between bg-cyan-50 p-2 rounded">
                      <span>Not Release Ball</span>
                      <span className="font-bold">{penaltyCausesB.notReleasingBall}</span>
                    </div>
                  )}
                  {penaltyCausesB.dangerousTackle && (
                    <div className="flex justify-between bg-cyan-50 p-2 rounded">
                      <span>Dangerous Tackle</span>
                      <span className="font-bold">{penaltyCausesB.dangerousTackle}</span>
                    </div>
                  )}
                  {penaltyCausesB.scrum && (
                    <div className="flex justify-between bg-cyan-50 p-2 rounded">
                      <span>Scrum</span>
                      <span className="font-bold">{penaltyCausesB.scrum}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Scrum and Lineout Card component
const ScrumLineoutCard: React.FC<{
  teamA: string;
  teamB: string;
  scrumsA: { total: number; won: number };
  scrumsB: { total: number; won: number };
  lineoutsA: { total: number; won: number };
  lineoutsB: { total: number; won: number };
  turnoversA: number;
  turnoversB: number;
  knockOnsA: number;
  knockOnsB: number;
}> = ({ 
  teamA, teamB, 
  scrumsA, scrumsB, 
  lineoutsA, lineoutsB,
  turnoversA, turnoversB,
  knockOnsA, knockOnsB
}) => {
  
  // Calculate retention percentages
  const scrumRetentionA = scrumsA.total ? Math.round((scrumsA.won / scrumsA.total) * 100) : 0;
  const scrumRetentionB = scrumsB.total ? Math.round((scrumsB.won / scrumsB.total) * 100) : 0;
  const lineoutRetentionA = lineoutsA.total ? Math.round((lineoutsA.won / lineoutsA.total) * 100) : 0;
  const lineoutRetentionB = lineoutsB.total ? Math.round((lineoutsB.won / lineoutsB.total) * 100) : 0;
  
  // Helper to create arc progress indicator
  const CircularProgress = ({ 
    percent, 
    colorClass, 
    size = 70, 
    won, 
    total 
  }: { 
    percent: number, 
    colorClass: string, 
    size?: number, 
    won: number, 
    total: number 
  }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percent / 100) * circumference;
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="fill-transparent stroke-gray-200"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`fill-transparent ${colorClass}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Text inside circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-lg font-bold">{percent}%</span>
          <span className="text-xs">{won}/{total}</span>
        </div>
      </div>
    );
  };
  
  // Stat Category component
  const StatCategory = ({ 
    title, 
    iconSrc = '', 
    isCircular = false,
    teamAData,
    teamBData,
    isLast = false 
  }: { 
    title: string;
    iconSrc?: string;
    isCircular?: boolean;
    teamAData: {
      count?: number;
      percent?: number;
      won?: number;
      total?: number;
      label?: string;
    };
    teamBData: {
      count?: number;
      percent?: number;
      won?: number;
      total?: number;
      label?: string;
    };
    isLast?: boolean;
  }) => (
    <div className={`${!isLast ? 'mb-6' : ''}`}>
      <div className="flex items-center justify-center mb-3">
        <h3 className="text-center font-bold text-gray-700 text-lg">
          {title}
        </h3>
        {iconSrc && (
          <img src={iconSrc} alt={title} className="h-6 w-6 ml-2" />
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {isCircular ? (
          <>
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-3 shadow-sm flex flex-col items-center">
              <CircularProgress 
                percent={teamAData.percent || 0} 
                colorClass="stroke-blue-600" 
                won={teamAData.won || 0} 
                total={teamAData.total || 0} 
              />
              <div className="mt-2 text-center">
                <div className="text-blue-700 font-bold">{teamA}</div>
                <div className="text-xs text-blue-600">{teamAData.label || ''}</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-cyan-50 rounded-lg p-3 shadow-sm flex flex-col items-center">
              <CircularProgress 
                percent={teamBData.percent || 0} 
                colorClass="stroke-cyan-500" 
                won={teamBData.won || 0} 
                total={teamBData.total || 0} 
              />
              <div className="mt-2 text-center">
                <div className="text-cyan-700 font-bold">{teamB}</div>
                <div className="text-xs text-cyan-600">{teamBData.label || ''}</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-3 shadow-sm">
              <div className="flex flex-col items-center">
                <DotVisualizer count={teamAData.count || 0} colorClass="bg-blue-600" />
                <div className="mt-3 text-center">
                  <div className="text-lg font-bold text-blue-700">{teamAData.count}</div>
                  <div className="text-xs text-blue-600">{teamAData.label || title}</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-cyan-50 rounded-lg p-3 shadow-sm">
              <div className="flex flex-col items-center">
                <DotVisualizer count={teamBData.count || 0} colorClass="bg-cyan-500" />
                <div className="mt-3 text-center">
                  <div className="text-lg font-bold text-cyan-700">{teamBData.count}</div>
                  <div className="text-xs text-cyan-600">{teamBData.label || title}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-4 md:mb-6 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
        Set Piece Performance
      </h2>
      
      <div className="space-y-6">
        {/* Scrums */}
        <StatCategory 
          title="Scrums" 
          isCircular={true}
          teamAData={{
            percent: scrumRetentionA,
            won: scrumsA.won,
            total: scrumsA.total,
            label: "Success rate"
          }}
          teamBData={{
            percent: scrumRetentionB,
            won: scrumsB.won,
            total: scrumsB.total,
            label: "Success rate"
          }}
        />
        
        {/* Lineouts */}
        <StatCategory 
          title="Lineouts"
          isCircular={true}
          teamAData={{
            percent: lineoutRetentionA,
            won: lineoutsA.won,
            total: lineoutsA.total,
            label: "Success rate"
          }}
          teamBData={{
            percent: lineoutRetentionB,
            won: lineoutsB.won,
            total: lineoutsB.total,
            label: "Success rate"
          }}
        />
        
        {/* Turnovers */}
        <StatCategory 
          title="Turnovers"
          teamAData={{
            count: turnoversA,
            label: "Conceded"
          }}
          teamBData={{
            count: turnoversB,
            label: "Conceded"
          }}
        />
        
        {/* Knock-Ons */}
        <StatCategory 
          title="Knock-Ons & Forward Passes"
          teamAData={{
            count: knockOnsA,
            label: "Errors"
          }}
          teamBData={{
            count: knockOnsB,
            label: "Errors"
          }}
          isLast={true}
        />
      </div>
    </div>
  );
};

// Scoring card component
const ScoringCard: React.FC<{
  teamA: string;
  teamB: string;
  triesA: TryScore[];
  triesB: TryScore[];
  kicksAtGoalA: Array<{x: number; y: number; successful: boolean}>;
  kicksAtGoalB: Array<{x: number; y: number; successful: boolean}>;
}> = ({ teamA, teamB, triesA, triesB, kicksAtGoalA, kicksAtGoalB }) => {
  
  // Calculate points properly accounting for penalties
  const calculatePoints = (tries: TryScore[]) => {
    let points = 0;
    tries.forEach(t => {
      if (t.isPenalty) {
        // Penalty kicks are 3 points
        points += 3;
      } else {
        // Regular tries are 5 points
        points += 5;
        // Add 2 points for conversions
        if (t.hasConversion) points += 2;
      }
    });
    return points;
  };

  const teamAPoints = calculatePoints(triesA);
  const teamBPoints = calculatePoints(triesB);
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-4 md:mb-6 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
        Scoring Summary
      </h2>
      
      {/* Points total */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="text-center">
          <h3 className="font-bold text-blue-700 text-base md:text-lg mb-1">{teamA}</h3>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-4xl font-bold text-blue-700">
              {teamAPoints}
            </div>
            <div className="text-sm text-blue-600">Points</div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-bold text-cyan-600 text-base md:text-lg mb-1">{teamB}</h3>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-4xl font-bold text-cyan-600">
              {teamBPoints}
            </div>
            <div className="text-sm text-cyan-600">Points</div>
          </div>
        </div>
      </div>
      
      {/* Score details */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h3 className="font-bold text-blue-700 text-base mb-2">Tries Scored</h3>
          <div className="space-y-2">
            {triesA.map((tryScore, i) => (
              <div key={i} className="flex items-center p-2 rounded bg-blue-50">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mr-3">
                  {tryScore.isPenalty ? "P" : "T"}
                </div>
                <div className="flex-1">
                  {tryScore.isPenalty 
                    ? "Penalty" 
                    : tryScore.hasConversion 
                      ? "Try + Conv" 
                      : "Try"}
                </div>
                <div className="font-mono text-sm">{tryScore.time}</div>
              </div>
            ))}
            {triesA.length === 0 && (
              <div className="p-2 text-gray-500 italic text-center">No tries scored</div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-cyan-600 text-base mb-2">Tries Scored</h3>
          <div className="space-y-2">
            {triesB.map((tryScore, i) => (
              <div key={i} className="flex items-center p-2 rounded bg-cyan-50">
                <div className="w-7 h-7 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-bold mr-3">
                  {tryScore.isPenalty ? "P" : "T"}
                </div>
                <div className="flex-1">
                  {tryScore.isPenalty 
                    ? "Penalty" 
                    : tryScore.hasConversion 
                      ? "Try + Conv" 
                      : "Try"}
                </div>
                <div className="font-mono text-sm">{tryScore.time}</div>
              </div>
            ))}
            {triesB.length === 0 && (
              <div className="p-2 text-gray-500 italic text-center">No tries scored</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Kicks visualization */}
      <div>
        <h3 className="text-center font-semibold text-lg text-gray-700 mb-3">Kicks At Goal</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-center text-sm text-blue-700 font-semibold mb-2">{teamA}</div>
            {/* Simple kick visualization */}
            <div className="relative w-full bg-green-600 rounded-lg" style={{ height: "120px" }}>
              {/* Goal posts */}
              <div className="absolute top-0 left-1/2 h-6 w-0.5 bg-white transform -translate-x-1/2"></div>
              <div className="absolute top-0 left-1/2 w-8 h-0.5 bg-white transform -translate-x-1/2"></div>
              
              {/* Field markings */}
              <div className="absolute top-0 left-1/4 h-full w-0.5 bg-white opacity-20"></div>
              <div className="absolute top-0 left-1/2 h-full w-0.5 bg-white opacity-20"></div>
              <div className="absolute top-0 left-3/4 h-full w-0.5 bg-white opacity-20"></div>
              <div className="absolute top-1/3 left-0 h-0.5 w-full bg-white opacity-20"></div>
              <div className="absolute top-2/3 left-0 h-0.5 w-full bg-white opacity-20"></div>
              
              {/* Kicks */}
              {kicksAtGoalA.map((kick, i) => (
                <div 
                  key={i} 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    top: `${kick.y * 100}%`, 
                    left: `${kick.x * 100}%`,
                  }}
                >
                  {kick.successful ? 
                    <span className="text-green-300 text-2xl">✓</span> : 
                    <span className="text-red-300 text-2xl">✗</span>
                  }
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-center text-sm text-cyan-700 font-semibold mb-2">{teamB}</div>
            {/* Simple kick visualization */}
            <div className="relative w-full bg-green-600 rounded-lg" style={{ height: "120px" }}>
              {/* Goal posts */}
              <div className="absolute top-0 left-1/2 h-6 w-0.5 bg-white transform -translate-x-1/2"></div>
              <div className="absolute top-0 left-1/2 w-8 h-0.5 bg-white transform -translate-x-1/2"></div>
              
              {/* Field markings */}
              <div className="absolute top-0 left-1/4 h-full w-0.5 bg-white opacity-20"></div>
              <div className="absolute top-0 left-1/2 h-full w-0.5 bg-white opacity-20"></div>
              <div className="absolute top-0 left-3/4 h-full w-0.5 bg-white opacity-20"></div>
              <div className="absolute top-1/3 left-0 h-0.5 w-full bg-white opacity-20"></div>
              <div className="absolute top-2/3 left-0 h-0.5 w-full bg-white opacity-20"></div>
              
              {/* Kicks */}
              {kicksAtGoalB.map((kick, i) => (
                <div 
                  key={i} 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    top: `${kick.y * 100}%`, 
                    left: `${kick.x * 100}%`,
                  }}
                >
                  {kick.successful ? 
                    <span className="text-green-300 text-2xl">✓</span> : 
                    <span className="text-red-300 text-2xl">✗</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cards Card component
const CardsCard: React.FC<{
  teamA: string;
  teamB: string;
  cardsA?: { yellow: number; red: number };
  cardsB?: { yellow: number; red: number };
}> = ({ teamA, teamB, cardsA = { yellow: 0, red: 0 }, cardsB = { yellow: 0, red: 0 } }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-3 md:mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
        Cards Conceded
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Team A Cards */}
        <div className="text-center">
          <h3 className="font-bold text-blue-700 text-base md:text-lg mb-2">{teamA}</h3>
          <div className="flex justify-center gap-4 mb-3">
            {/* Yellow Cards */}
            {cardsA.yellow > 0 && Array.from({ length: cardsA.yellow }).map((_, i) => (
              <div key={`yellow-${i}`} className="w-10 h-14 md:w-12 md:h-16 bg-yellow-400 rounded-md shadow-md"></div>
            ))}
            {/* Red Cards */}
            {cardsA.red > 0 && Array.from({ length: cardsA.red }).map((_, i) => (
              <div key={`red-${i}`} className="w-10 h-14 md:w-12 md:h-16 bg-red-600 rounded-md shadow-md"></div>
            ))}
            {cardsA.yellow === 0 && cardsA.red === 0 && (
              <div className="text-gray-500 italic">No cards</div>
            )}
          </div>
        </div>

        {/* Team B Cards */}
        <div className="text-center">
          <h3 className="font-bold text-cyan-600 text-base md:text-lg mb-2">{teamB}</h3>
          <div className="flex justify-center gap-4 mb-3">
            {/* Yellow Cards */}
            {cardsB.yellow > 0 && Array.from({ length: cardsB.yellow }).map((_, i) => (
              <div key={`yellow-${i}`} className="w-10 h-14 md:w-12 md:h-16 bg-yellow-400 rounded-md shadow-md"></div>
            ))}
            {/* Red Cards */}
            {cardsB.red > 0 && Array.from({ length: cardsB.red }).map((_, i) => (
              <div key={`red-${i}`} className="w-10 h-14 md:w-12 md:h-16 bg-red-600 rounded-md shadow-md"></div>
            ))}
            {cardsB.yellow === 0 && cardsB.red === 0 && (
              <div className="text-gray-500 italic">No cards</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Kicks Card component
const KicksCard: React.FC<{
  teamA: string;
  teamB: string;
  kicksA?: {
    fromHand?: { total: number; reclaimed: number };
    inField?: { total: number; reclaimed: number };
    toTouch?: { total: number };
    success?: { total: number; successful: number };
  };
  kicksB?: {
    fromHand?: { total: number; reclaimed: number };
    inField?: { total: number; reclaimed: number };
    toTouch?: { total: number };
    success?: { total: number; successful: number };
  };
}> = ({ 
  teamA, 
  teamB, 
  kicksA = { fromHand: { total: 0, reclaimed: 0 }, inField: { total: 0, reclaimed: 0 }, toTouch: { total: 0 }, success: { total: 0, successful: 0 } }, 
  kicksB = { fromHand: { total: 0, reclaimed: 0 }, inField: { total: 0, reclaimed: 0 }, toTouch: { total: 0 }, success: { total: 0, successful: 0 } } 
}) => {
  
  // Helper for kick percentages
  const formatPercentage = (num: number, denom: number) => {
    if (!denom) return '0%';
    return `${Math.round((num / denom) * 100)}%`;
  };
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-4 md:mb-6 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
        Kicking Performance
      </h2>
      
      <div className="space-y-6">
        {/* Kicks from Hand */}
        <div>
          <h3 className="font-semibold text-center text-gray-700 mb-3">Kicks from Hand</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-3 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">{kicksA.fromHand?.total || 0}</div>
                <div className="text-sm text-blue-600">Total Kicks</div>
                <div className="text-xs text-gray-500 mt-1">
                  {kicksA.fromHand?.reclaimed || 0} Reclaimed ({formatPercentage(kicksA.fromHand?.reclaimed || 0, kicksA.fromHand?.total || 1)})
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-cyan-50 rounded-lg p-3 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-700">{kicksB.fromHand?.total || 0}</div>
                <div className="text-sm text-cyan-600">Total Kicks</div>
                <div className="text-xs text-gray-500 mt-1">
                  {kicksB.fromHand?.reclaimed || 0} Reclaimed ({formatPercentage(kicksB.fromHand?.reclaimed || 0, kicksB.fromHand?.total || 1)})
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Kicks in Field */}
        <div>
          <h3 className="font-semibold text-center text-gray-700 mb-3">Kicks in Field</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-3 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">{kicksA.inField?.total || 0}</div>
                <div className="text-sm text-blue-600">Total Kicks</div>
                <div className="text-xs text-gray-500 mt-1">
                  {kicksA.inField?.reclaimed || 0} Reclaimed ({formatPercentage(kicksA.inField?.reclaimed || 0, kicksA.inField?.total || 1)})
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-cyan-50 rounded-lg p-3 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-700">{kicksB.inField?.total || 0}</div>
                <div className="text-sm text-cyan-600">Total Kicks</div>
                <div className="text-xs text-gray-500 mt-1">
                  {kicksB.inField?.reclaimed || 0} Reclaimed ({formatPercentage(kicksB.inField?.reclaimed || 0, kicksB.inField?.total || 1)})
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Kicks to Touch */}
        <div>
          <h3 className="font-semibold text-center text-gray-700 mb-3">Kicks to Touch</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-3 shadow-sm text-center">
              <div className="text-3xl font-bold text-blue-700">{kicksA.toTouch?.total || 0}</div>
              <div className="text-sm text-blue-600">Kicks</div>
            </div>
            <div className="bg-gradient-to-br from-white to-cyan-50 rounded-lg p-3 shadow-sm text-center">
              <div className="text-3xl font-bold text-cyan-700">{kicksB.toTouch?.total || 0}</div>
              <div className="text-sm text-cyan-600">Kicks</div>
            </div>
          </div>
        </div>
        
        {/* Kicking Success Rate */}
        <div>
          <h3 className="font-semibold text-center text-gray-700 mb-3">Kicking Success Rate</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-3 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">{formatPercentage(kicksA.success?.successful || 0, kicksA.success?.total || 1)}</div>
                <div className="text-sm text-blue-600">{kicksA.success?.successful || 0}/{kicksA.success?.total || 0} Successful</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-cyan-50 rounded-lg p-3 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-700">{formatPercentage(kicksB.success?.successful || 0, kicksB.success?.total || 1)}</div>
                <div className="text-sm text-cyan-600">{kicksB.success?.successful || 0}/{kicksB.success?.total || 0} Successful</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mauls Card component
const MaulsCard: React.FC<{
  teamA: string;
  teamB: string;
  maulsA?: { total: number; won: number };
  maulsB?: { total: number; won: number };
}> = ({ teamA, teamB, maulsA = { total: 0, won: 0 }, maulsB = { total: 0, won: 0 } }) => {
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-scrummy-navyBlue mb-3 md:mb-4 font-orbitron border-b border-scrummy-lightblue pb-2 text-center">
        Mauls
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Team A Mauls */}
        <div className="text-center">
          <h3 className="font-bold text-blue-700 text-base md:text-lg mb-2">{teamA}</h3>
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-3 shadow-sm">
            {maulsA.total > 0 ? (
              <>
                <div className="text-2xl md:text-3xl font-bold text-blue-700">{maulsA.total}</div>
                <div className="text-sm text-blue-600">Mauls</div>
                <div className="text-xs text-gray-500 mt-1">
                  {maulsA.won} Won ({Math.round((maulsA.won / maulsA.total) * 100)}% Retained)
                </div>
              </>
            ) : (
              <div className="text-gray-500 italic py-2">No Mauls</div>
            )}
          </div>
        </div>

        {/* Team B Mauls */}
        <div className="text-center">
          <h3 className="font-bold text-cyan-600 text-base md:text-lg mb-2">{teamB}</h3>
          <div className="bg-gradient-to-br from-white to-cyan-50 rounded-lg p-3 shadow-sm">
            {maulsB.total > 0 ? (
              <>
                <div className="text-2xl md:text-3xl font-bold text-cyan-700">{maulsB.total}</div>
                <div className="text-sm text-cyan-600">Mauls</div>
                <div className="text-xs text-gray-500 mt-1">
                  {maulsB.won} Won ({Math.round((maulsB.won / maulsB.total) * 100)}% Retained)
                </div>
              </>
            ) : (
              <div className="text-gray-500 italic py-2">No Mauls</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to count tries, conversions, and penalty kicks from try data
function getTryStats(tryData: TryScore[] | undefined) {
  let tries = 0;
  let conversions = 0;
  let penalties = 0;
  if (!tryData) return { tries, conversions, penalties };
  for (const t of tryData) {
    if (t.isPenalty) {
      penalties++;
    } else {
      tries++;
      if (t.hasConversion) conversions++;
    }
  }
  return { tries, conversions, penalties };
}

const BoxScore: React.FC<BoxScoreProps> = ({
  matchInfo,
  teamASummary,
  teamBSummary,
  tryDataA,
  tryDataB,
  kickDataA,
  kickDataB
}) => {
  const cleanTeamA = cleanTeamName(matchInfo.teamA);
  const cleanTeamB = cleanTeamName(matchInfo.teamB);
  const isMobile = useIsMobile();

  // Calculate total points accounting for penalties properly
  const calculateTeamPoints = (triesData: TryScore[] | undefined) => {
    if (!triesData) return 0;
    
    let points = 0;
    
    // Count points from try data
    triesData.forEach(t => {
      if (t.isPenalty) {
        // Penalty kicks are 3 points
        points += 3;
      } else {
        // Regular tries are 5 points
        points += 5;
        // Add 2 points for conversions
        if (t.hasConversion) points += 2;
      }
    });
    
    return points;
  };
  
  // Use try data for calculating points
  const teamAPoints = calculateTeamPoints(tryDataA);
  const teamBPoints = calculateTeamPoints(tryDataB);

  // Default possession values if not provided
  const possessionA = teamASummary.possession || 50;
  const possessionB = teamBSummary.possession || 50;
  
  // Use actual penalty data from summary or fall back to default values
  const penaltiesA = teamASummary.penaltiesConceded || 5;
  const penaltiesB = teamBSummary.penaltiesConceded || 12;
  const attackingPenaltiesA = Math.floor(penaltiesA * 0.75);
  const attackingPenaltiesB = Math.floor(penaltiesB * 0.7);
  const defensivePenaltiesA = Math.floor(penaltiesA * 0.25);
  const defensivePenaltiesB = Math.floor(penaltiesB * 0.3);
  const scrumPenaltiesA = 0;
  const scrumPenaltiesB = 1;

  // Use actual scrum, lineout, turnovers and knock on data or fall back to default values
  const scrumsA = teamASummary.scrums || { total: 7, won: 7 };
  const scrumsB = teamBSummary.scrums || { total: 11, won: 9 }; 
  const lineoutsA = teamASummary.lineouts || { total: 9, won: 4 };
  const lineoutsB = teamBSummary.lineouts || { total: 2, won: 1 };
  const turnoversA = teamASummary.turnovers || 5;
  const turnoversB = teamBSummary.turnovers || 10;
  const knockOnsA = teamASummary.knockOns || 11;
  const knockOnsB = teamBSummary.knockOns || 6;

  // Use the actual try data from props or fall back to empty array
  const triesA = tryDataA || [];
  const triesB = tryDataB || [];
  
  // Use the actual kick data from props or fall back to empty array
  const kicksAtGoalA = kickDataA || [];
  const kicksAtGoalB = kickDataB || [];

  // Calculate try stats
  const tryStatsA = getTryStats(tryDataA);
  const tryStatsB = getTryStats(tryDataB);

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
          <div className="max-w-5xl mx-auto">
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
                      {teamAPoints} - {teamBPoints}
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
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
            {/* Possession Card */}
            <PossessionCard 
              teamA={cleanTeamA}
              teamB={cleanTeamB}
              possessionA={possessionA}
              possessionB={possessionB}
            />
            
            {/* Scoring Card */}
            <ScoringCard
              teamA={cleanTeamA}
              teamB={cleanTeamB}
              triesA={triesA}
              triesB={triesB}
              kicksAtGoalA={kicksAtGoalA}
              kicksAtGoalB={kicksAtGoalB}
            />
            
            {/* Cards Card - New */}
            <CardsCard
              teamA={cleanTeamA}
              teamB={cleanTeamB}
              cardsA={teamASummary.cards}
              cardsB={teamBSummary.cards}
            />
            
            {/* Kicks Card - New */}
            <KicksCard
              teamA={cleanTeamA}
              teamB={cleanTeamB}
              kicksA={teamASummary.kicks}
              kicksB={teamBSummary.kicks}
            />
            
            {/* Mauls Card - New */}
            <MaulsCard
              teamA={cleanTeamA}
              teamB={cleanTeamB}
              maulsA={teamASummary.mauls}
              maulsB={teamBSummary.mauls}
            />
            
            {/* Penalties Card */}
            <PenaltiesCard
              teamA={cleanTeamA}
              teamB={cleanTeamB}
              penaltiesA={penaltiesA}
              penaltiesB={penaltiesB}
              attackingPenaltiesA={teamASummary.attackingPenalties}
              attackingPenaltiesB={teamBSummary.attackingPenalties}
              defensivePenaltiesA={teamASummary.defensivePenalties}
              defensivePenaltiesB={teamBSummary.defensivePenalties}
              scrumPenaltiesA={teamASummary.scrumPenalties}
              scrumPenaltiesB={teamBSummary.scrumPenalties}
              penaltyCausesA={teamASummary.penaltyCauses}
              penaltyCausesB={teamBSummary.penaltyCauses}
            />
            
            {/* Scrum & Lineout Card */}
            <ScrumLineoutCard
              teamA={cleanTeamA}
              teamB={cleanTeamB}
              scrumsA={scrumsA}
              scrumsB={scrumsB}
              lineoutsA={lineoutsA}
              lineoutsB={lineoutsB}
              turnoversA={turnoversA}
              turnoversB={turnoversB}
              knockOnsA={knockOnsA}
              knockOnsB={knockOnsB}
            />

            {/* Match Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
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
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{tryStatsA.tries}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{tryStatsB.tries}</td>
                      </tr>
                      <tr className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">Total Conversions</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{tryStatsA.conversions}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{tryStatsB.conversions}</td>
                      </tr>
                      <tr className="border-b border-scrummy-lightblue/20 hover:bg-white/50 transition-colors">
                        <td className="p-2 md:p-3 font-medium text-xs md:text-base">Penalty Kicks</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{tryStatsA.penalties}</td>
                        <td className="p-2 md:p-3 text-center text-xs md:text-base">{tryStatsB.penalties}</td>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-md">
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