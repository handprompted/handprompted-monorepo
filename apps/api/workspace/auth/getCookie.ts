/**
 * Gets the value of a cookie by name.
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string | null} - The value of the cookie, or null if not found.
 */

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
