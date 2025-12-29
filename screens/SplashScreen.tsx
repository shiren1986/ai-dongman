
import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-[750px] h-[1624px] relative flex flex-col bg-background-light dark:bg-background-dark font-display overflow-hidden justify-between">
      <div className="absolute top-0 left-0 w-full h-3/5 bg-gradient-to-b from-purple-200/30 via-violet-100/10 to-transparent dark:from-purple-900/40 dark:via-black/20 pointer-events-none"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center w-full px-16 z-10">
        <div className="flex flex-col items-center gap-12 mb-24">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 via-purple-500 to-fuchsia-500 blur-3xl rounded-full opacity-50 transform scale-125"></div>
            <div className="relative w-56 h-56 bg-white dark:bg-slate-900 rounded-[4rem] shadow-glow flex items-center justify-center p-3 ring-8 ring-white dark:ring-purple-900/20 ring-offset-8 ring-offset-purple-50 dark:ring-offset-black">
              <div className="w-full h-full bg-cover bg-center rounded-[3rem] overflow-hidden relative z-10 shadow-inner" style={{ backgroundImage: `url('https://picsum.photos/seed/splash/500/500')` }}>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 rounded-full p-4 shadow-2xl">
              <span className="material-symbols-outlined text-purple-500 text-[48px] drop-shadow-sm filled">auto_awesome</span>
            </div>
          </div>
          <div className="text-center space-y-6">
            <h1 className="text-slate-900 dark:text-white tracking-tighter text-[80px] font-black leading-none">灵动AI</h1>
            <p className="text-slate-500 dark:text-slate-400 text-2xl font-bold tracking-[0.2em] uppercase">Dynamic 2D Avatars</p>
          </div>
        </div>

        <div className="w-full max-w-[500px] flex flex-col gap-6">
          <div className="flex justify-between items-end px-2">
            <p className="text-primary text-sm font-black uppercase tracking-widest flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              AI Core Initializing
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-mono font-bold">V1.2.0</p>
          </div>
          <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden p-[4px] shadow-inner border border-white/10">
            <div className="h-full bg-gradient-to-r from-violet-600 to-purple-500 rounded-full animate-progress shadow-[0_0_20px_rgba(124,58,237,0.6)]"></div>
          </div>
          <p className="text-center mt-2 text-slate-400 dark:text-slate-500 text-lg font-medium opacity-80">正在优化渲染管线...</p>
        </div>
      </div>

      <div className="w-full py-16 text-center z-10 opacity-40">
        <div className="flex items-center justify-center gap-3 mb-2">
            <span className="material-symbols-outlined text-slate-400 text-2xl">auto_awesome</span>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-black tracking-[0.4em] uppercase">VIVID AI STUDIO</p>
        </div>
        <p className="text-slate-300 dark:text-slate-800 text-xs mt-1">© 2025 ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default SplashScreen;
