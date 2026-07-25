"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns `true` only after the component has mounted on the client. Use to gate
 * rendering of hydration-sensitive UI (e.g. theme- or direction-dependent bits)
 * so server and client markup match on first paint.
 *
 * Implemented with `useSyncExternalStore` (server snapshot `false`, client
 * snapshot `true`) so there is no setState-in-effect and no extra render.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
