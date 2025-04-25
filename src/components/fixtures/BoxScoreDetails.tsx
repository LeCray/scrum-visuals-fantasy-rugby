import React from 'react';
import { BoxScoreData } from '../../lib/boxScoreData';

type BoxScoreDetailsProps = {
  boxScore: BoxScoreData;
};

const BoxScoreDetails: React.FC<BoxScoreDetailsProps> = ({ boxScore }) => {
  const { matchInfo, teamAPlayers, teamBPlayers, teamASummary, teamBSummary } = boxScore;

  const PlayerStats: React.FC<{ players: typeof teamAPlayers; teamName: string }> = ({ players, teamName }) => (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-white mb-2">{teamName}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left">Player</th>
              <th className="px-4 py-2 text-center">Position</th>
              <th className="px-4 py-2 text-center">Tries</th>
              <th className="px-4 py-2 text-center">Kicks</th>
              <th className="px-4 py-2 text-center">Lineouts</th>
              <th className="px-4 py-2 text-center">Penalties Won</th>
              <th className="px-4 py-2 text-center">Penalties Conceded</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="px-4 py-2">{player.name}</td>
                <td className="px-4 py-2 text-center">{player.position}</td>
                <td className="px-4 py-2 text-center">{player.tries}</td>
                <td className="px-4 py-2 text-center">{player.kicks}</td>
                <td className="px-4 py-2 text-center">{player.lineouts}</td>
                <td className="px-4 py-2 text-center">{player.penaltiesWon}</td>
                <td className="px-4 py-2 text-center">{player.penaltiesConceded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TeamSummary: React.FC<{ summary: typeof teamASummary; teamName: string }> = ({ summary, teamName }) => (
    <div className="mt-4 bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-2">{teamName} Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <p className="text-gray-400">Total Tries</p>
          <p className="text-xl font-orbitron text-gold-500">{summary.totalTries}</p>
        </div>
        <div>
          <p className="text-gray-400">Conversions</p>
          <p className="text-xl font-orbitron text-gold-500">{summary.totalConversions}</p>
        </div>
        <div>
          <p className="text-gray-400">Lineout Accuracy</p>
          <p className="text-xl font-orbitron text-gold-500">{summary.lineoutAccuracy}</p>
        </div>
        <div>
          <p className="text-gray-400">Penalties Won</p>
          <p className="text-xl font-orbitron text-gold-500">{summary.penaltiesWon}</p>
        </div>
        <div>
          <p className="text-gray-400">Penalties Conceded</p>
          <p className="text-xl font-orbitron text-gold-500">{summary.penaltiesConceded}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <div className="bg-gray-900 p-6 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-orbitron text-gold-500 mb-2">
            {matchInfo.teamA} vs {matchInfo.teamB}
          </h2>
          <p className="text-gray-400">
            {matchInfo.date} - {matchInfo.kickoff} | {matchInfo.venue}
          </p>
          <p className="text-gray-400">{matchInfo.weather}</p>
        </div>

        <TeamSummary summary={teamASummary} teamName={matchInfo.teamA} />
        <PlayerStats players={teamAPlayers} teamName={matchInfo.teamA} />
        
        <div className="my-8 border-t border-gray-700" />
        
        <TeamSummary summary={teamBSummary} teamName={matchInfo.teamB} />
        <PlayerStats players={teamBPlayers} teamName={matchInfo.teamB} />
      </div>
    </div>
  );
};

export default BoxScoreDetails; 