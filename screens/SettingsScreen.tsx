
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
      <div className="flex-1 overflow-y-auto no-scrollbar pb-48">
        <div className="pt-12"></div>

        <div className="px-8 mb-10">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-soft border border-primary/5 flex items-center justify-between">
            <div className="flex flex-col items-start gap-2">
              <span className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('label_coins')}</span>
              <div className="flex items-center gap-3">
                <span className="text-[64px] font-black text-slate-900 dark:text-white leading-none">1,240</span>
                <span className="material-symbols-outlined text-amber-400 text-[56px] filled">monetization_on</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate(Screen.Pro)}
              className="px-10 py-5 bg-primary text-white rounded-[2rem] text-xl font-black shadow-xl shadow-primary/30 active:scale-95 transition-all"
            >
              {t('btn_recharge')}
            </button>
          </div>
        </div>

        {[
          { 
            title: t('label_legal'), 
            items: [
              { icon: 'policy', label: t('label_privacy'), color: 'bg-emerald-100/10 text-emerald-500', screen: Screen.PrivacyPolicy },
              { icon: 'description', label: t('label_agreement'), color: 'bg-slate-100/10 text-slate-400', screen: Screen.UserAgreement }
            ] 
          },
          { 
            title: t('label_general'), 
            items: [
              { icon: 'language', label: t('label_lang'), color: 'bg-indigo-100/10 text-indigo-500', sub: language, screen: Screen.Language },
              { icon: isDarkMode ? 'dark_mode' : 'light_mode', label: t('label_darkmode'), color: 'bg-slate-100/10 text-slate-400', toggle: true }
            ] 
          },
          { 
            title: t('label_support'), 
            items: [
              { icon: 'support_agent', label: t('label_contact'), color: 'bg-sky-100/10 text-sky-500', screen: Screen.ContactUs },
              { icon: 'info', label: t('label_about'), color: 'bg-pink-100/10 text-pink-500', sub: 'v1.2.0', screen: Screen.AboutUs }
            ] 
          }
        ].map((section, idx) => (
          <div key={idx} className="px-8 mb-10">
            <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4 ml-6">{section.title}</h3>
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-soft overflow-hidden flex flex-col border border-slate-100 dark:border-slate-800">
              {section.items.map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    if (item.toggle) onToggleDarkMode();
                    else if (item.screen) onNavigate(item.screen);
                  }}
                  className="flex items-center justify-between p-8 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0 h-24"
                >
                  <div className="flex items-center gap-6">
                    <div className={`flex items-center justify-center rounded-2xl h-14 w-14 ${item.color} dark:bg-slate-800`}>
                      <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{item.label}</span>
                  </div>
                  {item.toggle ? (
                    <div className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors ${isDarkMode ? 'bg-primary' : 'bg-slate-200'}`}>
                      <span className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-md transition-transform ${isDarkMode ? 'translate-x-11' : 'translate-x-1'}`}></span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      {item.sub && <span className="text-xl text-slate-400 font-medium">{item.sub}</span>}
                      <span className="material-symbols-outlined text-slate-300 text-[32px]">chevron_right</span>
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
