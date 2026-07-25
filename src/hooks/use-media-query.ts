"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query. Returns `false` during SSR and until mounted,
 * then tracks live matches. Example: `useMediaQuery("(min-width: 768px)")`.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const onChange = () => setMatches(mediaQueryList.matches);

    onChange();
    mediaQueryList.addEventListener("change", onChange);
    return () => mediaQueryList.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
