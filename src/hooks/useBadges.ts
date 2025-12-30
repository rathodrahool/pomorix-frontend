import { useQuery } from '@tanstack/react-query';
import { badgeService } from '../services';

/**
 * Hook to fetch all badge definitions with locked/unlocked status
 */
export const useBadgeDefinitions = () => {
    return useQuery({
        queryKey: ['badge-definitions'],
        queryFn: () => badgeService.getBadgeDefinitions(),
        staleTime: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: true,
    });
};

/**
 * Hook to fetch only earned badges for current user
 */
export const useMyBadges = () => {
    return useQuery({
        queryKey: ['my-badges'],
        queryFn: () => badgeService.getMyBadges(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    });
};
