import React from "react";
import { Link } from "react-router-dom";

const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Footer: React.FC = () => {
  return (
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
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
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
  );
};

export default Footer;

