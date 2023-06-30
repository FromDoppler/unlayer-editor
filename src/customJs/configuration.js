// See https://github.com/FromDoppler/doppler-editors-webapp/blob/main/src/abstractions/domain/DopplerEditorSettings.ts
// and unlayerExtensionsConfiguration in UnlayerEditorWrapper.tsx

/**
 * @typedef Configuration
 * @type {object}
 * @property {string} baseAssetsUrl
 * @property {('en'|'es')} locale
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
} = {}) => {
  return {
    baseAssetsUrl,
    locale,
  };
};
