import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

interface Scrum6ChallengeBannerProps {
  className?: string;
}

const Scrum6ChallengeBanner: React.FC<Scrum6ChallengeBannerProps> = ({ className = "" }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-scrummy-navy via-scrummy-blue to-scrummy-navy"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating rugby balls */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-4 right-8 w-6 h-6 bg-scrummy-goldYellow/20 rounded-full"
        ></motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-6 left-12 w-4 h-4 bg-white/20 rounded-full"
        ></motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 12, 0]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-1/2 right-16 w-3 h-3 bg-scrummy-goldYellow/30 rounded-full"
        ></motion.div>

        {/* Tactical lines */}
        <div className="absolute top-8 left-8 w-16 h-0.5 bg-white/20 transform rotate-12"></div>
        <div className="absolute bottom-8 right-8 w-12 h-0.5 bg-scrummy-goldYellow/40 transform -rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-0.5 bg-white/15 transform rotate-45"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            🏆 Join the Scrum6 Challenge
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6">
            Pick your dream team of 6 players and compete for weekly glory!
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link to="/scrum6-rules">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
            >
              📋 Learn the Rules
            </motion.button>
          </Link>
          
          <Link to="/download">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              🚀 Start Playing
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 flex flex-wrap justify-center gap-6 text-white/80 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-scrummy-goldYellow">⚡</span>
            <span>Weekly Reset</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-scrummy-goldYellow">👥</span>
            <span>6 Players Max</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-scrummy-goldYellow">🏅</span>
            <span>Win Prizes</span>
          </div>
        </motion.div>
      </div>

      {/* Shine effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 3,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      ></motion.div>
    </motion.div>
  );
};

export default Scrum6ChallengeBanner;