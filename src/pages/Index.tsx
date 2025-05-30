import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import ThreeScene from "../components/ThreeScene";
import WaitlistForm from "../components/WaitlistForm";
import Logo from "../components/Logo";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { FaTiktok } from 'react-icons/fa';

// Motion-enabled Link
const MotionLink = motion(Link);

// Set target date to May 12, 2025 at 00:00 (midnight) Eastern Time
const LAUNCH_DATE = new Date('2025-05-12T00:00:00-04:00');

// For debugging
const now = new Date();
const options: Intl.DateTimeFormatOptions = {
  timeZone: 'America/New_York',
  hour12: true,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};
console.log('Current time (EST):', now.toLocaleString('en-US', options));
console.log('Launch time (EST):', LAUNCH_DATE.toLocaleString('en-US', options));

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const floatingAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse" as const
  }
};

const Index: React.FC = () => {
  return (
    <>
      <ThreeScene />

      <div
        className="content-container min-h-screen flex flex-col items-center justify-center px-4 py-12"
        style={{ paddingBottom: 200 }}
      >
        <motion.div
          className="max-w-6xl w-full mx-auto flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <Logo className="mb-10" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-orbitron text-4xl md:text-7xl font-bold text-center mb-6 tracking-wider leading-tight"
          >
            <span className="text-[#003366]">FANTASY RUGBY</span>
            <br />
            <span className="text-[#FFC700] text-3xl md:text-5xl">IS ABOUT TO GET <br />SCRUMMY</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-scrummy-blue text-lg md:text-xl lg:text-2xl text-center max-w-3xl mb-8 md:mb-16 leading-relaxed font-light"
          >
            Be the First to Join the Scrum!
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-8 md:mb-16 w-full flex justify-center"
          >
            <motion.div
              variants={itemVariants}
              className="bg-[#003366]/10 rounded-xl p-6 shadow-sm max-w-3xl"
            >
              <p className="text-[#003366] text-lg md:text-xl lg:text-2xl text-center leading-relaxed font-light">
                The SCRUMMY mobile app is presently in BETA and has been released to the first <span className="font-bold">50 users</span> who signed up. Sign up below to be part of the next release, and stay tuned for our full launch!
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-8 w-full max-w-lg mx-auto"
          >
            <WaitlistForm />
          </motion.div>

          {/* Social Media Icons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-8 mb-8 justify-center"
          >
            <motion.a
              href="https://www.instagram.com/scrummyapp_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#003366] hover:text-[#FFC700] transition-colors p-2"
              whileHover={{ scale: 1.1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              animate={floatingAnimation}
            >
              <Instagram size={32} strokeWidth={2} />
            </motion.a>
            <motion.a
              href="https://www.facebook.com/profile.php?id=61574057183440"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#003366] hover:text-[#FFC700] transition-colors p-2"
              whileHover={{ scale: 1.1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 0.3 }
              }}
            >
              <Facebook size={32} strokeWidth={2} />
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@scrummy_fantasy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#003366] hover:text-[#FFC700] transition-colors p-2"
              whileHover={{ scale: 1.1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 0.6 }
              }}
            >
              <FaTiktok size={30} />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/channel/UCnKVk_L_fda9OuA5vDZBmmA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#003366] hover:text-[#FFC700] transition-colors p-2"
              whileHover={{ scale: 1.1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 0.9 }
              }}
            >
              <Youtube size={32} strokeWidth={2} />
            </motion.a>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-[#003366] text-sm md:text-base italic text-center max-w-md"
          >
            <em>Spots are limited—reserve your early access now!</em>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center mt-4"
          >
            <MotionLink
              to="/fixtures"
              variants={itemVariants}
              className="inline-block bg-[#003366] hover:bg-[#004488] text-[#FFC700] font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 text-lg md:text-xl"
              style={{
                boxShadow: "0 0 15px rgba(0, 51, 102, 0.5)", // Add a glowing effect
              }}
              whileHover={{
                y: -8,
                scale: 1.1,
                boxShadow: "0 0 25px rgba(0, 51, 102, 0.8)", // Intensify the glow on hover
              }}
              whileTap={{ scale: 0.98 }}
            >
              See School Boy Rugby Fixtures & Results
            </MotionLink>
          </motion.div>

          {/* Derby Day Section */}
          <motion.div
            variants={containerVariants}
            className="text-center mt-16 space-y-6 px-4 max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants} 
              className="bg-[#003366]/10 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-[#003366] font-orbitron text-2xl md:text-3xl font-bold mb-4 tracking-wider">
                THE MUKURU <span className="text-scrummy-goldYellow">DERBY DAY</span> RUGBY FESTIVAL IN ZIMBABWE
              </h3>
              <p className="text-[#003366] text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                SCRUMMY was proud to sponsor <span className="font-semibold">The Sharks Academy Tour to Zim. </span> Please click below for scores and game information.
              </p>
              <p className="text-[#003366]/80 text-base mt-2">
                April 28 - May 4, 2025
              </p>
            </motion.div>
          </motion.div>
        </motion.div>                
      </div>
    </>
  );
};

export default Index;
