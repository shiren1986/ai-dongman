
import React from 'react';

interface SimpleInfoScreenProps {
  title: string;
  type: 'contact' | 'about';
  onBack: () => void;
  t: (key: string) => string;
}

const SimpleInfoScreen: React.FC<SimpleInfoScreenProps> = ({ title, type, onBack, t }) => {
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
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h2>
          <div className="size-14"></div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-12 text-center pb-32">
        {type === 'contact' ? (
          <div className="flex flex-col items-center gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
            <div className="size-40 rounded-[3.5rem] bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center shadow-soft border border-sky-200 dark:border-sky-500/20">
              <span className="material-symbols-outlined text-sky-500 text-[96px] filled">mail</span>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{t('label_contact')}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-2xl font-bold leading-relaxed max-w-[500px] mx-auto">
                {t('label_contact_desc')}
              </p>
            </div>

            <div className="w-full bg-white dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-soft relative overflow-hidden group active:scale-[0.98] transition-all">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-lg font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mb-4 relative z-10">
                {t('label_official_email')}
              </p>
              <a 
                href="mailto:support@dynamic-ai.com" 
                className="text-4xl font-black text-primary hover:text-primary/80 transition-all block relative z-10 break-all"
              >
                support@dynamic-ai.com
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-125"></div>
              {/* 修改为黑色背景以匹配图标 */}
              <div className="relative size-48 rounded-[4rem] bg-black dark:bg-black shadow-2xl flex items-center justify-center p-0 ring-4 ring-primary/20 overflow-hidden">
                <img src="logo.png" className="size-full object-cover" alt="Logo" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{t('label_about')}</h3>
              <p className="text-primary font-black tracking-tight uppercase text-xl px-4">Dynamic AI-Stylized Avatar Studio</p>
            </div>

            <div className="bg-slate-100 dark:bg-slate-900/80 px-10 py-4 rounded-full border border-slate-200/50 dark:border-white/5 shadow-inner">
              <span className="text-xl font-black text-slate-600 dark:text-slate-400">{t('label_version')} v1.2.0</span>
            </div>

            <p className="max-w-[540px] text-2xl leading-relaxed text-slate-500 dark:text-slate-400 font-bold">
              {t('label_about_desc')}
            </p>
          </div>
        )}
      </main>
      
      <div className="pb-16 text-center opacity-30 pointer-events-none px-4">
        <p className="text-lg font-black tracking-tight uppercase text-slate-400">Dynamic AI-Stylized Avatar © 2025</p>
      </div>
    </div>
  );
};

export default SimpleInfoScreen;
