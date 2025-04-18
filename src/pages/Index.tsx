import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThreeScene from "../components/ThreeScene";
import CountdownTimer from "../components/CountdownTimer";
import WaitlistForm from "../components/WaitlistForm";
import Logo from "../components/Logo";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { FaTiktok } from 'react-icons/fa';

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
            <CountdownTimer targetDate={LAUNCH_DATE} />
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
              href="https://www.instagram.com/scrum_myy/"
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
        </motion.div>
      </div>
    </>
  );
};

export default Index;
