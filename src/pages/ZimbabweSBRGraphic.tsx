import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Users, Target, School, MapPin } from 'lucide-react';

// School data with their players
const schoolsWithPlayers = [
  {
    school: "Churchill Boys High",
    logo: "/assets/Churchill.png",
    location: "Harare, Zimbabwe",
    playerCount: 4,
    players: [
      { name: "Victor Mupunga", image: "/assets/Zimbabwe Players/Victor Mupunga.png", nickname: "Victor" },
      { name: "Simba Mandioma", image: "/assets/Zimbabwe Players/Simba Mandioma.png", nickname: "Simba" },
      { name: "Tinotenda Mavesere", image: "/assets/Zimbabwe Players/Tinotenda Mavesere.png", nickname: "Tinotenda" },
      { name: "Kudzai Mashawi", image: "/assets/Zimbabwe Players/Kudzai Mashawi.png", nickname: "Mashawi" }
    ],
    color: "from-green-400 to-green-600"
  },
  {
    school: "Prince Edward School",
    logo: "/assets/PrinceEdward.png",
    location: "Harare, Zimbabwe",
    playerCount: 4,
    players: [
      { name: "Godfrey Muzanargwo", image: "/assets/Zimbabwe Players/Godfrey Muzanargwo.png", nickname: "Godfrey" },
      { name: "Dylan Utete", image: "/assets/Zimbabwe Players/Dylan Utete.png", nickname: "Dylan" },
      { name: "Dion Khumalo", image: "/assets/Zimbabwe Players/Dion Khumalo.png", nickname: "Dion" },
      { name: "Takudzwa Musingwini", image: "/assets/Zimbabwe Players/Takudzwa Musingwini.png", nickname: "Takudzwa" }
    ],
    color: "from-yellow-400 to-yellow-600"
  },
  {
    school: "Milton Boys",
    logo: "/assets/Milton.png",
    location: "Bulawayo, Zimbabwe",
    playerCount: 2,
    players: [
      { name: "Kudakwashe Nyakufaringwa", image: "/assets/Zimbabwe Players/Kudakwashe Nyakufaringwa.png", nickname: "Goofy" },
      { name: "Bornwell Gwinji", image: "/assets/Zimbabwe Players/Bornwell Gwinji.png", nickname: "Bornwell" }
    ],
    color: "from-teal-400 to-teal-600"
  },
  {
    school: "Wise Owl Marondera",
    logo: "/assets/WiseOwl.png",
    location: "Marondera, Zimbabwe",
    playerCount: 2,
    players: [
      { name: "Simba Siraha", image: "/assets/Zimbabwe Players/Simba Siraha.png", nickname: "Simba" },
      { name: "Trevor Gurwe", image: "/assets/Zimbabwe Players/Trevor Gurwe.png", nickname: "Trevor" }
    ],
    color: "from-blue-400 to-blue-600"
  },
  {
    school: "Falcon College",
    logo: "/assets/Falcon.png",
    location: "Esigodini, Zimbabwe",
    playerCount: 1,
    players: [
      { name: "Cleopas Kundiona", image: "/assets/Zimbabwe Players/Cleopas Kundiona.png", nickname: "Cleopas" }
    ],
    color: "from-emerald-400 to-emerald-600"
  },
  {
    school: "Lomagundi College",
    logo: "/assets/Lomagundi.png",
    location: "Chinhoyi, Zimbabwe",
    playerCount: 1,
    players: [
      { name: "Edward Sigauke", image: "/assets/Zimbabwe Players/Edward Sigauke.png", nickname: "Edward" }
    ],
    color: "from-cyan-400 to-cyan-600"
  },
  {
    school: "Ormiston College",
    logo: "/assets/logo.png",
    location: "Australia",
    playerCount: 1,
    players: [
      { name: "Ian Prior", image: "/assets/Zimbabwe Players/Ian Prior.png", nickname: "Ian" }
    ],
    color: "from-indigo-400 to-indigo-600"
  },
  {
    school: "St Johns College",
    logo: "/assets/STJOHNSHIGH.png",
    location: "Harare, Zimbabwe",
    playerCount: 1,
    players: [
      { name: "Aiden Burnett", image: "/assets/Zimbabwe Players/Aiden Burnett.png", nickname: "Aiden" }
    ],
    color: "from-purple-400 to-purple-600"
  },
  {
    school: "Michaelhouse",
    logo: "/assets/SA logos/SA schools (Logo)/Michaelhouse.png",
    location: "Durban, South Africa",
    playerCount: 1,
    players: [
      { name: "Hilton Mudariki", image: "/assets/Zimbabwe Players/Hilton Mudariki.png", nickname: "Hilton", captain: true }
    ],
    color: "from-orange-400 to-orange-600"
  },
  {
    school: "SACS",
    logo: "/assets/logo.png",
    location: "Cape Town, South Africa",
    playerCount: 1,
    players: [
      { name: "Liam Larkan", image: "/assets/Zimbabwe Players/Liam Larkan.png", nickname: "Liam" }
    ],
    color: "from-red-400 to-red-600"
  },
  {
    school: "Stellenberg",
    logo: "/assets/logo.png",
    location: "Western Province, South Africa",
    playerCount: 1,
    players: [
      { name: "Keegan Joubert", image: "/assets/Zimbabwe Players/Keegan Joubert.png", nickname: "Keegan" }
    ],
    color: "from-pink-400 to-pink-600"
  },
  {
    school: "Hudson Park High School",
    logo: "/assets/logo.png",
    location: "East London, South Africa",
    playerCount: 1,
    players: [
      { name: "Tyran Fagan", image: "/assets/Zimbabwe Players/Tyran Fagan.png", nickname: "Tyran" }
    ],
    color: "from-violet-400 to-violet-600"
  },
  {
    school: "Ermelo High School",
    logo: "/assets/logo.png",
    location: "Mpumalanga, South Africa",
    playerCount: 1,
    players: [
      { name: "Tapiwa Mafura", image: "/assets/Zimbabwe Players/Tapiwa Mafura.png", nickname: "Tapiwa" }
    ],
    color: "from-slate-400 to-slate-600"
  },
  {
    school: "Sutherland High School",
    logo: "/assets/logo.png",
    location: "Australia",
    playerCount: 1,
    players: [
      { name: "Jason Fraser", image: "/assets/Zimbabwe Players/Jason Fraser.png", nickname: "Jason" }
    ],
    color: "from-gray-400 to-gray-600"
  },
  {
    school: "Heretaunga College",
    logo: "/assets/logo.png",
    location: "New Zealand",
    playerCount: 1,
    players: [
      { name: "Brandon Mudzekenyedzi", image: "/assets/Zimbabwe Players/Brandon Mudzekenyedzi.png", nickname: "Brandon" }
    ],
    color: "from-neutral-400 to-neutral-600"
  }
];

