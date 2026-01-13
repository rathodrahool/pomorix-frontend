import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface NetworkStatus {
    isOnline: boolean;
    wasOffline: boolean;
}

/**
 * Hook to track online/offline status
 * Shows notifications when connection is lost/restored
 */
export const useNetworkStatus = (): NetworkStatus => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [wasOffline, setWasOffline] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            if (wasOffline) {
                toast.success('Internet connection restored! 🌐', {
                    duration: 3000,
                    icon: '✅',
                });
                setWasOffline(false);
            }
        };

        const handleOffline = () => {
            setIsOnline(false);
            setWasOffline(true);
            toast.error('No internet connection. Timer will sync when you\'re back online.', {
                duration: 5000,
                icon: '📡',
            });
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [wasOffline]);

    return { isOnline, wasOffline };
};
