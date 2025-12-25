
import React, { useState, useEffect } from 'react';
import { Screen, Tab, Template, Asset } from './types';
import { MOCK_ASSETS } from './constants';
import SplashScreen from './screens/SplashScreen';
import LibraryScreen from './screens/LibraryScreen';
import UploadScreen from './screens/UploadScreen';
import AssetsScreen from './screens/AssetsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProScreen from './screens/ProScreen';
import LanguageScreen from './screens/LanguageScreen';
import ResultDetailScreen from './screens/ResultDetailScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Splash);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Library);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [userAvatar, setUserAvatar] = useState('https://picsum.photos/seed/user/300/300');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
        return <LibraryScreen activeTab={activeTab} switchTab={switchTab} onSelectTemplate={(t) => navigate(Screen.Upload, t)} />;
      case Screen.Upload:
        return <UploadScreen template={selectedTemplate} onBack={() => setCurrentScreen(Screen.Library)} onStartGeneration={() => switchTab(Tab.Assets)} />;
      case Screen.Assets:
        return <AssetsScreen assets={assets} activeTab={activeTab} switchTab={switchTab} onSelectAsset={(a) => navigate(Screen.ResultDetail, a)} onDeleteAsset={deleteAsset} />;
      case Screen.Settings:
        return (
          <SettingsScreen 
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
            onBack={() => setCurrentScreen(Screen.Settings)} 
            activeTab={activeTab} 
            switchTab={switchTab} 
            currentAvatar={userAvatar}
            onSaveAvatar={setUserAvatar}
          />
        );
      case Screen.Pro:
        return <ProScreen onBack={() => setCurrentScreen(Screen.Settings)} avatarUrl={userAvatar} />;
      case Screen.Language:
        return <LanguageScreen onBack={() => setCurrentScreen(Screen.Settings)} />;
      case Screen.ResultDetail:
        return <ResultDetailScreen asset={currentAsset} onToggleFavorite={toggleFavorite} onBack={() => setCurrentScreen(Screen.Assets)} activeTab={activeTab} switchTab={switchTab} />;
      default:
        return <LibraryScreen activeTab={activeTab} switchTab={switchTab} onSelectTemplate={(t) => navigate(Screen.Upload, t)} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative bg-background-light dark:bg-background-dark overflow-hidden font-display">
      {renderScreen()}
    </div>
  );
};

export default App;
