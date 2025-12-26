
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface SearchGroundingScreenProps {
  type: 'google' | 'youtube';
  onBack: () => void;
}

const SearchGroundingScreen: React.FC<SearchGroundingScreenProps> = ({ type, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string>('');
  const [sources, setSources] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const query = type === 'google' 
          ? "Search for and summarize the core principles of a standard Privacy Policy for an AI avatar application, focusing on biometric data protection and user rights."
          : "Search for and summarize the essential components of a User Agreement for content creators on platforms like YouTube, specifically regarding AI-generated media.";
        
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: query,
          config: {
            tools: [{ googleSearch: {} }],
          },
        });

        setContent(response.text || '无法加载内容，请稍后再试。');
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        setSources(chunks);
      } catch (error) {
        console.error("Grounding error:", error);
        setContent("获取信息时出错。请检查您的网络连接或稍后再试。");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const isGoogle = type === 'google';

  return (
    <div className={`h-full flex flex-col ${isGoogle ? 'bg-[#f8f9fa]' : 'bg-[#0f0f0f]'}`}>
      {/* 顶部导航 */}
      <nav className={`sticky top-0 z-50 px-4 h-14 flex items-center justify-between shrink-0 shadow-sm ${isGoogle ? 'bg-white border-b border-slate-200' : 'bg-[#0f0f0f] border-b border-white/10'}`}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className={`flex items-center justify-center size-9 rounded-full active:bg-slate-100 dark:active:bg-white/10 ${isGoogle ? 'text-slate-600' : 'text-white'}`}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            {isGoogle ? (
              <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" className="h-5" alt="Google" />
            ) : (
              <div className="flex items-center gap-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" className="h-4" alt="YouTube" />
              </div>
            )}
            <span className={`text-xs font-bold tracking-tight ${isGoogle ? 'text-slate-500' : 'text-white/70'}`}>
              {isGoogle ? '隐私中心' : '服务协议'}
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full p-10 text-center">
            <div className={`size-14 rounded-full border-4 border-t-transparent animate-spin mb-6 ${isGoogle ? 'border-primary' : 'border-red-600'}`}></div>
            <p className={`text-sm font-bold ${isGoogle ? 'text-slate-500' : 'text-white/60'}`}>
              正在通过 {isGoogle ? 'Google' : 'YouTube'} 智能检索最新协议...
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto w-full p-5">
            {/* 搜索样式卡片 */}
            <div className={`mb-8 p-6 rounded-3xl shadow-sm ${isGoogle ? 'bg-white border border-slate-100' : 'bg-[#212121] border border-white/5 text-white'}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`material-symbols-outlined text-sm ${isGoogle ? 'text-primary' : 'text-red-500'} filled`}>verified_user</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isGoogle ? 'text-slate-400' : 'text-white/40'}`}>
                  {isGoogle ? '隐私政策摘要' : 'YouTube 服务条款指南'}
                </span>
              </div>
              <h1 className="text-xl font-extrabold leading-tight mb-4">
                {isGoogle ? '您的数据，由您掌控' : '平台使用规则与版权声明'}
              </h1>
              <div className={`h-1 w-20 rounded-full ${isGoogle ? 'bg-primary' : 'bg-red-600'}`}></div>
            </div>

            {/* 内容摘要 */}
            <div className={`prose max-w-none text-sm leading-relaxed mb-10 ${isGoogle ? 'text-slate-700' : 'text-white/80'}`}>
              <div className="whitespace-pre-wrap font-medium">{content}</div>
            </div>

            {/* 引用来源 */}
            {sources.length > 0 && (
              <div className={`mt-8 pt-8 border-t ${isGoogle ? 'border-slate-200' : 'border-white/10'}`}>
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${isGoogle ? 'text-slate-400' : 'text-white/30'}`}>
                  <span className="material-symbols-outlined text-sm">link</span>
                  参考来源与链接
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {sources.map((chunk, i) => {
                    const uri = chunk.web?.uri || '#';
                    const title = chunk.web?.title || '访问官方协议页面';
                    return (
                      <a 
                        key={i} 
                        href={uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${isGoogle ? 'bg-white border-slate-100 hover:border-primary/40 shadow-sm' : 'bg-[#212121] border-white/5 hover:border-red-600/40 text-white'}`}
                      >
                        <div className="flex-1 overflow-hidden pr-4">
                          <p className="text-[13px] font-bold truncate">{title}</p>
                          <p className="text-[10px] opacity-50 truncate mt-0.5">{uri}</p>
                        </div>
                        <span className="material-symbols-outlined text-sm opacity-60">open_in_new</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="py-12 text-center opacity-30">
              <span className="material-symbols-outlined text-4xl mb-2">policy</span>
              <p className="text-[10px] font-bold uppercase tracking-tighter">End of Document</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchGroundingScreen;
