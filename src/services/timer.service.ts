import { apiClient, API_ENDPOINTS } from '../api';
import type {
    StartSessionRequest,
    EndSessionRequest,
    SessionResponse,
    TimerStatsResponse,
    ApiResponse,
} from '../types';

/**
 * Timer Service
 * Handles pomodoro timer sessions and statistics
 */
export const timerService = {
    /**
     * Start a new timer session
     */
    async startSession(sessionData: StartSessionRequest): Promise<SessionResponse> {
        const response = await apiClient.post<ApiResponse<SessionResponse>>(
            API_ENDPOINTS.TIMER.START_SESSION,
            sessionData
        );
        return response.data.data;
    },

    /**
     * End current timer session
     */
    async endSession(sessionData: EndSessionRequest): Promise<SessionResponse> {
        const response = await apiClient.post<ApiResponse<SessionResponse>>(
            API_ENDPOINTS.TIMER.END_SESSION,
            sessionData
        );
        return response.data.data;
    },

    /**
     * Get all timer sessions history
     */
    async getSessions(): Promise<SessionResponse[]> {
        const response = await apiClient.get<ApiResponse<SessionResponse[]>>(
            API_ENDPOINTS.TIMER.SESSIONS
        );
        return response.data.data;
    },

    /**
     * Get timer statistics
     */
    async getStats(): Promise<TimerStatsResponse> {
        const response = await apiClient.get<ApiResponse<TimerStatsResponse>>(
            API_ENDPOINTS.TIMER.STATS
        );
        return response.data.data;
    },
};
