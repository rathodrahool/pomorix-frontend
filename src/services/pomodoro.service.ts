import { apiClient, API_ENDPOINTS } from '../api';
import type {
    StartPomodoroRequest,
    StartPomodoroResponse,
    PomodoroSessionResponse,
    CurrentSessionResponse,
    ActiveSessionData,
} from '../types';
import { settingsService } from './settings.service';

/**
 * Pomodoro Session Service
 * Handles Pomodoro session operations
 */
export const pomodoroService = {
    /**
     * Start a new Pomodoro session
     * Requires an active task to be selected
     * Automatically fetches user settings for durations
     */
    async startSession(
        focusDuration?: number,  // Optional override
        breakDuration?: number   // Optional override
    ): Promise<PomodoroSessionResponse> {
        // If durations not provided, fetch from user settings
        let focus = focusDuration;
        let shortBreak = breakDuration;

        if (!focus || !shortBreak) {
            try {
                const settings = await settingsService.getUserSettings();
                focus = focus || settings.pomodoro_duration * 60; // Convert minutes to seconds
                shortBreak = shortBreak || settings.short_break * 60; // Convert minutes to seconds
            } catch (err) {
                // Fallback to defaults if settings fetch fails
                focus = focus || 25 * 60; // 25 minutes
                shortBreak = shortBreak || 5 * 60; // 5 minutes
            }
        }

        const requestData: StartPomodoroRequest = {
            focus_duration_seconds: focus,
            break_duration_seconds: shortBreak,
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

    /**
     * Complete the current focus session
     * Called when timer countdown reaches zero
     * Only works for FOCUS state sessions
     */
    async completeSession(): Promise<void> {
        await apiClient.post(API_ENDPOINTS.POMODORO.COMPLETE);
    },
};
