import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { getParticipantByCode, getWinners } from '../lib/supabase';
import { Participant } from '../types';
import { ParticipantCard } from '../components/ParticipantCard';
import toast from 'react-hot-toast';

export function Status() {
  const { code } = useParams<{ code: string }>();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [winners, setWinners] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!code) {
        setError('No lottery code provided');
        setIsLoading(false);
        return;
      }

      try {
        const [participantData, winnersData] = await Promise.all([
          getParticipantByCode(code),
          getWinners()
        ]);
        
        setParticipant(participantData);
        setWinners(winnersData);
        setError(null);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Could not find participant with this code');
        toast.error('Failed to load participant details');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [code]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[500px] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !participant) {
    return (
      <Layout>
        <div className="min-h-[500px] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Participant Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {error || 'The lottery code you\'re looking for doesn\'t exist. Please check the code and try again.'}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const isWinner = participant.is_winner;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              DITEX 2025 Lottery Status
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Here are your lottery details and current draw status
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Your Entry
              </h2>
              <ParticipantCard 
                participant={participant} 
                isWinner={isWinner}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Draw Status
              </h2>
              
              <div className="card p-6">
                {winners.length > 0 ? (
                  <div>
                    <div className="text-lg font-semibold text-accent-600 dark:text-accent-400 mb-4">
                      Winners Announced!
                    </div>
                    {isWinner ? (
                      <div className="bg-accent-50 dark:bg-accent-900 p-4 rounded-lg border border-accent-200 dark:border-accent-700">
                        <p className="text-accent-800 dark:text-accent-200 font-bold text-xl mb-2">
                          Congratulations! You've Won! 🎉
                        </p>
                        <p className="text-accent-600 dark:text-accent-300">
                          Please wait for our team to contact you about your prize.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          The winners are:
                        </p>
                        <div className="space-y-4">
                          {winners.map((winner, index) => (
                            <div key={winner.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-mono text-primary-600 dark:text-primary-400 mt-1">
                                    Code: {winner.code}
                                  </p>
                                </div>
                                <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm">
                                  Winner #{index + 1}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4">
                      Draw Pending
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      The lottery draw will take place at the end of DITEX 2025. Check back here to see if you've won!
                    </p>
                    <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900 rounded-lg border border-primary-200 dark:border-primary-700">
                      <p className="text-primary-800 dark:text-primary-200 text-sm">
                        Keep your code safe and stay tuned for the results!
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}