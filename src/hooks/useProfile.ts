import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../services';
import type { ProfileData, ProfileAnalyticsRange } from '../types';

/**
 * Custom hook for fetching user profile with analytics
 * @param initialRange - Initial time range for analytics
 */
export const useProfile = (initialRange: ProfileAnalyticsRange = 'LAST_7_DAYS') => {
    const [range, setRange] = useState<ProfileAnalyticsRange>(initialRange);

    const query = useQuery({
        queryKey: ['user-profile', range],
        queryFn: () => userService.getProfileWithAnalytics(range),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    });

    return {
        profile: query.data,
        isLoading: query.isLoading,
        error: query.error,
        range,
        setRange,
        refetch: query.refetch,
    };
};
