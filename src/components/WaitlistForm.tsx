import React, { useState } from "react";
import { Input } from "./ui/input";

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {isSuccess ? (
        <div className="bg-[#003366]/30  p-6 rounded-xl shadow-lg text-center">
          <div className="text-[#FFC700] text-2xl mb-2">🏉 Thank You!</div>
          <p className="text-white">
            You've been added to our waitlist. We'll notify you when we launch!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3"
        >
          <div className="flex-grow">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email"
              className="h-14 px-5 bg-white/80 rounded-xl text-base border-2 border-white/30 focus:border-[#00A6FF] shadow-lg placeholder:text-gray-500 focus:ring-4 focus:ring-[#00A6FF]/30 transition-all duration-300 w-full"
              aria-label="Email address"
              tabIndex={0}
              disabled={isLoading}
            />
            {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-[#FFC700] hover:bg-[#FFDF00] text-[#003366] font-bold h-14 px-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:hover:transform-none"
            disabled={isLoading}
            tabIndex={0}
            aria-label="Join Waitlist"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#003366]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing
              </span>
            ) : (
              "Join Waitlist"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default WaitlistForm;
