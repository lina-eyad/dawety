"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Dark-mode readiness. next-themes toggles a `.dark` class on <html>, which the
 * CSS variables in `globals.css` already respond to. The app defaults to the
 * light brand theme; a full dark palette is a later design pass.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
