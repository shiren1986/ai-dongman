
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Tab, Asset } from '../types';
import BottomNavigation from '../components/BottomNavigation';

interface AssetsScreenProps {
  assets: Asset[];
  activeTab: Tab;
  switchTab: (tab: Tab) => void;
  onSelectAsset: (asset: Asset) => void;
  onDeleteAsset: (id: string) => void;
}

const AssetsScreen: React.FC<AssetsScreenProps> = ({ assets, activeTab, switchTab, onSelectAsset, onDeleteAsset }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const tabs = [
    { label: '全部', key: 'all' },
    { label: '收藏', key: 'favorites' },
    { label: '已生成', key: 'completed' },
    { label: '生成中', key: 'processing' },
    { label: '失败', key: 'failed' }
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

  // Close menu on scroll or click outside
  useEffect(() => {
    const handleClose = () => setActiveMenuId(null);
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('click', (e: any) => {
        if (!e.target.closest('.menu-trigger')) {
            handleClose();
        }
    });
    return () => {
        window.removeEventListener('scroll', handleClose, true);
        window.removeEventListener('click', handleClose);
    };
  }, []);

  const toggleSort = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const handleMenuClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteAsset(id);
    setActiveMenuId(null);
  };

  const handleDownload = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    alert(`正在准备下载: ${name}`);
    setActiveMenuId(null);
  };

  const filteredAssets = useMemo(() => {
    const activeTabKey = tabs[selectedTabIndex].key;
    let result = [...assets];

    // 1. Filter
    if (activeTabKey !== 'all') {
      if (activeTabKey === 'favorites') {
        result = result.filter(a => a.isFavorited);
      } else {
        result = result.filter(a => a.status === activeTabKey);
      }
    }

    // 2. Sort (Mock logic: desc is default, asc is reverse)
    if (sortOrder === 'asc') {
      result.reverse();
    }

    return result;
  }, [selectedTabIndex, sortOrder, assets]);

  return (
    <div className="h-full flex flex-col pb-24 bg-background-light dark:bg-background-dark relative">
      <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md pt-6 pb-2">
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar snap-x scroll-smooth">
          {tabs.map((tab, idx) => {
            const isActive = selectedTabIndex === idx;
            return (
              <button 
                key={idx}
                ref={(el) => { tabRefs.current[idx] = el; }}
                onClick={() => setSelectedTabIndex(idx)}
                className={`snap-center flex h-9 shrink-0 items-center justify-center px-5 rounded-full transition-all duration-200 active:scale-95 ${
                  isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/30 border-transparent' 
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <p className="text-sm font-semibold leading-normal whitespace-nowrap">{tab.label}</p>
              </button>
            );
          })}
          <div className="shrink-0 w-8"></div>
        </div>
        
        <div className="flex items-center justify-between px-4 mt-4 mb-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            共 {filteredAssets.length} 个素材
          </span>
          <div className="flex items-center">
            <button 
              onClick={toggleSort}
              className={`flex items-center gap-1 transition-colors duration-200 py-1 pl-2 ${sortOrder !== 'desc' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}
            >
              <span className="text-xs font-semibold">
                {sortOrder === 'desc' ? '时间倒序' : '时间顺序'}
              </span>
              <span 
                className={`material-symbols-outlined transition-transform duration-300 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} 
                style={{ fontSize: '18px' }}
              >
                expand_more
              </span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 py-2 grid grid-cols-2 gap-3 overflow-y-auto no-scrollbar content-start">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <div 
              key={asset.id} 
              onClick={() => onSelectAsset(asset)}
              className="group relative flex flex-col gap-2 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/50 cursor-pointer active:scale-[0.98] transition-all h-fit"
            >
              <div className="relative w-full aspect-[3/4] bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${asset.status === 'failed' ? 'grayscale opacity-60' : ''}`}
                  style={{ backgroundImage: `url(${asset.imageUrl})` }}
                ></div>
                
                {asset.status === 'processing' && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1">
                    <span className="material-symbols-outlined animate-spin text-white" style={{ fontSize: '28px' }}>progress_activity</span>
                    <span className="text-white text-[10px] font-bold tracking-wider">生成中</span>
                  </div>
                )}

                {asset.status === 'failed' && (
                  <div className="absolute inset-0 bg-red-900/10 flex flex-col items-center justify-center gap-2">
                    <div className="bg-red-500 rounded-full p-2 shadow-lg ring-4 ring-white/20">
                      <span className="material-symbols-outlined text-white block" style={{ fontSize: '18px' }}>priority_high</span>
                    </div>
                    <div className="bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      <span className="text-white text-[10px] font-bold">生成失败</span>
                    </div>
                  </div>
                )}

                {asset.status === 'original' && (
                  <div className="absolute top-2 left-2 bg-slate-900/60 backdrop-blur-md rounded-lg px-2 py-0.5 border border-white/10">
                    <span className="text-[10px] font-bold text-white tracking-wide">原图</span>
                  </div>
                )}

                {asset.isDynamic && asset.status === 'completed' && (
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md rounded-full p-1.5 flex items-center justify-center border border-white/10 shadow-lg">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '16px' }}>play_arrow</span>
                  </div>
                )}
              </div>
              <div className="px-3 pb-3 pt-1 relative">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate flex-1">{asset.name}</p>
                  <button 
                    onClick={(e) => handleMenuClick(e, asset.id)}
                    className="menu-trigger flex items-center justify-center size-6 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ml-1"
                  >
                    <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '18px' }}>more_horiz</span>
                  </button>
                </div>
                
                {activeMenuId === asset.id && (
                    <div className="absolute right-3 top-7 z-50 w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1 animate-in fade-in zoom-in duration-200 origin-top-right">
                        <button 
                            onClick={(e) => handleDelete(e, asset.id)}
                            className="w-full px-3 py-2 text-left text-xs font-bold text-red-500 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            删除
                        </button>
                        <button 
                            onClick={(e) => handleDownload(e, asset.name)}
                            className="w-full px-3 py-2 text-left text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                        >
                            <span className="material-symbols-outlined text-[16px]">download</span>
                            下载
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center mt-0.5">
                  <p className={`text-[10px] font-semibold ${asset.status === 'processing' ? 'text-primary' : asset.status === 'failed' ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
                    {asset.timestamp}
                  </p>
                  {asset.isFavorited && (
                    <span className="material-symbols-outlined text-primary text-[14px] filled">favorite</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-24 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-4">
            <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">photo_library</span>
            </div>
            <p className="text-sm font-medium">暂无相关素材</p>
          </div>
        )}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} />
    </div>
  );
};

export default AssetsScreen;
