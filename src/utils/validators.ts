/**
 * Validation Utilities
 */

export const validators = {
    /**
     * Validate email format
     */
    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate password strength
     * At least 8 characters, one uppercase, one lowercase, one number
     */
    isValidPassword(password: string): boolean {
        if (password.length < 8) return false;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        return hasUpperCase && hasLowerCase && hasNumber;
    },

    /**
     * Validate required field
     */
    isRequired(value: string): boolean {
        return value.trim().length > 0;
    },

    /**
     * Validate minimum length
     */
    minLength(value: string, min: number): boolean {
        return value.length >= min;
    },

    /**
     * Validate maximum length
     */
    maxLength(value: string, max: number): boolean {
        return value.length <= max;
    },
};
