/**
 * Badge System Types
 */

// Badge category enum
export type BadgeCategory = 'VOLUME' | 'STREAK' | 'ONBOARDING' | 'INTENSITY';

// Badge code representing specific badges
export type BadgeCode =
    // Volume tiers
    | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' | 'ASCENDANT'
    // Onboarding
    | 'FIRST_POMODORO'
    // Streaks
    | 'STREAK_3' | 'STREAK_7' | 'STREAK_30'
    // Intensity
    | 'DAILY_5' | 'DAILY_10';

// Badge definition with unlock status for current user
export interface BadgeDefinitionResponse {
    id: string;
    code: BadgeCode;
    title: string;
    description: string;
    category: BadgeCategory;
    is_unlocked: boolean;
    unlocked_at?: string; // ISO timestamp, only present if unlocked
}

// User's earned badge
export interface UserBadgeResponse {
    id: string;
    code: BadgeCode;
    title: string;
    description: string;
    category: BadgeCategory;
    unlocked_at: string; // ISO timestamp
}

// Helper type for rank tier progression
export const RANK_TIERS: BadgeCode[] = [
    'BRONZE',
    'SILVER',
    'GOLD',
    'PLATINUM',
    'DIAMOND',
    'ASCENDANT'
];

// Requirements for each rank (in FOCUS Pomodoros)
export const RANK_REQUIREMENTS: Record<BadgeCode, number> = {
    BRONZE: 3,
    SILVER: 24,
    GOLD: 120,
    PLATINUM: 240,
    DIAMOND: 1200,
    ASCENDANT: 2400,
    // Non-rank badges (not used for progression)
    FIRST_POMODORO: 1,
    STREAK_3: 0,
    STREAK_7: 0,
    STREAK_30: 0,
    DAILY_5: 0,
    DAILY_10: 0,
};
