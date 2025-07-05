import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, MapPin, Clock, Users, Activity, AlertCircle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const matchData: Record<string, { team1: { name: string; flag: string }; team2: { name: string; flag: string }; date: string; time: string }> = {
  '1': { team1: { name: 'Zimbabwe', flag: '🇿🇼' }, team2: { name: 'Morocco', flag: '🇲🇦' }, date: 'July 12, 2025', time: '14:00' },
  '2': { team1: { name: 'Algeria', flag: '🇩🇿' }, team2: { name: 'Uganda', flag: '🇺🇬' }, date: 'July 12, 2025', time: '16:30' },
  '3': { team1: { name: 'Namibia', flag: '🇳🇦' }, team2: { name: 'Senegal', flag: '🇸🇳' }, date: 'July 13, 2025', time: '14:00' },
  '4': { team1: { name: 'Kenya', flag: '🇰🇪' }, team2: { name: 'Côte d\'Ivoire', flag: '🇨🇮' }, date: 'July 13, 2025', time: '16:30' },
  '5': { team1: { name: 'QF1 Winner', flag: '🏆' }, team2: { name: 'QF2 Winner', flag: '🏆' }, date: 'July 16, 2025', time: '14:00' },
  '6': { team1: { name: 'QF3 Winner', flag: '🏆' }, team2: { name: 'QF4 Winner', flag: '🏆' }, date: 'July 16, 2025', time: '16:30' },
  '7': { team1: { name: 'SF1 Winner', flag: '🏆' }, team2: { name: 'SF2 Winner', flag: '🏆' }, date: 'July 19, 2025', time: '16:00' }
};

const AfricaCupBoxScore: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const match = matchId ? matchData[matchId] : null;

  if (!match) {
    return <div>Match not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#D0E3FF]">
      {/* Header Navigation */}
      <header className="bg-scrummy-navy shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/africa-cup/fixtures" className="flex items-center gap-2 text-white hover:text-scrummy-goldYellow transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Fixtures</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/africa-cup" className="text-white hover:text-scrummy-goldYellow transition-colors">
              Tournament Hub
            </Link>
            <Link to="/africa-cup/teams" className="text-white hover:text-scrummy-goldYellow transition-colors">
              Teams & Rosters
            </Link>
            <Link to="/africa-cup/fixtures" className="text-white hover:text-scrummy-goldYellow transition-colors">
              Fixtures
            </Link>
          </div>
        </div>
      </header>

      {/* Match Header */}
      <section className="bg-scrummy-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Match Info */}
            <div className="text-center mb-6">
              <Badge variant="secondary" className="mb-4">
                Rugby Africa Cup 2025 - Match {matchId}
              </Badge>
              <div className="flex items-center justify-center gap-4 text-sm text-white/80 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{match.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Mandela National Stadium, Kampala</span>
                </div>
              </div>
            </div>

            {/* Score Display */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-6xl mb-2">{match.team1.flag}</div>
                <div className="text-xl font-bold">{match.team1.name}</div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl font-black mb-2">0 - 0</div>
                <div className="text-sm text-white/80">Full Time</div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-2">{match.team2.flag}</div>
                <div className="text-xl font-bold">{match.team2.name}</div>
              </div>
            </div>

            {/* Status Notice */}
            <div className="flex items-center justify-center gap-2 bg-orange-500/20 text-orange-200 px-4 py-2 rounded-full text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Match statistics will be updated after the game</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Box Score Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Team Stats */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Team Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="font-bold text-scrummy-navy">{match.team1.name}</div>
                      <div className="font-bold text-gray-600">Stat</div>
                      <div className="font-bold text-scrummy-navy">{match.team2.name}</div>
                    </div>
                    
                    {[
                      { stat: 'Tries', home: '0', away: '0' },
                      { stat: 'Conversions', home: '0', away: '0' },
                      { stat: 'Penalties', home: '0', away: '0' },
                      { stat: 'Possession %', home: '-%', away: '-%' },
                      { stat: 'Territory %', home: '-%', away: '-%' },
                      { stat: 'Lineouts Won', home: '0/0', away: '0/0' },
                      { stat: 'Scrums Won', home: '0/0', away: '0/0' },
                      { stat: 'Penalties Conceded', home: '0', away: '0' },
                    ].map((row, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 text-center py-2 border-b border-gray-100">
                        <div className="font-semibold text-scrummy-navy">{row.home}</div>
                        <div className="text-gray-600">{row.stat}</div>
                        <div className="font-semibold text-scrummy-navy">{row.away}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Match Events */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Match Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No Events Yet</p>
                    <p className="text-sm">Match events will appear here during the game</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Player Stats */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Player Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Player Stats Coming Soon</p>
                    <p className="text-sm">Individual player statistics will be available after the match</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Live Commentary */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Live Commentary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Commentary Coming Soon</p>
                    <p className="text-sm">Live match commentary will be available during the game</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* App Download CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Download className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Get Live Updates!</h3>
                </div>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Download the SCRUMMY app for live match updates, real-time scores, and detailed statistics as they happen.
                </p>
                <Button 
                  size="lg" 
                  className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-8 py-3 text-lg"
                >
                  📱 Play SCRUMMY App
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AfricaCupBoxScore; 