import { useState, useCallback, useEffect } from 'react';
import { authService } from '../services';
import type { LoginRequest, RegisterRequest, UserData } from '../types';

/**
 * Authentication Hook
 * Manages authentication state and provides login/logout functions
 */

interface UseAuthReturn {
    user: UserData | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (credentials: LoginRequest) => Promise<boolean>;
    register: (userData: RegisterRequest) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = authService.isAuthenticated();

    // Check authentication on mount
    useEffect(() => {
        if (isAuthenticated) {
            checkAuth();
        }
    }, []);

    const checkAuth = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to get user data');
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (credentials: LoginRequest): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.login(credentials);
            setUser(response.user);
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (userData: RegisterRequest): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.register(userData);
            setUser(response.user);
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            await authService.logout();
            setUser(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Logout failed');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        checkAuth,
    };
}
