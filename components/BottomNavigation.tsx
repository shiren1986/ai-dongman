
import React from 'react';
import { Tab } from '../types';
import { TRANSLATIONS } from '../constants';

interface BottomNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  language?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange, language = 'zh-CN' }) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['zh-CN'][key];

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 pb-10 pt-4">
      <div className="flex items-center justify-around px-6 h-24">
        <button 
          onClick={() => onTabChange(Tab.Library)}
          className={`flex flex-col items-center justify-center gap-3 flex-1 h-full transition-all active:scale-90 ${activeTab === Tab.Library ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
        >
          <span className={`material-symbols-outlined text-[42px] ${activeTab === Tab.Library ? 'filled' : ''}`}>grid_view</span>
          <span className={`text-lg font-bold tracking-tight transition-all ${activeTab === Tab.Library ? 'scale-110' : 'scale-100 opacity-80'}`}>{t('nav_library')}</span>
        </button>
        <button 
          onClick={() => onTabChange(Tab.Assets)}
          className={`flex flex-col items-center justify-center gap-3 flex-1 h-full transition-all active:scale-90 ${activeTab === Tab.Assets ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
        >
          <span className={`material-symbols-outlined text-[42px] ${activeTab === Tab.Assets ? 'filled' : ''}`}>photo_library</span>
          <span className={`text-lg font-bold tracking-tight transition-all ${activeTab === Tab.Assets ? 'scale-110' : 'scale-100 opacity-80'}`}>{t('nav_assets')}</span>
        </button>
        <button 
          onClick={() => onTabChange(Tab.Settings)}
          className={`flex flex-col items-center justify-center gap-3 flex-1 h-full transition-all active:scale-90 ${activeTab === Tab.Settings ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
        >
          <span className={`material-symbols-outlined text-[42px] ${activeTab === Tab.Settings ? 'filled' : ''}`}>settings</span>
          <span className={`text-lg font-bold tracking-tight transition-all ${activeTab === Tab.Settings ? 'scale-110' : 'scale-100 opacity-80'}`}>{t('nav_settings')}</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
