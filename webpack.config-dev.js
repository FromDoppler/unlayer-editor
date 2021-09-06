// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path');

// eslint-disable-next-line no-undef
module.exports = function () {
  // Do this as the first thing so that any code reading it knows the right env.
  // eslint-disable-next-line no-undef
  process.env.BABEL_ENV = 'development';
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV = 'development';

  return {
    entry: './src/customJs/index.js',
    mode: 'development',
    output: {
      filename: 'index.js',
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, 'public/customJs'),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
  };
};
