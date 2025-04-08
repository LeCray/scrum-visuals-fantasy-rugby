import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex items-center justify-center ${className || ""}`}>
      <img
        src="/assets/logo.png"
        alt="SCRUMMY Fantasy Rugby"
        className={`w-auto ${isMobile ? "h-16" : "h-32"}`}
        style={{
          height: isMobile ? 200 : 300,
          marginBottom: -50,
          marginTop: -10,
        }}
      />
    </div>
  );
};

export default Logo;
