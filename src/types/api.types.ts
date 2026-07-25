import type { AxiosError } from "axios";

/** Standard success envelope returned by the backend. */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/** Shape the backend uses for error payloads (best-effort). */
interface ApiErrorPayload {
  message?: string;
  code?: string;
  details?: Record<string, string[]>;
}

/**
 * Normalized error thrown by the API layer. Every axios failure is converted to
 * this shape by the response interceptor, so callers never deal with raw
 * `AxiosError` objects and can rely on a stable `status` / `code` / `details`.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    code: string,
    details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  static fromAxiosError(error: AxiosError): ApiError {
    if (!error.response) {
      return new ApiError(error.message || "Network error", 0, "NETWORK_ERROR");
    }
    const { status } = error.response;
    const data = error.response.data as ApiErrorPayload | undefined;
    return new ApiError(
      data?.message ?? error.message,
      status,
      data?.code ?? "UNKNOWN_ERROR",
      data?.details,
    );
  }
}
