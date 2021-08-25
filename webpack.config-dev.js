// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path');

// eslint-disable-next-line no-undef
module.exports = {
  entry: './src/customJs/index.js',
  mode: 'development',
  output: {
    filename: 'index.js',
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'public/customJs'),
  },
};
