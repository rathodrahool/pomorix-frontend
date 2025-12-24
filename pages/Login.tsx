
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-bg-page font-display text-text-main min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <main className="relative z-10 w-full max-w-[400px] bg-white shadow-sharp border border-border-subtle flex flex-col">
        <header className="flex flex-col items-center pt-10 pb-6 px-8 text-center bg-white">
          <div className="size-12 bg-primary flex items-center justify-center mb-5">
            <span className="material-symbols-outlined text-white text-2xl">timer</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight tracking-tight mb-2 text-text-main font-display">
            {isLogin ? 'Welcome Back' : 'Join Pomorix'}
          </h1>
          <p className="text-text-secondary text-sm font-normal">Track streaks, earn badges, and focus together.</p>
        </header>

        <div className="px-8 pb-6">
          <div className="flex bg-slate-100 border border-slate-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 ${isLogin ? 'bg-white text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-main'}`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 ${!isLogin ? 'bg-white text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-main'}`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <form className="px-8 flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-main uppercase tracking-wide ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <input className="w-full bg-white border border-slate-300 text-text-main text-sm py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400 transition-all duration-200" placeholder="John Doe" required type="text" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-main uppercase tracking-wide ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input className="w-full bg-white border border-slate-300 text-text-main text-sm py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400 transition-all duration-200" placeholder="student@example.com" required type="email" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-text-main uppercase tracking-wide">Password</label>
              <button type="button" className="text-primary text-xs font-semibold hover:text-orange-700 hover:underline transition-colors">Forgot Password?</button>
            </div>
            <div className="relative group">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input className="w-full bg-white border border-slate-300 text-text-main text-sm py-3 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400 transition-all duration-200" placeholder="••••••••" required type="password" />
              <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors flex items-center cursor-pointer" type="button">
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </div>

          <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 shadow-sharp transition-all duration-200 active:translate-y-[1px] mt-2 flex items-center justify-center gap-2" type="submit">
            <span>{isLogin ? 'Enter Focus Mode' : 'Create Account'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        <div className="px-8 py-6">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-text-main py-2.5 transition-all duration-200 text-sm font-semibold group shadow-sharp" type="button">
              <img alt="Google Logo" className="w-5 h-5 group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsF0E2CVTNHGoeR9Isy5PBq50p83AVukbfLVilqzO1cW7hxbgGOEAGnOgYmXSZCOowlAkNS6lORhwpr-YAjoLsYdDe627ptpeTwnQDFWWkT4O8YRDxPmalgxp4sYuFodBGvCRAAvZHv1WUFhbfoCZPbCgOyl_Vu177FqZyPUQTnfKEGzawH4XkpSztSl4d0MewKKoMmKrOKcP31m2oy95P8M2IfpH_VxMyNAScGYKL2jmR3DEDcR2njO1UWVPVt9qB6Ep2rVz405g" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-text-main py-2.5 transition-all duration-200 text-sm font-semibold group shadow-sharp" type="button">
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform text-slate-800">desktop_mac</span>
              Apple
            </button>
          </div>
        </div>

        <div className="bg-slate-50 px-8 py-4 text-center border-t border-slate-200">
          <p className="text-xs text-text-secondary font-medium">
            {isLogin ? 'New to Pomorix?' : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-bold hover:underline ml-1"
            >
              {isLogin ? 'Create an account' : 'Log in here'}
            </button>
          </p>
        </div>
      </main>

      {/* Decorative BG elements */}
      <div className="fixed top-0 left-0 -z-10 h-full w-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -left-10 top-20 h-64 w-64 bg-primary/10 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 h-96 w-96 bg-gray-500/10 blur-3xl"></div>
      </div>
    </div>
  );
};

export default Login;
