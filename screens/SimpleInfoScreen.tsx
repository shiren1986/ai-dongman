
import React from 'react';

interface SimpleInfoScreenProps {
  title: string;
  type: 'contact' | 'about';
  onBack: () => void;
  t: (key: string) => string;
}

const SimpleInfoScreen: React.FC<SimpleInfoScreenProps> = ({ title, type, onBack, t }) => {
  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark">
      <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-900 dark:text-white text-[24px]">arrow_back_ios_new</span>
          </button>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
          <div className="size-10"></div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {type === 'contact' ? (
          <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="size-24 rounded-[2rem] bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-sky-500 text-5xl filled">mail</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t('label_contact')}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t('label_contact_desc')}</p>
            </div>
            <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('label_official_email')}</p>
              <a href="mailto:support@vividai.com" className="text-xl font-bold text-primary hover:underline transition-all">
                support@vividai.com
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110"></div>
              <div className="relative size-24 rounded-[2rem] bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center p-2 ring-1 ring-slate-100 dark:ring-white/5">
                <img src="https://picsum.photos/seed/splash/400/400" className="size-full object-cover rounded-[1.5rem]" alt="Logo" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t('label_about')}</h3>
              <p className="text-primary font-bold tracking-tighter uppercase text-xs">Vivid AI Studio</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800/50 px-6 py-2 rounded-full border border-slate-200/50 dark:border-white/5">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{t('label_version')} v1.2.0</span>
            </div>
            <p className="max-w-[240px] text-xs leading-relaxed text-slate-400 font-medium">
              {t('label_about_desc')}
            </p>
          </div>
        )}
      </main>
      
      <div className="p-10 text-center opacity-20 pointer-events-none">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase">Vivid AI © 2025</p>
      </div>
    </div>
  );
};

export default SimpleInfoScreen;
