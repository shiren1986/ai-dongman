
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
    if (!uploadedImage) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
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

  const suggestionPhotos = [
    { 
      label: t('label_suggestion_1'), 
      status: 'check', 
      color: 'green',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop' 
    },
    { 
      label: t('label_suggestion_2'), 
      status: 'close', 
      color: 'red',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&h=300&auto=format&fit=crop&bri=-60' 
    },
    { 
      label: t('label_suggestion_3'), 
      status: 'close', 
      color: 'red',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&auto=format&fit=crop&blur=50' 
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* 顶部导航 - 增大比例 */}
      <nav className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md shrink-0">
        <div className="flex items-center justify-between px-6 h-20">
          <button 
            onClick={onBack}
            className="flex items-center justify-center size-14 rounded-full active:bg-slate-100 dark:active:bg-slate-800 transition-all text-slate-900 dark:text-white"
          >
            <span className="material-symbols-outlined text-[36px]">arrow_back_ios_new</span>
          </button>
          <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">{t('header_upload')}</h1>
          <div className="size-14"></div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col px-10 pt-6 pb-20 overflow-y-auto no-scrollbar">
        {/* 顶部提示 - 增大字号 */}
        <div className="mb-8 text-center px-4">
          <p className="text-slate-500 dark:text-slate-400 text-xl font-bold leading-relaxed">
            {t('label_upload_tip')}
          </p>
        </div>

        {/* 上传区域 - 适配 750px 的 3:4 比例 */}
        <div className="mb-12 w-full relative">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden" 
          />
          <div 
            onClick={triggerUpload}
            className="relative w-full aspect-[3/4] rounded-[4rem] border-4 border-dashed border-primary/20 dark:border-primary/40 bg-white dark:bg-surface-dark flex flex-col items-center justify-center p-6 transition-all duration-300 hover:border-primary shadow-soft overflow-hidden cursor-pointer active:scale-[0.99]"
          >
            {uploadedImage ? (
              <div className="absolute inset-0 w-full h-full animate-in fade-in duration-700">
                <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
                  <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl px-10 py-5 rounded-full border border-slate-200 dark:border-slate-700 shadow-2xl flex items-center gap-4 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-primary text-[32px] font-bold">cached</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100">{t('btn_re_upload')}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8">
                <div className="relative size-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[64px] filled">image</span>
                  <div className="absolute -top-2 -right-2 bg-primary rounded-full p-2 border-4 border-white dark:border-surface-dark">
                     <span className="material-symbols-outlined text-white text-[28px] font-black">add</span>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <p className="text-slate-900 dark:text-white font-black text-3xl">{t('label_uploaded')}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-lg font-bold">{t('label_file_type')}</p>
                </div>
              </div>
            )}

            {/* 已选模板缩略图 - 放大显示 */}
            {template && (
              <div className="absolute top-8 left-8 z-20">
                <div className="size-24 rounded-3xl overflow-hidden bg-white dark:bg-slate-800 p-1.5 border border-slate-100 dark:border-slate-700 shadow-2xl backdrop-blur-md ring-8 ring-white/10">
                  <img src={template.imageUrl} alt="Template" className="w-full h-full object-cover rounded-2xl" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 照片建议 - 优化网格 */}
        <div className="w-full space-y-6 mb-12">
          <h3 className="text-slate-900 dark:text-white text-2xl font-black px-2">{t('label_suggestions')}</h3>
          <div className="grid grid-cols-3 gap-6">
            {suggestionPhotos.map((item, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200/50 dark:ring-white/10">
                  <img src={item.url} className="w-full h-full object-cover" alt={item.label} />
                  <div className={`absolute bottom-3 right-3 ${item.color === 'green' ? 'bg-emerald-500' : 'bg-rose-500'} text-white rounded-full p-1.5 shadow-lg border-2 border-white`}>
                    <span className="material-symbols-outlined text-[16px] font-black block leading-none">{item.status}</span>
                  </div>
                </div>
                <p className="text-center text-base font-black text-slate-500 dark:text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 底部按钮 - 增大比例 */}
        <div className="mt-auto pt-8 flex flex-col gap-6 w-full">
          <div className="flex items-center justify-center gap-3 py-2">
            <span className="material-symbols-outlined text-[28px] text-amber-400 filled">monetization_on</span>
            <span className="text-xl font-black text-slate-700 dark:text-slate-200">{t('label_cost')}：5</span>
            <span className="material-symbols-outlined text-[28px] text-amber-400 filled">monetization_on</span>
          </div>
          <button 
            disabled={isGenerating || !uploadedImage}
            onClick={handleStart}
            className={`w-full flex items-center justify-center gap-4 h-20 rounded-[2.5rem] bg-primary text-white font-black text-2xl active:scale-[0.98] transition-all shadow-glow ${isGenerating || !uploadedImage ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:brightness-110'}`}
          >
            {isGenerating ? (
              <span className="material-symbols-outlined text-[36px] animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined text-[36px] filled">auto_awesome</span>
            )}
            <span>{isGenerating ? t('btn_saving') : t('btn_generate')}</span>
          </button>
        </div>
      </main>

      {/* 成功弹窗 - 完全重构为大尺寸 */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={handleCloseModal}></div>
          
          <div className="relative w-[640px] bg-white dark:bg-slate-950 rounded-[4.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col items-center animate-in zoom-in duration-300">
            <button onClick={handleCloseModal} className="absolute top-8 right-8 z-30 size-14 flex items-center justify-center bg-black/30 backdrop-blur-2xl rounded-full text-white active:scale-90 transition-all">
              <span className="material-symbols-outlined text-[32px] font-bold">close</span>
            </button>
            
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <img src={template?.imageUrl || 'https://picsum.photos/seed/success/800/1000'} alt="Generated" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent"></div>
            </div>
            
            <div className="relative -mt-16 z-20">
              <div className="size-32 rounded-full bg-emerald-500 border-[10px] border-white dark:border-slate-950 shadow-2xl flex items-center justify-center animate-bounce-short">
                <span className="material-symbols-outlined text-white text-[72px] font-black">check</span>
              </div>
            </div>
            
            <div className="px-10 pt-6 pb-12 text-center flex flex-col items-center gap-6 w-full">
              <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-tight">{t('label_success')}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xl font-bold leading-relaxed px-4">{t('label_success_desc')}</p>
              
              <div className="w-full flex flex-col gap-5 mt-4">
                <button 
                  onClick={() => { onStartGeneration(); setShowSuccessModal(false); }} 
                  className="w-full h-20 bg-primary text-white rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 shadow-glow active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[36px] filled">photo_library</span>
                  {t('label_view_assets')}
                </button>
                
                <button 
                  onClick={handleCloseModal} 
                  className="w-full h-20 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[36px]">add_photo_alternate</span>
                  {t('btn_continue_gen')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-short {
          animation: bounceShort 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default UploadScreen;
