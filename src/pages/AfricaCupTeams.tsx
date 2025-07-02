import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, Users, Star } from 'lucide-react';

// Team data structure
const teams = [
  {
    id: 'zimbabwe',
    name: 'Zimbabwe Sables',
    flag: '🇿🇼',
    color: 'from-green-500 to-yellow-500',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-500/30',
    country: 'Zimbabwe',
    roster: [
      { name: 'Ryan Chiang', position: 'Hooker', age: 28, info: 'Experienced hooker with solid lineout throwing' },
      { name: 'Simba Mandioma', position: 'Hooker', age: 26, info: 'Mobile hooker with strong scrummaging' },
      { name: 'Liam Larkan', position: 'Hooker', age: 24, info: 'Young talent with great potential' },
      { name: 'Victor Mupunga', position: 'Prop', age: 29, info: 'Powerful front row forward' },
      { name: 'Tyran Fagan', position: 'Prop', age: 27, info: 'Solid scrummaging specialist' },
      { name: 'Zvikomborero Chimoto', position: 'Prop', age: 25, info: 'Athletic prop with mobility' },
      { name: 'Cleopas Kundiona', position: 'Prop', age: 30, info: 'Veteran front row leader' },
      { name: 'Brian Makamure', position: 'Prop', age: 28, info: 'Strong set piece specialist' },
      { name: 'Bornwell Gwinji', position: 'Prop', age: 26, info: 'Dynamic prop forward' },
      { name: 'Kudakwashe Nyakufaringwa', position: '2nd Row', age: 27, info: 'Lineout specialist and leader' },
      { name: 'Simba Siraha', position: '2nd Row', age: 25, info: 'Athletic lock with great handling' },
      { name: 'Tadiwa Gwashu', position: '2nd Row', age: 29, info: 'Experienced engine room player' },
      { name: 'Brian Nyaude', position: '2nd Row', age: 24, info: 'Rising star in the pack' },
      { name: 'Aden Burnett', position: 'Back Row', age: 28, info: 'Versatile loose forward' },
      { name: 'Dylan Utete', position: 'Back Row', age: 26, info: 'Mobile back row with pace' },
      { name: 'Jason Fraser', position: 'Back Row', age: 30, info: 'Captain and experienced campaigner' },
      { name: 'Godfrey Muzanargwo', position: 'Back Row', age: 25, info: 'Physical presence in the pack' },
      { name: 'Tinotenda Mavesere', position: 'Back Row', age: 27, info: 'Dynamic ball carrier' },
      { name: 'Hilton Mudariki', position: 'Half Back', age: 24, info: 'Quick service from the base' },
      { name: 'Keegan Joubert', position: 'Half Back', age: 26, info: 'Experienced scrum-half' },
      { name: 'Brandon Mudzekenyedzi', position: 'Centre', age: 25, info: 'Powerful center with pace' },
      { name: 'Kudzai Mashawi', position: 'Centre', age: 23, info: 'Creative playmaker' },
      { name: 'Trevor Gurwe', position: 'Outside Back', age: 27, info: 'Pacy winger with finishing ability' }
    ]
  },
  {
    id: 'algeria',
    name: 'Algeria',
    flag: '🇩🇿',
    color: 'from-green-600 to-red-500',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-500/30',
    country: 'Algeria',
    roster: [
      { name: 'Yacine Bensaha', position: 'Hooker', age: 28, info: 'National team captain and leader' },
      { name: 'Karim Boudjemaa', position: 'Prop', age: 30, info: 'Experienced front row anchor' },
      { name: 'Mehdi Narsis', position: 'Prop', age: 26, info: 'Strong scrummaging prop' },
      { name: 'Ahmed Tafat', position: '2nd Row', age: 27, info: 'Lineout specialist' },
      { name: 'Riad Adjali', position: '2nd Row', age: 29, info: 'Athletic lock forward' },
      { name: 'Sofiane Guitouni', position: 'Back Row', age: 25, info: 'Mobile loose forward' },
      { name: 'Farid Sid-Ahmed', position: 'Back Row', age: 28, info: 'Physical ball carrier' },
      { name: 'Yasser Boudaoud', position: 'Half Back', age: 24, info: 'Quick-thinking scrum-half' },
      { name: 'Nassim Lalaoui', position: 'Fly Half', age: 26, info: 'Creative playmaker' },
      { name: 'Bilal Bouguetof', position: 'Centre', age: 25, info: 'Strong defensive center' },
      { name: 'Adel Mechergui', position: 'Centre', age: 27, info: 'Experienced midfielder' },
      { name: 'Rami Bouchar', position: 'Winger', age: 23, info: 'Pacy finisher on the wing' },
      { name: 'Walid Adjali', position: 'Fullback', age: 28, info: 'Reliable last line of defense' }
    ]
  },
  {
    id: 'namibia',
    name: 'Namibia',
    flag: '🇳🇦',
    color: 'from-blue-500 to-red-500',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-500/30',
    country: 'Namibia',
    roster: [
      { name: 'Torsten van Jaarsveld', position: 'Hooker', age: 29, info: 'Experienced hooker with leadership qualities' },
      { name: 'Desiderius Sethie', position: 'Prop', age: 31, info: 'Veteran prop with World Cup experience' },
      { name: 'Aranos Coetzee', position: 'Prop', age: 27, info: 'Mobile front row player' },
      { name: 'Max Katjijeko', position: '2nd Row', age: 26, info: 'Athletic lineout option' },
      { name: 'Adriaan Booysen', position: '2nd Row', age: 28, info: 'Physical presence in the pack' },
      { name: 'Wihan Liebenberg', position: 'Back Row', age: 25, info: 'Dynamic loose forward' },
      { name: 'Prince Gaoseb', position: 'Back Row', age: 30, info: 'Experienced campaigner' },
      { name: 'Damian Stevens', position: 'Half Back', age: 24, info: 'Quick service provider' },
      { name: 'Cliven Loubser', position: 'Fly Half', age: 27, info: 'Goal-kicking fly-half' },
      { name: 'JC Greyling', position: 'Centre', age: 26, info: 'Powerful ball-carrying center' },
      { name: 'Danco Burger', position: 'Centre', age: 25, info: 'Versatile back' },
      { name: 'Gerswin Mouton', position: 'Winger', age: 23, info: 'Speedster on the flank' },
      { name: 'Helarius Kisting', position: 'Fullback', age: 28, info: 'Safe under the high ball' }
    ]
  },
  {
    id: 'kenya',
    name: 'Kenya Simbas',
    flag: '🇰🇪',
    color: 'from-black to-red-500',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-500/30',
    country: 'Kenya',
    roster: [
      { name: 'Teddy Akala', position: 'Hooker', age: 27, info: 'Solid lineout thrower' },
      { name: 'Eugene Sifuna', position: 'Hooker', age: 25, info: 'Mobile hooker with pace' },
      { name: 'Ephraim Oduor', position: 'Prop', age: 29, info: 'Experienced front row leader' },
      { name: 'Edward Mwaura', position: 'Prop', age: 28, info: 'Strong scrummaging specialist' },
      { name: 'Wilhite Mususi', position: 'Prop', age: 26, info: 'Athletic prop forward' },
      { name: 'Vincent Mwikhali', position: 'Prop', age: 30, info: 'Veteran with international experience' },
      { name: 'Hibrahim Ayoo', position: '2nd Row', age: 25, info: 'Lineout specialist' },
      { name: 'Thomas Okeyo', position: '2nd Row', age: 27, info: 'Physical presence in the engine room' },
      { name: 'Andycole Omollo', position: '2nd Row', age: 24, info: 'Rising talent in the pack' },
      { name: 'Emmanuel Silungi', position: '2nd Row', age: 26, info: 'Athletic lock with good hands' },
      { name: 'George Nyambua', position: 'Back Row', age: 28, info: 'Captain and inspirational leader' },
      { name: 'Patrick Sabatia', position: 'Back Row', age: 29, info: 'Experienced loose forward' },
      { name: 'David Bunduki', position: 'Back Row', age: 25, info: 'Mobile back row with pace' },
      { name: 'Obat Kuke', position: 'Back Row', age: 27, info: 'Physical ball carrier' },
      { name: 'Bethuel Anami', position: 'Back Row', age: 24, info: 'Dynamic loose forward' },
      { name: 'Elkeans Musonye', position: 'Back Row', age: 26, info: 'Versatile back row option' },
      { name: 'Samuel Asati', position: 'Half Back', age: 25, info: 'Quick-thinking scrum-half' },
      { name: 'Brian Tanga', position: 'Half Back', age: 27, info: 'Experienced half-back' },
      { name: 'Barry Young', position: 'Fly Half', age: 24, info: 'Creative playmaker' },
      { name: 'Brian Wahinya', position: 'Fly Half', age: 26, info: 'Goal-kicking specialist' },
      { name: 'Griffin Chao', position: 'Winger', age: 23, info: 'Pacy finisher' },
      { name: 'Timothy Omela', position: 'Winger', age: 25, info: 'Powerful wing with finishing ability' },
      { name: 'Walter Okoth', position: 'Centre', age: 28, info: 'Experienced center' },
      { name: 'Samuel Ovwamu', position: 'Centre', age: 26, info: 'Strong ball-carrying center' },
      { name: 'Bryceson Adaka', position: 'Centre', age: 24, info: 'Creative midfielder' },
      { name: 'John Okoth', position: 'Centre', age: 27, info: 'Versatile back' },
      { name: 'Jone Kubu', position: 'Fullback', age: 25, info: 'Safe under pressure' },
      { name: 'Derick Ashiundu', position: 'Fullback', age: 29, info: 'Experienced last line of defense' }
    ]
  },
  {
    id: 'uganda',
    name: 'Uganda',
    flag: '🇺🇬',
    color: 'from-black to-yellow-500',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-500/30',
    country: 'Uganda',
    roster: [
      { name: 'Robert Aziku', position: 'Hooker', age: 28, info: 'Experienced hooker and lineout specialist' },
      { name: 'Desire Ayera', position: 'Prop', age: 30, info: 'Veteran front row with leadership qualities' },
      { name: 'Joseph Aredo', position: 'Prop', age: 26, info: 'Strong scrummaging prop' },
      { name: 'Solomon Okia', position: '2nd Row', age: 27, info: 'Athletic lock forward' },
      { name: 'Charles Uhuru', position: '2nd Row', age: 25, info: 'Physical presence in the pack' },
      { name: 'Saul Kivumbi', position: 'Back Row', age: 29, info: 'Captain and experienced leader' },
      { name: 'Timothy Kisiga', position: 'Back Row', age: 24, info: 'Mobile loose forward' },
      { name: 'Philip Wokorach', position: 'Half Back', age: 31, info: 'Veteran scrum-half with pace' },
      { name: 'Ivan Otema', position: 'Fly Half', age: 26, info: 'Creative playmaker and goal-kicker' },
      { name: 'Aaron Ofoywroth', position: 'Centre', age: 25, info: 'Powerful center with good hands' },
      { name: 'Adrian Kasito', position: 'Centre', age: 27, info: 'Experienced midfielder' },
      { name: 'Byron Oketayot', position: 'Centre', age: 28, info: 'Strong ball-carrying center' },
      { name: 'Michael Wokorach', position: 'Winger', age: 29, info: 'Pacy winger with finishing ability' }
    ]
  },
  {
    id: 'senegal',
    name: 'Senegal',
    flag: '🇸🇳',
    color: 'from-green-500 to-yellow-500',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-500/30',
    country: 'Senegal',
    roster: [
      { name: 'Mamadou Diop', position: 'Hooker', age: 27, info: 'Solid lineout thrower' },
      { name: 'Ibrahima Fall', position: 'Prop', age: 29, info: 'Experienced front row anchor' },
      { name: 'Ousmane Sy', position: 'Prop', age: 26, info: 'Strong scrummaging specialist' },
      { name: 'Cheikh Diallo', position: '2nd Row', age: 28, info: 'Lineout specialist and leader' },
      { name: 'Moussa Ba', position: '2nd Row', age: 25, info: 'Athletic lock with mobility' },
      { name: 'Alioune Ndiaye', position: 'Back Row', age: 30, info: 'Captain and inspirational leader' },
      { name: 'Pape Niang', position: 'Back Row', age: 24, info: 'Dynamic loose forward' },
      { name: 'Abdou Seck', position: 'Half Back', age: 26, info: 'Quick service provider' },
      { name: 'Modou Faye', position: 'Fly Half', age: 25, info: 'Creative playmaker' },
      { name: 'Serigne Dia', position: 'Centre', age: 27, info: 'Powerful ball-carrying center' },
      { name: 'Fallou Samb', position: 'Centre', age: 24, info: 'Versatile back with pace' },
      { name: 'Landing Badji', position: 'Winger', age: 23, info: 'Speedster with finishing ability' },
      { name: 'Omar Kane', position: 'Fullback', age: 28, info: 'Safe under the high ball' }
    ]
  },
  {
    id: 'cotedivoire',
    name: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    color: 'from-orange-500 to-green-500',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-500/30',
    country: 'Côte d\'Ivoire',
    roster: [
      { name: 'Koffi Kouame', position: 'Hooker', age: 28, info: 'Experienced hooker with solid lineout skills' },
      { name: 'Didier Yao', position: 'Prop', age: 30, info: 'Veteran prop with international experience' },
      { name: 'Eric Bamba', position: 'Prop', age: 26, info: 'Strong scrummaging specialist' },
      { name: 'Seydou Doumbia', position: '2nd Row', age: 27, info: 'Athletic lineout option' },
      { name: 'Brahima Ouattara', position: '2nd Row', age: 25, info: 'Physical presence in the pack' },
      { name: 'Adama Coulibaly', position: 'Back Row', age: 29, info: 'Captain and experienced leader' },
      { name: 'Yannick Tape', position: 'Back Row', age: 24, info: 'Mobile loose forward' },
      { name: 'Maxime Dago', position: 'Half Back', age: 26, info: 'Quick-thinking scrum-half' },
      { name: 'Jean-Baptiste Anoh', position: 'Fly Half', age: 25, info: 'Creative playmaker and goal-kicker' },
      { name: 'Franck Kone', position: 'Centre', age: 27, info: 'Powerful center with good hands' },
      { name: 'Christian Vei', position: 'Centre', age: 24, info: 'Versatile midfielder' },
      { name: 'Serge Bile', position: 'Winger', age: 23, info: 'Pacy finisher on the wing' },
      { name: 'Arnaud Ehui', position: 'Fullback', age: 28, info: 'Reliable last line of defense' }
    ]
  },
  {
    id: 'morocco',
    name: 'Morocco',
    flag: '🇲🇦',
    color: 'from-red-600 to-green-500',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-500/30',
    country: 'Morocco',
    roster: [
      { name: 'Youssef Fagoo', position: 'Hooker', age: 27, info: 'Solid lineout thrower and team player' },
      { name: 'Abderrahim Zhiri', position: 'Prop', age: 29, info: 'Experienced front row anchor' },
      { name: 'Hamza Kaddouri', position: 'Prop', age: 26, info: 'Strong scrummaging prop' },
      { name: 'Yassine Mrabet', position: '2nd Row', age: 28, info: 'Lineout specialist with leadership' },
      { name: 'Omar Mouline', position: '2nd Row', age: 25, info: 'Athletic lock with mobility' },
      { name: 'Mehdi Acharki', position: 'Back Row', age: 30, info: 'Captain and inspirational leader' },
      { name: 'Anas Seghrouchni', position: 'Back Row', age: 24, info: 'Dynamic ball carrier' },
      { name: 'Reda Dkhissi', position: 'Half Back', age: 26, info: 'Quick service from the base' },
      { name: 'Youssef Alami', position: 'Fly Half', age: 25, info: 'Creative playmaker' },
      { name: 'Zakaria Chater', position: 'Centre', age: 27, info: 'Powerful center with pace' },
      { name: 'Tarik Bouhlal', position: 'Centre', age: 24, info: 'Versatile back with good skills' },
      { name: 'Said Aarab', position: 'Winger', age: 23, info: 'Speedster with finishing ability' },
      { name: 'Issam Hamdaoui', position: 'Fullback', age: 28, info: 'Safe under pressure' }
    ]
  }
];

