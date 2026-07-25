"use client";

import { createContext } from "react";

import type { AuthStatus, LoginCredentials, User } from "@/types/auth.types";

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
  /** Placeholder — wire to the real login service once the backend exists. */
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
