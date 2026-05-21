const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require("webpack");
const DotenvFlow = require('dotenv-flow-webpack');

module.exports = function (env) {
    return {
        context: __dirname,
        entry: './src/index.tsx',
        mode: env.NODE_ENV ? env.NODE_ENV : 'development',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
            publicPath: '/',
        },
        devServer: {
            historyApiFallback: true,
            port: 3000,
            host: '0.0.0.0',
            allowedHosts: 'all',
            headers: {
                'Access-Control-Allow-Origin': 'https://editor.unlayer.com',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Private-Network': 'true',
                'Cross-Origin-Resource-Policy': 'cross-origin',
            },
            setupMiddlewares: (middlewares) => {
                return middlewares.filter(middleware => middleware.name !== "cross-origin-header-check");
            }
        },
        watchOptions: {
            ignored: [path.resolve(__dirname, 'src', 'customJs'), './node_modules']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|j?g|svg|gif)?$/,
                    use: 'file-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                filename: 'index.html',
                environment: env.NODE_ENV ? env.NODE_ENV : 'development'
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new DotenvFlow({
                node_env: env.NODE_ENV ? env.NODE_ENV : 'development'
            })
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        }
    }
};
