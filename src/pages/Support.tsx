import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Mail, MessageCircle, Phone, HelpCircle, User, Bug, Star, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Support: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#D0E3FF]">
      {/* Header Navigation */}
      <header className="bg-scrummy-navy shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-scrummy-goldYellow transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to SCRUMMY</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-white hover:text-scrummy-goldYellow transition-colors">
                Home
              </Link>
              <Link to="/download" className="text-white hover:text-scrummy-goldYellow transition-colors">
                Download
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-scrummy-goldYellow transition-colors"
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
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 border-t border-scrummy-goldYellow/20"
            >
              <div className="space-y-2 pt-4">
                <Link to="/" className="block text-white hover:text-scrummy-goldYellow transition-colors py-2">
                  Home
                </Link>
                <Link to="/download" className="block text-white hover:text-scrummy-goldYellow transition-colors py-2">
                  Download
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-scrummy-navy via-scrummy-blue to-blue-900">
          <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-br from-scrummy-goldYellow/20 to-yellow-500/20 transform skew-x-12 translate-x-16 md:translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-28 md:w-56 h-full bg-gradient-to-tr from-green-500/15 to-teal-500/15 transform -skew-x-12 -translate-x-14 md:-translate-x-28"></div>
        </div>

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white mb-6"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Help & Support</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              SCRUMMY Support
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Get help with the ultimate rugby fantasy app
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navy mb-4">Get Help</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're here to help! Choose the best way to get support for your SCRUMMY experience.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {/* Email Support */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-scrummy-goldYellow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-scrummy-navy" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-scrummy-navy mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-4">Get detailed help via email</p>
                  </div>

                  <Button 
                    className="bg-scrummy-navy text-white hover:bg-scrummy-blue w-full"
                    onClick={() => window.open('mailto:info@scrummy-app.ai?subject=SCRUMMY App Support', '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    info@scrummy-app.ai
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* In-App Support */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-scrummy-goldYellow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto">
                    <MessageCircle className="w-8 h-8 text-scrummy-navy" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-scrummy-navy mb-2">In-App Help</h3>
                    <p className="text-gray-600 mb-4">Access help directly in the app</p>
                  </div>

                  <Button 
                    className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold w-full"
                    onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scrummy', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Open SCRUMMY App
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bug Reports */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-scrummy-goldYellow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-scrummy-goldYellow rounded-full flex items-center justify-center mx-auto">
                    <Bug className="w-8 h-8 text-scrummy-navy" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-scrummy-navy mb-2">Report Issues</h3>
                    <p className="text-gray-600 mb-4">Use our online form to report bugs</p>
                  </div>

                  <Button 
                    className="bg-red-600 text-white hover:bg-red-700 w-full"
                    onClick={() => window.open('https://form.jotform.com/251844112364149', '_blank')}
                  >
                    <Bug className="w-4 h-4 mr-2" />
                    Report Bug
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find answers to common questions about SCRUMMY
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-scrummy-navy">{faq.question}</CardTitle>
                      {expandedFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-scrummy-goldYellow" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-scrummy-goldYellow" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFAQ === index && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Information */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <Card className="bg-scrummy-navy/5 border-scrummy-goldYellow/30">
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-scrummy-navy mb-4">About SCRUMMY</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    SCRUMMY is the ultimate rugby fantasy app that lets you vote for your favorite players and teams, 
                    follow live scores, and connect with rugby fans across Africa and beyond.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-bold text-scrummy-navy mb-3">Key Features</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Vote for your favorite teams and players</li>
                      <li>• Follow live match scores and updates</li>
                      <li>• Access detailed player and team statistics</li>
                      <li>• Join the rugby community and discussions</li>
                      <li>• Get notifications about your favorite teams</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-scrummy-navy mb-3">App Information</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Developer: Athstat.io</li>
                      <li>• Available on iOS and Android</li>
                      <li>• Free to download and use</li>
                      <li>• Regular updates with new features</li>
                      <li>• Supports multiple languages</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="flex items-center justify-center gap-2 text-scrummy-goldYellow mb-4">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-gray-600">
                    Join thousands of rugby fans already using SCRUMMY
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Don't Have SCRUMMY Yet?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Download the app to start voting, following live scores, and connecting with rugby fans worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold flex-1"
                onClick={() => window.open('https://apps.apple.com/us/app/scrummy-fantasy-rugby/id6744964910', '_blank')}
              >
                Download for iOS
              </Button>
              <Button 
                className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold flex-1"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scrummy&pcampaignid=web_share', '_blank')}
              >
                Download for Android
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Support; 