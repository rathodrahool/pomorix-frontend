
import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../hooks';
import { AuthProvider } from '../types';

interface LoginProps {
  onLogin: () => void;
}

// Helper function to decode JWT token
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { socialLogin, loading, error } = useAuth();

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error('No credential received from Google');
      return;
    }

    // Decode the JWT token to get user info
    const userInfo = parseJwt(credentialResponse.credential);

    if (!userInfo || !userInfo.email || !userInfo.sub) {
      console.error('Invalid user info from Google');
      return;
    }

    // Call the API with SigninDto structure
    const success = await socialLogin({
      email: userInfo.email,
      auth_provider: AuthProvider.GOOGLE,
      auth_provider_id: userInfo.sub,
    });

    if (success) {
      onLogin();
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  return (
    <div className="bg-yc-bg font-display text-slate-900 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <main className="relative z-10 w-full max-w-[400px] bg-white shadow-sharp-lg border border-slate-200 flex flex-col p-10">
        <header className="flex flex-col items-center text-center mb-10">
          <div className="size-14 bg-primary flex items-center justify-center mb-6 shadow-sharp">
            <span className="material-symbols-outlined text-white text-3xl">timer</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight mb-3 text-slate-900">Get Started</h1>
          <p className="text-slate-500 text-base font-normal max-w-[280px]">
            Join the global study space. Track streaks, earn badges, and focus together.
          </p>
        </header>

        <div className="flex flex-col gap-4 w-full">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="continue_with"
              width="100%"
            />
          </div>

          <button
            onClick={onLogin}
            className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-black border border-slate-900 text-white py-4 transition-all duration-200 text-base font-bold shadow-sharp group w-full active:translate-y-[1px]"
            type="button"
            disabled={loading}
          >
            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform text-white">desktop_mac</span>
            <span>Continue with Apple</span>
          </button>
        </div>

        <div className="mt-10 text-center border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            By clicking continue, you agree to our
            <a className="text-slate-600 hover:text-primary hover:underline transition-colors" href="#">Terms of Service</a> and
            <a className="text-slate-600 hover:text-primary hover:underline transition-colors" href="#">Privacy Policy</a>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
