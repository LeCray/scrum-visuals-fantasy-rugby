import React from "react";
import { motion } from "framer-motion";
import { Users, Trophy, BarChart3, Heart, Zap, Shield, Info } from "lucide-react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

/* ---------------- THEME TOKENS (FROM HOMEPAGE) ---------------- */
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
const glow = "shadow-[0_0_20px_rgba(45,108,255,.1)]";

/* ---------------- PRIMITIVES (FROM HOMEPAGE) ---------------- */
const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const About: React.FC = () => {
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
      icon: <Users className="w-6 h-6" />,
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
    <div className={`min-h-screen ${appGradient}`} style={{ color: tokens.text }}>
      <Nav />

      {/* HERO SECTION */}
      <section className="relative text-white pt-20 pb-20 md:pt-28 md:pb-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2D6CFF] to-[#7A5CFF] flex items-center justify-center">
                <Info className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9C94E] to-[#E3B43F]">
                SCRUMMY
              </span>
            </h1>
            <p className="mt-4 md:mt-6 text-white/70 max-w-2xl mx-auto text-lg md:text-xl">
              The world's most comprehensive fantasy rugby platform. Predict. Play. Dominate.
            </p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#F9C94E] rounded-full" />
                <span className="text-white/70">50K+ Active Players</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#F9C94E] rounded-full" />
                <span className="text-white/70">15+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#F9C94E] rounded-full" />
                <span className="text-white/70">Real-Time Updates</span>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* MISSION SECTION */}
      <section className="py-14 md:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-[#F9C94E]">Mission</span>
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg">
              To revolutionize fantasy rugby by creating the most comprehensive, engaging, 
              and community-driven platform that celebrates every aspect of the beautiful game.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-6 rounded-3xl border border-white/10 ${cardGrad} ${glow} hover:translate-y-[-2px] transition`}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2D6CFF] to-[#7A5CFF] flex items-center justify-center mb-4 text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-14 md:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              What Makes Us <span className="text-[#F9C94E]">Different</span>
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg">
              We're not just another fantasy app. We're the most comprehensive rugby platform, 
              built by passionate fans who understand what the community truly needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-6 rounded-3xl border border-white/10 ${cardGrad} hover:translate-y-[-2px] transition text-center`}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F9C94E]/10 flex items-center justify-center mx-auto mb-4 text-[#F9C94E]">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* STATS SECTION */}
      <section className="py-14 md:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Platform Statistics
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Current platform metrics and coverage
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-6 rounded-3xl border border-white/10 ${cardGrad} text-center`}
              >
                <div className="text-3xl md:text-4xl font-extrabold text-[#F9C94E] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA SECTION */}
      <section className="py-14 md:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`p-8 md:p-12 rounded-3xl border border-white/10 ${cardGrad} ${glow} text-center`}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Download SCRUMMY
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Available on iOS and Android. Start your fantasy rugby journey today.
            </p>
            
            {/* Store Badges */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => window.open('https://apps.apple.com/us/app/scrummy-fantasy-rugby/id6744964910', '_blank')}
              >
                <img 
                  src="/assets/Store badges/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" 
                  alt="Download on the App Store"
                  className="h-14 w-auto"
                />
              </button>
              
              <button 
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scrummy&pcampaignid=web_share', '_blank')}
              >
                <img 
                  src="/assets/Store badges/GetItOnGooglePlay_Badge_Web_color_English.png" 
                  alt="Get it on Google Play"
                  className="h-14 w-auto"
                />
              </button>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default About;
