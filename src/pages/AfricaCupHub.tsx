import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, Users, Trophy, ChevronRight, Star, Download, Vote, Menu, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Zimbabwe player image mapping
const zimbabwePlayerImages: Record<string, string> = {
  'Hilton Mudariki': '/assets/Zimbabwe Players/Hilton Mudariki.png',
  'Trevor Gurwe': '/assets/Zimbabwe Players/Trevor Gurwe.png',
  'Brandon Mudzekenyedzi': '/assets/Zimbabwe Players/Brandon Mudzekenyedzi.png',
  'Ian Prior': '/assets/Zimbabwe Players/Ian Prior.png',
  'Victor Mupunga': '/assets/Zimbabwe Players/Victor Mupunga.png',
  'Jason Fraser': '/assets/Zimbabwe Players/Jason Fraser.png',
  'Dion Khumalo': '/assets/Zimbabwe Players/Dion Khumalo.png',
  'Aiden Burnett': '/assets/Zimbabwe Players/Aiden Burnett.png'
};

// Kenya player image mapping
const kenyaPlayerImages: Record<string, string> = {
  'George Nyambua': '/assets/Kenya Simbas players/G.Nyambua.png',
  'Patrick Sabatia': '/assets/Kenya Simbas players/P.Sabatia.png',
  'Edward Mwaura': '/assets/Kenya Simbas players/E.Mwaura.png',
  'Samuel Asati': '/assets/Kenya Simbas players/S.Asati.png',
  'Walter Okoth': '/assets/Kenya Simbas players/W.Okoth.png',
  'Griffin Chao': '/assets/Kenya Simbas players/G.Chao.png',
  'Timothy Omela': '/assets/Kenya Simbas players/T.Omela.png',
  'Jone Kubu': '/assets/Kenya Simbas players/J.Kubu.png'
};

// Timezone conversion utility
const convertToLocalTime = (timeStr: string, date: string = '2025-07-08') => {
  // Parse the EAT time (UTC+3)
  const [time, period] = timeStr.split(/(?=[AP]M)/);
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  // Create date in EAT timezone (UTC+3)
  const eatTime = new Date(`${date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00+03:00`);
  
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
};

