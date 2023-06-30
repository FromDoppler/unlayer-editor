import { getSocialShareToolConfig } from './socialShareTool';
import { setLocale } from './localization';
import { getPayuButtonToolConfig } from './payuButtonTool';
import { getLinkPropertyConfiguration } from './commonProperties/linkProperty';
import { getEnableSocialPropertyConfig } from './socialShareTool/enableSocialProperty';
import './main.css';
import { getConfiguration } from './configuration';

const unlayer = window.unlayer;

const { locale } = getConfiguration();

const unlayerLocales = {
  es: 'es-ES',
  en: 'en-US',
};
const unlayerLocale = unlayerLocales[locale] ?? unlayerLocales['es'];

setLocale(unlayerLocale);

unlayer.setLinkTypes?.([
  {
    name: 'sms',
    enabled: false,
  },
]);

// Register Properties and tool Social Share Tool
unlayer.registerPropertyEditor(getLinkPropertyConfiguration());
unlayer.registerPropertyEditor(getEnableSocialPropertyConfig());
unlayer.registerTool(getSocialShareToolConfig());
unlayer.registerTool(getPayuButtonToolConfig());
