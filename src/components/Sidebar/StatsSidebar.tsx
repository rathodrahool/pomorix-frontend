
import React, { useMemo } from 'react';
import { useStreak, useTotalStats, useBadgeDefinitions } from '../../hooks';
import { RANK_TIERS, BadgeRuleType, type BadgeCode } from '../../types';


const StatsSidebar: React.FC = () => {
  const { streak, loading: streakLoading } = useStreak();
  const { stats: totalStats, loading: statsLoading } = useTotalStats();
  const { data: badges, isLoading: badgesLoading } = useBadgeDefinitions();

  // Get current streak count
  const currentStreak = streak?.current_streak || 0;

  // Calculate current rank and next badge
  const { currentRank, nextBadge, badgeProgress } = useMemo(() => {
    if (!badges) {
      return {
        currentRank: null,
        nextBadge: null,
        badgeProgress: 0,
      };
    }

    // Filter rank tier badges (VOLUME category + SESSION_COUNT rule type)
    const rankBadges = badges.filter(
      b => b.category === 'VOLUME' && b.rule_type === BadgeRuleType.SESSION_COUNT
    );

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

    // Calculate progress to next badge using real pomodoro count and dynamic rule_value
    let progressPercent = 0;
    if (next && totalStats) {
      const required = next.rule_value; // Use dynamic rule_value from backend
      progressPercent = Math.min((totalStats.total_pomodoros / required) * 100, 100);
    } else {
      // Max rank achieved
      progressPercent = 100;
    }

    return {
      currentRank: current,
      nextBadge: next,
      badgeProgress: progressPercent,
    };
  }, [badges, totalStats]);

  // Calculate days remaining in current season (2 months from now)
  const daysUntilSeasonEnd = useMemo(() => {
    const today = new Date();

    // Calculate season end: current month + 2 months, last day of that month
    const seasonEndDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    // Note: Setting day to 0 gives us the last day of the previous month
    // So month + 2, day 0 = last day of (month + 1), which is wrong
    // We need: month + 2, then get last day of that month
    const endMonth = today.getMonth() + 2;
    const endYear = today.getFullYear() + Math.floor(endMonth / 12);
    const adjustedEndMonth = endMonth % 12;

    // Get last day of the end month: set day to 0 of next month
    const seasonEnd = new Date(endYear, adjustedEndMonth + 1, 0);
    seasonEnd.setHours(23, 59, 59, 999); // End of day

    // Calculate difference in days
    const diffTime = seasonEnd.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  }, []); // Empty deps - recalculates on every render (updates daily)

  const loading = streakLoading || badgesLoading || statsLoading;

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
        <div className="flex items-baseline gap-2 relative z-10">
          {loading ? (
            <div className="h-12 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <>
              <span className="text-5xl font-bold text-text-main tracking-tighter">{currentStreak}</span>
              <span className="text-sm text-text-secondary font-bold uppercase">days</span>
            </>
          )}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 border-b border-border-subtle bg-[#fafafa]">
        <div className="p-4 border-r border-border-subtle flex flex-col items-center justify-center gap-1 hover:bg-white transition-colors">
          <span className="text-xl font-bold text-text-main font-mono">
            {loading ? '...' : totalStats?.total_hours || 0}
          </span>
          <span className="text-[9px] uppercase font-bold text-text-secondary tracking-wide">Hours</span>
        </div>
        <div className="p-4 flex flex-col items-center justify-center gap-1 hover:bg-white transition-colors">
          <span className="text-xl font-bold text-text-main font-mono">
            {loading ? '...' : totalStats?.total_pomodoros || 0}
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
          Season Ends: {daysUntilSeasonEnd} {daysUntilSeasonEnd === 1 ? 'Day' : 'Days'}
        </p>
      </div>
    </div>
  );
};

export default StatsSidebar;
