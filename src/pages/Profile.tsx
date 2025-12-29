
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 4.1 },
  { name: 'Wed', hours: 1.8 },
  { name: 'Thu', hours: 5.5 },
  { name: 'Fri', hours: 3.2 },
  { name: 'Sat', hours: 1.2 },
  { name: 'Sun', hours: 3.8 },
];

const Profile: React.FC = () => {
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
                <span className="block text-xl font-bold font-mono">1,240</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Total Sessions</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono">50h</span>
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
          <span className="text-xs font-mono text-text-secondary">CURRENT RANK: DIAMOND</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Bronze - Tier I */}
          <div className="bg-white border border-border-subtle p-5 flex flex-col items-center justify-between h-48 relative group hover:border-[#cd7f32] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-sharp border-b-4 border-b-[#cd7f32] cursor-pointer">
            <div className="w-full flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#cd7f32]">Tier I</span>
              <span className="material-symbols-outlined text-base text-primary group-hover:scale-110 transition-transform">check_circle</span>
            </div>
            <div className="flex flex-col items-center gap-2 z-10">
              <span className="material-symbols-outlined text-6xl text-[#cd7f32] drop-shadow-sm font-light group-hover:scale-110 transition-transform duration-300">shield</span>
            </div>
            <div className="text-center w-full mt-4">
              <h4 className="font-bold text-text-main text-lg tracking-tight uppercase">Bronze</h4>
              <div className="w-full h-px bg-border-subtle my-2"></div>
              <p className="text-[10px] text-text-secondary font-mono uppercase">1+ Hours</p>
            </div>
          </div>

          {/* Silver - Tier II */}
          <div className="bg-white border border-border-subtle p-5 flex flex-col items-center justify-between h-48 relative group hover:border-slate-400 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-sharp border-b-4 border-b-slate-400 cursor-pointer">
            <div className="w-full flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tier II</span>
              <span className="material-symbols-outlined text-base text-primary group-hover:scale-110 transition-transform">check_circle</span>
            </div>
            <div className="flex flex-col items-center gap-2 z-10">
              <span className="material-symbols-outlined text-6xl text-slate-400 drop-shadow-sm font-light group-hover:scale-110 transition-transform duration-300">verified_user</span>
            </div>
            <div className="text-center w-full mt-4">
              <h4 className="font-bold text-text-main text-lg tracking-tight uppercase">Silver</h4>
              <div className="w-full h-px bg-border-subtle my-2"></div>
              <p className="text-[10px] text-text-secondary font-mono uppercase">10+ Hours</p>
            </div>
          </div>

          {/* Gold - Tier III */}
          <div className="bg-white border border-border-subtle p-5 flex flex-col items-center justify-between h-48 relative group hover:border-yellow-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-sharp border-b-4 border-b-yellow-500 cursor-pointer">
            <div className="w-full flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">Tier III</span>
              <span className="material-symbols-outlined text-base text-primary group-hover:scale-110 transition-transform">check_circle</span>
            </div>
            <div className="flex flex-col items-center gap-2 z-10">
              <span className="material-symbols-outlined text-6xl text-yellow-500 drop-shadow-sm font-light group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">stars</span>
            </div>
            <div className="text-center w-full mt-4">
              <h4 className="font-bold text-text-main text-lg tracking-tight uppercase">Gold</h4>
              <div className="w-full h-px bg-border-subtle my-2"></div>
              <p className="text-[10px] text-text-secondary font-mono uppercase">50+ Hours</p>
            </div>
          </div>

          {/* Platinum - Tier IV */}
          <div className="bg-white border border-border-subtle p-5 flex flex-col items-center justify-between h-48 relative group hover:border-cyan-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-sharp border-b-4 border-b-cyan-500 cursor-pointer">
            <div className="w-full flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600">Tier IV</span>
              <span className="material-symbols-outlined text-base text-primary group-hover:scale-110 transition-transform">check_circle</span>
            </div>
            <div className="flex flex-col items-center gap-2 z-10">
              <span className="material-symbols-outlined text-6xl text-cyan-500 drop-shadow-sm font-light group-hover:scale-110 transition-transform duration-300">military_tech</span>
            </div>
            <div className="text-center w-full mt-4">
              <h4 className="font-bold text-text-main text-lg tracking-tight uppercase">Platinum</h4>
              <div className="w-full h-px bg-border-subtle my-2"></div>
              <p className="text-[10px] text-text-secondary font-mono uppercase">100+ Hours</p>
            </div>
          </div>

          {/* Diamond - Tier V (Current) */}
          <div className="bg-white border border-border-subtle p-5 flex flex-col items-center justify-between h-48 relative group border-2 border-primary shadow-[0_4px_20px_rgba(255,102,0,0.15)] hover:shadow-[0_8px_30px_rgba(255,102,0,0.25)] hover:scale-[1.03] transition-all duration-300 overflow-hidden cursor-pointer">
            <div className="absolute -right-8 -top-8 size-24 bg-primary/10 rotate-45 pointer-events-none group-hover:bg-primary/15 transition-colors"></div>
            <div className="w-full flex justify-between items-start mb-2 relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 animate-pulse">Tier V</span>
              <span className="px-1.5 py-0.5 bg-primary text-white text-[9px] font-bold uppercase tracking-wider shadow-sm">Current</span>
            </div>
            <div className="flex flex-col items-center gap-2 z-10">
              <span className="material-symbols-outlined text-6xl text-blue-600 drop-shadow-md font-light group-hover:scale-110 group-hover:drop-shadow-xl transition-all duration-300">diamond</span>
            </div>
            <div className="text-center w-full mt-4 relative z-10">
              <h4 className="font-bold text-text-main text-lg tracking-tight uppercase">Diamond</h4>
              <div className="w-full h-px bg-border-subtle my-2"></div>
              <p className="text-[10px] text-text-secondary font-mono uppercase">500+ Hours</p>
            </div>
          </div>

          {/* Ascendant - Tier VI (Locked) */}
          <div className="bg-slate-50 border border-dashed border-slate-300 p-5 flex flex-col items-center justify-between h-48 relative group shadow-sharp hover:border-slate-400 hover:bg-white hover:scale-[1.02] transition-all duration-500 cursor-not-allowed">
            <div className="w-full flex justify-between items-start mb-2 opacity-50 group-hover:opacity-70 transition-opacity">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Tier VI</span>
              <span className="material-symbols-outlined text-base text-slate-400 group-hover:scale-110 transition-transform">lock</span>
            </div>
            <div className="flex flex-col items-center gap-2 z-10 opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500">
              <span className="material-symbols-outlined text-6xl text-primary drop-shadow-lg font-light">workspace_premium</span>
            </div>
            <div className="text-center w-full mt-4 opacity-50 group-hover:opacity-75 transition-opacity duration-500">
              <h4 className="font-bold text-text-secondary text-lg tracking-tight uppercase">Ascendant</h4>
              <div className="w-full h-px bg-border-subtle my-2"></div>
              <p className="text-[10px] text-text-secondary font-mono uppercase">Top 1%</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
