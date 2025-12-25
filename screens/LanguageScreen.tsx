
import React, { useState } from 'react';
import { LANGUAGES } from '../constants';

interface LanguageScreenProps {
  onBack: () => void;
}

const LanguageScreen: React.FC<LanguageScreenProps> = ({ onBack }) => {
  const [selected, setSelected] = useState('zh-CN');

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark">
      <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-900 dark:text-white text-[24px]">arrow_back_ios_new</span>
          </button>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">切换语言</h2>
          <div className="size-10"></div>
        </div>
      </nav>

      <main className="flex-1 px-5 py-6 flex flex-col gap-3 overflow-y-auto no-scrollbar">
        {LANGUAGES.map((lang, idx) => (
          <label 
            key={idx}
            className={`group relative flex cursor-pointer items-center justify-between rounded-2xl p-4 shadow-sm border transition-all duration-200 active:scale-[0.99] ${selected === lang.value ? 'bg-primary/5 border-primary ring-2 ring-primary/20' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}
          >
            <div className="flex flex-col">
              <span className={`text-base font-bold transition-colors ${selected === lang.value ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{lang.label}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{lang.sub}</span>
            </div>
            <input 
              type="radio"
              name="language"
              value={lang.value}
              checked={selected === lang.value}
              onChange={() => setSelected(lang.value)}
              className="peer h-6 w-6 appearance-none rounded-full border-2 border-slate-300 dark:border-slate-600 bg-transparent custom-radio focus:ring-0 transition-all checked:border-primary"
            />
          </label>
        ))}
      </main>
    </div>
  );
};

export default LanguageScreen;
