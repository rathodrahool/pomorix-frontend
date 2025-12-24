
export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface Task {
  id: string;
  title: string;
  pomodoros: number;
  completed: boolean;
  active?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
  type: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LiveUser {
  id: string;
  name: string;
  avatar: string;
  status: 'focusing' | 'break' | 'done';
  message: string;
  timestamp: string;
}

export interface UserStats {
  streak: number;
  totalSessions: number;
  totalHours: number;
  dailyAvg: number;
  topPercent: number;
  pomodorosCompleted: number;
}
