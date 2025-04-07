
import React, { useState, useEffect } from 'react';
import ThreeScene from '../components/ThreeScene';
import CountdownTimer from '../components/CountdownTimer';
import WaitlistForm from '../components/WaitlistForm';
import Logo from '../components/Logo';

const Index: React.FC = () => {
  const [launchDate, setLaunchDate] = useState(new Date());
  
  useEffect(() => {
    // Set launch date to 30 days from now
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    setLaunchDate(futureDate);
  }, []);

  return (
    <>
      <ThreeScene />
      
      <div className="content-container min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
          <Logo className="mb-8" />
          
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-scrummy-navy text-center mb-6 tracking-wider">
            FANTASY RUGBY
            <br />
            <span className="text-scrummy-blue">REIMAGINED</span>
          </h1>
          
          <p className="text-lg md:text-xl text-center max-w-2xl mb-12 text-scrummy-navy">
            Build your ultimate rugby team. Weekly thrills. Compete against 
            friends and rugby pros. Launching soon!
          </p>
          
          <div className="mb-12 w-full flex justify-center">
            <CountdownTimer targetDate={launchDate} />
          </div>
          
          <div className="mb-6 w-full flex justify-center">
            <WaitlistForm />
          </div>
          
          <p className="text-sm text-scrummy-navy mt-4 text-center">
            Spots are limited—reserve your early access now!
          </p>
          
          <div className="mt-20 flex flex-col items-center">
            <h2 className="font-orbitron text-2xl font-bold text-scrummy-navy mb-4">
              Features Coming Soon
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg shadow-lg flex flex-col items-center">
                <div className="bg-scrummy-navy w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 6H22V18H17V6Z" fill="#FFD700" />
                    <path d="M2 6H7V18H2V6Z" fill="#FFD700" />
                    <path d="M9 8H15V16H9V8Z" fill="#FFD700" />
                  </svg>
                </div>
                <h3 className="font-orbitron font-bold text-xl text-scrummy-navy mb-2">
                  Real-Time Scoring
                </h3>
                <p className="text-center text-scrummy-navy">
                  Watch your team score points live during matches with our advanced tracking system
                </p>
              </div>
              
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg shadow-lg flex flex-col items-center">
                <div className="bg-scrummy-navy w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="5" fill="#FFD700" />
                    <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" fill="#FFD700" />
                  </svg>
                </div>
                <h3 className="font-orbitron font-bold text-xl text-scrummy-navy mb-2">
                  Private Leagues
                </h3>
                <p className="text-center text-scrummy-navy">
                  Create exclusive leagues to compete against friends, family, or colleagues
                </p>
              </div>
              
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg shadow-lg flex flex-col items-center">
                <div className="bg-scrummy-navy w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#FFD700" />
                  </svg>
                </div>
                <h3 className="font-orbitron font-bold text-xl text-scrummy-navy mb-2">
                  Pro Analysis
                </h3>
                <p className="text-center text-scrummy-navy">
                  Get insights from rugby experts to help you build the ultimate winning team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
