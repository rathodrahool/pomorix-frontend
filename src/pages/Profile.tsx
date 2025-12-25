
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
              style={{backgroundImage: 'url("https://picsum.photos/seed/profile123/200/200")'}}></div>
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

      {/* Badges */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold border-l-4 border-primary pl-3 leading-none text-text-main font-display">Earned Badges</h3>
          <button className="text-xs font-mono text-primary hover:underline">VIEW_ALL</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-primary/30 p-4 flex flex-col gap-3 group relative overflow-hidden shadow-sharp">
            <div className="flex justify-between items-start">
              <div className="size-10 bg-bg-page border border-border-subtle flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">looks_one</span>
              </div>
              <span className="border font-mono text-[10px] px-2 py-0.5 uppercase tracking-wide border-slate-300 text-text-secondary bg-slate-50">Common</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-text-main">Weekly Focus</h4>
              <p className="text-[10px] text-text-secondary mt-1 leading-snug">Maintain a streak for 7 consecutive days.</p>
            </div>
            <div className="mt-auto pt-3">
              <div className="text-[10px] font-mono text-primary uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]">check_circle</span> Unlocked
              </div>
            </div>
          </div>

          <div className="bg-white border border-primary p-4 flex flex-col gap-3 group relative overflow-hidden shadow-sharp">
            <div className="absolute -right-4 -top-4 text-primary/5 text-8xl font-bold select-none">100</div>
            <div className="flex justify-between items-start z-10">
              <div className="size-10 bg-primary/5 border border-primary flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">timer</span>
              </div>
              <span className="border font-mono text-[10px] px-2 py-0.5 uppercase tracking-wide border-primary text-primary bg-white">Rare</span>
            </div>
            <div className="z-10">
              <h4 className="font-bold text-sm text-primary">Centurion</h4>
              <p className="text-[10px] text-text-secondary mt-1 leading-snug">Complete 100 Pomodoro sessions.</p>
            </div>
            <div className="mt-auto pt-3 z-10">
              <div className="text-[10px] font-mono text-primary uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]">check_circle</span> Unlocked
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-border-subtle p-4 flex flex-col gap-3 group relative overflow-hidden opacity-75 hover:opacity-100 transition-opacity shadow-sharp">
            <div className="flex justify-between items-start">
              <div className="size-10 bg-white border border-border-subtle flex items-center justify-center text-text-secondary grayscale">
                <span className="material-symbols-outlined">calendar_month</span>
              </div>
              <span className="border font-mono text-[10px] px-2 py-0.5 uppercase tracking-wide border-slate-900 text-text-main bg-slate-100 font-bold">Epic</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-text-main">Consistency King</h4>
              <p className="text-[10px] text-text-secondary mt-1 leading-snug">Maintain a streak for 1 full month.</p>
            </div>
            <div className="mt-auto pt-3">
              <div className="w-full h-1.5 bg-border-subtle">
                <div className="h-full bg-slate-400 w-[40%]"></div>
              </div>
              <p className="text-[9px] font-mono text-text-secondary mt-1 text-right">12/30 Days</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-border-subtle p-4 flex flex-col gap-3 group relative overflow-hidden opacity-75 hover:opacity-100 transition-opacity shadow-sharp">
            <div className="absolute -right-4 -top-4 text-slate-200 text-8xl font-bold select-none">500</div>
            <div className="flex justify-between items-start z-10">
              <div className="size-10 bg-white border border-border-subtle flex items-center justify-center text-text-secondary grayscale">
                <span className="material-symbols-outlined">military_tech</span>
              </div>
              <span className="border font-mono text-[10px] px-2 py-0.5 uppercase tracking-wide border-primary bg-primary text-white font-bold">Legendary</span>
            </div>
            <div className="z-10">
              <h4 className="font-bold text-sm text-text-main">Grandmaster</h4>
              <p className="text-[10px] text-text-secondary mt-1 leading-snug">Complete 500 Pomodoro sessions.</p>
            </div>
            <div className="mt-auto pt-3 z-10">
              <div className="w-full h-1.5 bg-border-subtle">
                <div className="h-full bg-slate-400 w-[24%]"></div>
              </div>
              <p className="text-[9px] font-mono text-text-secondary mt-1 text-right">124/500</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
