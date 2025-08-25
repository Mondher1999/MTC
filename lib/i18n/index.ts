// 1. Install dependencies first:
// npm install react-i18next i18next i18next-browser-languagedetector i18next-resources-to-backend

// 2. Create: lib/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

// Dynamic import of translation files
i18n
  .use(resourcesToBackend((language: string, namespace: string) => 
    import(`./locales/${language}/${namespace}.json`)
  ))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    // Configure namespaces
    ns: ['common', 'auth', 'dashboard'],
    defaultNS: 'common',
  });

// Location-based language detection
export const detectLanguageByLocation = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const country = data.country_code?.toLowerCase();
    
    if (country === 'cn') return 'zh';
    if (country === 'tn') return 'fr';
    return 'en';
  } catch (error) {
    console.error('Error detecting location:', error);
    return 'en';
  }
};

// Set language based on location when the app starts
if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('i18nextLng');
  if (!savedLanguage) {
    detectLanguageByLocation().then((language) => {
      i18n.changeLanguage(language);
    });
  }
}

export default i18n;