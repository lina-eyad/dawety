"use client";

import { createContext } from "react";

import type { AuthStatus, User } from "@/types/auth.types";

export interface AuthState {
  status: AuthStatus;
  user: User | null;
}

export type AuthAction =
  | { type: "AUTH_LOADING" }
  | { type: "AUTH_SUCCESS"; user: User }
  | { type: "AUTH_LOGOUT" };

export const initialAuthState: AuthState = {
  status: "unauthenticated",
  user: null,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_LOADING":
      return { ...state, status: "loading" };
    case "AUTH_SUCCESS":
      return { status: "authenticated", user: action.user };
    case "AUTH_LOGOUT":
      return { status: "unauthenticated", user: null };
    default:
      return state;
  }
}

export interface AuthContextValue extends AuthState {
  /** Send a one-time login code to the email. Returns the code (demo: no
   *  email backend yet — swap for the real mailer/OTP service). */
  requestEmailCode: (email: string) => Promise<string>;
  /** Verify the entered code; resolves true and signs the user in on match. */
  verifyEmailCode: (code: string) => Promise<boolean>;
  /** Continue with Google (demo — wire to real OAuth when configured). */
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
