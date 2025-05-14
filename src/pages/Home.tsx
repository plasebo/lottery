import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <section className="min-h-[calc(100vh-200px)] py-12 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="text-primary-600 dark:text-primary-400">MNS Lottery</span> for DITEX 2025
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join our exciting lottery draw! Register now with your details and get a unique code for your chance to win an amazing prize.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/register" 
                className="btn-primary px-8 py-3 text-center text-base"
              >
                Register Now
              </Link>
              {isAuthenticated ? (
                <Link 
                  to="/draw" 
                  className="btn-secondary px-8 py-3 text-center text-base"
                >
                  Go to Draw
                </Link>
              ) : null}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="relative pb-[56.25%]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                <div className="text-white text-9xl opacity-20 rotate-12 transform font-bold">
                  <svg width="160" height="160" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="m2 4 2 2h16l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">1</span>
                  <span className="text-gray-600 dark:text-gray-300">Register with your name and phone number</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">2</span>
                  <span className="text-gray-600 dark:text-gray-300">Receive your unique 8-digit lottery code</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">3</span>
                  <span className="text-gray-600 dark:text-gray-300">Wait for the live draw at the event</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">4</span>
                  <span className="text-gray-600 dark:text-gray-300">Win exciting an exciting prize if your code is selected</span></li>
                <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">5</span>
                  <span className="text-gray-600 dark:text-gray-300">We will contact the winner after the draw announcement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}