import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
.use(LanguageDetector)
.use(initReactI18next)
.use(Backend)
.init(
    {
        initImmediate: false,
        debug:true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: 'src/translation/{{lng}}.json'
        }
    }
)

export default i18n;