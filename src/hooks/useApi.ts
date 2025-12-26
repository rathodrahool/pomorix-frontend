import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

/**
 * Generic API Hook
 * Provides loading, error, and data state management for API calls
 */

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface UseApiReturn<T, P extends any[]> extends UseApiState<T> {
    execute: (...args: P) => Promise<T | null>;
    reset: () => void;
}

export function useApi<T, P extends any[]>(
    apiFunc: (...args: P) => Promise<T>,
    initialLoading = false
): UseApiReturn<T, P> {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: initialLoading,
        error: null,
    });

    const execute = useCallback(
        async (...args: P): Promise<T | null> => {
            setState({ data: null, loading: true, error: null });

            try {
                const result = await apiFunc(...args);
                setState({ data: result, loading: false, error: null });
                return result;
            } catch (err) {
                const error = err as AxiosError<{ message: string }>;
                const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
                setState({ data: null, loading: false, error: errorMessage });
                return null;
            }
        },
        [apiFunc]
    );

    const reset = useCallback(() => {
        setState({ data: null, loading: false, error: null });
    }, []);

    return {
        ...state,
        execute,
        reset,
    };
}
