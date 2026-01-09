import { apiClient, API_ENDPOINTS } from '../api';
import type {
    UpdateProfileRequest,
    UserData,
    UserStatsResponse,
    AchievementResponse,
    ApiResponse,
    ProfileData,
    ProfileAnalyticsRange,
    ProfileResponse,
} from '../types';

/**
 * User Service
 * Handles user profile and statistics API calls
 */
export const userService = {
    /**
     * Get user profile (legacy - kept for backward compatibility)
     */
    async getProfile(): Promise<UserData> {
        const response = await apiClient.get<ApiResponse<UserData>>(
            API_ENDPOINTS.USER.PROFILE
        );
        return response.data.data;
    },

    /**
     * Get comprehensive user profile with analytics
     * @param range - Time range for analytics (LAST_7_DAYS, LAST_30_DAYS, ALL_TIME)
     */
    async getProfileWithAnalytics(range: ProfileAnalyticsRange = 'LAST_7_DAYS'): Promise<ProfileData> {
        const response = await apiClient.get<ProfileResponse>(
            API_ENDPOINTS.USER.PROFILE,
            { params: { range } }
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

