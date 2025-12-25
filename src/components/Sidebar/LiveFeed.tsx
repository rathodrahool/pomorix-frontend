
import React from 'react';
import { LiveUser } from '../../types';

const LiveFeed: React.FC = () => {
  const feed: LiveUser[] = [
    { id: '1', name: 'Sarah Jenkins', avatar: 'https://picsum.photos/seed/sarah/100/100', status: 'focusing', message: 'Designing UI components for the new dashboard.', timestamp: '2m ago' },
    { id: '2', name: 'Kenji Sato', avatar: 'https://picsum.photos/seed/kenji/100/100', status: 'done', message: 'Completed a Pomodoro session!', timestamp: 'Just now' },
    { id: '3', name: 'Maria Garcia', avatar: 'https://picsum.photos/seed/maria/100/100', status: 'break', message: 'Taking a coffee break ☕️', timestamp: '5m ago' },
    { id: '4', name: 'Alex Lee', avatar: 'https://picsum.photos/seed/alex/100/100', status: 'focusing', message: 'Reviewing Physics notes for tomorrow\'s exam.', timestamp: '8m ago' },
    { id: '5', name: 'James Wilson', avatar: 'https://picsum.photos/seed/james/100/100', status: 'focusing', message: 'Writing Chapter 4 of Thesis', timestamp: '12m ago' },
  ];

  const getStatusStyle = (status: LiveUser['status']) => {
    switch(status) {
      case 'focusing': return 'bg-primary/5 text-primary border-primary/20';
      case 'done': return 'bg-green-50 text-green-700 border-green-200';
      case 'break': return 'bg-orange-50 text-orange-600 border-orange-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  const getStatusIcon = (status: LiveUser['status']) => {
    switch(status) {
      case 'focusing': return 'timelapse';
      case 'done': return 'check_circle';
      case 'break': return 'coffee';
      default: return 'info';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfcfb]">
      <div className="px-5 py-4 border-b border-border-subtle bg-white flex items-center justify-between sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-text-main text-sm uppercase tracking-wide">Live Feed</h3>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold font-mono border border-green-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            1,204 ONLINE
          </div>
        </div>
        <button className="text-text-secondary hover:text-primary transition-colors p-1 hover:bg-gray-100">
          <span className="material-symbols-outlined !text-[20px]">filter_list</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {feed.map((user) => (
          <div key={user.id} className="flex items-start gap-4 p-5 border-b border-gray-100 hover:bg-white transition-all group cursor-default border-l-4 border-l-transparent hover:border-l-primary">
            <div className="relative shrink-0 pt-1">
              <div className="size-10 bg-gray-200 border border-gray-300 shadow-sm overflow-hidden">
                <img alt={user.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" src={user.avatar} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{user.name}</span>
                <span className="text-[10px] font-mono text-text-secondary">{user.timestamp}</span>
              </div>
              <p className="text-sm text-text-main leading-tight mb-2">{user.message}</p>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 border ${getStatusStyle(user.status)}`}>
                  <span className="material-symbols-outlined !text-[14px]">{getStatusIcon(user.status)}</span> 
                  {user.status}
                </span>
                <span className="h-px flex-1 bg-gray-100"></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-border-subtle bg-[#fcfcfb]">
        <div className="flex justify-between items-center text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">
          <span>Global Goal</span>
          <span className="font-mono text-text-main">32,400 / 50,000 hrs</span>
        </div>
        <div className="w-full bg-border-subtle h-2">
          <div className="bg-primary h-2 relative overflow-hidden" style={{ width: '65%' }}>
            <div className="absolute inset-0 bg-white/20 skew-x-12 w-full -translate-x-full animate-[shine_3s_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
