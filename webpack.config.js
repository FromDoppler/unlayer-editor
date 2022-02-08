const path = require('path');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const DotenvFlow = require('dotenv-flow-webpack');
const Dotenv = require('dotenv')

const mapFileManifest = (file) => {
    if (process.env.NODE_ENV === 'development') {
        return file
    }
    file.path = `${process.env.PUBLIC_URL}/${file.path}`
    return file;
}

const serializeManifest = (seed, files, entries) => {
    files = files.map(mapFileManifest)
    const filesSerialized = {}
    for (const file of files) {
        filesSerialized[file.name] = file.path;
    }

    return {
        files: filesSerialized,
        entrypoints: entries
    };
}

module.exports = function (env) {
    Dotenv.config({path: './.env.' + env.NODE_ENV});
    return {
        entry: './src/customJs/index.js',
        mode: env.NODE_ENV ? env.NODE_ENV : 'development',
        output: {
            filename: env.NODE_ENV === 'production'
                ? 'static/[name].[contenthash].js'
                : 'index.js',
            path: env.NODE_ENV === 'production'
                ? path.resolve(__dirname, 'build')
                : path.resolve(__dirname, 'public/customJs'),
            publicPath: '',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                    type: 'public/resource',
                }
            ],
        },
        plugins: [
            new WebpackManifestPlugin({
                fileName: 'asset-manifest.json',
                generate: serializeManifest
            }),
            new DotenvFlow({
                node_env: env.NODE_ENV ? env.NODE_ENV : 'development'
            })
        ]
    };
};
