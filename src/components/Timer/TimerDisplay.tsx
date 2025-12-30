import React, { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { TimerMode } from '../../types';
import { pomodoroService, settingsService } from '../../services';
import type { PomodoroSessionResponse, ActiveSessionData, UserSettings, SessionType, TaskResponse } from '../../types';

interface TimerDisplayProps {
  initialTask: string;
  onTaskChange: (task: string) => void;
  hasActiveTask: boolean;
  hasAnyTasks: boolean;
  tasks: TaskResponse[];
  onPomodoroComplete?: () => Promise<void>;
}

// Helper function to check if a date is today
const isToday = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ initialTask, onTaskChange, hasActiveTask, hasAnyTasks, tasks, onPomodoroComplete }) => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // Default: 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [taskInput, setTaskInput] = useState(initialTask);
  const [currentSession, setCurrentSession] = useState<ActiveSessionData | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const completingRef = useRef(false); // Prevent duplicate completion calls

  // Fetch user settings and current session
  const fetchData = useCallback(async () => {
    try {
      // Fetch settings
      const settings = await settingsService.getUserSettings();
      setUserSettings(settings);

      // Only update timer duration if no active session
      if (!currentSession) {
        setSecondsLeft(settings.pomodoro_duration * 60);
      }

      // Fetch current session
      const session = await pomodoroService.getCurrentSession();
      if (session) {
        setCurrentSession(session);
        setSecondsLeft(session.remaining_seconds);
        setIsActive(!session.is_paused);
      }
    } catch (err) {
      // Silent fail - use defaults if settings unavailable
    }
  }, [currentSession]);

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Re-fetch settings when window regains focus (e.g., returning from settings page)
  useEffect(() => {
    const handleFocus = () => {
      // Only re-fetch settings, not the entire session
      const refetchSettings = async () => {
        try {
          const settings = await settingsService.getUserSettings();
          setUserSettings(settings);
        } catch (err) {
          // Silent fail
        }
      };
      refetchSettings();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Auto-pause if active task is removed
  useEffect(() => {
    if (!hasActiveTask && isActive) {
      setIsActive(false);
    }
  }, [hasActiveTask, isActive]);

  // Sync taskInput when initialTask prop changes
  useEffect(() => {
    setTaskInput(initialTask);
  }, [initialTask]);

  const getInitialSeconds = useCallback((m: TimerMode) => {
    if (!userSettings) {
      // Fallback defaults if settings not loaded
      switch (m) {
        case 'focus': return 25 * 60;
        case 'shortBreak': return 5 * 60;
        case 'longBreak': return 15 * 60;
        default: return 25 * 60;
      }
    }

    // Use user settings
    switch (m) {
      case 'focus': return userSettings.pomodoro_duration * 60;
      case 'shortBreak': return userSettings.short_break * 60;
      case 'longBreak': return userSettings.long_break * 60;
      default: return userSettings.pomodoro_duration * 60;
    }
  }, [userSettings]);

  const changeMode = async (newMode: TimerMode) => {
    if (!hasActiveTask) return;

    // Map UI mode to SessionType
    const sessionTypeMap: Record<TimerMode, SessionType> = {
      focus: 'FOCUS',
      shortBreak: 'SHORT_BREAK',
      longBreak: 'LONG_BREAK',
    };

    try {
      // Start new session with selected type
      const session = await pomodoroService.startSession(sessionTypeMap[newMode]);

      setMode(newMode);
      setCurrentSession(session);
      setSecondsLeft(session.duration_seconds);
      setIsActive(true);
      completingRef.current = false;

      const sessionTypeLabel = {
        focus: 'Focus',
        shortBreak: 'Short Break',
        longBreak: 'Long Break',
      }[newMode];

      toast.success(`${sessionTypeLabel} session started for "${session.task_title}"`);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to start session';
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0 && currentSession && !completingRef.current) {
      // Timer hit zero - complete the session (only once)
      completingRef.current = true; // Set flag immediately to prevent duplicate calls
      setIsActive(false);

      const completeSessionAsync = async () => {
        try {
          await pomodoroService.completeSession();

          const wasFocusSession = currentSession.session_type === 'FOCUS';
          const wasBreakSession = currentSession.session_type === 'SHORT_BREAK' || currentSession.session_type === 'LONG_BREAK';

          if (wasFocusSession) {
            toast.success('🎉 Pomodoro completed! Great work!', { duration: 4000 });
          } else {
            toast.success('✅ Break completed!', { duration: 3000 });
          }

          // Debug logging
          console.log('=== AUTO-START CHECK ===');
          console.log('Session Type:', currentSession.session_type);
          console.log('Was Focus?', wasFocusSession);
          console.log('Was Break?', wasBreakSession);
          console.log('User Settings:', userSettings);
          console.log('Auto-start breaks setting:', userSettings?.auto_start_breaks);
          console.log('Auto-start pomodoros setting:', userSettings?.auto_start_pomodoros);

          // Determine what to start next based on user preferences
          let shouldAutoStart = false;
          let nextSessionType: SessionType | null = null;
          let nextMode: TimerMode | null = null;

          if (wasFocusSession) {
            // After completing a focus session, check user's preferences
            if (userSettings?.auto_start_breaks) {
              // User wants to auto-start breaks after focus
              shouldAutoStart = true;
              nextSessionType = 'SHORT_BREAK';
              nextMode = 'shortBreak';
              console.log('Will auto-start: SHORT BREAK (auto_start_breaks is ON)');
            } else if (userSettings?.auto_start_pomodoros) {
              // User wants to keep doing pomodoros back-to-back (skip breaks)
              shouldAutoStart = true;
              nextSessionType = 'FOCUS';
              nextMode = 'focus';
              console.log('Will auto-start: FOCUS (auto_start_pomodoros is ON, skipping break)');
            }
          } else if (wasBreakSession) {
            // After completing a break session
            if (userSettings?.auto_start_pomodoros) {
              // User wants to auto-start pomodoros after breaks
              shouldAutoStart = true;
              nextSessionType = 'FOCUS';
              nextMode = 'focus';
              console.log('Will auto-start: FOCUS (auto_start_pomodoros is ON)');
            }
          }

          console.log('Should Auto-Start?', shouldAutoStart);
          console.log('========================');

          if (shouldAutoStart && nextSessionType && nextMode && userSettings) {
            // Start the next session
            try {
              const nextSession = await pomodoroService.startSession(nextSessionType);
              setMode(nextMode);
              setCurrentSession(nextSession);
              setSecondsLeft(nextSession.duration_seconds);
              setIsActive(true);

              // Reset the completing flag after a small delay to ensure state updates complete
              setTimeout(() => {
                completingRef.current = false;
              }, 100);

              toast.success(`Auto-started ${nextMode === 'focus' ? 'Focus' : nextMode === 'shortBreak' ? 'Short Break' : 'Long Break'} session!`, { duration: 3000 });
            } catch (err: any) {
              const errorMsg = err.response?.data?.message || 'Failed to auto-start next session';
              toast.error(errorMsg);
              // Reset to default state
              setCurrentSession(null);
              setSecondsLeft(getInitialSeconds(mode));
              completingRef.current = false;
            }
          } else {
            // No auto-start - reset state
            setCurrentSession(null);
            setSecondsLeft(getInitialSeconds(mode));
            completingRef.current = false;
          }

          // Refresh tasks to update pomodoro count and check for task completion
          if (onPomodoroComplete) {
            await onPomodoroComplete();
          }
        } catch (err: any) {
          const errorMsg = err.response?.data?.message || 'Failed to complete session';
          toast.error(errorMsg);
          completingRef.current = false; // Reset on error
        }
      };

      completeSessionAsync();
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, currentSession, mode, getInitialSeconds, userSettings, onPomodoroComplete]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return {
      mins: String(mins).padStart(2, '0'),
      secs: String(secs).padStart(2, '0')
    };
  };

  const { mins, secs } = formatTime(secondsLeft);

  const startPomodoroSession = async () => {
    if (!hasActiveTask) return;

    try {
      // Map UI mode to SessionType
      const sessionTypeMap: Record<TimerMode, SessionType> = {
        focus: 'FOCUS',
        shortBreak: 'SHORT_BREAK',
        longBreak: 'LONG_BREAK',
      };

      const session = await pomodoroService.startSession(sessionTypeMap[mode]);

      setCurrentSession(session);
      setSecondsLeft(session.duration_seconds);
      setIsActive(true);
      toast.success(`Pomodoro started for "${session.task_title}"`);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to start Pomodoro session';
      toast.error(errorMsg);
    }
  };

  const handleStartPause = async () => {
    if (!hasActiveTask) return;

    if (!isActive && !currentSession) {
      // Starting fresh - call start API
      startPomodoroSession();
    } else if (isActive && currentSession) {
      // Currently running - pause it
      try {
        await pomodoroService.pauseSession();
        setIsActive(false);
        toast.success('Session paused');
      } catch (err: any) {
        const errorMsg = err.response?.data?.message || 'Failed to pause session';
        toast.error(errorMsg);
      }
    } else if (!isActive && currentSession) {
      // Currently paused - resume it
      try {
        await pomodoroService.resumeSession();

        // Fetch fresh session data to get accurate remaining_seconds
        const session = await pomodoroService.getCurrentSession();
        if (session) {
          setCurrentSession(session);
          setSecondsLeft(session.remaining_seconds);
          setIsActive(true);
          toast.success('Session resumed');
        }
      } catch (err: any) {
        const errorMsg = err.response?.data?.message || 'Failed to resume session';
        toast.error(errorMsg);
      }
    }
  };

  return (
    <section className="flex flex-col items-center bg-white p-8 border border-border-subtle shadow-sharp w-full">
      {/* Tabs */}
      <div className="flex border border-border-subtle bg-bg-page mb-10 overflow-hidden">
        <button
          onClick={() => changeMode('focus')}
          className={`px-6 py-2 text-sm font-bold border-r border-border-subtle transition-colors ${mode === 'focus' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-white'}`}
        >
          Focus
        </button>
        <button
          onClick={() => changeMode('shortBreak')}
          className={`px-6 py-2 text-sm font-bold border-r border-border-subtle transition-colors ${mode === 'shortBreak' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-white'}`}
        >
          Short Break
        </button>
        <button
          onClick={() => changeMode('longBreak')}
          className={`px-6 py-2 text-sm font-bold transition-colors ${mode === 'longBreak' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-white'}`}
        >
          Long Break
        </button>
      </div>

      {/* Mode Indicator */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-page text-text-secondary text-xs font-bold uppercase tracking-wider mb-6 border border-border-subtle">
        <span className="material-symbols-outlined !text-sm text-primary">bolt</span>
        {currentSession ? (
          currentSession.session_type === 'FOCUS' ? 'Current Focus' : 'Taking a Break'
        ) : (
          mode === 'focus' ? 'Current Focus' : 'Taking a Break'
        )}
      </div>

      {/* Task Display (Read-only) */}
      <div className="w-full relative mb-8">
        <div className="w-full bg-transparent text-center py-2 px-4 text-3xl md:text-4xl font-display font-bold text-text-main transition-all">
          {taskInput || "What are you working on?"}
        </div>
        <div className="flex justify-center mt-2">
          <div className="h-0.5 w-1/4 bg-primary/20 transition-all"></div>
        </div>
      </div>

      {/* Clock Display */}
      <div className="flex gap-4 py-2 px-4 mb-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center bg-bg-page border border-border-subtle text-text-main">
            <p className="text-6xl sm:text-7xl font-bold leading-none tracking-tighter font-display tabular-nums">{mins}</p>
          </div>
          <p className="text-text-secondary text-xs uppercase font-bold tracking-widest">Minutes</p>
        </div>
        <div className="flex flex-col justify-center pb-8">
          <span className="text-text-secondary/30 text-4xl font-light">:</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center bg-bg-page border border-border-subtle text-text-main">
            <p className="text-6xl sm:text-7xl font-bold leading-none tracking-tighter font-display tabular-nums">{secs}</p>
          </div>
          <p className="text-text-secondary text-xs uppercase font-bold tracking-widest">Seconds</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center w-full">
        <button
          onClick={handleStartPause}
          disabled={!hasActiveTask}
          className={`group flex min-w-[220px] items-center justify-center h-16 px-10 ${isActive ? 'bg-white text-primary border-primary' : 'bg-primary text-white border-primary-dark'} hover:opacity-90 transition-all gap-3 text-lg font-bold border-2 shadow-sharp active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed`}
          title={!hasAnyTasks ? 'Create a task first' : !hasActiveTask ? 'Select a task to start' : ''}
        >
          <span className="material-symbols-outlined !text-[28px]">{isActive ? 'pause' : 'play_arrow'}</span>
          <span>{isActive ? 'Pause Focus' : 'Start Focus'}</span>
        </button>
      </div>

      <p className="text-xs font-mono text-text-secondary mt-8 uppercase tracking-wider">
        DAILY GOAL: <span className="text-primary font-bold">{tasks.reduce((sum, task) => sum + (task.completed_pomodoros || 0), 0)}</span>/{userSettings?.daily_goal_pomodoros || 8} POMODOROS
      </p>
    </section>
  );
};

export default TimerDisplay;
