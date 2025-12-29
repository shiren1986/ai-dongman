
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
      <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md pt-8 pb-4">
        <div className="flex gap-4 px-8 overflow-x-auto no-scrollbar snap-x">
          {tabs.map((tab, idx) => {
            const isActive = selectedTabIndex === idx;
            return (
              <button 
                key={idx}
                ref={(el) => { tabRefs.current[idx] = el; }}
                onClick={() => setSelectedTabIndex(idx)}
                className={`snap-center flex h-12 shrink-0 items-center justify-center px-8 rounded-full transition-all duration-200 active:scale-95 ${
                  isActive 
                    ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <p className="text-xl font-bold whitespace-nowrap">{tab.label}</p>
              </button>
            );
          })}
          <div className="shrink-0 w-8"></div>
        </div>
      </div>

      <main className="flex-1 px-8 py-4 grid grid-cols-2 gap-8 overflow-y-auto no-scrollbar content-start pb-48">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => {
            const isClickable = asset.status === 'completed' || asset.status === 'original';
            
            return (
              <div 
                key={asset.id} 
                onClick={() => isClickable && onSelectAsset(asset)}
                className={`group flex flex-col bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-soft transition-all ring-1 ring-slate-100 dark:ring-slate-800 ${
                  isClickable ? 'cursor-pointer hover:shadow-2xl active:scale-[0.98]' : 'opacity-80'
                }`}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${isClickable ? 'group-hover:scale-110' : ''} ${asset.status === 'failed' ? 'grayscale opacity-40' : ''}`}
                    style={{ backgroundImage: `url(${asset.imageUrl})` }}
                  ></div>

                  {asset.status === 'processing' && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                      <div className="relative flex items-center justify-center">
                        <div className="size-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span className="material-symbols-outlined absolute text-white text-[28px] animate-pulse">sync</span>
                      </div>
                      <span className="text-white text-sm font-bold tracking-widest uppercase">{t('label_processing')}</span>
                    </div>
                  )}

                  {asset.status === 'failed' && (
                    <div className="absolute inset-0 bg-rose-950/40 flex flex-col items-center justify-center">
                      <div className="size-16 rounded-full bg-rose-500 flex items-center justify-center shadow-xl border-2 border-white/20">
                        <span className="material-symbols-outlined text-white text-[32px] font-bold">close</span>
                      </div>
                    </div>
                  )}

                  {asset.isDynamic && asset.status === 'completed' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="size-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined text-white text-[48px] filled ml-1">play_arrow</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-6 flex flex-col justify-center">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 truncate">
                    {asset.name}
                  </h4>
                  {asset.status === 'processing' && (
                    <p className="text-xs font-bold text-primary mt-2 uppercase tracking-widest">{t('label_queueing')}</p>
                  )}
                  {asset.status === 'failed' && (
                    <p className="text-xs font-bold text-rose-500 mt-2 uppercase tracking-widest">{t('label_fail_retry')}</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 py-40 flex flex-col items-center justify-center text-slate-400 gap-6">
            <div className="size-24 rounded-[2rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-5xl">photo_library</span>
            </div>
            <p className="text-2xl font-bold opacity-60">{t('label_empty')}</p>
          </div>
        )}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default AssetsScreen;
