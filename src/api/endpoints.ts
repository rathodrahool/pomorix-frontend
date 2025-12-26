/**
 * API Endpoints Constants
 * Centralized location for all API endpoint paths
 */

export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: '/auth/signin',
        REGISTER: '/auth/signup',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
    },

    // User
    USER: {
        PROFILE: '/user/profile',
        UPDATE_PROFILE: '/user/profile',
        STATS: '/user/stats',
        ACHIEVEMENTS: '/user/achievements',
    },

    // Tasks
    TASKS: {
        LIST: '/tasks',
        CREATE: '/tasks',
        GET: (id: string) => `/tasks/${id}`,
        UPDATE: (id: string) => `/tasks/${id}`,
        DELETE: (id: string) => `/tasks/${id}`,
        TOGGLE_COMPLETE: (id: string) => `/tasks/${id}/toggle`,
        TOGGLE_ACTIVE: (id: string) => `/tasks/${id}/toggle-active`,
    },

    // Timer / Pomodoro
    TIMER: {
        START_SESSION: '/timer/start',
        END_SESSION: '/timer/end',
        SESSIONS: '/timer/sessions',
        STATS: '/timer/stats',
    },

    // Live Hall
    LIVE: {
        USERS: '/live/users',
        JOIN: '/live/join',
        LEAVE: '/live/leave',
        UPDATE_STATUS: '/live/status',
    },

    // Pomodoro Sessions
    POMODORO: {
        START: '/pomodoro-session/start',
        CURRENT: '/pomodoro-session/current',
        PAUSE: '/pomodoro-session/pause',
        RESUME: '/pomodoro-session/resume',
    },
} as const;
