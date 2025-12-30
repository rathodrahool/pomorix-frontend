
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useBadgeDefinitions } from '../hooks';
import { RANK_TIERS, RANK_REQUIREMENTS, type BadgeCode } from '../types';

const data = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 4.1 },
  { name: 'Wed', hours: 1.8 },
  { name: 'Thu', hours: 5.5 },
  { name: 'Fri', hours: 3.2 },
  { name: 'Sat', hours: 1.2 },
  { name: 'Sun', hours: 3.8 },
];

// Badge tier colors and icons
const BADGE_STYLES: Record<string, { color: string; icon: string; borderColor: string; }> = {
  BRONZE: { color: '#cd7f32', icon: 'shield', borderColor: '#cd7f32' },
  SILVER: { color: '#64748b', icon: 'verified_user', borderColor: '#64748b' },
  GOLD: { color: '#f59e0b', icon: 'stars', borderColor: '#f59e0b' },
  PLATINUM: { color: '#06b6d4', icon: 'military_tech', borderColor: '#06b6d4' },
  DIAMOND: { color: '#2563eb', icon: 'diamond', borderColor: '#2563eb' },
  ASCENDANT: { color: '#ff6600', icon: 'workspace_premium', borderColor: '#ff6600' },
};

const Profile: React.FC = () => {
  const { data: badges, isLoading } = useBadgeDefinitions();

  // Calculate current rank and tier badges
  const { currentRank, rankBadges, totalPomodoros } = useMemo(() => {
    if (!badges) {
      return {
        currentRank: null,
        rankBadges: [],
        totalPomodoros: 0
      };
    }

    // Filter rank tier badges (VOLUME category) and sort by tier
    const ranks = badges
      .filter(b => b.category === 'VOLUME')
      .sort((a, b) => {
        const indexA = RANK_TIERS.indexOf(a.code as BadgeCode);
        const indexB = RANK_TIERS.indexOf(b.code as BadgeCode);
        return indexA - indexB; // Ascending order
      });

    // Get current rank (highest unlocked)
    const unlockedRanks = ranks.filter(b => b.is_unlocked);
    const current = unlockedRanks[unlockedRanks.length - 1] || null;

    // Calculate total pomodoros from current rank
    const totalPomos = current ? RANK_REQUIREMENTS[current.code as BadgeCode] : 0;

    return {
      currentRank: current,
      rankBadges: ranks,
      totalPomodoros: totalPomos
    };
  }, [badges]);

  const totalHours = Math.round((totalPomodoros * 25) / 60);

  return (
    <div className="max-w-[1024px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Profile Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-border-subtle p-6 shadow-sharp flex flex-col sm:flex-row items-start gap-6">
          <div className="relative group shrink-0">
            <div className="size-28 sm:size-32 bg-cover bg-center border border-slate-200"
              style={{ backgroundImage: 'url("https://picsum.photos/seed/profile123/200/200")' }}></div>
          </div>
          <div className="flex flex-col h-full justify-between w-full">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-main tracking-tight font-display">FocusMaster99</h2>
              <p className="text-primary font-mono text-xs mt-1">user_id: 849201</p>
              <p className="text-text-secondary text-sm mt-3">Member since Jan 2023</p>
            </div>
            <div className="mt-6 pt-6 border-t border-border-subtle flex gap-8">
              <div>
                <span className="block text-xl font-bold font-mono">
                  {isLoading ? '...' : totalPomodoros}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Total Sessions</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono">
                  {isLoading ? '...' : `${totalHours}h`}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Total Hours</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white border border-border-subtle p-6 shadow-sharp flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary group-hover:h-2 transition-all"></div>
          <span className="material-symbols-outlined text-4xl text-primary mb-3">local_fire_department</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-2">Current Streak</span>
          <div className="text-6xl font-bold font-mono text-text-main mb-2">12</div>
          <div className="text-text-secondary text-sm font-medium">Days</div>
          <div className="mt-4 inline-block px-2 py-1 bg-bg-page text-[10px] font-mono text-text-secondary border border-border-subtle">
            PB: 15 DAYS
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold border-l-4 border-primary pl-3 leading-none text-text-main font-display">Analytics</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-secondary">RANGE:</span>
            <select className="bg-transparent text-xs font-mono text-text-main border-none outline-none cursor-pointer hover:text-primary focus:ring-0 py-0 pr-8">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>All Time</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-border-subtle p-5 hover:border-primary transition-colors shadow-sharp">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Focus Time</span>
                <span className="material-symbols-outlined text-text-secondary text-lg">hourglass_top</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-text-main">24.5</span>
                  <span className="text-sm text-text-secondary font-mono">h</span>
                </div>
                <div className="mt-2 text-xs text-primary font-mono flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">arrow_upward</span> 12%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border-subtle p-5 hover:border-primary transition-colors shadow-sharp">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Daily Avg</span>
                <span className="material-symbols-outlined text-text-secondary text-lg">date_range</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-text-main">3.5</span>
                  <span className="text-sm text-text-secondary font-mono">h/d</span>
                </div>
                <div className="mt-2 text-xs text-text-secondary font-mono flex items-center gap-1">
                  Goal: 3.0h
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border-subtle p-5 hover:border-primary transition-colors shadow-sharp">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Sessions</span>
                <span className="material-symbols-outlined text-text-secondary text-lg">check_box</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-text-main">42</span>
                </div>
                <div className="mt-2 text-xs text-text-secondary font-mono flex items-center gap-1">
                  Top 15%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white border border-border-subtle p-6 shadow-sharp h-[300px]">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-6">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#828282', fontSize: 10, fontWeight: 'bold' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#828282', fontSize: 10 }}
              />
              <Tooltip
                cursor={{ fill: '#f6f6ef' }}
                contentStyle={{ borderRadius: 0, border: '1px solid #dddddd', fontSize: 12, fontWeight: 'bold' }}
              />
              <Bar dataKey="hours">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Thu' ? '#ff6600' : '#e5e5e5'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Rank & Badges */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold border-l-4 border-primary pl-3 leading-none text-text-main font-display">Rank & Badges</h3>
          <span className="text-xs font-mono text-text-secondary">
            {isLoading ? 'LOADING...' : `CURRENT RANK: ${currentRank?.title?.toUpperCase() || 'NONE'}`}
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-border-subtle p-5 h-48 flex items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {rankBadges.map((badge) => {
              const style = BADGE_STYLES[badge.code] || BADGE_STYLES.BRONZE;
              const isUnlocked = badge.is_unlocked;
              const isCurrent = currentRank?.code === badge.code;
              const tierIndex = RANK_TIERS.indexOf(badge.code as BadgeCode) + 1;
              const requiredPomodoros = RANK_REQUIREMENTS[badge.code as BadgeCode];
              const requiredHours = Math.round((requiredPomodoros * 25) / 60);

              return (
                <div
                  key={badge.id}
                  className={`p-5 flex flex-col items-center justify-between h-48 relative group transition-all duration-300 cursor-pointer
                    ${isCurrent
                      ? 'bg-white border-2 border-primary shadow-[0_4px_20px_rgba(255,102,0,0.15)] hover:shadow-[0_8px_30px_rgba(255,102,0,0.25)] hover:scale-[1.03]'
                      : isUnlocked
                        ? `bg-white border border-border-subtle shadow-sharp border-b-4 hover:border-[${style.borderColor}] hover:shadow-lg hover:scale-[1.02]`
                        : 'bg-slate-50 border border-dashed border-slate-300 shadow-sharp hover:border-slate-400 hover:bg-white hover:scale-[1.02] cursor-not-allowed'
                    }`}
                  style={isUnlocked && !isCurrent ? { borderBottomColor: style.borderColor } : {}}
                >
                  {isCurrent && (
                    <div className="absolute -right-8 -top-8 size-24 bg-primary/10 rotate-45 pointer-events-none group-hover:bg-primary/15 transition-colors"></div>
                  )}

                  <div className={`w-full flex justify-between items-start mb-2 relative z-10 ${!isUnlocked ? 'opacity-50 group-hover:opacity-70' : ''}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isUnlocked ? (isCurrent ? 'text-primary animate-pulse' : `text-[${style.color}]`) : 'text-text-secondary'}`}>
                      Tier {tierIndex}
                    </span>
                    {isUnlocked ? (
                      isCurrent ? (
                        <span className="px-1.5 py-0.5 bg-primary text-white text-[9px] font-bold uppercase tracking-wider shadow-sm">Current</span>
                      ) : (
                        <span className="material-symbols-outlined text-base text-primary group-hover:scale-110 transition-transform">check_circle</span>
                      )
                    ) : (
                      <span className="material-symbols-outlined text-base text-slate-400 group-hover:scale-110 transition-transform">lock</span>
                    )}
                  </div>

                  <div className={`flex flex-col items-center gap-2 z-10 transition-all duration-500 ${!isUnlocked ? 'opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105' : ''}`}>
                    <span
                      className={`material-symbols-outlined text-6xl drop-shadow-sm font-light group-hover:scale-110 transition-transform duration-300 ${isCurrent ? 'drop-shadow-md group-hover:drop-shadow-xl' : ''}`}
                      style={{ color: isUnlocked ? style.color : '#94a3b8' }}
                    >
                      {style.icon}
                    </span>
                  </div>

                  <div className={`text-center w-full mt-4 relative z-10 ${!isUnlocked ? 'opacity-50 group-hover:opacity-75' : ''}`}>
                    <h4 className={`font-bold text-lg tracking-tight uppercase ${isUnlocked ? 'text-text-main' : 'text-text-secondary'}`}>
                      {badge.title}
                    </h4>
                    <div className="w-full h-px bg-border-subtle my-2"></div>
                    <p className="text-[10px] text-text-secondary font-mono uppercase">
                      {requiredHours}+ Hours
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
