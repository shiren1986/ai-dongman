
import React from 'react';
import { LANGUAGES, TRANSLATIONS } from '../constants';

interface LanguageScreenProps {
  language: string;
  setLanguage: (lang: string) => void;
  onBack: () => void;
}

const LanguageScreen: React.FC<LanguageScreenProps> = ({ language, setLanguage, onBack }) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['zh-CN'][key] || key;

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark overflow-hidden">
      {/* 顶部导航 - 适配 750px 大比例 */}
      <nav className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center justify-between px-8 h-32">
          <button 
            onClick={onBack} 
            className="flex size-14 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-soft text-slate-900 dark:text-white active:scale-90 transition-all border border-slate-100 dark:border-slate-700"
          >
            <span className="material-symbols-outlined text-[36px]">arrow_back_ios_new</span>
          </button>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('header_language')}</h2>
          <div className="size-14"></div>
        </div>
      </nav>

      {/* 语言列表 - 增大卡片比例 */}
      <main className="flex-1 px-8 py-10 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-32">
        {LANGUAGES.map((lang, idx) => {
          const isSelected = language === lang.value;
          return (
            <label 
              key={idx}
              className={`group relative flex cursor-pointer items-center justify-between rounded-[2.5rem] p-8 shadow-soft border-4 transition-all duration-300 active:scale-[0.98] ${
                isSelected 
                  ? 'bg-primary/5 border-primary ring-[12px] ring-primary/10' 
                  : 'bg-white dark:bg-slate-900 border-transparent dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className={`text-2xl font-black transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                  {lang.label}
                </span>
                <span className={`text-lg font-bold transition-colors ${isSelected ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
                  {lang.sub}
                </span>
              </div>
              
              <div className="relative flex items-center justify-center">
                <input 
                  type="radio"
                  name="language"
                  value={lang.value}
                  checked={isSelected}
                  onChange={() => setLanguage(lang.value)}
                  className="peer h-10 w-10 appearance-none rounded-full border-4 border-slate-200 dark:border-slate-700 bg-transparent focus:ring-0 transition-all checked:border-primary"
                />
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-300">
                    <div className="size-5 bg-primary rounded-full shadow-[0_0_15px_rgba(124,58,237,0.6)]"></div>
                  </div>
                )}
              </div>
            </label>
          );
        })}
        
        {/* 底部点缀 */}
        <div className="py-12 flex flex-col items-center opacity-20 select-none">
          <span className="material-symbols-outlined text-6xl mb-4">translate</span>
          <p className="text-xs font-black tracking-[0.5em] uppercase">Language Selection</p>
        </div>
      </main>
    </div>
  );
};

export default LanguageScreen;
