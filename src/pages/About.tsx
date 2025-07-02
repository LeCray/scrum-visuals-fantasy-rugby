import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "../components/Logo";
import { ArrowLeft, Users, Trophy, Smartphone, BarChart3, Globe, Target } from "lucide-react";

const About: React.FC = () => {
  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Fantasy Rugby App",
      description: "Create your dream rugby team with real players from school boy rugby leagues across Zimbabwe and South Africa."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Live Statistics",
      description: "Real-time match data, player stats, and comprehensive analytics to help you make informed fantasy decisions."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Multiple Competitions",
      description: "Track fixtures and results from CBZ Schools Rugby, SA Schools Rugby, Derby Day, and international matches."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Regional Coverage",
      description: "Comprehensive coverage of school boy rugby across Zimbabwe and South Africa with 50+ school teams."
    }
  ];

  const stats = [
    { number: "50+", label: "Schools Tracked" },
    { number: "4", label: "Major Competitions" },
    { number: "100+", label: "Live Fixtures" },
    { number: "2", label: "Countries Covered" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-scrummy-navy hover:text-scrummy-blue transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
          <Logo className="h-10" />
          <div className="w-24" /> {/* Spacer for balance */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-scrummy-navy/10 to-scrummy-blue/10" />
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-orbitron text-scrummy-navy leading-tight">
              About <span className="text-scrummy-goldYellow">SCRUMMY</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're revolutionizing fantasy rugby by bringing real-time school boy rugby data 
              to your fingertips, connecting fans across Zimbabwe and South Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-scrummy-navy/20 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-8 h-8 text-scrummy-goldYellow" />
                    <h2 className="text-3xl font-bold text-scrummy-navy">Our Mission</h2>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    SCRUMMY was born from a passion for school boy rugby and the desire to create 
                    the ultimate fantasy rugby experience. We believe that every try, every tackle, 
                    and every moment of brilliance on the field deserves to be celebrated and 
                    tracked with precision.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our platform connects rugby fans, schools, and players by providing 
                    comprehensive statistics, live updates, and the most engaging fantasy 
                    rugby experience in the region.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <Card className="bg-gradient-to-r from-scrummy-goldYellow/20 to-scrummy-gold/20 border-scrummy-goldYellow/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-scrummy-navy" />
                    <div>
                      <h3 className="font-bold text-scrummy-navy">For Rugby Fans</h3>
                      <p className="text-gray-600">Create your fantasy team and compete with friends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-scrummy-navy/20 to-scrummy-blue/20 border-scrummy-navy/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-scrummy-goldYellow" />
                    <div>
                      <h3 className="font-bold text-scrummy-navy">For Schools</h3>
                      <p className="text-gray-600">Showcase your team and track performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-green-700" />
                    <div>
                      <h3 className="font-bold text-scrummy-navy">For the Community</h3>
                      <p className="text-gray-600">Building rugby connections across borders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-scrummy-navy mb-4">What Makes SCRUMMY Special</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another fantasy sports app - we're the first platform dedicated 
              specifically to school boy rugby with comprehensive regional coverage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="text-scrummy-goldYellow mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-scrummy-navy mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-scrummy-goldYellow mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-scrummy-navy font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-scrummy-navy to-scrummy-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Join the Scrum?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Be part of the rugby revolution. Join our beta program and help shape 
              the future of fantasy rugby.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-semibold">
                Join Beta Program
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-scrummy-navy">
                <Link to="/fixtures">View Live Fixtures</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 