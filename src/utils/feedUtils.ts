/**
 * Utility functions for the Global Live Feed
 */

import { formatDistanceToNow } from 'date-fns';

/**
 * Extract display name from email (first part before @, capitalized)
 */
export function getUserDisplayName(email: string): string {
    const name = email.split('@')[0];
    // Capitalize first letter and replace dots/underscores with spaces
    const formattedName = name.replace(/[._]/g, ' ');
    return formattedName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Map backend session state to UI status
 */
export type UIStatus = 'FOCUSING' | 'BREAK' | 'DONE';

export function mapStateToUIStatus(
    state: 'FOCUS' | 'BREAK' | 'COMPLETED' | 'ABORTED',
    endedAt: string | null
): UIStatus {
    if (state === 'FOCUS') return 'FOCUSING';
    if (state === 'BREAK') return 'BREAK';
    // COMPLETED or ABORTED
    return 'DONE';
}

/**
 * Generate activity message based on status and task
 * Always returns the task title from backend - status is shown in badge
 */
export function getActivityMessage(
    taskTitle: string,
    status: UIStatus
): string {
    // Just return the task title - the status badge shows if they're focusing, on break, or done
    return taskTitle;
}

/**
 * Format timestamp to relative time using date-fns
 * More accurate than custom implementation with proper pluralization
 * Examples: "less than a minute ago", "about 2 hours ago", "3 days ago"
 */
export function getRelativeTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = Date.now();
    const diffSeconds = Math.floor((now - date.getTime()) / 1000);

    // For very recent times (< 10 seconds), show "Just now"
    if (diffSeconds < 10) {
        return 'Just now';
    }

    // Use date-fns for everything else
    return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
    return num.toLocaleString();
}
