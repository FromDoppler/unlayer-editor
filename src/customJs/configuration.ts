// See https://github.com/FromDoppler/doppler-editors-webapp/blob/main/src/abstractions/domain/DopplerEditorSettings.ts
// and unlayerExtensionsConfiguration in UnlayerEditorWrapper.tsx

import { Store } from './types';

type Configuration = {
  locale: 'en' | 'es';
  stores: Store[];
  /** True when there is at least one store with promotionCodeEnabled */
  promotionCodeEnabled: boolean;
  abandonedCartCampaign: boolean;
  visitedProductsCampaign: boolean;
  confirmationOrderCampaign: boolean;
  pendingOrderCampaign: boolean;
  bestSellingEnabled: boolean;
  crossSellingEnabled: boolean;
  newProductsEnabled: boolean;
  previewMode: boolean;
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
  previewMode = false,
  dopplerExternalUrls = {},
  abandonedCartCampaign = false,
  visitedProductsCampaign = false,
  confirmationOrderCampaign = false,
  pendingOrderCampaign = false,
  bestSellingEnabled = false,
  crossSellingEnabled = false,
  newProductsEnabled = false,
}: {
  locale?: 'es' | 'en';
  stores?: Store[];
  previewMode?: boolean;
  dopplerExternalUrls?: Record<string, string>;
  abandonedCartCampaign?: boolean;
  visitedProductsCampaign?: boolean;
  confirmationOrderCampaign?: boolean;
  pendingOrderCampaign?: boolean;
  bestSellingEnabled?: boolean;
  crossSellingEnabled?: boolean;
  newProductsEnabled?: boolean;
} = {}) => {
  stores = stores.map(parseStoreDTO);
  const promotionCodeEnabled = stores.some((x) => x.promotionCodeEnabled);
  return {
    locale,
    stores,
    promotionCodeEnabled,
    abandonedCartCampaign,
    visitedProductsCampaign,
    confirmationOrderCampaign,
    pendingOrderCampaign,
    bestSellingEnabled,
    crossSellingEnabled,
    newProductsEnabled,
    previewMode,
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

const parseStoreDTO = ({ name = '', promotionCodeEnabled = false } = {}) => ({
  name,
  promotionCodeEnabled,
});
