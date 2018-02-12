import I18n from 'react-native-i18n';
import { getLanguages } from 'react-native-i18n';

import en from './locales/en';
import th from './locales/th';


// I18n.fallbacks = true;
I18n.locale = 'th';
I18n.translations = {
  en,
  th
};
getLanguages().then(languages => {
    console.log(languages); // ['en-US', 'en']
    console.log(I18n.t('DayOff')); // ['en-US', 'en']
  });

export default I18n;