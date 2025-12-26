import { apiClient, API_ENDPOINTS } from '../api';
import type {
    UpdateProfileRequest,
    UserData,
    UserStatsResponse,
    AchievementResponse,
    ApiResponse,
} from '../types';

/**
 * User Service
 * Handles user profile and statistics API calls
 */
export const userService = {
    /**
     * Get user profile
     */
    async getProfile(): Promise<UserData> {
        const response = await apiClient.get<ApiResponse<UserData>>(
            API_ENDPOINTS.USER.PROFILE
        );
        return response.data.data;
    },

    /**
     * Update user profile
     */
    async updateProfile(updates: UpdateProfileRequest): Promise<UserData> {
        const response = await apiClient.patch<ApiResponse<UserData>>(
            API_ENDPOINTS.USER.UPDATE_PROFILE,
            updates
        );
        return response.data.data;
    },

    /**
     * Get user statistics
     */
    async getStats(): Promise<UserStatsResponse> {
        const response = await apiClient.get<ApiResponse<UserStatsResponse>>(
            API_ENDPOINTS.USER.STATS
        );
        return response.data.data;
    },

    /**
     * Get user achievements
     */
    async getAchievements(): Promise<AchievementResponse[]> {
        const response = await apiClient.get<ApiResponse<AchievementResponse[]>>(
            API_ENDPOINTS.USER.ACHIEVEMENTS
        );
        return response.data.data;
    },
};
