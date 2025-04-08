import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
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

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Helper for two-digit formatting
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="flex flex-row justify-center gap-4 md:gap-6">
      {/* Days */}
      <div className="flex flex-col items-center">
        <div className="bg-[#003366]/80 backdrop-blur-sm rounded-lg shadow-lg p-3 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center mb-2 transition-all duration-500">
          <span className="text-[#FFC700] text-2xl md:text-4xl font-bold">
            {formatNumber(timeLeft.days)}
          </span>
        </div>
        <span className="text-[#003366] text-xs md:text-sm uppercase tracking-wider">
          Days
        </span>
      </div>

      {/* Hours */}
      <div className="flex flex-col items-center">
        <div className="bg-[#003366]/80 backdrop-blur-sm rounded-lg shadow-lg p-3 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center mb-2 transition-all duration-500">
          <span className="text-[#FFC700] text-2xl md:text-4xl font-bold">
            {formatNumber(timeLeft.hours)}
          </span>
        </div>
        <span className="text-[#003366] text-xs md:text-sm uppercase tracking-wider">
          Hours
        </span>
      </div>

      {/* Minutes */}
      <div className="flex flex-col items-center">
        <div className="bg-[#003366]/80 backdrop-blur-sm rounded-lg shadow-lg p-3 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center mb-2 transition-all duration-500">
          <span className="text-[#FFC700] text-2xl md:text-4xl font-bold">
            {formatNumber(timeLeft.minutes)}
          </span>
        </div>
        <span className="text-[#003366] text-xs md:text-sm uppercase tracking-wider">
          Minutes
        </span>
      </div>

      {/* Seconds */}
      <div className="flex flex-col items-center">
        <div className="bg-[#003366]/80 backdrop-blur-sm rounded-lg shadow-lg p-3 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center mb-2 transition-all duration-500">
          <span className="text-[#FFC700] text-2xl md:text-4xl font-bold">
            {formatNumber(timeLeft.seconds)}
          </span>
        </div>
        <span className="text-[#003366] text-xs md:text-sm uppercase tracking-wider">
          Seconds
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
