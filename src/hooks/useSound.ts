import { useCallback, useEffect, useRef } from 'react';

/**
 * Production-ready sound hook for playing audio files
 * Handles preloading, volume control, and browser autoplay policies
 */

interface UseSoundOptions {
    volume?: number; // 0-100
    loop?: boolean;
    preload?: boolean;
}

interface SoundControls {
    play: () => Promise<void>;
    pause: () => void;
    stop: () => void;
    setVolume: (volume: number) => void;
    isPlaying: boolean;
}

/**
 * Custom hook for playing sounds with full control
 * @param soundPath - Relative path to sound file in /public directory (e.g., 'sounds/alarms/bell.mp3')
 * @param options - Sound configuration options
 */
export const useSound = (
    soundPath: string | null,
    options: UseSoundOptions = {}
): SoundControls => {
    const { volume = 50, loop = false, preload = true } = options;

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isPlayingRef = useRef(false);

    // Initialize audio element
    useEffect(() => {
        if (!soundPath) return;

        try {
            const audio = new Audio(`/${soundPath}`);
            audio.preload = preload ? 'auto' : 'none';
            audio.loop = loop;
            audio.volume = volume / 100;

            // Handle loading errors gracefully
            audio.addEventListener('error', () => {
                console.warn(`Failed to load sound: ${soundPath}`);
            });

            audioRef.current = audio;
        } catch (error) {
            console.warn(`Error creating audio element for: ${soundPath}`, error);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [soundPath, preload, loop, volume]);

    // Update volume when it changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Update loop when it changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = loop;
        }
    }, [loop]);

    const play = useCallback(async (): Promise<void> => {
        if (!audioRef.current) {
            console.warn('Audio element not initialized');
            return;
        }

        try {
            // Reset to start if already playing
            if (isPlayingRef.current) {
                audioRef.current.currentTime = 0;
            }

            await audioRef.current.play();
            isPlayingRef.current = true;
        } catch (error) {
            // Handle autoplay policy errors gracefully
            if ((error as Error).name === 'NotAllowedError') {
                console.warn('Audio playback blocked by browser autoplay policy');
            } else {
                console.warn('Error playing sound:', error);
            }
        }
    }, []);

    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            isPlayingRef.current = false;
        }
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            isPlayingRef.current = false;
        }
    }, []);

    const setVolume = useCallback((newVolume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = Math.max(0, Math.min(100, newVolume)) / 100;
        }
    }, []);

    return {
        play,
        pause,
        stop,
        setVolume,
        isPlaying: isPlayingRef.current,
    };
};

/**
 * Hook for managing looping background sounds (e.g., ticking, white noise)
 */
export const useLoopingSound = (
    soundPath: string | null,
    isActive: boolean,
    volume: number = 50
) => {
    const { play, stop } = useSound(soundPath, {
        volume,
        loop: true,
        preload: true,
    });

    useEffect(() => {
        if (isActive && soundPath) {
            play();
        } else {
            stop();
        }

        return () => {
            stop();
        };
    }, [isActive, soundPath, play, stop]);
};
