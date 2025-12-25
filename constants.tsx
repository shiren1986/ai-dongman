
import { Template, Asset } from './types';

export const TEMPLATES: Template[] = [
  {
    id: '1',
    name: '樱花之梦',
    tag: '#粉色',
    imageUrl: 'https://picsum.photos/seed/cherry/400/533',
    isDynamic: true
  },
  {
    id: '2',
    name: '霓虹都市',
    tag: '#赛博朋克',
    imageUrl: 'https://picsum.photos/seed/neon/400/533',
    isDynamic: true
  },
  {
    id: '3',
    name: '夏日微风',
    tag: '#清新',
    imageUrl: 'https://picsum.photos/seed/summer/400/533',
    isDynamic: true
  },
  {
    id: '4',
    name: '惬意雨天',
    tag: '#治愈',
    imageUrl: 'https://picsum.photos/seed/rain/400/533',
    isDynamic: true
  },
  {
    id: '5',
    name: '校园时光',
    tag: '#日常',
    imageUrl: 'https://picsum.photos/seed/school/400/533',
    isDynamic: false
  },
  {
    id: '6',
    name: '星之魔法',
    tag: '#梦幻',
    imageUrl: 'https://picsum.photos/seed/magic/400/533',
    isDynamic: true
  }
];

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'a1',
    name: '未来少女_V2',
    timestamp: '刚刚',
    imageUrl: 'https://picsum.photos/seed/cyber/400/533',
    status: 'completed',
    isDynamic: true,
    isFavorited: false
  },
  {
    id: 'a2',
    name: 'IMG_2931.jpg',
    timestamp: '2小时前',
    imageUrl: 'https://picsum.photos/seed/photo/400/533',
    status: 'original',
    isFavorited: true
  },
  {
    id: 'a3',
    name: '梦境_Final',
    timestamp: '生成中...',
    imageUrl: 'https://picsum.photos/seed/dream/400/533',
    status: 'processing',
    isFavorited: false
  },
  {
    id: 'a4',
    name: '赛博朋克_01',
    timestamp: '生成失败',
    imageUrl: 'https://picsum.photos/seed/cyber2/400/533',
    status: 'failed',
    isFavorited: false
  }
];

export const LANGUAGES = [
  { label: '简体中文', sub: 'Simplified Chinese', value: 'zh-CN' },
  { label: 'English', sub: 'English', value: 'en-US' },
  { label: '繁体中文', sub: 'Traditional Chinese', value: 'zh-TW' },
  { label: '日本語', sub: 'Japanese', value: 'ja-JP' },
  { label: '한국어', sub: 'Korean', value: 'ko-KR' },
  { label: 'Français', sub: 'French', value: 'fr-FR' },
  { label: 'Deutsch', sub: 'German', value: 'de-DE' },
  { label: 'Español', sub: 'Spanish', value: 'es-ES' }
];
