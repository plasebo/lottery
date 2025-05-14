import { useState, useEffect } from 'react';
import { Participant } from '../types';
import { getAllParticipants } from '../lib/supabase';
import toast from 'react-hot-toast';

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      setIsLoading(true);
      try {
        const data = await getAllParticipants();
        setParticipants(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching participants:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch participants'));
        toast.error('Failed to load participants');
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return {
    participants,
    isLoading,
    error,
    refetch: async () => {
      setIsLoading(true);
      try {
        const data = await getAllParticipants();
        setParticipants(data);
        setError(null);
      } catch (err) {
        console.error('Error refetching participants:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch participants'));
        toast.error('Failed to reload participants');
      } finally {
        setIsLoading(false);
      }
    },
  };
}