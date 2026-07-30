/**
 * Centralized, locale-agnostic route paths. Always reference `ROUTES.*` instead
 * of hard-coding path strings, and navigate with the locale-aware helpers from
 * `@/i18n/navigation` so the active locale segment is preserved.
 *
 * Auth routes are declared now (targets for the future route guard) even though
 * the pages don't exist yet — see the auth scaffolding in `src/store` / `src/providers`.
 */
export const ROUTES = {
  home: "/",
  templates: "/templates",
  create: "/create",
  preview: "/preview",
  checkout: "/checkout",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
