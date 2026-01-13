/**
 * Retry utility with exponential backoff
 * Retries failed operations with increasing delays
 */

interface RetryOptions {
    maxAttempts?: number; // Default: 3
    initialDelayMs?: number; // Default: 1000ms (1 second)
    maxDelayMs?: number; // Default: 8000ms (8 seconds)
    backoffMultiplier?: number; // Default: 2 (exponential)
    onRetry?: (attempt: number, error: any) => void; // Callback for each retry
}

/**
 * Retries an async function with exponential backoff
 * 
 * @example
 * const result = await retryWithBackoff(
 *   () => apiClient.post('/endpoint'),
 *   { maxAttempts: 3 }
 * );
 */
export async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const {
        maxAttempts = 3,
        initialDelayMs = 1000,
        maxDelayMs = 8000,
        backoffMultiplier = 2,
        onRetry,
    } = options;

    let lastError: any;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Try to execute the function
            return await fn();
        } catch (error: any) {
            lastError = error;

            // If this was the last attempt, throw the error
            if (attempt === maxAttempts) {
                throw error;
            }

            // Check if error is retryable (network errors, 5xx server errors)
            const isRetryable = isRetryableError(error);
            if (!isRetryable) {
                // Don't retry client errors (4xx) or non-network errors
                throw error;
            }

            // Calculate delay with exponential backoff
            const delay = Math.min(
                initialDelayMs * Math.pow(backoffMultiplier, attempt - 1),
                maxDelayMs
            );

            // Call retry callback if provided
            if (onRetry) {
                onRetry(attempt, error);
            }

            // Wait before retrying
            await sleep(delay);
        }
    }

    // This should never be reached, but TypeScript needs it
    throw lastError;
}

/**
 * Determines if an error is retryable
 */
function isRetryableError(error: any): boolean {
    // Network errors (no response from server)
    if (!error.response) {
        return true;
    }

    // Server errors (5xx)
    const status = error.response?.status;
    if (status >= 500 && status < 600) {
        return true;
    }

    // Rate limiting (429)
    if (status === 429) {
        return true;
    }

    // Timeout errors
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        return true;
    }

    // Don't retry client errors (4xx) except 429
    return false;
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
