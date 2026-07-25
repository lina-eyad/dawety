import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

/**
 * next-intl locale negotiation.
 *
 * NOTE: In Next.js 16 the `middleware` file convention was renamed to `proxy`
 * (see node_modules/next/dist/docs/.../file-conventions/proxy.md). next-intl's
 * `createMiddleware` returns a plain request handler, so it works unchanged as
 * the `proxy` default export.
 */
export default createMiddleware(routing);

export const config = {
  // Run on every request except API routes, Next.js internals, and any path
  // that contains a dot (static files like images, fonts, favicon, etc.).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
