import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for INVITERA's locales and routing strategy.
 *
 * - Arabic (`ar`) is the default locale and renders RTL.
 * - English (`en`) is fully supported and renders LTR.
 * - `localePrefix: "always"` keeps both `/ar/...` and `/en/...` explicit in the
 *   URL (the bare `/` redirects to the default locale). This gives clean,
 *   unambiguous hreflang/SEO and a predictable canonical URL per language.
 */
export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** Text direction for a given locale. `ar` is our only RTL locale. */
export function getDirection(locale: string): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
