
import React, { useState } from 'react';
import { Tab } from '../types';
import BottomNavigation from '../components/BottomNavigation';

interface ProfileScreenProps {
  onBack: () => void;
  activeTab: Tab;
  switchTab: (tab: Tab) => void;
  currentAvatar: string;
  onSaveAvatar: (url: string) => void;
  language: string;
  t: (key: string) => string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, activeTab, switchTab, currentAvatar, onSaveAvatar, language, t }) => {
  const [pendingAvatarUrl, setPendingAvatarUrl] = useState(currentAvatar);

  // Generate a list of recommended avatar URLs
  const recommendedAvatars = [...Array(10)].map((_, i) => `https://picsum.photos/seed/avatar${i}/200/200`);

  const handleSave = () => {
    onSaveAvatar(pendingAvatarUrl);
    onBack();
  };

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark">
      <nav className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
          </button>
          <h1 className="text-slate-900 dark:text-white text-lg font-bold">{t('header_profile')}</h1>
          <div className="w-10"></div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="flex flex-col items-center pt-10 pb-12">
          <div className="relative group">
            <div className="p-1 rounded-full border-2 border-primary/20">
              <div 
                className="w-32 h-32 rounded-full bg-cover bg-center shadow-xl transition-all duration-500 ring-4 ring-white dark:ring-slate-900" 
                style={{ backgroundImage: `url('${pendingAvatarUrl}')` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="px-6 mb-8">
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 pl-1">{t('label_nickname')}</label>
          <div className="flex items-center w-full bg-white dark:bg-slate-800 rounded-xl px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700 transition-all">
            <input className="flex-1 bg-transparent border-none text-slate-900 dark:text-white text-base font-medium placeholder-slate-400 focus:ring-0 p-0" type="text" defaultValue="Momo"/>
            <button className="text-primary p-1">
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between px-6 mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('label_suggestions')}</h3>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">Avatar Style</span>
          </div>
          <div className="grid grid-cols-5 gap-3 px-6">
            {recommendedAvatars.map((url, i) => {
              const isSelected = pendingAvatarUrl === url;
              return (
                <button 
                  key={i} 
                  onClick={() => setPendingAvatarUrl(url)}
                  className={`relative aspect-square rounded-full p-0.5 border-2 transition-all duration-300 transform active:scale-90 ${isSelected ? 'border-primary scale-110 shadow-lg' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
                >
                  <div 
                    className="w-full h-full rounded-full bg-cover bg-center bg-slate-200" 
                    style={{ backgroundImage: `url('${url}')` }}
                  ></div>
                  {isSelected && (
                    <div className="absolute -bottom-1 -right-1 size-5 bg-primary rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center animate-in zoom-in">
                      <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-6">
          <button 
            onClick={handleSave}
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[22px]">save</span>
            {t('btn_save_changes')}
          </button>
        </div>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default ProfileScreen;
