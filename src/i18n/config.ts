import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Initialize i18next with configuration
i18n
  // Load translations using HTTP backend
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Supported languages
    supportedLngs: ['en', 'es'],
    // Fallback language
    fallbackLng: 'en',
    // Debug mode (enable in development)
    debug: import.meta.env.DEV,

    // Detection order and caches
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    // Namespaces for organizing translations
    ns: ['common', 'navigation', 'sections', 'content'],
    defaultNS: 'common',

    // Backend configuration for loading translation files
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Interpolation configuration
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // React-specific options
    react: {
      useSuspense: true, // Enable suspense for loading states
    },
  });

export default i18n;
