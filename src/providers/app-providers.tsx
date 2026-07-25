"use client";

import { Direction } from "radix-ui";

import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "./auth-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

interface AppProvidersProps {
  children: React.ReactNode;
  /** Current text direction, derived from the active locale in the layout. */
  direction: "rtl" | "ltr";
}

/**
 * Single composition root for every client-side provider. Mounted once in the
 * locale layout so pages and components stay provider-agnostic.
 *
 * `Direction.Provider` propagates RTL/LTR to Radix primitives (menus, dialogs)
 * so their keyboard navigation and positioning mirror correctly.
 */
export function AppProviders({ children, direction }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Direction.Provider dir={direction}>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster
              position={direction === "rtl" ? "bottom-left" : "bottom-right"}
              richColors
            />
          </AuthProvider>
        </QueryProvider>
      </Direction.Provider>
    </ThemeProvider>
  );
}
