
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex flex-col items-center ${className || ''}`}>
      <svg 
        width="120" 
        height="120" 
        viewBox="0 0 300 300" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="animate-float"
      >
        <ellipse cx="150" cy="150" rx="120" ry="100" transform="rotate(15 150 150)" stroke="#0D1E31" strokeWidth="6" fill="none" />
        <ellipse cx="150" cy="150" rx="120" ry="100" transform="rotate(105 150 150)" stroke="#0D1E31" strokeWidth="6" fill="none" />
        <path d="M150 70 L155 79 L145 79 Z" fill="#FFD700" />
        <path d="M150 230 L155 221 L145 221 Z" fill="#FFD700" />
        <path d="M70 150 L79 155 L79 145 Z" fill="#FFD700" />
        <path d="M230 150 L221 155 L221 145 Z" fill="#FFD700" />
        <path d="M135 115 L140 120 L145 115 L150 120 L155 115 L160 120 L165 115" stroke="#0D1E31" strokeWidth="2" />
      </svg>
      
      <div className="text-scrummy-navy text-3xl font-bold font-orbitron mt-2">
        SCRUMMY
      </div>
    </div>
  );
};

export default Logo;
