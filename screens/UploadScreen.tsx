
import React, { useState } from 'react';
import { Template } from '../types';

interface UploadScreenProps {
  template: Template | null;
  onBack: () => void;
  onStartGeneration: () => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ template, onBack, onStartGeneration }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleStart = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark relative">
      <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shrink-0">
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all text-slate-900 dark:text-white"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
          </button>
          <h1 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">上传照片</h1>
          <div className="w-10"></div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col px-5 pt-6 pb-6 overflow-y-auto no-scrollbar">
        <div className="mb-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
            为了获得最佳效果，请上传一张光线充足、<br/>五官清晰的正面照片。
          </p>
        </div>

        <div className="mb-6 w-full group cursor-pointer relative">
          <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer" />
          <div className="relative w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-primary/30 dark:border-primary/40 bg-white dark:bg-surface-dark flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 shadow-sm overflow-hidden">
            {template && (
              <div className="absolute top-3 left-3 flex items-center gap-3 bg-slate-50/80 dark:bg-slate-800/80 p-2 pr-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm z-20 backdrop-blur-sm">
                <div className="w-10 h-12 rounded-lg overflow-hidden bg-slate-200">
                  <img src={template.imageUrl} alt="Template" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 font-medium leading-none mb-1">已选模板</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-none">{template.name}</span>
                </div>
              </div>
            )}
            <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-primary text-[40px]">add_photo_alternate</span>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-white dark:bg-surface-dark rounded-full flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-yellow-500 text-[20px] filled">spark</span>
              </div>
            </div>
            <div className="text-center px-6">
              <p className="text-slate-900 dark:text-white font-bold text-lg mb-1">点击上传或拖拽照片</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs">支持 JPG, PNG 格式 (最大 5MB)</p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-4 mb-8">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-slate-900 dark:text-white text-base font-bold">照片建议</h3>
            <span className="text-primary text-xs font-semibold bg-primary/10 px-2 py-1 rounded-full">高成功率秘诀</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: '正面清晰', status: 'check', color: 'green' },
              { label: '光线昏暗', status: 'close', color: 'red' },
              { label: '遮挡面部', status: 'close', color: 'red' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className={`relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 ${item.color === 'green' ? 'border-green-500/50' : 'border-transparent opacity-80'}`}>
                  <img src={`https://picsum.photos/seed/tip${i}/200/200`} className="w-full h-full object-cover" alt={item.label} />
                  {item.color === 'red' && <div className="absolute inset-0 bg-black/40"></div>}
                  <div className={`absolute bottom-1 right-1 ${item.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-full p-0.5`}>
                    <span className="material-symbols-outlined text-[14px] font-bold block">{item.status}</span>
                  </div>
                </div>
                <p className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-4 w-full">
          <div className="flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary filled">bolt</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">本次生成消耗：5 算力</span>
          </div>
          <button 
            disabled={isGenerating}
            onClick={handleStart}
            className={`w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-primary text-white font-bold text-lg active:scale-[0.98] transition-all shadow-lg shadow-primary/30 ${isGenerating ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isGenerating ? (
              <span className="material-symbols-outlined animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            )}
            <span>{isGenerating ? '正在创建...' : '开始生成'}</span>
          </button>
        </div>
      </main>

      {/* Creation Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleCloseModal}
          ></div>
          
          {/* Modal Card */}
          <div className="relative w-full max-w-[340px] bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100 flex flex-col items-center">
            
            {/* Top Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 size-8 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Content Image Section */}
            <div className="relative w-full aspect-[1.1/1] overflow-hidden">
              <img 
                src={template?.imageUrl || 'https://picsum.photos/seed/success/400/400'} 
                alt="Generated Avatar" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent"></div>
            </div>

            {/* Checkmark Badge */}
            <div className="relative -mt-10 z-20">
              <div className="size-20 rounded-full bg-emerald-500 border-[6px] border-white dark:border-slate-900 shadow-xl flex items-center justify-center animate-bounce-short">
                <span className="material-symbols-outlined text-white text-[44px] font-bold">check</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="px-6 pt-4 pb-8 text-center flex flex-col items-center gap-3">
              <h2 className="text-[1.75rem] font-bold text-slate-900 dark:text-white leading-tight">创建成功！</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed px-2">
                您的{template?.name || '清新动漫风格'}动态头像已经在开始制作，点击查看我的素材可以查看
              </p>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-3 mt-4">
                <button 
                  onClick={() => {
                    onStartGeneration();
                    handleCloseModal();
                  }}
                  className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[22px]">photo_library</span>
                  查看我的素材
                </button>
                <button 
                  onClick={handleCloseModal}
                  className="w-full h-14 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[22px]">replay</span>
                  继续生成
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Hint */}
          <div className="absolute bottom-10 left-0 right-0 text-center animate-pulse pointer-events-none">
            <p className="text-white/60 text-[13px] font-medium">点击背景区域可关闭弹窗</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-short {
          animation: bounceShort 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default UploadScreen;
