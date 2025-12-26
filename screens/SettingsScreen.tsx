
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
    <div className="h-full flex flex-col pb-28 bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar">
      <div className="pt-8"></div>

      <div className="px-4 mb-6">
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-primary/10 flex items-center justify-between">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('label_coins')}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white leading-none">1,240</span>
              <span className="material-symbols-outlined text-yellow-500 text-2xl filled leading-none">monetization_on</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate(Screen.Pro)}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-md shadow-primary/20 active:scale-95 transition-all"
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
        <div key={idx} className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-2">{section.title}</h3>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm overflow-hidden flex flex-col">
            {section.items.map((item, i) => (
              <div 
                key={i} 
                onClick={() => {
                  if (item.toggle) onToggleDarkMode();
                  else if (item.screen) onNavigate(item.screen);
                }}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center rounded-lg h-9 w-9 ${item.color} dark:bg-slate-800 dark:text-current`}>
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <span className="text-base font-medium text-slate-900 dark:text-white">{item.label}</span>
                </div>
                {item.toggle ? (
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-primary' : 'bg-slate-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}></span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {item.sub && <span className="text-sm text-slate-400">{item.sub}</span>}
                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} language={language} />
    </div>
  );
};

export default SettingsScreen;
