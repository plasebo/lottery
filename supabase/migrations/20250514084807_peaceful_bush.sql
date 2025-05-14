/*
  # Create participants table and security policies

  1. New Tables
    - `participants`
      - `id` (int8, primary key)
      - `created_at` (timestamptz, default now())
      - `name` (text, not null)
      - `phone` (text, not null)
      - `code` (text, not null, unique)
  
  2. Security
    - Enable RLS on `participants` table
    - Add policies for:
      - Anyone can create participants (no auth required)
      - Anyone can read participants (no auth required)
      - Ensure unique codes
*/

-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE
);

-- Create index on code for faster lookups
CREATE INDEX IF NOT EXISTS participants_code_idx ON participants(code);

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can create participants" ON participants;
DROP POLICY IF EXISTS "Authenticated users can read all participants" ON participants;

-- Create new policies
CREATE POLICY "Anyone can create participants"
  ON participants
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read participants"
  ON participants
  FOR SELECT
  TO public
  USING (true);