/**
 * API Request and Response Types
 */

// Generic API Response wrapper (matches backend structure)
export interface ApiResponse<T = any> {
    success: boolean;
    status_code: number;
    message: string;
    data: T;
}

// Generic Error Response
export interface ApiError {
    success: false;
    status_code: number;
    message: string;
    data?: any;
}

// Pagination
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

// ==================== Auth API Types ====================

// Auth Provider Enum
export enum AuthProvider {
    GOOGLE = 'GOOGLE',
    APPLE = 'APPLE',
    EMAIL = 'EMAIL',
}

// Social Authentication (OAuth)
export interface SigninDto {
    email: string;
    auth_provider: AuthProvider;
    auth_provider_id: string;
}

// Email/Password Authentication
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    user: UserData;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface RegisterResponse {
    access_token: string;
    user: UserData;
}

export interface UserData {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    auth_provider?: string;
    auth_provider_id?: string;
    status?: string;
    createdAt?: string;
}

// ==================== Task API Types ====================

export interface CreateTaskRequest {
    title: string;
    estimated_pomodoros?: number;
}

export interface UpdateTaskRequest {
    title?: string;
    estimated_pomodoros?: number;
    is_completed?: boolean;
    is_active?: boolean;
}

export interface TaskResponse {
    id: string;
    title: string;
    estimated_pomodoros: number;
    completed_pomodoros: number;
    is_completed: boolean;
    is_active: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

// ==================== Timer API Types ====================

export interface StartSessionRequest {
    taskId?: string;
    mode: 'focus' | 'shortBreak' | 'longBreak';
}

export interface EndSessionRequest {
    sessionId: string;
    completedSeconds: number;
}

export interface SessionResponse {
    id: string;
    userId: string;
    taskId?: string;
    mode: 'focus' | 'shortBreak' | 'longBreak';
    duration: number;
    completedAt?: string;
    createdAt: string;
}

export interface TimerStatsResponse {
    totalSessions: number;
    totalMinutes: number;
    todaySessions: number;
    weekSessions: number;
    monthSessions: number;
    streak: number;
}

// ==================== User API Types ====================

export interface UpdateProfileRequest {
    name?: string;
    avatar?: string;
}

export interface UserStatsResponse {
    streak: number;
    totalSessions: number;
    totalHours: number;
    dailyAvg: number;
    topPercent: number;
    pomodorosCompleted: number;
}

export interface AchievementResponse {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress?: number;
    total?: number;
    type: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedAt?: string;
}

// ==================== Streak API Types ====================

export interface StreakResponseDto {
    current_streak: number;
    longest_streak: number;
    last_active_date: string | null;
}

// ==================== Live Hall API Types ====================

export interface LiveUserResponse {
    id: string;
    name: string;
    avatar: string;
    status: 'focusing' | 'break' | 'done';
    message: string;
    timestamp: string;
}

export interface UpdateStatusRequest {
    status: 'focusing' | 'break' | 'done';
    message?: string;
}

// ==================== Pomodoro Session API Types ====================

export type PomodoroSessionState = 'FOCUS' | 'BREAK' | 'COMPLETED' | 'ABORTED';

export type SessionType = 'FOCUS' | 'SHORT_BREAK' | 'LONG_BREAK';

export interface StartPomodoroRequest {
    session_type: SessionType;
}

export interface PomodoroSessionResponse {
    session_id: string;
    task_id: string;
    task_title: string;
    session_type: SessionType;
    state: PomodoroSessionState;
    duration_seconds: number;
    started_at: string;
}

export interface StartPomodoroResponse {
    statusCode: number;
    message: string;
    data: PomodoroSessionResponse;
}

// Current session types
export interface ActiveSessionData {
    session_id: string;
    task_id: string;
    task_title: string;
    session_type: SessionType;
    state: PomodoroSessionState;
    duration_seconds: number;
    started_at: string;
    paused_at: string | null;
    is_paused: boolean;
    remaining_seconds: number;  // Auto-calculated by server
    elapsed_seconds: number;    // Auto-calculated by server
}

export interface NoSessionData {
    active: false;
}

export interface CurrentSessionResponse {
    statusCode: number;
    message: string;
    data: ActiveSessionData | NoSessionData;
}
