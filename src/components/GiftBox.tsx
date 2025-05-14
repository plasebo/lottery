import React from 'react';

export function GiftBox() {
  return (
    <div className="animate-bounce-slow">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-accent-500 rounded-md shadow-lg transform rotate-45"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-accent-300 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-600">
              <path d="M20 12v10H4V12"></path>
              <path d="M2 7h20v5H2z"></path>
              <path d="M12 22V7"></path>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}