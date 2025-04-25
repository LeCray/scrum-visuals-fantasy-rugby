import React, { useState } from 'react';
import HighlightedFixtures, { HighlightedFixture } from '../components/fixtures/HighlightedFixtures';
import BoxScoreDetails from '../components/fixtures/BoxScoreDetails';
import { getBoxScore } from '../lib/boxScoreData';

const HighlightedFixturesPage: React.FC = () => {
  const [selectedFixture, setSelectedFixture] = useState<HighlightedFixture | null>(null);

  const handleFixtureClick = (fixture: HighlightedFixture) => {
    setSelectedFixture(fixture);
  };

  const boxScore = selectedFixture 
    ? getBoxScore(selectedFixture.date, selectedFixture.time, selectedFixture.teamA, selectedFixture.teamB)
    : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-orbitron text-gold-500 text-center mb-8">
          Highlighted Fixtures
        </h1>

        {selectedFixture && boxScore ? (
          <div>
            <button
              onClick={() => setSelectedFixture(null)}
              className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              ← Back to Fixtures
            </button>
            <BoxScoreDetails boxScore={boxScore} />
          </div>
        ) : (
          <HighlightedFixtures onFixtureClick={handleFixtureClick} />
        )}
      </div>
    </div>
  );
};

export default HighlightedFixturesPage; 