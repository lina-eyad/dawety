import axios, { type AxiosError } from "axios";

import { clearAccessToken, getAccessToken } from "@/lib/auth/token-storage";
import { ApiError } from "@/types/api.types";

/**
 * Shared axios instance for all backend calls.
 *
 * The backend does not exist yet — `baseURL` points at a placeholder that is
 * overridden by `NEXT_PUBLIC_API_URL` in each environment. Services should
 * import this instance rather than calling axios directly, so auth headers and
 * error normalization apply everywhere.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://api.invitera.example/v1",
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

// Request: attach the bearer token when present.
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: pass successes through; normalize every failure to `ApiError`.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearAccessToken();
      // TODO(auth): redirect to the login route once it exists.
    }
    return Promise.reject(ApiError.fromAxiosError(error));
  },
);
