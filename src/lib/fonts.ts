import { Tajawal } from "next/font/google";

/**
 * Tajawal — INVITERA's single brand typeface, used across the entire app
 * (headings, body, buttons, nav, badges). Arabic-friendly with a clean Latin
 * set, so it serves both `ar` (RTL) and `en` (LTR) from one family. Exposed as
 * `--font-tajawal`, mapped to `--font-sans` in globals.css so every component
 * inherits it.
 */
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});
