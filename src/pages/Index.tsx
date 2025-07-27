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
    gradient: "from-scrummy-navy via-scrummy-blue to-scrummy-electricBlue",
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
    gradient: "from-scrummy-goldYellow via-scrummy-gold to-scrummy-yellow",
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
    gradient: "from-scrummy-navy to-scrummy-blue",
    upcoming: true,
    matchCount: 38
  },
  {
    id: 5,
    title: "Derby Day Rugby Festival",
    subtitle: "Traditional School Rugby Rivalries",
    date: "May 2025",
    location: "Multiple Venues, Zimbabwe",
    gradient: "from-scrummy-electricBlue via-scrummy-blue to-scrummy-navy",
    featured: true,
    matchCount: 18
  }
];

// Women's Rugby Players Data
const zimbabwePlayers = [
  {
    name: "Ellie Kildunne",
    position: "Fullback",
    age: 25,
    club: "England Women's Rugby",
    knownFor: "Pace and attacking flair",
    bio: "A dynamic fullback who combines electric pace with exceptional game awareness. Ellie's attacking threat from the back is unmatched in women's rugby.",
    pr: 94,
    image: "/assets/Women's card pics style/England_ Ellie kildunne.png",
    flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
  },
  {
    name: "Ruby Tui",
    position: "Wing",
    age: 32,
    club: "New Zealand Black Ferns",
    knownFor: "Finishing ability and leadership",
    bio: "A world-class winger who brings invaluable experience and leadership. Ruby's finishing ability and work rate make her a legend of the game.",
    pr: 96,
    image: "/assets/Women's card pics style/New Zealand_ Ruby Tui.png",
    flagEmoji: "🇳🇿"
  },
  {
    name: "Alev Kelter",
    position: "Center",
    age: 29,
    club: "USA Women's Rugby",
    knownFor: "Power running and versatility",
    bio: "A powerful center who excels in both attack and defense. Alev's versatility and athleticism make her a constant threat.",
    pr: 89,
    image: "/assets/Women's card pics style/USA_ Alev Kelter.png",
    flagEmoji: "🇺🇸"
  },
  {
    name: "Siokapesi Palu",
    position: "Prop",
    age: 26,
    club: "Australia Wallaroos",
    knownFor: "Scrum dominance and mobility",
    bio: "A dominant prop who anchors the scrum with authority. Siokapesi's strength and mobility around the field are exceptional.",
    pr: 87,
    image: "/assets/Women's card pics style/Australia_ Siokapesi Palu.png",
    flagEmoji: "🇦🇺"
  },
  {
    name: "Alba Capell",
    position: "Flanker",
    age: 28,
    club: "Spain Women's Rugby",
    knownFor: "Breakdown expertise and work rate",
    bio: "A tireless flanker who excels at the breakdown. Alba's work rate and dedication set the standard for Spanish rugby.",
    pr: 85,
    image: "/assets/Women's card pics style/Spain_ Alba Capell.png",
    flagEmoji: "🇪🇸"
  },
  {
    name: "Micke Gunter",
    position: "Lock",
    age: 27,
    club: "South Africa Springbok Women",
    knownFor: "Lineout mastery and physicality",
    bio: "A dominant lock who combines lineout expertise with powerful ball-carrying. Micke's physicality makes her a force in the pack.",
    pr: 88,
    image: "/assets/Women's card pics style/South Africa_ Micke Gunter.png",
    flagEmoji: "🇿🇦"
  },
  {
    name: "Valeria Fedrighi",
    position: "Scrum-half",
    age: 25,
    club: "Italy Women's Rugby",
    knownFor: "Quick service and tactical awareness",
    bio: "A dynamic scrum-half who controls the tempo of the game. Valeria's quick service and tactical awareness are key to Italy's success.",
    pr: 83,
    image: "/assets/Women's card pics style/Italy_ Valeria Fedrighi.png",
    flagEmoji: "🇮🇹"
  },
  {
    name: "Easter Savelio",
    position: "Number 8",
    age: 24,
    club: "Samoa Women's Rugby",
    knownFor: "Power and ball-handling skills",
    bio: "A powerful number 8 who combines strength with exceptional ball-handling skills. Easter's athleticism creates opportunities for her team.",
    pr: 86,
    image: "/assets/Women's card pics style/Samoa_ Easter Savelio.png",
    flagEmoji: "🇼🇸"
  },
  {
    name: "Rinka Matsunda",
    position: "Fly-half",
    age: 23,
    club: "Japan Sakura Fifteen",
    knownFor: "Precision kicking and game management",
    bio: "A skillful fly-half with exceptional game management abilities. Rinka's precision kicking and tactical awareness drive Japan's attacking play.",
    pr: 84,
    image: "/assets/Women's card pics style/Japan_ Rinka matsunda.png",
    flagEmoji: "🇯🇵"
  }
];

