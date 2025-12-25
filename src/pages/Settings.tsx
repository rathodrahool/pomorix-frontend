
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[720px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col gap-2 border-b border-border-subtle pb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="p-2 -ml-2 hover:bg-black/5 transition-colors text-text-secondary rounded-none"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-text-main text-3xl font-bold leading-tight tracking-tight font-display">Settings</h1>
        </div>
        <p className="text-text-secondary text-sm font-normal pl-12">Configure your timer durations, notification preferences, and application behavior.</p>
      </div>

      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-text-main pb-2 border-b border-[#f0f2f4]">
          <span className="material-symbols-outlined text-primary">schedule</span>
          <h3 className="text-lg font-bold leading-tight font-display">Timer Settings</h3>
        </div>
        
        <div className="bg-white p-6 shadow-sharp border border-border-subtle">
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col">
                <p className="text-text-main text-base font-medium">Pomodoro Duration</p>
                <p className="text-text-secondary text-xs mt-1">Focus interval length in minutes</p>
              </div>
              <div className="bg-bg-page px-3 py-1 text-sm font-bold text-text-main min-w-[3rem] text-center border border-border-subtle">25</div>
            </div>
            <div className="flex h-6 w-full items-center">
              <input 
                className="w-full h-2 bg-border-subtle appearance-none cursor-pointer accent-primary" 
                max="60" min="5" type="range" defaultValue="25"
              />
            </div>
            <div className="flex justify-between text-xs text-text-secondary font-mono">
              <span>5m</span>
              <span>60m</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 shadow-sharp border border-border-subtle">
            <div className="flex flex-col gap-4">
              <div className="flex w-full items-center justify-between">
                <p className="text-text-main text-base font-medium">Short Break</p>
                <div className="bg-bg-page px-3 py-1 text-sm font-bold text-text-main min-w-[3rem] text-center border border-border-subtle">5</div>
              </div>
              <div className="flex h-6 w-full items-center">
                <input className="w-full h-2 bg-border-subtle appearance-none cursor-pointer accent-primary" max="15" min="1" type="range" defaultValue="5"/>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 shadow-sharp border border-border-subtle">
            <div className="flex flex-col gap-4">
              <div className="flex w-full items-center justify-between">
                <p className="text-text-main text-base font-medium">Long Break</p>
                <div className="bg-bg-page px-3 py-1 text-sm font-bold text-text-main min-w-[3rem] text-center border border-border-subtle">15</div>
              </div>
              <div className="flex h-6 w-full items-center">
                <input className="w-full h-2 bg-border-subtle appearance-none cursor-pointer accent-primary" max="45" min="5" type="range" defaultValue="15"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 pt-4">
        <div className="flex items-center gap-2 text-text-main pb-2 border-b border-[#f0f2f4]">
          <span className="material-symbols-outlined text-primary">notifications</span>
          <h3 className="text-lg font-bold leading-tight font-display">Sounds & Notifications</h3>
        </div>
        <div className="bg-white shadow-sharp border border-border-subtle overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-text-secondary">volume_up</span>
              <span className="text-text-main font-medium">Alarm Sound</span>
            </div>
            <select className="bg-bg-page border border-border-subtle text-text-main text-sm focus:ring-1 focus:ring-primary py-2 pl-3 pr-8 cursor-pointer">
              <option>Bells</option>
              <option>Digital</option>
              <option>Bird</option>
              <option>None</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-text-secondary">timer</span>
              <span className="text-text-main font-medium">Ticking Sound</span>
            </div>
            <select className="bg-bg-page border border-border-subtle text-text-main text-sm focus:ring-1 focus:ring-primary py-2 pl-3 pr-8 cursor-pointer">
              <option>None</option>
              <option>Ticking Fast</option>
              <option>Ticking Slow</option>
              <option>White Noise</option>
            </select>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <div className="flex justify-between items-center">
              <span className="text-text-main font-medium text-sm">Volume</span>
              <span className="text-text-secondary text-xs">50%</span>
            </div>
            <input className="w-full h-1.5 bg-border-subtle appearance-none cursor-pointer accent-primary" max="100" min="0" type="range" defaultValue="50"/>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 pt-4">
        <div className="flex items-center gap-2 text-text-main pb-2 border-b border-[#f0f2f4]">
          <span className="material-symbols-outlined text-primary">tune</span>
          <h3 className="text-lg font-bold leading-tight font-display">Automation</h3>
        </div>
        <div className="bg-white shadow-sharp border border-border-subtle overflow-hidden divide-y divide-border-subtle">
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-text-main text-sm font-medium">Auto-start Breaks</p>
              <p className="text-text-secondary text-xs">Automatically start break timer when pomodoro ends</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-text-main text-sm font-medium">Auto-start Pomodoros</p>
              <p className="text-text-secondary text-xs">Automatically start next pomodoro when break ends</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </section>

      <div className="sticky bottom-4 z-10 mt-8">
        <div className="bg-white/80 backdrop-blur-sm p-4 border border-border-subtle shadow-lg flex justify-end gap-3">
          <button className="px-6 py-2.5 text-sm font-medium text-text-main bg-transparent hover:bg-bg-page border border-border-subtle transition-colors">
            Reset Defaults
          </button>
          <button className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark shadow-sharp transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
