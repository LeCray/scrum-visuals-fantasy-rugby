import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Facebook, Youtube, ChevronLeft, ChevronRight, Menu, X, Globe } from "lucide-react";
import { FaTiktok } from 'react-icons/fa';

// Featured events data - includes major international tournaments
const featuredEvents = [
  {
    id: 1,
    title: "CBZ Schools Rugby Championship",
    subtitle: "Zimbabwe's Premier School Rugby Tournament",
    date: "March 2025",
    location: "Harare, Zimbabwe",
    gradient: "from-scrummy-navy via-scrummy-blue to-indigo-700",
    upcoming: true,
    featured: true,
    matchCount: 45
  },
  {
    id: 2,
    title: "Women's Rugby World Cup",
    subtitle: "International Women's Rugby Championship",
    date: "August 2025",
    location: "England, United Kingdom",
    gradient: "from-pink-600 via-rose-500 to-pink-700",
    comingSoon: true,
    international: true,
    matchCount: 32
  },
  {
    id: 3,
    title: "Rugby Africa Cup 2025",
    subtitle: "African Rugby Union Championship",
    date: "July 8-19, 2025",
    location: "Kampala, Uganda",
    gradient: "from-orange-600 via-amber-500 to-yellow-500",
    upcoming: true,
    international: true,
    matchCount: 16
  },
  {
    id: 4,
    title: "SA Schools Rugby Championship",
    subtitle: "South African Inter-School Tournament",
    date: "April 2025",
    location: "Cape Town, South Africa",
    gradient: "from-green-600 via-emerald-500 to-teal-500",
    upcoming: true,
    matchCount: 38
  },
  {
    id: 5,
    title: "Derby Day Rugby Festival",
    subtitle: "Traditional School Rugby Rivalries",
    date: "May 2025",
    location: "Multiple Venues, Zimbabwe",
    gradient: "from-purple-600 via-violet-500 to-purple-700",
    featured: true,
    matchCount: 18
  }
];



