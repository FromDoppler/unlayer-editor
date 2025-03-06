import './main.css';
import { getConfiguration } from './configuration';
import { setLocale } from './localization';
import {
  setLinkTypes,
  registerPropertyEditor,
  registerReactTool,
} from './utils/unlayer';
import { urlPropertyEditorDefinition } from './properties/url';
import { getSocialShareToolDefinition } from './tools/social_share_tool';
import { getPayuButtonToolDefinition } from './tools/payu_button_tool';
import { getPromoCodeToolDefinition } from './tools/promo_code';
import { promoCodesPropertyEditorDefinition } from './properties/promo_codes';
import { getProductToolDefinition } from './tools/product';
import { productGalleryPropertyEditorDefinition } from './properties/product_gallery';
import { productArrangementPropertyEditorDefinition } from './properties/product_arrangement';
import { getDynamicToolDefinition } from './tools/dynamic_tool';
import { DYNAMIC_TOOL_TYPE } from './constants';
import { getRssHeaderToolDefinition } from './tools/rss';
import { getQrToolDefinition } from './tools/qr';
import { qrPropertyEditorDefinition } from './properties/qr';
import { dynamicPromoCodePropertyEditorDefinition } from './properties/dynamic_promo_code';
import { getSmartFormToolDefinition } from './tools/smartforms';
import { subscriptionListPropertyEditorDefinition } from './properties/subscription_list';
import { getWheelFortuneToolDefinition } from './tools/wheel';
import { wheelListPropertyEditorDefinition } from './properties/wheel_list';

const {
  locale,
  previewMode,
  abandonedCartCampaign,
  visitedProductsCampaign,
  recommendedProductsEnabled,
  productCompletedEnabled,
  confirmationOrderCampaign,
  pendingOrderCampaign,
  bestSellingEnabled,
  crossSellingEnabled,
  newProductsEnabled,
  rssCampaign,
  socialShare,
  payButton,
  promoCode,
  product,
  qrCode,
  smartForm,
  roulette,
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

// Register Properties

registerPropertyEditor(urlPropertyEditorDefinition);
registerPropertyEditor(promoCodesPropertyEditorDefinition);
registerPropertyEditor(productGalleryPropertyEditorDefinition);
registerPropertyEditor(productArrangementPropertyEditorDefinition);
registerPropertyEditor(qrPropertyEditorDefinition);
registerPropertyEditor(dynamicPromoCodePropertyEditorDefinition);
registerPropertyEditor(subscriptionListPropertyEditorDefinition);
registerPropertyEditor(wheelListPropertyEditorDefinition);

// Register Tools

if (roulette) {
  registerPropertyEditor(wheelListPropertyEditorDefinition);
  registerReactTool(getWheelFortuneToolDefinition());
}

if (smartForm) {
  registerReactTool(getSmartFormToolDefinition());
}
if (qrCode) {
  registerReactTool(getQrToolDefinition());
}

if (product) {
  registerReactTool(getProductToolDefinition());
}

if (promoCode) {
  registerReactTool(getPromoCodeToolDefinition());
}

if (socialShare) {
  registerReactTool(getSocialShareToolDefinition());
}

if (payButton) {
  registerReactTool(getPayuButtonToolDefinition());
}

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
if (productCompletedEnabled) {
  registerReactTool(
    getDynamicToolDefinition(<DYNAMIC_TOOL_TYPE>'products_completed'),
  );
}

if (recommendedProductsEnabled) {
  registerReactTool(
    getDynamicToolDefinition(<DYNAMIC_TOOL_TYPE>'recommended_product'),
  );
}

if (confirmationOrderCampaign || pendingOrderCampaign) {
  registerReactTool(
    getDynamicToolDefinition(<DYNAMIC_TOOL_TYPE>'order_details'),
  );
}

if (bestSellingEnabled || crossSellingEnabled || newProductsEnabled) {
  registerReactTool(getDynamicToolDefinition(<DYNAMIC_TOOL_TYPE>'recommended'));
}

if (rssCampaign) {
  registerReactTool(getRssHeaderToolDefinition());
}

if (previewMode) {
  registerReactTool(getWheelFortuneToolDefinition());
  /* place to register tool on preview mode */
}
