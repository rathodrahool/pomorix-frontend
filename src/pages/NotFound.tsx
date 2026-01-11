import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-8 py-12">
        <div className="max-w-[600px] w-full">
          <div className="flex flex-col items-center gap-8">
            {/* 404 with Icon Overlay */}
            <div className="relative flex items-center justify-center">
              <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-primary/10 select-none font-display">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary !text-[80px] md:!text-[100px]">
                  sentiment_dissatisfied
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="flex max-w-[480px] flex-col items-center gap-4">
              <h2 className="text-text-main text-3xl font-bold leading-tight tracking-tight text-center font-display">
                Out of Focus?
              </h2>
              <p className="text-text-secondary text-base font-normal leading-relaxed max-w-[480px] text-center">
                We couldn't find the page you're looking for. It seems this session has been moved or doesn't exist. Don't break your streak!
              </p>
            </div>

            {/* Action Button */}
            <Link
              to="/"
              className="flex min-w-[240px] cursor-pointer items-center justify-center overflow-hidden h-12 px-6 bg-primary hover:bg-primary-dark transition-colors text-white text-base font-bold leading-normal tracking-wide shadow-sharp hover:shadow-sharp-hover active:translate-y-[1px]"
            >
              <span className="truncate">Return to Main Study Screen</span>
            </Link>

            {/* Report Bug Button */}
            <button
              onClick={() => {
                // You can replace this with your actual bug report functionality
                window.open('https://github.com/your-repo/issues/new', '_blank');
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 mt-4 border border-border-subtle hover:border-primary bg-white hover:bg-bg-page transition-all text-text-secondary hover:text-primary text-sm font-medium"
            >
              <span className="material-symbols-outlined !text-[18px]">bug_report</span>
              <span>Report a Bug</span>
            </button>
          </div>
        </div>
      </main>


    </div>
  );
};

export default NotFound;