const Index: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasCompletedFullCycle, setHasCompletedFullCycle] = useState(false);
  const [showAfricaCupBanner, setShowAfricaCupBanner] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-advance slideshow - sticks to Africa Cup (index 2) after full cycle
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        
        // If we've reached the end and haven't completed a full cycle yet
        if (nextSlide >= featuredEvents.length && !hasCompletedFullCycle) {
          setHasCompletedFullCycle(true);
          return 2; // Go to Africa Cup slide (index 2)
        }
        
        // If we've completed a full cycle, stay on Africa Cup
        if (hasCompletedFullCycle) {
          return 2; // Stay on Africa Cup slide
        }
        
        // Normal cycling through slides
        return nextSlide % featuredEvents.length;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, hasCompletedFullCycle]);

  // Transition to Africa Cup banner after 2 seconds on Africa Cup slide
  useEffect(() => {
    if (hasCompletedFullCycle && currentSlide === 2) {
      const timer = setTimeout(() => {
        setShowAfricaCupBanner(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (currentSlide !== 2) {
      setShowAfricaCupBanner(false);
    }
  }, [hasCompletedFullCycle, currentSlide]);

  // Resume autoplay after 2 seconds of manual navigation
  useEffect(() => {
    if (!isAutoPlaying) {
      const timer = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying]);



  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
    setIsAutoPlaying(false);
  };

  const currentEvent = featuredEvents[currentSlide];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="bg-scrummy-navy/95 backdrop-blur-md border-b border-scrummy-goldYellow/20 sticky top-0 z-50">
        <div className="w-full pr-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-200 pl-2">
            <img src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" alt="SCRUMMY Logo" className="h-14 w-auto opacity-95 hover:opacity-100" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-scrummy-goldYellow font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/fixtures" 
              className="text-white hover:text-scrummy-goldYellow font-medium transition-colors"
            >
              Fixtures
            </Link>
            <Link 
              to="/africa-cup" 
              className="text-white hover:text-scrummy-goldYellow font-medium transition-colors"
            >
              Africa Cup
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-scrummy-goldYellow font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              to="/newsletter" 
              className="text-white hover:text-scrummy-goldYellow font-medium transition-colors blur-sm opacity-50 pointer-events-none"
            >
              Newsletter
            </Link>
            <Button 
              className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-semibold px-4 py-2"
              onClick={() => window.open('https://scrummy-app.ai', '_blank')}
            >
              <Globe className="w-4 h-4 mr-2" />
              Launch Web App
              </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-scrummy-goldYellow transition-colors p-2"
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
              className="lg:hidden bg-scrummy-navy/98 backdrop-blur-md border-t border-scrummy-goldYellow/20"
            >
              <nav className="px-4 py-4 space-y-4">
                <Link 
                  to="/" 
                  className="block text-white hover:text-scrummy-goldYellow font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/fixtures" 
                  className="block text-white hover:text-scrummy-goldYellow font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fixtures
                </Link>
                <Link 
                  to="/africa-cup" 
                  className="block text-white hover:text-scrummy-goldYellow font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Africa Cup
                </Link>
                <Link 
                  to="/about" 
                  className="block text-white hover:text-scrummy-goldYellow font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/newsletter" 
                  className="block text-white hover:text-scrummy-goldYellow font-medium transition-colors py-2 blur-sm opacity-50 pointer-events-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Newsletter
                </Link>
                <Button 
                  className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-semibold px-6 py-3 w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open('https://scrummy-app.ai', '_blank');
                  }}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Launch Web App
                  </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Featured Events Slideshow */}
      <section className="relative h-[50vh] sm:h-[45vh] md:h-[40vh] lg:h-[35vh] overflow-hidden">
        <AnimatePresence mode="wait">
          {!showAfricaCupBanner ? (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`absolute inset-0 bg-gradient-to-r ${currentEvent.gradient}`}
            >
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
                  {/* Event Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs sm:text-sm font-medium">
                    {(currentEvent.upcoming || currentEvent.comingSoon) && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
                    {currentEvent.comingSoon ? "Coming Soon" : currentEvent.upcoming ? "Upcoming" : currentEvent.featured ? "Featured" : currentEvent.international ? "International" : "Tournament"}
                  </div>

                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-3">
                      {currentEvent.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-3 md:mb-4">
                      {currentEvent.subtitle}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-white/80 text-xs sm:text-sm mb-4 md:mb-6">
                    <span>📅 {currentEvent.date}</span>
                    <span>📍 {currentEvent.location}</span>
                    <span>🏉 {currentEvent.matchCount} Matches</span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex justify-center md:justify-start gap-3">
                    {currentEvent.comingSoon ? (
                      <Button size="lg" className="bg-gray-400 text-white cursor-not-allowed px-6 sm:px-8 py-3 text-sm sm:text-base" disabled>
                        Coming Soon
                      </Button>
                    ) : (
                    <Link to={currentEvent.id === 3 ? "/africa-cup" : "/fixtures"}>
                      <Button size="lg" className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-semibold px-6 sm:px-8 py-3 text-sm sm:text-base">
                        {currentEvent.id === 3 ? "Explore Africa Cup" : "View Fixtures"}
                      </Button>
                    </Link>
                    )}
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
                        <div className="w-16 h-16 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto">
                          <span className="text-xl font-bold text-scrummy-navy">SBR</span>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">Live Rugby Coverage</p>
                          <p className="text-sm opacity-80">5 Major Competitions</p>
                          <p className="text-sm opacity-80">50+ Schools Tracked</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
          ) : (
            // Africa Cup Banner with Animations
          <motion.div
              key="africa-cup-banner"
              initial={{ 
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                opacity: 0
              }}
              animate={{
                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                opacity: 1
              }}
              exit={{ 
                clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
                opacity: 0
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
                clipPath: { duration: 1.2, ease: "easeOut" },
                opacity: { duration: 0.8, ease: "easeInOut" }
              }}
              className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black"
            >
              {/* Animated Geometric Elements */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 right-0 w-80 h-full bg-gradient-to-br from-teal-500/40 to-green-500/40 transform skew-x-12 translate-x-40"
              />
              <motion.div
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.2, ease: "easeOut" }}
                className="absolute top-0 right-16 w-64 h-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 transform skew-x-12 translate-x-24"
              />
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.1, ease: "easeOut" }}
                className="absolute bottom-0 left-0 w-48 h-full bg-gradient-to-tr from-orange-500/40 to-red-500/40 transform -skew-x-12 -translate-x-24"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                  {/* Left Content */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-white space-y-3 md:space-y-4 text-center md:text-left"
                  >
                    {/* Tournament Badge */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 1, -1, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs sm:text-sm font-medium"
                    >
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      Tournament
          </motion.div>

                    <div>
                      <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-3"
                      >
                        Rugby Africa Cup 2025
                      </motion.h1>
          <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="text-base sm:text-lg md:text-xl text-white/90 mb-3 md:mb-4"
                      >
                        African Rugby Union Championship
          </motion.p>
                    </div>

                    {/* Event Details */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.6 }}
                      className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-white/80 text-xs sm:text-sm mb-4 md:mb-6"
                    >
                      <span>📅 July 8-19, 2025</span>
                      <span>📍 Kampala, Uganda</span>
                      <span>🏉 8 Nations</span>
                    </motion.div>

                                         {/* CTA Buttons */}
                     <motion.div
                       initial={{ y: 20, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ delay: 1.6, duration: 0.6 }}
                       className="flex justify-center md:justify-start gap-3"
                     >
                       <Link to="/africa-cup">
                         <motion.div
                           animate={{ 
                             y: [0, -8, 0],
                             scale: [1, 1.05, 1],
                             boxShadow: [
                               "0 4px 6px -1px rgba(251, 191, 36, 0.3)",
                               "0 10px 25px -3px rgba(251, 191, 36, 0.6)",
                               "0 4px 6px -1px rgba(251, 191, 36, 0.3)"
                             ]
                           }}
                           transition={{ 
                             duration: 2.5,
                             repeat: Infinity,
                             ease: "easeInOut"
                           }}
                           whileHover={{ 
                             scale: 1.1,
                             y: -5,
                             boxShadow: "0 20px 25px -5px rgba(251, 191, 36, 0.8)",
                             transition: { duration: 0.2 }
                           }}
                           whileTap={{ scale: 0.95 }}
                           className="relative"
                         >
                           <Button size="lg" className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold transition-all duration-300 relative overflow-hidden group px-6 sm:px-8 py-3 text-sm sm:text-base">
                             <motion.span
                               animate={{ 
                                 textShadow: [
                                   "0 0 0px rgba(30, 58, 138, 0.5)",
                                   "0 0 10px rgba(30, 58, 138, 0.8)",
                                   "0 0 0px rgba(30, 58, 138, 0.5)"
                                 ]
                               }}
                               transition={{ 
                                 duration: 2,
                                 repeat: Infinity,
                                 ease: "easeInOut"
                               }}
                             >
                               🚀 Explore Africa Cup
                             </motion.span>
                             
                             {/* Animated background pulse */}
                             <motion.div
                               className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 group-hover:opacity-20"
                               animate={{ 
                                 scale: [1, 1.2, 1],
                                 opacity: [0, 0.1, 0]
                               }}
                               transition={{ 
                                 duration: 2,
                                 repeat: Infinity,
                                 ease: "easeInOut"
                               }}
                             />
                             
                             {/* Sparkle effect */}
                             <motion.div
                               className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"
                               animate={{ 
                                 scale: [0, 1, 0],
                                 rotate: [0, 180, 360]
                               }}
                               transition={{ 
                                 duration: 3,
                                 repeat: Infinity,
                                 ease: "easeInOut",
                                 delay: 0.5
                               }}
                             />
                           </Button>
                         </motion.div>
                       </Link>
                     </motion.div>
                  </motion.div>

                  {/* Right Content - Stats Card */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                    className="hidden lg:block"
                  >
                    <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="text-center text-white space-y-4">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ 
                              duration: 8,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto"
                          >
                            <span className="text-xl font-bold text-white">RAC</span>
                          </motion.div>
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm rounded-full p-3 sm:p-2 text-white transition-all touch-manipulation"
        >
          <ChevronLeft className="w-6 h-6 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm rounded-full p-3 sm:p-2 text-white transition-all touch-manipulation"
        >
          <ChevronRight className="w-6 h-6 sm:w-5 sm:h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="flex gap-3 sm:gap-2 mb-2">
            {featuredEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-all touch-manipulation ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                } ${index === 2 && hasCompletedFullCycle ? 'ring-2 ring-scrummy-goldYellow' : ''}`}
              />
            ))}
          </div>
          {hasCompletedFullCycle && (
            <div className="text-center">
              <div className="inline-flex items-center gap-1 bg-scrummy-goldYellow/90 text-scrummy-navy px-2 py-1 rounded-full text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-scrummy-navy rounded-full animate-pulse"></span>
                {showAfricaCupBanner ? "Live Africa Cup Banner" : "Featuring Africa Cup"}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Value Proposition */}
      <section className="py-12 sm:py-16 bg-scrummy-navy/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-scrummy-navy">
              The Home of <span className="text-scrummy-goldYellow">School Boy Rugby</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Live fixtures, real-time results, and comprehensive statistics from school boy rugby competitions 
              across Zimbabwe and South Africa. Experience rugby like never before.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two-Column Features */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-scrummy-navy/10 to-scrummy-blue/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
            {/* Live Data Section */}
          <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm border-scrummy-navy/20 shadow-xl">
                <CardContent className="p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Now
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-scrummy-navy mb-3 sm:mb-4">
                    Real-Time Rugby Intelligence
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                    Stay connected to every match with live scores, detailed statistics, and comprehensive fixture information. 
                    Our platform tracks every try, conversion, and penalty as it happens.
                  </p>
                  <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                        <span className="text-scrummy-navy font-bold text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm">Live match updates and scores</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                        <span className="text-scrummy-navy font-bold text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm">Detailed player and team statistics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                        <span className="text-scrummy-navy font-bold text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm">Complete fixture schedules</span>
                    </div>
                  </div>
                  <Link to="/fixtures">
                    <Button className="bg-scrummy-navy text-white hover:bg-scrummy-blue w-full py-3 sm:py-2 text-sm sm:text-base">
                      Explore Live Fixtures
                    </Button>
                  </Link>
                </CardContent>
              </Card>
          </motion.div>

            {/* Web App Section */}
          <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full bg-gradient-to-br from-scrummy-goldYellow/20 to-scrummy-gold/30 border-scrummy-goldYellow/30 shadow-xl">
                <CardContent className="p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Available Now
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-scrummy-navy mb-3 sm:mb-4">
                    Use SCRUMMY Web App
              </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    Access all SCRUMMY features instantly in your browser. Vote for your favorite players, 
                    get live match updates, and join the rugby community. No download required!
                  </p>
                  <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                        <span className="text-scrummy-navy font-bold text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm">Vote for players and teams</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                        <span className="text-scrummy-navy font-bold text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm">Live scores and match updates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                        <span className="text-scrummy-navy font-bold text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm">Follow tournaments and leagues</span>
                    </div>
                  </div>
                  <Button 
                    className="bg-scrummy-navy text-white hover:bg-scrummy-blue w-full py-3 sm:py-2 text-sm sm:text-base"
                    onClick={() => window.open('https://scrummy-app.ai', '_blank')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Launch Web App
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-scrummy-goldYellow text-base sm:text-lg mb-1 sm:mb-2">SCRUMMY</h3>
              <p className="text-white/80 text-xs sm:text-sm">The Home of School Boy Rugby</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
              {/* Navigation Links */}
              <div className="flex gap-4 text-sm">
                <Link to="/support" className="hover:text-scrummy-goldYellow transition-colors">
                  Support
                </Link>
                <Link to="/privacy" className="hover:text-scrummy-goldYellow transition-colors">
                  Privacy
                </Link>
                <Link to="/download" className="hover:text-scrummy-goldYellow transition-colors">
                  Download
                </Link>
                <Link to="/africa-cup" className="hover:text-scrummy-goldYellow transition-colors">
                  Africa Cup
                </Link>
              </div>
              
              {/* Social Media Links */}
            <div className="flex gap-4 sm:gap-6">
              <a href="https://www.instagram.com/scrummyapp_/" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors p-2 sm:p-0">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61574057183440" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors p-2 sm:p-0">
                <Facebook size={20} />
              </a>
              <a href="https://www.tiktok.com/@scrummy_fantasy" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors p-2 sm:p-0">
                <FaTiktok size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UCnKVk_L_fda9OuA5vDZBmmA" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors p-2 sm:p-0">
                <Youtube size={20} />
              </a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-white/60 text-xs">© 2025 SCRUMMY</p>
            </div>
          </div>
        </div>
      </footer>
      </div>
  );
};

export default Index;
