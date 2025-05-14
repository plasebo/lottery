import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    setIsAuthenticated(!!data.session);
    return !!data.session;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
    
    setIsAuthenticated(true);
    navigate('/draw');
  }, [navigate]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    navigate('/');
  }, [navigate]);

  return {
    isAuthenticated,
    checkAuth,
    login,
    logout,
  };
}