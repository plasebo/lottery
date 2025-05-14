import React from 'react';
import { Layout } from '../components/Layout';
import { RegistrationForm } from '../components/RegistrationForm';

export function Register() {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-200px)] py-12 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Register for the <span className="text-primary-600 dark:text-primary-400">Lottery Draw</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Enter your details to receive a unique lottery code. This code will be used during the draw to determine the winner.
            </p>
            
            <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-5 border border-primary-100 dark:border-gray-700">
              <h3 className="text-lg font-medium text-primary-800 dark:text-primary-300 mb-3">
                What happens next?
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-600 dark:text-primary-400 flex-shrink-0">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>After registration, you'll receive a unique code</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-600 dark:text-primary-400 flex-shrink-0">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Keep this code safe for the live draw</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-600 dark:text-primary-400 flex-shrink-0">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>If your code is drawn, you win the prize!</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="card flex justify-center">
            <RegistrationForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}