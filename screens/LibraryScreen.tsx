
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

  // Fixed labels in Traditional Chinese as per the UI screenshot request
  const categories = [
    { label: '全部', filter: '' },
    { label: '熱門', filter: 'hot' },
    { label: '清新', filter: '清新' },
    { label: '夢幻', filter: '梦幻' },
    { label: '賽博', filter: '赛博' },
    { label: '日常', filter: '日常' },
    { label: '粉色', filter: '粉色' }
  ];

  const filteredTemplates = TEMPLATES.filter(tpl => {
    const activeCategory = categories[selectedCategoryIndex];
    if (selectedCategoryIndex === 0 || selectedCategoryIndex === 1) return true;
    return tpl.tag.includes(activeCategory.filter);
  });

  return (
    <div className="w-full h-full flex flex-col relative bg-background-dark overflow-hidden">
      <header className="sticky top-0 z-20 bg-background-dark/80 backdrop-blur-xl pt-12 pb-2 shrink-0">
        <div className="flex gap-3 overflow-x-auto px-6 py-4 no-scrollbar snap-x scroll-smooth">
          {categories.map((cat, idx) => {
            const isActive = selectedCategoryIndex === idx;
            return (
              <button 
                key={idx}
                ref={(el) => { categoryRefs.current[idx] = el; }}
                onClick={() => setSelectedCategoryIndex(idx)}
                className={`snap-center flex h-12 shrink-0 items-center justify-center rounded-full px-8 transition-all duration-300 active:scale-95 ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-slate-900/60 border border-white/5 text-slate-400'
                }`}
              >
                <span className="text-2xl font-bold tracking-tight whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
          <div className="shrink-0 w-8"></div>
        </div>
      </header>

      <main className="flex-1 px-6 py-6 grid grid-cols-2 gap-6 overflow-y-auto no-scrollbar content-start pb-48">
        {filteredTemplates.map((tpl) => (
          <div 
            key={tpl.id} 
            onClick={() => onSelectTemplate(tpl)}
            className="group flex flex-col relative transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-full aspect-[2/3] overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-xl ring-1 ring-white/10">
              <div 
                className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: `url(${tpl.imageUrl})` }}
              ></div>
              
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-col">
                <span className="text-white text-[32px] font-black leading-tight drop-shadow-md">{tpl.name}</span>
                <span className="text-white/60 text-lg font-bold tracking-wide mt-1 drop-shadow-sm">{tpl.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default LibraryScreen;
