
import React, { useState, useRef } from 'react';
import { Template } from '../types';

interface UploadScreenProps {
  template: Template | null;
  onBack: () => void;
  onStartGeneration: () => void;
  language: string;
  t: (key: string) => string;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ template, onBack, onStartGeneration, language, t }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStart = () => {
    if (!uploadedImage) {
      alert(t('label_uploaded'));
      return;
    }
    setIsGenerating(true);
    // 模拟生成延迟
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // 关闭弹窗时重置已上传图片，方便用户“继续生成”
    setUploadedImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  // 模拟半身照建议图片
  const suggestionPhotos = [
    { 
      label: t('label_suggestion_1'), 
      status: 'check', 
      color: 'green',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop' 
    },
    { 
      label: t('label_suggestion_2'), 
      status: 'close', 
      color: 'red',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop&bri=-60' 
    },
    { 
      label: t('label_suggestion_3'), 
      status: 'close', 
      color: 'red',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop&blur=50' 
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark relative">
      <nav className="sticky top-0 z-50 bg-background-light dark:bg-background-dark shrink-0">
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full active:scale-95 transition-all text-slate-900 dark:text-white"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
          </button>
          <h1 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">{t('header_upload')}</h1>
          <div className="w-10"></div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col px-6 pt-4 pb-12 overflow-y-auto no-scrollbar">
        {/* 顶部提示 */}
        <div className="mb-6 text-center px-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
            {t('label_upload_tip')}
          </p>
        </div>

        {/* 上传区域 - 调整为 3:4 比例以适配竖屏照片 */}
        <div className="mb-10 w-full relative">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden" 
          />
          <div 
            onClick={triggerUpload}
            className="relative w-full aspect-[3/4] rounded-[2.5rem] border-2 border-dashed border-primary/20 dark:border-primary/40 bg-white dark:bg-surface-dark flex flex-col items-center justify-center p-4 transition-all duration-300 hover:border-primary shadow-sm overflow-hidden cursor-pointer"
          >
            {uploadedImage ? (
              <div className="absolute inset-0 w-full h-full animate-in fade-in duration-500">
                <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-2 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-primary text-[20px]">cached</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{t('btn_re_upload')}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5">
                <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[42px] filled">image</span>
                  <div className="absolute top-1 right-2">
                     <span className="material-symbols-outlined text-primary text-[24px] font-bold">add</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-slate-900 dark:text-white font-bold text-xl mb-1.5">{t('label_uploaded')}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">{t('label_file_type')}</p>
                </div>
              </div>
            )}

            {/* 已选模板缩略图 */}
            {template && (
              <div className="absolute top-6 left-6 z-20">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 p-1 border border-slate-100 dark:border-slate-700 shadow-2xl backdrop-blur-md ring-4 ring-white/10">
                  <img src={template.imageUrl} alt="Template" className="w-full h-full object-cover rounded-xl" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 照片建议 */}
        <div className="w-full space-y-4 mb-10">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900 dark:text-white text-base font-bold">{t('label_suggestions')}</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {suggestionPhotos.map((item, i) => (
              <div key={i} className="flex flex-col gap-2.5">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200/50 dark:ring-white/5">
                  <img src={item.url} className="w-full h-full object-cover" alt={item.label} />
                  <div className={`absolute bottom-2 right-2 ${item.color === 'green' ? 'bg-emerald-500' : 'bg-rose-500'} text-white rounded-full p-0.5 shadow-sm`}>
                    <span className="material-symbols-outlined text-[12px] font-black block leading-none">{item.status}</span>
                  </div>
                </div>
                <p className="text-center text-[11px] font-bold text-slate-500 dark:text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 底部按钮与消耗 */}
        <div className="mt-auto pt-6 flex flex-col gap-4 w-full">
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-amber-400 filled">monetization_on</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('label_cost')}：5</span>
            <span className="material-symbols-outlined text-[18px] text-amber-400 filled">monetization_on</span>
          </div>
          <button 
            disabled={isGenerating || !uploadedImage}
            onClick={handleStart}
            className={`w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-primary text-white font-bold text-lg active:scale-[0.98] transition-all shadow-xl shadow-primary/20 ${isGenerating || !uploadedImage ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
          >
            {isGenerating ? (
              <span className="material-symbols-outlined animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            )}
            <span>{isGenerating ? t('btn_saving') : t('btn_generate')}</span>
          </button>
        </div>
      </main>

      {/* 成功弹窗 */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative w-full max-w-[340px] bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col items-center animate-in zoom-in duration-300">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 z-10 size-8 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white active:scale-90">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <img src={template?.imageUrl || 'https://picsum.photos/seed/success/400/400'} alt="Generated" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-surface-dark via-transparent to-transparent"></div>
            </div>
            <div className="relative -mt-10 z-20">
              <div className="size-20 rounded-full bg-emerald-500 border-[6px] border-white dark:border-surface-dark shadow-xl flex items-center justify-center animate-bounce-short">
                <span className="material-symbols-outlined text-white text-[44px] font-bold">check</span>
              </div>
            </div>
            <div className="px-6 pt-4 pb-8 text-center flex flex-col items-center gap-3">
              <h2 className="text-[1.75rem] font-bold text-slate-900 dark:text-white leading-tight">{t('label_success')}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed px-2">{t('label_success_desc')}</p>
              <div className="w-full flex flex-col gap-3 mt-4">
                {/* 查看素材按钮 */}
                <button 
                  onClick={() => { onStartGeneration(); setShowSuccessModal(false); }} 
                  className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[22px]">photo_library</span>{t('label_view_assets')}
                </button>
                
                {/* 继续生成按钮 - 重新添加的功能 */}
                <button 
                  onClick={handleCloseModal} 
                  className="w-full h-14 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-colors"
                >
                  <span className="material-symbols-outlined text-[22px]">add_photo_alternate</span>{t('btn_continue_gen')}
                </button>
              </div>
            </div>
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
