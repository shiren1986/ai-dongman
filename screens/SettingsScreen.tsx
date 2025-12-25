
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
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ activeTab, switchTab, onNavigate, onToggleDarkMode, isDarkMode, avatarUrl }) => {
  return (
    <div className="h-full flex flex-col pb-24 bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar">
      <div className="px-5 pt-14 pb-4 sticky top-0 bg-background-light/95 dark:bg-background-dark/95 z-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">设置</h1>
      </div>

      <div className="px-4 mb-6" onClick={() => onNavigate(Screen.Profile)}>
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-cover bg-center border-2 border-primary/20" style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
              <div className="absolute bottom-0 right-0 h-5 w-5 bg-primary rounded-full border-2 border-white dark:border-surface-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[10px] font-bold">edit</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Momo</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">查看并编辑个人资料</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400">chevron_right</span>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-primary/10 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-500 text-xl filled">monetization_on</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">我的金币</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">1,240</span>
              <span className="material-symbols-outlined text-yellow-500 text-2xl filled">monetization_on</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate(Screen.Pro)}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-md shadow-primary/20 active:scale-95 transition-all"
          >
            充值
          </button>
        </div>
      </div>

      {[
        { 
          title: '法律与协议', 
          items: [
            { icon: 'policy', label: '隐私政策', color: 'bg-emerald-100 text-emerald-600', screen: null },
            { icon: 'description', label: '用户协议', color: 'bg-slate-100 text-slate-600', screen: null }
          ] 
        },
        { 
          title: '通用设置', 
          items: [
            { icon: 'language', label: '语言', color: 'bg-indigo-100 text-indigo-600', sub: '简体中文', screen: Screen.Language },
            { icon: isDarkMode ? 'dark_mode' : 'light_mode', label: '深色模式', color: 'bg-slate-100 text-slate-600', toggle: true }
          ] 
        },
        { 
          title: '关于与支持', 
          items: [
            { icon: 'support_agent', label: '联系我们', color: 'bg-sky-100 text-sky-600', screen: null },
            { icon: 'info', label: '关于我们', color: 'bg-pink-100 text-pink-600', sub: 'v1.2.0', screen: null }
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
                  <div className={`flex items-center justify-center rounded-lg h-9 w-9 ${item.color} dark:bg-slate-700 dark:text-slate-300`}>
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

      <div className="px-4 pb-10">
        <button className="w-full bg-white dark:bg-surface-dark text-red-500 font-semibold py-4 rounded-2xl shadow-sm active:bg-red-50 transition-colors text-base border border-slate-100 dark:border-transparent">
          退出登录
        </button>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={switchTab} />
    </div>
  );
};

export default SettingsScreen;
