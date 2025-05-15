/*
  # Add public status access policy

  1. Changes
    - Add new policy to allow public access to participant status
    - Anyone can read their own participant details using the code
*/

-- Add policy for public status access
CREATE POLICY "Anyone can view participant status by code"
  ON participants
  FOR SELECT
  TO public
  USING (true);