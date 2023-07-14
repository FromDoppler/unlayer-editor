// See https://github.com/FromDoppler/doppler-editors-webapp/blob/main/src/abstractions/domain/DopplerEditorSettings.ts
// and unlayerExtensionsConfiguration in UnlayerEditorWrapper.tsx

type Configuration = {
  locale: 'en' | 'es';
  stores: Store[];
  /** True when there is at least one store with promotionCodeEnabled */
  promotionCodeEnabled: boolean;
  previewMode: boolean;
};

type Store = {
  name: string;
  promotionCodeEnabled: boolean;
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
}: {
  locale?: 'es' | 'en';
  stores?: Store[];
  previewMode?: boolean;
} = {}) => {
  stores = stores.map(parseStoreDTO);
  const promotionCodeEnabled = stores.some((x) => x.promotionCodeEnabled);
  return {
    locale,
    stores,
    promotionCodeEnabled,
    previewMode,
  };
};

const parseStoreDTO = ({ name = '', promotionCodeEnabled = false } = {}) => ({
  name,
  promotionCodeEnabled,
});
