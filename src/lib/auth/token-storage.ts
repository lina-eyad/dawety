/**
 * Access-token storage.
 *
 * PLACEHOLDER: this uses `localStorage` only so the axios interceptor has a
 * working token source during foundation development. For production, swap this
 * for httpOnly, Secure, SameSite cookies set by the backend (tokens in JS-readable
 * storage are exposed to XSS). Keeping every read/write behind this module means
 * that swap is a single-file change — nothing else references the storage key.
 */
const ACCESS_TOKEN_KEY = "invitera.accessToken";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
}
