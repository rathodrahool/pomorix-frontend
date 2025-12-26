import { STORAGE_KEYS } from '../constants/config';

/**
 * LocalStorage utility functions with type safety
 */

export const storage = {
    // Token management
    getToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    },

    setToken(token: string): void {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    },

    clearToken(): void {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    },

    // User data
    getUserData<T>(): T | null {
        const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
        return data ? JSON.parse(data) : null;
    },

    setUserData<T>(data: T): void {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
    },

    clearUserData(): void {
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    },

    // Timer state
    getTimerState<T>(): T | null {
        const data = localStorage.getItem(STORAGE_KEYS.TIMER_STATE);
        return data ? JSON.parse(data) : null;
    },

    setTimerState<T>(data: T): void {
        localStorage.setItem(STORAGE_KEYS.TIMER_STATE, JSON.stringify(data));
    },

    clearTimerState(): void {
        localStorage.removeItem(STORAGE_KEYS.TIMER_STATE);
    },

    // Tasks
    getTasks<T>(): T | null {
        const data = localStorage.getItem(STORAGE_KEYS.TASKS);
        return data ? JSON.parse(data) : null;
    },

    setTasks<T>(data: T): void {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(data));
    },

    clearTasks(): void {
        localStorage.removeItem(STORAGE_KEYS.TASKS);
    },

    // Clear all app data
    clearAll(): void {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    },
};
