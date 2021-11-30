import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import getUserLocale from 'get-user-locale';
import en from './en.json';
import fr from './fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: getUserLocale(),
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
      nsMode: 'default',
    },
  });

export default i18n;
