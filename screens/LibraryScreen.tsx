
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
  // 存储每个模板的下载进度：{ templateId: progress }
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

  // 为每个模板模拟独立的下载过程
  useEffect(() => {
    TEMPLATES.forEach((tpl, index) => {
      // 初始进度设为0
      setSyncProgress(prev => ({ ...prev, [tpl.id]: 0 }));

      // 模拟 staggered (交错) 开始时间，让下载看起来是异步的
      const delay = Math.random() * 800; 
      
      setTimeout(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
          // 每次增加随机进度，模拟真实网络波动
          currentProgress += Math.random() * 20;
          
          if (currentProgress >= 100) {
            currentProgress = 100;
            setSyncProgress(prev => ({ ...prev, [tpl.id]: 100 }));
            clearInterval(interval);
          } else {
            setSyncProgress(prev => ({ ...prev, [tpl.id]: currentProgress }));
          }
        }, 100 + Math.random() * 200);
      }, delay);
    });
  }, []);

  useEffect(() => {
    const activeBtn = categoryRefs.current[selectedCategoryIndex];
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedCategoryIndex]);

  const filteredTemplates = TEMPLATES.filter(tpl => {
    const activeCategory = categories[selectedCategoryIndex];
    if (activeCategory.label === t('label_all') || activeCategory.label === t('label_hot')) return true;
    return tpl.tag.includes(activeCategory.filter);
  });

  return (
    <div className="h-full flex flex-col pb-28 relative bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 pt-2 shrink-0">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar snap-x scroll-smooth">
          {categories.map((cat, idx) => {
            const isActive = selectedCategoryIndex === idx;
            return (
              <button 
                key={idx}
                ref={(el) => { categoryRefs.current[idx] = el; }}
                onClick={() => setSelectedCategoryIndex(idx)}
                className={`snap-center flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all duration-200 active:scale-95 ${
                  isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/30 border-transparent' 
                    : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {cat.icon}
                </span>
                <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
          <div className="shrink-0 w-8"></div>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 grid grid-cols-2 gap-4 overflow-y-auto no-scrollbar content-start">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((tpl) => {
            const progress = syncProgress[tpl.id] || 0;
            const isLoaded = progress >= 100;

            return (
              <div 
                key={tpl.id} 
                onClick={() => isLoaded && onSelectTemplate(tpl)}
                className={`group flex flex-col gap-2 relative transition-all duration-300 ${isLoaded ? 'cursor-pointer' : 'cursor-wait opacity-90'}`}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 shadow-sm transition-shadow hover:shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
                  
                  {/* 图片展示层：下载完成后渐入 */}
                  <div 
                    className={`w-full h-full bg-center bg-cover transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-105 blur-lg'}`} 
                    style={{ backgroundImage: `url(${tpl.imageUrl})` }}
                  ></div>
                  
                  {/* 云端下载占位/加载层 */}
                  {!isLoaded && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-[2px]">
                      <div className="relative flex flex-col items-center gap-2">
                        <div className="size-10 rounded-xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center border border-primary/10">
                          <span className="material-symbols-outlined text-primary text-[24px] animate-bounce">cloud_download</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-1.5 w-full min-w-[60px]">
                          <span className="text-primary text-[10px] font-bold tracking-tighter uppercase">{t('label_syncing')}</span>
                          <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300 rounded-full"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
                  
                  <div className={`absolute bottom-3 left-3 right-3 flex flex-col transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    <span className="text-white text-sm font-bold leading-tight drop-shadow-sm">{tpl.name}</span>
                    <span className="text-white/80 text-[10px] font-medium tracking-wider mt-0.5">{tpl.tag}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 py-20 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-3">
            <span className="material-symbols-outlined text-5xl">folder_open</span>
            <p className="text-sm font-medium">{t('label_empty')}</p>
          </div>
        )}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default LibraryScreen;
