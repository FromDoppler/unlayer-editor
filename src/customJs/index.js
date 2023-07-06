import { getSocialShareToolDefinition } from './tools/getSocialShareToolDefinition';
import { setLocale } from './localization';
import { getPayuButtonToolDefinition } from './tools/getPayuButtonToolDefinition';
import { UrlWidget } from './components/UrlWidget';
import { SocialNetworksWidget } from './components/SocialNetworksWidget';
import './main.css';
import { getConfiguration } from './configuration';

const unlayer = window.unlayer;

const { locale, promotionCodeEnabled } = getConfiguration();

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
unlayer.registerPropertyEditor({
  name: 'url',
  Widget: UrlWidget,
});
unlayer.registerPropertyEditor({
  name: 'social_networks',
  Widget: SocialNetworksWidget,
});
unlayer.registerTool(getSocialShareToolDefinition());
unlayer.registerTool(getPayuButtonToolDefinition());

if (promotionCodeEnabled) {
  console.log('promotionCodeEnabled, it will show the Promo Code Tool soon...');
  // TODO: do something like this
  // unlayer.registerTool(getPromoCodeToolConfig());
  // For Promo Code Tool, promotionCodeEnabled is enough to decide to show or
  // hide the tool. Other tools depend on the campaign.
}
