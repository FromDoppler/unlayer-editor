import { createIntl, createIntlCache } from '@formatjs/intl';
import { messages_en } from '../i18n/en';
import { messages_es } from '../i18n/es';
import type { IntlShape } from '@formatjs/intl';
import {
  FormatXMLElementFn,
  PrimitiveType,
  Options as IntlMessageFormatOptions,
} from 'intl-messageformat';
import { ReactElement } from 'react';

export type IntlMessages = typeof messages_es;
export type IntlMessageId = keyof IntlMessages;
type AvailableLanguage = 'es-ES' | 'en-US';
type AllMessages = Record<AvailableLanguage, IntlMessages>;

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: IntlMessageId;
    }
    interface IntlConfig {
      locale: AvailableLanguage;
    }
  }
}

export let intl: IntlShape;

const cache = createIntlCache();

const allMessages: AllMessages = {
  'es-ES': messages_es,
  'en-US': messages_en,
};

const defaultLanguage: AvailableLanguage = 'es-ES';

const sanitizeLanguageOrDefault = (lang: unknown) =>
  Object.keys(allMessages).includes(`${lang}`)
    ? (lang as AvailableLanguage)
    : defaultLanguage;

export const setLocale = (locale: AvailableLanguage) => {
  (window as any).unlayer.setLocale?.(locale);
  (window as any).unlayer.setTranslations?.(allMessages);

  const messages = allMessages[sanitizeLanguageOrDefault(locale)];
  intl = createIntl(
    {
      locale,
      messages,
    },
    cache,
  );
};

export const $t = (
  id: IntlMessageId,
  values?: Record<
    string,
    | PrimitiveType
    | FormatXMLElementFn<string, string>
    | FormatXMLElementFn<string, ReactElement>
  >,
  opts?: IntlMessageFormatOptions,
  // TODO: fix type in values, casted to any for the moment
) => intl.formatMessage({ id }, values as any, opts);
