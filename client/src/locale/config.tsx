//Localization
import  i18n  from "i18next";
import { initReactI18next } from "react-i18next";

import enJSON from './translations/en.json';
import bgJSON from './translations/bg.json';

//TODO: Save language to local storage

i18n.use(initReactI18next).init(
    {
        resources: {
            en: {translation: enJSON},
            bg: {translation: bgJSON}
        },
        lng: "en",
        fallbackLng: "en"
    }
)

export default i18n;