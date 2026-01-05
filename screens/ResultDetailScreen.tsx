
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
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // Standardized detailed view aspect ratio for both dynamic and static assets
  const detailAspect = 'aspect-[512/768]';

  return (
    <div className="w-full h-full flex flex-col bg-background-light dark:bg-background-dark overflow-hidden">
      <nav className="shrink-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md z-10 pt-4">
        <div className="flex items-center justify-between px-6 h-16">
          <button onClick={onBack} className="flex size-14 shrink-0 items-center justify-center rounded-full active:bg-slate-200 dark:active:bg-slate-800 text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-[36px]">arrow_back_ios_new</span>
          </button>
          <h2 className="flex-1 text-center text-3xl font-black tracking-tight text-slate-900 dark:text-white pr-14">
            {t('header_result')}
          </h2>
        </div>
      </nav>

      <main className="flex-1 flex flex-col w-full overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8 min-h-0">
          <div 
            onClick={togglePlay}
            className={`relative w-full ${detailAspect} max-h-[1100px] rounded-[4rem] overflow-hidden bg-white dark:bg-slate-900 shadow-glow ring-1 ring-slate-100 dark:ring-white/5 cursor-pointer group`}
          >
            <div className="absolute inset-0 bg-cover bg-center blur-[100px] opacity-20 dark:opacity-40 scale-125" style={{ backgroundImage: `url(${asset.imageUrl})` }}></div>

            {asset.isDynamic ? (
              <video 
                ref={videoRef}
                src={asset.imageUrl} 
                className="relative z-10 w-full h-full object-contain"
                loop muted playsInline poster={asset.imageUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            ) : (
              <img src={asset.imageUrl} className="relative z-10 w-full h-full object-contain p-2" alt={asset.name} />
            )}
            
            {asset.isDynamic && (
              <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-black/20 backdrop-blur-sm'}`}>
                <div className="size-32 rounded-full bg-white/20 backdrop-blur-3xl border border-white/30 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-white text-[96px] filled ml-2">play_arrow</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-10 pb-48 pt-4 shrink-0 flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <button className="flex-1 flex items-center justify-center gap-4 h-20 rounded-[2.5rem] bg-primary text-white shadow-glow active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[42px]">download</span>
              <span className="text-2xl font-black uppercase tracking-widest">{t('btn_save_album')}</span>
            </button>

            <button className="size-20 shrink-0 flex items-center justify-center rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-soft active:scale-95 transition-all text-rose-500">
              <span className="material-symbols-outlined text-[42px]">delete</span>
            </button>
          </div>
        </div>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default ResultDetailScreen;
