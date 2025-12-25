/**
 * Application Configuration
 * Environment-based settings loaded from .env files
 */

export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
    timeout: 30000, // 30 seconds
    geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
} as const;

export const APP_CONFIG = {
    name: 'Pomorix',
    version: '1.0.0',
    timerDurations: {
        focus: 25 * 60, // 25 minutes in seconds
        shortBreak: 5 * 60, // 5 minutes
        longBreak: 15 * 60, // 15 minutes
    },
    pomodorosUntilLongBreak: 4,
} as const;

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'pomorix_auth_token',
    USER_DATA: 'pomorix_user_data',
    TIMER_STATE: 'pomorix_timer_state',
    TASKS: 'pomorix_tasks',
} as const;
