/**
 * Generates a random 8-digit numeric code
 */
export function generateRandomCode(): string {
  // Generate a random number between 10000000 and 99999999
  const randomNum = Math.floor(10000000 + Math.random() * 90000000);
  return randomNum.toString();
}

/**
 * Generates a unique 8-digit code that doesn't exist in the provided set
 * @param existingCodes Set of existing codes to avoid duplicates
 */
export async function generateUniqueCode(checkCodeExists: (code: string) => Promise<boolean>): Promise<string> {
  let code = generateRandomCode();
  let attempts = 0;
  const maxAttempts = 10; // Prevent infinite loops
  
  while (await checkCodeExists(code) && attempts < maxAttempts) {
    code = generateRandomCode();
    attempts++;
  }
  
  if (attempts >= maxAttempts) {
    throw new Error('Unable to generate unique code after multiple attempts');
  }
  
  return code;
}