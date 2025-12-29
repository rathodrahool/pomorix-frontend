import { apiClient, API_ENDPOINTS } from '../api';
import type {
    UserSettings,
    UpdateUserSettingsDto,
    SettingsResponse,
    UpdateSettingsResponse,
    ResetSettingsResponse,
} from '../types/settings.types';

/**
 * User Settings Service
 * Manages user preferences for timer durations, sounds, and automation
 */
export const settingsService = {
    /**
     * Get current user settings
     * Settings are auto-created with defaults if they don't exist
     */
    async getUserSettings(): Promise<UserSettings> {
        const response = await apiClient.get<SettingsResponse>(
            API_ENDPOINTS.SETTINGS.GET
        );
        return response.data.data;
    },

    /**
     * Update user settings (partial update)
     * All fields are optional
     */
    async updateUserSettings(updates: UpdateUserSettingsDto): Promise<UserSettings> {
        const response = await apiClient.patch<UpdateSettingsResponse>(
            API_ENDPOINTS.SETTINGS.UPDATE,
            updates
        );
        return response.data.data;
    },

    /**
     * Reset all settings to default values
     */
    async resetToDefaults(): Promise<UserSettings> {
        const response = await apiClient.post<ResetSettingsResponse>(
            API_ENDPOINTS.SETTINGS.RESET
        );
        return response.data.data;
    },
};
