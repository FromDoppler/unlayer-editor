import './main.css';
import { getConfiguration } from './configuration';
import { setLocale } from './localization';
import { urlPropertyEditorDefinition } from './properties/url';
import { socialNetworksPropertyEditorDefinition } from './properties/social_networks';
import { getSocialShareToolDefinition } from './tools/social_share_tool';
import { getPayuButtonToolDefinition } from './tools/payu_button_tool';

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

unlayer.registerPropertyEditor(urlPropertyEditorDefinition);
unlayer.registerPropertyEditor(socialNetworksPropertyEditorDefinition);

unlayer.registerTool(getSocialShareToolDefinition());
unlayer.registerTool(getPayuButtonToolDefinition());

if (promotionCodeEnabled) {
  console.log('promotionCodeEnabled, it will show the Promo Code Tool soon...');
  // TODO: do something like this
  // unlayer.registerTool(getPromoCodeToolConfig());
  // For Promo Code Tool, promotionCodeEnabled is enough to decide to show or
  // hide the tool. Other tools depend on the campaign.
}
