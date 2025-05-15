/*
  # Add winner column to participants table

  1. Changes
    - Add `is_winner` column to participants table
    - Default value is false
    - Add index for faster winner queries
*/

-- Add winner column
ALTER TABLE participants ADD COLUMN IF NOT EXISTS is_winner BOOLEAN DEFAULT false;

-- Create index for winner status
CREATE INDEX IF NOT EXISTS participants_winner_idx ON participants(is_winner);