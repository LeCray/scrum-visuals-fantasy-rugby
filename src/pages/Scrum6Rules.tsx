import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Scrum6Rules: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <header className="bg-scrummy-navy/95 backdrop-blur-md border-b border-scrummy-goldYellow/20 sticky top-0 z-50">
        <div className="w-full pr-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-200 pl-2">
            <img src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" alt="SCRUMMY Logo" className="h-14 w-auto opacity-95 hover:opacity-100" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-scrummy-goldYellow font-medium transition-colors">Home</Link>
            <Link to="/fixtures" className="text-white hover:text-scrummy-goldYellow font-medium transition-colors">Fixtures</Link>
            <Link to="/scrum6-leaderboard" className="text-white hover:text-scrummy-goldYellow font-medium transition-colors">Leaderboard</Link>
            <Link to="/about" className="text-white hover:text-scrummy-goldYellow font-medium transition-colors">About</Link>
            <Link to="/download" className="bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-4 py-2 rounded-md transition-colors">Download App</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <img src="/assets/Scrummy-logo/SCRUMMY Logo Exception_On Dark BG (3).svg" alt="SCRUMMY Logo" className="h-16 w-auto mr-4" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-scrummy-navy mb-4">Official Rules</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-scrummy-blue mb-6">SCRUM6 Challenge</h2>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/scrum6-leaderboard"
              className="inline-flex items-center bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold px-6 py-3 rounded-lg transition-colors shadow-lg"
            >
              ← Back to Leaderboard
            </Link>
            
            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 rounded-xl p-3 shadow-lg cursor-pointer transition-all hover:from-gray-100 hover:to-gray-200 hover:border-gray-300/70 hover:scale-105 hover:shadow-xl active:scale-95"
                onClick={() => window.open('https://apps.apple.com/us/app/scrummy-fantasy-rugby/id6744964910', '_blank')}
              >
                <img 
                  src="/assets/Store badges/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" 
                  alt="Download on the App Store"
                  className="h-10 w-auto"
                />
              </button>
              
              <button 
                className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 rounded-xl p-3 shadow-lg cursor-pointer transition-all hover:from-gray-100 hover:to-gray-200 hover:border-gray-300/70 hover:scale-105 hover:shadow-xl active:scale-95"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scrummy&pcampaignid=web_share', '_blank')}
              >
                <img 
                  src="/assets/Store badges/GetItOnGooglePlay_Badge_Web_color_English.png" 
                  alt="Get it on Google Play"
                  className="h-10 w-auto"
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Rules Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-8"
        >
          <div className="bg-scrummy-goldYellow/10 p-6 rounded-lg border border-scrummy-goldYellow/30">
            <p className="font-semibold text-scrummy-navy mb-2 text-lg">Sponsor:</p>
            <p className="text-gray-700">This promotion is sponsored by ATHSTAT, Inc., (d/b/a SCRUMMY) a Delaware Corporation. ("Sponsor").</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-scrummy-navy mb-4">1. Eligibility</h3>
            <p className="text-gray-700 leading-relaxed">Open to legal residents of jurisdictions where participation is permitted by law, who are eighteen (18) years of age or older at the time of entry. Employees, officers, and directors of Sponsor and their immediate families (spouse, parents, children, siblings) or household members are not eligible. Void where prohibited by law.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-scrummy-navy mb-4">2. How to Enter</h3>
            <p className="text-gray-700 leading-relaxed">Participation is free. No purchase necessary. To enter, visit <a href="https://scrummy-app.com/" className="text-blue-600 hover:underline font-semibold">https://scrummy-app.com/</a> to download the SCRUMMY app for free at Apple's App Store or Google Play, create an account, and participate in the weekly SCRUM6 Challenge by selecting players as directed. Each of the three (3) weekly challenges begins at 9/10/25 at 12:01AM EST and ends at 9/13/25 at 12:01AM EST, 9/16/25 at 12:01AM EST and ends at 9/20/25 at 12:01AM EST, and 9/23/25 at 12:01AM EST and ends 9/27/25 at 12:01AM EST. All entries must comply with these Official Rules.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-scrummy-navy mb-4">3. Weekly Challenge Format</h3>
            <p className="text-gray-700 leading-relaxed">Each week, participants will select players and accumulate points based on the fantasy scoring system described on <a href="https://scrummy-app.com/" className="text-blue-600 hover:underline font-semibold">https://scrummy-app.com/</a>. Weekly challenges reset at the start of each week per the dates given in section 2: How to Enter. The Global Leaderboard will display scores and rankings based on eligible entries.</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-4">4. Prizes 🏆</h3>
            <div className="space-y-3">
              <p className="text-green-700 text-lg"><strong>Top three (3) Weekly Winners:</strong> At the close of each weekly challenge, the three (3) participants with the highest point totals on the SCRUM6 Challenge Leaderboard will each receive one (1) "Swag Bag," consisting of Sponsor-selected merchandise (e.g., shirts, jerseys).</p>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-green-800 font-bold text-xl">💰 Approximate Retail Value: $150 each</p>
              </div>
              <p className="text-green-700">Prizes are awarded "as is," without warranty of any kind. Prizes are non-transferable, not redeemable for cash, and may not be substituted, except by Sponsor at its sole discretion. All federal, state, and local taxes, if any, are the sole responsibility of each winner.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-scrummy-navy mb-4">5. Winner Notification</h3>
            <p className="text-gray-700 leading-relaxed">Winners will be notified via the email address associated with their account within three (3) days after the close of each weekly challenge. Winners must respond within five (5) days of notification to claim their prize. If a winner does not respond in time, or if eligibility cannot be verified, an alternate winner may be selected at Sponsor's discretion.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-scrummy-navy mb-4">6. General Conditions</h3>
            <p className="text-gray-700 leading-relaxed">Sponsor reserves the right to verify eligibility and disqualify any entrant suspected of tampering with the contest, engaging in fraud, or otherwise violating these Official Rules. Sponsor may cancel, modify, or suspend the contest if it becomes technically corrupted or otherwise cannot be conducted as originally planned.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-scrummy-navy mb-4">7. Limitation of Liability</h3>
            <p className="text-gray-700 leading-relaxed">By participating, entrants release and hold harmless Sponsor, its affiliates, subsidiaries, advertising and promotion agencies, and their respective officers, directors, employees, and agents from any liability for injuries, losses, or damages of any kind arising from participation or prize acceptance/use. Sponsor is not responsible for technical malfunctions, lost entries, or human error.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-scrummy-navy mb-4">8. Governing Law</h3>
            <p className="text-gray-700 leading-relaxed">This contest is governed by the laws of the State of New York, USA. Any disputes arising under these Official Rules will be resolved exclusively by the state or federal courts located in New York County, NY.</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-scrummy-navy mb-4">9. Privacy</h3>
            <p className="text-gray-700 leading-relaxed">Information collected from entrants will be used solely for administration of the contest and otherwise in accordance with By entering this contest, you grant SCRUMMY the right to use your name, username/handle, likeness, image, and any submitted content for promotional purposes, including but not limited to announcements on social media, without additional compensation or notice, except where prohibited by law. Corporate privacy act can be found: <Link to="/privacy" className="text-blue-600 hover:underline font-semibold">https://scrummy-app.com/#/privacy</Link></p>
          </div>


          <div className="bg-gray-50 p-6 rounded-lg border-t-4 border-scrummy-navy">
            <h4 className="font-bold text-gray-800 mb-3 text-xl">Website/App Disclaimer:</h4>
            <p className="text-gray-600 leading-relaxed">This is a free-to-play fantasy challenge. No purchase necessary. Void where prohibited. Open to legal residents, 18+. Top three (3) leaderboard participants each week receive merchandise prizes. Prizes are promotional, not redeemable for cash. Contest governed by New York law.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-200">
            <Link 
              to="/scrum6-leaderboard"
              className="bg-scrummy-navy text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors text-center shadow-lg"
            >
              🏆 View Current Leaderboard
            </Link>
            <Link 
              to="/download"
              className="bg-scrummy-goldYellow text-scrummy-navy font-bold px-8 py-4 rounded-lg hover:bg-scrummy-gold transition-colors text-center shadow-lg"
            >
              📱 Download App & Join Challenge
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Scrum6Rules;