const AfricaCupHub: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const slides = ['fixtures', 'voting', 'download'];

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#D0E3FF]">
      {/* Header Navigation */}
      <header className="bg-scrummy-navy shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-scrummy-goldYellow transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium hidden sm:block">Back to SCRUMMY</span>
            <span className="font-medium sm:hidden">SCRUMMY</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/africa-cup" className="text-scrummy-goldYellow font-semibold">
              Tournament Hub
            </Link>
            <Link to="/africa-cup/teams" className="text-white hover:text-scrummy-goldYellow transition-colors">
              Teams & Rosters
            </Link>
            <Link to="/africa-cup/fixtures" className="text-white hover:text-scrummy-goldYellow transition-colors">
              Fixtures
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-scrummy-goldYellow transition-colors p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-scrummy-navy/98 backdrop-blur-md border-t border-scrummy-goldYellow/20"
            >
              <nav className="px-4 py-4 space-y-4">
                <Link 
                  to="/africa-cup" 
                  className="block text-scrummy-goldYellow font-semibold py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tournament Hub
                </Link>
                <Link 
                  to="/africa-cup/teams" 
                  className="block text-white hover:text-scrummy-goldYellow transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Teams & Rosters
                </Link>
                <Link 
                  to="/africa-cup/fixtures" 
                  className="block text-white hover:text-scrummy-goldYellow transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fixtures
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Rugby Africa Cup 2025 Banner - Same size as home page */}
      <section className="relative h-[50vh] sm:h-[45vh] md:h-[40vh] lg:h-[35vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black">
          {/* Clean Diagonal Geometry */}
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-br from-teal-500/40 to-green-500/40 transform skew-x-12 translate-x-40"></div>
          <div className="absolute top-0 right-16 w-64 h-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 transform skew-x-12 translate-x-24"></div>
          <div className="absolute bottom-0 left-0 w-48 h-full bg-gradient-to-tr from-orange-500/40 to-red-500/40 transform -skew-x-12 -translate-x-24"></div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white space-y-3 md:space-y-4 text-center md:text-left"
            >
              {/* Tournament Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs sm:text-sm font-medium">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                Tournament
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-3">
                  Rugby Africa Cup 2025
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-3 md:mb-4">
                  African Rugby Union Championship
                </p>
              </div>

              {/* Event Details */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-white/80 text-xs sm:text-sm mb-4 md:mb-6">
                <span>📅 8-19 July 2025</span>
                <span>📍 Kampala, Uganda</span>
                <span>🏉 8 Nations</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-center md:justify-start gap-3">
                <Link to="/africa-cup/teams">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-semibold transition-all duration-300 hover:shadow-lg px-6 sm:px-8 py-3 text-sm sm:text-base">
                      View Teams & Rosters
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Stats Card */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:block"
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-center text-white space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-xl font-bold text-white">RAC</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Africa Cup Coverage</p>
                      <p className="text-sm opacity-80">8 Competing Nations</p>
                      <p className="text-sm opacity-80">Live Tournament Updates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subtle App Download CTA */}
      <div className="bg-white pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-start">
            <Link to="/download">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-gradient-to-r from-scrummy-goldYellow to-yellow-400 border-2 border-scrummy-gold rounded-full px-6 py-3 flex items-center gap-3 text-scrummy-navy hover:from-scrummy-gold hover:to-scrummy-goldYellow transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Download className="w-5 h-5 text-scrummy-navy" />
                </motion.div>
                <span className="text-base font-bold text-scrummy-navy">Play SCRUMMY</span>
                <motion.div
                  animate={{ 
                    x: [0, 4, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronRight className="w-4 h-4 text-scrummy-navy" />
                </motion.div>
              </div>
            </motion.div>
            </Link>
          </div>
        </div>
      </div>

      {/* Dynamic Tournament Slideshow */}
      <section className="py-6 sm:py-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Slideshow Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-4 mb-3 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-scrummy-navy">
                {currentSlide === 0 && "Tournament Fixtures"}
                {currentSlide === 1 && "Vote for Your Champions"}
                {currentSlide === 2 && "Join the Action"}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              {currentSlide === 0 && "Eight African rugby nations competing for continental supremacy"}
              {currentSlide === 1 && "Vote for your favorite teams and top players in real-time"}
                                {currentSlide === 2 && "Play SCRUMMY to follow every match and vote for your favorites"}
            </p>
          </div>

          {/* Slideshow Content */}
          <div className="relative min-h-[350px] sm:min-h-[400px] lg:min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Slide 1: Fixtures */}
                {currentSlide === 0 && (
                  <div className="space-y-8">
                    <div className="relative">
                      <h3 className="text-lg sm:text-xl font-bold text-scrummy-navy mb-2 text-center">Quarter Finals - 08/07/2025</h3>
                      <p className="text-center text-gray-600 mb-2 text-sm sm:text-base">Mandela National Stadium, Kampala</p>
                      <div className="text-center mb-4 sm:mb-6">
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          🌍 Times shown in your local timezone
                        </span>
                      </div>
                      {/* View All Link - Positioned better and with bouncing animation */}
                      <div className="flex justify-center sm:justify-end mb-4">
                        <Link to="/africa-cup/fixtures">
                          <motion.div
                            animate={{ 
                              y: [0, -8, 0],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            whileHover={{ 
                              scale: 1.1,
                              y: -5
                            }}
                            className="bg-gradient-to-r from-scrummy-goldYellow to-yellow-400 text-scrummy-navy px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                          >
                            <span>View All Fixtures</span>
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </motion.div>
                          </motion.div>
                        </Link>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        {[
                          {
                            time: "10:00AM",
                            homeTeam: { name: "Zimbabwe", flag: "🇿🇼", code: "ZIM" },
                            awayTeam: { name: "Morocco", flag: "🇲🇦", code: "MAR" },
                            match: "QF1",
                            matchId: "1",
                            finalScore: { home: 43, away: 8 },
                            status: "completed"
                          },
                          {
                            time: "04:00PM",
                            homeTeam: { name: "Algeria", flag: "🇩🇿", code: "ALG" },
                            awayTeam: { name: "Uganda", flag: "🇺🇬", code: "UGA" },
                            match: "QF2",
                            matchId: "2"
                          },
                          {
                            time: "12:00PM",
                            homeTeam: { name: "Kenya", flag: "🇰🇪", code: "KEN" },
                            awayTeam: { name: "Côte d'Ivoire", flag: "🇨🇮", code: "CIV" },
                            match: "QF3",
                            matchId: "4"
                          },
                          {
                            time: "02:00PM",
                            homeTeam: { name: "Namibia", flag: "🇳🇦", code: "NAM" },
                            awayTeam: { name: "Senegal", flag: "🇸🇳", code: "SEN" },
                            match: "QF4",
                            matchId: "3"
                          }
                        ].map((match, index) => {
                          const timeInfo = convertToLocalTime(match.time);
                          return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ 
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <Link to={`/africa-cup/box-score/${match.matchId}`}>
                              <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-400 bg-gradient-to-r from-white to-red-50 cursor-pointer group">
                                <CardContent className="p-4 sm:p-6">
                              <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                                    {match.match}
                                  </span>
                                  <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">Quarter Final</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-scrummy-navy text-xs sm:text-sm">
                                    {timeInfo.isEAT ? timeInfo.originalTime : timeInfo.localTime} {timeInfo.isEAT ? 'EAT' : timeInfo.timezoneName}
                                  </div>
                                  {!timeInfo.isEAT && (
                                    <div className="text-xs text-gray-500">
                                      {timeInfo.originalTime} EAT
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                                  <span className="text-lg sm:text-2xl">{match.homeTeam.flag}</span>
                                  <div>
                                    <div className="font-bold text-scrummy-navy text-xs sm:text-sm">{match.homeTeam.name}</div>
                                    <div className="text-xs text-gray-500">{match.homeTeam.code}</div>
                                  </div>
                                </div>
                                
                                <div className="px-2 sm:px-4">
                                  <div className="text-lg sm:text-2xl font-bold text-red-500">
                                    {match.finalScore ? `${match.finalScore.home} - ${match.finalScore.away}` : 'VS'}
                                  </div>
                                  {match.finalScore && (
                                    <div className="text-xs text-gray-500 text-center">Final</div>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
                                  <div className="text-right">
                                    <div className="font-bold text-scrummy-navy text-xs sm:text-sm">{match.awayTeam.name}</div>
                                    <div className="text-xs text-gray-500">{match.awayTeam.code}</div>
                                  </div>
                                  <span className="text-lg sm:text-2xl">{match.awayTeam.flag}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                            </Link>
                          </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}



                {/* Slide 2: Voting & Players */}
                {currentSlide === 1 && (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                      {[
                        { name: "Hilton Mudariki", team: "Zimbabwe", flag: "🇿🇼", position: "Captain • Half Back", votes: "3,247" },
                        { name: "George Nyambua", team: "Kenya", flag: "🇰🇪", position: "Captain • Back Row", votes: "2,891" },
                        { name: "Brandon Mudzekenyedzi", team: "Zimbabwe", flag: "🇿🇼", position: "Centre", votes: "2,654" },
                        { name: "Samuel Asati", team: "Kenya", flag: "🇰🇪", position: "Half Back", votes: "2,183" }
                      ].map((player, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            scale: 1.05,
                            y: -5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-scrummy-goldYellow bg-gradient-to-br from-white to-yellow-50 cursor-pointer group">
                            <CardContent className="p-3 sm:p-4 text-center">
                              {/* Player Image */}
                              <div className="mb-3">
                                {zimbabwePlayerImages[player.name] || kenyaPlayerImages[player.name] ? (
                                  <img 
                                    src={zimbabwePlayerImages[player.name] || kenyaPlayerImages[player.name]} 
                                    alt={player.name}
                                    className={`w-16 h-20 sm:w-20 sm:h-24 mx-auto rounded-lg shadow-md border-2 border-scrummy-goldYellow ${
                                      kenyaPlayerImages[player.name] ? 'object-cover object-bottom' : 'object-cover'
                                    }`}
                                  />
                                ) : (
                                  <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gradient-to-br from-scrummy-navy to-scrummy-blue rounded-lg flex items-center justify-center mx-auto">
                                    <span className="text-2xl sm:text-3xl">{player.flag}</span>
                                  </div>
                                )}
                              </div>
                              <h4 className="font-bold text-scrummy-navy text-xs sm:text-sm mb-1 leading-tight">{player.name}</h4>
                              <p className="text-xs text-gray-600 mb-1">{player.team} • {player.position}</p>
                              <div className="flex items-center justify-center gap-1 mb-2 sm:mb-3">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-xs font-bold text-orange-600">{player.votes} votes</span>
                              </div>
                              <Link to="/download">
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button size="sm" className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold text-xs px-2 sm:px-3 py-1 transition-all duration-300 group-hover:shadow-md w-full">
                                    <Vote className="w-3 h-3 mr-1" />
                                    <span className="hidden sm:inline">Vote Top Player</span>
                                    <span className="sm:hidden">Vote</span>
                                  </Button>
                                </motion.div>
                              </Link>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      <CardContent className="p-4 sm:p-5 text-center">
                        <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">🗳️ Live Voting Results</h4>
                        <p className="text-xs sm:text-sm text-white/90 mb-3 sm:mb-4">
                          Over 15,000 fans have voted! Join them in the SCRUMMY app to vote for your favorite teams and players.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-center">
                          <div>
                            <div className="text-base sm:text-lg font-bold">🇿🇼 28%</div>
                            <div className="text-xs opacity-80">Zimbabwe Leading</div>
                          </div>
                          <div>
                            <div className="text-base sm:text-lg font-bold">🇰🇪 22%</div>
                            <div className="text-xs opacity-80">Kenya Close</div>
                          </div>
                          <div>
                            <div className="text-base sm:text-lg font-bold">🇳🇦 19%</div>
                            <div className="text-xs opacity-80">Namibia Strong</div>
                          </div>
                          <div>
                            <div className="text-base sm:text-lg font-bold">🇺🇬 16%</div>
                            <div className="text-xs opacity-80">Uganda Rising</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Slide 3: App Download CTA */}
                {currentSlide === 2 && (
                  <div className="flex items-center justify-center py-4">
                    <Card className="bg-gradient-to-br from-scrummy-navy via-scrummy-blue to-purple-900 text-white max-w-xl mx-auto">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto mb-3">
                          <Download className="w-8 h-8 text-scrummy-navy" />
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">Play SCRUMMY Now!</h3>
                        <p className="text-sm mb-3 opacity-90">
                          Vote for your champions, follow live matches, and compete with fans across Africa.
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                          <div className="bg-white/10 p-2 rounded">
                            <Vote className="w-4 h-4 mx-auto mb-1" />
                            <div className="font-bold text-xs">Vote & Win</div>
                          </div>
                          <div className="bg-white/10 p-2 rounded">
                            <Trophy className="w-4 h-4 mx-auto mb-1" />
                            <div className="font-bold text-xs">Live Scores</div>
                          </div>
                          <div className="bg-white/10 p-2 rounded">
                            <Users className="w-4 h-4 mx-auto mb-1" />
                            <div className="font-bold text-xs">Fan Community</div>
                          </div>
                        </div>
                        
                        <Link to="/download">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-4 py-2 text-sm transition-all duration-300 hover:shadow-xl">
                              📱 Play SCRUMMY App
                            </Button>
                          </motion.div>
                        </Link>
                        
                        <p className="text-xs opacity-60 mt-2">Join 50,000+ rugby fans</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-scrummy-navy border-2 border-scrummy-navy rounded-full p-3 text-scrummy-navy hover:text-white transition-all duration-300 hover:shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            {/* Slide Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-scrummy-goldYellow shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-scrummy-navy border-2 border-scrummy-navy rounded-full p-3 text-scrummy-navy hover:text-white transition-all duration-300 hover:shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              {isAutoPlaying ? "Auto-advancing every 8 seconds" : "Manual navigation active"}
            </p>
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-12 bg-scrummy-navy/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3">Vote for Your Favorites!</h3>
                <p className="text-lg mb-6 opacity-90">
                  Join thousands of fans voting for their favorite team and top player in the SCRUMMY app!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                                      <Link to="/download">
                      <Button 
                        size="lg" 
                        className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-8 py-3 text-lg transition-all duration-300 hover:shadow-xl"
                      >
                        📱 Play SCRUMMY App
                      </Button>
                    </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <Link to="/africa-cup/teams">
                <Card className="hover:shadow-xl transition-all duration-300 hover:border-scrummy-goldYellow border-2 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-scrummy-goldYellow rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-scrummy-navy" />
                      </div>
                      <h3 className="text-xl font-bold text-scrummy-navy">Teams & Rosters</h3>
                    </div>
                    <p className="text-gray-600">Explore all 8 competing nations and their squad rosters</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ 
                y: -3,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-2 opacity-75 group cursor-not-allowed">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500">Tournament Bracket</h3>
                  </div>
                  <p className="text-gray-500">Follow the knockout stages and track team progress</p>
                  <span className="inline-block mt-2 text-scrummy-goldYellow text-sm font-semibold">Coming Soon</span>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ 
                y: -3,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-2 opacity-75 group cursor-not-allowed">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500">Fixtures & Results</h3>
                  </div>
                  <p className="text-gray-500">Complete match schedule and live score updates</p>
                  <span className="inline-block mt-2 text-scrummy-goldYellow text-sm font-semibold">Coming Soon</span>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AfricaCupHub; 