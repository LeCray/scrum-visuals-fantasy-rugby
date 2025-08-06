import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Facebook, Youtube, Menu, X, Globe, Shuffle, Calendar, Trophy, Smartphone } from "lucide-react";
import { FaTiktok } from 'react-icons/fa';
import ThreeScene from "../components/ThreeScene";


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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<typeof zimbabwePlayers[0] | null>(null);
  const [activePhoneIndex, setActivePhoneIndex] = useState(1); // Start with middle phone (index 1)
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const spinForPlayer = () => {
    const randomPlayer = zimbabwePlayers[Math.floor(Math.random() * zimbabwePlayers.length)];
    setSelectedPlayer(randomPlayer);
  };

  // Track screen width for responsive card spacing
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate responsive card spacing based on screen width
  const getCardSpacing = () => {
    if (screenWidth >= 1536) return 120; // 2xl screens
    if (screenWidth >= 1280) return 100; // xl screens  
    if (screenWidth >= 1024) return 80;  // lg screens
    if (screenWidth >= 768) return 70;   // md screens
    return 60; // sm and smaller screens
  };

  // Cycle through phones for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoneIndex((prev) => (prev + 1) % 3); // Cycle 0, 1, 2, 0, 1, 2...
    }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
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
            <Link to="/about" className="text-white hover:text-scrummy-goldYellow font-medium transition-colors">About</Link>
            <Link to="/download" className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-4 py-2 rounded-md transition-colors">Download App</Link>

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
                <Link to="/about" className="block text-white hover:text-scrummy-goldYellow font-medium transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link to="/download" className="block bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-4 py-3 rounded-md transition-colors text-center" onClick={() => setMobileMenuOpen(false)}>Download App</Link>

              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 1. Hero Section - Scrummy Brand Introduction */}
      <section className="py-12 relative overflow-hidden">
        {/* Brand Book Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFC603] via-[#1196F5] to-[#001E5C]" />
        
        {/* Rugby Ball Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-12 w-16 h-10 border-2 border-white rounded-full transform rotate-12"></div>
          <div className="absolute top-20 right-16 w-12 h-7 border-2 border-white rounded-full transform -rotate-45"></div>
          <div className="absolute bottom-16 left-20 w-20 h-12 border-2 border-white rounded-full transform rotate-45"></div>
          <div className="absolute bottom-8 right-12 w-14 h-8 border-2 border-white rounded-full transform -rotate-12"></div>
          <div className="absolute top-1/2 left-8 w-10 h-6 border-2 border-white rounded-full transform rotate-90"></div>
          <div className="absolute top-1/3 right-8 w-18 h-11 border-2 border-white rounded-full transform -rotate-30"></div>
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white leading-tight drop-shadow-lg">
              FANTASY RUGBY
              <span className="block text-white">IS ABOUT TO GET</span>
              <span className="block text-[#FFC603] drop-shadow-xl">SCRUMMY</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Be the First to Join the Scrum!
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Feature Showcase */}
      <section className="py-12 relative overflow-hidden">
        {/* Extended Brand Gradient Background - Flows into Meet Players */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFC603]/20 via-[#1196F5]/15 to-[#001E5C]/20" />
        
        {/* Rugby Ball Pattern Overlay - Extended to cover Meet Players */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-12 left-20 w-14 h-8 border-2 border-white rounded-full transform rotate-45"></div>
          <div className="absolute top-32 right-24 w-10 h-6 border-2 border-white rounded-full transform -rotate-30"></div>
          <div className="absolute bottom-20 left-16 w-16 h-10 border-2 border-white rounded-full transform rotate-12"></div>
          <div className="absolute bottom-32 right-20 w-12 h-7 border-2 border-white rounded-full transform -rotate-45"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-5 border-2 border-white rounded-full transform rotate-60"></div>
          <div className="absolute top-1/3 right-1/4 w-14 h-8 border-2 border-white rounded-full transform -rotate-15"></div>
          {/* Additional patterns for Meet Players area */}
          <div className="absolute bottom-0 left-1/3 w-12 h-7 border-2 border-white rounded-full transform rotate-30" style={{ top: '120%' }}></div>
          <div className="absolute bottom-0 right-1/4 w-10 h-6 border-2 border-white rounded-full transform -rotate-60" style={{ top: '140%' }}></div>
              </div>

        <div className="max-w-[95vw] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 justify-center">
            {/* Phone 1 - Build Your Team */}
            <motion.div 
              className="text-center"
              animate={{
                scale: activePhoneIndex === 0 ? 1.1 : 0.9,
                y: activePhoneIndex === 0 ? -16 : 8,
                opacity: activePhoneIndex === 0 ? 1 : 0.8,
                zIndex: activePhoneIndex === 0 ? 20 : 1
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                             <motion.div 
                 className="relative mx-auto mb-4 w-32 h-56 bg-black rounded-[1.5rem] p-1"
                 animate={{
                   boxShadow: activePhoneIndex === 0 
                     ? "0 25px 50px -12px rgba(0,0,0,0.6)" 
                     : "0 10px 25px -3px rgba(0,0,0,0.3)",
                   y: activePhoneIndex === 0 ? [0, -8, 0] : 0
                 }}
                transition={{ 
                  duration: 0.6,
                  y: activePhoneIndex === 0 ? { 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  } : { duration: 0.6 }
                }}
              >
                <div className="w-full h-full bg-white rounded-[1rem] overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black/5 flex items-center justify-center">
                    <div className="w-20 h-3 bg-black rounded-full"></div>
                  </div>
                  <img 
                    src="/assets/App headshots/WhatsApp Image 2025-07-28 at 14.53.53.jpeg" 
                    alt="Team Building Interface"
                    className="w-full h-full object-cover object-center mt-6"
                  />
                </div>
            </motion.div>
              <h3 className="font-bold text-xl text-[#001E5C] mb-3 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">Build Your Team</h3>
              <p className="text-[#001E5C]/90 text-sm max-w-xs mx-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">Select 5-6 players to create your fantasy rugby squad and compete with friends</p>
            </motion.div>
            
            {/* Phone 2 - Make Predictions */}
            <motion.div 
              className="text-center"
              animate={{
                scale: activePhoneIndex === 1 ? 1.1 : 0.9,
                y: activePhoneIndex === 1 ? -16 : 8,
                opacity: activePhoneIndex === 1 ? 1 : 0.8,
                zIndex: activePhoneIndex === 1 ? 20 : 1
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                             <motion.div 
                 className="relative mx-auto mb-4 w-32 h-56 bg-black rounded-[1.5rem] p-1"
                 animate={{
                   boxShadow: activePhoneIndex === 1 
                     ? "0 25px 50px -12px rgba(0,0,0,0.6)" 
                     : "0 10px 25px -3px rgba(0,0,0,0.3)",
                   y: activePhoneIndex === 1 ? [0, -8, 0] : 0
                 }}
                transition={{ 
                  duration: 0.6,
                  y: activePhoneIndex === 1 ? { 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  } : { duration: 0.6 }
                }}
              >
                <div className="w-full h-full bg-white rounded-[1rem] overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black/5 flex items-center justify-center">
                    <div className="w-20 h-3 bg-black rounded-full"></div>
                  </div>
                  <img 
                    src="/assets/App headshots/WhatsApp Image 2025-07-28 at 14.53.52.jpeg" 
                    alt="Match Predictions Interface"
                    className="w-full h-full object-cover object-center mt-6"
                  />
          </div>
              </motion.div>
              <h3 className="font-bold text-xl text-[#001E5C] mb-3 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">Make Predictions</h3>
              <p className="text-[#001E5C]/90 text-sm max-w-xs mx-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">Predict match outcomes from professional rugby to school finals - every match, every level</p>
            </motion.div>
            
            {/* Phone 3 - Compete & Win */}
            <motion.div 
              className="text-center"
              animate={{
                scale: activePhoneIndex === 2 ? 1.1 : 0.9,
                y: activePhoneIndex === 2 ? -16 : 8,
                opacity: activePhoneIndex === 2 ? 1 : 0.8,
                zIndex: activePhoneIndex === 2 ? 20 : 1
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                             <motion.div 
                 className="relative mx-auto mb-4 w-32 h-56 bg-black rounded-[1.5rem] p-1"
                 animate={{
                   boxShadow: activePhoneIndex === 2 
                     ? "0 25px 50px -12px rgba(0,0,0,0.6)" 
                     : "0 10px 25px -3px rgba(0,0,0,0.3)",
                   y: activePhoneIndex === 2 ? [0, -8, 0] : 0
                 }}
                transition={{ 
                  duration: 0.6,
                  y: activePhoneIndex === 2 ? { 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  } : { duration: 0.6 }
                }}
              >
                <div className="w-full h-full bg-white rounded-[1rem] overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black/5 flex items-center justify-center">
                    <div className="w-20 h-3 bg-black rounded-full"></div>
                </div>
                  <img 
                    src="/assets/App headshots/WhatsApp Image 2025-07-28 at 15.24.09.jpeg" 
                    alt="Competition Leaderboard Interface"
                    className="w-full h-full object-cover object-center mt-6"
                  />
              </div>
              </motion.div>
              <h3 className="font-bold text-xl text-[#001E5C] mb-3 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">Compete & Win</h3>
              <p className="text-[#001E5C]/90 text-sm max-w-xs mx-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">Join leagues, climb leaderboards, and win prizes in weekly fantasy competitions</p>
            </motion.div>
                </div>
              </div>
              
        {/* 3. CONNECT - Combined Experience Section */}
        <div className="max-w-[95vw] xl:max-w-[90vw] 2xl:max-w-[85vw] mx-auto px-4 sm:px-6 mt-16 overflow-hidden">
            {/* Meet Players & Build Your Dream Team */}
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-[#001E5C] mb-4 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                Meet Players & Build Your Dream Team
              </h2>
            </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-start">
            {/* Left Side - Meet a Player */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="font-orbitron text-2xl font-bold text-[#001E5C] mb-4 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                  Meet a Player
                </h3>
                <p className="text-[#001E5C]/90 mb-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">Discover the stars driving the game forward</p>
                <div className="bg-scrummy-navy/5 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Explore detailed player profiles, stats, and performance ratings. Click any card to dive deep into their career highlights, playing style, and current form.
                  </p>
                </div>
              </div>
              
              <div className="relative flex justify-center items-end h-[280px] sm:h-[320px] lg:h-[360px] xl:h-[400px] 2xl:h-[440px] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            {zimbabwePlayers.slice(0, 3).map((player, index) => (
          <motion.div
                key={index}
            initial={{ y: 50, opacity: 0, rotate: index === 0 ? -8 : index === 2 ? 8 : 0, x: index === 0 ? -getCardSpacing() : index === 2 ? getCardSpacing() : 0 }}
            animate={{ 
              y: [0, -35, 5, 0], 
              scale: [1, 1.12, 0.98, 1],
              rotate: [
                index === 0 ? -8 : index === 2 ? 8 : 0,
                index === 0 ? -6 : index === 2 ? 6 : 2,
                index === 0 ? -10 : index === 2 ? 10 : -1,
                index === 0 ? -8 : index === 2 ? 8 : 0
              ],
              opacity: 1, 
              x: index === 0 ? -getCardSpacing() : index === 2 ? getCardSpacing() : 0 
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
                className={`absolute shadow-2xl rounded-lg flex flex-col transition-all duration-500 hover:scale-110 hover:rotate-0 hover:z-30 hover:-translate-y-8 overflow-hidden text-white h-[240px] sm:h-[280px] lg:h-[320px] xl:h-[360px] 2xl:h-[400px] w-[160px] sm:w-[180px] lg:w-[200px] xl:w-[240px] 2xl:w-[280px] cursor-pointer ${
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

              <div className="text-center mt-8 space-y-4 relative z-[100]">
            <button 
              className="inline-flex items-center justify-center bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-8 py-3 mb-4 rounded-md cursor-pointer relative z-[101] transition-colors"
              onClick={() => window.location.href = '/#/download'}
            >
              <Shuffle className="w-5 h-5 mr-2" />
              🔁 Meet Another Player
            </button>
                

              </div>
            </div>

            {/* Right Side - Build Your Dream Team */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="font-orbitron text-2xl font-bold text-scrummy-navy mb-4">
                  Build Your Dream Team
                </h3>
                <p className="text-gray-600 mb-4">Create your ultimate team and compete</p>
                <div className="bg-scrummy-navy/5 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Assemble your perfect 5-player fantasy team from the world's best rugby talent. Manage your budget, optimize formations, and compete in leagues with friends.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#FFC603] via-[#1196F5] to-[#001E5C] text-white rounded-2xl p-3 sm:p-4 xl:p-6 space-y-3 sm:space-y-4 min-h-[380px] sm:min-h-[400px]">
                {/* Team Builder Header */}
                <div className="flex justify-between items-center">
                  <h4 className="text-lg sm:text-xl font-bold">Edit Your Team</h4>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 sm:w-[14px] sm:h-[14px]">
                      <circle cx="8" cy="8" r="6"></circle>
                      <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                      <path d="M7 6h1v4"></path>
                      <path d="m16.71 13.88.7.71-2.82 2.82"></path>
                    </svg>
                    <span className="text-xs font-medium whitespace-nowrap">5 / 240</span>
                  </div>
                </div>

                {/* Rugby Pitch with Players */}
                <div className="relative bg-green-700 rounded-2xl p-3 sm:p-4 h-[340px] sm:h-[360px] w-full overflow-hidden">
                  {/* Simple Center Line */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-white/20 transform -translate-y-0.5"></div>
                  </div>
                  
                  {/* Subtle Grass Texture */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-green-600/10 to-green-800/10"></div>
                  </div>
                  
                                    {/* Player Cards on Pitch */}
                  <div className="relative z-10 flex flex-col justify-center items-center gap-3 sm:gap-4 p-2 sm:p-3 h-full">
                    {/* Top Row - 4 Players (2x2 on mobile, 4x1 on larger screens) */}
                    <div className="grid grid-cols-2 sm:flex sm:justify-center sm:items-center gap-2 sm:gap-3">
                      {[
                        { name: "Ellie Kildunne", position: "Fullback", team: "England Women", pr: 94, image: "/assets/Women's card pics style/England_ Ellie kildunne.png", flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
                        { name: "Ruby Tui", position: "Wing", team: "New Zealand Black Ferns", pr: 96, image: "/assets/Women's card pics style/New Zealand_ Ruby Tui.png", flagEmoji: "🇳🇿" },
                        { name: "Alev Kelter", position: "Center", team: "USA Women", pr: 89, image: "/assets/Women's card pics style/USA_ Alev Kelter.png", flagEmoji: "🇺🇸" },
                        { name: "Siokapesi Palu", position: "Prop", team: "Australia Wallaroos", pr: 87, image: "/assets/Women's card pics style/Australia_ Siokapesi Palu.png", flagEmoji: "🇦🇺" }
                      ].map((player, index) => (
                        <div key={index} className="relative">
                          <div className="group relative shadow-xl rounded-lg flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden transform-style-3d bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 text-white h-[130px] sm:h-[160px] w-[100px] sm:w-[100px] cursor-pointer">
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
                            <div className="p-1.5 sm:p-2 flex-[1] bg-yellow-500/10">
                              <div className="flex items-center gap-1 mb-1">
                                <h3 className="text-[10px] sm:text-xs font-bold truncate flex-1">{player.name}</h3>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <div className="text-[9px] sm:text-xs truncate">{player.position}</div>
                                <div className="text-[9px] sm:text-xs font-medium">PR {player.pr}</div>
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
                          <div className="group relative shadow-xl rounded-lg flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden transform-style-3d bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 text-white h-[130px] sm:h-[160px] w-[100px] sm:w-[100px] cursor-pointer">
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
                            <div className="p-1.5 sm:p-2 flex-[1] bg-yellow-500/10">
                              <div className="flex items-center gap-1 mb-1">
                                <h3 className="text-[10px] sm:text-xs font-bold truncate flex-1">{player.name}</h3>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <div className="text-[9px] sm:text-xs truncate">{player.position}</div>
                                <div className="text-[9px] sm:text-xs font-medium">PR {player.pr}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center space-y-3 sm:space-y-4 relative z-[100]">
                  <p className="text-xs text-white/80 px-2">
                    Need more players? Add forwards, backs, or a super sub to complete your squad.
                  </p>
                  <button 
                    className="inline-flex items-center justify-center bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-4 sm:px-6 py-2 w-full mb-4 text-sm rounded-md cursor-pointer relative z-[101] transition-colors"
                    onClick={() => window.location.href = '/#/download'}
                  >
                    ⚡ Complete Your Team
                  </button>
                  

                </div>
              </div>
            </div>
          </div>
          
          {/* Main Download CTA */}
          <div className="mt-8 bg-scrummy-navy/5 rounded-xl p-6 border border-scrummy-goldYellow/20 relative z-[100]">
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
              <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-[100]">
                <button 
                  className="inline-flex items-center justify-center bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-6 py-3 rounded-md cursor-pointer relative z-[101] transition-colors"
                  onClick={() => window.open('https://apps.apple.com/us/app/scrummy-fantasy-rugby/id6744964910', '_blank')}
                >
                  iOS App Store
                </button>
                <button 
                  className="inline-flex items-center justify-center bg-scrummy-navy hover:bg-scrummy-blue text-white font-bold px-6 py-3 rounded-md cursor-pointer relative z-[101] transition-colors"
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scrummy&pcampaignid=web_share', '_blank')}
                >
                  Google Play
                </button>
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

            {/* Social Media Feeds - Mixed Approach */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              
              {/* Instagram - Styled Card */}
              <Card className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => window.open('https://www.instagram.com/scrummyapp_/', '_blank')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">2h</span>
                  </div>
                  <h3 className="font-bold mb-2">Latest Rugby Highlights</h3>
                  <p className="text-sm opacity-90 mb-3">@scrummyapp_</p>
                  <p className="text-xs opacity-80">2.4k ❤️ 156 💬</p>
                  <div className="mt-2 text-xs opacity-70">Tap to view on Instagram</div>
                </CardContent>
              </Card>

              {/* TikTok - Styled Card */}
              <Card className="bg-gradient-to-r from-teal-600 to-green-500 text-white hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => window.open('https://www.tiktok.com/@scrummy_hub', '_blank')}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">TT</span>
                      </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">4h</span>
                    </div>
                  <h3 className="font-bold mb-2">Kolbe's Magic Steps</h3>
                  <p className="text-sm opacity-90 mb-3">@scrummy_hub</p>
                  <p className="text-xs opacity-80">8.2k ❤️ 342 💬</p>
                  <div className="mt-2 text-xs opacity-70">Tap to view on TikTok</div>
                  </CardContent>
                </Card>

              {/* Facebook - Styled Card */}
              <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => window.open('https://www.facebook.com/profile.php?id=61574057183440', '_blank')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Facebook className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">6h</span>
                  </div>
                  <h3 className="font-bold mb-2">Player Stats Update</h3>
                  <p className="text-sm opacity-90 mb-3">Scrummy Rugby</p>
                  <p className="text-xs opacity-80">1.8k ❤️ 89 💬</p>
                  <div className="mt-2 text-xs opacity-70">Tap to view on Facebook</div>
                </CardContent>
              </Card>

              {/* Twitter/X - Styled Card */}
              <Card className="bg-gradient-to-r from-gray-800 to-black text-white hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => window.open('https://x.com/scrummyapp_', '_blank')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xs">𝕏</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">1d</span>
                  </div>
                  <h3 className="font-bold mb-2">School Rugby Rising Stars</h3>
                  <p className="text-sm opacity-90 mb-3">@scrummyapp_</p>
                  <p className="text-xs opacity-80">5.7k ❤️ 234 💬</p>
                  <div className="mt-2 text-xs opacity-70">Tap to view on X</div>
                </CardContent>
              </Card>



            </div>
                
                        {/* YouTube & News Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* YouTube Channel Section */}
              <div className="bg-gradient-to-r from-slate-900 to-black text-white rounded-2xl p-6">
                {/* Embedded YouTube Video */}
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <iframe 
                    src="https://www.youtube.com/embed/o9lknRnPxMM"
                    width="100%" 
                    height="100%" 
                    style={{ border: 'none' }}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
                <div className="mt-4">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                  <h3 className="text-xl font-bold mt-2 mb-1">Scrummy Sports on YouTube</h3>
                  <p className="text-white/60 text-sm">Watch our latest rugby analysis</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2"
                      onClick={() => window.open('https://www.youtube.com/@ScrummySports', '_blank')}
                    >
                      🎥 Visit Channel
                    </Button>
                    <Button 
                      className="bg-white text-black hover:bg-gray-200 border-2 border-white text-sm px-4 py-2"
                      onClick={() => window.open('https://www.youtube.com/@ScrummySports?sub_confirmation=1', '_blank')}
                    >
                      + Subscribe
                    </Button>
                  </div>
                </div>
              </div>

              {/* Women's Rugby News Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-scrummy-navy mb-4">Women's Rugby Headlines</h3>
                
                {/* News Preview 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
                     onClick={() => window.open('https://www.rugbypass.com/news/wallaroos-stars-timely-return-to-face-wales-before-rugby-world-cup', '_blank')}>
                  <div className="flex gap-4">
                    <div className="w-20 h-16 bg-gradient-to-br from-green-500 to-yellow-400 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                      AUS
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-scrummy-navy text-sm mb-1">Maya Stewart Returns From Injury</h4>
                      <p className="text-xs text-gray-600 mb-2">Australia's all-time leading try-scorer makes crucial comeback ahead of Rugby World Cup</p>
                      <span className="text-xs text-blue-600 font-medium">Read more on RugbyPass →</span>
                    </div>
                  </div>
                </div>

                {/* News Preview 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
                     onClick={() => window.open('https://www.rugbypass.com/news/levi-and-nathan-among-sevens-stars-sharpening-for-svns-series-at-nextgen-7s', '_blank')}>
                  <div className="flex gap-4">
                    <div className="w-20 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                      7s
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-scrummy-navy text-sm mb-1">Rising Stars Prepare for SVNS Series</h4>
                      <p className="text-xs text-gray-600 mb-2">Next generation of sevens talent showcased at development tournament</p>
                      <span className="text-xs text-blue-600 font-medium">Read more on RugbyPass →</span>
                    </div>
                  </div>
                </div>

                {/* News Preview 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
                     onClick={() => window.open('https://www.rugbypass.com/news/the-bremners-sisters-competing-for-the-same-black-ferns-shirt', '_blank')}>
                  <div className="flex gap-4">
                    <div className="w-20 h-16 bg-gradient-to-br from-black to-gray-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                      NZ
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-scrummy-navy text-sm mb-1">The Bremners: Sisters Battle for Same Jersey</h4>
                      <p className="text-xs text-gray-600 mb-2">Family rivalry adds intrigue to New Zealand's World Cup selection</p>
                      <span className="text-xs text-blue-600 font-medium">Read more on RugbyPass →</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Follow Buttons */}
            <div className="flex flex-wrap justify-center gap-3 relative z-[102]">
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
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-white/30">
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
              <Card className="bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 transition-all duration-300">
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
              <Card className="bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 transition-all duration-300">
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

      {/* 4. Final CTA Block */}
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
                <a href="https://www.tiktok.com/@scrummy_hub" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
                  <FaTiktok size={24} />
              </a>
                <a href="https://x.com/scrummyapp_" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
                  <span className="text-xl">𝕏</span>
              </a>
                <a href="https://www.youtube.com/@ScrummySports" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
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



