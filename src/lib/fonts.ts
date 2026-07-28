import { IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";

/**
 * Tajawal — INVITERA's primary brand typeface (matches the Figma design).
 * Arabic-friendly with a clean Latin set, so it serves both `ar` (RTL) and
 * `en` (LTR) from one family. Exposed as `--font-tajawal`, mapped to
 * `--font-sans` in globals.css so every component inherits it.
 */
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

/**
 * IBM Plex Sans Arabic — secondary display face used sparingly for a few large
 * headings in the Figma design. Exposed as `--font-plex-arabic` / `--font-display`.
 */
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});
