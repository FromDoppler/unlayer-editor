import subscribeTool from './subscribeTool';
import { getTwitterPropertyConfig } from './socialTool/TwitterProperty';
import { getLinkedInPropertyConfig } from './socialTool/LinkedInProperty';
import { getFacebookPropertyConfig } from './socialTool/FacebookProperty';
import { getSocialToolConfig } from './socialTool/SocialTool';
import { getSocialShareToolConfig } from './socialShareTool';
import { setCompanyTitle } from './sharedSingletonModule';
import { getCompanyTitleDemoConfig } from './companyTitleDemo';
import { setLocale } from './localization';

const unlayer = window.unlayer;

const { locale, companyTitle } = window['unlayer-extensions-configuration'];

const unlayerLocales = {
  es: 'es-ES',
  en: 'en-US',
};
const unlayerLocale = unlayerLocales[locale] ?? unlayerLocales['es'];

setLocale(unlayerLocale);
setCompanyTitle(companyTitle);
unlayer.registerPropertyEditor(getTwitterPropertyConfig());
unlayer.registerPropertyEditor(getLinkedInPropertyConfig());
unlayer.registerPropertyEditor(getFacebookPropertyConfig());
unlayer.registerTool(getSocialToolConfig());
unlayer.registerTool(getCompanyTitleDemoConfig());
// Register Properties and tool Social Share Tool
unlayer.registerTool(getSocialShareToolConfig());

// TODO: Verify to delete this
export default { subscribeTool };
