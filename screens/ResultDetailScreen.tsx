
import React from 'react';
import { Tab, Asset } from '../types';
import BottomNavigation from '../components/BottomNavigation';

interface ResultDetailScreenProps {
  asset: Asset | null;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  activeTab: Tab;
  switchTab: (tab: Tab) => void;
}

const ResultDetailScreen: React.FC<ResultDetailScreenProps> = ({ asset, onBack, onToggleFavorite, activeTab, switchTab }) => {
  if (!asset) return null;

  return (
    <div className="h-full flex flex-col pb-24 bg-background-light dark:bg-background-dark">
      <nav className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-slate-200 dark:active:bg-slate-800 cursor-pointer text-text-main-light dark:text-text-main-dark">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
          </button>
          <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-text-main-light dark:text-text-main-dark pr-10">
            生成动态头像
          </h2>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center w-full max-w-md mx-auto p-4 gap-6 pt-6">
        <div className="w-full relative group">
          <div className="flex flex-col items-stretch justify-start rounded-2xl bg-surface-light dark:bg-surface-dark shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="relative w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" 
                style={{ backgroundImage: `url(${asset.imageUrl})` }}
              ></div>
              <div className="absolute top-3 right-3">
                <div className="bg-black/30 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10 uppercase tracking-wider">
                  Live
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-text-main-light dark:text-text-main-dark text-xl font-bold leading-tight">生成成功!</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mt-0.5">已消耗 2 点算力</p>
                </div>
                <button 
                  onClick={() => onToggleFavorite(asset.id)}
                  className={`rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 active:scale-90 ${asset.isFavorited ? 'text-primary' : 'text-slate-400'}`}
                >
                  <span className={`material-symbols-outlined text-[28px] ${asset.isFavorited ? 'filled' : ''}`}>
                    favorite
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-4">
          {[
            { label: '重新生成', icon: 'replay' },
            { label: '分享', icon: 'ios_share' },
            { label: '删除', icon: 'delete' }
          ].map((action, i) => (
            <button key={i} className="flex flex-col items-center gap-2 group">
              <div className="flex items-center justify-center size-14 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 transition-all duration-200">
                <span className="material-symbols-outlined text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">{action.icon}</span>
              </div>
              <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">{action.label}</span>
            </button>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary h-14 px-6 text-white shadow-lg shadow-primary/30 active:scale-[0.99] transition-all hover:bg-blue-600 mt-2">
          <span className="material-symbols-outlined">download</span>
          <span className="text-base font-bold tracking-wide">保存到相册</span>
        </button>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} />
    </div>
  );
};

export default ResultDetailScreen;
