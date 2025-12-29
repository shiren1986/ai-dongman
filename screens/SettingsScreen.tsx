
import React from 'react';
import { Tab, Screen } from '../types';
import BottomNavigation from '../components/BottomNavigation';

interface SettingsScreenProps {
  activeTab: Tab;
  switchTab: (tab: Tab) => void;
  onNavigate: (screen: Screen) => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
  avatarUrl: string;
  language: string;
  t: (key: string) => string;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ activeTab, switchTab, onNavigate, onToggleDarkMode, isDarkMode, avatarUrl, language, t }) => {
  return (
    <div className="w-full h-full flex flex-col bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-60">
        <div className="pt-16"></div>

        {/* 顶部金币余额卡片 - 针对 750px 深度定制 */}
        <div className="px-8 mb-14">
          <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-10 shadow-soft border border-primary/10 flex items-center justify-between ring-1 ring-slate-200 dark:ring-white/5 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 size-40 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="flex flex-col items-start gap-3 relative z-10">
              <span className="text-xl font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">{t('label_coins')}</span>
              <div className="flex items-center gap-4">
                <span className="text-7xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">1,240</span>
                <span className="material-symbols-outlined text-amber-400 text-[72px] filled drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">monetization_on</span>
              </div>
            </div>
            
            <button 
              onClick={() => onNavigate(Screen.Pro)}
              className="px-10 h-20 bg-primary text-white rounded-full text-2xl font-black shadow-glow active:scale-95 transition-all flex items-center justify-center relative z-10"
            >
              {t('btn_recharge')}
            </button>
          </div>
        </div>

        {[
          { 
            title: t('label_legal'), 
            items: [
              { icon: 'policy', label: t('label_privacy'), color: 'bg-emerald-500/10 text-emerald-500', screen: Screen.PrivacyPolicy },
              { icon: 'description', label: t('label_agreement'), color: 'bg-slate-500/10 text-slate-400', screen: Screen.UserAgreement }
            ] 
          },
          { 
            title: t('label_general'), 
            items: [
              { icon: 'language', label: t('label_lang'), color: 'bg-indigo-500/10 text-indigo-500', sub: language, screen: Screen.Language },
              { icon: isDarkMode ? 'dark_mode' : 'light_mode', label: t('label_darkmode'), color: 'bg-slate-500/10 text-slate-400', toggle: true }
            ] 
          },
          { 
            title: t('label_support'), 
            items: [
              { icon: 'support_agent', label: t('label_contact'), color: 'bg-sky-500/10 text-sky-500', screen: Screen.ContactUs },
              { icon: 'info', label: t('label_about'), color: 'bg-pink-500/10 text-pink-500', sub: 'v1.2.0', screen: Screen.AboutUs }
            ] 
          }
        ].map((section, idx) => (
          <div key={idx} className="px-8 mb-12">
            <h3 className="text-xl font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-6 ml-10">{section.title}</h3>
            <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-soft overflow-hidden flex flex-col border border-slate-100 dark:border-slate-800 ring-1 ring-slate-100 dark:ring-white/5">
              {section.items.map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    if (item.toggle) onToggleDarkMode();
                    else if (item.screen) onNavigate(item.screen);
                  }}
                  className="flex items-center justify-between p-10 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0 h-32"
                >
                  <div className="flex items-center gap-8">
                    <div className={`flex items-center justify-center rounded-[1.5rem] size-16 ${item.color} dark:bg-slate-800 transition-transform active:scale-90`}>
                      <span className="material-symbols-outlined text-[36px]">{item.icon}</span>
                    </div>
                    <span className="text-[28px] font-black text-slate-900 dark:text-white">{item.label}</span>
                  </div>
                  
                  {item.toggle ? (
                    <div className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-primary shadow-glow' : 'bg-slate-200'}`}>
                      <span className={`inline-block size-10 transform rounded-full bg-white shadow-xl transition-transform duration-300 ${isDarkMode ? 'translate-x-13' : 'translate-x-1'}`}></span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-5">
                      {item.sub && <span className="text-2xl text-slate-400 dark:text-slate-500 font-bold">{item.sub}</span>}
                      <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[40px] font-bold">chevron_right</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default SettingsScreen;
