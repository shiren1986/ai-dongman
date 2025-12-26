
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
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display overflow-hidden justify-between">
      <div className="absolute top-0 left-0 w-full h-3/5 bg-gradient-to-b from-purple-200/20 via-violet-100/10 to-transparent dark:from-purple-900/30 dark:via-black/20 pointer-events-none"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center w-full px-8 z-10">
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="relative group cursor-default">
            {/* 移除了 animate-pulse 动画 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 via-purple-500 to-fuchsia-500 blur-2xl rounded-full opacity-40 transform scale-110"></div>
            <div className="relative w-[8.5rem] h-[8.5rem] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center p-2 ring-4 ring-white dark:ring-purple-900/30 ring-offset-4 ring-offset-purple-50 dark:ring-offset-black">
              <div className="w-full h-full bg-cover bg-center rounded-[2rem] overflow-hidden relative z-10" style={{ backgroundImage: `url('https://picsum.photos/seed/splash/400/400')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent mix-blend-overlay"></div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-lg">
              <span className="material-symbols-outlined text-purple-400 text-2xl drop-shadow-sm">auto_awesome</span>
            </div>
            <div className="absolute bottom-0 -left-5 bg-white dark:bg-slate-800 rounded-full p-1 shadow-md">
              <span className="material-symbols-outlined text-fuchsia-400 text-xl drop-shadow-sm">star</span>
            </div>
          </div>
          <div className="text-center space-y-3">
            <h1 className="text-slate-900 dark:text-white tracking-tight text-[2.5rem] font-extrabold leading-tight">灵动AI</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide">生成你的二次元动态头像</p>
          </div>
        </div>

        <div className="w-full max-w-[280px] flex flex-col gap-3">
          <div className="flex justify-between items-end px-1">
            <p className="text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
              AI 引擎启动中
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-mono">Loading...</p>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden p-[2px] shadow-inner">
            <div className="h-full bg-gradient-to-r from-violet-600 to-purple-500 rounded-full animate-progress shadow-[0_0_10px_rgba(124,58,237,0.5)]"></div>
          </div>
          <p className="text-center mt-2 text-slate-400 dark:text-slate-500 text-[10px]">正在加载风格模型...</p>
        </div>
      </div>

      <div className="w-full py-8 text-center z-10 opacity-60">
        <span className="material-symbols-outlined text-slate-400 text-lg">auto_awesome</span>
        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-medium tracking-widest uppercase">Powered by Vivid AI</p>
        <p className="text-slate-300 dark:text-slate-800 text-[9px]">v1.0.2</p>
      </div>
    </div>
  );
};

export default SplashScreen;
