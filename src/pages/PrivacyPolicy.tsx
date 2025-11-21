import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
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

const PrivacyPolicy: React.FC = () => {
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
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9C94E] to-[#E3B43F]">
                Policy
              </span>
            </h1>
            <p className="mt-4 md:mt-6 text-white/70 max-w-2xl mx-auto text-lg md:text-xl">
              How we protect and handle your personal information
            </p>
            <p className="mt-3 text-white/50 text-sm">
              Last updated: January 2025
            </p>
          </motion.div>
        </Container>
      </section>

      {/* INTRO SECTION */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`p-6 md:p-8 rounded-3xl border border-white/10 ${cardGrad} mb-8`}
            >
              <p className="text-white/80 leading-relaxed text-sm">
                This Privacy Policy describes how SCRUMMY collects, holds, processes, uses, and discloses your Personal Data when you use our mobile application or access our services. SCRUMMY is a wholly owned entity of Athstat.io. By providing your Personal Data to SCRUMMY, you agree that you are authorized to provide that information and are accepting this Privacy Policy. If you do not agree to our practices, please do not register, subscribe, create an account, or otherwise interact with our mobile application and services.
              </p>
            </motion.div>

            {/* What is Personal Data */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">What is "Personal Data"?</h2>
              <div className={`p-6 md:p-8 rounded-3xl border border-white/10 ${cardGrad}`}>
                <p className="text-white/80 leading-relaxed text-sm">
                  The term "Personal Data" refers to information that does or is capable of identifying you as an individual. Personal Data may include the following: name, username, date of birth, and contact data (i.e. email address, phone number and team affiliations). No sensitive information will be collected regarding the user. We may also collect information that is related to you but that does not personally identify you ("Non-Personal Data"). Non-Personal Data includes information that could personally identify you in its original form, but that we have modified (for instance, by aggregating, anonymizing or de-identifying such information) to remove or obscure any Personal Data.
                </p>
              </div>
            </motion.div>

            {/* Information Collected */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Information Collected</h2>
              <div className={`p-6 md:p-8 rounded-3xl border border-white/10 ${cardGrad} space-y-4`}>
                <p className="text-white/80 leading-relaxed text-sm">
                  The type of information we collect or process from or about you will depend on how you interact with SCRUMMY. When you submit Personal Data or we collect it directly from you through our mobile application or through use of our services, SCRUMMY is the data controller of your Personal Data.
                </p>
                <p className="text-white/80 leading-relaxed text-sm">
                  SCRUMMY may collect Technical Information about you when you use our mobile application. "Technical Information" is information that does not, by itself, identify a specific individual but which could be used to indirectly identify you. Our servers automatically record Technical Information, which may include your device identifier, device type, operating system version, app version, and the date and time of your app usage.
                </p>
              </div>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">How We Use Your Information</h2>
              <div className={`p-6 md:p-8 rounded-3xl border border-white/10 ${cardGrad}`}>
                <p className="text-white/80 leading-relaxed text-sm mb-4">We use your personal information to:</p>
                <ul className="space-y-3 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Provide and maintain the SCRUMMY app and its features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Process your votes and fantasy team selections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Send you live match updates and notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Personalize your rugby experience and content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Improve our services and develop new features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Respond to your inquiries and provide customer support</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Your Rights</h2>
              <div className={`p-6 md:p-8 rounded-3xl border border-white/10 ${cardGrad}`}>
                <p className="text-white/80 leading-relaxed text-sm mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="space-y-3 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Access and receive a copy of your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Rectify inaccurate or incomplete personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Request deletion of your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Object to processing of your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F9C94E] mt-1">•</span>
                    <span>Withdraw consent where processing is based on consent</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Contact Us</h2>
              <div className={`p-6 md:p-8 rounded-3xl border border-white/10 ${cardGrad}`}>
                <p className="text-white/80 leading-relaxed text-sm mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="text-white/70 text-sm space-y-2">
                  <p><span className="text-[#F9C94E]">Email:</span> info@scrummy-app.ai</p>
                  <p><span className="text-[#F9C94E]">Company:</span> Athstat.io</p>
                  <p><span className="text-[#F9C94E]">Address:</span> 40736 Chevington Ln, Leesburg, VA 20175, United States</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
