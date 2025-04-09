export const ASSETS_BASE_URL =
  'https://cdn.fromdoppler.com/unlayer-editor/assets';

export const HELP_BASE_URL = 'https://help.fromdoppler.com';

export const EMPTY_SELECTION = '__EMPTY__';
export type EMPTY_SELECTION = typeof EMPTY_SELECTION;

export type DYNAMIC_TOOL_TYPE =
  | 'abandoned_cart'
  | 'product_retargeting'
  | 'order_details'
  | 'recommended'
  | 'products_completed'
  | 'recommended_product';

export type PRODUCT_TOOL_TYPE = 'static' | 'dynamic';
