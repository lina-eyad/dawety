"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { userService } from "@/services/user.service";

/**
 * Example TanStack Query hook over a domain service. Disabled by default
 * (`enabled: false`) because there is no backend yet — this proves the
 * service → query-key → hook pattern without firing a doomed request. Once auth
 * exists, gate `enabled` on the authenticated state instead.
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: userService.getCurrentUser,
    enabled: false,
  });
}
