import React from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render(): React.ReactNode {
        if (this.state.hasError) {
            const isDevelopment = import.meta.env.DEV;

            return (
                <div className="min-h-screen bg-white flex flex-col">
                    {/* Main Content */}
                    <main className="flex-1 flex items-center justify-center px-4 md:px-8 py-12">
                        <div className="max-w-[600px] w-full">
                            <div className="flex flex-col items-center gap-8">
                                {/* Error Icon with Background */}
                                <div className="relative flex items-center justify-center">
                                    <div className="size-32 bg-red-50 border-2 border-red-200 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-red-500 !text-[80px]">
                                            error
                                        </span>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="flex max-w-[480px] flex-col items-center gap-4">
                                    <h2 className="text-text-main text-3xl font-bold leading-tight tracking-tight text-center font-display">
                                        Something Went Wrong
                                    </h2>
                                    <p className="text-text-secondary text-base font-normal leading-relaxed max-w-[480px] text-center">
                                        We encountered an unexpected error. Don't worry, your progress is safe. Try reloading the page or return to your study session.
                                    </p>

                                    {/* Error Details (Development Only) */}
                                    {isDevelopment && this.state.error && (
                                        <div className="w-full mt-4 p-4 bg-red-50 border border-red-200 text-left">
                                            <p className="text-xs font-mono text-red-800 font-bold mb-2">
                                                Error Details (Dev Mode):
                                            </p>
                                            <p className="text-xs font-mono text-red-700 break-all">
                                                {this.state.error.toString()}
                                            </p>
                                            {this.state.errorInfo && (
                                                <details className="mt-2">
                                                    <summary className="text-xs font-mono text-red-700 cursor-pointer">
                                                        Stack Trace
                                                    </summary>
                                                    <pre className="text-[10px] font-mono text-red-600 mt-2 overflow-x-auto">
                                                        {this.state.errorInfo.componentStack}
                                                    </pre>
                                                </details>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[400px]">
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="flex-1 flex items-center justify-center gap-2 h-12 px-6 bg-primary hover:bg-primary-dark transition-colors text-white text-base font-bold leading-normal tracking-wide shadow-sharp hover:shadow-sharp-hover active:translate-y-[1px]"
                                    >
                                        <span className="material-symbols-outlined !text-[20px]">refresh</span>
                                        <span>Reload Page</span>
                                    </button>
                                    <Link
                                        to="/"
                                        onClick={this.handleReset}
                                        className="flex-1 flex items-center justify-center gap-2 h-12 px-6 bg-white hover:bg-slate-50 border border-slate-300 text-text-main text-base font-bold leading-normal tracking-wide shadow-sharp hover:shadow-sharp-hover active:translate-y-[1px] transition-all"
                                    >
                                        <span className="material-symbols-outlined !text-[20px]">home</span>
                                        <span>Go Home</span>
                                    </Link>
                                </div>

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
        }

        return this.props.children;
    }
}
