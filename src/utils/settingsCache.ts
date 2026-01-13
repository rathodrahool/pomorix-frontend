import type { UserSettings } from '../types';

const SETTINGS_CACHE_KEY = 'pomorix_user_settings';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CachedSettings {
    data: UserSettings;
    timestamp: number;
}

/**
 * Settings Cache Utility
 * Reduces API calls by caching user settings in localStorage
 */
export const settingsCache = {
    /**
     * Get cached settings if valid, otherwise return null
     */
    get(): UserSettings | null {
        try {
            const cached = localStorage.getItem(SETTINGS_CACHE_KEY);
            if (!cached) return null;

            const parsed: CachedSettings = JSON.parse(cached);
            const now = Date.now();

            // Check if cache is still valid
            if (now - parsed.timestamp < CACHE_TTL_MS) {
                return parsed.data;
            }

            // Cache expired, remove it
            this.clear();
            return null;
        } catch (error) {
            // If JSON parse fails or localStorage unavailable, return null
            return null;
        }
    },

    /**
     * Save settings to cache with current timestamp
     */
    set(settings: UserSettings): void {
        try {
            const cached: CachedSettings = {
                data: settings,
                timestamp: Date.now(),
            };
            localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(cached));
        } catch (error) {
            // Silently fail if localStorage is unavailable
            console.warn('Failed to cache settings:', error);
        }
    },

    /**
     * Clear cached settings (useful when user explicitly updates settings)
     */
    clear(): void {
        try {
            localStorage.removeItem(SETTINGS_CACHE_KEY);
        } catch (error) {
            // Silently fail
        }
    },

    /**
     * Check if cache is valid without retrieving data
     */
    isValid(): boolean {
        try {
            const cached = localStorage.getItem(SETTINGS_CACHE_KEY);
            if (!cached) return false;

            const parsed: CachedSettings = JSON.parse(cached);
            const now = Date.now();

            return now - parsed.timestamp < CACHE_TTL_MS;
        } catch (error) {
            return false;
        }
    },
};
