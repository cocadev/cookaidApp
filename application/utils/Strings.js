import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {getTargetLanguage, translateObject, translatePromt} from "./Translating";
import en from "../languages/en.json";
import * as languages from "../languages/";
const Strings = en;

i18n.fallbacks = true;

export async function loadLang() {
  // const result = await translateObject(Strings);
  i18n.locale = getTargetLanguage();
  console.log('targetLanguage', getTargetLanguage());
  const translations = {
    en: Strings,
    ...languages.default,
  };
  // Object.assign(translations, {[getTargetLanguage()]: result});
  i18n.translations = translations;
  return i18n;
}

export const StringI18 = {
  t: (key, params = {}) => i18n.t(key, Object.assign(params, {locale: getTargetLanguage(), defaultValue: Strings[key] || key})),
  translateIfNotExist: (key, params = {}) => {
    const targetLanguage = getTargetLanguage();
    if (targetLanguage === 'en') {
      return key;
    }
    if (i18n.translations[targetLanguage] && !i18n.translations[targetLanguage][key]) {
      let value = null;
      translatePromt(key, targetLanguage)
        .then(res => {
          i18n.translations[targetLanguage][key] = res;
          value = res;
        });
      return value;
    }
    return i18n.t(key, Object.assign(params, {locale: getTargetLanguage(), defaultValue: Strings[key] || key}));
  }
};

export default Strings;
