import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json'
import zhTW from './locales/zh-TW/translation.json'

const resources = {
    en: {
        translation: en
    },
    'zh-TW': {
        translation: zhTW
    }
}

const savedLanguage = localStorage.getItem('language') || 'en';

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        caches: ['localStorage', 'cookie']
    },
    react: {
        useSuspense: false,
    },
})

export default i18n