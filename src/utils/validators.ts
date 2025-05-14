/**
 * Validates a person's name
 * @param name The name to validate
 * @returns Error message or null if valid
 */
export function validateName(name: string): string | null {
  if (!name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  return null;
}

/**
 * Validates a phone number
 * @param phone The phone number to validate
 * @returns Error message or null if valid
 */
export function validatePhone(phone: string): string | null {
  if (!phone.trim()) {
    return 'Phone number is required';
  }
  
  // Remove any non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if phone has at least 8 digits
  if (digitsOnly.length < 8) {
    return 'Phone number must have at least 8 digits';
  }
  
  // Check if phone has fewer than 16 digits
  if (digitsOnly.length > 15) {
    return 'Phone number is too long';
  }
  
  return null;
}