
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Tab, Asset } from '../types';
import BottomNavigation from '../components/BottomNavigation';

interface AssetsScreenProps {
  assets: Asset[];
  activeTab: Tab;
  switchTab: (tab: Tab) => void;
  onSelectAsset: (asset: Asset) => void;
  onDeleteAsset: (id: string) => void;
  language: string;
  t: (key: string) => string;
}

const AssetsScreen: React.FC<AssetsScreenProps> = ({ assets, activeTab, switchTab, onSelectAsset, onDeleteAsset, language, t }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const tabs = [
    { label: t('label_all'), key: 'all' },
    { label: t('label_completed'), key: 'completed' },
    { label: t('label_processing'), key: 'processing' },
    { label: t('label_failed'), key: 'failed' }
  ];

  useEffect(() => {
    const activeTabEl = tabRefs.current[selectedTabIndex];
    if (activeTabEl) {
      activeTabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedTabIndex]);

  const filteredAssets = useMemo(() => {
    const activeTabKey = tabs[selectedTabIndex].key;
    if (activeTabKey === 'all') return assets;
    return assets.filter(a => a.status === activeTabKey);
  }, [selectedTabIndex, assets]);

  return (
    <div className="w-full h-full flex flex-col relative bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md pt-10 pb-6 shrink-0 border-b border-slate-100 dark:border-slate-800/50">
        <div className="flex gap-4 px-8 overflow-x-auto no-scrollbar snap-x">
          {tabs.map((tab, idx) => {
            const isActive = selectedTabIndex === idx;
            return (
              <button 
                key={idx}
                ref={(el) => { tabRefs.current[idx] = el; }}
                onClick={() => setSelectedTabIndex(idx)}
                className={`snap-center flex h-14 shrink-0 items-center justify-center px-10 rounded-full transition-all duration-300 active:scale-95 ${
                  isActive 
                    ? 'bg-primary text-white shadow-xl shadow-primary/30 ring-4 ring-primary/10' 
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                <p className="text-2xl font-black whitespace-nowrap tracking-tight">{tab.label}</p>
              </button>
            );
          })}
          <div className="shrink-0 w-8"></div>
        </div>
      </div>

      <main className="flex-1 px-8 py-8 grid grid-cols-2 gap-8 overflow-y-auto no-scrollbar content-start pb-48">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => {
            const isClickable = asset.status === 'completed' || asset.status === 'original';
            // Standardized ratio for all assets (512/768 = 2/3)
            const containerAspect = 'aspect-[512/768]';
            
            return (
              <div 
                key={asset.id} 
                onClick={() => isClickable && onSelectAsset(asset)}
                className={`group flex flex-col gap-4 transition-all duration-300 ${
                  isClickable ? 'cursor-pointer' : 'opacity-80'
                }`}
              >
                <div className={`relative w-full ${containerAspect} overflow-hidden rounded-[3rem] bg-slate-100 dark:bg-slate-900 shadow-soft ring-1 ring-slate-200 dark:ring-slate-800/50`}>
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${isClickable ? 'group-hover:scale-110' : ''} ${asset.status === 'failed' ? 'grayscale opacity-30' : ''}`}
                    style={{ backgroundImage: `url(${asset.imageUrl})` }}
                  ></div>

                  {asset.status === 'processing' && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center gap-6 p-6">
                      <div className="relative flex items-center justify-center">
                        <div className="size-24 border-8 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span className="material-symbols-outlined absolute text-white text-[48px] animate-pulse">sync</span>
                      </div>
                      <span className="text-white text-xl font-black tracking-[0.2em] uppercase">{t('label_processing')}</span>
                    </div>
                  )}

                  {asset.status === 'failed' && (
                    <div className="absolute inset-0 bg-rose-950/60 flex flex-col items-center justify-center">
                      <div className="size-24 rounded-full bg-rose-500 flex items-center justify-center shadow-2xl border-4 border-white/30">
                        <span className="material-symbols-outlined text-white text-[56px] font-black">close</span>
                      </div>
                    </div>
                  )}

                  {asset.isDynamic && asset.status === 'completed' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="size-20 rounded-full bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined text-white text-[64px] filled ml-2">play_arrow</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                </div>

                <div className="px-4 py-2 flex flex-col">
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white truncate tracking-tight">
                    {asset.name}
                  </h4>
                  {asset.status === 'processing' && (
                    <p className="text-lg font-bold text-primary mt-1 uppercase tracking-widest">{t('label_queueing')}</p>
                  )}
                  {asset.status === 'failed' && (
                    <p className="text-lg font-bold text-rose-500 mt-1 uppercase tracking-widest">{t('label_fail_retry')}</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 py-60 flex flex-col items-center justify-center text-slate-400 gap-8 animate-in fade-in zoom-in duration-500">
            <div className="size-32 rounded-[4rem] bg-slate-100 dark:bg-slate-900 flex items-center justify-center shadow-inner border border-slate-200/50 dark:border-white/5">
              <span className="material-symbols-outlined text-[80px] opacity-40">photo_library</span>
            </div>
            <div className="text-center space-y-2">
              <p className="text-4xl font-black text-slate-300 dark:text-slate-700">{t('label_empty')}</p>
              <p className="text-xl font-bold opacity-40 uppercase tracking-widest">No Assets Found</p>
            </div>
          </div>
        )}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default AssetsScreen;
