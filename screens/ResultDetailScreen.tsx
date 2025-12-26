
import React, { useState, useRef } from 'react';
import { Tab, Asset } from '../types';
import BottomNavigation from '../components/BottomNavigation';

interface ResultDetailScreenProps {
  asset: Asset | null;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  activeTab: Tab;
  switchTab: (tab: Tab) => void;
  language: string;
  t: (key: string) => string;
}

const ResultDetailScreen: React.FC<ResultDetailScreenProps> = ({ asset, onBack, onToggleFavorite, activeTab, switchTab, language, t }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!asset) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark overflow-hidden">
      {/* 顶部导航栏 */}
      <nav className="shrink-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md z-10">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-slate-200 dark:active:bg-slate-800 cursor-pointer text-text-main-light dark:text-text-main-dark">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
          </button>
          <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-text-main-light dark:text-text-main-dark pr-10">
            {t('header_result')}
          </h2>
        </div>
      </nav>

      <main className="flex-1 flex flex-col w-full max-w-md mx-auto overflow-hidden">
        
        {/* 媒体播放区域 - 高度自适应 */}
        <div className="flex-1 flex items-center justify-center p-4 min-h-0">
          <div 
            onClick={togglePlay}
            className="relative w-full h-full max-h-[70vh] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-2xl ring-1 ring-slate-100 dark:ring-slate-800 cursor-pointer group"
          >
            {/* 背景氛围层 */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20 dark:opacity-40 scale-110" 
              style={{ backgroundImage: `url(${asset.imageUrl})` }}
            ></div>

            {asset.isDynamic ? (
              <video 
                ref={videoRef}
                src={asset.imageUrl} 
                className="relative z-10 w-full h-full object-contain"
                loop 
                muted 
                playsInline
                poster={asset.imageUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            ) : (
              <img 
                src={asset.imageUrl} 
                className="relative z-10 w-full h-full object-contain" 
                alt={asset.name} 
              />
            )}
            
            {/* 播放控制层 */}
            {asset.isDynamic && (
              <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-black/10 backdrop-blur-[2px]'}`}>
                <div className="flex flex-col items-center gap-4">
                  <div className="size-20 rounded-full bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-white text-[56px] filled ml-1.5">play_arrow</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/20">
                    <span className="text-white text-[11px] font-bold tracking-[0.2em] uppercase">{t('label_play')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 底部功能按钮 - 增大尺寸以便点击，同时增加 pb-28 适配导航栏 */}
        <div className="px-6 pb-28 pt-2 shrink-0 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <button className="flex-1 flex items-center justify-center gap-3 h-16 rounded-2xl bg-primary text-white shadow-xl shadow-primary/25 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[28px]">download</span>
              <span className="text-lg font-bold">{t('btn_save_album')}</span>
            </button>

            <button className="size-16 shrink-0 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 transition-all group">
              <span className="material-symbols-outlined text-red-500 text-[26px] group-hover:scale-110 transition-transform">delete</span>
            </button>
          </div>
        </div>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default ResultDetailScreen;
