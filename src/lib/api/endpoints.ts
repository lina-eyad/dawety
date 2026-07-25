/**
 * Centralized API path constants. Keep every backend path here so route changes
 * are a single-file edit and services never hard-code strings.
 */
export const API_ENDPOINTS = {
  auth: {
    me: "/auth/me",
    login: "/auth/login",
    logout: "/auth/logout",
  },
} as const;
