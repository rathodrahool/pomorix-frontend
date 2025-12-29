
import React from 'react';
import { Achievement } from '../../types';
import { useStreak } from '../../hooks';

const StatsSidebar: React.FC = () => {
  const { streak, loading } = useStreak();

  // Calculate progress toward next milestone (14 days)
  const nextMilestone = 14;
  const currentStreak = streak?.current_streak || 0;
  const progress = Math.min((currentStreak / nextMilestone) * 100, 100);
  const daysRemaining = Math.max(nextMilestone - currentStreak, 0);

  const achievements: Achievement[] = [
    { id: '1', title: 'First Step', description: 'Complete your first Pomodoro', icon: 'check_circle', unlocked: true, type: 'common' },
    { id: '2', title: 'Week Streak', description: '7 Day Streak Achieved!', icon: 'local_fire_department', unlocked: true, type: 'rare' },
    { id: '3', title: '100 Pomos', description: 'Complete 100 sessions', icon: 'timer_10', unlocked: true, type: 'rare' },
    { id: '4', title: 'Veteran', description: 'Reach 500 Pomos', icon: 'military_tech', unlocked: false, type: 'epic' },
    { id: '5', title: 'Month', description: 'Focus for a whole month', icon: 'calendar_month', unlocked: false, type: 'epic' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Streak Banner */}
      <div className="p-6 border-b border-border-subtle bg-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="material-symbols-outlined text-9xl text-primary -rotate-12 translate-x-4 -translate-y-4">local_fire_department</span>
        </div>
        <div className="flex items-center justify-between mb-3 relative z-10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Current Streak</h3>
          <span className="material-symbols-outlined text-primary text-xl animate-pulse">local_fire_department</span>
        </div>
        <div className="flex items-baseline gap-2 mb-4 relative z-10">
          {loading ? (
            <div className="h-12 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <>
              <span className="text-5xl font-bold text-text-main tracking-tighter">{currentStreak}</span>
              <span className="text-sm text-text-secondary font-bold uppercase">days</span>
            </>
          )}
        </div>
        <div className="relative z-10 space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-mono text-text-secondary">NEXT: {nextMilestone} DAYS</span>
            <span className="text-[10px] font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-[#f0f0f0] h-2 border border-[#f0f0f0]">
            <div className="bg-primary h-full relative overflow-hidden transition-all duration-300" style={{ width: `${progress}%` }}>
              <div className="absolute inset-0 bg-white/30 skew-x-12 w-full -translate-x-full animate-[shine_2s_infinite]"></div>
            </div>
          </div>
          <p className="text-[10px] text-text-secondary leading-tight pt-1">
            {daysRemaining > 0 ? (
              <>Maintain your streak for <span className="text-text-main font-bold">{daysRemaining} more {daysRemaining === 1 ? 'day' : 'days'}</span> to unlock the Fortnight badge.</>
            ) : (
              <>🎉 <span className="text-text-main font-bold">Congratulations!</span> You've reached the Fortnight milestone!</>
            )}
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 border-b border-border-subtle bg-[#fafafa]">
        <div className="p-4 border-r border-border-subtle flex flex-col items-center justify-center gap-1 hover:bg-white transition-colors">
          <span className="text-xl font-bold text-text-main font-mono">42</span>
          <span className="text-[9px] uppercase font-bold text-text-secondary tracking-wide">Hours</span>
        </div>
        <div className="p-4 flex flex-col items-center justify-center gap-1 hover:bg-white transition-colors">
          <span className="text-xl font-bold text-text-main font-mono">118</span>
          <span className="text-[9px] uppercase font-bold text-text-secondary tracking-wide">Pomos</span>
        </div>
      </div>

      {/* Achievements List */}
      <div className="flex flex-col flex-1">
        <div className="p-4 pb-2 flex items-center justify-between sticky top-0 bg-bg-page z-10 border-b border-[#eee]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Achievements</h3>
          <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5">5/12</span>
        </div>
        <div className="p-4 grid grid-cols-3 gap-3 overflow-y-auto">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`group relative aspect-square bg-white border transition-all cursor-help flex flex-col items-center justify-center gap-1 ${a.unlocked ? (a.type === 'rare' ? 'border-primary shadow-sm' : 'border-border-subtle') : 'bg-[#f5f5f5] border-dashed border-[#cccccc] opacity-60'}`}
            >
              <span className={`material-symbols-outlined text-2xl ${a.unlocked ? (a.type === 'rare' ? 'text-primary' : 'text-text-main') : 'text-[#bbbbbb]'}`}>
                {a.icon}
              </span>
              <span className={`text-[8px] font-bold uppercase ${a.unlocked ? (a.type === 'rare' ? 'text-primary' : 'text-text-main') : 'text-[#999999]'}`}>
                {a.title}
              </span>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[140px] bg-black text-white text-[10px] p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-center font-medium">
                {a.description}
                {!a.unlocked && <span className="block mt-1 font-bold text-primary">LOCKED</span>}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-border-subtle bg-[#fafafa]">
        <p className="text-[10px] text-text-secondary text-center font-mono uppercase">
          Top 5% of users this week
        </p>
      </div>
    </div>
  );
};

export default StatsSidebar;
