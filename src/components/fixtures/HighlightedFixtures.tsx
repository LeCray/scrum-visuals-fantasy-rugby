import React, { useState, useEffect } from 'react';
import { getBoxScore, getHighlightedFixtures } from '../../lib/dataService';
import { useIsMobile } from '@/hooks/use-mobile';
import { HighlightedFixture } from '../../lib/types';

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

// Update the HighlightedFixtureCard component props
type HighlightedFixtureCardProps = HighlightedFixture & {
  onClick: (fixture: HighlightedFixture) => void;
};

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
  const [score, setScore] = useState<string>("0 - 0");
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function loadBoxScore() {
      setLoading(true);
      try {
        const boxScore = await getBoxScore(date, time, teamA, teamB);
        
        // Calculate the score if boxScore exists
        if (boxScore) {
          const teamAConv = parseConversions(boxScore.teamASummary.totalConversions);
          const teamBConv = parseConversions(boxScore.teamBSummary.totalConversions);
          const teamApoints = boxScore.teamASummary.totalTries * 5 + teamAConv.conversions * 2 + teamAConv.penalties * 3;
          const teamBpoints = boxScore.teamBSummary.totalTries * 5 + teamBConv.conversions * 2 + teamBConv.penalties * 3;
          setScore(`${teamApoints} - ${teamBpoints}`);
        }
      } catch (error) {
        console.error("Error loading box score:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadBoxScore();
  }, [date, time, teamA, teamB]);

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
        {loading ? 
          <span className="text-sm text-gray-400">Loading...</span> : 
          score
        }
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
  const [fixtures, setFixtures] = useState<HighlightedFixture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadFixtures() {
      setLoading(true);
      try {
        const data = await getHighlightedFixtures();
        setFixtures(data);
      } catch (error) {
        console.error("Error loading fixtures:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadFixtures();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gold-500">Loading fixtures...</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 p-4 ${
      isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    }`}>
      {fixtures.map((fixture, index) => (
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