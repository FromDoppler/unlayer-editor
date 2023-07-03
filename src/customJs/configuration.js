// See https://github.com/FromDoppler/doppler-editors-webapp/blob/main/src/abstractions/domain/DopplerEditorSettings.ts
// and unlayerExtensionsConfiguration in UnlayerEditorWrapper.tsx

/**
 * @typedef Configuration
 * @type {object}
 * @property {string} baseAssetsUrl
 * @property {('en'|'es')} locale
 * @property {Store[]} stores
 *
 * @typedef Store
 * @type {object}
 * @property {string} name
 * @property {boolean} promotionCodeEnabled
 */

/** @type {Configuration} */
let _configuration;

const defaultLanguage = 'es';

export const getConfiguration = () =>
  (_configuration =
    _configuration ||
    parseConfigurationDTO(window['unlayer-extensions-configuration']));

export const parseConfigurationDTO = ({
  baseAssetsUrl = '',
  locale = defaultLanguage,
  stores = [],
} = {}) => {
  stores = stores.map(parseStoreDTO);
  return {
    baseAssetsUrl,
    locale,
    stores,
  };
};

const parseStoreDTO = ({ name = '', promotionCodeEnabled = false } = {}) => ({
  name,
  promotionCodeEnabled,
});
