import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, Smartphone, Users, Trophy, Vote, Star, Menu, X, Globe, Clock } from 'lucide-react';
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
              <Link to="/support" className="text-white hover:text-scrummy-goldYellow transition-colors">
                Support
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
                <Link to="/support" className="block text-white hover:text-scrummy-goldYellow transition-colors py-2">
                  Support
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
                  <Globe className="w-4 h-4" />
                </motion.div>
                <span className="text-white">Available Now</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-3 text-white">
                  Access SCRUMMY
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 max-w-md mx-auto md:mx-0">
                  Use the web app now, mobile apps coming soon
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
                    {/* Clean App Interface */}
                    <div className="p-3 lg:p-4 text-white h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                          <span className="text-scrummy-navy font-bold text-xs lg:text-sm">S</span>
                        </div>
                        <span className="font-bold text-xs lg:text-sm">SCRUMMY</span>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1 space-y-3">
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <div className="text-xs mb-2 opacity-80">Rugby Africa Cup</div>
                          <div className="text-sm font-semibold">Live Tournament</div>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="text-xs mb-2 opacity-80">Vote for Your Champions</div>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-scrummy-goldYellow rounded-full"></div>
                            <span className="text-xs">Cast Your Vote</span>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <div className="text-xs mb-1 opacity-80">Follow Teams</div>
                          <div className="text-xs">🏉 8 Nations Competing</div>
                        </div>
                      </div>
                      
                      {/* Bottom Navigation */}
                      <div className="flex justify-around pt-3 border-t border-white/20">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 bg-scrummy-goldYellow rounded opacity-80"></div>
                        <div className="w-4 h-4 lg:w-5 lg:h-5 bg-white/30 rounded"></div>
                        <div className="w-4 h-4 lg:w-5 lg:h-5 bg-white/30 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  LIVE
                </div>
                <div className="absolute -bottom-2 -left-2 bg-scrummy-goldYellow text-scrummy-navy px-2 py-1 rounded-full text-xs font-bold">
                  WEB
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
            <p className="text-gray-600">Available on iOS, Android, and as a web app</p>
          </motion.div>

          {/* Store Apps - Priority Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <div className="bg-gradient-to-br from-scrummy-navy/5 to-scrummy-goldYellow/5 rounded-xl p-8 border border-scrummy-goldYellow/30 shadow-lg">
              <div className="text-center">
                <h3 className="font-orbitron text-xl md:text-2xl font-bold text-scrummy-navy mb-3">
                  Download the Official App
                </h3>
                <p className="text-base text-gray-700 mb-6 max-w-md mx-auto font-medium">
                  Get the full SCRUMMY experience with live stats, fantasy leagues, and exclusive features
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {/* Apple App Store - Official Badge */}
                  <button 
                    className="cursor-pointer transition-all hover:opacity-90"
                    onClick={() => window.open('https://apps.apple.com/us/app/scrummy-fantasy-rugby/id6744964910', '_blank')}
                  >
                    <img 
                      src="/assets/Store badges/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" 
                      alt="Download on the App Store"
                      className="h-12 w-auto"
                    />
                  </button>
                  
                  {/* Google Play Store - Official Badge */}
                  <button 
                    className="cursor-pointer transition-all hover:opacity-90"
                    onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scrummy&pcampaignid=web_share', '_blank')}
                  >
                    <img 
                      src="/assets/Store badges/GetItOnGooglePlay_Badge_Web_color_English.png" 
                      alt="Get it on Google Play"
                      className="h-12 w-auto"
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

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
                    <span className="font-semibold">100+</span> downloads on Google Play, now available on iOS too!
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
              Download SCRUMMY now on iOS and Android, or use our web app!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Apple App Store - Official Badge */}
              <button 
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => window.open('https://apps.apple.com/us/app/scrummy-fantasy-rugby/id6744964910', '_blank')}
              >
                <img 
                  src="/assets/Store badges/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" 
                  alt="Download on the App Store"
                  className="h-12 w-auto"
                />
              </button>
              
              {/* Google Play Store - Official Badge */}
              <button 
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scrummy&pcampaignid=web_share', '_blank')}
              >
                <img 
                  src="/assets/Store badges/GetItOnGooglePlay_Badge_Web_color_English.png" 
                  alt="Get it on Google Play"
                  className="h-12 w-auto"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DownloadPage; 