import { apiClient, API_ENDPOINTS } from '../api';
import type { ApiResponse, GlobalFeedResponse, OnlineCountResponse } from '../types';

/**
 * Global Feed Service
 * Handles all global feed API calls (read-only)
 */
export const globalService = {
    /**
     * Get full global feed with user activity
     * @param limit - Maximum number of feed items (1-100, default: 50)
     */
    async getGlobalFeed(limit: number = 50): Promise<GlobalFeedResponse> {
        const response = await apiClient.get<ApiResponse<GlobalFeedResponse>>(
            `${API_ENDPOINTS.GLOBAL.FEED}?limit=${limit}`
        );
        return response.data.data;
    },

    /**
     * Get online user count (lightweight endpoint for banners)
     */
    async getOnlineCount(): Promise<number> {
        const response = await apiClient.get<ApiResponse<OnlineCountResponse>>(
            API_ENDPOINTS.GLOBAL.ONLINE_COUNT
        );
        return response.data.data.online_count;
    },
};
