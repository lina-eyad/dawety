import type { Locale } from "@/i18n/routing";

/** Static, non-localized product metadata. */
export const SITE = {
  name: "INVITERA",
  /** Production URL — override via NEXT_PUBLIC_SITE_URL when deploying. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://invitera.example",
} as const;

/** Human-readable language names, keyed by locale (for the language switcher). */
export const LOCALE_LABELS: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};
