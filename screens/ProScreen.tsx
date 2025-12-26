
import React, { useState } from 'react';

interface ProScreenProps {
  onBack: () => void;
  avatarUrl: string;
  // Added missing props to fix TS error
  language: string;
  t: (key: string) => string;
}

const ProScreen: React.FC<ProScreenProps> = ({ onBack, avatarUrl, language, t }) => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Default to the second package (100 coins)

  const packages = [
    { coins: '50 金币', price: '¥6' },
    { coins: '100 金币', price: '¥12' },
    { coins: '300 金币', price: '¥30' },
    { coins: '500 金币', price: '¥48' },
    { coins: '1000 金币', price: '¥88' },
    { coins: '2000 金币', price: '¥168' }
  ];

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark">
      <div className="flex items-center justify-between px-5 pt-12 pb-2 shrink-0 bg-background-light dark:bg-background-dark">
        <button 
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark shadow-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <button className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('label_restore')}</button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 px-5">
        <div className="flex flex-col items-center mt-2 mb-8">
          {/* 头像框区域已根据用户要求删除 */}
          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white text-center">
            {t('label_pro_title')}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 text-center max-w-[280px]">
            {t('label_pro_desc')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {packages.map((pkg, i) => {
            const isSelected = selectedIndex === i;
            return (
              <div 
                key={i} 
                onClick={() => setSelectedIndex(i)}
                className={`relative flex flex-col items-center justify-center rounded-2xl p-5 shadow-sm border-2 transition-all duration-200 cursor-pointer active:scale-95 ${
                  isSelected 
                    ? 'bg-primary/5 dark:bg-primary/10 border-primary ring-4 ring-primary/10' 
                    : 'bg-white dark:bg-surface-dark border-transparent dark:border-slate-800'
                }`}
              >
                <div className="mb-3 text-yellow-400">
                  <span className="material-symbols-outlined text-[32px] filled">monetization_on</span>
                </div>
                <span className={`text-base font-bold transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                  {pkg.coins}
                </span>
                <span className={`text-sm font-bold mt-1 transition-colors ${isSelected ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
                  {pkg.price}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center pb-8">
          <p className="text-[10px] text-slate-400 leading-relaxed px-4">
            购买即代表您同意我们的<a className="text-slate-500 dark:text-slate-300 underline mx-1" href="#">{t('label_agreement')}</a>和<a className="text-slate-500 dark:text-slate-300 underline mx-1" href="#">{t('label_privacy')}</a>。<br/>
            金币永久有效，消耗完毕需再次购买。
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent pt-8 p-5 pb-safe z-50">
        <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold text-lg h-14 rounded-2xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <span>{t('label_buy_now')}</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default ProScreen;
