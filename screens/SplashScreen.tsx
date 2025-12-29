
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
    <div className="w-[750px] h-[1624px] relative flex flex-col bg-background-light dark:bg-background-dark font-display overflow-hidden">
      {/* 核心内容区域 - 垂直居中 */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-16 z-10">
        
        {/* Logo 与 名称 */}
        <div className="flex flex-col items-center gap-12 mb-20">
          <div className="relative">
            {/* 简化后的 Logo 容器，去掉了多余的光效和悬浮图标 */}
            <div className="relative w-48 h-48 bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-soft flex items-center justify-center p-3 border border-slate-200 dark:border-slate-800">
              <div 
                className="w-full h-full bg-cover bg-center rounded-[2.8rem] overflow-hidden shadow-inner" 
                style={{ backgroundImage: `url('https://picsum.photos/seed/splash/500/500')` }}
              >
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-slate-900 dark:text-white tracking-tighter text-[90px] font-black leading-none mb-4">灵动AI</h1>
            <p className="text-slate-400 dark:text-slate-500 text-2xl font-bold tracking-[0.25em] uppercase">Dynamic Avatar</p>
          </div>
        </div>

        {/* 进度条区域 */}
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          <div className="flex justify-center items-center">
            <p className="text-primary/60 text-lg font-black uppercase tracking-[0.2em] flex items-center gap-3">
              Initializing
            </p>
          </div>
          
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden p-[2px] shadow-inner border border-slate-200 dark:border-white/5">
            <div className="h-full bg-primary rounded-full animate-progress shadow-[0_0_15px_rgba(124,58,237,0.4)]"></div>
          </div>
          
          <p className="text-center mt-2 text-slate-400 dark:text-slate-500 text-lg font-medium opacity-60">
            正在加载素材库...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
