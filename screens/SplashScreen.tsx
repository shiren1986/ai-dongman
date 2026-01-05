
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
      <div className="flex-1 flex flex-col items-center justify-center w-full px-8 z-10">
        
        <div className="flex flex-col items-center gap-12 mb-20">
          <div className="relative">
            <div className="relative w-48 h-48 bg-black dark:bg-black rounded-[3.5rem] shadow-glow flex items-center justify-center p-0 overflow-hidden ring-4 ring-primary/20">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url('logo.png')` }}
              >
              </div>
            </div>
          </div>
          
          <div className="text-center px-4">
            <h1 className="text-slate-900 dark:text-white tracking-tight text-[56px] font-black leading-tight mb-4 break-words max-w-[650px]">Dynamic AI-Stylized Avatar</h1>
            <p className="text-slate-400 dark:text-slate-500 text-2xl font-bold tracking-[0.25em] uppercase">Dynamic Avatar</p>
          </div>
        </div>

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
            Loading library resources...
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
