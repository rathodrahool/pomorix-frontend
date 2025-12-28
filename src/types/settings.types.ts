/**
 * User Settings Types
 * Types for managing user preferences including timer durations, sounds, and automation
 */

// Sound enum types matching backend Prisma enums
export enum AlarmSound {
    BELLS = 'BELLS',
    DIGITAL = 'DIGITAL',
    BIRD = 'BIRD',
    NONE = 'NONE',
}

export enum TickingSound {
    NONE = 'NONE',
    TICKING_FAST = 'TICKING_FAST',
    TICKING_SLOW = 'TICKING_SLOW',
    WHITE_NOISE = 'WHITE_NOISE',
}

// User Settings Interface (full response)
export interface UserSettings {
    id: string;
    pomodoro_duration: number;      // 5-60 minutes
    short_break: number;             // 1-15 minutes
    long_break: number;              // 5-45 minutes
    alarm_sound: AlarmSound;
    ticking_sound: TickingSound;
    volume: number;                  // 0-100%
    auto_start_breaks: boolean;
    auto_start_pomodoros: boolean;
    created_at: string;
    updated_at: string;
}

// Update DTO (partial update)
export interface UpdateUserSettingsDto {
    pomodoro_duration?: number;
    short_break?: number;
    long_break?: number;
    alarm_sound?: AlarmSound;
    ticking_sound?: TickingSound;
    volume?: number;
    auto_start_breaks?: boolean;
    auto_start_pomodoros?: boolean;
}

// API Response wrappers
export interface SettingsResponse {
    statusCode: number;
    message: string;
    data: UserSettings;
}

export interface UpdateSettingsResponse {
    statusCode: number;
    message: string;
    data: UserSettings;
}

export interface ResetSettingsResponse {
    statusCode: number;
    message: string;
    data: UserSettings;
}

// Default settings constants
export const DEFAULT_SETTINGS: Omit<UserSettings, 'id' | 'created_at' | 'updated_at'> = {
    pomodoro_duration: 25,
    short_break: 5,
    long_break: 15,
    alarm_sound: AlarmSound.BELLS,
    ticking_sound: TickingSound.NONE,
    volume: 50,
    auto_start_breaks: false,
    auto_start_pomodoros: true,
};