// Sort schools by player count (descending)
const sortedSchools = [...schoolsWithPlayers].sort((a, b) => b.playerCount - a.playerCount);

const ZimbabweSBRGraphic: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const barVariants = {
    hidden: { 
      width: 0,
      opacity: 0
    },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-scrummy-navy via-scrummy-blue to-indigo-900 overflow-hidden flex items-center justify-center">
      <div className="w-[1080px] h-[1350px] bg-gradient-to-br from-scrummy-navy via-scrummy-blue to-indigo-900 overflow-hidden relative"
           style={{ minWidth: '1080px', minHeight: '1350px' }}>

      {/* Header Section */}
      <motion.div
        className="relative z-10 pt-6 pb-4"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="w-full px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" 
              alt="SCRUMMY Logo" 
              className="h-16 w-auto"
            />
            <div className="w-10 h-10 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-scrummy-navy" />
            </div>
            <img 
              src="/assets/ZimSables.png" 
              alt="Zimbabwe Rugby" 
              className="h-16 w-auto"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
            <span className="text-scrummy-goldYellow">ZIMBABWE SABLES</span>
            <br />
            <span className="text-xl font-light">SCHOOL BOY RUGBY ORIGINS</span>
          </h1>
          
          <p className="text-sm text-white/90 mb-4">
            Where Zimbabwe's International Rugby Stars Started Their Journey
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Badge className="bg-scrummy-goldYellow text-scrummy-navy px-3 py-1 text-xs font-semibold">
              <Users className="w-3 h-3 mr-1" />
              23 Players
            </Badge>
            <Badge className="bg-green-500 text-white px-3 py-1 text-xs font-semibold">
              <School className="w-3 h-3 mr-1" />
              15 Schools
            </Badge>
            <Badge className="bg-orange-500 text-white px-3 py-1 text-xs font-semibold">
              <MapPin className="w-3 h-3 mr-1" />
              3 Countries
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Schools Grid Section */}
      <motion.div 
        className="relative z-10 px-6 pb-4 flex-1"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-scrummy-goldYellow/30 h-full">
          <h2 className="text-lg font-bold text-scrummy-navy mb-4 text-center">
            Zimbabwe Sables School Origins
          </h2>
          
          {/* Horizontal Grid Layout */}
          <div className="grid grid-cols-5 gap-2 h-full">
            {sortedSchools.map((school, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-2 shadow-md border-2 border-scrummy-goldYellow/30 flex flex-col"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* School Header */}
                <div className="text-center mb-2">
                  <h3 className="font-bold text-scrummy-navy text-xs leading-tight mb-1">
                    {school.school}
                  </h3>
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-xs text-gray-600 truncate">
                      {school.location}
                    </p>
                    <div className="w-4 h-4 bg-scrummy-navy rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{school.playerCount}</span>
                    </div>
                  </div>
                </div>
                
                {/* Player Cards - Horizontal Layout */}
                <div className="flex flex-col gap-1 flex-1">
                  {school.players.map((player, playerIndex) => (
                    <div 
                      key={playerIndex} 
                      className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border border-scrummy-goldYellow/30"
                    >
                      <div className="relative flex-shrink-0">
                        <img 
                          src={player.image} 
                          alt={player.name}
                          className="w-10 h-10 object-cover rounded-lg border-2 border-scrummy-goldYellow shadow-sm"
                        />
                        {player.captain && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-scrummy-goldYellow rounded-full flex items-center justify-center">
                            <Trophy className="w-2 h-2 text-scrummy-navy" />
                          </div>
                        )}
                      </div>
                      <span className={`text-xs font-bold flex-1 ${
                        player.captain ? 'text-scrummy-goldYellow' : 'text-scrummy-navy'
                      }`}>
                        {player.nickname}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Simple CTA */}
      <motion.div 
        className="relative z-10 px-6 py-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="bg-scrummy-goldYellow rounded-xl p-4 text-center shadow-lg">
          <h3 className="text-scrummy-navy font-bold text-lg mb-2">
            PREDICT THE NEXT RUGBY LEGENDS!
          </h3>
          <p className="text-scrummy-navy text-sm mb-3">
            Join SCRUMMY Fantasy Rugby - From School Fields to International Glory
          </p>
          <div className="flex justify-center gap-2">
            <div className="flex items-center gap-1 text-scrummy-navy text-xs">
              <Trophy className="w-3 h-3" />
              <span>Fantasy Rugby</span>
            </div>
            <div className="flex items-center gap-1 text-scrummy-navy text-xs">
              <Star className="w-3 h-3" />
              <span>Player Tracking</span>
            </div>
            <div className="flex items-center gap-1 text-scrummy-navy text-xs">
              <School className="w-3 h-3" />
              <span>SBR Coverage</span>
            </div>
          </div>
        </div>
      </motion.div>


      </div>
    </div>
  );
};

export default ZimbabweSBRGraphic; 