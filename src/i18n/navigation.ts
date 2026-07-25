import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. Always import `Link`, `redirect`,
 * `usePathname`, and `useRouter` from here (not from `next/navigation`) so that
 * the active locale segment is preserved automatically across navigations.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
