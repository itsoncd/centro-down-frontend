import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esCommon from '@/locales/es/common.json';

export const SUPPORTED_LANGUAGES = ['es'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: SupportedLanguage = 'es';
export const LANGUAGE_STORAGE_KEY = 'app-language';

export const isSupportedLanguage = (value: unknown): value is SupportedLanguage =>
  typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);

export const getStoredLanguage = (): SupportedLanguage => {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  } catch {
    /* localStorage can be blocked (private mode / disabled storage) */
    return DEFAULT_LANGUAGE;
  }
};

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: { es: { common: esCommon } },
    lng: getStoredLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    defaultNS: 'common',
    ns: ['common'],
    load: 'languageOnly',
    initAsync: false,
    returnNull: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    debug: import.meta.env.DEV,
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: import.meta.env.DEV
      ? (lngs, ns, key) => console.warn(`[i18n] missing "${ns}:${key}" for [${lngs.join(',')}]`)
      : undefined,
  });
}

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  } catch {
    /* ignore blocked storage */
  }
});
document.documentElement.lang = i18n.language;

export const changeLanguage = (lng: SupportedLanguage) => i18n.changeLanguage(lng);

declare global {
  interface Window {
    i18n: typeof i18n;
  }
}

if (import.meta.env.DEV) window.i18n = i18n;

export default i18n;
