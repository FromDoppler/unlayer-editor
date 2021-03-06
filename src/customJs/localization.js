import { createIntl, createIntlCache } from '@formatjs/intl';
import { messages_en } from '../i18n/en';
import { messages_es } from '../i18n/es';

export let intl;

const cache = createIntlCache();

const messages = {
  'es-ES': messages_es,
  'en-US': messages_en,
};

const defaultLanguage = 'es-ES';

const sanitizeLanguageOrDefault = (lang) =>
  Object.keys(messages).includes(lang) ? lang : defaultLanguage;

export const setLocale = (locale) => {
  window.unlayer.setLocale(locale);
  window.unlayer.setTranslations(messages);

  intl = createIntl(
    {
      locale,
      messages: messages[sanitizeLanguageOrDefault(locale)],
    },
    cache,
  );
};
