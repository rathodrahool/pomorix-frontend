
import React, { useState, createContext, useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useStreak } from '../hooks';

// Focus Mode Context
interface FocusModeContextType {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

const FocusModeContext = createContext<FocusModeContextType>({
  isFocusMode: true,
  toggleFocusMode: () => { },
});

export const useFocusMode = () => useContext(FocusModeContext);

interface HeaderProps {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isFocusMode, toggleFocusMode }) => {
  const location = useLocation();
  const { streak, loading } = useStreak();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary-dark bg-primary px-4 py-3 lg:px-10 shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center gap-3" style={{ flexBasis: '0', flexGrow: 1 }}>
        <Link to="/" className="flex items-center justify-center size-8 bg-white text-primary border border-white">
          <span className="material-symbols-outlined !text-[24px]">check</span>
        </Link>
        <Link to="/" className="text-white text-xl font-bold tracking-tight font-display hover:opacity-90">Pomorix</Link>
      </div>

      {/* Center: Navigation */}
      <nav className="flex items-center justify-center gap-2" style={{ flexBasis: '0', flexGrow: 1 }}>
        <Link
          to="/"
          className={`px-8 py-2 text-sm font-bold uppercase tracking-wide transition-all ${location.pathname === '/'
            ? 'text-white bg-white/20 border-b-3 border-white'
            : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
        >
          Timer
        </Link>
        <Link
          to="/profile"
          className={`px-8 py-2 text-sm font-bold uppercase tracking-wide transition-all ${location.pathname === '/profile'
            ? 'text-white bg-white/20 border-b-3 border-white'
            : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
        >
          Profile
        </Link>
        <Link
          to="/settings"
          className={`px-8 py-2 text-sm font-bold uppercase tracking-wide transition-all ${location.pathname === '/settings'
            ? 'text-white bg-white/20 border-b-3 border-white'
            : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
        >
          Settings
        </Link>
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 justify-end" style={{ flexBasis: '0', flexGrow: 1 }}>
        <button
          onClick={toggleFocusMode}
          className={`flex items-center gap-2 px-4 py-1.5 text-sm font-bold transition-all border ${isFocusMode
            ? 'bg-white text-primary border-white hover:bg-white/90'
            : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
            }`}
          title={isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
        >
          <span className="material-symbols-outlined !text-[18px]">
            {isFocusMode ? 'visibility_off' : 'visibility'}
          </span>
          <span>FOCUS MODE</span>
        </button>
        <div className="hidden sm:block bg-white/10 hover:bg-white/20 transition-colors px-3 py-1 text-white text-sm font-bold border border-white/20 cursor-pointer">
          🔥 {loading ? '...' : (streak?.current_streak || 0)} Day Streak
        </div>
        <Link to="/profile">
          <div className="bg-center bg-no-repeat aspect-square bg-cover size-9 border border-white/50 cursor-pointer hover:opacity-90"
            style={{ backgroundImage: 'url("https://picsum.photos/seed/user123/100/100")' }}></div>
        </Link>
      </div>
    </header>
  );
};

const Layout: React.FC = () => {
  const [isFocusMode, setIsFocusMode] = useState(true); // Default: ON (minimalist)

  const toggleFocusMode = () => {
    setIsFocusMode(prev => !prev);
  };

  return (
    <FocusModeContext.Provider value={{ isFocusMode, toggleFocusMode }}>
      <div className="min-h-screen flex flex-col bg-bg-page">
        <Header isFocusMode={isFocusMode} toggleFocusMode={toggleFocusMode} />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="w-full border-t border-primary/20 bg-bg-page py-4 px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-text-secondary text-sm font-display">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-green-600"></span>
            </span>
            <span><strong className="text-text-main">1,240</strong> people are focusing right now.</span>
          </div>
        </footer>
      </div>
    </FocusModeContext.Provider>
  );
};

export default Layout;
