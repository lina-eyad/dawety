import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Auto-detects the request config at `src/i18n/request.ts`.
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Statically typed `href`s for next/link and typed route params (stable in v16).
  typedRoutes: true,
};

export default withNextIntl(nextConfig);
