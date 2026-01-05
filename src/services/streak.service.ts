import { apiClient, API_ENDPOINTS } from '../api';
import type { ApiResponse, StreakResponseDto, TotalStatsResponseDto } from '../types';

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

    /**
     * Get current user's total statistics (pomodoros, hours, minutes)
     */
    async getTotalStats(): Promise<TotalStatsResponseDto> {
        const response = await apiClient.get<ApiResponse<TotalStatsResponseDto>>(
            API_ENDPOINTS.STREAK.TOTAL_STATS
        );
        return response.data.data;
    },
};
