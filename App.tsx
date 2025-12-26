
import React, { useState, useEffect } from 'react';
import { Screen, Tab, Template, Asset } from './types';
import { MOCK_ASSETS, TRANSLATIONS } from './constants';
import SplashScreen from './screens/SplashScreen';
import LibraryScreen from './screens/LibraryScreen';
import UploadScreen from './screens/UploadScreen';
import AssetsScreen from './screens/AssetsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProScreen from './screens/ProScreen';
import LanguageScreen from './screens/LanguageScreen';
import ResultDetailScreen from './screens/ResultDetailScreen';
import SearchGroundingScreen from './screens/SearchGroundingScreen';
import SimpleInfoScreen from './screens/SimpleInfoScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Splash);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Library);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('zh-CN');
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [userAvatar, setUserAvatar] = useState('https://picsum.photos/seed/user/300/300');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const t = (key: string) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['zh-CN'][key] || key;
  };

  const navigate = (screen: Screen, data?: any) => {
    if (screen === Screen.Upload && data) setSelectedTemplate(data);
    if (screen === Screen.ResultDetail && data) setSelectedAssetId(data.id);
    setCurrentScreen(screen);
  };

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === Tab.Library) setCurrentScreen(Screen.Library);
    if (tab === Tab.Assets) setCurrentScreen(Screen.Assets);
    if (tab === Tab.Settings) setCurrentScreen(Screen.Settings);
  };

  const toggleFavorite = (id: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, isFavorited: !a.isFavorited } : a));
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const currentAsset = assets.find(a => a.id === selectedAssetId) || null;

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Splash:
        return <SplashScreen onComplete={() => setCurrentScreen(Screen.Library)} />;
      case Screen.Library:
        return <LibraryScreen language={language} t={t} activeTab={activeTab} switchTab={switchTab} onSelectTemplate={(t) => navigate(Screen.Upload, t)} />;
      case Screen.Upload:
        return <UploadScreen language={language} t={t} template={selectedTemplate} onBack={() => setCurrentScreen(Screen.Library)} onStartGeneration={() => switchTab(Tab.Assets)} />;
      case Screen.Assets:
        return <AssetsScreen language={language} t={t} assets={assets} activeTab={activeTab} switchTab={switchTab} onSelectAsset={(a) => navigate(Screen.ResultDetail, a)} onDeleteAsset={deleteAsset} />;
      case Screen.Settings:
        return (
          <SettingsScreen 
            language={language}
            t={t}
            activeTab={activeTab} 
            switchTab={switchTab} 
            onNavigate={navigate} 
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
            isDarkMode={isDarkMode} 
            avatarUrl={userAvatar}
          />
        );
      case Screen.Profile:
        return (
          <ProfileScreen 
            language={language}
            t={t}
            onBack={() => setCurrentScreen(Screen.Settings)} 
            activeTab={activeTab} 
            switchTab={switchTab} 
            currentAvatar={userAvatar}
            onSaveAvatar={setUserAvatar}
          />
        );
      case Screen.Pro:
        return <ProScreen language={language} t={t} onBack={() => setCurrentScreen(Screen.Settings)} avatarUrl={userAvatar} />;
      case Screen.Language:
        return <LanguageScreen language={language} setLanguage={setLanguage} onBack={() => setCurrentScreen(Screen.Settings)} />;
      case Screen.ResultDetail:
        return <ResultDetailScreen language={language} t={t} asset={currentAsset} onToggleFavorite={toggleFavorite} onBack={() => setCurrentScreen(Screen.Assets)} activeTab={activeTab} switchTab={switchTab} />;
      case Screen.PrivacyPolicy:
        return <SearchGroundingScreen type="google" onBack={() => setCurrentScreen(Screen.Settings)} />;
      case Screen.UserAgreement:
        return <SearchGroundingScreen type="youtube" onBack={() => setCurrentScreen(Screen.Settings)} />;
      case Screen.ContactUs:
        return <SimpleInfoScreen type="contact" title={t('label_contact')} onBack={() => setCurrentScreen(Screen.Settings)} t={t} />;
      case Screen.AboutUs:
        return <SimpleInfoScreen type="about" title={t('label_about')} onBack={() => setCurrentScreen(Screen.Settings)} t={t} />;
      default:
        return <LibraryScreen language={language} t={t} activeTab={activeTab} switchTab={switchTab} onSelectTemplate={(t) => navigate(Screen.Upload, t)} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative bg-background-light dark:bg-background-dark overflow-hidden font-display">
      {renderScreen()}
    </div>
  );
};

export default App;
