
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
    <div className="h-full flex flex-col pb-28">
      <header className="sticky top-0 z-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 pt-2">
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

      <main className="flex-1 px-4 py-4 grid grid-cols-2 gap-4 overflow-y-auto no-scrollbar">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((tpl) => (
            <div 
              key={tpl.id} 
              onClick={() => onSelectTemplate(tpl)}
              className="group flex flex-col gap-2 relative cursor-pointer"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 shadow-sm transition-shadow hover:shadow-lg">
                <div 
                  className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${tpl.imageUrl})` }}
                ></div>
                
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex flex-col">
                  <span className="text-white text-sm font-bold leading-tight">{tpl.name}</span>
                  <span className="text-white/80 text-[10px] font-medium tracking-wider mt-0.5">{tpl.tag}</span>
                </div>
              </div>
            </div>
          ))
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
