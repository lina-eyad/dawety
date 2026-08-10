"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { toast } from "sonner";

import { clearAccessToken, setAccessToken } from "@/lib/auth/token-storage";
import {
  AuthContext,
  type AuthContextValue,
  authReducer,
  initialAuthState,
} from "@/store/auth-context";
import type { User } from "@/types/auth.types";

const USER_KEY = "invitera.user";

/**
 * Client-side auth. Email delivers a one-time code and Google is a one-tap
 * sign-in; both resolve to a persisted session (localStorage) so a refresh
 * keeps the user signed in.
 *
 * DEMO: there is no backend yet, so the email code is generated and surfaced
 * in a toast instead of being mailed, and Google is simulated. Replace
 * `requestEmailCode`/`verifyEmailCode`/`loginWithGoogle` with real calls
 * (mailer/OTP + OAuth) — the rest of the app already reads `useAuth()`.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const pending = useRef<{ email: string; code: string } | null>(null);

  // Restore an existing session on load.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      if (raw)
        dispatch({ type: "AUTH_SUCCESS", user: JSON.parse(raw) as User });
      else dispatch({ type: "AUTH_LOGOUT" });
    } catch {
      dispatch({ type: "AUTH_LOGOUT" });
    }
  }, []);

  const signIn = useCallback((user: User) => {
    setAccessToken(`demo.${Math.random().toString(36).slice(2)}.${Date.now()}`);
    try {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      /* ignore quota/availability errors */
    }
    dispatch({ type: "AUTH_SUCCESS", user });
  }, []);

  const requestEmailCode = useCallback(async (email: string) => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    pending.current = { email, code };
    toast.info(`رمز الدخول: ${code}`, {
      description: "نسخة تجريبية — لا يوجد إرسال بريد فعلي بعد.",
    });
    return code;
  }, []);

  const verifyEmailCode = useCallback(
    async (code: string) => {
      const p = pending.current;
      if (!p || p.code !== code.trim()) return false;
      const name = p.email.split("@")[0] || "مستخدم";
      signIn({ id: `u_${Date.now()}`, name, email: p.email });
      pending.current = null;
      return true;
    },
    [signIn],
  );

  const loginWithGoogle = useCallback(async () => {
    dispatch({ type: "AUTH_LOADING" });
    signIn({
      id: "u_google",
      name: "مستخدم Google",
      email: "user@gmail.com",
    });
  }, [signIn]);

  const logout = useCallback(() => {
    clearAccessToken();
    try {
      window.localStorage.removeItem(USER_KEY);
    } catch {
      /* ignore */
    }
    dispatch({ type: "AUTH_LOGOUT" });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      requestEmailCode,
      verifyEmailCode,
      loginWithGoogle,
      logout,
    }),
    [state, requestEmailCode, verifyEmailCode, loginWithGoogle, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
