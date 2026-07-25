"use client";

import { useContext } from "react";

import { AuthContext, type AuthContextValue } from "@/store/auth-context";

/**
 * Access the auth state and actions. Throws if used outside `AuthProvider`,
 * which surfaces provider-tree mistakes at development time instead of failing
 * silently with a null context.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
