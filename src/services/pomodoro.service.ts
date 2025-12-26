import { apiClient, API_ENDPOINTS } from '../api';
import type {
    StartPomodoroRequest,
    StartPomodoroResponse,
    PomodoroSessionResponse,
    CurrentSessionResponse,
    ActiveSessionData,
} from '../types';

/**
 * Pomodoro Session Service
 * Handles Pomodoro session operations
 */
export const pomodoroService = {
    /**
     * Start a new Pomodoro session
     * Requires an active task to be selected
     */
    async startSession(
        focusDuration: number = 1500,  // Default: 25 minutes
        breakDuration: number = 300     // Default: 5 minutes
    ): Promise<PomodoroSessionResponse> {
        const requestData: StartPomodoroRequest = {
            focus_duration_seconds: focusDuration,
            break_duration_seconds: breakDuration,
        };

        const response = await apiClient.post<StartPomodoroResponse>(
            API_ENDPOINTS.POMODORO.START,
            requestData
        );

        return response.data.data;
    },

    /**
     * Get current active session
     * Returns null if no active session exists
     * Provides server-calculated remaining_seconds and elapsed_seconds
     */
    async getCurrentSession(): Promise<ActiveSessionData | null> {
        const response = await apiClient.get<CurrentSessionResponse>(
            API_ENDPOINTS.POMODORO.CURRENT
        );

        // Check if there's an active session
        if ('active' in response.data.data && !response.data.data.active) {
            return null;
        }

        return response.data.data as ActiveSessionData;
    },

    /**
     * Pause the current active session
     * Server tracks pause time automatically
     */
    async pauseSession(): Promise<void> {
        await apiClient.post(API_ENDPOINTS.POMODORO.PAUSE);
    },

    /**
     * Resume the paused session
     * After resuming, fetch current session to get updated remaining_seconds
     */
    async resumeSession(): Promise<void> {
        await apiClient.post(API_ENDPOINTS.POMODORO.RESUME);
    },
};
