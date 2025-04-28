import React from 'react';
import { boxScores, getBoxScore } from '../../lib/boxScoreData';
import { useIsMobile } from '@/hooks/use-mobile';

// Type for highlighted fixture data
export type HighlightedFixture = {
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  venue: string;
};

// List of all highlighted fixtures
export const highlightedFixtures: HighlightedFixture[] = [
  {
    date: "April 28th",
    time: "13:00",
    teamA: "MILTON 1XV",
    teamB: "WISE OWL 1XV",
    venue: "St John's College",
  },
  {
    date: "April 28th",
    time: "15:40",
    teamA: "RYDINGS 1XV",
    teamB: "HERITAGE 1XV",
    venue: "St John's College",
  },
  {
    date: "April 29th",
    time: "14:20",
    teamA: "LOMAGUNDI 1XV",
    teamB: "ST ALBANS 1XV",
    venue: "St John's College",
  },
  {
    date: "April 29th",
    time: "15:40",
    teamA: "ST GEORGE'S 1XV",
    teamB: "ST ANDREW'S 1XV",
    venue: "St John's College",
  },
  {
    date: "April 30th",
    time: "13:00",
    teamA: "GOLDRIDGE 1XV",
    teamB: "HILLCREST 1XV",
    venue: "St John's College",
  },
  {
    date: "April 30th",
    time: "15:40",
    teamA: "WATERSHED 1XV",
    teamB: "GATEWAY 1XV",
    venue: "St John's College",
  },
  {
    date: "May 1st",
    time: "13:20",
    teamA: "PETERHOUSE 1XV",
    teamB: "ST ANDREW'S 1XV",
    venue: "St John's College",
  },
  {
    date: "May 1st",
    time: "16:00",
    teamA: "ZAM STEELERS",
    teamB: "SHARKS ACADEMY",
    venue: "St John's College",
  },
  {
    date: "May 3rd",
    time: "10:20",
    teamA: "CBC 1XV",
    teamB: "PETERHOUSE 1XV",
    venue: "St John's College",
  },
  {
    date: "May 3rd",
    time: "11:40",
    teamA: "PRINCE EDWARD 1XV",
    teamB: "CHURCHILL 1XV",
    venue: "St John's College",
  },
  {
    date: "May 3rd",
    time: "14:20",
    teamA: "FALCON 1XV",
    teamB: "ST ALBANS 1XV",
    venue: "St John's College",
  },
  {
    date: "May 3rd",
    time: "15:40",
    teamA: "ST JOHN'S 1XV",
    teamB: "ST ANDREW'S 1XV",
    venue: "St John's College",
  },
];

// Update the HighlightedFixtureCard component props
type HighlightedFixtureCardProps = HighlightedFixture & {
  onClick: (fixture: HighlightedFixture) => void;
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

// Update the HighlightedFixtureCard component
export const HighlightedFixtureCard: React.FC<HighlightedFixtureCardProps> = ({
  date,
  time,
  teamA,
  teamB,
  venue,
  onClick,
}) => {
  const isMobile = useIsMobile();
  
  // Get the box score for this fixture
  const boxScore = getBoxScore(date, time, teamA, teamB);

  // Calculate the score if boxScore exists
  let scoreDisplay = "0 - 0";
  if (boxScore) {
    const teamAConv = parseConversions(boxScore.teamASummary.totalConversions);
    const teamBConv = parseConversions(boxScore.teamBSummary.totalConversions);
    const teamApoints = boxScore.teamASummary.totalTries * 5 + teamAConv.conversions * 2 + teamAConv.penalties * 3;
    const teamBpoints = boxScore.teamBSummary.totalTries * 5 + teamBConv.conversions * 2 + teamBConv.penalties * 3;
    scoreDisplay = `${teamApoints} - ${teamBpoints}`;
  }

  return (
    <div 
      className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer shadow-lg transform hover:scale-102 transition-transform duration-200"
      onClick={() => onClick({ date, time, teamA, teamB, venue })}
    >
      <div className="text-sm text-gray-400 flex items-center justify-between">
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <div className={`mt-2 ${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white text-center`}>
        <div className="mb-1">{teamA}</div>
        <div className="text-gold-500 text-sm mb-1">vs</div>
        <div>{teamB}</div>
      </div>
      <div className="mt-2 text-sm text-gray-300 text-center">{venue}</div>
      <div className="mt-3 text-xl font-orbitron text-gold-500 text-center">
        {scoreDisplay}
      </div>
    </div>
  );
};

// Update the main component props
type HighlightedFixturesProps = {
  onFixtureClick: (fixture: HighlightedFixture) => void;
};

// Update the main component
const HighlightedFixtures: React.FC<HighlightedFixturesProps> = ({ onFixtureClick }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`grid gap-4 p-4 ${
      isMobile 
        ? 'grid-cols-1' 
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
      {highlightedFixtures.map((fixture, index) => (
        <HighlightedFixtureCard 
          key={index} 
          {...fixture} 
          onClick={onFixtureClick}
        />
      ))}
    </div>
  );
};

export default HighlightedFixtures; 