
import React, { useState, useEffect, useCallback } from 'react';
import { TimerMode } from '../../types';

interface TimerDisplayProps {
  initialTask: string;
  onTaskChange: (task: string) => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ initialTask, onTaskChange }) => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [taskInput, setTaskInput] = useState(initialTask);

  // Sync taskInput when initialTask prop changes
  useEffect(() => {
    setTaskInput(initialTask);
  }, [initialTask]);

  const getInitialSeconds = useCallback((m: TimerMode) => {
    switch (m) {
      case 'focus': return 25 * 60;
      case 'shortBreak': return 5 * 60;
      case 'longBreak': return 15 * 60;
      default: return 25 * 60;
    }
  }, []);

  const changeMode = (newMode: TimerMode) => {
    setMode(newMode);
    setSecondsLeft(getInitialSeconds(newMode));
    setIsActive(false);
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      // Play sound or notify
      alert('Time is up!');
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return {
      mins: String(mins).padStart(2, '0'),
      secs: String(secs).padStart(2, '0')
    };
  };

  const { mins, secs } = formatTime(secondsLeft);

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
        {mode === 'focus' ? 'Current Focus' : 'Taking a Break'}
      </div>

      {/* Task Input */}
      <div className="w-full relative group mb-8">
        <input
          className="w-full bg-transparent border-none text-center py-2 px-4 text-3xl md:text-4xl font-display font-bold text-text-main placeholder-gray-300 outline-none transition-all"
          placeholder="What are you working on?"
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onBlur={() => onTaskChange(taskInput)}
        />
        <div className="flex justify-center mt-2">
          <div className="h-0.5 w-1/4 bg-primary/20 group-focus-within:w-1/2 group-focus-within:bg-primary transition-all"></div>
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
      <div className="flex justify-center w-full gap-4">
        <button
          onClick={() => { setSecondsLeft(getInitialSeconds(mode)); setIsActive(false); }}
          className="flex h-14 w-14 items-center justify-center bg-bg-page hover:bg-white transition-all text-text-secondary border border-border-subtle shadow-sharp active:translate-y-[2px] active:shadow-none"
          title="Reset"
        >
          <span className="material-symbols-outlined !text-[24px]">restart_alt</span>
        </button>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`group flex min-w-[200px] cursor-pointer items-center justify-center h-14 px-8 ${isActive ? 'bg-white text-primary border-primary' : 'bg-primary text-white border-primary-dark'} hover:opacity-90 transition-all gap-3 text-lg font-bold border shadow-sharp active:translate-y-[2px] active:shadow-none`}
        >
          <span className="material-symbols-outlined !text-[28px]">{isActive ? 'pause' : 'play_arrow'}</span>
          <span>{isActive ? 'Pause Focus' : 'Start Focus'}</span>
        </button>
        <button
          className="flex h-14 w-14 items-center justify-center bg-bg-page hover:bg-white transition-all text-text-secondary border border-border-subtle shadow-sharp active:translate-y-[2px] active:shadow-none"
          title="Skip"
        >
          <span className="material-symbols-outlined !text-[24px]">skip_next</span>
        </button>
      </div>

      <p className="text-xs font-mono text-text-secondary mt-8 uppercase tracking-wider">
        DAILY GOAL: <span className="text-primary font-bold">4</span>/8 POMODOROS
      </p>
    </section>
  );
};

export default TimerDisplay;
