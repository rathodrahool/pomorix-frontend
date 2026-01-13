import { useEffect, useRef } from 'react';

interface UseTabTitleOptions {
  /** Whether the timer is currently active/running */
  isActive: boolean;
  /** Current mode: 'focus', 'shortBreak', or 'longBreak' */
  mode: 'focus' | 'shortBreak' | 'longBreak';
  /** Remaining seconds */
  secondsLeft: number;
  /** Whether to show the timer in the tab title */
  enabled?: boolean;
}

/**
 * Custom hook to update browser tab title with timer information
 * Shows format like "25:00 - Time to focus!" when timer is running
 */
export const useTabTitle = ({ isActive, mode, secondsLeft, enabled = true }: UseTabTitleOptions) => {
  const originalTitleRef = useRef<string>('');

  useEffect(() => {
    // Store original title on mount
    if (!originalTitleRef.current) {
      originalTitleRef.current = document.title;
    }

    // Restore original title on unmount
    return () => {
      document.title = originalTitleRef.current;
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.title = originalTitleRef.current;
      return;
    }

    // Format time as MM:SS
    const formatTime = (totalSeconds: number): string => {
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // Get mode-specific message
    const getModeMessage = (): string => {
      switch (mode) {
        case 'focus':
          return 'Time to focus!';
        case 'shortBreak':
          return 'Short break';
        case 'longBreak':
          return 'Long break';
        default:
          return 'Pomorix';
      }
    };

    // Update title based on timer state
    if (isActive) {
      // Timer is running - show countdown
      const timeString = formatTime(secondsLeft);
      const message = getModeMessage();
      document.title = `${timeString} - ${message}`;
    } else if (secondsLeft === 0) {
      // Timer completed
      const message = mode === 'focus' ? '🎉 Focus complete!' : '✅ Break complete!';
      document.title = message;
    } else {
      // Timer is paused or not started
      const timeString = formatTime(secondsLeft);
      const message = getModeMessage();
      document.title = `${timeString} - ${message} (Paused)`;
    }
  }, [isActive, mode, secondsLeft, enabled]);
};
