import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { User } from "@/types/auth.types";

/**
 * Example domain service. Services own the mapping from endpoints to typed
 * domain models and unwrap the `ApiResponse` envelope, so hooks/components work
 * with clean types. This is the template every future service should follow.
 */
export const userService = {
  getCurrentUser: async (): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.auth.me,
    );
    return data.data;
  },
};
