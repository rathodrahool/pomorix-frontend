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
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
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
    pomodoros?: number;
}

export interface UpdateTaskRequest {
    title?: string;
    pomodoros?: number;
    completed?: boolean;
    active?: boolean;
}

export interface TaskResponse {
    id: string;
    title: string;
    pomodoros: number;
    completed: boolean;
    active: boolean;
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
