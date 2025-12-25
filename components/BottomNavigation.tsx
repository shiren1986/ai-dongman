
import React from 'react';
import { Tab } from '../types';

interface BottomNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-8 pt-2">
      <div className="flex items-center justify-around px-4 h-16">
        <button 
          onClick={() => onTabChange(Tab.Library)}
          className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${activeTab === Tab.Library ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
        >
          <span className={`material-symbols-outlined text-2xl ${activeTab === Tab.Library ? 'filled' : ''}`}>grid_view</span>
          <span className="text-[10px] font-medium tracking-wide">模板库</span>
        </button>
        <button 
          onClick={() => onTabChange(Tab.Assets)}
          className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${activeTab === Tab.Assets ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
        >
          <span className={`material-symbols-outlined text-2xl ${activeTab === Tab.Assets ? 'filled' : ''}`}>photo_library</span>
          <span className="text-[10px] font-medium tracking-wide">我的素材库</span>
        </button>
        <button 
          onClick={() => onTabChange(Tab.Settings)}
          className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${activeTab === Tab.Settings ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
        >
          <span className={`material-symbols-outlined text-2xl ${activeTab === Tab.Settings ? 'filled' : ''}`}>settings</span>
          <span className="text-[10px] font-medium tracking-wide">设置</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
