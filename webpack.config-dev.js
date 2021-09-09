const path = require('path');

module.exports = function () {
  // Do this as the first thing so that any code reading it knows the right env.
  process.env.BABEL_ENV = 'development';
  process.env.NODE_ENV = 'development';

  return {
    entry: './src/customJs/index.js',
    mode: 'development',
    output: {
      filename: 'index.js',
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
