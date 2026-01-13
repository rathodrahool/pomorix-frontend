import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks';
import { AuthProvider } from '../types';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { socialLogin, loading, error } = useAuth();

  // Google OAuth Login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userInfo = await userInfoResponse.json();

        // Send to backend with proper format
        const googleData = {
          email: userInfo.email,
          auth_provider: AuthProvider.GOOGLE,
          auth_provider_id: userInfo.sub, // Google's user ID
        };

        const success = await socialLogin(googleData);

        if (success) {
          onLogin();
        }
      } catch (err) {
        console.error('Google login error:', err);
      }
    },
    onError: () => {
      console.error('Google Login Failed');
    },
  });

  return (
    <div className="bg-yc-bg font-display text-slate-900 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <main className="relative z-10 w-full max-w-[400px] bg-white shadow-sharp-lg border border-slate-200 flex flex-col p-10">
        <header className="flex flex-col items-center text-center mb-10">
          {/* Pomorix Logo - Same as header */}
          <div className="size-14 bg-white flex items-center justify-center mb-6 shadow-sharp border-2 border-primary">
            <span className="material-symbols-outlined text-primary text-3xl">check</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight mb-3 text-slate-900">Get Started</h1>
          <p className="text-slate-500 text-base font-normal max-w-[280px]">
            Focus together, not alone. Study live, build streaks, earn badges.
          </p>
        </header>

        <div className="flex flex-col gap-4 w-full">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={() => handleGoogleLogin()}
            className="flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 py-4 transition-all duration-200 text-base font-bold shadow-sharp group w-full active:translate-y-[1px]"
            type="button"
            disabled={loading}
          >
            {/* Official Google SVG Logo */}
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
          </button>
        </div>

        <div className="mt-10 text-center border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            By clicking continue, you agree to our{' '}
            <a className="text-slate-600 hover:text-primary hover:underline transition-colors" href="#">Terms of Service</a> and{' '}
            <a className="text-slate-600 hover:text-primary hover:underline transition-colors" href="#">Privacy Policy</a>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
