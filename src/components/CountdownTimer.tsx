
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = Number(targetDate) - Date.now();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      } else {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
    };

    setTimeLeft(calculateTimeLeft());

    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 w-full max-w-lg">
      <div className="flex flex-col items-center">
        <div className="bg-scrummy-navy text-white font-orbitron font-bold text-3xl md:text-4xl p-4 rounded-lg shadow-lg w-full text-center animate-pulse-light">
          {timeLeft.days}
        </div>
        <span className="text-sm mt-2 text-scrummy-navy font-medium">Days</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-scrummy-navy text-white font-orbitron font-bold text-3xl md:text-4xl p-4 rounded-lg shadow-lg w-full text-center animate-pulse-light">
          {timeLeft.hours}
        </div>
        <span className="text-sm mt-2 text-scrummy-navy font-medium">Hours</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-scrummy-navy text-white font-orbitron font-bold text-3xl md:text-4xl p-4 rounded-lg shadow-lg w-full text-center animate-pulse-light">
          {timeLeft.minutes}
        </div>
        <span className="text-sm mt-2 text-scrummy-navy font-medium">Minutes</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-scrummy-navy text-white font-orbitron font-bold text-3xl md:text-4xl p-4 rounded-lg shadow-lg w-full text-center animate-pulse-light">
          {timeLeft.seconds}
        </div>
        <span className="text-sm mt-2 text-scrummy-navy font-medium">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
