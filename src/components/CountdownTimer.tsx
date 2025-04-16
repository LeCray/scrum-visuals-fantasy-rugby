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

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Update immediately and then every second
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-row justify-center gap-4 md:gap-6">
      {/* Days */}
      <div className="flex flex-col items-center">
        <div className="bg-[#003366]/80 backdrop-blur-sm rounded-lg shadow-lg p-3 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center mb-2">
          <span className="text-[#FFC700] text-2xl md:text-4xl font-bold">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
        </div>
        <span className="text-[#003366] text-xs md:text-sm uppercase tracking-wider">
          DAYS
        </span>
      </div>

      {/* Hours */}
      <div className="flex flex-col items-center">
        <div className="bg-[#003366]/80 backdrop-blur-sm rounded-lg shadow-lg p-3 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center mb-2">
          <span className="text-[#FFC700] text-2xl md:text-4xl font-bold">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
        </div>
        <span className="text-[#003366] text-xs md:text-sm uppercase tracking-wider">
          HOURS
        </span>
      </div>

      {/* Minutes */}
      <div className="flex flex-col items-center">
        <div className="bg-[#003366]/80 backdrop-blur-sm rounded-lg shadow-lg p-3 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center mb-2">
          <span className="text-[#FFC700] text-2xl md:text-4xl font-bold">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
        </div>
        <span className="text-[#003366] text-xs md:text-sm uppercase tracking-wider">
          MINUTES
        </span>
      </div>

      {/* Seconds */}
      <div className="flex flex-col items-center">
        <div className="bg-[#003366]/80 backdrop-blur-sm rounded-lg shadow-lg p-3 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center mb-2">
          <span className="text-[#FFC700] text-2xl md:text-4xl font-bold">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
        <span className="text-[#003366] text-xs md:text-sm uppercase tracking-wider">
          SECONDS
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
