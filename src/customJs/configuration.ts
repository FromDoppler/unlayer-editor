// See https://github.com/FromDoppler/doppler-editors-webapp/blob/main/src/abstractions/domain/DopplerEditorSettings.ts
// and unlayerExtensionsConfiguration in UnlayerEditorWrapper.tsx

import { CustomField, Store, SubscriptionList, FieldOption } from './types';

type Configuration = {
  locale: 'en' | 'es';
  stores: Store[];
  customFields: CustomField[];
  subscritionsList: SubscriptionList[];
  /** True when there is at least one store with promotionCodeEnabled */
  promotionCodeEnabled: boolean;
  abandonedCartCampaign: boolean;
  visitedProductsCampaign: boolean;
  recommendedProductsEnabled: boolean;
  productCompletedEnabled: boolean;
  confirmationOrderCampaign: boolean;
  pendingOrderCampaign: boolean;
  bestSellingEnabled: boolean;
  crossSellingEnabled: boolean;
  newProductsEnabled: boolean;
  rssCampaign: boolean;
  rssShowPreview: boolean;
  previewMode: boolean;
  socialShare: boolean;
  payButton: boolean;
  promoCode: boolean;
  product: boolean;
  qrCode: boolean;
  smartForm: boolean;
  dopplerExternalUrls: DopplerExternalUrls;
};

export type DopplerExternalUrls = {
  readonly home: string;
  readonly campaigns: string;
  readonly lists: string;
  readonly controlPanel: string;
  readonly automation: string;
  readonly templates: string;
  readonly integrations: string;
};

let _configuration: Configuration | undefined;

const defaultLanguage = 'es';

/** To be used in tests or very special scenarios */
export const __invalidateConfigurationCache = () =>
  (_configuration = undefined);

export const getConfiguration = () =>
  (_configuration =
    _configuration ||
    parseConfigurationDTO((window as any)['unlayer-extensions-configuration']));

export const parseConfigurationDTO = ({
  locale = defaultLanguage,
  stores = [],
  customFields = [],
  subscritionsList = [],
  previewMode = false,
  dopplerExternalUrls = {},
  abandonedCartCampaign = false,
  visitedProductsCampaign = false,
  recommendedProductsEnabled = false,
  productCompletedEnabled = false,
  confirmationOrderCampaign = false,
  pendingOrderCampaign = false,
  bestSellingEnabled = false,
  crossSellingEnabled = false,
  newProductsEnabled = false,
  rssCampaign = false,
  rssShowPreview = false,
  socialShare = true,
  payButton = true,
  promoCode = true,
  product = true,
  qrCode = true,
  smartForm = false,
}: {
  locale?: 'es' | 'en';
  stores?: Store[];
  customFields?: CustomField[];
  subscritionsList?: SubscriptionList[];
  previewMode?: boolean;
  dopplerExternalUrls?: Record<string, string>;
  abandonedCartCampaign?: boolean;
  visitedProductsCampaign?: boolean;
  recommendedProductsEnabled?: boolean;
  productCompletedEnabled?: boolean;
  confirmationOrderCampaign?: boolean;
  pendingOrderCampaign?: boolean;
  bestSellingEnabled?: boolean;
  crossSellingEnabled?: boolean;
  newProductsEnabled?: boolean;
  rssCampaign?: boolean;
  rssShowPreview?: boolean;
  socialShare?: boolean;
  payButton?: boolean;
  promoCode?: boolean;
  product?: boolean;
  qrCode?: boolean;
  smartForm?: boolean;
} = {}) => {
  stores = stores.map(parseStoreDTO);
  customFields = customFields.map(parseCustomFieldDTO);
  subscritionsList = subscritionsList.map(parseSubscriptionListDTO);
  const promotionCodeEnabled = stores.some((x) => x.promotionCodeEnabled);
  return {
    locale,
    stores,
    customFields,
    subscritionsList,
    promotionCodeEnabled,
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
    rssShowPreview,
    previewMode,
    socialShare,
    payButton,
    promoCode,
    product,
    qrCode,
    smartForm,
    dopplerExternalUrls: parseDopplerExternalUrlsDTO(dopplerExternalUrls),
  };
};

const parseDopplerExternalUrlsDTO = (
  dopplerExternalUrls: Record<string, string>,
) => ({
  home: dopplerExternalUrls['home'] || '#',
  campaigns: dopplerExternalUrls['campaigns'] || '#',
  lists: dopplerExternalUrls['lists'] || '#',
  controlPanel: dopplerExternalUrls['controlPanel'] || '#',
  automation: dopplerExternalUrls['automation'] || '#',
  templates: dopplerExternalUrls['templates'] || '#',
  integrations: dopplerExternalUrls['integrations'] || '#',
});

const parseStoreDTO = ({
  name = '',
  promotionCodeEnabled = false,
  promotionCodeDynamicEnabled = false,
} = {}) => ({
  name,
  promotionCodeEnabled,
  promotionCodeDynamicEnabled,
});

const parseCustomFieldDTO = ({
  custom = false,
  id = '',
  label = '',
  value = '',
  type = 'text' as CustomField['type'],
  required = false,
  options = <FieldOption[]>[],
} = {}) => ({
  custom,
  id,
  label,
  value,
  type,
  required,
  options: options.map(parseSFieldOptionDTO),
});

const parseSubscriptionListDTO = ({ id = '', name = '' } = {}) => ({
  id,
  name,
});

const parseSFieldOptionDTO = ({ id = '', label = '', value = '' } = {}) => ({
  id,
  label,
  value,
});
