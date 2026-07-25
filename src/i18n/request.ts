import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

/**
 * Per-request i18n configuration consumed by next-intl on the server.
 * Auto-detected by `createNextIntlPlugin()` at `src/i18n/request.ts`.
 *
 * Messages live in the root `messages/<locale>.json` files and are loaded on
 * the server only, so translation size never affects the client bundle.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
