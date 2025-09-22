import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Scrum6ChallengeBanner from '../components/Scrum6ChallengeBanner';

// Mock leaderboard data
interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
}

const mockLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Badgers", points: 89 },
  { rank: 2, name: "Odysseus", points: 86 },
  { rank: 3, name: "rsc2702", points: 85 },
  { rank: 4, name: "danaspiegel", points: 82 },
  { rank: 5, name: "Tafara", points: 68 },
  { rank: 6, name: "TM", points: 57 },
  { rank: 7, name: "Mgainsboro", points: 51 },
  { rank: 8, name: "guest_owl", points: 49 },
  { rank: 9, name: "Pops", points: 43 },
  { rank: 10, name: "HarryG", points: 39 }
];

// Medal component
const Medal: React.FC<{ type: 'gold' | 'silver' | 'bronze' }> = ({ type }) => {
  const colors = {
    gold: {
      outer: 'from-yellow-300 via-yellow-400 to-yellow-600',
      inner: 'from-yellow-400 via-yellow-500 to-yellow-700',
      accent: 'from-yellow-200 to-yellow-400',
      ribbon: 'from-red-500 to-red-700'
    },
    silver: {
      outer: 'from-gray-200 via-gray-300 to-gray-500',
      inner: 'from-gray-300 via-gray-400 to-gray-600',
      accent: 'from-gray-100 to-gray-300',
      ribbon: 'from-gray-600 to-gray-800'
    },
    bronze: {
      outer: 'from-amber-400 via-amber-500 to-amber-700',
      inner: 'from-amber-500 via-amber-600 to-amber-800',
      accent: 'from-amber-300 to-amber-500',
      ribbon: 'from-amber-800 to-amber-900'
    }
  };

  const numbers = {
    gold: '1',
    silver: '2', 
    bronze: '3'
  };

  return (
    <div className="relative">
      {/* Ribbon */}
      <div className={`absolute top-6 sm:top-8 md:top-10 left-1/2 transform -translate-x-1/2 w-4 sm:w-5 md:w-6 h-6 sm:h-8 md:h-10 bg-gradient-to-b ${colors[type].ribbon} rounded-b-sm z-0`}>
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-2 border-r-2 border-t-2 sm:border-l-3 sm:border-r-3 sm:border-t-3 md:border-l-4 md:border-r-4 md:border-t-4 border-transparent border-t-current"></div>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-2 border-r-2 border-t-2 sm:border-l-3 sm:border-r-3 sm:border-t-3 md:border-l-4 md:border-r-4 md:border-t-4 border-transparent border-t-current"></div>
      </div>
      
      {/* Medal outer ring */}
      <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${colors[type].outer} flex items-center justify-center shadow-2xl border-2 border-white/50 z-10`}>
        {/* Medal inner circle */}
        <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${colors[type].inner} flex items-center justify-center border border-white/30 relative overflow-hidden`}>
          {/* Shine effect */}
          <div className={`absolute top-0.5 left-0.5 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-br ${colors[type].accent} opacity-40 blur-sm`}></div>
          
          {/* Number */}
          <span className="text-white text-sm sm:text-base md:text-lg font-bold drop-shadow-lg relative z-10">{numbers[type]}</span>
          
          {/* Inner shine */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent"></div>
        </div>
        
        {/* Outer shine */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent"></div>
      </div>
    </div>
  );
};

// Podium tier component
const PodiumTier: React.FC<{ 
  player: LeaderboardEntry; 
  type: 'gold' | 'silver' | 'bronze';
  height: string;
  onShare: (player: LeaderboardEntry) => void;
}> = ({ player, type, height, onShare }) => {
  const bgColors = {
    gold: 'bg-gradient-to-t from-yellow-600 to-yellow-400',
    silver: 'bg-gradient-to-t from-gray-500 to-gray-300',
    bronze: 'bg-gradient-to-t from-amber-700 to-amber-500'
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: type === 'gold' ? 0.4 : type === 'silver' ? 0.2 : 0.6,
        type: "spring",
        stiffness: 100
      }}
      className="flex flex-col items-center"
    >
      {/* Medal */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 0.6, 
          delay: type === 'gold' ? 0.8 : type === 'silver' ? 0.6 : 1.0,
          type: "spring",
          stiffness: 200,
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: type === 'gold' ? 1.5 : type === 'silver' ? 1.8 : 2.1
          }
        }}
        className="mb-4"
      >
        <Medal type={type} />
      </motion.div>

      {/* Player name */}
      <div className="text-center mb-2 sm:mb-4">
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
          <h3 className="text-white font-bold text-sm sm:text-base md:text-lg truncate max-w-[80px] sm:max-w-none">{player.name}</h3>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onShare(player)}
            className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0"
          >
            <img 
              src="/assets/Icons/pngtree-file-upload-icon-png-image_4718142.jpg" 
              alt="Share" 
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 opacity-80 hover:opacity-100 transition-opacity"
            />
          </motion.button>
        </div>
        <p className="text-white/90 font-semibold text-xs sm:text-sm">{player.points.toLocaleString()} points</p>
      </div>

      {/* Podium tier with integrated base */}
      <div className="flex flex-col items-center">
        {/* Main podium tier */}
        <div className={`${bgColors[type]} ${height} w-20 sm:w-24 md:w-32 flex items-end justify-center pb-2 sm:pb-4 border-t-2 sm:border-t-4 border-white shadow-lg`}>
          <span className="text-white font-bold text-3xl sm:text-4xl md:text-6xl opacity-20">{player.rank}</span>
        </div>
        
        {/* Connected base */}
        <div className={`${bgColors[type]} h-2 sm:h-3 w-20 sm:w-24 md:w-32 border-l border-r border-white/20 shadow-md`}>
        </div>
      </div>
    </motion.div>
  );
};

