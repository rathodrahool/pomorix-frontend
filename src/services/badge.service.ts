import { apiClient, API_ENDPOINTS } from '../api';
import type { ApiResponse, BadgeDefinitionResponse, UserBadgeResponse } from '../types';

/**
 * Badge Service
 * Handles all badge-related API calls
 */
export const badgeService = {
    /**
     * Get all badge definitions with locked/unlocked status for current user
     */
    async getBadgeDefinitions(): Promise<BadgeDefinitionResponse[]> {
        const response = await apiClient.get<ApiResponse<BadgeDefinitionResponse[]>>(
            API_ENDPOINTS.BADGE.DEFINITIONS
        );
        return response.data.data;
    },

    /**
     * Get only the badges the current user has unlocked
     */
    async getMyBadges(): Promise<UserBadgeResponse[]> {
        const response = await apiClient.get<ApiResponse<UserBadgeResponse[]>>(
            API_ENDPOINTS.BADGE.MY_BADGES
        );
        return response.data.data;
    },
};
