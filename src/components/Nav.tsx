import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Smartphone } from "lucide-react";

const Nav: React.FC = () => {
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
            <Link
              to="/download"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-black bg-[linear-gradient(180deg,#F9C94E,#E3B43F)] hover:brightness-105 transition duration-200"
            >
              <Smartphone className="h-4 w-4" />
              Download App
            </Link>
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
                <Link
                  to="/download"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-black bg-[linear-gradient(180deg,#F9C94E,#E3B43F)] hover:brightness-105 transition duration-200"
                >
                  <Smartphone className="h-4 w-4" />
                  Download App
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Nav;

