import { useEffect } from 'react';
import { useApi } from './useApi';
import { streakService } from '../services';
import type { StreakResponseDto } from '../types';

/**
 * Hook to fetch and manage user streak data
 * @param autoFetch - Whether to automatically fetch on mount (default: true)
 */
export function useStreak(autoFetch = true) {
    const { data, loading, error, execute, reset } = useApi<StreakResponseDto, []>(
        streakService.getStreak,
        autoFetch
    );

    useEffect(() => {
        if (autoFetch) {
            execute();
        }
    }, [autoFetch, execute]);

    return {
        streak: data,
        loading,
        error,
        refetch: execute,
        reset,
    };
}
