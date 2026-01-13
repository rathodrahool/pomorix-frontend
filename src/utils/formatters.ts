/**
 * Date and Time Formatting Utilities
 */

export const formatters = {
    /**
     * Format seconds into MM:SS format
     */
    formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * Format date to readable string
     */
    formatDate(date: Date | string): string {
        const d = typeof date === 'string' ? new Date(date) : date;
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    },

    /**
     * Format date and time
     */
    formatDateTime(date: Date | string): string {
        const d = typeof date === 'string' ? new Date(date) : date;
        return d.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    },

    /**
     * Get relative time (e.g., "2 hours ago")
     */
    getRelativeTime(date: Date | string): string {
        const d = typeof date === 'string' ? new Date(date) : date;
        const now = new Date();
        const diffInMs = now.getTime() - d.getTime();
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return 'just now';
        if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

        return this.formatDate(d);
    },

    /**
     * Format number with commas
     */
    formatNumber(num: number): string {
        return num.toLocaleString();
    },

    /**
     * Format hours (e.g., 2.5 hours)
     */
    formatHours(hours: number): string {
        return `${hours.toFixed(1)} hour${hours !== 1 ? 's' : ''}`;
    },

    /**
     * Format member since date (e.g., "Jan 2023")
     */
    formatMemberSince(date: Date | string): string {
        const d = typeof date === 'string' ? new Date(date) : date;
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
        });
    },
};

