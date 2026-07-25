"use client";

import { useCallback, useMemo, useReducer } from "react";

import {
  AuthContext,
  type AuthContextValue,
  authReducer,
  initialAuthState,
} from "@/store/auth-context";
import type { LoginCredentials } from "@/types/auth.types";

/**
 * Auth-readiness scaffolding. The state machine, context, and `login`/`logout`
 * surface are real, but there is no backend yet — `login`/`logout` are wired as
 * safe placeholders. When the API is available, implement `login` against the
 * auth service and persist the token via `@/lib/auth/token-storage`.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = useCallback(async (_credentials: LoginCredentials) => {
    // TODO(auth): call the auth service, store the token, then dispatch success.
    dispatch({ type: "AUTH_LOADING" });
  }, []);

  const logout = useCallback(() => {
    // TODO(auth): clear the token via clearAccessToken() when real auth lands.
    dispatch({ type: "AUTH_LOGOUT" });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, login, logout }),
    [state, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