const Scrum6Leaderboard: React.FC = () => {
  const topThree = mockLeaderboardData.slice(0, 3);
  const remaining = mockLeaderboardData.slice(3);

  // Generate victory card image
  const sharePlayer = (player: LeaderboardEntry) => {
    console.log('Share button clicked for:', player.name);
    alert(`Generating victory card for ${player.name}...`);
    generateVictoryCard(player);
  };

  const generateVictoryCard = (player: LeaderboardEntry) => {
    console.log('Generating victory card for:', player.name);
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      alert('Sorry, image generation is not supported in your browser');
      return;
    }

    // Set canvas size (Instagram post size)
    canvas.width = 1080;
    canvas.height = 1080;

    // Background gradient (brand colors)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#001E5C'); // scrummy-navy
    gradient.addColorStop(0.5, '#1196F5'); // scrummy-blue  
    gradient.addColorStop(1, '#001E5C'); // scrummy-navy
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some decorative elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 30 + 10;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Medal/rank badge
    const medalColor = player.rank === 1 ? '#FFD700' : player.rank === 2 ? '#C0C0C0' : '#CD7F32';
    ctx.fillStyle = medalColor;
    ctx.beginPath();
    ctx.arc(540, 300, 80, 0, Math.PI * 2);
    ctx.fill();
    
    // Rank number in medal
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(player.rank.toString(), 540, 320);

    // Player name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(player.name, 540, 450);

    // Points
    ctx.fillStyle = '#FFC603'; // scrummy-goldYellow
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`${player.points.toLocaleString()} POINTS`, 540, 520);

    // Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px Arial';
    const title = player.rank === 1 ? 'SCRUM6 CHAMPION' : 
                  player.rank <= 3 ? 'SCRUM6 PODIUM FINISHER' : 
                  'SCRUM6 TOP 10 FINISHER';
    ctx.fillText(title, 540, 600);

    // Week info
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '24px Arial';
    ctx.fillText('Week 2 • 2025', 540, 650);

    // Call to action
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('Think you can beat me?', 540, 750);
    
    ctx.fillStyle = '#FFC603';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('#Scrum6Challenge #RugbyFantasy', 540, 800);

    // Branding
    ctx.fillStyle = '#FFC603';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('SCRUMMY', 540, 950);

    // Download the image
    console.log('Converting canvas to blob...');
    canvas.toBlob((blob) => {
      if (blob) {
        console.log('Blob created successfully, downloading...');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${player.name}-Scrum6-Victory-Card.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log('Download triggered');
      } else {
        console.error('Failed to create blob');
        alert('Failed to generate image');
      }
    }, 'image/png');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-scrummy-navy via-scrummy-blue to-scrummy-navy relative overflow-hidden">
      {/* Stadium Background Elements */}
      <div className="absolute inset-0">
        {/* Floodlights */}
        <div className="absolute top-8 left-8 w-8 h-8 bg-white rounded-full opacity-60 blur-sm"></div>
        <div className="absolute top-12 right-12 w-6 h-6 bg-white rounded-full opacity-50 blur-sm"></div>
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-white rounded-full opacity-40 blur-sm"></div>
        <div className="absolute top-16 right-1/4 w-5 h-5 bg-white rounded-full opacity-45 blur-sm"></div>
        <div className="absolute top-24 left-1/3 w-3 h-3 bg-white rounded-full opacity-35 blur-sm"></div>
        <div className="absolute top-28 right-1/3 w-7 h-7 bg-white rounded-full opacity-55 blur-sm"></div>

        {/* Tactical markings scattered around */}
        <div className="absolute top-32 left-16 text-white/20 text-2xl font-bold">X</div>
        <div className="absolute top-40 right-20 text-white/15 text-3xl font-bold">O</div>
        <div className="absolute bottom-32 left-24 text-white/20 text-2xl font-bold">X</div>
        <div className="absolute bottom-40 right-32 text-white/15 text-xl font-bold">O</div>
        <div className="absolute top-1/2 left-12 text-white/10 text-4xl font-bold">→</div>
        <div className="absolute top-1/3 right-16 text-white/15 text-3xl font-bold">↗</div>
        <div className="absolute bottom-1/3 left-20 text-white/20 text-2xl font-bold">↖</div>

        {/* Spotlights on winners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {/* Gold spotlight */}
          <div className="absolute w-40 h-40 rounded-full blur-lg" 
               style={{ 
                 left: '0px', 
                 top: '-100px',
                 background: 'radial-gradient(circle, rgba(252, 211, 77, 0.3) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 100%)'
               }}></div>
          
          {/* Silver spotlight */}
          <div className="absolute w-32 h-32 rounded-full blur-lg" 
               style={{ 
                 left: '-120px', 
                 top: '-80px',
                 background: 'radial-gradient(circle, rgba(209, 213, 219, 0.25) 0%, rgba(156, 163, 175, 0.15) 50%, transparent 100%)'
               }}></div>
          
          {/* Bronze spotlight */}
          <div className="absolute w-28 h-28 rounded-full blur-lg" 
               style={{ 
                 left: '120px', 
                 top: '-70px',
                 background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 100%)'
               }}></div>
        </motion.div>

        {/* Main stage spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 0.4, 0.7, 0.4], 
            scale: [0.5, 1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(252, 211, 77, 0.1) 50%, transparent 100%)'
          }}
        ></motion.div>
      </div>

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
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <img src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" alt="SCRUMMY Logo" className="h-16 w-auto mr-4" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Leaderboard</h1>
          <p className="text-xl text-white/80 mb-4">Scrum6 Weekly Challenge Winners</p>
          
          {/* Rules Button */}
          <Link to="/scrum6-rules">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              📋 Official Rules
            </motion.button>
          </Link>
        </motion.div>

        {/* Scrum6 Challenge Banner */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-12 px-4"
        >
          <Scrum6ChallengeBanner />
        </motion.div>

        {/* Podium Section */}
        <div className="max-w-4xl mx-auto mb-16 px-4">
          <div className="relative">
            {/* Players and medals above podium */}
            <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-8 mb-0">
              {/* 2nd Place - Silver */}
              <PodiumTier 
                player={topThree[1]} 
                type="silver" 
                height="h-32"
                onShare={sharePlayer}
              />
              
              {/* 1st Place - Gold (highest) */}
              <PodiumTier 
                player={topThree[0]} 
                type="gold" 
                height="h-48"
                onShare={sharePlayer}
              />
              
              {/* 3rd Place - Bronze */}
              <PodiumTier 
                player={topThree[2]} 
                type="bronze" 
                height="h-24"
                onShare={sharePlayer}
              />
            </div>

            {/* Main stage foundation */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.4, type: "spring", stiffness: 100 }}
              className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 h-3 sm:h-4 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto rounded-b-lg shadow-2xl border-t-2 border-white/30"
            >
            </motion.div>
          </div>
        </div>

        {/* Remaining Players (4-10) */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="max-w-2xl mx-auto px-4"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Top 10 Players</h2>
            <div className="space-y-3">
              {remaining.map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                  className="flex items-center justify-between bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{player.rank}</span>
                    </div>
                    <span className="text-white font-semibold">{player.name}</span>
                  </div>
                   <div className="flex items-center gap-2">
                     <div className="text-scrummy-goldYellow font-bold">
                       {player.points.toLocaleString()}
                     </div>
                     <motion.button
                       whileHover={{ scale: 1.2 }}
                       whileTap={{ scale: 0.9 }}
                       onClick={() => sharePlayer(player)}
                       className="p-1 hover:bg-white/10 rounded transition-colors"
                     >
                       <img 
                         src="/assets/Icons/pngtree-file-upload-icon-png-image_4718142.jpg" 
                         alt="Share" 
                         className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity"
                       />
                     </motion.button>
                   </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Celebration Message */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.5, type: "spring", stiffness: 200 }}
          className="text-center mt-12"
        >
          <div className="bg-scrummy-goldYellow/20 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto border border-scrummy-goldYellow/30">
            <h3 className="text-2xl font-bold text-scrummy-goldYellow mb-2">🏆 Congratulations!</h3>
            <p className="text-white/90">
              Amazing performances this week! The leaderboard resets every Monday for a fresh start.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Scrum6Leaderboard;