import { apiClient, API_ENDPOINTS } from '../api';
import { storage } from '../utils/storage';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    UserData,
    ApiResponse,
    SigninDto,
} from '../types';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
export const authService = {
    /**
     * Social Login (Google/Apple OAuth)
     */
    async socialLogin(signinData: SigninDto): Promise<LoginResponse> {
        const response = await apiClient.post<ApiResponse<LoginResponse>>(
            API_ENDPOINTS.AUTH.LOGIN,
            signinData
        );

        // Store token in localStorage
        if (response.data.data.access_token) {
            storage.setToken(response.data.data.access_token);
            storage.setUserData(response.data.data.user);
        }

        return response.data.data;
    },

    /**
     * Login user (Email/Password)
     */
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await apiClient.post<ApiResponse<LoginResponse>>(
            API_ENDPOINTS.AUTH.LOGIN,
            credentials
        );

        // Store token in localStorage
        if (response.data.data.access_token) {
            storage.setToken(response.data.data.access_token);
            storage.setUserData(response.data.data.user);
        }

        return response.data.data;
    },

    /**
     * Register new user
     */
    async register(userData: RegisterRequest): Promise<RegisterResponse> {
        const response = await apiClient.post<ApiResponse<RegisterResponse>>(
            API_ENDPOINTS.AUTH.REGISTER,
            userData
        );

        // Store token in localStorage
        if (response.data.data.access_token) {
            storage.setToken(response.data.data.access_token);
            storage.setUserData(response.data.data.user);
        }

        return response.data.data;
    },

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            // Clear local storage regardless of API response
            storage.clearToken();
            storage.clearUserData();
        }
    },

    /**
     * Get current user data
     */
    async getCurrentUser(): Promise<UserData> {
        const response = await apiClient.get<ApiResponse<UserData>>(
            API_ENDPOINTS.AUTH.ME
        );

        // Update stored user data
        storage.setUserData(response.data.data);

        return response.data.data;
    },

    /**
     * Refresh authentication token
     */
    async refreshToken(): Promise<string> {
        const response = await apiClient.post<ApiResponse<{ access_token: string }>>(
            API_ENDPOINTS.AUTH.REFRESH
        );

        const newToken = response.data.data.access_token;
        storage.setToken(newToken);

        return newToken;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!storage.getToken();
    },
};
