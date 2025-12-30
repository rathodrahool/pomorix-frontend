

import React, { useMemo } from 'react';
import { useStreak, useBadgeDefinitions } from '../../hooks';
import { RANK_TIERS, RANK_REQUIREMENTS, type BadgeCode } from '../../types';


const StatsSidebar: React.FC = () => {
  const { streak, loading: streakLoading } = useStreak();
  const { data: badges, isLoading: badgesLoading } = useBadgeDefinitions();

  // Calculate progress toward next milestone (14 days)
  const nextMilestone = 14;
  const currentStreak = streak?.current_streak || 0;
  const progress = Math.min((currentStreak / nextMilestone) * 100, 100);
  const daysRemaining = Math.max(nextMilestone - currentStreak, 0);

  // Calculate current rank and next badge
  const { currentRank, nextBadge, badgeProgress, currentPomodoros } = useMemo(() => {
    if (!badges) {
      return {
        currentRank: null,
        nextBadge: null,
        badgeProgress: 0,
        currentPomodoros: 0
      };
    }

    // Filter rank tier badges (VOLUME category)
    const rankBadges = badges.filter(b => b.category === 'VOLUME');

    // Get unlocked rank badges sorted by tier
    const unlockedRanks = rankBadges
      .filter(b => b.is_unlocked)
      .sort((a, b) => {
        const indexA = RANK_TIERS.indexOf(a.code as BadgeCode);
        const indexB = RANK_TIERS.indexOf(b.code as BadgeCode);
        return indexB - indexA; // Descending order
      });

    const current = unlockedRanks[0] || null;

    // Find next badge in progression
    const currentIndex = current ? RANK_TIERS.indexOf(current.code as BadgeCode) : -1;
    const nextBadgeCode = RANK_TIERS[currentIndex + 1];
    const next = nextBadgeCode ? rankBadges.find(b => b.code === nextBadgeCode) : null;

    // Calculate pomodoros based on current rank
    const currentPomos = current ? RANK_REQUIREMENTS[current.code as BadgeCode] : 0;

    // Calculate progress to next badge
    let progressPercent = 0;
    if (next) {
      const required = RANK_REQUIREMENTS[next.code as BadgeCode];
      progressPercent = Math.min((currentPomos / required) * 100, 100);
    } else {
      // Max rank achieved
      progressPercent = 100;
    }

    return {
      currentRank: current,
      nextBadge: next,
      badgeProgress: progressPercent,
      currentPomodoros: currentPomos
    };
  }, [badges]);

  const loading = streakLoading || badgesLoading;

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
          <span className="text-xl font-bold text-text-main font-mono">
            {loading ? '...' : Math.round((currentPomodoros * 25) / 60)}
          </span>
          <span className="text-[9px] uppercase font-bold text-text-secondary tracking-wide">Hours</span>
        </div>
        <div className="p-4 flex flex-col items-center justify-center gap-1 hover:bg-white transition-colors">
          <span className="text-xl font-bold text-text-main font-mono">
            {loading ? '...' : currentPomodoros}
          </span>
          <span className="text-[9px] uppercase font-bold text-text-secondary tracking-wide">Pomos</span>
        </div>
      </div>

      {/* Next Badge */}
      <div className="p-6 flex-1 bg-bg-page flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Next Badge</h3>
          {nextBadge && (
            <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5">
              {nextBadge.title.toUpperCase()}
            </span>
          )}
        </div>

        {loading ? (
          <div className="bg-white border border-border-subtle p-5 shadow-sm">
            <div className="h-32 flex items-center justify-center">
              <div className="animate-spin text-primary">
                <span className="material-symbols-outlined">progress_activity</span>
              </div>
            </div>
          </div>
        ) : nextBadge ? (
          <div className="bg-white border border-border-subtle p-5 shadow-sm relative overflow-hidden group hover:border-primary transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-8xl text-primary -rotate-12 translate-x-4 -translate-y-4">verified</span>
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="size-10 flex items-center justify-center bg-[#f5f5f5] text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-xl">verified</span>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-text-secondary">Upcoming</div>
                  <div className="text-sm font-bold text-text-main">{nextBadge.title}</div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-mono font-bold text-text-secondary">
                  <span>PROGRESS</span>
                  <span>{Math.round(badgeProgress)}%</span>
                </div>
                <div className="w-full bg-[#f0f0f0] h-1.5 border border-[#f0f0f0]">
                  <div className="bg-primary h-full relative" style={{ width: `${badgeProgress}%` }}>
                    <div className="absolute inset-0 bg-white/30 skew-x-12 w-full -translate-x-full animate-[shine_2s_infinite]"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-dashed border-gray-200 mt-1">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">lock</span>
                <p className="text-[10px] text-text-secondary leading-tight">
                  {nextBadge.description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-border-subtle p-5 shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-4 items-center text-center">
              <div className="size-16 flex items-center justify-center bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-3xl">emoji_events</span>
              </div>
              <div>
                <div className="text-sm font-bold text-text-main mb-1">Max Rank Achieved!</div>
                <p className="text-[10px] text-text-secondary leading-tight">
                  You've unlocked the highest badge tier: <span className="font-bold text-text-main">{currentRank?.title || 'Ascendant'}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto p-4 border-t border-border-subtle bg-[#fafafa]">
        <p className="text-[10px] text-text-secondary text-center font-mono uppercase">
          Season Ends: 12 Days
        </p>
      </div>
    </div>
  );
};

export default StatsSidebar;
