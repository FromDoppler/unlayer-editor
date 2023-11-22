import './main.css';
import { getConfiguration } from './configuration';
import { setLocale } from './localization';
import {
  setLinkTypes,
  registerPropertyEditor,
  registerReactTool,
} from './utils/unlayer';
import { urlPropertyEditorDefinition } from './properties/url';
import { socialNetworksPropertyEditorDefinition } from './properties/social_networks';
import { getSocialShareToolDefinition } from './tools/social_share_tool';
import { getPayuButtonToolDefinition } from './tools/payu_button_tool';
import { getPromoCodeToolDefinition } from './tools/promo_code';
import { promoCodesPropertyEditorDefinition } from './properties/promo_codes';
import { getProductToolDefinition } from './tools/product';
import { productGalleryPropertyEditorDefinition } from './properties/product_gallery';

const { locale, previewMode } = getConfiguration();

const unlayerLocales = {
  es: 'es-ES',
  en: 'en-US',
} as const;
const unlayerLocale = unlayerLocales[locale] ?? unlayerLocales['es'];

setLocale(unlayerLocale);

setLinkTypes?.([
  {
    name: 'sms',
    enabled: false,
  },
]);

// Register Properties and tools

registerPropertyEditor(urlPropertyEditorDefinition);
registerPropertyEditor(socialNetworksPropertyEditorDefinition);
registerPropertyEditor(promoCodesPropertyEditorDefinition);
registerPropertyEditor(productGalleryPropertyEditorDefinition);

registerReactTool(getSocialShareToolDefinition());
registerReactTool(getPayuButtonToolDefinition());
registerReactTool(getPromoCodeToolDefinition());
registerReactTool(getProductToolDefinition());

if (previewMode) {
  /* place to register tool on preview mode */
}
