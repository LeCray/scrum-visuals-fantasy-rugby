import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Facebook, Youtube, ChevronLeft, ChevronRight, Menu, X, Globe, Shuffle } from "lucide-react";
import { FaTiktok } from 'react-icons/fa';
import ThreeScene from "../components/ThreeScene";

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

// Zimbabwe Players Data
const zimbabwePlayers = [
  {
    name: "Bryan Chiang",
    position: "Hooker",
    age: 21,
    club: "Manchester Met/Broughton Park RFC/Old Hararians",
    knownFor: "Lineout precision and leadership",
    bio: "An exceptional hooker who combines tactical awareness with physical prowess. Bryan's lineout throwing accuracy is unmatched in the region."
  },
  {
    name: "Simba Mandioma",
    position: "Hooker",
    age: 32,
    club: "Old Hararians/Harare Province",
    knownFor: "Veteran leadership and set-piece mastery",
    bio: "A seasoned veteran who brings invaluable experience to the front row. Simba's leadership on and off the field is legendary."
  },
  {
    name: "Liam Larkan",
    position: "Hooker",
    age: 27,
    club: "Pirates RFC- South Africa",
    knownFor: "Dynamic play and mobility",
    bio: "A mobile hooker who excels in both tight and loose play. Liam's adaptability makes him a constant threat."
  },
  {
    name: "Victor Mupunga",
    position: "Prop",
    age: 25,
    club: "Union Sportive Bressane- France",
    knownFor: "Scrum dominance and power",
    bio: "A powerhouse prop who anchors the scrum with authority. Victor's strength and technique are feared by opponents."
  },
  {
    name: "Tyran Fagan",
    position: "Prop",
    age: 33,
    club: "Bizkaia Gernika RT- Spain",
    knownFor: "International experience and consistency",
    bio: "A reliable prop with extensive European experience. Tyran's consistency and professionalism set the standard."
  },
  {
    name: "Jason Fraser",
    position: "Back Row",
    age: 34,
    club: "Nevers-France",
    knownFor: "Breakdown specialist and work rate",
    bio: "A tireless back row forward who excels at the breakdown. Jason's work rate and dedication are inspirational."
  },
  {
    name: "Aiden Burnett",
    position: "Back Row",
    age: 27,
    club: "Old Hararians/Harare Province",
    knownFor: "Versatility and rugby IQ",
    bio: "A versatile back row who can play across multiple positions. Aiden's rugby intelligence makes him invaluable."
  },
  {
    name: "Dylan Utete",
    position: "Back Row",
    age: 25,
    club: "Okman Rugby- South Korea",
    knownFor: "Speed and lineout expertise",
    bio: "A dynamic back row with exceptional speed and lineout skills. Dylan's athleticism creates opportunities."
  }
];

