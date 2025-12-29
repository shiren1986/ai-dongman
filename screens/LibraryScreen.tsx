
import React, { useState, useRef, useEffect } from 'react';
import { Tab, Template } from '../types';
import { TEMPLATES } from '../constants';
import BottomNavigation from '../components/BottomNavigation';

interface LibraryScreenProps {
  activeTab: Tab;
  switchTab: (tab: Tab) => void;
  onSelectTemplate: (template: Template) => void;
  language: string;
  t: (key: string) => string;
}

const LibraryScreen: React.FC<LibraryScreenProps> = ({ activeTab, switchTab, onSelectTemplate, language, t }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [syncProgress, setSyncProgress] = useState<Record<string, number>>({});
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const categories = [
    { label: t('label_all'), icon: 'auto_awesome', filter: '' },
    { label: t('label_hot'), icon: 'local_fire_department', filter: 'hot' },
    { label: t('label_category_fresh'), icon: 'water_drop', filter: '清新' },
    { label: t('label_category_dreamy'), icon: 'cloud', filter: '梦幻' },
    { label: t('label_category_cyber'), icon: 'bolt', filter: '赛博' },
    { label: t('label_category_school'), icon: 'school', filter: '日常' },
    { label: t('label_category_aesthetic'), icon: 'palette', filter: '粉色' }
  ];

  useEffect(() => {
    TEMPLATES.forEach((tpl) => {
      setSyncProgress(prev => ({ ...prev, [tpl.id]: 0 }));
      const delay = Math.random() * 800; 
      setTimeout(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += Math.random() * 20;
          if (currentProgress >= 100) {
            currentProgress = 100;
            setSyncProgress(prev => ({ ...prev, [tpl.id]: 100 }));
            clearInterval(interval);
          } else {
            setSyncProgress(prev => ({ ...prev, [tpl.id]: currentProgress }));
          }
        }, 120 + Math.random() * 150);
      }, delay);
    });
  }, []);

  const filteredTemplates = TEMPLATES.filter(tpl => {
    const activeCategory = categories[selectedCategoryIndex];
    if (activeCategory.label === t('label_all') || activeCategory.label === t('label_hot')) return true;
    return tpl.tag.includes(activeCategory.filter);
  });

  return (
    <div className="w-full h-full flex flex-col relative bg-background-light dark:bg-background-dark overflow-hidden">
      <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 pt-8 shrink-0">
        <div className="flex gap-4 overflow-x-auto px-8 py-6 no-scrollbar snap-x scroll-smooth">
          {categories.map((cat, idx) => {
            const isActive = selectedCategoryIndex === idx;
            return (
              <button 
                key={idx}
                ref={(el) => { categoryRefs.current[idx] = el; }}
                onClick={() => setSelectedCategoryIndex(idx)}
                className={`snap-center flex h-14 shrink-0 items-center justify-center gap-x-3 rounded-full px-10 transition-all duration-200 active:scale-95 ${
                  isActive 
                    ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                    : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className={`material-symbols-outlined text-[32px] ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {cat.icon}
                </span>
                <span className="text-2xl font-bold tracking-tight whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
          <div className="shrink-0 w-12"></div>
        </div>
      </header>

      <main className="flex-1 px-8 py-8 grid grid-cols-2 gap-8 overflow-y-auto no-scrollbar content-start pb-48">
        {filteredTemplates.map((tpl) => {
          const progress = syncProgress[tpl.id] || 0;
          const isLoaded = progress >= 100;

          return (
            <div 
              key={tpl.id} 
              onClick={() => isLoaded && onSelectTemplate(tpl)}
              className={`group flex flex-col gap-4 relative transition-all duration-300 ${isLoaded ? 'cursor-pointer' : 'cursor-wait'}`}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[3rem] bg-slate-100 dark:bg-slate-900 shadow-soft transition-all hover:shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800">
                <div 
                  className={`w-full h-full bg-center bg-cover transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-110 blur-3xl'}`} 
                  style={{ backgroundImage: `url(${tpl.imageUrl})` }}
                ></div>
                
                {!isLoaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 bg-slate-100/40 dark:bg-slate-900/40 backdrop-blur-xl">
                    <div className="relative flex flex-col items-center gap-6">
                      <div className="size-24 rounded-[2rem] bg-white dark:bg-slate-800 shadow-2xl flex items-center justify-center border border-primary/20">
                        <span className="material-symbols-outlined text-primary text-[56px] animate-bounce">cloud_download</span>
                      </div>
                      <div className="flex flex-col items-center gap-4 w-full min-w-[140px]">
                        <span className="text-primary text-xs font-black tracking-widest uppercase">{t('label_syncing')}</span>
                        <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className={`absolute bottom-8 left-8 right-8 flex flex-col transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <span className="text-white text-3xl font-black drop-shadow-xl">{tpl.name}</span>
                  <span className="text-white/70 text-base font-bold tracking-widest mt-2 uppercase">{tpl.tag}</span>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default LibraryScreen;
