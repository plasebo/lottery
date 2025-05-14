import React from 'react';
import { Participant } from '../types';
import { GiftBox } from './GiftBox';

interface ParticipantCardProps {
  participant: Participant;
  isWinner?: boolean;
}

export function ParticipantCard({ participant, isWinner = false }: ParticipantCardProps) {
  return (
    <div 
      className={`lottery-ticket relative ${
        isWinner 
          ? 'border-4 border-accent-500 ring-4 ring-accent-300 scale-105' 
          : ''
      }`}
    >
      {isWinner && (
        <div className="absolute -top-3 -right-3 z-10">
          <GiftBox />
        </div>
      )}
      
      <div className="flex flex-col items-start gap-2">
        <div className={`text-xs uppercase tracking-wider font-semibold ${
          isWinner ? 'text-accent-600' : 'text-primary-600'
        }`}>
          {isWinner ? 'Winner!' : 'Participant'}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{participant.name}</h3>
        
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{participant.phone}</span>
        </div>
        
        <div className={`mt-4 font-mono text-lg font-bold p-2 rounded-lg w-full text-center border ${
          isWinner 
            ? 'bg-accent-100 text-accent-800 border-accent-300 dark:bg-accent-900 dark:text-accent-200 dark:border-accent-700' 
            : 'bg-primary-50 text-primary-800 border-primary-200 dark:bg-primary-900 dark:text-primary-200 dark:border-primary-700'
        }`}>
          {participant.code}
        </div>
      </div>
    </div>
  );
}