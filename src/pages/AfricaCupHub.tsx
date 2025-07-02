import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, Users, Trophy } from 'lucide-react';

const AfricaCupHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation */}
      <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to SCRUMMY</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/africa-cup" className="text-orange-400 font-semibold">
              Tournament Hub
            </Link>
            <Link to="/africa-cup/teams" className="text-gray-300 hover:text-white transition-colors">
              Teams & Rosters
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Rugby Africa Cup Aesthetic */}
      <section className="relative overflow-hidden">
        {/* Dynamic Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-500/20 to-transparent rotate-45 transform translate-x-24 -translate-y-24" />
          <div className="absolute top-32 right-32 w-64 h-64 bg-gradient-to-bl from-orange-500/30 to-transparent rotate-12" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-yellow-500/20 to-transparent -rotate-12 transform -translate-x-24 translate-y-24" />
          <div className="absolute bottom-32 left-32 w-48 h-48 bg-gradient-to-tr from-orange-600/25 to-transparent rotate-45" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Co-branding */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="text-orange-400 font-semibold">SCRUMMY</span>
                <span>X</span>
                <span>RUGBY AFRICA</span>
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                  <span className="block text-orange-400" style={{
                    background: 'linear-gradient(45deg, #FF6B35, #FFD700)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}>
                    RUGBY
                  </span>
                  <span className="block text-orange-400" style={{
                    background: 'linear-gradient(45deg, #FF6B35, #FFD700)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}>
                    AFRICA CUP
                  </span>
                  <span className="block text-white text-6xl md:text-8xl font-black transform -skew-x-12">
                    25
                  </span>
                </h1>
              </div>

              {/* Tournament Details */}
              <div className="space-y-3 text-lg text-gray-300">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  <span className="font-semibold text-orange-400">8TH-19TH JULY 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <span>MANDELA NATIONAL STADIUM | KAMPALA, UGANDA</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-400" />
                  <span>8 NATIONS COMPETING</span>
                </div>
              </div>

              {/* Team Flags Preview */}
              <div className="space-y-3">
                <p className="text-orange-400 font-semibold">PARTICIPATING NATIONS:</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { flag: '🇿🇼', name: 'Zimbabwe' },
                    { flag: '🇩🇿', name: 'Algeria' },
                    { flag: '🇳🇦', name: 'Namibia' },
                    { flag: '🇰🇪', name: 'Kenya' },
                    { flag: '🇺🇬', name: 'Uganda' },
                    { flag: '🇸🇳', name: 'Senegal' },
                    { flag: '🇨🇮', name: 'Côte d\'Ivoire' },
                    { flag: '🇲🇦', name: 'Morocco' }
                  ].map((team, index) => (
                    <motion.div
                      key={team.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-700"
                    >
                      <span className="text-2xl">{team.flag}</span>
                      <span className="text-sm font-medium">{team.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* App Download CTA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Vote for Your Favorites!</h3>
                  <p className="text-gray-300 mb-4">Join thousands of fans voting for their favorite team and top player in the SCRUMMY app!</p>
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    📱 Download SCRUMMY App
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Player Imagery */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:block hidden"
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <Trophy className="w-24 h-24 text-orange-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Tournament Player Gallery</p>
                  <p className="text-gray-500 text-sm">Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-gray-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-orange-500/50 transition-all"
            >
              <Link to="/africa-cup/teams" className="block">
                <div className="flex items-center gap-4 mb-3">
                  <Users className="w-8 h-8 text-orange-400" />
                  <h3 className="text-xl font-bold">Teams & Rosters</h3>
                </div>
                <p className="text-gray-400">Explore all 8 competing nations and their squad rosters</p>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-orange-500/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <Trophy className="w-8 h-8 text-orange-400" />
                <h3 className="text-xl font-bold">Tournament Bracket</h3>
              </div>
              <p className="text-gray-400">Follow the knockout stages and track team progress</p>
              <span className="inline-block mt-2 text-orange-400 text-sm">Coming Soon</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-orange-500/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <Calendar className="w-8 h-8 text-orange-400" />
                <h3 className="text-xl font-bold">Fixtures & Results</h3>
              </div>
              <p className="text-gray-400">Complete match schedule and live score updates</p>
              <span className="inline-block mt-2 text-orange-400 text-sm">Coming Soon</span>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AfricaCupHub; 