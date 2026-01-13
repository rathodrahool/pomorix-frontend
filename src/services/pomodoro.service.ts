import { apiClient, API_ENDPOINTS } from '../api';
import type {
    StartPomodoroRequest,
    StartPomodoroResponse,
    PomodoroSessionResponse,
    CurrentSessionResponse,
    ActiveSessionData,
    SessionType,
} from '../types';
import { settingsService } from './settings.service';
import { retryWithBackoff } from '../utils';

/**
 * Pomodoro Session Service
 * Handles Pomodoro session operations
 */
export const pomodoroService = {
    /**
     * Start a new Pomodoro session
     * Requires an active task to be selected
     * Backend automatically uses user settings for durations based on session_type
     */
    async startSession(
        sessionType: SessionType
    ): Promise<PomodoroSessionResponse> {
        const requestData: StartPomodoroRequest = {
            session_type: sessionType,
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
     * Includes retry logic for network resilience
     */
    async pauseSession(): Promise<void> {
        await retryWithBackoff(
            () => apiClient.post(API_ENDPOINTS.POMODORO.PAUSE),
            {
                maxAttempts: 3,
                onRetry: (attempt) => {
                    console.log(`Retrying pause session (attempt ${attempt})...`);
                }
            }
        );
    },

    /**
     * Resume the paused session
     * After resuming, fetch current session to get updated remaining_seconds
     * Includes retry logic for network resilience
     */
    async resumeSession(): Promise<void> {
        await retryWithBackoff(
            () => apiClient.post(API_ENDPOINTS.POMODORO.RESUME),
            {
                maxAttempts: 3,
                onRetry: (attempt) => {
                    console.log(`Retrying resume session (attempt ${attempt})...`);
                }
            }
        );
    },

    /**
     * Complete the current focus session
     * Called when timer countdown reaches zero
     * Only works for FOCUS state sessions
     * Includes retry logic with extended attempts for critical operation
     */
    async completeSession(): Promise<void> {
        await retryWithBackoff(
            () => apiClient.post(API_ENDPOINTS.POMODORO.COMPLETE),
            {
                maxAttempts: 5, // More attempts for critical completion operation
                initialDelayMs: 1000,
                maxDelayMs: 10000,
                onRetry: (attempt, error) => {
                    console.warn(`Retrying complete session (attempt ${attempt})...`, error);
                }
            }
        );
    },
};
