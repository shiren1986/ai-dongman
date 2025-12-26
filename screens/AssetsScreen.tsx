
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
      activeTabEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedTabIndex]);

  const filteredAssets = useMemo(() => {
    const activeTabKey = tabs[selectedTabIndex].key;
    let result = [...assets];

    if (activeTabKey !== 'all') {
      result = result.filter(a => a.status === activeTabKey);
    }

    return result;
  }, [selectedTabIndex, assets]);

  return (
    <div className="h-full flex flex-col pb-28 bg-background-light dark:bg-background-dark relative">
      <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md pt-6 pb-2">
        <div className="flex gap-2.5 px-4 overflow-x-auto no-scrollbar snap-x scroll-smooth">
          {tabs.map((tab, idx) => {
            const isActive = selectedTabIndex === idx;
            return (
              <button 
                key={idx}
                ref={(el) => { tabRefs.current[idx] = el; }}
                onClick={() => setSelectedTabIndex(idx)}
                className={`snap-center flex h-9 shrink-0 items-center justify-center px-6 rounded-full transition-all duration-200 active:scale-95 ${
                  isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/30' 
                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <p className="text-[13px] font-bold whitespace-nowrap">{tab.label}</p>
              </button>
            );
          })}
          <div className="shrink-0 w-4"></div>
        </div>
      </div>

      <main className="flex-1 px-4 py-2 grid grid-cols-2 gap-x-3 gap-y-5 overflow-y-auto no-scrollbar content-start">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => {
            const isClickable = asset.status === 'completed' || asset.status === 'original';
            
            return (
              <div 
                key={asset.id} 
                onClick={() => isClickable && onSelectAsset(asset)}
                className={`group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all border border-slate-50 dark:border-slate-700/30 ${
                  isClickable 
                    ? 'cursor-pointer hover:shadow-md active:scale-[0.98]' 
                    : 'cursor-default opacity-80'
                }`}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${isClickable ? 'group-hover:scale-110' : ''} ${asset.status === 'failed' ? 'grayscale opacity-50' : ''}`}
                    style={{ backgroundImage: `url(${asset.imageUrl})` }}
                  ></div>

                  {asset.status === 'processing' && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2">
                      <div className="relative flex items-center justify-center">
                        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span className="material-symbols-outlined absolute text-white text-[18px] animate-pulse">sync</span>
                      </div>
                      <span className="text-white text-xs font-bold tracking-wider">{t('label_processing')}</span>
                    </div>
                  )}

                  {asset.status === 'failed' && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="size-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/40 border-2 border-white/20">
                          <span className="material-symbols-outlined text-white text-[28px] font-bold">close</span>
                        </div>
                        <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          <span className="text-white text-[10px] font-bold tracking-widest">{t('label_failed')}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {asset.isDynamic && asset.status === 'completed' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined text-white text-[32px] filled ml-0.5">play_arrow</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-3 py-3.5 flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                    {asset.name}
                  </h4>
                  {asset.status === 'processing' && (
                    <p className="text-[10px] font-bold text-primary mt-1">{t('label_queueing')}</p>
                  )}
                  {asset.status === 'failed' && (
                    <p className="text-[10px] font-bold text-red-500 mt-1">{t('label_fail_retry')}</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 py-32 flex flex-col items-center justify-center text-slate-400 gap-4">
            <div className="size-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-3xl">photo_library</span>
            </div>
            <p className="text-sm font-bold tracking-wide">{t('label_empty')}</p>
          </div>
        )}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default AssetsScreen;
