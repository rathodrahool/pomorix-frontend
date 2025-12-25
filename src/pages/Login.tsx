import React from 'react';
import { useAuth } from '../hooks';
import { AuthProvider } from '../types';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { socialLogin, loading, error } = useAuth();

  // Static test credentials for Google
  const handleGoogleLogin = async () => {
    const staticGoogleData = {
      email: "rahul@pomorix.com",
      auth_provider: AuthProvider.GOOGLE,
      auth_provider_id: "google-12345674589"
    };

    const success = await socialLogin(staticGoogleData);

    if (success) {
      onLogin();
    }
  };

  // Static test credentials for Apple
  const handleAppleLogin = async () => {
    const staticAppleData = {
      email: "rahul@pomorix.com",
      auth_provider: AuthProvider.APPLE,
      auth_provider_id: "apple-12345674589"
    };

    const success = await socialLogin(staticAppleData);

    if (success) {
      onLogin();
    }
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

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 py-4 transition-all duration-200 text-base font-bold shadow-sharp group w-full active:translate-y-[1px]"
            type="button"
            disabled={loading}
          >
            <img
              alt="Google Logo"
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsF0E2CVTNHGoeR9Isy5PBq50p83AVukbfLVilqzO1cW7hxbgGOEAGnOgYmXSZCOowlAkNS6lORhwpr-YAjoLsYdDe627ptpeTwnQDFWWkT4O8YRDxPmalgxp4sYuFodBGvCRAAvZHv1WUFhbfoCZPbCgOyl_Vu177FqZyPUQTnfKEGzawH4XkpSztSl4d0MewKKoMmKrOKcP31m2oy95P8M2IfpH_VxMyNAScGYKL2jmR3DEDcR2njO1UWVPVt9qB6Ep2rVz405g"
            />
            <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
          </button>

          <button
            onClick={handleAppleLogin}
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
