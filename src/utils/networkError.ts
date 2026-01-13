/**
 * Network Error Detection and Handling
 * 
 * This utility helps detect and handle network/server errors globally
 */

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

export interface NetworkErrorState {
    hasError: boolean;
    errorType: 'network' | 'server' | 'timeout' | null;
    statusCode?: number;
    message?: string;
}

/**
 * Hook to detect network connectivity
 */
export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};

/**
 * Determine if an error is a network/server error that should show the ServerError page
 */
export const isServerError = (error: unknown): boolean => {
    if (error instanceof Error) {
        const axiosError = error as AxiosError;

        // Network errors (no response from server)
        if (!axiosError.response && axiosError.message === 'Network Error') {
            return true;
        }

        // Server errors (5xx status codes)
        if (axiosError.response?.status && axiosError.response.status >= 500) {
            return true;
        }

        // Timeout errors
        if (axiosError.code === 'ECONNABORTED') {
            return true;
        }
    }

    return false;
};

/**
 * Get user-friendly error message based on error type
 */
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        const axiosError = error as AxiosError;

        // Network offline
        if (!navigator.onLine) {
            return "You appear to be offline. Please check your internet connection and try again.";
        }

        // Network error
        if (!axiosError.response && axiosError.message === 'Network Error') {
            return "Unable to connect to the server. Please check your connection and try again.";
        }

        // Timeout
        if (axiosError.code === 'ECONNABORTED') {
            return "The request took too long to complete. Please try again.";
        }

        // 500 errors
        if (axiosError.response?.status && axiosError.response.status >= 500) {
            return "We encountered an unexpected error. Don't worry, your streak is safe and sound.";
        }
    }

    return "We encountered an unexpected error. Don't worry, your streak is safe and sound.";
};

/**
 * Parse network error details
 */
export const parseNetworkError = (error: unknown): NetworkErrorState => {
    if (error instanceof Error) {
        const axiosError = error as AxiosError;

        // Network offline
        if (!navigator.onLine) {
            return {
                hasError: true,
                errorType: 'network',
                message: getErrorMessage(error),
            };
        }

        // Network error
        if (!axiosError.response && axiosError.message === 'Network Error') {
            return {
                hasError: true,
                errorType: 'network',
                message: getErrorMessage(error),
            };
        }

        // Timeout
        if (axiosError.code === 'ECONNABORTED') {
            return {
                hasError: true,
                errorType: 'timeout',
                message: getErrorMessage(error),
            };
        }

        // Server errors
        if (axiosError.response?.status && axiosError.response.status >= 500) {
            return {
                hasError: true,
                errorType: 'server',
                statusCode: axiosError.response.status,
                message: getErrorMessage(error),
            };
        }
    }

    return {
        hasError: false,
        errorType: null,
    };
};
