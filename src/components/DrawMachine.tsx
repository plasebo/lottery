import React, { useState, useEffect } from 'react';
import { Participant } from '../types';
import { WinnerDisplay } from './WinnerDisplay';
import { getAllParticipants } from '../lib/supabase';
import toast from 'react-hot-toast';

export function DrawMachine() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [displayDigits, setDisplayDigits] = useState<string[]>(['0', '0', '0', '0', '0', '0', '0', '0']);

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    setIsLoading(true);
    try {
      const data = await getAllParticipants();
      setParticipants(data);
    } catch (error) {
      console.error('Error loading participants:', error);
      toast.error('Failed to load participants');
    } finally {
      setIsLoading(false);
    }
  };

  const startDraw = async () => {
    if (participants.length === 0) {
      toast.error('No participants available for the draw');
      return;
    }

    setIsDrawing(true);
    setWinner(null);
    
    // Randomly select a winner
    const randomIndex = Math.floor(Math.random() * participants.length);
    const selectedParticipant = participants[randomIndex];
    const winningCode = selectedParticipant.code;
    
    // Start with all digits as 0
    setDisplayDigits(['0', '0', '0', '0', '0', '0', '0', '0']);
    
    // Reveal each digit one by one with animation
    for (let i = 0; i < 8; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setDisplayDigits(prev => {
            const newDigits = [...prev];
            newDigits[i] = winningCode.charAt(i);
            return newDigits;
          });
          resolve(null);
        }, 800);
      });
    }
    
    // Set the selected code
    setSelectedCode(winningCode);
    
    // Small delay before showing the winner
    setTimeout(() => {
      setWinner(selectedParticipant);
      setIsDrawing(false);
    }, 1000);
  };

  const resetDraw = () => {
    setWinner(null);
    setSelectedCode(null);
    setDisplayDigits(['0', '0', '0', '0', '0', '0', '0', '0']);
  };

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading participants...</p>
        </div>
      </div>
    );
  }

  if (winner) {
    return <WinnerDisplay winner={winner} onReset={resetDraw} />;
  }

  return (
    <div className="min-h-[500px] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          Event Lottery Draw
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Ready to select our lucky winner? Click the button below to start the draw!
        </p>
        <p className="mt-4 text-accent-600 dark:text-accent-400 font-medium">
          {participants.length} {participants.length === 1 ? 'participant' : 'participants'} registered
        </p>
      </div>

      {/* Draw machine */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
        <div className="p-8">
          {/* Display */}
          <div className="bg-black p-6 rounded-lg mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:16px_16px] pointer-events-none"></div>
            
            <div className="flex justify-center items-center space-x-2">
              {displayDigits.map((digit, index) => (
                <div 
                  key={index} 
                  className={`w-10 h-16 flex items-center justify-center bg-gray-800 border border-gray-700 rounded-md text-3xl font-mono font-bold transition-all duration-300 ${
                    selectedCode && index < selectedCode.length && digit === selectedCode[index]
                      ? 'text-accent-400 animate-[pulse_0.5s_ease-in-out]'
                      : 'text-gray-300'
                  }`}
                >
                  {digit}
                </div>
              ))}
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-center">
            <button
              onClick={startDraw}
              disabled={isDrawing || participants.length === 0}
              className={`btn-accent px-8 py-4 text-lg flex items-center justify-center space-x-2 ${
                isDrawing ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isDrawing ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Drawing...
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16L16 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Start Draw</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 text-center max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">How it works</h2>
        <ol className="text-left space-y-3 text-gray-600 dark:text-gray-300 list-decimal pl-6">
          <li>Click the "Start Draw" button to begin the random selection process</li>
          <li>The lottery machine will randomly select and reveal a winning code</li>
          <li>The winner's details will be displayed on screen</li>
          <li>Contact the winner to arrange prize collection</li>
        </ol>
      </div>
    </div>
  );
}