const AfricaCupTeams: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation */}
      <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to SCRUMMY</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/africa-cup" className="text-gray-300 hover:text-white transition-colors">
              Tournament Hub
            </Link>
            <Link to="/africa-cup/teams" className="text-orange-400 font-semibold">
              Teams & Rosters
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-r from-orange-500/10 to-yellow-500/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-black">
              <span className="text-orange-400">TEAMS & </span>
              <span className="text-white">ROSTERS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the warriors representing their nations in Rugby Africa Cup 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Selector */}
      <section className="py-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {teams.map((team, index) => (
              <motion.button
                key={team.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedTeam(team)}
                className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 min-w-fit ${
                  selectedTeam.id === team.id
                    ? `${team.borderColor} ${team.bgColor} scale-105`
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <span className="text-3xl">{team.flag}</span>
                <div className="text-left">
                  <p className="font-bold text-white">{team.country}</p>
                  <p className="text-sm text-gray-400">{team.roster.length} players</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Team Info */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            key={selectedTeam.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`${selectedTeam.bgColor} border ${selectedTeam.borderColor} rounded-2xl p-8 mb-8`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-6xl">{selectedTeam.flag}</span>
                <div>
                  <h2 className="text-3xl font-black text-white">{selectedTeam.name}</h2>
                  <p className="text-gray-300">{selectedTeam.roster.length} squad members</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
              >
                <Star className="w-5 h-5 inline mr-2" />
                Vote in App
              </motion.button>
            </div>
          </motion.div>

          {/* Player Roster Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedTeam.roster.map((player, index) => (
              <motion.div
                key={`${selectedTeam.id}-${player.name}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 group"
              >
                {/* Player Avatar Placeholder */}
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>

                {/* Player Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">{player.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-400 font-semibold">{player.position}</span>
                    <span className="text-gray-400 text-sm">Age {player.age}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{player.info}</p>
                </div>

                {/* Vote Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-400 font-semibold py-2 px-4 rounded-lg hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-300"
                >
                  Vote Top Dawg
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* App Download CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-3">Cast Your Vote!</h3>
              <p className="text-gray-300 mb-6">
                Download the SCRUMMY app to vote for {selectedTeam.name} and your favorite players. 
                Join thousands of rugby fans making their voices heard!
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                📱 Download SCRUMMY App Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AfricaCupTeams; 