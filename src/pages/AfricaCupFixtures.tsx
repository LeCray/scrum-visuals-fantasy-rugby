import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, MapPin, Clock, Trophy, Download, BarChart3, Menu, X } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

// Helper function to convert date format
const convertDateFormat = (dateStr: string): string => {
  const monthMap: { [key: string]: string } = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };
  
  // Parse "July 8, 2025" format
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const month = monthMap[parts[0]];
    const day = parts[1].replace(',', '').padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  
  // Default fallback
  return '2025-07-08';
};

// Timezone conversion utility (same as AfricaCupHub)
const convertToLocalTime = (timeStr: string, date: string = '2025-07-08') => {
  try {
    // Parse the EAT time (UTC+3)
    const [time, period] = timeStr.split(/(?=[AP]M)/);
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    // Create date in EAT timezone (UTC+3)
    const eatTime = new Date(`${date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00+03:00`);
    
    // Check if date is valid
    if (isNaN(eatTime.getTime())) {
      throw new Error('Invalid date');
    }
    
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Format for user's local timezone
    const localTime = eatTime.toLocaleTimeString('en-US', {
      timeZone: userTimezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    // Get timezone abbreviation
    const timezoneName = eatTime.toLocaleTimeString('en-US', {
      timeZone: userTimezone,
      timeZoneName: 'short'
    }).split(' ').slice(-1)[0];
    
    return {
      localTime,
      timezoneName,
      originalTime: timeStr,
      isEAT: userTimezone === 'Africa/Kampala' || userTimezone.includes('Africa/Nairobi')
    };
  } catch (error) {
    // Fallback to original time if conversion fails
    return {
      localTime: timeStr,
      timezoneName: 'EAT',
      originalTime: timeStr,
      isEAT: true
    };
  }
};

const fixtures = [
  {
    round: 'Quarter Finals',
    date: 'July 8, 2025',
    matches: [
      {
        id: 1,
        team1: { name: 'Zimbabwe', flag: '🇿🇼' },
        team2: { name: 'Morocco', flag: '🇲🇦' },
        time: '10:00AM',
        venue: 'Mandela National Stadium, Kampala',
        finalScore: { team1: 43, team2: 8 },
        status: 'completed'
      },
      {
        id: 2,
        team1: { name: 'Algeria', flag: '🇩🇿' },
        team2: { name: 'Uganda', flag: '🇺🇬' },
        time: '04:00PM',
        venue: 'Mandela National Stadium, Kampala'
      },
      {
        id: 3,
        team1: { name: 'Namibia', flag: '🇳🇦' },
        team2: { name: 'Senegal', flag: '🇸🇳' },
        time: '02:00PM',
        venue: 'Mandela National Stadium, Kampala'
      },
      {
        id: 4,
        team1: { name: 'Kenya', flag: '🇰🇪' },
        team2: { name: 'Côte d\'Ivoire', flag: '🇨🇮' },
        time: '12:00PM',
        venue: 'Mandela National Stadium, Kampala'
      }
    ]
  },
  {
    round: 'Semi Finals',
    date: 'July 13, 2025',
    matches: [
      {
        id: 5,
        team1: { name: 'QF1 Winner', flag: '🏆' },
        team2: { name: 'QF2 Winner', flag: '🏆' },
        time: '02:00PM',
        venue: 'Mandela National Stadium, Kampala'
      },
      {
        id: 6,
        team1: { name: 'QF3 Winner', flag: '🏆' },
        team2: { name: 'QF4 Winner', flag: '🏆' },
        time: '04:30PM',
        venue: 'Mandela National Stadium, Kampala'
      }
    ]
  },
  {
    round: 'Final',
    date: 'July 19, 2025',
    matches: [
      {
        id: 7,
        team1: { name: 'SF1 Winner', flag: '🏆' },
        team2: { name: 'SF2 Winner', flag: '🏆' },
        time: '04:00PM',
        venue: 'Mandela National Stadium, Kampala'
      }
    ]
  }
];

const AfricaCupFixtures: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#D0E3FF]">
      {/* Header Navigation */}
      <header className="bg-scrummy-navy shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-scrummy-goldYellow transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to SCRUMMY</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/africa-cup" className="text-white hover:text-scrummy-goldYellow transition-colors">
                Tournament Hub
              </Link>
              <Link to="/africa-cup/teams" className="text-white hover:text-scrummy-goldYellow transition-colors">
                Teams & Rosters
              </Link>
              <Link to="/africa-cup/fixtures" className="text-scrummy-goldYellow font-semibold">
                Fixtures
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-scrummy-goldYellow transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 border-t border-scrummy-goldYellow/20"
            >
              <div className="space-y-2 pt-4">
                <Link to="/africa-cup" className="block text-white hover:text-scrummy-goldYellow transition-colors py-2">
                  Tournament Hub
                </Link>
                <Link to="/africa-cup/teams" className="block text-white hover:text-scrummy-goldYellow transition-colors py-2">
                  Teams & Rosters
                </Link>
                <Link to="/africa-cup/fixtures" className="block text-scrummy-goldYellow font-semibold py-2">
                  Fixtures
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Page Header */}
      <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-scrummy-navy via-scrummy-blue to-blue-900">
          <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-br from-orange-500/30 to-red-500/30 transform skew-x-12 translate-x-16 md:translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-28 md:w-56 h-full bg-gradient-to-tr from-teal-500/25 to-green-500/25 transform -skew-x-12 -translate-x-14 md:-translate-x-28"></div>
        </div>
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 text-white mb-4 md:mb-6"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">July 8-19, 2025</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4"
            >
              Tournament Fixtures
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 px-4"
            >
              Complete match schedule for Rugby Africa Cup 2025
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/80 text-sm px-4"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full"></span>
                <span className="hidden sm:inline">Mandela National Stadium</span>
                <span className="sm:hidden">Kampala Stadium</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full"></span>
                <span>Kampala, Uganda</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full"></span>
                <span>RWC 2027 Dreams</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fixtures */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-8 md:space-y-12">
            {fixtures.map((roundData, roundIndex) => (
              <motion.div
                key={roundData.round}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: roundIndex * 0.1, duration: 0.6 }}
              >
                {/* Round Header */}
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center gap-3 bg-scrummy-navy text-white px-4 md:px-6 py-2 md:py-3 rounded-full">
                    <Trophy className="w-4 h-4 md:w-5 md:h-5" />
                    <h2 className="text-lg md:text-xl font-bold">{roundData.round}</h2>
                  </div>
                  <p className="text-gray-600 mt-2 flex items-center justify-center gap-2 text-sm md:text-base">
                    <Calendar className="w-4 h-4" />
                    {roundData.date}
                  </p>
                </div>

                {/* Matches */}
                <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                  {roundData.matches.map((match, matchIndex) => {
                    const timeInfo = convertToLocalTime(match.time, convertDateFormat(roundData.date));
                    return (
                    <motion.div
                      key={match.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: (roundIndex * 0.1) + (matchIndex * 0.05), duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      className="cursor-pointer"
                    >
                      <Link to={`/africa-cup/box-score/${match.id}`}>
                        <Card className="border-2 border-gray-200 hover:border-scrummy-goldYellow transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-4 md:p-6">
                            {/* Match Details */}
                            <div className="flex items-center justify-between mb-3 md:mb-4">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-4 h-4" />
                                <div className="text-sm md:text-base">
                                  <div className="font-medium">
                                    {timeInfo.isEAT ? timeInfo.originalTime : timeInfo.localTime} {timeInfo.isEAT ? 'EAT' : timeInfo.timezoneName}
                                  </div>
                                  {!timeInfo.isEAT && (
                                    <div className="text-xs text-gray-500">
                                      {timeInfo.originalTime} EAT
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-bold text-scrummy-navy">Match {match.id}</span>
                              </div>
                            </div>

                            {/* Teams with Score */}
                            <div className="flex items-center justify-between mb-3 md:mb-4">
                              <div className="flex items-center gap-2 md:gap-3 flex-1">
                                <span className="text-2xl md:text-3xl">{match.team1.flag}</span>
                                <span className="font-bold text-scrummy-navy text-sm md:text-base truncate">{match.team1.name}</span>
                              </div>
                              <div className="text-center mx-2 md:mx-4">
                                <div className="text-xl md:text-2xl font-bold text-scrummy-navy mb-1">
                                  {match.finalScore ? `${match.finalScore.team1} - ${match.finalScore.team2}` : 'vs'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {match.finalScore ? 'Full Time' : (
                                    timeInfo.isEAT ? timeInfo.originalTime : `${timeInfo.localTime} (${timeInfo.originalTime} EAT)`
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
                                <span className="font-bold text-scrummy-navy text-sm md:text-base truncate">{match.team2.name}</span>
                                <span className="text-2xl md:text-3xl">{match.team2.flag}</span>
                              </div>
                            </div>

                            {/* Venue and Box Score Link */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
                                <MapPin className="w-4 h-4" />
                                <span className="truncate">{match.venue}</span>
                              </div>
                              <div className="flex items-center gap-2 text-scrummy-goldYellow text-xs md:text-sm font-medium">
                                <BarChart3 className="w-4 h-4" />
                                <span>View Box Score</span>
                              </div>
                            </div>

                            {/* Stats Update Notice */}
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="text-center text-xs text-gray-500">
                                {match.finalScore ? 
                                  '🏆 Match completed - Full statistics available' : 
                                  '📊 Match statistics will be updated after the game'
                                }
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* App Download CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 md:mt-16"
          >
            <Card className="bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Download className="w-5 h-5 md:w-6 md:h-6" />
                  <h3 className="text-xl md:text-2xl font-bold">Never Miss a Match!</h3>
                </div>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto text-sm md:text-base">
                  Download the SCRUMMY app for live match updates, real-time scores, and exclusive content from Rugby Africa Cup 2025.
                </p>
                <Link to="/download">
                  <Button 
                    size="lg" 
                    className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-6 md:px-8 py-3 text-base md:text-lg"
                  >
                    📱 Play SCRUMMY App
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AfricaCupFixtures; 