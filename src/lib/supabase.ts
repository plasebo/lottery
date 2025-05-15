import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Replace with your Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function createParticipant(name: string, phone: string, code: string) {
  const { data, error } = await supabase
    .from('participants')
    .insert([{ name, phone, code }])
    .select();
  
  if (error) throw error;
  return data?.[0];
}

export async function checkCodeExists(code: string) {
  const { data, error } = await supabase
    .from('participants')
    .select('code')
    .eq('code', code);
  
  if (error) throw error;
  return data.length > 0;
}

export async function getAllParticipants() {
  const { data, error } = await supabase
    .from('participants')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function getParticipantByCode(code: string) {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .eq('code', code)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getWinners() {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .eq('is_winner', true)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function setWinner(id: number) {
  const { error } = await supabase
    .from('participants')
    .update({ is_winner: true })
    .eq('id', id);
  
  if (error) throw error;
}