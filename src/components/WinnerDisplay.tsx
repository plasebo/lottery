import React, { useEffect, useState } from 'react';
import { Participant } from '../types';
import { ParticipantCard } from './ParticipantCard';
import Confetti from 'react-confetti';

interface WinnerDisplayProps {
  winner: Participant;
  onReset: () => void;
}

export function WinnerDisplay({ winner, onReset }: WinnerDisplayProps) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    // Stop confetti after 8 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          We Have a Winner!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Congratulations to our lucky winner! The winner will be contacted soon.
        </p>
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="transform transition-all duration-500 animate-[bounce_1s_ease-in-out]">
          <ParticipantCard participant={winner} isWinner />
        </div>
      </div>
      
      <div className="mt-12">
        <button
          onClick={onReset}
          className="btn-primary"
        >
          Draw Again
        </button>
      </div>
    </div>
  );
}