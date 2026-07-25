/** Authentication lifecycle state. */
export type AuthStatus =
  "idle" | "loading" | "authenticated" | "unauthenticated";

/** Minimal user shape. Extend as the backend contract firms up. */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

/** Credentials placeholder for the future login flow. */
export interface LoginCredentials {
  email: string;
  password: string;
}