const Index: React.FC = () => {
  // Focus on Women's Rugby World Cup (index 1)
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<typeof zimbabwePlayers[0] | null>(null);

  // Auto-advance slideshow - DISABLED to focus on Women's Rugby World Cup
  // useEffect(() => {
  //   if (!isAutoPlaying) return;
  //   
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
  //   }, 5000); // 5 seconds per slide

  //   return () => clearInterval(interval);
  // }, [isAutoPlaying]);

  // Resume autoplay after manual navigation - DISABLED
  // useEffect(() => {
  //   if (!isAutoPlaying) {
  //     const timer = setTimeout(() => {
  //       setIsAutoPlaying(true);
  //     }, 3000); // Resume after 3 seconds

  //     return () => clearTimeout(timer);
  //   }
  // }, [isAutoPlaying]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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

      {/* 1. Hero Section - Scrummy Brand Introduction */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-scrummy-navy/5 to-scrummy-blue/5" />
        {/* ThreeScene Background - Just like the old site */}
        <ThreeScene />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-scrummy-navy leading-tight">
              FANTASY RUGBY
              <span className="block text-scrummy-goldYellow">IS ABOUT TO GET SCRUMMY</span>
            </h1>
            <p className="text-lg md:text-xl text-scrummy-blue max-w-3xl mx-auto">
              Be the First to Join the Scrum!
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Tournament Coverage - Box Banner */}
      <section className="py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-r ${currentEvent.gradient} rounded-xl p-6 text-white relative overflow-hidden`}
            >
              {/* Content */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                {/* Left Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium mb-2">
                    {(currentEvent.upcoming || currentEvent.comingSoon) && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
                    {currentEvent.comingSoon ? "Coming Soon" : currentEvent.upcoming ? "Upcoming" : currentEvent.featured ? "Featured" : currentEvent.international ? "International" : "Tournament"}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{currentEvent.title}</h3>
                  <p className="text-sm opacity-90 mb-2">{currentEvent.subtitle}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs opacity-80">
                    <span>📅 {currentEvent.date}</span>
                    <span>📍 {currentEvent.location}</span>
                    <span>🏉 {currentEvent.matchCount} Matches</span>
                  </div>
                </div>

                {/* Right Content - CTA */}
                <div className="flex-shrink-0">
                  {currentEvent.comingSoon ? (
                    <Link to="/download">
                      <Button className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-semibold px-6 py-2">
                        Download App
                      </Button>
                    </Link>
                  ) : (
                    <Link to={currentEvent.id === 3 ? "/africa-cup" : "/fixtures"}>
                      <Button className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-semibold px-6 py-2">
                        {currentEvent.id === 3 ? "Explore Africa Cup" : "View Fixtures"}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Navigation Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 text-white transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 text-white transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-3">
            {featuredEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-scrummy-navy' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. What is SCRUMMY */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 text-center">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-scrummy-navy mb-6">
              What is <span className="text-scrummy-blue">SCRUMMY</span>?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/30">
                <div className="w-12 h-12 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-bold text-lg text-scrummy-navy mb-2">Build Your Team</h3>
                <p className="text-gray-600 text-sm">Select 5-6 players to create your fantasy rugby squad and compete with friends</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/30">
                <div className="w-12 h-12 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-lg text-scrummy-navy mb-2">Make Predictions</h3>
                <p className="text-gray-600 text-sm">Predict match outcomes from professional rugby to school finals - every match, every level</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200/30">
                <div className="w-12 h-12 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-bold text-lg text-scrummy-navy mb-2">Compete & Win</h3>
                <p className="text-gray-600 text-sm">Join leagues, climb leaderboards, and win prizes in weekly fantasy competitions</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              The only platform that covers <span className="font-semibold text-scrummy-navy">every match at every level</span> - 
              from Springboks internationals to local school derbies. Fantasy rugby just got scrummy!
            </p>
          </div>
        </div>
      </section>

      {/* 4. CONNECT - Combined Experience Section */}
      <section className="py-8 section-meet-player">
        <div className="max-w-[95vw] mx-auto px-4 sm:px-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50">
            {/* Meet Players & Build Your Dream XV */}
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-scrummy-navy mb-4">
                Meet Players & Build Your Dream XV
              </h2>
              <p className="text-lg text-gray-600">
                Discover the stars and create your ultimate team
              </p>
            </div>

          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-start">
            {/* Left Side - Meet a Player */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="font-orbitron text-2xl font-bold text-scrummy-navy mb-4">
                  Meet a Player
                </h3>
                <p className="text-gray-600 mb-4">Discover the stars driving the game forward</p>
                <div className="bg-scrummy-navy/5 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Explore detailed player profiles, stats, and performance ratings. Click any card to dive deep into their career highlights, playing style, and current form.
                  </p>
                </div>
              </div>
              
              <div className="relative flex justify-center items-end h-[320px] lg:h-[360px] xl:h-[380px]">
            {zimbabwePlayers.slice(0, 3).map((player, index) => (
          <motion.div
                key={index}
            initial={{ y: 50, opacity: 0, rotate: index === 0 ? -20 : index === 2 ? 20 : 0, x: index === 0 ? -100 : index === 2 ? 100 : 0 }}
            animate={{ 
              y: [0, -35, 5, 0], 
              scale: [1, 1.12, 0.98, 1],
              rotate: [
                index === 0 ? -20 : index === 2 ? 20 : 0,
                index === 0 ? -18 : index === 2 ? 18 : 2,
                index === 0 ? -22 : index === 2 ? 22 : -1,
                index === 0 ? -20 : index === 2 ? 20 : 0
              ],
              opacity: 1, 
              x: index === 0 ? -100 : index === 2 ? 100 : 0 
            }}
                transition={{ 
              duration: 0.8, 
              delay: index * 0.15, 
              type: "spring", 
              stiffness: 100,
              y: {
                duration: 2.2 + index * 0.3,
                repeat: Infinity,
                ease: [0.68, -0.55, 0.265, 1.55],
                delay: index * 0.6
              },
              scale: {
                duration: 2.2 + index * 0.3,
                repeat: Infinity,
                ease: [0.68, -0.55, 0.265, 1.55],
                delay: index * 0.6
              },
              rotate: {
                duration: 2.2 + index * 0.3,
                repeat: Infinity,
                ease: [0.68, -0.55, 0.265, 1.55],
                delay: index * 0.6
              }
            }}
                style={{
                  transformOrigin: 'center bottom',
                  zIndex: index === 1 ? 20 : index === 0 ? 10 : 15
                }}
                className={`absolute shadow-2xl rounded-lg flex flex-col transition-all duration-500 hover:scale-110 hover:rotate-0 hover:z-30 hover:-translate-y-8 overflow-hidden text-white h-[280px] lg:h-[320px] w-[180px] lg:w-[200px] xl:w-[220px] cursor-pointer ${
                  index === 1 
                    ? 'bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700'
                    : index === 2 
                    ? 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600'
                    : 'bg-gradient-to-br from-purple-600 via-blue-800 to-purple-900'
                }`}
                onClick={() => setSelectedPlayer(player)}
          >
                <div className="absolute top-2 right-2 z-[5]">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <span className="text-lg">
                      {player.flagEmoji}
                    </span>
                  </div>
                </div>
                <div className="relative flex-[3] overflow-hidden bg-gradient-to-b from-transparent to-black/20">
                  <img 
                    src={player.image} 
                    alt={player.name} 
                    className="transition-opacity duration-300 ease-in-out opacity-100 w-full object-scale-down object-top"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg`;
                    }}
                  />
                </div>
                <div className={`p-3 flex-[1] ${
                  index === 1 
                    ? 'bg-yellow-500/10' 
                    : index === 2 
                    ? 'bg-gray-500/10' 
                    : 'bg-blue-900/10'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xs font-bold truncate flex-1">{player.name}</h3>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <div className="text-xs truncate">{player.position}</div>
                    <div className="text-xs font-medium flex flex-row items-center justify-end text-nowrap">PR {player.pr}</div>
                  </div>
                </div>
          </motion.div>
            ))}
        </div>

              <div className="text-center mt-8 space-y-4">
            <Button 
              onClick={spinForPlayer}
                  className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-8 py-3 mb-4"
            >
              <Shuffle className="w-5 h-5 mr-2" />
              🔁 Meet Another Player
            </Button>
                
                {/* Download CTA */}
                <div className="bg-scrummy-navy/5 rounded-lg p-4 border border-scrummy-goldYellow/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                      <span className="text-lg">📱</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-scrummy-navy text-sm">Full Player Database</h4>
                      <p className="text-xs text-gray-600">1000+ detailed profiles</p>
                    </div>
                  </div>
                  <Link to="/download">
                    <Button className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-4 py-2 w-full text-sm">
                      Get the App →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Build Your Dream XV */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="font-orbitron text-2xl font-bold text-scrummy-navy mb-4">
                  Build Your Dream XV
                </h3>
                <p className="text-gray-600 mb-4">Create your ultimate team and compete</p>
                <div className="bg-scrummy-navy/5 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Assemble your perfect 5-player fantasy team from the world's best rugby talent. Manage your budget, optimize formations, and compete in leagues with friends.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-4 xl:p-6 space-y-4 min-h-[400px]">
                {/* Team Builder Header */}
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-bold">Edit Your Team</h4>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                      <circle cx="8" cy="8" r="6"></circle>
                      <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                      <path d="M7 6h1v4"></path>
                      <path d="m16.71 13.88.7.71-2.82 2.82"></path>
                    </svg>
                    <span className="text-xs font-medium whitespace-nowrap">5 / 240</span>
                  </div>
                </div>

                {/* Rugby Pitch with Players */}
                <div className="relative bg-green-700 rounded-2xl p-4 h-[360px] w-full overflow-hidden">
                  {/* Simple Center Line */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-white/20 transform -translate-y-0.5"></div>
                  </div>
                  
                  {/* Subtle Grass Texture */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-green-600/10 to-green-800/10"></div>
                  </div>
                  
                                    {/* Player Cards on Pitch */}
                  <div className="relative z-10 flex flex-col justify-center items-center gap-4 p-3 h-full">
                    {/* Top Row - 4 Players */}
                    <div className="flex justify-center items-center gap-3">
                      {[
                        { name: "Ellie Kildunne", position: "Fullback", team: "England Women", pr: 94, image: "/assets/Women's card pics style/England_ Ellie kildunne.png", flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
                        { name: "Ruby Tui", position: "Wing", team: "New Zealand Black Ferns", pr: 96, image: "/assets/Women's card pics style/New Zealand_ Ruby Tui.png", flagEmoji: "🇳🇿" },
                        { name: "Alev Kelter", position: "Center", team: "USA Women", pr: 89, image: "/assets/Women's card pics style/USA_ Alev Kelter.png", flagEmoji: "🇺🇸" },
                        { name: "Siokapesi Palu", position: "Prop", team: "Australia Wallaroos", pr: 87, image: "/assets/Women's card pics style/Australia_ Siokapesi Palu.png", flagEmoji: "🇦🇺" }
                      ].map((player, index) => (
                        <div key={index} className="relative">
                          <div className="group relative shadow-xl rounded-lg flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden transform-style-3d bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 text-white h-[160px] w-[100px] cursor-pointer">
                            <div className="absolute top-2 right-2 z-10">
                              <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                <span className="text-sm">
                                  {player.flagEmoji}
                                </span>
                              </div>
                            </div>
                            <div className="relative flex-[3] overflow-hidden bg-gradient-to-b from-transparent to-black/20">
                              <img 
                                src={player.image} 
                                alt={player.name}
                                className="w-full object-scale-down object-top"
                              />
                            </div>
                            <div className="p-2 flex-[1] bg-yellow-500/10">
                              <div className="flex items-center gap-1 mb-1">
                                <h3 className="text-xs font-bold truncate flex-1">{player.name}</h3>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <div className="text-xs truncate">{player.position}</div>
                                <div className="text-xs font-medium">PR {player.pr}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Row - 1 Player */}
                    <div className="flex justify-center">
                      {[
                        { name: "Alba Capell", position: "Flanker", team: "Spain Women", pr: 85, image: "/assets/Women's card pics style/Spain_ Alba Capell.png", flagEmoji: "🇪🇸" }
                      ].map((player, index) => (
                        <div key={index} className="relative">
                          <div className="group relative shadow-xl rounded-lg flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden transform-style-3d bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 text-white h-[160px] w-[100px] cursor-pointer">
                            <div className="absolute top-2 right-2 z-10">
                              <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                <span className="text-sm">{player.flagEmoji}</span>
                              </div>
                            </div>
                            <div className="relative flex-[3] overflow-hidden bg-gradient-to-b from-transparent to-black/20">
                              <img 
                                src={player.image} 
                                alt={player.name}
                                className="w-full object-scale-down object-top"
                              />
                            </div>
                            <div className="p-2 flex-[1] bg-yellow-500/10">
                              <div className="flex items-center gap-1 mb-1">
                                <h3 className="text-xs font-bold truncate flex-1">{player.name}</h3>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <div className="text-xs truncate">{player.position}</div>
                                <div className="text-xs font-medium">PR {player.pr}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center space-y-4">
                  <p className="text-xs text-white/80">
                    Need more players? Add forwards, backs, or a super sub to complete your squad.
                  </p>
                  <Link to="/download">
                    <Button className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-6 py-2 w-full mb-4">
                      ⚡ Complete Your Team
                    </Button>
                  </Link>
                  

                </div>
              </div>
            </div>
          </div>
          
          {/* Main Download CTA */}
          <div className="mt-8 bg-scrummy-navy/5 rounded-xl p-6 border border-scrummy-goldYellow/20">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
              <h4 className="font-orbitron text-lg font-bold text-scrummy-navy mb-2">
                Get the Full Experience
              </h4>
              <p className="text-sm text-gray-600 mb-4 max-w-sm mx-auto">
                Download the app for live stats, fantasy leagues, and exclusive features
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/download">
                  <Button className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-6 py-3">
                    iOS App Store
                  </Button>
                </Link>
                <Link to="/download">
                  <Button className="bg-scrummy-navy hover:bg-scrummy-blue text-white font-bold px-6 py-3">
                    Google Play
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Follow the Conversation - Social & Community */}
          <div className="mt-16 pt-16 border-t border-gray-200/50">
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-scrummy-navy mb-4">
                Follow the <span className="text-pink-500">conversation</span>
              </h2>
              <p className="text-lg text-gray-600">
                Live from our Instagram, TikTok, Facebook, X & YouTube
              </p>
            </div>

            {/* Social Media Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
              {[
                { platform: "IG", handle: "@scrummyapp_", content: "URC Final Highlights", time: "2h", color: "from-purple-600 to-pink-500", stats: "2.4k ❤️ 156 💬", url: "https://www.instagram.com/scrummyapp_/" },
                { platform: "TT", handle: "@scrummy_hub", content: "Kolbe's Magic Step compilation", time: "4h", color: "from-teal-600 to-green-500", stats: "8.2k ❤️ 342 💬", url: "https://www.tiktok.com/@scrummy_hub" },
                { platform: "FB", handle: "Scrummy Rugby", content: "Player Stats Weekly update", time: "6h", color: "from-blue-600 to-indigo-600", stats: "1.8k ❤️ 89 💬", url: "https://www.facebook.com/profile.php?id=61574057183440" },
                { platform: "𝕏", handle: "@scrummyapp_", content: "School Rugby Rising stars", time: "1d", color: "from-gray-800 to-black", stats: "5.7k ❤️ 234 💬", url: "https://x.com/scrummyapp_" },
                { platform: "YT", handle: "@ScrummySports", content: "The Breakdown: URC Review", time: "2h", color: "from-red-600 to-red-800", stats: "12.4k 👁 89 💬", url: "https://www.youtube.com/@ScrummySports" }
              ].map((post, index) => (
                <Card key={index} className={`bg-gradient-to-r ${post.color} text-white hover:scale-105 transition-transform duration-300 cursor-pointer`} onClick={() => window.open(post.url, '_blank')}>
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
                
            {/* YouTube Channel Section */}
            <div className="bg-gradient-to-r from-slate-900 to-black text-white rounded-2xl p-8 mb-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                  <h3 className="text-2xl font-bold mt-4 mb-2">Scrummy Sports on YouTube</h3>
                  <p className="text-white/80 mb-4">Rugby analysis, highlights & player features</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎥</span>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Latest Content</p>
                      <p className="text-sm">🔔 Subscribe for rugby insights</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => window.open('https://www.youtube.com/@ScrummySports', '_blank')}
                    >
                      🎥 Visit Channel
                    </Button>
                                         <Button 
                       className="bg-white text-black hover:bg-gray-200 border-2 border-white"
                       onClick={() => window.open('https://www.youtube.com/@ScrummySports?sub_confirmation=1', '_blank')}
                     >
                       + Subscribe
                     </Button>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <span className="text-xs text-green-400">Analysis</span>
                      <h4 className="font-bold">Player Performance Breakdowns</h4>
                      <p className="text-sm opacity-80">Deep dives into what makes top rugby players special...</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <span className="text-xs text-blue-400">Features</span>
                      <h4 className="font-bold">Match Highlights & Fantasy Tips</h4>
                      <p className="text-sm opacity-80">Essential viewing for fantasy rugby managers and rugby fans...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Follow Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                onClick={() => window.open('https://www.instagram.com/scrummyapp_/', '_blank')}
              >
                📸 Instagram
              </Button>
              <Button 
                className="bg-gradient-to-r from-teal-500 to-green-500 text-white hover:from-teal-600 hover:to-green-600"
                onClick={() => window.open('https://www.tiktok.com/@scrummy_hub', '_blank')}
              >
                🎵 TikTok
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                onClick={() => window.open('https://www.facebook.com/profile.php?id=61574057183440', '_blank')}
              >
                📘 Facebook
              </Button>
              <Button 
                className="bg-gradient-to-r from-gray-800 to-black text-white hover:from-gray-900 hover:to-gray-900"
                onClick={() => window.open('https://x.com/scrummyapp_', '_blank')}
              >
                𝕏 Twitter
              </Button>
              <Button 
                className="bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900"
                onClick={() => window.open('https://www.youtube.com/@ScrummySports?sub_confirmation=1', '_blank')}
              >
                🎥 YouTube
              </Button>
            </div>
          </div>

          {/* Every Match, Every Level - Fixtures & Predictions */}
          <div className="mt-16 pt-16 border-t border-gray-200/50">
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
                  Professional Rugby
                </button>
                <button className="px-6 py-2 rounded-md bg-scrummy-navy text-white font-bold">
                  School Rugby
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

                                     <Link to="/download">
                     <Button className="w-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                       💬 Join Live Chat (247 fans)
                     </Button>
                   </Link>
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
                     <Link to="/download" className="flex-1">
                       <Button className="w-full bg-scrummy-navy hover:bg-scrummy-blue text-white">
                         🎯 Predict
                       </Button>
                     </Link>
                     <Link to="/download" className="flex-1">
                       <Button variant="outline" className="w-full border-scrummy-navy text-scrummy-navy hover:bg-scrummy-navy hover:text-white">
                         💬 Chat
                       </Button>
                     </Link>
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
                <p className="font-bold">"Finally! Every match from Springboks to school finals in one place"</p>
                <p className="text-sm opacity-80">- Rugby fan from Cape Town</p>
              </div>
              <p className="text-lg">Experience rugby without limits - join the conversation!</p>
            </div>
          </div>
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
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-scrummy-goldYellow">
                    <img 
                      src={selectedPlayer.image} 
                      alt={selectedPlayer.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image doesn't exist
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full bg-scrummy-goldYellow flex items-center justify-center">
                            <span class="text-2xl font-bold text-scrummy-navy">${selectedPlayer.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>`;
                        }
                      }}
                    />
                  </div>
                  <h3 className="font-orbitron text-2xl font-bold text-scrummy-navy mb-2">
                    {selectedPlayer.name}
                  </h3>
                  <div className="flex justify-center items-center gap-4 mb-1">
                    <p className="text-scrummy-blue font-semibold">{selectedPlayer.position}</p>
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      PR {selectedPlayer.pr}
                    </div>
                  </div>
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







      {/* 5. Final CTA Block */}
      <section className="py-8 bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6">
            Think you know rugby?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Make predictions on every match and climb the leaderboards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/download">
              <Button 
                size="lg"
                className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-8 py-4"
              >
                🎯 Start Making Predictions
              </Button>
            </Link>
                          <Link to="/download">
                <Button 
                  size="lg"
                  className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-8 py-4"
                >
                  Get the App
                </Button>
              </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid md:grid-cols-4 gap-4">
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



