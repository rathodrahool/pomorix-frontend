/// <reference types="vite/client" />

/**
 * Vite Environment Variables
 * Define custom env variables for better type safety
 */
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_GEMINI_API_KEY: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
