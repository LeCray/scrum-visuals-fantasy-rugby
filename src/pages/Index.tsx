import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  ChevronRight, 
  Smartphone, 
  Users, 
  CalendarDays,
  Filter,
  SlidersHorizontal,
  Menu,
  X
} from "lucide-react";

/* ---------------- THEME TOKENS ---------------- */
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
const cardGrad = "bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]";
const glow = "shadow-[0_0_40px_rgba(45,108,255,.35)]";

/* ---------------- PRIMITIVES ---------------- */
const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const CustomButton = ({
  children,
  variant = "primary",
  icon: Icon,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline" | "gold";
  icon?: any;
  onClick?: () => void;
}) => {
  const base = "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200";
  const variants: Record<string, string> = {
    primary: "text-white bg-gradient-to-r from-[#2D6CFF] via-[#7A5CFF] to-[#2D6CFF] hover:brightness-110",
    gold: "text-black bg-[linear-gradient(180deg,#F9C94E,#E3B43F)] hover:brightness-105",
    ghost: "text-white/80 hover:text-white hover:bg-white/5",
    outline: "text-white border border-white/15 hover:border-white/40",
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
};

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => (
  <div className={`rounded-3xl ${cardGrad} border border-white/10 ${glow} ${className}`}>
    {children}
  </div>
);

/* ---------------- NAV ---------------- */
const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLink = "px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/40 w-full">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 md:h-24 items-center justify-between text-white">
          <Link to="/" className="flex items-center">
            <div className="h-16 md:h-20 w-auto">
              <img 
                src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" 
                alt="SCRUMMY" 
                className="w-full h-full object-contain" 
              />
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className={navLink}>Home</Link>
            <Link to="/fixtures" className={navLink}>Fixtures</Link>
            <Link to="/about" className={navLink}>About</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <CustomButton 
              variant="gold" 
              icon={Smartphone}
              onClick={() => window.open('https://apps.apple.com/us/app/scrummy-fantasy-rugby/id6744964910', '_blank')}
            >
              Download App
            </CustomButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 py-4"
          >
            <nav className="flex flex-col gap-2">
              <Link to="/" className={navLink} onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/fixtures" className={navLink} onClick={() => setMobileMenuOpen(false)}>
                Fixtures
              </Link>
              <Link to="/about" className={navLink} onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <div className="pt-2">
                <CustomButton 
                  variant="gold" 
                  icon={Smartphone}
                  onClick={() => {
                    window.open('https://apps.apple.com/us/app/scrummy-fantasy-rugby/id6744964910', '_blank');
                    setMobileMenuOpen(false);
                  }}
                >
                  Download App
                </CustomButton>
              </div>
              </nav>
            </motion.div>
          )}
      </div>
      </header>
  );
};

/* ---------------- MOCK DATA ---------------- */
const mockPlayers = [
  { name: "Jade Shekells", role: "Centre", pr: 89, value: 60, color: "from-emerald-500/20 to-emerald-600/10" },
  { name: "Bernard van der Linde", role: "Scrum Half", pr: 88, value: 57, color: "from-amber-500/20 to-amber-600/10" },
  { name: "Hinata Komaki", role: "Prop", pr: 87, value: 59, color: "from-red-500/20 to-red-600/10" },
  { name: "Joe McCarthy", role: "Lock", pr: 87.3, value: 63, color: "from-blue-500/20 to-blue-600/10" },
];

const featuredPlayer = {
  name: "Sydney Niupulusu",
  role: "Lock",
  country: "Samoa",
  flag: "🇼🇸",
  value: 54,
  pr: 87,
  bio: "Dominant lock with incredible tackling consistency and leadership on the field.",
  image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=1200&auto=format&fit=crop",
};

