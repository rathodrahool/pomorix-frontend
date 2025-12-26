import { apiClient, API_ENDPOINTS } from '../api';
import type {
    StartPomodoroRequest,
    StartPomodoroResponse,
    PomodoroSessionResponse,
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
};
