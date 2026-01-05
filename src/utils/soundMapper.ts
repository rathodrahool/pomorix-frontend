import { AlarmSound, TickingSound } from '../types';

/**
 * Maps enum values to actual sound file paths
 * This allows easy changes to sound files without touching component code
 */

export const ALARM_SOUND_PATHS: Record<AlarmSound, string | null> = {
    [AlarmSound.BELLS]: 'sounds/alarms/bell.mp3',
    [AlarmSound.DIGITAL]: 'sounds/alarms/digital.mp3',
    [AlarmSound.BIRD]: 'sounds/alarms/bird.mp3',
    [AlarmSound.NONE]: null,
};

export const TICKING_SOUND_PATHS: Record<TickingSound, string | null> = {
    [TickingSound.TICKING_FAST]: 'sounds/ambient/ticking-fast.mp3',
    [TickingSound.TICKING_SLOW]: 'sounds/ambient/ticking-slow.mp3',
    [TickingSound.NONE]: null,
};

/**
 * Get the sound file path for a given alarm sound
 */
export const getAlarmSoundPath = (alarmSound: AlarmSound): string | null => {
    return ALARM_SOUND_PATHS[alarmSound] || null;
};

/**
 * Get the sound file path for a given ticking sound
 */
export const getTickingSoundPath = (tickingSound: TickingSound): string | null => {
    return TICKING_SOUND_PATHS[tickingSound] || null;
};
