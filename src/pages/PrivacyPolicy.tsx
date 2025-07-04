import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Shield, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const PrivacyPolicy: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <Link to="/support" className="text-white hover:text-scrummy-goldYellow transition-colors">
                Support
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
                <Link to="/support" className="block text-white hover:text-scrummy-goldYellow transition-colors py-2">
                  Support
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
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Privacy & Security</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              SCRUMMY Privacy Policy
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              How we protect and handle your personal information
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content - Introduction */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="mb-8">
              <CardContent className="p-6 md:p-8">
                <p className="text-gray-700 leading-relaxed">
                  This Privacy Policy describes how SCRUMMY collects, holds, processes, uses, and discloses your Personal Data (defined below) when you use our mobile application or access our services. SCRUMMY is a wholly owned entity of Athstat.io, who own the legal rights to all aspects of the SCRUMMY Product and are the legal entity owning the product. For the purposes of this agreement, SCRUMMY is the referenced party for whom the Privacy Policy described herein applies, operating as a legally owned entity of Athstat.io. For purposes of applicable data protection legislation, Athstat.io, and therefore SCRUMMY, are located at 40736 Chevington Ln Leesburg, VA 20175 United States. By providing your Personal Data to SCRUMMY, you agree that you are authorized to provide that information and are accepting this Privacy Policy and any supplementary privacy statement that may be relevant to you. If you do not agree to our practices, please do not register, subscribe, create an account, or otherwise interact with our mobile application and services.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {/* What is Personal Data */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navy mb-6">What is "Personal Data"?</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      The term "Personal Data" refers to information that does or is capable of identifying you as an individual. Personal Data may include the following: name, username, date of birth, and contact data (i.e. email address, phone number and team affiliations). No sensitive information will be collected regarding the user. We may also collect information that is related to you but that does not personally identify you ("Non-Personal Data"). Non-Personal Data includes information that could personally identify you in its original form, but that we have modified (for instance, by aggregating, anonymizing or de-identifying such information) to remove or obscure any Personal Data.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Information Collected */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navy mb-6">Information Collected</h2>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      The type of information we collect or process from or about you will depend on how you interact with SCRUMMY. When you submit Personal Data or we collect it directly from you through our mobile application or through use of our services, SCRUMMY is the data controller of your Personal Data.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      SCRUMMY may collect Technical Information about you when you use our mobile application. "Technical Information" is information that does not, by itself, identify a specific individual but which could be used to indirectly identify you. Our servers automatically record Technical Information, which may include your device identifier, device type, operating system version, app version, and the date and time of your app usage.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* How We Use Your Information */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navy mb-6">How We Use Your Information</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">We use your personal information to:</p>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                          <span>Provide and maintain the SCRUMMY app and its features</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                          <span>Process your votes and fantasy team selections</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                          <span>Send you live match updates and notifications</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                          <span>Personalize your rugby experience and content</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                          <span>Improve our services and develop new features</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                          <span>Respond to your inquiries and provide customer support</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navy mb-6">Your Rights</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Depending on your location, you may have the following rights regarding your personal information:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                        <span>Access and receive a copy of your personal data</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                        <span>Correct inaccurate or incomplete personal data</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                        <span>Delete your personal data under certain circumstances</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                        <span>Object to or restrict the processing of your personal data</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-scrummy-goldYellow rounded-full mt-2 flex-shrink-0"></span>
                        <span>Receive your personal data in a portable format</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      To exercise these rights, please contact us at <a href="mailto:info@scrummy-app.com" className="text-scrummy-navy hover:text-scrummy-blue underline">info@scrummy-app.com</a>.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-scrummy-navy mb-6">Contact Us</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> <a href="mailto:info@scrummy-app.com" className="text-scrummy-navy hover:text-scrummy-blue underline">info@scrummy-app.com</a></p>
                      <p><strong>Address:</strong> Athstat LLC, 40736 Chevington Ln, Leesburg, VA 20175, United States</p>
                      <p><strong>Phone:</strong> +1 321-961-6401</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Last Updated */}
              <div className="text-center py-8">
                <p className="text-gray-600">
                  <strong>Last Updated:</strong> December 2024
                </p>
              </div>
            </div>
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
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join SCRUMMY?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Download the app and start your rugby fantasy journey with confidence in our privacy protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold flex-1"
                onClick={() => window.open('#', '_blank')}
              >
                📱 Download for iOS
              </Button>
              <Button 
                className="bg-scrummy-goldYellow text-scrummy-navy hover:bg-scrummy-gold font-bold flex-1"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.scrummy&pcampaignid=web_share', '_blank')}
              >
                🤖 Download for Android
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy; 