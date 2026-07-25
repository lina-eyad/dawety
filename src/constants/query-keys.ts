/**
 * Typed query-key factory for TanStack Query. Centralizing keys keeps cache
 * invalidation consistent and refactor-safe (`queryClient.invalidateQueries({
 * queryKey: queryKeys.currentUser })`).
 */
export const queryKeys = {
  currentUser: ["current-user"] as const,
} as const;