const Index: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasCompletedFullCycle, setHasCompletedFullCycle] = useState(false);
  const [showAfricaCupBanner, setShowAfricaCupBanner] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<typeof zimbabwePlayers[0] | null>(null);

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

  const spinForPlayer = () => {
    const randomPlayer = zimbabwePlayers[Math.floor(Math.random() * zimbabwePlayers.length)];
    setSelectedPlayer(randomPlayer);
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
            <Link to="/" className="text-white hover:text-scrummy-goldYellow font-medium transition-colors">Home</Link>
            <Link to="/fixtures" className="text-white hover:text-scrummy-goldYellow font-medium transition-colors">Fixtures</Link>
            <Link to="/africa-cup" className="text-white hover:text-scrummy-goldYellow font-medium transition-colors">Africa Cup</Link>
            <Link to="/about" className="text-white hover:text-scrummy-goldYellow font-medium transition-colors">About</Link>

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
                <Link to="/" className="block text-white hover:text-scrummy-goldYellow font-medium transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/fixtures" className="block text-white hover:text-scrummy-goldYellow font-medium transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Fixtures</Link>
                <Link to="/africa-cup" className="block text-white hover:text-scrummy-goldYellow font-medium transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Africa Cup</Link>
                <Link to="/about" className="block text-white hover:text-scrummy-goldYellow font-medium transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>

              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 1. Hero Section with Old Site Styling */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* ThreeScene Background - Just like the old site */}
        <ThreeScene />
        
        <div className="content-container h-full flex flex-col items-center justify-center px-4 py-6 relative z-10">
          <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center">
          {/* Logo - Made Much Larger Like Old Site */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <img 
              src="/assets/logo.png" 
              alt="SCRUMMY Fantasy Rugby" 
              className="w-auto mx-auto"
              style={{
                height: 280,
                marginBottom: -30,
                marginTop: -10,
              }}
            />
          </motion.div>

          {/* Main Title - Matching Old Site Exactly */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="font-orbitron text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-4 tracking-wider leading-tight">
              <span className="text-[#003366]">FANTASY RUGBY</span>
              <br />
              <span className="text-[#FFC700] text-2xl md:text-4xl lg:text-5xl">IS ABOUT TO GET <br />SCRUMMY</span>
            </h1>
            <p className="text-scrummy-blue text-base md:text-lg lg:text-xl text-center max-w-3xl mb-0 leading-relaxed font-light">
              Be the First to Join the Scrum!
            </p>
          </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Tournament Slideshow (Unchanged) */}
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
            // Africa Cup Banner stays the same
          <motion.div
              key="africa-cup-banner"
              initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0 }}
              animate={{ clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", opacity: 1 }}
              exit={{ clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)", opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", clipPath: { duration: 1.2, ease: "easeOut" }, opacity: { duration: 0.8, ease: "easeInOut" } }}
              className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black"
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                      <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                      >
                        Rugby Africa Cup 2025
                      </motion.h1>
          <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    className="text-xl text-white/90 mb-8"
                      >
                        African Rugby Union Championship
          </motion.p>
                     <motion.div
                       initial={{ y: 20, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ delay: 1.6, duration: 0.6 }}
                     >
                       <Link to="/africa-cup">
                      <Button size="lg" className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-8 py-4">
                               🚀 Explore Africa Cup
                           </Button>
                       </Link>
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
        </div>
      </section>

      {/* 3. Player Carousel Section */}
      <section className="py-16 bg-scrummy-navy/5 section-meet-player">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-scrummy-navy mb-4">
              Meet a Player
            </h2>
            <p className="text-lg text-gray-600">
              Discover the stars driving the game forward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {zimbabwePlayers.slice(0, 3).map((player, index) => (
          <motion.div
                key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedPlayer(player)}
          >
                <div className="text-center">
                  <div className="w-20 h-20 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-scrummy-navy">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-orbitron text-xl font-bold text-scrummy-navy mb-2">
                    {player.name}
                  </h3>
                  <p className="text-scrummy-blue font-semibold mb-2">{player.position}</p>
                  <p className="text-scrummy-goldYellow font-medium text-sm">
                    {player.knownFor}
                  </p>
                </div>
          </motion.div>
            ))}
        </div>

          <div className="text-center mt-8">
            <Button 
              onClick={spinForPlayer}
              className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-8 py-3"
            >
              <Shuffle className="w-5 h-5 mr-2" />
              🔁 Meet Another Player
            </Button>
          </div>
        </div>

        {/* Player Modal */}
        <AnimatePresence>
          {selectedPlayer && (
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedPlayer(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-scrummy-navy">
                      {selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-orbitron text-2xl font-bold text-scrummy-navy mb-2">
                    {selectedPlayer.name}
                  </h3>
                  <p className="text-scrummy-blue font-semibold mb-1">{selectedPlayer.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{selectedPlayer.club}</p>
                  <div className="bg-scrummy-navy/5 rounded-lg p-4 mb-4">
                    <p className="font-semibold text-scrummy-navy mb-2">Known for:</p>
                    <p className="text-scrummy-goldYellow font-medium">{selectedPlayer.knownFor}</p>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {selectedPlayer.bio}
                  </p>
                  <Button 
                    onClick={() => setSelectedPlayer(null)}
                    className="bg-scrummy-navy hover:bg-scrummy-blue text-white w-full"
                  >
                    Close
                  </Button>
                      </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. The Competitions That Drive Everything */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-scrummy-navy mb-4">
              The competitions that <span className="text-scrummy-blue">drive everything</span>
            </h2>
            <p className="text-lg text-gray-600">
              From these matches flow fixtures, fantasy, predictions & more
            </p>
                    </div>

          <div className="grid gap-8">
            {/* Large Featured Competition */}
            <Card className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 text-white hover:scale-105 transition-transform duration-300 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="bg-orange-400 rounded-full px-3 py-1 text-xs font-medium inline-block mb-4">
                      Tournament
                      </div>
                    <h3 className="font-orbitron text-2xl md:text-3xl font-bold mb-2">Rugby Africa Cup 2025</h3>
                    <p className="text-white/90 text-lg mb-4">African Rugby Union Championship</p>
                    <div className="flex items-center gap-4 text-white/80">
                      <span>📅 July 8-19, 2025</span>
                      <span>📍 Kampala, Uganda</span>
                      <span>🏉 8 Nations</span>
                    </div>
                    <div className="mt-6">
                      <Link to="/africa-cup">
                        <Button className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold">
                          🏆 Explore Africa Cup
                        </Button>
                      </Link>
                      </div>
                    </div>
                  <div className="hidden md:block">
                    <div className="bg-orange-400 rounded-xl p-6 text-center">
                      <div className="text-4xl mb-2">🏆</div>
                      <p className="font-bold">Africa Cup Coverage</p>
                      <p className="text-sm opacity-80">8 Competing Nations</p>
                      <p className="text-sm opacity-80">Live Tournament Updates</p>
                  </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smaller Competition Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "URC Championship", subtitle: "United Rugby Championship featuring SA's finest", teams: "16 Teams", color: "from-blue-600 to-blue-500" },
                { title: "Investec Champions Cup", subtitle: "Europe's premier club competition", teams: "24 Teams", color: "from-green-600 to-green-500" },
                { title: "EPCR Challenge Cup", subtitle: "Second-tier European competition", teams: "20 Teams", color: "from-purple-600 to-purple-500" }
              ].map((comp, index) => (
                <Card key={index} className={`bg-gradient-to-r ${comp.color} text-white hover:scale-105 transition-transform duration-300 cursor-pointer`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">🏉</span>
                    </div>
                    <h3 className="font-orbitron text-xl font-bold mb-2">{comp.title}</h3>
                    <p className="text-white/90 mb-4">{comp.subtitle}</p>
                    <div className="text-sm text-white/80">
                      <p className="bg-white/20 rounded-full px-3 py-1 inline-block">{comp.teams}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
              <h3 className="font-orbitron text-2xl font-bold mb-2">Ready to compete?</h3>
              <p className="text-lg mb-6">Build your team and battle friends in weekly leagues</p>
              <Button className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-8 py-3">
                🏆 Build a Team - Compete with Friends
                    </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Fixtures & Predictions */}
      <section className="py-16 bg-scrummy-navy/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-scrummy-navy mb-4">
              Every match, <span className="text-green-600">every level</span>
            </h2>
            <p className="text-lg text-gray-600">
              From Springboks to school finals - fixtures, predictions & live chat
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              <button className="px-6 py-2 rounded-md text-gray-600 hover:text-scrummy-navy transition-colors">
                PRO
              </button>
              <button className="px-6 py-2 rounded-md bg-scrummy-navy text-white font-bold">
                SBR
              </button>
            </div>
          </div>

          {/* Match Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Live Match Card */}
            <Card className="bg-white border-2 border-green-200 hover:border-green-400 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-blue-600 font-medium">Interschools</span>
                    <p className="text-sm text-gray-600">Newlands</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-red-500 font-medium">• LIVE 67</span>
                    <p className="text-sm text-gray-600">Sat, 19 Jul</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold">WP</span>
                    </div>
                    <p className="font-bold text-green-600 text-2xl">31</p>
                    <p className="text-sm text-gray-600">Wynberg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">vs</p>
                    <div className="text-sm text-green-600 mt-2">• Penalty try awarded</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold">PA</span>
                    </div>
                    <p className="font-bold text-2xl">28</p>
                    <p className="text-sm text-gray-600">Paarl Gym</p>
                  </div>
                </div>

                <Button className="w-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                  💬 Join Live Chat (247 fans)
                </Button>
                </CardContent>
              </Card>

            {/* Upcoming Match Card */}
            <Card className="bg-white border-2 border-scrummy-navy/10 hover:border-scrummy-goldYellow/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-blue-600 font-medium">Interschools</span>
                    <p className="text-sm text-gray-600">Newlands</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-scrummy-navy">03:00</p>
                    <p className="text-sm text-gray-600">Sat, 19 Jul</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold">BI</span>
                    </div>
                    <p className="font-bold">Bishops</p>
                    <p className="text-sm text-gray-600">Home</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">vs</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold">RO</span>
                    </div>
                    <p className="font-bold">Rondebosch</p>
                    <p className="text-sm text-gray-600">Away</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-scrummy-navy hover:bg-scrummy-blue text-white">
                    🎯 Predict
                  </Button>
                  <Button variant="outline" className="flex-1 border-scrummy-navy text-scrummy-navy hover:bg-scrummy-navy hover:text-white">
                    💬 Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Icons */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { icon: "📅", title: "All Fixtures", desc: "Complete schedules for professional & school rugby" },
              { icon: "🎯", title: "Smart Predictions", desc: "Make predictions on every match outcome" },
              { icon: "💬", title: "Live Chat", desc: "Real-time discussions during every game" }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-scrummy-goldYellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="font-orbitron text-xl font-bold text-scrummy-navy mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 text-center">
            <div className="bg-black/20 rounded-lg p-4 mb-4 max-w-md mx-auto">
              <p className="font-bold">A: "I like the EVERY MATCH EVERY LEVEL..."</p>
              <p className="text-sm opacity-80">+1 other comment</p>
            </div>
            <p className="text-lg">Experience rugby without limits - join the conversation!</p>
          </div>
        </div>
      </section>

      {/* 6. Fantasy League: Build Your XV + Compare */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white section-fantasy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
              Build Your Dream XV
            </h2>
            <p className="text-xl text-white/90">
              Create your ultimate team and compete in fantasy leagues
            </p>
                      </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Team Builder */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">TEAM BUILDER</span>
                  <h3 className="text-2xl font-bold mt-2">Your Starting XV</h3>
                    </div>
                <div className="text-right">
                  <p className="text-sm opacity-80">Team Value</p>
                  <p className="text-2xl font-bold text-green-400">R2.4M</p>
                      </div>
                    </div>
              
              <div className="grid grid-cols-5 gap-3 mb-6">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="bg-scrummy-goldYellow rounded-lg p-3 text-center hover:scale-105 transition-transform cursor-pointer">
                    <div className="text-scrummy-navy font-bold text-lg">{i + 1}</div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⏸</span>
                </div>
                <Button className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold w-full">
                  ⚡ Start Building Your Team
                </Button>
              </div>
            </div>

            {/* Featured Players */}
            <div className="space-y-6">
              <h3 className="font-orbitron text-2xl font-bold">Featured Players</h3>
              {[
                { name: "Vincent Tshituka", position: "Back Row", price: "R180k", pr: "PR 86", color: "bg-yellow-500" },
                { name: "Sebastian Negri", position: "Back Row", price: "R165k", pr: "PR 83", color: "bg-yellow-500" },
                { name: "Dan Sheehan", position: "Front Row", price: "R170k", pr: "PR 82", color: "bg-yellow-500" }
              ].map((player, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${player.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-black font-bold text-sm">{player.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    <div>
                      <p className="font-bold">{player.name}</p>
                      <p className="text-sm opacity-80">{player.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{player.price}</p>
                    <p className="text-sm opacity-80">{player.pr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fantasy Leagues */}
          <div className="mt-16">
            <h3 className="font-orbitron text-2xl font-bold text-center mb-8">Join Fantasy Leagues</h3>
            <p className="text-center text-white/80 mb-8">Weekly competitions with real prizes</p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">LIVE</span>
                      <h4 className="font-bold text-lg mt-2">URC Final League</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold text-lg">R50,000</p>
                      <p className="text-sm opacity-80">Prize Pool</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <p className="text-blue-400 font-bold text-lg">847</p>
                      <p className="text-sm opacity-80">Teams</p>
                    </div>
                    <div className="text-center">
                      <p className="text-yellow-400 font-bold">1st</p>
                      <p className="text-sm opacity-80">Bulls United</p>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    View League
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">UPCOMING</span>
                      <h4 className="font-bold text-lg mt-2">Champions Cup Final</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-bold text-lg">2d 14h</p>
                      <p className="text-sm opacity-80">Draft opens in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <p className="text-purple-400 font-bold text-lg">R75,000</p>
                      <p className="text-sm opacity-80">Prize Pool</p>
                    </div>
                    <div className="text-center">
                      <p className="text-orange-400 font-bold">1,200</p>
                      <p className="text-sm opacity-80">Max Teams</p>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    🏆 Join League
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 font-bold px-8 py-4">
                🏆 Browse All Leagues
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Social & Podcast Feed */}
      <section className="py-16 bg-white section-social">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-scrummy-navy mb-4">
              Follow the <span className="text-pink-500">conversation</span>
            </h2>
            <p className="text-lg text-gray-600">
              Live from our Instagram & TikTok
            </p>
            </div>
            
          {/* Social Media Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { platform: "IG", handle: "@scrummy_rugby", content: "URC Final Highlights", time: "2h", color: "from-purple-600 to-pink-500", stats: "2.4k ❤️ 156 💬" },
              { platform: "TT", handle: "@scrummy_rugby", content: "Kolbe's Magic Step compilation", time: "4h", color: "from-teal-600 to-green-500", stats: "8.2k ❤️ 342 💬" },
              { platform: "IG", handle: "@scrummy_rugby", content: "Player Stats Weekly update", time: "6h", color: "from-orange-600 to-yellow-500", stats: "1.8k ❤️ 89 💬" },
              { platform: "TT", handle: "@scrummy_rugby", content: "School Rugby Rising stars", time: "1d", color: "from-purple-600 to-pink-500", stats: "5.7k ❤️ 234 💬" }
            ].map((post, index) => (
              <Card key={index} className={`bg-gradient-to-r ${post.color} text-white hover:scale-105 transition-transform duration-300 cursor-pointer`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{post.platform}</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{post.time}</span>
                  </div>
                  <h3 className="font-bold mb-2">{post.content}</h3>
                  <p className="text-sm opacity-90 mb-3">{post.handle}</p>
                  <p className="text-xs opacity-80">{post.stats}</p>
                </CardContent>
              </Card>
            ))}
              </div>
              
          {/* Podcast Section */}
          <div className="bg-gradient-to-r from-slate-900 to-black text-white rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">LIVE</span>
                <h3 className="text-2xl font-bold mt-4 mb-2">The Breakdown: URC Round 12 Review</h3>
                <p className="text-white/80 mb-4">Hosted by John Smith • 45 min</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl">▶</span>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Latest Episode</p>
                    <p className="text-sm">👁 12.4k views • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    ▶ Watch Now
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    + Add to Podcast App
                  </Button>
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <span className="text-xs text-green-400">Analysis</span>
                    <h4 className="font-bold">Why the Stormers' pack is unstoppable</h4>
                    <p className="text-sm opacity-80">Breaking down the forward dominance that's driving their title charge...</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <span className="text-xs text-blue-400">Interview</span>
                    <h4 className="font-bold">Rising star: Meet the schoolboy sensation</h4>
                    <p className="text-sm opacity-80">Exclusive chat with the 17-year-old taking SA schools rugby by storm...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Follow Buttons */}
          <div className="flex justify-center gap-4">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
              📸 Follow on Instagram
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800">
              🎵 Follow on TikTok
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Block */}
      <section className="py-16 bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6">
            Think you know rugby?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Make predictions on every match and climb the leaderboards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-8 py-4"
              onClick={() => window.open('https://scrummy-app.ai', '_blank')}
            >
              🎯 Start Making Predictions
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-scrummy-navy font-bold px-8 py-4"
            >
              📱 Get the App
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" alt="SCRUMMY Logo" className="h-12 mb-4" />
              <p className="text-white/80 text-sm">The Home of School Boy Rugby</p>
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-scrummy-goldYellow mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/fixtures" className="block text-white/80 hover:text-scrummy-goldYellow transition-colors">Fixtures</Link>
                <Link to="/africa-cup" className="block text-white/80 hover:text-scrummy-goldYellow transition-colors">Africa Cup</Link>
                <Link to="/about" className="block text-white/80 hover:text-scrummy-goldYellow transition-colors">About</Link>
              </div>
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-scrummy-goldYellow mb-4">Support</h4>
              <div className="space-y-2">
                <Link to="/support" className="block text-white/80 hover:text-scrummy-goldYellow transition-colors">Help Center</Link>
                <Link to="/privacy" className="block text-white/80 hover:text-scrummy-goldYellow transition-colors">Privacy Policy</Link>
                <Link to="/download" className="block text-white/80 hover:text-scrummy-goldYellow transition-colors">Download App</Link>
              </div>
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-scrummy-goldYellow mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/scrummyapp_/" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
                  <Instagram size={24} />
              </a>
                <a href="https://www.facebook.com/profile.php?id=61574057183440" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
                  <Facebook size={24} />
              </a>
                <a href="https://www.tiktok.com/@scrummy_fantasy" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
                  <FaTiktok size={24} />
              </a>
                <a href="https://www.youtube.com/channel/UCnKVk_L_fda9OuA5vDZBmmA" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
                  <Youtube size={24} />
              </a>
              </div>
            </div>
            </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">© 2025 SCRUMMY. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
  );
};

export default Index;
