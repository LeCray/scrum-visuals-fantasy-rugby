import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WaitlistForm from "../components/WaitlistForm";
import { Instagram, Facebook, Youtube, ChevronLeft, ChevronRight } from "lucide-react";
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
    upcoming: true,
    international: true,
    matchCount: 32
  },
  {
    id: 3,
    title: "Rugby Africa Cup",
    subtitle: "African Rugby Union Championship",
    date: "June 2025",
    location: "Multiple African Venues",
    gradient: "from-orange-600 via-amber-500 to-yellow-500",
    upcoming: true,
    international: true,
    matchCount: 24
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

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
    }, 6000);

    return () => clearInterval(interval);
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
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-scrummy-goldYellow text-xl hover:text-white transition-colors">
            SCRUMMY
          </Link>
          <nav className="flex items-center space-x-8">
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
              className="text-white hover:text-scrummy-goldYellow font-medium transition-colors"
            >
              Newsletter
            </Link>
            <Button className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-semibold px-4 py-2">
              Join Beta
            </Button>
          </nav>
        </div>
      </header>

      {/* Featured Events Slideshow */}
      <section className="relative h-[35vh] overflow-hidden">
        <AnimatePresence mode="wait">
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
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white space-y-4"
                >
                  {/* Event Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                    {currentEvent.upcoming && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
                    {currentEvent.upcoming ? "Upcoming" : currentEvent.featured ? "Featured" : currentEvent.international ? "International" : "Tournament"}
                  </div>

                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
                      {currentEvent.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-4">
                      {currentEvent.subtitle}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="flex flex-wrap gap-4 text-white/80 text-sm mb-6">
                    <span>📅 {currentEvent.date}</span>
                    <span>📍 {currentEvent.location}</span>
                    <span>🏉 {currentEvent.matchCount} Matches</span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <Link to="/fixtures">
                      <Button size="lg" className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-semibold">
                        View Fixtures
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* Right Content - Stats Card */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="hidden md:block"
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
        </AnimatePresence>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 text-white transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 text-white transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {featuredEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Value Proposition */}
      <section className="py-16 bg-scrummy-navy/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-scrummy-navy">
              The Home of <span className="text-scrummy-goldYellow">School Boy Rugby</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Live fixtures, real-time results, and comprehensive statistics from school boy rugby competitions 
              across Zimbabwe and South Africa. Plus the coming fantasy rugby revolution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two-Column Features */}
      <section className="py-12 bg-gradient-to-r from-scrummy-navy/10 to-scrummy-blue/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Live Data Section */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm border-scrummy-navy/20 shadow-xl">
                <CardContent className="p-8">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Now
                  </div>
                  <h3 className="text-2xl font-bold text-scrummy-navy mb-4">
                    Real-Time Rugby Intelligence
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Stay connected to every match with live scores, detailed statistics, and comprehensive fixture information. 
                    Our platform tracks every try, conversion, and penalty as it happens.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                        <span className="text-scrummy-navy font-bold text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-sm">Live match updates and scores</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                        <span className="text-scrummy-navy font-bold text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-sm">Detailed player and team statistics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                        <span className="text-scrummy-navy font-bold text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-sm">Complete fixture schedules</span>
                    </div>
                  </div>
                  <Link to="/fixtures">
                    <Button className="bg-scrummy-navy text-white hover:bg-scrummy-blue w-full">
                      Explore Live Fixtures
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fantasy App Section */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full bg-gradient-to-br from-scrummy-goldYellow/20 to-scrummy-gold/30 border-scrummy-goldYellow/30 shadow-xl">
                <CardContent className="p-8">
                  <div className="inline-flex items-center gap-2 bg-scrummy-goldYellow/80 text-scrummy-navy px-3 py-1 rounded-full text-sm font-medium mb-6">
                    Coming Soon
                  </div>
                  <h3 className="text-2xl font-bold text-scrummy-navy mb-4">
                    Fantasy Rugby Revolution
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Build your dream team with real school boy rugby players. Create leagues with friends, 
                    track performance, and compete for glory in the first fantasy platform dedicated to school rugby.
                  </p>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-scrummy-goldYellow/40 mb-6">
                    <h4 className="font-semibold text-scrummy-navy mb-2 text-sm">Join the Beta Waitlist</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Be among the first to experience fantasy school boy rugby.
                    </p>
                    <WaitlistForm />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-scrummy-goldYellow text-lg mb-2">SCRUMMY</h3>
              <p className="text-white/80 text-sm">The Home of School Boy Rugby</p>
            </div>
            
            <div className="flex gap-6">
              <a href="https://www.instagram.com/scrummyapp_/" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61574057183440" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.tiktok.com/@scrummy_fantasy" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
                <FaTiktok size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UCnKVk_L_fda9OuA5vDZBmmA" target="_blank" rel="noopener noreferrer" className="hover:text-scrummy-goldYellow transition-colors">
                <Youtube size={20} />
              </a>
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
