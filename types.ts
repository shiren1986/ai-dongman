
export enum Screen {
  Splash = 'splash',
  Library = 'library',
  Upload = 'upload',
  Assets = 'assets',
  Settings = 'settings',
  Profile = 'profile',
  Pro = 'pro',
  Language = 'language',
  ResultDetail = 'result_detail'
}

export enum Tab {
  Library = 'library',
  Assets = 'assets',
  Settings = 'settings'
}

export interface Template {
  id: string;
  name: string;
  tag: string;
  imageUrl: string;
  isDynamic: boolean;
}

export interface Asset {
  id: string;
  name: string;
  timestamp: string;
  imageUrl: string;
  status: 'completed' | 'processing' | 'failed' | 'original' | 'queued';
  isDynamic?: boolean;
  isFavorited?: boolean;
}
