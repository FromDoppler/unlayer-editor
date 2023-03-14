import { createIntl, createIntlCache } from '@formatjs/intl';
import { messages_en } from '../i18n/en';
import { messages_es } from '../i18n/es';

export let intl;

const cache = createIntlCache();

const allMessages = {
  'es-ES': messages_es,
  'en-US': messages_en,
};

const defaultLanguage = 'es-ES';

const sanitizeLanguageOrDefault = (lang) =>
  Object.keys(allMessages).includes(lang) ? lang : defaultLanguage;

export const setLocale = (locale) => {
  window.unlayer.setLocale?.(locale);
  window.unlayer.setTranslations?.(allMessages);

  const messages = allMessages[sanitizeLanguageOrDefault(locale)];
  intl = createIntl(
    {
      locale,
      messages,
    },
    cache,
  );
};
