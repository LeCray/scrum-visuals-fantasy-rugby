import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "../components/Logo";
import { ArrowLeft, Users, Trophy, Smartphone, BarChart3, Globe, Target, Menu, X, Heart, Zap, Shield } from "lucide-react";

const About: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Fantasy",
      description: "Create your ultimate rugby team with live player stats, instant scoring updates, and dynamic league rankings."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Deep dive into player performance with comprehensive statistics, trend analysis, and predictive insights."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Global Competitions",
      description: "From school rugby to international tournaments - track every match, every player, every moment of glory."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Join thousands of rugby fans worldwide in leagues, predictions, and celebrating the sport we love."
    }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion for Rugby",
      description: "Built by rugby fans, for rugby fans. Every feature is crafted with genuine love for the game."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Fair Play First",
      description: "Transparency, integrity, and respect are at the heart of everything we do."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Community",
      description: "Connecting rugby enthusiasts across continents, cultures, and competitions."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "15+", label: "Countries" },
    { number: "500+", label: "Teams Tracked" },
    { number: "24/7", label: "Live Updates" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-scrummy-navy via-scrummy-blue to-scrummy-navy">
      {/* Modern Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-scrummy-goldYellow/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-scrummy-navy hover:text-scrummy-goldYellow transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold">Back to Home</span>
              </Link>
            </div>
            
            <div className="text-lg font-bold text-scrummy-navy">About</div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-scrummy-navy hover:text-scrummy-goldYellow transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/fixtures" className="text-scrummy-navy hover:text-scrummy-goldYellow transition-colors font-medium">
                Fixtures
              </Link>
              <Link to="/download" className="text-scrummy-navy hover:text-scrummy-goldYellow transition-colors font-medium">
                Download
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-scrummy-goldYellow/10 to-scrummy-gold/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-scrummy-goldYellow/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-scrummy-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-orbitron text-white leading-tight">
              About <span className="text-scrummy-goldYellow">SCRUMMY</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              The world's most comprehensive fantasy rugby platform. 
              <span className="text-scrummy-goldYellow font-semibold"> Predict. Play. Dominate.</span>
            </p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 text-white/80"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-scrummy-goldYellow rounded-full" />
                <span>50K+ Active Players</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-scrummy-goldYellow rounded-full" />
                <span>15+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-scrummy-goldYellow rounded-full" />
                <span>Real-Time Updates</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-orbitron text-scrummy-navy mb-6">
                Our <span className="text-scrummy-goldYellow">Mission</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                To revolutionize fantasy rugby by creating the most comprehensive, engaging, 
                and community-driven platform that celebrates every aspect of the beautiful game.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full bg-gradient-to-br from-white to-gray-50/50 border-scrummy-goldYellow/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-scrummy-goldYellow to-scrummy-gold rounded-full flex items-center justify-center mx-auto mb-6 text-scrummy-navy shadow-md">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-scrummy-navy mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-orbitron text-scrummy-navy mb-6">
              What Makes Us <span className="text-scrummy-goldYellow">Different</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We're not just another fantasy app. We're the most comprehensive rugby platform, 
              built by passionate fans who understand what the community truly needs.
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
                <Card className="h-full bg-white border-scrummy-goldYellow/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-scrummy-goldYellow/10 to-scrummy-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-scrummy-goldYellow group-hover:from-scrummy-goldYellow group-hover:to-scrummy-gold group-hover:text-scrummy-navy transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-scrummy-navy mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navy mb-4">
              Platform Statistics
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Current platform metrics and coverage
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-scrummy-navy mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Store Badges */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navy">
              Download SCRUMMY
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Available on iOS and Android. Start your fantasy rugby journey today.
            </p>
            
            {/* Store Badges */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              {/* Apple App Store - Official Badge */}
              <button 
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => window.open('https://apps.apple.com/us/app/scrummy-fantasy-rugby/id6744964910', '_blank')}
              >
                <img 
                  src="/assets/Store badges/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" 
                  alt="Download on the App Store"
                  className="h-12 w-auto"
                />
              </button>
              
              {/* Google Play Store - Official Badge */}
              <button 
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scrummy&pcampaignid=web_share', '_blank')}
              >
                <img 
                  src="/assets/Store badges/GetItOnGooglePlay_Badge_Web_color_English.png" 
                  alt="Get it on Google Play"
                  className="h-12 w-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 