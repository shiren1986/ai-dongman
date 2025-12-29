
import React, { useState } from 'react';

interface ProScreenProps {
  onBack: () => void;
  avatarUrl: string;
  language: string;
  t: (key: string) => string;
}

const ProScreen: React.FC<ProScreenProps> = ({ onBack, avatarUrl, language, t }) => {
  const [selectedIndex, setSelectedIndex] = useState(1); // 默认选中 100 金币

  const packages = [
    { coins: '50 金币', price: '¥6' },
    { coins: '100 金币', price: '¥12' },
    { coins: '300 金币', price: '¥30' },
    { coins: '500 金币', price: '¥48' },
    { coins: '1000 金币', price: '¥88' },
    { coins: '2000 金币', price: '¥168' }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-background-light dark:bg-background-dark overflow-hidden relative">
      {/* 顶部导航 - 增大比例适配 750px */}
      <div className="flex items-center justify-between px-8 h-32 shrink-0 z-10">
        <button 
          onClick={onBack}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-soft text-slate-500 dark:text-slate-400 active:scale-90 transition-all border border-slate-100 dark:border-slate-700"
        >
          <span className="material-symbols-outlined text-[36px]">close</span>
        </button>
        <button className="text-xl font-bold text-slate-500 dark:text-slate-400 active:opacity-60">{t('label_restore')}</button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-60 px-8">
        <div className="flex flex-col items-center mt-4 mb-14 px-4">
          <h2 className="text-[52px] font-black text-slate-900 dark:text-white text-center leading-tight">
            {t('label_pro_title')}
          </h2>
          <p className="mt-4 text-2xl text-slate-500 dark:text-slate-400 text-center leading-relaxed font-bold">
            {t('label_pro_desc')}
          </p>
        </div>

        {/* 充值网格 - 放大卡片尺寸 */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {packages.map((pkg, i) => {
            const isSelected = selectedIndex === i;
            return (
              <div 
                key={i} 
                onClick={() => setSelectedIndex(i)}
                className={`relative flex flex-col items-center justify-center rounded-[3.5rem] p-10 shadow-soft border-4 transition-all duration-300 cursor-pointer active:scale-95 ${
                  isSelected 
                    ? 'bg-primary/5 dark:bg-primary/10 border-primary ring-[12px] ring-primary/10' 
                    : 'bg-white dark:bg-slate-900 border-transparent dark:border-slate-800'
                }`}
              >
                <div className={`mb-6 ${isSelected ? 'animate-bounce-short' : ''}`}>
                  <span className="material-symbols-outlined text-[64px] text-amber-400 filled">monetization_on</span>
                </div>
                <span className={`text-3xl font-black transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                  {pkg.coins}
                </span>
                <span className={`text-2xl font-black mt-3 transition-colors ${isSelected ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
                  {pkg.price}
                </span>
                
                {isSelected && (
                  <div className="absolute -top-3 -right-3 size-10 bg-primary rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl">
                    <span className="material-symbols-outlined text-white text-[24px] font-black">check</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 底部协议说明 - 优化排版 */}
        <div className="text-center pb-12">
          <p className="text-lg text-slate-400 dark:text-slate-500 leading-relaxed font-bold px-10">
            购买即代表您同意我们的<a className="text-slate-600 dark:text-slate-300 underline mx-2" href="#">{t('label_agreement')}</a>和<a className="text-slate-600 dark:text-slate-300 underline mx-2" href="#">{t('label_privacy')}</a>。<br/>
            金币永久有效，消耗完毕需再次购买。
          </p>
        </div>
      </div>

      {/* 底部悬浮购买按钮 - 移除宽容度限制，填满 750px */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent pt-12 pb-16 px-10 z-50">
        <button className="w-full bg-primary hover:brightness-110 text-white font-black text-2xl h-20 rounded-[2.5rem] shadow-glow active:scale-[0.98] transition-all flex items-center justify-center gap-4">
          <span>{t('label_buy_now')}</span>
          <span className="material-symbols-outlined text-[32px] font-black">arrow_forward</span>
        </button>
      </div>

      <style>{`
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-short {
          animation: bounceShort 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ProScreen;
