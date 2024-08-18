import { getCookie } from './getCookie';

/**
 * Checks if the user is logged in by verifying the presence of the user_id cookie.
 * @returns {boolean} - Returns true if the user is logged in, false otherwise.
 */
export function isLoggedIn(): boolean {
  const userId = getCookie('user_id');
  return Boolean(userId);
}
