
import React, { useEffect, useState } from 'react';
import { globalService } from '../../services';
import type { GlobalFeedItem } from '../../types';
import {
  getUserDisplayName,
  mapStateToUIStatus,
  getActivityMessage,
  getRelativeTime,
  formatNumber,
  type UIStatus,
} from '../../utils/feedUtils';

// Polling intervals (in milliseconds)
const FEED_POLL_INTERVAL = 25000; // 25 seconds
const COUNT_POLL_INTERVAL = 15000; // 15 seconds

const LiveFeed: React.FC = () => {
  const [feed, setFeed] = useState<GlobalFeedItem[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch global feed
  const fetchFeed = async () => {
    try {
      const data = await globalService.getGlobalFeed(50);

      // Only update if data actually changed
      const newItemsJson = JSON.stringify(data.items);
      const currentItemsJson = JSON.stringify(feed);

      if (newItemsJson !== currentItemsJson) {
        setFeed(data.items);
      }

      setOnlineCount(data.online_count);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch feed:', err);
      setError('Failed to load feed');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch online count (lightweight)
  const fetchOnlineCount = async () => {
    try {
      const count = await globalService.getOnlineCount();
      setOnlineCount(count);
    } catch (err) {
      console.error('Failed to fetch online count:', err);
    }
  };

  // Initial fetch and polling setup
  useEffect(() => {
    // Initial fetch
    fetchFeed();

    // Poll feed every 25 seconds
    const feedInterval = setInterval(fetchFeed, FEED_POLL_INTERVAL);

    // Poll count every 15 seconds (lightweight)
    const countInterval = setInterval(fetchOnlineCount, COUNT_POLL_INTERVAL);

    // Cleanup on unmount
    return () => {
      clearInterval(feedInterval);
      clearInterval(countInterval);
    };
  }, []); // Empty dependency array - only run on mount

  // Stop polling when tab is hidden to save resources
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Tab became visible again, refresh feed immediately
        fetchFeed();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const getStatusStyle = (status: UIStatus) => {
    switch (status) {
      case 'FOCUSING':
        return 'bg-primary/5 text-primary border-primary/20';
      case 'DONE':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'BREAK':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  const getStatusIcon = (status: UIStatus) => {
    switch (status) {
      case 'FOCUSING':
        return 'timelapse';
      case 'DONE':
        return 'check_circle';
      case 'BREAK':
        return 'coffee';
      default:
        return 'info';
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-[#fcfcfb]">
        <div className="px-5 py-4 border-b border-border-subtle bg-white flex items-center justify-between sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-text-main text-sm uppercase tracking-wide">Live Feed</h3>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold font-mono border border-gray-200 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-400"></span>
              </span>
              Loading...
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-secondary text-sm">Loading live feed...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && feed.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#fcfcfb]">
        <div className="px-5 py-4 border-b border-border-subtle bg-white flex items-center justify-between sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-text-main text-sm uppercase tracking-wide">Live Feed</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-5">
          <div className="text-center">
            <span className="material-symbols-outlined text-red-500 !text-[48px] mb-4">error</span>
            <p className="text-text-secondary text-sm mb-2">{error}</p>
            <button
              onClick={fetchFeed}
              className="text-primary hover:text-primary-dark text-sm font-bold transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#fcfcfb]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border-subtle bg-white flex items-center justify-between sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-text-main text-sm uppercase tracking-wide">Live Feed</h3>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold font-mono border border-green-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {formatNumber(onlineCount)} ONLINE
          </div>
        </div>
        <button
          onClick={fetchFeed}
          className="text-text-secondary hover:text-primary transition-colors p-1 hover:bg-gray-100 rounded"
          title="Refresh feed"
        >
          <span className="material-symbols-outlined !text-[20px]">refresh</span>
        </button>
      </div>

      {/* Feed Items */}
      <div className="flex-1 overflow-y-auto">
        {feed.length === 0 ? (
          <div className="flex items-center justify-center h-full p-5">
            <div className="text-center">
              <span className="material-symbols-outlined text-text-secondary !text-[48px] mb-4">group</span>
              <p className="text-text-secondary text-sm">No one is focusing right now</p>
              <p className="text-text-secondary text-xs mt-2">Be the first to start a session!</p>
            </div>
          </div>
        ) : (
          feed.map((item, index) => {
            const userName = getUserDisplayName(item.user.email);
            const status = mapStateToUIStatus(item.session.state, item.session.ended_at);
            const activity = getActivityMessage(item.task.title, status);
            const relativeTime = getRelativeTime(item.session.updated_at);

            return (
              <div
                key={`${item.user.id}-${item.session.updated_at}-${index}`}
                className="flex items-start gap-4 p-5 border-b border-gray-100 hover:bg-white transition-all group cursor-default border-l-4 border-l-transparent hover:border-l-primary"
              >
                {/* Avatar */}
                <div className="relative shrink-0 pt-1">
                  <div className="size-10 bg-gradient-to-br from-primary/20 to-primary/40 border border-gray-300 shadow-sm rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">
                      {userName}
                    </span>
                    <span className="text-[10px] font-mono text-text-secondary">{relativeTime}</span>
                  </div>
                  <p className="text-sm text-text-main leading-tight mb-2">{activity}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 border ${getStatusStyle(
                        status
                      )}`}
                    >
                      <span className="material-symbols-outlined !text-[14px]">{getStatusIcon(status)}</span>
                      {status}
                    </span>
                    <span className="h-px flex-1 bg-gray-100"></span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LiveFeed;
