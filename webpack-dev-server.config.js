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
