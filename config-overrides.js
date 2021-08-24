// eslint-disable-next-line no-undef
module.exports = function override(config, env) {
  if (env === 'production') {
    config.entry = './src/customJs/index.js';
    return config;
  }
  return config;
};
