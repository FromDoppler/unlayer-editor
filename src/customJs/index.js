import { getSocialShareToolConfig } from './socialShareTool';
import { setLocale } from './localization';
import { getPayuButtonToolConfig } from './payuButtonTool';

const unlayer = window.unlayer;

const { locale } = window['unlayer-extensions-configuration'];

const unlayerLocales = {
  es: 'es-ES',
  en: 'en-US',
};
const unlayerLocale = unlayerLocales[locale] ?? unlayerLocales['es'];

setLocale(unlayerLocale);

unlayer.setLinkTypes([
  {
    name: 'sms',
    enabled: false,
  },
]);

// Register Properties and tool Social Share Tool
unlayer.registerTool(getSocialShareToolConfig());
unlayer.registerTool(getPayuButtonToolConfig());
