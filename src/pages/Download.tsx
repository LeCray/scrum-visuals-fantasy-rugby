import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, Smartphone, Users, Trophy, Vote, Star, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const DownloadPage: React.FC = () => {
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
              <Link to="/" className="text-white hover:text-scrummy-goldYellow transition-colors">
                Home
              </Link>
              <Link to="/africa-cup" className="text-white hover:text-scrummy-goldYellow transition-colors">
                Africa Cup
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
                <Link to="/" className="block text-white hover:text-scrummy-goldYellow transition-colors py-2">
                  Home
                </Link>
                <Link to="/africa-cup" className="block text-white hover:text-scrummy-goldYellow transition-colors py-2">
                  Africa Cup
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[35vh] overflow-hidden">
        {/* Background with geometric elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-scrummy-navy via-scrummy-blue to-purple-900">
          {/* Geometric shapes */}
          <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-br from-scrummy-goldYellow/30 to-yellow-500/30 transform skew-x-12 translate-x-16 md:translate-x-32"></div>
          <div className="absolute top-0 right-8 md:right-16 w-24 md:w-48 h-full bg-gradient-to-br from-orange-400/20 to-red-500/20 transform skew-x-12 translate-x-8 md:translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-28 md:w-56 h-full bg-gradient-to-tr from-green-500/25 to-teal-500/25 transform -skew-x-12 -translate-x-14 md:-translate-x-28"></div>
          
          {/* Phone illustrations */}
          <div className="absolute top-4 left-4 w-6 h-10 md:w-8 md:h-12 bg-white/10 rounded-lg rotate-12 opacity-60"></div>
          <div className="absolute bottom-8 right-8 w-4 h-8 md:w-6 md:h-10 bg-white/10 rounded-lg -rotate-12 opacity-40"></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-5 md:w-4 md:h-6 bg-scrummy-goldYellow/30 rounded rotate-45 opacity-70"></div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
            {/* Left Content */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left"
            >
              {/* App Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Download className="w-4 h-4" />
                </motion.div>
                <span className="text-white">Mobile App</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-3 text-white">
                  Download SCRUMMY
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 max-w-md mx-auto md:mx-0">
                  The ultimate rugby app for voting, live scores, and fan community
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-white/80 text-sm mb-6">
                <span className="flex items-center gap-1">
                  <Vote className="w-4 h-4" />
                  Vote & Win
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  Live Scores
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  50K+ Users
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-center md:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold transition-all duration-300 hover:shadow-lg">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Download Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden md:block ml-8"
            >
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-40 h-72 lg:w-48 lg:h-80 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-scrummy-navy to-scrummy-blue rounded-2xl overflow-hidden relative">
                    {/* Screen Content */}
                    <div className="p-3 lg:p-4 text-white">
                      <div className="flex items-center gap-2 mb-3 lg:mb-4">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                          <span className="text-scrummy-navy font-bold text-xs">S</span>
                        </div>
                        <span className="font-bold text-xs lg:text-sm">SCRUMMY</span>
                      </div>
                      
                      <div className="space-y-2 lg:space-y-3">
                        <div className="bg-white/10 rounded-lg p-2 lg:p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">🇿🇼 Zimbabwe vs Morocco 🇲🇦</span>
                          </div>
                          <div className="text-center mt-1 lg:mt-2">
                            <span className="text-base lg:text-lg font-bold">24 - 17</span>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-2">
                          <div className="text-xs mb-1">Vote for Top Player</div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-scrummy-goldYellow rounded-full"></div>
                            <span className="text-xs">T. Mtawarira</span>
                            <div className="ml-auto text-xs">⭐ 2.8K</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 bg-scrummy-goldYellow text-scrummy-navy px-2 py-1 rounded-full text-xs font-bold">
                  FREE
                </div>
                <div className="absolute -bottom-2 -left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  ⭐ 4.8
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Links */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navy mb-4">Choose Your Platform</h2>
            <p className="text-gray-600">Available for both iOS and Android devices</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8 mb-12 md:mb-16">
            {/* iPhone Download */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <Card className="text-center p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-scrummy-goldYellow">
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mx-auto">
                    <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-scrummy-navy mb-2">iPhone</h3>
                    <p className="text-gray-600 mb-4 md:mb-6">Download from the App Store</p>
                  </div>

                  <Button 
                    size="lg" 
                    className="bg-black text-white hover:bg-gray-800 font-semibold px-6 md:px-8 py-3 rounded-xl w-full"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <span className="mr-2">📱</span>
                    Download for iOS
                  </Button>
                  
                  <p className="text-xs text-gray-500">Requires iOS 14.0 or later</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Android Download */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <Card className="text-center p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-scrummy-goldYellow">
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-scrummy-navy mb-2">Android</h3>
                    <p className="text-gray-600 mb-4 md:mb-6">Download from Google Play</p>
                  </div>

                  <Button 
                    size="lg" 
                    className="bg-green-600 text-white hover:bg-green-700 font-semibold px-6 md:px-8 py-3 rounded-xl w-full"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <span className="mr-2">🤖</span>
                    Download for Android
                  </Button>
                  
                  <p className="text-xs text-gray-500">Requires Android 8.0 or later</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* App Features */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Card className="bg-scrummy-navy/5 border-scrummy-goldYellow/30">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-scrummy-navy text-center mb-6 md:mb-8">What's Inside SCRUMMY?</h3>
                
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto mb-4">
                      <Vote className="w-6 h-6 md:w-8 md:h-8 text-scrummy-navy" />
                    </div>
                    <h4 className="font-bold text-scrummy-navy mb-2">Vote & Win</h4>
                    <p className="text-gray-600 text-sm">Vote for your favorite teams and players. Win prizes and compete with other fans.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-6 h-6 md:w-8 md:h-8 text-scrummy-navy" />
                    </div>
                    <h4 className="font-bold text-scrummy-navy mb-2">Live Scores</h4>
                    <p className="text-gray-600 text-sm">Follow live matches with real-time updates, detailed statistics, and match analysis.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 md:w-8 md:h-8 text-scrummy-navy" />
                    </div>
                    <h4 className="font-bold text-scrummy-navy mb-2">Fan Community</h4>
                    <p className="text-gray-600 text-sm">Connect with rugby fans across Africa. Join discussions and share your passion.</p>
                  </div>
                </div>

                <div className="mt-6 md:mt-8 text-center">
                  <div className="flex items-center justify-center gap-2 text-scrummy-goldYellow mb-4">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">50,000+</span> rugby fans already using SCRUMMY
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4">Ready to Join the Action?</h3>
            <p className="text-white/90 mb-6 text-sm md:text-base">
              Don't miss out on the rugby excitement. Download SCRUMMY today and be part of the community!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold flex-1"
                onClick={() => window.open('#', '_blank')}
              >
                📱 iOS App Store
              </Button>
              <Button 
                className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold flex-1"
                onClick={() => window.open('#', '_blank')}
              >
                🤖 Google Play
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DownloadPage; 