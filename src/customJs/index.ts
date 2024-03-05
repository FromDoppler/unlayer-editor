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
import { productArrangementPropertyEditorDefinition } from './properties/product_arrangement';
import { getDynamicToolDefinition } from './tools/dynamic_tool';
import { DYNAMIC_TOOL_TYPE } from './constants';

const {
  locale,
  previewMode,
  abandonedCartCampaign,
  visitedProductsCampaign,
  confirmationOrderCampaign,
  pendingOrderCampaign,
  bestSellingEnabled,
} = getConfiguration();

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
registerPropertyEditor(productArrangementPropertyEditorDefinition);

registerReactTool(getSocialShareToolDefinition());
registerReactTool(getPayuButtonToolDefinition());
registerReactTool(getPromoCodeToolDefinition());
registerReactTool(getProductToolDefinition());

if (abandonedCartCampaign) {
  registerReactTool(
    getDynamicToolDefinition(<DYNAMIC_TOOL_TYPE>'abandoned_cart'),
  );
}

if (visitedProductsCampaign) {
  registerReactTool(
    getDynamicToolDefinition(<DYNAMIC_TOOL_TYPE>'product_retargeting'),
  );
}

if (confirmationOrderCampaign || pendingOrderCampaign) {
  registerReactTool(
    getDynamicToolDefinition(<DYNAMIC_TOOL_TYPE>'order_details'),
  );
}

if (bestSellingEnabled) {
  registerReactTool(
    getDynamicToolDefinition(<DYNAMIC_TOOL_TYPE>'best_selling'),
  );
}

if (previewMode) {
  /* place to register tool on preview mode */
}
