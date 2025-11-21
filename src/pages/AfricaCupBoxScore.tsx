import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, MapPin, Clock, Users, Activity, AlertCircle, Download, Target, Shield, TrendingUp, RotateCcw, AlertTriangle, Play, Circle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

// Theme tokens from homepage
const tokens = {
  bg: "#0B0D18",
  surface: "#121527",
  surface2: "#0E1222",
  text: "#E6E9F5",
  textMuted: "#A9B1C6",
  primary: "#2D6CFF",
  primary2: "#7A5CFF",
  gold: "#F9C94E",
};

const appGradient = "bg-[radial-gradient(1200px_600px_at_80%_-20%,rgba(45,108,255,.25),rgba(122,92,255,.12)_40%,transparent_70%),linear-gradient(180deg,#0B0D18_0%,#0B0D18_30%,#0E1222_100%)]";
const cardGrad = "bg-[linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.01))]";

// Timezone conversion utility (same as other Africa Cup pages)
const convertToLocalTime = (timeStr: string, date: string = '2025-07-08') => {
  try {
    // Parse the EAT time (UTC+3)
    const [time, period] = timeStr.split(/(?=[AP]M)/);
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    // Create date in EAT timezone (UTC+3)
    const eatTime = new Date(`${date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00+03:00`);
    
    // Check if date is valid
    if (isNaN(eatTime.getTime())) {
      throw new Error('Invalid date');
    }
    
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Format for user's local timezone
    const localTime = eatTime.toLocaleTimeString('en-US', {
      timeZone: userTimezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    // Get timezone abbreviation
    const timezoneName = eatTime.toLocaleTimeString('en-US', {
      timeZone: userTimezone,
      timeZoneName: 'short'
    }).split(' ').slice(-1)[0];
    
    return {
      localTime,
      timezoneName,
      originalTime: timeStr,
      isEAT: userTimezone === 'Africa/Kampala' || userTimezone.includes('Africa/Nairobi')
    };
  } catch (error) {
    // Fallback to original time if conversion fails
    return {
      localTime: timeStr,
      timezoneName: 'EAT',
      originalTime: timeStr,
      isEAT: true
    };
  }
};

// Date conversion utility (same as fixtures page)
const convertDateFormat = (dateStr: string) => {
  try {
    // If it's already in the correct format, return as is
    if (dateStr.includes('-') && dateStr.includes('2025')) {
      return dateStr;
    }
    
    // Convert "July 8, 2025" to "2025-07-08"
    const date = new Date(dateStr);
    
    // Validate date
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    // Return original if conversion fails
    return dateStr;
  }
};

const matchData: Record<string, { team1: { name: string; flag: string }; team2: { name: string; flag: string }; date: string; time: string; finalScore?: { team1: number; team2: number } }> = {
  '1': { team1: { name: 'Zimbabwe', flag: '🇿🇼' }, team2: { name: 'Morocco', flag: '🇲🇦' }, date: 'July 8, 2025', time: '10:00AM', finalScore: { team1: 43, team2: 8 } },
  '2': { team1: { name: 'Algeria', flag: '🇩🇿' }, team2: { name: 'Côte d\'Ivoire', flag: '🇨🇮' }, date: 'July 8, 2025', time: '04:00PM', finalScore: { team1: 41, team2: 6 } },
  '3': { team1: { name: 'Namibia', flag: '🇳🇦' }, team2: { name: 'Senegal', flag: '🇸🇳' }, date: 'July 8, 2025', time: '02:00PM', finalScore: { team1: 55, team2: 17 } },
  '4': { team1: { name: 'Kenya', flag: '🇰🇪' }, team2: { name: 'Uganda', flag: '🇺🇬' }, date: 'July 8, 2025', time: '12:00PM', finalScore: { team1: 32, team2: 24 } },
  '5': { team1: { name: 'Algeria', flag: '🇩🇿' }, team2: { name: 'Namibia', flag: '🇳🇦' }, date: 'July 13, 2025', time: '02:00PM', finalScore: { team1: 7, team2: 21 } },
  '6': { team1: { name: 'Zimbabwe', flag: '🇿🇼' }, team2: { name: 'Kenya', flag: '🇰🇪' }, date: 'July 13, 2025', time: '04:30PM', finalScore: { team1: 29, team2: 23 } },
  '7': { team1: { name: 'SF1 Winner', flag: '🏆' }, team2: { name: 'SF2 Winner', flag: '🏆' }, date: 'July 19, 2025', time: '04:00PM' }
};

const AfricaCupBoxScore: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const match = matchId ? matchData[matchId] : null;

  if (!match) {
    return <div>Match not found</div>;
  }

  const timeInfo = convertToLocalTime(match.time, convertDateFormat(match.date));

  return (
    <div className={`${appGradient} min-h-screen`} style={{ color: tokens.text }}>
      <Nav />

      {/* Match Header */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/africa-cup/fixtures" className="inline-flex items-center gap-2 text-white/70 hover:text-[#F9C94E] transition-colors mb-8">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Africa Cup Fixtures</span>
          </Link>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Match Info */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-sm mb-6">
                Rugby Africa Cup 2025 - Match {matchId}
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-white/60 mb-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {timeInfo.isEAT ? (
                      `${timeInfo.originalTime} EAT`
                    ) : (
                      `${timeInfo.localTime} (${timeInfo.originalTime} EAT)`
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mandela National Stadium, Kampala</span>
                </div>
              </div>
            </div>

            {/* Score Display */}
            <div className={`${cardGrad} rounded-3xl border border-white/10 p-8 md:p-12 max-w-4xl mx-auto mb-8`}>
              <div className="flex items-center justify-center gap-8 md:gap-16">
                <div className="text-center flex-1">
                  <div className="text-6xl md:text-7xl mb-3">{match.team1.flag}</div>
                  <div className="text-xl md:text-2xl font-bold text-white">{match.team1.name}</div>
                </div>
                
                <div className="text-center px-4">
                  <div className="text-5xl md:text-6xl font-black text-[#F9C94E] mb-2">
                    {match.finalScore ? `${match.finalScore.team1} - ${match.finalScore.team2}` : '0 - 0'}
                  </div>
                  <div className="text-sm text-white/50">
                    {match.finalScore ? 'Full Time' : 'Upcoming'}
                  </div>
                </div>
                
                <div className="text-center flex-1">
                  <div className="text-6xl md:text-7xl mb-3">{match.team2.flag}</div>
                  <div className="text-xl md:text-2xl font-bold text-white">{match.team2.name}</div>
                </div>
              </div>
            </div>

            {/* Status Notice */}
            <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm max-w-2xl mx-auto ${
              match.finalScore 
                ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                : 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
            }`}>
              <AlertCircle className="w-4 h-4" />
              <span>
                {match.finalScore 
                  ? 'Match completed - Final score updated' 
                  : 'Match statistics will be updated after the game'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Box Score Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {matchId === '1' ? (
            // Comprehensive Zimbabwe vs Morocco Boxscore
            <div className="space-y-8">
              
              {/* Match Details */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <div className="text-center mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg inline-block">
                    <div className="text-sm text-gray-600 mb-2">Match Duration: 98:54 | Total Events: 1,125</div>
                  </div>
                </div>
              </motion.div>

              {/* Possession Bar */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                      <Clock className="w-5 h-5" />
                      Possession
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-scrummy-navy">🇿🇼 Zimbabwe</span>
                        <span className="font-bold text-red-600">Morocco 🇲🇦</span>
                      </div>
                      <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden flex">
                        <div 
                          className="h-full bg-scrummy-navy flex items-center justify-center text-white font-bold text-sm"
                          style={{ width: '55.2%' }}
                        >
                          55.2%
                        </div>
                        <div 
                          className="h-full bg-red-500 flex items-center justify-center text-white font-bold text-sm"
                          style={{ width: '44.8%' }}
                        >
                          44.8%
                        </div>
                    </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Time: 17:53</span>
                        <span>Time: 14:29</span>
                      </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

              {/* Stats Grid */}
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                                 {/* Scoring */}
                 <motion.div
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.3, duration: 0.6 }}
                 >
                   <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                     <CardHeader className="pb-3">
                       <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                         <Target className="w-5 h-5" />
                         Scoring
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="pt-0">
                       <div className="space-y-6">
                         {/* Tries */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Tries</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">4</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">1</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex gap-1">
                               {[...Array(4)].map((_, i) => (
                                 <div key={i} className="w-3 h-3 rounded-full bg-scrummy-navy"></div>
                               ))}
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex gap-1">
                               <div className="w-3 h-3 rounded-full bg-red-500"></div>
                               {[...Array(3)].map((_, i) => (
                                 <div key={i} className="w-3 h-3 rounded-full bg-gray-200"></div>
                               ))}
                             </div>
                           </div>
                         </div>

                         {/* Conversions */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Conversions</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">4/8</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">0/2</span>
                             </div>
                           </div>
                           <div className="space-y-2">
                             <div className="flex items-center gap-2">
                               <span className="text-xs text-gray-500 w-16">Zimbabwe</span>
                               <div className="flex-1 bg-gray-200 rounded-full h-2">
                                 <div className="bg-scrummy-navy h-2 rounded-full" style={{ width: '50%' }}></div>
                               </div>
                               <span className="text-xs text-gray-500 w-8">50%</span>
                             </div>
                             <div className="flex items-center gap-2">
                               <span className="text-xs text-gray-500 w-16">Morocco</span>
                               <div className="flex-1 bg-gray-200 rounded-full h-2">
                                 <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                               </div>
                               <span className="text-xs text-gray-500 w-8">0%</span>
                             </div>
                           </div>
                         </div>

                         {/* Penalty Goals */}
                         <div className="pb-2">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Penalty Goals</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">5/10</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">1/2</span>
                             </div>
                           </div>
                           <div className="space-y-2">
                             <div className="flex items-center gap-2">
                               <span className="text-xs text-gray-500 w-16">Zimbabwe</span>
                               <div className="flex-1 bg-gray-200 rounded-full h-2">
                                 <div className="bg-scrummy-navy h-2 rounded-full" style={{ width: '50%' }}></div>
                               </div>
                               <span className="text-xs text-gray-500 w-8">50%</span>
                             </div>
                             <div className="flex items-center gap-2">
                               <span className="text-xs text-gray-500 w-16">Morocco</span>
                               <div className="flex-1 bg-gray-200 rounded-full h-2">
                                 <div className="bg-red-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                               </div>
                               <span className="text-xs text-gray-500 w-8">50%</span>
                             </div>
                           </div>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>

                                 {/* Attack */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
                   <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                     <CardHeader className="pb-3">
                       <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                         <Play className="w-5 h-5" />
                         Attack
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="pt-0">
                       <div className="space-y-5">
                         {/* Passes */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Passes</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">106</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">64</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-scrummy-navy h-3 rounded-full" style={{ width: '62.4%' }}></div>
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-red-500 h-3 rounded-full" style={{ width: '37.6%' }}></div>
                             </div>
                           </div>
                         </div>

                         {/* Ball Carries */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Ball Carries</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">93</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">61</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-scrummy-navy h-3 rounded-full" style={{ width: '60.4%' }}></div>
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-red-500 h-3 rounded-full" style={{ width: '39.6%' }}></div>
                             </div>
                           </div>
                         </div>

                         {/* Linebreaks */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Linebreaks</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">4</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">3</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex gap-1">
                               {[...Array(4)].map((_, i) => (
                                 <div key={i} className="w-2 h-6 bg-scrummy-navy rounded"></div>
                               ))}
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex gap-1">
                               {[...Array(3)].map((_, i) => (
                                 <div key={i} className="w-2 h-6 bg-red-500 rounded"></div>
                               ))}
                               <div className="w-2 h-6 bg-gray-200 rounded"></div>
                             </div>
                           </div>
                         </div>

                         {/* Offloads */}
                         <div className="pb-2">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Offloads</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">4</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">1</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex gap-1">
                               {[...Array(4)].map((_, i) => (
                                 <div key={i} className="w-2 h-6 bg-scrummy-navy rounded"></div>
                               ))}
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex gap-1">
                               <div className="w-2 h-6 bg-red-500 rounded"></div>
                               {[...Array(3)].map((_, i) => (
                                 <div key={i} className="w-2 h-6 bg-gray-200 rounded"></div>
                               ))}
                             </div>
                           </div>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>

                                 {/* Defense */}
                 <motion.div
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.5, duration: 0.6 }}
                 >
                   <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                     <CardHeader className="pb-3">
                       <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                         <Shield className="w-5 h-5" />
                         Defense
                  </CardTitle>
                </CardHeader>
                     <CardContent className="pt-0">
                       <div className="space-y-5">
                         {/* Tackle Success Rate */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Tackle Success Rate</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">88.6%</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">84.6%</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="flex-1 flex items-center gap-2">
                               <div className="w-12 h-12 relative">
                                 <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#1e40af" strokeWidth="2"
                                     strokeDasharray="88.6, 100" strokeLinecap="round" />
                                 </svg>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <span className="text-xs font-bold text-scrummy-navy">88.6%</span>
                                 </div>
                               </div>
                               <span className="text-xs text-gray-500">Zimbabwe</span>
                             </div>
                             <div className="flex-1 flex items-center gap-2">
                               <div className="w-12 h-12 relative">
                                 <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#dc2626" strokeWidth="2"
                                     strokeDasharray="84.6, 100" strokeLinecap="round" />
                                 </svg>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <span className="text-xs font-bold text-red-600">84.6%</span>
                                 </div>
                               </div>
                               <span className="text-xs text-gray-500">Morocco</span>
                             </div>
                           </div>
                         </div>

                         {/* Tackles Made */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Tackles Made</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">70</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">99</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-scrummy-navy h-3 rounded-full" style={{ width: '41.4%' }}></div>
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-red-500 h-3 rounded-full" style={{ width: '58.6%' }}></div>
                             </div>
                           </div>
                         </div>

                         {/* Tackles Missed */}
                         <div className="pb-2">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Tackles Missed</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">9</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">18</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex gap-1">
                               {[...Array(9)].map((_, i) => (
                                 <div key={i} className="w-1 h-4 bg-scrummy-navy rounded"></div>
                               ))}
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex gap-1">
                               {[...Array(18)].map((_, i) => (
                                 <div key={i} className="w-1 h-4 bg-red-500 rounded"></div>
                               ))}
                             </div>
                           </div>
                         </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

                                 {/* Set Piece */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
                   <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                     <CardHeader className="pb-3">
                       <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                         <TrendingUp className="w-5 h-5" />
                         Set Piece
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="pt-0">
                       <div className="space-y-5">
                         {/* Lineout Success */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Lineout Success</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">85.0%</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">42.9%</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="flex-1 flex items-center gap-2">
                               <div className="w-12 h-12 relative">
                                 <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#1e40af" strokeWidth="2"
                                     strokeDasharray="85, 100" strokeLinecap="round" />
                                 </svg>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <span className="text-xs font-bold text-scrummy-navy">85%</span>
                                 </div>
                               </div>
                               <span className="text-xs text-gray-500">ZIM</span>
                             </div>
                             <div className="flex-1 flex items-center gap-2">
                               <div className="w-12 h-12 relative">
                                 <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#dc2626" strokeWidth="2"
                                     strokeDasharray="42.9, 100" strokeLinecap="round" />
                                 </svg>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <span className="text-xs font-bold text-red-600">43%</span>
                                 </div>
                               </div>
                               <span className="text-xs text-gray-500">MAR</span>
                             </div>
                           </div>
                         </div>

                         {/* Lineouts Won */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Lineouts Won</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">17/20</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">6/14</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="flex-1">
                               <div className="flex gap-1 mb-1">
                                 {[...Array(17)].map((_, i) => (
                                   <CheckCircle key={i} className="w-2 h-2 text-scrummy-navy" />
                                 ))}
                                 {[...Array(3)].map((_, i) => (
                                   <XCircle key={i} className="w-2 h-2 text-gray-300" />
                                 ))}
                               </div>
                               <span className="text-xs text-gray-500">Zimbabwe</span>
                             </div>
                             <div className="flex-1">
                               <div className="flex gap-1 mb-1">
                                 {[...Array(6)].map((_, i) => (
                                   <CheckCircle key={i} className="w-2 h-2 text-red-500" />
                                 ))}
                                 {[...Array(8)].map((_, i) => (
                                   <XCircle key={i} className="w-2 h-2 text-gray-300" />
                                 ))}
                               </div>
                               <span className="text-xs text-gray-500">Morocco</span>
                             </div>
                           </div>
                         </div>

                         {/* Scrums Won */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Scrums Won</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">3/4</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">7/9</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="flex-1">
                               <div className="flex gap-1 mb-1">
                                 {[...Array(3)].map((_, i) => (
                                   <CheckCircle key={i} className="w-3 h-3 text-scrummy-navy" />
                                 ))}
                                 <XCircle className="w-3 h-3 text-gray-300" />
                               </div>
                               <span className="text-xs text-gray-500">Zimbabwe</span>
                             </div>
                             <div className="flex-1">
                               <div className="flex gap-1 mb-1">
                                 {[...Array(7)].map((_, i) => (
                                   <CheckCircle key={i} className="w-3 h-3 text-red-500" />
                                 ))}
                                 {[...Array(2)].map((_, i) => (
                                   <XCircle key={i} className="w-3 h-3 text-gray-300" />
                                 ))}
                               </div>
                               <span className="text-xs text-gray-500">Morocco</span>
                             </div>
                           </div>
                         </div>

                         {/* Mauls Won */}
                         <div className="pb-2">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Mauls Won</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">3/4</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">4/4</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="flex-1">
                               <div className="flex gap-1 mb-1">
                                 {[...Array(3)].map((_, i) => (
                                   <CheckCircle key={i} className="w-3 h-3 text-scrummy-navy" />
                                 ))}
                                 <XCircle className="w-3 h-3 text-gray-300" />
                               </div>
                               <span className="text-xs text-gray-500">Zimbabwe</span>
                             </div>
                             <div className="flex-1">
                               <div className="flex gap-1 mb-1">
                                 {[...Array(4)].map((_, i) => (
                                   <CheckCircle key={i} className="w-3 h-3 text-red-500" />
                                 ))}
                               </div>
                               <span className="text-xs text-gray-500">Morocco</span>
                             </div>
                           </div>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>

                                 {/* Breakdown */}
                 <motion.div
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.7, duration: 0.6 }}
                 >
                   <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                     <CardHeader className="pb-3">
                       <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                         <RotateCcw className="w-5 h-5" />
                         Breakdown
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="pt-0">
                       <div className="space-y-5">
                         {/* Ruck Success */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Ruck Success</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">95.3%</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">97.6%</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="flex-1 flex items-center gap-2">
                               <div className="w-12 h-12 relative">
                                 <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#1e40af" strokeWidth="2"
                                     strokeDasharray="95.3, 100" strokeLinecap="round" />
                                 </svg>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <span className="text-xs font-bold text-scrummy-navy">95%</span>
                                 </div>
                               </div>
                               <span className="text-xs text-gray-500">ZIM</span>
                             </div>
                             <div className="flex-1 flex items-center gap-2">
                               <div className="w-12 h-12 relative">
                                 <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                                   <circle cx="18" cy="18" r="16" fill="none" stroke="#dc2626" strokeWidth="2"
                                     strokeDasharray="97.6, 100" strokeLinecap="round" />
                                 </svg>
                                 <div className="absolute inset-0 flex items-center justify-center">
                                   <span className="text-xs font-bold text-red-600">98%</span>
                                 </div>
                               </div>
                               <span className="text-xs text-gray-500">MAR</span>
                             </div>
                           </div>
                         </div>

                         {/* Rucks Won */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Rucks Won</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">61/64</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">40/41</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-scrummy-navy h-3 rounded-full" style={{ width: '60.4%' }}></div>
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-red-500 h-3 rounded-full" style={{ width: '39.6%' }}></div>
                             </div>
                           </div>
                         </div>

                         {/* Turnovers Conceded */}
                         <div className="pb-2">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Turnovers Conceded</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">40</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">44</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-scrummy-navy h-3 rounded-full" style={{ width: '47.6%' }}></div>
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-red-500 h-3 rounded-full" style={{ width: '52.4%' }}></div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>

                                 {/* Discipline & Kicking */}
                 <motion.div
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.8, duration: 0.6 }}
                 >
                   <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                     <CardHeader className="pb-3">
                       <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                         <AlertTriangle className="w-5 h-5" />
                         Discipline & Kicking
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="pt-0">
                       <div className="space-y-5">
                         {/* Penalties Conceded */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Penalties Conceded</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">18</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">32</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-scrummy-navy h-3 rounded-full" style={{ width: '36%' }}></div>
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-red-500 h-3 rounded-full" style={{ width: '64%' }}></div>
                             </div>
                           </div>
                         </div>

                         {/* Cards */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Cards</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">0</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">1</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-6">
                             <div className="flex-1 text-center">
                               <div className="text-2xl text-green-500 mb-1">✓</div>
                               <span className="text-xs text-gray-500">Clean</span>
                             </div>
                             <div className="flex-1 text-center">
                               <div className="w-6 h-8 bg-yellow-400 rounded-sm border border-yellow-500 mx-auto mb-1 shadow-sm"></div>
                               <span className="text-xs text-gray-500">Yellow Card</span>
                             </div>
                           </div>
                         </div>

                         {/* Total Kicks */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Total Kicks</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">54</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">40</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-scrummy-navy h-3 rounded-full" style={{ width: '57.4%' }}></div>
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-red-500 h-3 rounded-full" style={{ width: '42.6%' }}></div>
                             </div>
                           </div>
                         </div>

                         {/* Kicks Not Retained */}
                         <div className="border-b border-gray-100 pb-4">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Kicks Not Retained</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">20</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">13</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-scrummy-navy h-3 rounded-full" style={{ width: '60.6%' }}></div>
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex-1 bg-gray-200 rounded-full h-3">
                               <div className="bg-red-500 h-3 rounded-full" style={{ width: '39.4%' }}></div>
                             </div>
                           </div>
                         </div>

                         {/* Kicks Into Touch */}
                         <div className="pb-2">
                           <div className="flex items-center justify-between mb-3">
                             <span className="font-medium text-gray-700 text-sm">Kicks Into Touch</span>
                             <div className="flex items-center gap-4 text-sm">
                               <span className="font-bold text-scrummy-navy">6</span>
                               <span className="text-gray-400">vs</span>
                               <span className="font-bold text-red-600">7</span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="flex gap-1">
                               {[...Array(6)].map((_, i) => (
                                 <div key={i} className="w-2 h-6 bg-scrummy-navy rounded"></div>
                               ))}
                               <div className="w-2 h-6 bg-gray-200 rounded"></div>
                             </div>
                             <span className="text-gray-300 mx-2">vs</span>
                             <div className="flex gap-1">
                               {[...Array(7)].map((_, i) => (
                                 <div key={i} className="w-2 h-6 bg-red-500 rounded"></div>
                               ))}
                             </div>
                           </div>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>

              </div>
            </div>
          ) : matchId === '6' ? (
            // Comprehensive Zimbabwe vs Kenya Boxscore
            <div className="space-y-8">
              
              {/* Match Details */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <div className="text-center mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg inline-block">
                    <div className="text-sm text-gray-600 mb-2">Match Duration: 106:07 | Total Events: 1,109</div>
                  </div>
                </div>
              </motion.div>

              {/* Possession Bar */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                      <Clock className="w-5 h-5" />
                      Possession
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-scrummy-navy">🇿🇼 Zimbabwe</span>
                        <span className="font-bold text-red-600">Kenya 🇰🇪</span>
                      </div>
                      <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden flex">
                        <div 
                          className="h-full bg-scrummy-navy flex items-center justify-center text-white font-bold text-sm"
                          style={{ width: '49.2%' }}
                        >
                          49.2%
                        </div>
                        <div 
                          className="h-full bg-red-500 flex items-center justify-center text-white font-bold text-sm"
                          style={{ width: '50.8%' }}
                        >
                          50.8%
                        </div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Time: 16:31</span>
                        <span>Time: 17:03</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* Scoring */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <Target className="w-5 h-5" />
                        Scoring
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Tries */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Tries</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">3</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">3</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-3 h-3 rounded-full bg-scrummy-navy"></div>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">vs</span>
                            <div className="flex gap-1">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-3 h-3 rounded-full bg-red-500"></div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Conversions */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Conversions</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">1/6</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">1/6</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Zimbabwe</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-scrummy-navy h-2 rounded-full" style={{ width: '16.7%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">16.7%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Kenya</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '16.7%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">16.7%</span>
                            </div>
                          </div>
                        </div>

                        {/* Penalty Goals */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Penalty Goals</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">3/9</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">2/6</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Zimbabwe</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-scrummy-navy h-2 rounded-full" style={{ width: '33.3%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">33.3%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Kenya</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '33.3%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">33.3%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Attack */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <TrendingUp className="w-5 h-5" />
                        Attack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Passes */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Passes</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">83</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">89</span>
                            </div>
                          </div>
                        </div>

                        {/* Ball Carries */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Ball Carries</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">71</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">79</span>
                            </div>
                          </div>
                        </div>

                        {/* Linebreaks */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Linebreaks</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">3</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">5</span>
                            </div>
                          </div>
                        </div>

                        {/* Offloads */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Offloads</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">5</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Defense */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <Shield className="w-5 h-5" />
                        Defense
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Tackles Made */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Tackles Made</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">91</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">82</span>
                            </div>
                          </div>
                        </div>

                        {/* Tackles Missed */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Tackles Missed</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">14</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">28</span>
                            </div>
                          </div>
                        </div>

                        {/* Tackle Success % */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Tackle Success %</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">43.1%</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">37.1%</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Zimbabwe</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-scrummy-navy h-2 rounded-full" style={{ width: '43.1%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">43.1%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Kenya</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '37.1%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">37.1%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Set Piece */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <RotateCcw className="w-5 h-5" />
                        Set Piece
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Lineouts Won */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Lineouts Won</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">8/10</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">7/13</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(8)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-scrummy-navy" />
                                ))}
                                {[...Array(2)].map((_, i) => (
                                  <XCircle key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Zimbabwe (80.0%)</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(7)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-red-500" />
                                ))}
                                {[...Array(6)].map((_, i) => (
                                  <XCircle key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Kenya (53.8%)</span>
                            </div>
                          </div>
                        </div>

                        {/* Scrums Won */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Scrums Won</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">11/11</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">6/6</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(11)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-scrummy-navy" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Zimbabwe (100.0%)</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(6)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-red-500" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Kenya (100.0%)</span>
                            </div>
                          </div>
                        </div>

                        {/* Mauls Won */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Mauls Won</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">2/4</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">2/4</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(2)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-scrummy-navy" />
                                ))}
                                {[...Array(2)].map((_, i) => (
                                  <XCircle key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Zimbabwe (50.0%)</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(2)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-red-500" />
                                ))}
                                {[...Array(2)].map((_, i) => (
                                  <XCircle key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Kenya (50.0%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Breakdown */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <Circle className="w-5 h-5" />
                        Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Rucks Won */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Rucks Won</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">49/54</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">60/65</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Zimbabwe</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-scrummy-navy h-2 rounded-full" style={{ width: '90.7%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">90.7%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Kenya</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '92.3%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">92.3%</span>
                            </div>
                          </div>
                        </div>

                        {/* Turnovers Conceded */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Turnovers Conceded</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">36</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">43</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Discipline */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <AlertTriangle className="w-5 h-5" />
                        Discipline
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Penalties Conceded */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Penalties Conceded</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">24</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">22</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1 flex-wrap">
                                {[...Array(24)].map((_, i) => (
                                  <div key={i} className="w-2 h-6 bg-scrummy-navy rounded"></div>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Zimbabwe</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1 flex-wrap">
                                {[...Array(22)].map((_, i) => (
                                  <div key={i} className="w-2 h-6 bg-red-500 rounded"></div>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Kenya</span>
                            </div>
                          </div>
                        </div>

                        {/* Cards */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Cards</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">0</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">1</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                <span className="text-xs text-gray-500">No cards</span>
                              </div>
                              <span className="text-xs text-gray-500">Zimbabwe</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                <div className="w-4 h-6 bg-yellow-500 rounded"></div>
                              </div>
                              <span className="text-xs text-gray-500">Kenya</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Kicking */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <Play className="w-5 h-5" />
                        Kicking
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Total Kicks */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Total Kicks</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">37</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">24</span>
                            </div>
                          </div>
                        </div>

                        {/* Kicks Not Retained */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Kicks Not Retained</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">6</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">11</span>
                            </div>
                          </div>
                        </div>

                        {/* Kicks Into Touch */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Kicks Into Touch</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">5</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">1</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

              </div>
            </div>
          ) : matchId === '5' ? (
            // Comprehensive Algeria vs Namibia Boxscore
            <div className="space-y-8">
              
              {/* Match Details */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <div className="text-center mb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg inline-block">
                    <div className="text-sm text-gray-600 mb-2">Match Duration: 102:06 | Total Events: 1,111</div>
                  </div>
                </div>
              </motion.div>

              {/* Possession Bar */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                      <Clock className="w-5 h-5" />
                      Possession
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-scrummy-navy">🇩🇿 Algeria</span>
                        <span className="font-bold text-red-600">Namibia 🇳🇦</span>
                      </div>
                      <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden flex">
                        <div 
                          className="h-full bg-scrummy-navy flex items-center justify-center text-white font-bold text-sm"
                          style={{ width: '50.6%' }}
                        >
                          50.6%
                        </div>
                        <div 
                          className="h-full bg-red-500 flex items-center justify-center text-white font-bold text-sm"
                          style={{ width: '49.4%' }}
                        >
                          49.4%
                        </div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Time: 14:23</span>
                        <span>Time: 14:04</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* Scoring */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <Target className="w-5 h-5" />
                        Scoring
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Tries */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Tries</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">1</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">2</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-3 h-3 rounded-full bg-scrummy-navy"></div>
                            </div>
                            <span className="text-xs text-gray-500">vs</span>
                            <div className="flex gap-1">
                              {[...Array(2)].map((_, i) => (
                                <div key={i} className="w-3 h-3 rounded-full bg-red-500"></div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Conversions */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Conversions</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">1/2</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">1/4</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Algeria</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-scrummy-navy h-2 rounded-full" style={{ width: '50.0%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">50.0%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Namibia</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '25.0%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">25.0%</span>
                            </div>
                          </div>
                        </div>

                        {/* Penalty Goals */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Penalty Goals</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">0/0</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">3/6</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Algeria</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-scrummy-navy h-2 rounded-full" style={{ width: '0%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">0%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Namibia</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '50.0%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">50.0%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Attack */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <TrendingUp className="w-5 h-5" />
                        Attack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Passes */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Passes</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">103</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">76</span>
                            </div>
                          </div>
                        </div>

                        {/* Ball Carries */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Ball Carries</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">72</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">70</span>
                            </div>
                          </div>
                        </div>

                        {/* Linebreaks */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Linebreaks</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">4</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">3</span>
                            </div>
                          </div>
                        </div>

                        {/* Offloads */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Offloads</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">6</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">6</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Defense */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <Shield className="w-5 h-5" />
                        Defense
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Tackles Made */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Tackles Made</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">78</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">89</span>
                            </div>
                          </div>
                        </div>

                        {/* Tackles Missed */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Tackles Missed</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">18</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">23</span>
                            </div>
                          </div>
                        </div>

                        {/* Tackle Success % */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Tackle Success %</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">40.4%</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">39.7%</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Algeria</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-scrummy-navy h-2 rounded-full" style={{ width: '40.4%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">40.4%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Namibia</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '39.7%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">39.7%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Set Piece */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <RotateCcw className="w-5 h-5" />
                        Set Piece
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Lineouts Won */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Lineouts Won</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">12/14</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">12/16</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(12)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-scrummy-navy" />
                                ))}
                                {[...Array(2)].map((_, i) => (
                                  <XCircle key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Algeria (85.7%)</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(12)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-red-500" />
                                ))}
                                {[...Array(4)].map((_, i) => (
                                  <XCircle key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Namibia (75.0%)</span>
                            </div>
                          </div>
                        </div>

                        {/* Scrums Won */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Scrums Won</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">6/6</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">7/9</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(6)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-scrummy-navy" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Algeria (100.0%)</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(7)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-red-500" />
                                ))}
                                {[...Array(2)].map((_, i) => (
                                  <XCircle key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Namibia (77.8%)</span>
                            </div>
                          </div>
                        </div>

                        {/* Mauls Won */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Mauls Won</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">3/5</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">5/5</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(3)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-scrummy-navy" />
                                ))}
                                {[...Array(2)].map((_, i) => (
                                  <XCircle key={i} className="w-3 h-3 text-gray-300" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Algeria (60.0%)</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <CheckCircle key={i} className="w-3 h-3 text-red-500" />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Namibia (100.0%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Breakdown */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <Circle className="w-5 h-5" />
                        Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Rucks Won */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Rucks Won</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">43/47</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">49/51</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Algeria</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-scrummy-navy h-2 rounded-full" style={{ width: '91.5%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">91.5%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-16">Namibia</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '96.1%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">96.1%</span>
                            </div>
                          </div>
                        </div>

                        {/* Turnovers Conceded */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Turnovers Conceded</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">42</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">32</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Discipline */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <AlertTriangle className="w-5 h-5" />
                        Discipline
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Penalties Conceded */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Penalties Conceded</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">24</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">22</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1 flex-wrap">
                                {[...Array(24)].map((_, i) => (
                                  <div key={i} className="w-2 h-6 bg-scrummy-navy rounded"></div>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Algeria</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1 flex-wrap">
                                {[...Array(22)].map((_, i) => (
                                  <div key={i} className="w-2 h-6 bg-red-500 rounded"></div>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">Namibia</span>
                            </div>
                          </div>
                        </div>

                        {/* Cards */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Cards</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">0</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">1</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                <span className="text-xs text-gray-500">No cards</span>
                              </div>
                              <span className="text-xs text-gray-500">Algeria</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1 mb-1">
                                <div className="w-4 h-6 bg-yellow-500 rounded"></div>
                              </div>
                              <span className="text-xs text-gray-500">Namibia</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Kicking */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                        <Play className="w-5 h-5" />
                        Kicking
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Total Kicks */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Total Kicks</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">38</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">54</span>
                            </div>
                          </div>
                        </div>

                        {/* Kicks Not Retained */}
                        <div className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Kicks Not Retained</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">13</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">14</span>
                            </div>
                          </div>
                        </div>

                        {/* Kicks Into Touch */}
                        <div className="pb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700 text-sm">Kicks Into Touch</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-bold text-scrummy-navy">6</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-bold text-red-600">8</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

              </div>
            </div>
          ) : (
            // Placeholder for other matches
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Team Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Statistics Coming Soon</p>
                    <p className="text-sm">Match statistics will be available after the game</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Match Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Events Coming Soon</p>
                    <p className="text-sm">Match events will appear here during the game</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* App Download CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Download className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Experience More!</h3>
                </div>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Download the SCRUMMY app for live match updates, real-time scores, detailed player stats, and exclusive rugby content.
                </p>
                <Button 
                  size="lg" 
                  className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold px-8 py-3 text-lg"
                >
                  📱 Download SCRUMMY
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AfricaCupBoxScore; 