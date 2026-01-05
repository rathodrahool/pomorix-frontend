import { useQuery, useQueryClient } from '@tanstack/react-query';
import { streakService } from '../services';
import type { StreakResponseDto, TotalStatsResponseDto } from '../types';

/**
 * Hook to fetch and manage user streak data using React Query
 * Automatically deduplicates requests and caches results
 */
export function useStreak() {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery<StreakResponseDto>({
        queryKey: ['streak'],
        queryFn: streakService.getStreak,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    });

    const invalidateStreak = () => {
        queryClient.invalidateQueries({ queryKey: ['streak'] });
    };

    return {
        streak: data,
        loading: isLoading,
        error: error as Error | null,
        refetch,
        invalidateStreak, // Call this after completing a Pomodoro
    };
}

/**
 * Hook to fetch and manage user total stats (pomodoros, hours, minutes)
 * Automatically deduplicates requests and caches results
 */
export function useTotalStats() {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery<TotalStatsResponseDto>({
        queryKey: ['total-stats'],
        queryFn: streakService.getTotalStats,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    });

    const invalidateTotalStats = () => {
        queryClient.invalidateQueries({ queryKey: ['total-stats'] });
    };

    return {
        stats: data,
        loading: isLoading,
        error: error as Error | null,
        refetch,
        invalidateTotalStats, // Call this after completing a Pomodoro
    };
}
