// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const overrideDevConfig = require('./config-overrides-dev');
// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const overrideConfig = require('./config-overrides-prod');

// eslint-disable-next-line no-undef
module.exports = function override(config, env) {
  if (env === 'production') {
    return overrideConfig(config);
  }
  return overrideDevConfig(config);
};
