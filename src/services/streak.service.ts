import { apiClient, API_ENDPOINTS } from '../api';
import type { ApiResponse, StreakResponseDto } from '../types';

/**
 * Streak Service
 * Handles all streak-related API calls
 */
export const streakService = {
    /**
     * Get current user's streak statistics
     */
    async getStreak(): Promise<StreakResponseDto> {
        const response = await apiClient.get<ApiResponse<StreakResponseDto>>(
            API_ENDPOINTS.STREAK.GET
        );
        return response.data.data;
    },
};
