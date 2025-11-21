import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
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

const Support: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I create an account in SCRUMMY?",
      answer: "Download the SCRUMMY app from the App Store or Google Play Store, then tap 'Sign Up' on the welcome screen. You can register with your email address or sign up using your social media accounts."
    },
    {
      question: "How does the voting system work?",
      answer: "You can vote for your favorite players and teams during live matches and tournaments. Simply navigate to the voting section, select your choices, and submit your votes. Your votes contribute to community rankings and may earn you rewards."
    },
    {
      question: "Can I follow multiple teams and players?",
      answer: "Yes! You can follow as many teams and players as you want. Go to the team or player profile and tap the 'Follow' button. You'll receive notifications about their matches, updates, and news."
    },
    {
      question: "How do I access live scores and match updates?",
      answer: "Live scores are available on the main dashboard of the app. You can also enable push notifications to receive real-time updates about your favorite teams' matches."
    },
    {
      question: "Is SCRUMMY free to use?",
      answer: "Yes, SCRUMMY is free to download and use. We offer premium features for enhanced experience, but all core functionality including voting, live scores, and team following is completely free."
    },
    {
      question: "How do I report a bug or technical issue?",
      answer: "You can report bugs using our online bug report form or contact our support team at info@scrummy-app.ai. Please include details about your device, app version, and the issue you're experiencing."
    },
    {
      question: "Can I change my profile information?",
      answer: "Yes, you can update your profile information anytime by going to Settings > Profile in the app. You can change your name, profile picture, favorite teams, and notification preferences."
    },
    {
      question: "How do I delete my account?",
      answer: "To delete your account, go to Settings > Account > Delete Account in the app, or contact our support team at info@scrummy-app.ai. Please note that this action is irreversible."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

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
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Support &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9C94E] to-[#E3B43F]">
                Help Center
              </span>
            </h1>
            <p className="mt-4 md:mt-6 text-white/70 max-w-2xl mx-auto text-lg md:text-xl">
              Get help with SCRUMMY. We're here to support you every step of the way.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* CONTACT SECTION */}
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
              Get in Touch
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Have a question? We're here to help
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`p-8 rounded-3xl border border-white/10 ${cardGrad} ${glow} text-center`}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#F9C94E]/10 flex items-center justify-center mx-auto mb-4 text-[#F9C94E]">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
              <p className="text-white/70 mb-6">Get detailed help via email</p>
              <a
                href="mailto:info@scrummy-app.ai?subject=SCRUMMY App Support"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-black bg-[linear-gradient(180deg,#F9C94E,#E3B43F)] hover:brightness-105 transition duration-200"
              >
                <Mail className="h-4 w-4" />
                info@scrummy-app.ai
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ SECTION */}
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
              Frequently Asked <span className="text-[#F9C94E]">Questions</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Find answers to common questions about SCRUMMY
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`rounded-2xl border border-white/10 ${cardGrad} overflow-hidden`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-white text-base">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-[#F9C94E] flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#F9C94E] flex-shrink-0 ml-4" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* KEY FEATURES SECTION */}
      <section className="py-14 md:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`p-8 md:p-12 rounded-3xl border border-white/10 ${cardGrad}`}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">About SCRUMMY</h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                The ultimate rugby fantasy app that lets you vote for your favorite players and teams, 
                follow live scores, and connect with rugby fans worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white mb-4 text-lg">Key Features</h4>
                <ul className="space-y-3 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Vote for your favorite teams and players</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Follow live match scores and updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Access detailed player and team statistics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Join the rugby community and discussions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Get notifications about your favorite teams</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4 text-lg">App Information</h4>
                <ul className="space-y-3 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Developer: Athstat.io</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Available on iOS and Android</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Free to download and use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Regular updates with new features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Supports multiple languages</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Support;
