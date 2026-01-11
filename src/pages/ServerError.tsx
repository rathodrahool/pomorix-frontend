import React from 'react';
import { Link } from 'react-router-dom';

interface ServerErrorProps {
    message?: string;
    onRetry?: () => void;
}

const ServerError: React.FC<ServerErrorProps> = ({
    message = "We encountered an unexpected error. Don't worry, your streak is safe and sound.",
    onRetry
}) => {
    const handleRefresh = () => {
        if (onRetry) {
            onRetry();
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 md:px-8 py-12">
                <div className="max-w-[480px] w-full">
                    <div className="flex flex-col items-center gap-8">
                        {/* Error Icon with Status Badge */}
                        <div className="relative flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center size-24 bg-primary/10 border-2 border-primary/20">
                                <span className="material-symbols-outlined text-primary !text-[48px]">
                                    warning
                                </span>
                            </div>
                            {/* Status Code Badge */}
                            <span className="absolute -top-2 -right-2 rotate-12 bg-text-main text-white text-xs font-bold px-2 py-1 shadow-sharp font-mono">
                                500
                            </span>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col items-center gap-3">
                            <h1 className="text-text-main text-3xl font-bold leading-tight tracking-tight text-center font-display">
                                Focus Interrupted
                            </h1>
                            <p className="text-text-secondary text-base font-normal leading-relaxed max-w-[400px] text-center">
                                {message}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col w-full gap-3 sm:min-w-[300px]">
                            {/* Primary: Refresh */}
                            <button
                                onClick={handleRefresh}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 h-12 px-6 bg-primary hover:bg-primary-dark transition-colors text-white text-base font-bold leading-normal tracking-wide shadow-sharp hover:shadow-sharp-hover active:translate-y-[1px]"
                            >
                                <span className="material-symbols-outlined !text-[20px]">refresh</span>
                                <span className="truncate">Refresh Page</span>
                            </button>

                            {/* Secondary: Return Home */}
                            <Link
                                to="/"
                                className="flex w-full cursor-pointer items-center justify-center gap-2 h-12 px-6 bg-white hover:bg-slate-50 border border-slate-300 text-text-main text-base font-bold leading-normal tracking-wide shadow-sharp hover:shadow-sharp-hover active:translate-y-[1px] transition-all"
                            >
                                <span className="truncate">Return to Main Study Screen</span>
                            </Link>
                        </div>

                        {/* Report Bug */}
                        <div className="flex flex-col items-center gap-1 pt-4 border-t border-dashed border-border-subtle w-full">
                            <button
                                onClick={() => {
                                    window.open('https://github.com/your-repo/issues/new', '_blank');
                                }}
                                className="text-text-secondary hover:text-primary text-sm font-medium underline decoration-from-font underline-offset-2 transition-colors"
                            >
                                Report a Bug
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Gradient Decorator */}
            <div className="h-2 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
    );
};

export default ServerError;
