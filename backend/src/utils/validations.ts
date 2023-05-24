/**
 * Validates if an email is well formatted.
 * 
 * @param {string} email The email to be validated.
 * @returns {boolean} Returns true if the email is well formatted, false otherwise.
 * 
 * @example
 * isValidEmail('test@test.com'); // true
 * isValidEmail('test@test'); // false
 * isValidEmail('test'); // false
 */
export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
