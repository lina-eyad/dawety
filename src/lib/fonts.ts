import { Tajawal } from "next/font/google";

/**
 * Tajawal — INVITERA's single brand typeface. Arabic-friendly with a clean
 * Latin set, so it serves both `ar` (RTL) and `en` (LTR) from one family.
 *
 * Exposed as the CSS variable `--font-tajawal`, which `src/styles/globals.css`
 * maps to `--font-sans`, so every shadcn/ui component inherits it automatically.
 */
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});