/* ---------------- HOMEPAGE ---------------- */
const Index: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ background: tokens.bg, color: tokens.text }}>
      <Nav />

      <main className={appGradient}>
        {/* HERO */}
        <section className="relative text-white pt-20 pb-20 md:pt-28 md:pb-28">
          <Container>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
                >
                  Fantasy Rugby,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D6CFF] via-[#7A5CFF] to-[#F9C94E]">
                    reimagined
                  </span>
                </motion.h1>
                <p className="mt-4 md:mt-6 text-white/70 max-w-xl">
                  Build your squad, make smart predictions, and compete every week. A seamless
                  experience across web and app.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <CustomButton variant="gold" icon={Trophy}>
                    Play Now
                  </CustomButton>
                  <CustomButton variant="outline" icon={ChevronRight}>
                    How it works
                  </CustomButton>
          </div>
        </div>

              {/* Fanned player cards */}
              <div className="relative flex justify-center items-center h-[280px] md:h-[320px] lg:h-[400px]">
            {/* Left Card */}
            <motion.div 
              className="absolute left-[-20px] md:left-[-50px] top-[60px] md:top-[80px] scale-[0.6] md:scale-[0.8]"
              style={{
                rotate: 0,
                zIndex: 10,
                filter: 'brightness(0.85) drop-shadow(0 0 30px rgba(255, 165, 0, 0.6)) drop-shadow(0 0 60px rgba(255, 140, 0, 0.4))'
              }}
              initial={{ opacity: 0 }}
                 animate={{
                opacity: 1,
                y: [0, -8, 0]
                 }}
                transition={{ 
                opacity: { duration: 0.6, delay: 0.2 },
                y: {
                  duration: 3.2,
                    repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.8
                }
              }}
            >
                  <div className="relative isolate z-0">
                    <img
                      src="https://scrummy-app.ai/player_card_backgrounds/half-back-bg.png"
                      alt="card background"
                      className="object-contain min-w-[170px] max-w-[170px] lg:min-w-[200px] lg:max-w-[200px]"
                    />
                    <div className="z-30 overflow-clip absolute pt-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 flex flex-row items-center justify-center h-10 absolute top-3 right-0 lg:w-10">
                        <div className="overflow-clip w-6 h-6 lg:w-8 lg:h-8">
                          <img
                            src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/7df7b034-0d82-54a1-8606-86e46eebfa35.png"
                            alt="team logo"
                            className="w-full h-full object-contain"
                  />
                </div>
                  </div>
                      <div className="min-h-[100px] max-h-[100px] max-w-[100px] aspect-[3/4] overflow-hidden min-w-[140px] flex flex-col items-center justify-center lg:min-h-[140px] lg:max-h-[140px] lg:max-w-[140px] relative">
                        <img
                          src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/5171fb81-f984-5856-9cfc-23b62f52a94c.png"
                          alt="Gareth Davies"
                          className="min-h-[80px] max-h-[80px] min-w-[80px] max-w-[80px] object-cover object-top translate-y-[5%] lg:min-h-[120px] lg:max-h-[120px] lg:min-w-[120px] lg:max-w-[120px]"
                          style={{
                            maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskSize: '100% 100%',
                            WebkitMaskSize: '100% 100%'
                          }}
                        />
                        <div className="flex flex-col absolute bottom-0 items-center p-1 justify-center">
                          <p className="text-[15px] lg:text-xs truncate max-w-[100px] lg:max-w-[130px]">Gareth Davies</p>
              </div>
                </div>
                      <div className="w-full flex flex-row items-center justify-center">
                        <div className="w-full flex flex-row items-center justify-center" style={{ width: '100%', border: '1px solid rgb(179, 116, 0)', borderRadius: '2px' }}>
                          <div className="flex flex-col items-center w-full" style={{ borderRight: '1px solid rgb(179, 116, 0)' }}>
                            <p className="text-xs font-bold">42</p>
                            <p className="text-xs">Value</p>
              </div>
                          <div className="flex flex-col items-center w-full">
                            <p className="text-xs font-bold">84.3</p>
                            <p className="text-xs">PR</p>
            </div>
                </div>
              </div>
                      <div className="flex text-[10px] -mt-1 lg:text-xs flex-row items-center justify-center gap-2">
                        <p className="font-bold">Scrum Half</p>
                        <img className="w-8 h-8" src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" alt="scrummy logo" />
                      </div>
                    </div>
          </div>
            </motion.div>
            
            {/* Center Card (Featured) */}
            <motion.div 
              className="absolute left-[80px] md:left-[120px] lg:left-[140px] top-0 scale-[1.0] md:scale-[1.4]"
                style={{
                rotate: 0,
                zIndex: 20,
                filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(45, 108, 255, 0.7)) drop-shadow(0 0 80px rgba(45, 108, 255, 0.5))'
              }}
              initial={{ opacity: 0 }}
                 animate={{
                opacity: 1,
                y: [0, -10, 0]
                 }}
                transition={{ 
                opacity: { duration: 0.6, delay: 0.3 },
                y: {
                  duration: 3.5,
                    repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.9
                }
              }}
            >
                  <div className="relative isolate z-0">
                    <img
                      src="https://scrummy-app.ai/player_card_backgrounds/second-row-bg.png"
                      alt="card background"
                      className="object-contain min-w-[180px] max-w-[180px] lg:min-w-[220px] lg:max-w-[220px]"
                    />
                    <div className="z-30 overflow-clip absolute pt-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 flex flex-row items-center justify-center h-10 absolute top-3 right-0 lg:w-10">
                        <div className="overflow-clip w-6 h-6 lg:w-8 lg:h-8">
                          <img
                            src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/6b065f58-eaad-592e-82d5-f27f589e6ab2.png"
                            alt="team logo"
                            className="w-full h-full object-contain"
                          />
                </div>
                </div>
                      <div className="min-h-[100px] max-h-[100px] max-w-[100px] aspect-[3/4] overflow-hidden min-w-[140px] flex flex-col items-center justify-center lg:min-h-[140px] lg:max-h-[140px] lg:max-w-[140px] relative">
                        <img
                          src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/b6def658-0e92-5b71-b0a5-01b29c7cf5b1.png"
                          alt="Joe McCarthy"
                          className="min-h-[80px] max-h-[80px] min-w-[80px] max-w-[80px] object-cover object-top translate-y-[5%] lg:min-h-[120px] lg:max-h-[120px] lg:min-w-[120px] lg:max-w-[120px]"
                          style={{
                            maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskSize: '100% 100%',
                            WebkitMaskSize: '100% 100%'
                          }}
                        />
                        <div className="flex flex-col absolute bottom-0 items-center p-1 justify-center">
                          <p className="text-[15px] lg:text-xs truncate max-w-[100px] lg:max-w-[130px]">Joe McCarthy</p>
              </div>
                </div>
                      <div className="w-full flex flex-row items-center justify-center">
                        <div className="w-full flex flex-row items-center justify-center" style={{ width: '100%', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                          <div className="flex flex-col items-center w-full" style={{ borderRight: '1px solid rgba(255,255,255,0.2)' }}>
                            <p className="text-xs font-bold">54</p>
                            <p className="text-xs">Value</p>
              </div>
                          <div className="flex flex-col items-center w-full">
                            <p className="text-xs font-bold">87</p>
                            <p className="text-xs">PR</p>
            </div>
                </div>
              </div>
                      <div className="flex text-[10px] -mt-1 lg:text-xs flex-row items-center justify-center gap-2">
                        <p className="font-bold">Lock</p>
                        <img className="w-8 h-8" src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" alt="scrummy logo" />
            </div>
                </div>
              </div>
                </motion.div>

                {/* Right Card */}
          <motion.div
                  className="absolute right-[5px] md:right-[10px] top-[80px] md:top-[100px] scale-[0.55] md:scale-[0.75]"
                  style={{
                    rotate: 0,
                    zIndex: 15,
                    filter: 'brightness(0.8) drop-shadow(0 0 30px rgba(138, 0, 0, 0.6)) drop-shadow(0 0 60px rgba(180, 0, 0, 0.4))'
                  }}
                  initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
                    y: [0, -7, 0]
            }}
                transition={{ 
                    opacity: { duration: 0.6, delay: 0.4 },
              y: {
                      duration: 2.9,
                repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.0
                    }
                  }}
                >
                  <div className="relative isolate z-0">
                    <img
                      src="https://scrummy-app.ai/player_card_backgrounds/front-row-bg.png"
                      alt="card background"
                      className="object-contain min-w-[170px] max-w-[170px] lg:min-w-[200px] lg:max-w-[200px]"
                    />
                    <div className="z-30 overflow-clip absolute pt-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 flex flex-row items-center justify-center h-10 absolute top-3 right-0 lg:w-10">
                        <div className="overflow-clip w-6 h-6 lg:w-8 lg:h-8">
                          <img
                            src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/521cb3f7-4972-5e4e-85e6-a50b18899f84.png"
                            alt="team logo"
                            className="w-full h-full object-contain"
                          />
                  </div>
                </div>
                      <div className="min-h-[100px] max-h-[100px] max-w-[100px] aspect-[3/4] overflow-hidden min-w-[140px] flex flex-col items-center justify-center lg:min-h-[140px] lg:max-h-[140px] lg:max-w-[140px] relative">
                        <img
                          src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/2b5881d3-8421-5bb9-9517-bd37cd9568c5.png"
                          alt="Scott Wilson"
                          className="min-h-[80px] max-h-[80px] min-w-[80px] max-w-[80px] object-cover object-top translate-y-[5%] lg:min-h-[120px] lg:max-h-[120px] lg:min-w-[120px] lg:max-w-[120px]"
                          style={{
                            maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskSize: '100% 100%',
                            WebkitMaskSize: '100% 100%'
                          }}
                        />
                        <div className="flex flex-col absolute bottom-0 items-center p-1 justify-center">
                          <p className="text-[15px] lg:text-xs truncate max-w-[100px] lg:max-w-[130px]">Scott Wilson</p>
                </div>
                  </div>
                      <div className="w-full flex flex-row items-center justify-center">
                        <div className="w-full flex flex-row items-center justify-center" style={{ width: '100%', border: '1px solid rgb(138, 0, 0)', borderRadius: '2px' }}>
                          <div className="flex flex-col items-center w-full" style={{ borderRight: '1px solid rgb(138, 0, 0)' }}>
                            <p className="text-xs font-bold">48</p>
                            <p className="text-xs">Value</p>
                  </div>
                          <div className="flex flex-col items-center w-full">
                            <p className="text-xs font-bold">83.3</p>
                            <p className="text-xs">PR</p>
                </div>
        </div>
              </div>
                      <div className="flex text-[10px] -mt-1 lg:text-xs flex-row items-center justify-center gap-2">
                        <p className="font-bold">Prop</p>
                        <img className="w-8 h-8" src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" alt="scrummy logo" />
            </div>
                </div>
              </div>
                </motion.div>
                  </div>
                </div>
          </Container>
        </section>

        {/* FEATURE CARDS */}
        <section className="py-14 md:py-20">
          <Container>
            <div className="mb-8 flex items-end justify-between text-white">
              <h2 className="text-2xl md:text-4xl font-bold">What makes SCRUMMY different</h2>
                  </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Trophy,
                  title: "Weekly Challenges",
                  desc: "Compete in SCRUM6 and URC challenges for prizes.",
                  cta: "View Leaderboard",
                },
                {
                  icon: CalendarDays,
                  title: "Every Match, Every Level",
                  desc: "From Springboks to school finals – fixtures, predictions & live chat.",
                  cta: "Explore Fixtures",
                },
                {
                  icon: Users,
                  title: "Build Your Squad",
                  desc: "Draft 5–6 players, manage budget, optimize formations.",
                  cta: "Create Team",
                },
              ].map((item, i) => (
                <Card key={i} className="p-6 hover:translate-y-[-2px] transition">
                  <div className="flex items-center gap-3 text-white">
                    <div className="grid place-items-center h-10 w-10 rounded-2xl bg-white/5">
                      <item.icon className="h-5 w-5" />
                              </div>
                    <h3 className="font-semibold">{item.title}</h3>
                            </div>
                  <p className="mt-3 text-sm text-white/70">{item.desc}</p>
                  <div className="mt-5">
                    <CustomButton variant="outline">{item.cta}</CustomButton>
                            </div>
                </Card>
                      ))}
                    </div>
          </Container>
        </section>

        {/* SQUAD BUILDING SECTION */}
        <section className="py-20 md:py-28">
          <Container>
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Content Left */}
              <div className="text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Build Your Squad
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                  Build a team of 6 players. Manage your budget, choose your formation, and dominate the competition.
                </p>
          </div>
          
              {/* Formation Cards Right - DRAMATIC 3D View */}
              <div 
                className="relative h-[680px] md:h-[780px] flex items-center justify-center"
                style={{ perspective: '1000px' }}
              >
                {/* 3D Dark Holographic Field */}
                <div 
                  className="relative w-full max-w-[750px] h-[700px]"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(35deg)',
                    borderRadius: '16px',
                    boxShadow: '0 50px 120px rgba(45, 108, 255, 0.25), 0 30px 80px rgba(0,0,0,0.7)',
                  }}
                >
                  {/* Dark Transparent Platform */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(20, 20, 40, 0.35) 0%, rgba(30, 40, 70, 0.45) 50%, rgba(20, 20, 40, 0.35) 100%)',
                    borderRadius: '16px',
                    border: '1px solid rgba(100, 150, 255, 0.3)',
                    boxShadow: 'inset 0 2px 15px rgba(0,0,0,0.4), inset 0 -2px 15px rgba(45, 108, 255, 0.15)',
                  }}>
                    {/* Tech Grid Pattern */}
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, transparent 0px, transparent 48px, rgba(100, 150, 255, 0.2) 48px, rgba(100, 150, 255, 0.2) 49px),
                        repeating-linear-gradient(90deg, transparent 0px, transparent 48px, rgba(100, 150, 255, 0.2) 48px, rgba(100, 150, 255, 0.2) 49px)
                      `,
                      borderRadius: '16px',
                    }} />
                    
                    {/* Subtle Depth Lighting */}
                    <div className="absolute inset-0 opacity-20" style={{
                      background: `
                        radial-gradient(circle at 30% 30%, rgba(80, 120, 255, 0.3) 0%, transparent 40%),
                        radial-gradient(circle at 70% 70%, rgba(45, 108, 255, 0.25) 0%, transparent 35%)
                      `,
                      borderRadius: '16px',
                    }} />

                  {/* Rugby Pitch Lines */}
                  <div className="absolute inset-0">
                    {/* Try Line - Top */}
                    <div className="absolute top-[8%] left-[8%] right-[8%] h-[2px]" style={{
                      background: 'rgba(100, 150, 255, 0.6)',
                      boxShadow: '0 0 8px rgba(100, 150, 255, 0.5)'
                    }} />
                    
                    {/* 22m Line - Top */}
                    <div className="absolute top-[22%] left-[8%] right-[8%] h-[1.5px]" style={{
                      background: 'rgba(100, 150, 255, 0.5)',
                      boxShadow: '0 0 6px rgba(100, 150, 255, 0.4)'
                    }} />
                    <div className="absolute top-[22%] left-[8%] text-[10px] text-blue-300/40 font-bold" style={{ transform: 'translateY(-18px)' }}>22</div>
                    
                    {/* 10m Line - Top */}
                    <div className="absolute top-[36%] left-[8%] right-[8%] h-[1px]" style={{
                      background: 'rgba(100, 150, 255, 0.35)',
                      boxShadow: '0 0 4px rgba(100, 150, 255, 0.3)'
                    }} />
                    <div className="absolute top-[36%] left-[8%] text-[9px] text-blue-300/30 font-bold" style={{ transform: 'translateY(-16px)' }}>10</div>
                    
                    {/* Halfway Line (Center) */}
                    <div className="absolute top-1/2 left-[8%] right-[8%] h-[2px]" style={{
                      background: 'rgba(100, 150, 255, 0.7)',
                      boxShadow: '0 0 10px rgba(100, 150, 255, 0.6)',
                      transform: 'translateY(-1px)'
                    }} />
                    <div className="absolute top-1/2 left-1/2 w-[60px] h-[60px] rounded-full transform -translate-x-1/2 -translate-y-1/2" style={{
                      border: '1.5px solid rgba(100, 150, 255, 0.5)',
                      boxShadow: '0 0 10px rgba(100, 150, 255, 0.4)'
                    }} />
                    
                    {/* 10m Line - Bottom */}
                    <div className="absolute top-[64%] left-[8%] right-[8%] h-[1px]" style={{
                      background: 'rgba(100, 150, 255, 0.35)',
                      boxShadow: '0 0 4px rgba(100, 150, 255, 0.3)'
                    }} />
                    <div className="absolute top-[64%] right-[8%] text-[9px] text-blue-300/30 font-bold" style={{ transform: 'translateY(-16px)' }}>10</div>
                    
                    {/* 22m Line - Bottom */}
                    <div className="absolute top-[78%] left-[8%] right-[8%] h-[1.5px]" style={{
                      background: 'rgba(100, 150, 255, 0.5)',
                      boxShadow: '0 0 6px rgba(100, 150, 255, 0.4)'
                    }} />
                    <div className="absolute top-[78%] right-[8%] text-[10px] text-blue-300/40 font-bold" style={{ transform: 'translateY(-18px)' }}>22</div>
                    
                    {/* Try Line - Bottom */}
                    <div className="absolute top-[92%] left-[8%] right-[8%] h-[2px]" style={{
                      background: 'rgba(100, 150, 255, 0.6)',
                      boxShadow: '0 0 8px rgba(100, 150, 255, 0.5)'
                    }} />
                    
                    {/* Touchlines (Side Lines) */}
                    <div className="absolute top-[8%] bottom-[8%] left-[8%] w-[2px]" style={{
                      background: 'rgba(100, 150, 255, 0.5)',
                      boxShadow: '0 0 6px rgba(100, 150, 255, 0.4)'
                    }} />
                    <div className="absolute top-[8%] bottom-[8%] right-[8%] w-[2px]" style={{
                      background: 'rgba(100, 150, 255, 0.5)',
                      boxShadow: '0 0 6px rgba(100, 150, 255, 0.4)'
                    }} />
                    
                    {/* Try Bars (Goal Posts) - Top */}
                    <div className="absolute top-[3%] left-1/2 transform -translate-x-1/2">
                      {/* Vertical Post */}
                      <div className="relative w-[2px] h-[35px] mx-auto" style={{
                        background: 'linear-gradient(to bottom, rgba(100, 150, 255, 0.7), rgba(100, 150, 255, 0.3))',
                        boxShadow: '0 0 8px rgba(100, 150, 255, 0.6)'
                      }} />
                      {/* Horizontal Bar (H-shape top) */}
                      <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-[40px] h-[2px]" style={{
                        background: 'rgba(100, 150, 255, 0.6)',
                        boxShadow: '0 0 6px rgba(100, 150, 255, 0.5)'
                      }} />
                      {/* Left Upright */}
                      <div className="absolute top-0 left-[calc(50%-20px)] w-[2px] h-[15px]" style={{
                        background: 'linear-gradient(to top, rgba(100, 150, 255, 0.6), rgba(100, 150, 255, 0.2))',
                        boxShadow: '0 0 6px rgba(100, 150, 255, 0.4)'
                      }} />
                      {/* Right Upright */}
                      <div className="absolute top-0 right-[calc(50%-20px)] w-[2px] h-[15px]" style={{
                        background: 'linear-gradient(to top, rgba(100, 150, 255, 0.6), rgba(100, 150, 255, 0.2))',
                        boxShadow: '0 0 6px rgba(100, 150, 255, 0.4)'
                      }} />
                    </div>
                    
                    {/* Try Bars (Goal Posts) - Bottom */}
                    <div className="absolute bottom-[3%] left-1/2 transform -translate-x-1/2">
                      {/* Vertical Post */}
                      <div className="relative w-[2px] h-[35px] mx-auto" style={{
                        background: 'linear-gradient(to top, rgba(100, 150, 255, 0.7), rgba(100, 150, 255, 0.3))',
                        boxShadow: '0 0 8px rgba(100, 150, 255, 0.6)'
                      }} />
                      {/* Horizontal Bar (H-shape bottom) */}
                      <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 w-[40px] h-[2px]" style={{
                        background: 'rgba(100, 150, 255, 0.6)',
                        boxShadow: '0 0 6px rgba(100, 150, 255, 0.5)'
                      }} />
                      {/* Left Upright */}
                      <div className="absolute bottom-0 left-[calc(50%-20px)] w-[2px] h-[15px]" style={{
                        background: 'linear-gradient(to bottom, rgba(100, 150, 255, 0.6), rgba(100, 150, 255, 0.2))',
                        boxShadow: '0 0 6px rgba(100, 150, 255, 0.4)'
                      }} />
                      {/* Right Upright */}
                      <div className="absolute bottom-0 right-[calc(50%-20px)] w-[2px] h-[15px]" style={{
                        background: 'linear-gradient(to bottom, rgba(100, 150, 255, 0.6), rgba(100, 150, 255, 0.2))',
                        boxShadow: '0 0 6px rgba(100, 150, 255, 0.4)'
                      }} />
                    </div>
                    
                    {/* Corner Flag Markers */}
                    <div className="absolute top-[8%] left-[8%] w-2 h-2 rounded-full" style={{
                      background: 'rgba(100, 150, 255, 0.6)',
                      boxShadow: '0 0 8px rgba(100, 150, 255, 0.7)'
                    }} />
                    <div className="absolute top-[8%] right-[8%] w-2 h-2 rounded-full" style={{
                      background: 'rgba(100, 150, 255, 0.6)',
                      boxShadow: '0 0 8px rgba(100, 150, 255, 0.7)'
                    }} />
                    <div className="absolute bottom-[8%] left-[8%] w-2 h-2 rounded-full" style={{
                      background: 'rgba(100, 150, 255, 0.6)',
                      boxShadow: '0 0 8px rgba(100, 150, 255, 0.7)'
                    }} />
                    <div className="absolute bottom-[8%] right-[8%] w-2 h-2 rounded-full" style={{
                      background: 'rgba(100, 150, 255, 0.6)',
                      boxShadow: '0 0 8px rgba(100, 150, 255, 0.7)'
                    }} />
                    </div>
                  </div>

                  {/* Player Cards Container - Counter-rotated to stay upright */}
                  <div className="absolute inset-0" style={{ transform: 'rotateX(-35deg)', transformStyle: 'preserve-3d' }}>
                    
                    {/* Back Row - 3 Cards */}
                    {/* Back Left */}
                    <motion.div 
                      className="absolute" 
                      style={{ top: '6%', left: '6%', transformStyle: 'preserve-3d' }}
                      initial={{ opacity: 0, y: -150, scale: 0.85 }}
                      animate={{ 
                        opacity: 1, 
                        y: [0, -8, 0],
                        scale: 0.85
                      }}
                      transition={{
                        opacity: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                        scale: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                        y: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.1
                        }
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="relative isolate z-0" style={{ 
                        transform: 'translateZ(60px)',
                        filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))',
                      }}>
                        <img src="https://scrummy-app.ai/player_card_backgrounds/front-row-bg.png" alt="card bg" className="object-contain min-w-[140px] max-w-[140px]" />
                        <div className="z-30 overflow-clip absolute pt-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 flex flex-row items-center justify-center h-8 absolute top-2 right-0">
                            <div className="overflow-clip w-5 h-5"><img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/521cb3f7-4972-5e4e-85e6-a50b18899f84.png" alt="team" className="w-full h-full object-contain" /></div>
                  </div>
                          <div className="min-h-[70px] max-h-[70px] max-w-[70px] aspect-[3/4] overflow-hidden min-w-[100px] flex flex-col items-center justify-center relative">
                            <img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/2b5881d3-8421-5bb9-9517-bd37cd9568c5.png" className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] object-cover object-top translate-y-[5%] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
                            <div className="flex flex-col absolute bottom-0 items-center p-1 justify-center"><p className="text-[10px] truncate max-w-[70px]">Player 1</p></div>
                </div>
                          <div className="w-full flex flex-row items-center justify-center"><div className="w-full flex flex-row items-center justify-center" style={{ border: '1px solid rgb(138, 0, 0)', borderRadius: '2px' }}><div className="flex flex-col items-center w-full" style={{ borderRight: '1px solid rgb(138, 0, 0)' }}><p className="text-[8px] font-bold">45</p><p className="text-[7px]">Value</p></div><div className="flex flex-col items-center w-full"><p className="text-[8px] font-bold">82</p><p className="text-[7px]">PR</p></div></div></div>
                          <div className="flex text-[8px] -mt-1 flex-row items-center justify-center gap-1"><p className="font-bold">Prop</p></div>
              </div>
                </div>
                    </motion.div>

                    {/* Back Center */}
                    <motion.div 
                      className="absolute" 
                      style={{ top: '6%', left: '50%', transformStyle: 'preserve-3d' }}
                      initial={{ opacity: 0, y: -150, x: '-50%', scale: 0.85 }}
                      animate={{ 
                        opacity: 1, 
                        y: [0, -10, 0],
                        x: '-50%',
                        scale: 0.85
                      }}
                      transition={{
                        opacity: { duration: 0.8, delay: 0.4, ease: "easeOut" },
                        scale: { duration: 0.8, delay: 0.4, ease: "easeOut" },
                        x: { duration: 0.8, delay: 0.4, ease: "easeOut" },
                        y: {
                          duration: 3.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.2
                        }
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="relative isolate z-0" style={{ 
                        transform: 'translateZ(60px)',
                        filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))',
                      }}>
                        <img src="https://scrummy-app.ai/player_card_backgrounds/second-row-bg.png" alt="card bg" className="object-contain min-w-[140px] max-w-[140px]" />
                        <div className="z-30 overflow-clip absolute pt-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 flex flex-row items-center justify-center h-8 absolute top-2 right-0">
                            <div className="overflow-clip w-5 h-5"><img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/6b065f58-eaad-592e-82d5-f27f589e6ab2.png" alt="team" className="w-full h-full object-contain" /></div>
                    </div>
                          <div className="min-h-[70px] max-h-[70px] max-w-[70px] aspect-[3/4] overflow-hidden min-w-[100px] flex flex-col items-center justify-center relative">
                            <img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/b6def658-0e92-5b71-b0a5-01b29c7cf5b1.png" className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] object-cover object-top translate-y-[5%] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
                            <div className="flex flex-col absolute bottom-0 items-center p-1 justify-center"><p className="text-[10px] truncate max-w-[70px]">Player 2</p></div>
                    </div>
                          <div className="w-full flex flex-row items-center justify-center"><div className="w-full flex flex-row items-center justify-center" style={{ border: '1px solid rgb(0, 77, 153)', borderRadius: '2px' }}><div className="flex flex-col items-center w-full" style={{ borderRight: '1px solid rgb(0, 77, 153)' }}><p className="text-[8px] font-bold">50</p><p className="text-[7px]">Value</p></div><div className="flex flex-col items-center w-full"><p className="text-[8px] font-bold">85</p><p className="text-[7px]">PR</p></div></div></div>
                          <div className="flex text-[8px] -mt-1 flex-row items-center justify-center gap-1"><p className="font-bold">Lock</p></div>
                  </div>
                </div>
              </motion.div>

                    {/* Back Right */}
                    <motion.div 
                      className="absolute" 
                      style={{ top: '6%', right: '6%', transformStyle: 'preserve-3d' }}
                      initial={{ opacity: 0, y: -150, scale: 0.85 }}
                      animate={{ 
                        opacity: 1, 
                        y: [0, -7, 0],
                        scale: 0.85
                      }}
                      transition={{
                        opacity: { duration: 0.8, delay: 0.5, ease: "easeOut" },
                        scale: { duration: 0.8, delay: 0.5, ease: "easeOut" },
                        y: {
                          duration: 2.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.3
                        }
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="relative isolate z-0" style={{ 
                        transform: 'translateZ(60px)',
                        filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))',
                      }}>
                        <img src="https://scrummy-app.ai/player_card_backgrounds/back-row-bg.png" alt="card bg" className="object-contain min-w-[140px] max-w-[140px]" />
                        <div className="z-30 overflow-clip absolute pt-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 flex flex-row items-center justify-center h-8 absolute top-2 right-0">
                            <div className="overflow-clip w-5 h-5"><img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/7df7b034-0d82-54a1-8606-86e46eebfa35.png" alt="team" className="w-full h-full object-contain" /></div>
                    </div>
                          <div className="min-h-[70px] max-h-[70px] max-w-[70px] aspect-[3/4] overflow-hidden min-w-[100px] flex flex-col items-center justify-center relative">
                            <img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/5171fb81-f984-5856-9cfc-23b62f52a94c.png" className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] object-cover object-top translate-y-[5%] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
                            <div className="flex flex-col absolute bottom-0 items-center p-1 justify-center"><p className="text-[10px] truncate max-w-[70px]">Player 3</p></div>
                    </div>
                          <div className="w-full flex flex-row items-center justify-center"><div className="w-full flex flex-row items-center justify-center" style={{ border: '1px solid rgb(179, 116, 0)', borderRadius: '2px' }}><div className="flex flex-col items-center w-full" style={{ borderRight: '1px solid rgb(179, 116, 0)' }}><p className="text-[8px] font-bold">47</p><p className="text-[7px]">Value</p></div><div className="flex flex-col items-center w-full"><p className="text-[8px] font-bold">88</p><p className="text-[7px]">PR</p></div></div></div>
                          <div className="flex text-[8px] -mt-1 flex-row items-center justify-center gap-1"><p className="font-bold">Flanker</p></div>
                  </div>
                </div>
                    </motion.div>

                    {/* Middle Row - 2 Cards */}
                    {/* Middle Left */}
                    <motion.div 
                      className="absolute" 
                      style={{ top: '35%', left: '18%', transformStyle: 'preserve-3d' }}
                      initial={{ opacity: 0, y: -150, scale: 0.85 }}
                      animate={{ 
                        opacity: 1, 
                        y: [0, -9, 0],
                        scale: 0.85
                      }}
                      transition={{
                        opacity: { duration: 0.8, delay: 0.6, ease: "easeOut" },
                        scale: { duration: 0.8, delay: 0.6, ease: "easeOut" },
                        y: {
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.4
                        }
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="relative isolate z-0" style={{ 
                        transform: 'translateZ(150px)',
                        filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.65))',
                      }}>
                        <img src="https://scrummy-app.ai/player_card_backgrounds/half-back-bg.png" alt="card bg" className="object-contain min-w-[140px] max-w-[140px]" />
                        <div className="z-30 overflow-clip absolute pt-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 flex flex-row items-center justify-center h-8 absolute top-2 right-0">
                            <div className="overflow-clip w-5 h-5"><img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/7df7b034-0d82-54a1-8606-86e46eebfa35.png" alt="team" className="w-full h-full object-contain" /></div>
                    </div>
                          <div className="min-h-[70px] max-h-[70px] max-w-[70px] aspect-[3/4] overflow-hidden min-w-[100px] flex flex-col items-center justify-center relative">
                            <img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/5171fb81-f984-5856-9cfc-23b62f52a94c.png" className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] object-cover object-top translate-y-[5%] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
                            <div className="flex flex-col absolute bottom-0 items-center p-1 justify-center"><p className="text-[10px] truncate max-w-[70px]">Player 4</p></div>
                    </div>
                          <div className="w-full flex flex-row items-center justify-center"><div className="w-full flex flex-row items-center justify-center" style={{ border: '1px solid rgb(179, 116, 0)', borderRadius: '2px' }}><div className="flex flex-col items-center w-full" style={{ borderRight: '1px solid rgb(179, 116, 0)' }}><p className="text-[8px] font-bold">42</p><p className="text-[7px]">Value</p></div><div className="flex flex-col items-center w-full"><p className="text-[8px] font-bold">84</p><p className="text-[7px]">PR</p></div></div></div>
                          <div className="flex text-[8px] -mt-1 flex-row items-center justify-center gap-1"><p className="font-bold">Scrum Half</p></div>
                  </div>
                </div>
            </motion.div>

                    {/* Middle Right */}
                    <motion.div 
                      className="absolute" 
                      style={{ top: '35%', right: '18%', transformStyle: 'preserve-3d' }}
                      initial={{ opacity: 0, y: -150, scale: 0.85 }}
                      animate={{ 
                        opacity: 1, 
                        y: [0, -8, 0],
                        scale: 0.85
                      }}
                      transition={{
                        opacity: { duration: 0.8, delay: 0.7, ease: "easeOut" },
                        scale: { duration: 0.8, delay: 0.7, ease: "easeOut" },
                        y: {
                          duration: 3.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.5
                        }
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="relative isolate z-0" style={{ 
                        transform: 'translateZ(150px)',
                        filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.65))',
                      }}>
                        <img src="https://scrummy-app.ai/player_card_backgrounds/half-back-bg.png" alt="card bg" className="object-contain min-w-[140px] max-w-[140px]" />
                        <div className="z-30 overflow-clip absolute pt-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 flex flex-row items-center justify-center h-8 absolute top-2 right-0">
                            <div className="overflow-clip w-5 h-5"><img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/6b065f58-eaad-592e-82d5-f27f589e6ab2.png" alt="team" className="w-full h-full object-contain" /></div>
            </div>
                          <div className="min-h-[70px] max-h-[70px] max-w-[70px] aspect-[3/4] overflow-hidden min-w-[100px] flex flex-col items-center justify-center relative">
                            <img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/b6def658-0e92-5b71-b0a5-01b29c7cf5b1.png" className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] object-cover object-top translate-y-[5%] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
                            <div className="flex flex-col absolute bottom-0 items-center p-1 justify-center"><p className="text-[10px] truncate max-w-[70px]">Player 5</p></div>
          </div>
                          <div className="w-full flex flex-row items-center justify-center"><div className="w-full flex flex-row items-center justify-center" style={{ border: '1px solid rgb(0, 77, 153)', borderRadius: '2px' }}><div className="flex flex-col items-center w-full" style={{ borderRight: '1px solid rgb(0, 77, 153)' }}><p className="text-[8px] font-bold">46</p><p className="text-[7px]">Value</p></div><div className="flex flex-col items-center w-full"><p className="text-[8px] font-bold">86</p><p className="text-[7px]">PR</p></div></div></div>
                          <div className="flex text-[8px] -mt-1 flex-row items-center justify-center gap-1"><p className="font-bold">Fly Half</p></div>
            </div>
              </div>
            </motion.div>

                    {/* Front Row - 1 Card */}
                    <motion.div 
                      className="absolute" 
                      style={{ top: '57%', left: '50%', transformStyle: 'preserve-3d' }}
                      initial={{ opacity: 0, y: -150, x: '-50%', scale: 0.85 }}
                      animate={{ 
                        opacity: 1, 
                        y: [0, -12, 0],
                        x: '-50%',
                        scale: 0.85
                      }}
                      transition={{
                        opacity: { duration: 0.8, delay: 0.8, ease: "easeOut" },
                        scale: { duration: 0.8, delay: 0.8, ease: "easeOut" },
                        x: { duration: 0.8, delay: 0.8, ease: "easeOut" },
                        y: {
                          duration: 3.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.6
                        }
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="relative isolate z-0" style={{ 
                        transform: 'translateZ(250px)',
                        filter: 'drop-shadow(0 25px 45px rgba(0,0,0,0.75))',
                      }}>
                        <img src="https://scrummy-app.ai/player_card_backgrounds/back-row-bg.png" alt="card bg" className="object-contain min-w-[140px] max-w-[140px]" />
                        <div className="z-30 overflow-clip absolute pt-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 flex flex-row items-center justify-center h-8 absolute top-2 right-0">
                            <div className="overflow-clip w-5 h-5"><img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/521cb3f7-4972-5e4e-85e6-a50b18899f84.png" alt="team" className="w-full h-full object-contain" /></div>
                    </div>
                          <div className="min-h-[70px] max-h-[70px] max-w-[70px] aspect-[3/4] overflow-hidden min-w-[100px] flex flex-col items-center justify-center relative">
                            <img src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/2b5881d3-8421-5bb9-9517-bd37cd9568c5.png" className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] object-cover object-top translate-y-[5%] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />
                            <div className="flex flex-col absolute bottom-0 items-center p-1 justify-center"><p className="text-[10px] truncate max-w-[70px]">Player 6</p></div>
                    </div>
                          <div className="w-full flex flex-row items-center justify-center"><div className="w-full flex flex-row items-center justify-center" style={{ border: '1px solid rgb(138, 0, 0)', borderRadius: '2px' }}><div className="flex flex-col items-center w-full" style={{ borderRight: '1px solid rgb(138, 0, 0)' }}><p className="text-[8px] font-bold">55</p><p className="text-[7px]">Value</p></div><div className="flex flex-col items-center w-full"><p className="text-[8px] font-bold">90</p><p className="text-[7px]">PR</p></div></div></div>
                          <div className="flex text-[8px] -mt-1 flex-row items-center justify-center gap-1"><p className="font-bold">Fullback</p></div>
                  </div>
                      </div>
                    </motion.div>
                    </div>
                    </div>
                      </div>
            </motion.div>
          </Container>
        </section>

        {/* PREDICTIONS SECTION */}
        <section className="py-20 md:py-28">
          <Container>
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Fixture Card Left */}
              <motion.div 
                className="flex justify-center md:justify-end order-2 md:order-1"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="w-full max-w-md p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 backdrop-blur-sm">
                  {/* League Tag */}
                  <div className="text-xs text-white/50 mb-6 text-center">United Rugby Championship, Week 6</div>
                  
                  <div className="flex flex-row items-center justify-between mb-6">
                    {/* Home Team */}
                    <div className="flex-1 flex flex-col gap-3 items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-center">
                        <img 
                          src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/521cb3f7-4972-5e4e-85e6-a50b18899f84.png" 
                          alt="Ulster Rugby" 
                          className="w-full h-full object-contain"
                        />
                    </div>
                      <p className="text-xs md:text-sm text-white font-medium text-center">Ulster Rugby</p>
                  </div>
                  
                    {/* Match Info */}
                    <div className="flex-1 flex flex-col items-center text-center justify-center px-4">
                      <p className="text-xs text-white/50 mb-1">Fri, 28 Nov</p>
                      <p className="text-lg font-bold text-white">2:45 PM</p>
                      <div className="text-xs text-white/40 mt-1">VS</div>
                  </div>

                    {/* Away Team */}
                    <div className="flex-1 flex flex-col gap-3 items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-center">
                        <img 
                          src="https://athstat-landing-assets-migrated.s3.amazonaws.com/logos/1fa00c37-f405-54f6-8bb5-78d3eac2f9c5.png" 
                          alt="Benetton Rugby" 
                          className="w-full h-full object-contain"
                        />
                   </div>
                      <p className="text-xs md:text-sm text-white font-medium text-center">Benetton Rugby</p>
            </div>
            </div>

                  {/* Prediction Section */}
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-xs text-white/60 text-center mb-4">Who you got winning?</p>
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all hover:scale-[1.02]">
                        Ulster
                      </button>
                      <button className="flex-1 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all hover:scale-[1.02]">
                        Benetton
                      </button>
              </div>
          </div>
          </div>
              </motion.div>

              {/* Content Right */}
              <div className="text-white order-1 md:order-2">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Make Your Predictions
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                  Predict who will win the next match. Compete against friends and climb the leaderboard.
                </p>
                      </div>
              </motion.div>
          </Container>
      </section>

      {/* CLOSING SECTION */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Where Rugby Meets Strategy
          </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
              Rugby has always been about more than just the game—it's about strategy, passion, and the thrill of competition. 
              SCRUMMY brings that same intensity to fantasy rugby, giving you the tools to build your ultimate squad, make bold predictions, 
              and compete with fans across the globe.
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Whether you're a seasoned fantasy player or new to the scrum, SCRUMMY is where your rugby knowledge meets real competition. 
              Join thousands of fans who are already building their dream teams and making their mark on the leaderboard.
            </p>
          </motion.div>
        </Container>
      </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-white/70">
        <Container>
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center">
                <div className="h-14 w-auto max-w-[280px]">
                  <img 
                    src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" 
                    alt="SCRUMMY" 
                    className="w-full h-full object-contain" 
                  />
          </div>
              </Link>
              <p className="mt-3 text-sm">This isn't just rugby. This is Scrummy.</p>
        </div>
            <div>
              <div className="font-semibold text-white">Product</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/fixtures" className="hover:text-white transition">Fixtures</Link></li>
                <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Company</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                <li><Link to="/support" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Follow</div>
              <div className="mt-3 text-sm">
                <a href="https://www.instagram.com/scrummyapp_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a> •{" "}
                <a href="https://www.tiktok.com/@scrummy_hub" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">TikTok</a> •{" "}
                <a href="https://www.youtube.com/@ScrummySports" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">YouTube</a>
              </div>
            </div>
              </div>
          <div className="mt-8 text-xs text-white/50">
            © {new Date().getFullYear()} Scrummy. All rights reserved.
            </div>
        </Container>
      </footer>
      </div>
  );
};

export default Index;

