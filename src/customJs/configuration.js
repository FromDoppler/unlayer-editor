// See https://github.com/FromDoppler/doppler-editors-webapp/blob/main/src/abstractions/domain/DopplerEditorSettings.ts
// and unlayerExtensionsConfiguration in UnlayerEditorWrapper.tsx

/**
 * @typedef Configuration
 * @type {object}
 * @property {('en'|'es')} locale
 * @property {Store[]} stores
 * @property {boolean} promotionCodeEnabled - There is at least one store with promotionCodeEnabled
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
  locale = defaultLanguage,
  stores = [],
} = {}) => {
  stores = stores.map(parseStoreDTO);
  const promotionCodeEnabled = stores.some((x) => x.promotionCodeEnabled);
  return {
    locale,
    stores,
    promotionCodeEnabled,
  };
};

const parseStoreDTO = ({ name = '', promotionCodeEnabled = false } = {}) => ({
  name,
  promotionCodeEnabled,
});
