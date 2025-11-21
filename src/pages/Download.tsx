import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Vote, Star } from 'lucide-react';
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

/* ---------------- PRIMITIVES (FROM HOMEPAGE) ---------------- */
const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const DownloadPage: React.FC = () => {
  const features = [
    {
      icon: <Vote className="w-6 h-6" />,
      title: "Vote & Win",
      description: "Predict match outcomes and compete with fans"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Live Scores",
      description: "Real-time updates and detailed statistics"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "Join 50K+ rugby fans worldwide"
    }
  ];

  return (
    <div className={`min-h-screen ${appGradient}`} style={{ color: tokens.text }}>
      <Nav />

      {/* HERO SECTION - CENTERED MINIMAL */}
      <section className="relative text-white pt-16 pb-16 md:pt-24 md:pb-24 min-h-[80vh] flex items-center">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Headline */}
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                Download{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9C94E] to-[#E3B43F]">
                  SCRUMMY
                </span>
              </h1>

              {/* Value Prop */}
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto font-medium">
                The ultimate fantasy rugby app for predictions, live scores & community
              </p>

              {/* Social Proof - Stars */}
              <div className="flex items-center justify-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-[#F9C94E] fill-current" />
                ))}
              </div>
              <p className="text-white/60 text-sm mb-10">
                <span className="font-semibold text-white">4.8/5</span> rating • 100+ downloads
              </p>

              {/* STORE BADGES - LARGE & PROMINENT */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => window.open('https://apps.apple.com/us/app/scrummy-fantasy-rugby/id6744964910', '_blank')}
                >
                  <img 
                    src="/assets/Store badges/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" 
                    alt="Download on the App Store"
                    className="h-16 w-auto"
                  />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scrummy&pcampaignid=web_share', '_blank')}
                >
                  <img 
                    src="/assets/Store badges/GetItOnGooglePlay_Badge_Web_color_English.png" 
                    alt="Get it on Google Play"
                    className="h-16 w-auto"
                  />
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Live Now</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F9C94E] rounded-full" />
                  <span>Free to Use</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>No Ads</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FEATURES SECTION - BRIEF */}
      <section className="py-14 md:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Everything You Need
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Fantasy leagues, live stats, and a global community—all in one app
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-6 rounded-3xl border border-white/10 ${cardGrad} text-center`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F9C94E]/10 flex items-center justify-center mx-auto mb-3 text-[#F9C94E]">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECONDARY CTA */}
      <section className="py-14 md:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Join?
            </h3>
            <p className="text-white/70 mb-8">
              Download SCRUMMY now and start predicting, competing, and winning
            </p>
            
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

export default DownloadPage;
