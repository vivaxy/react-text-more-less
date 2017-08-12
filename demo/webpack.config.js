'use strict';

const path = require('path');
const glob = require('glob');
const numeral = require('numeral');
const webpack = require('webpack');
const logUpdate = require('log-update');
const autoprefixer = require('autoprefixer');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./scripts/config');

const SOURCE_PATH = 'src';
const ENTRY_FOLDER_NAME = 'entries';
const TEMPLATE_FOLDER_NAME = 'templates';
const COMMON_CHUNK_NAME = 'common';
const ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = 'production';
const BANNER = '@2017 vivaxy';

let NODE_ENV = process.env.NODE_ENV || ENV_PRODUCTION;

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: function() {
            return [
                autoprefixer,
            ];
        },
    },
};

const urlLoader = {
    loader: 'url-loader',
    options: {
        limit: 8192,
        name: 'image/[name]-[hash].[ext]',
    },
};

const jsRule = {
    test: /\.js$/,
    use: ['babel-loader'],
    include: [path.resolve(__dirname, SOURCE_PATH), path.resolve(__dirname, '../src')],
};

const pcssRule = {
    test: /\.pcss$/,
    include: [path.resolve(__dirname, SOURCE_PATH)],
    use: ['style-loader', 'css-loader', postcssLoader],
};

const imageRule = {
    test: /\.(png|jpg|gif)$/,
    use: [urlLoader],
};

const ejsRule = {
    test: /\.ejs$/,
    use: ['raw-loader'],
};

const webpackConfig = {
    entry: {
        [COMMON_CHUNK_NAME]: ['babel-polyfill',],
    },
    output: {
        path: path.resolve(__dirname, config.DIST_PATH),
        filename: 'js/[name].js',
        publicPath: '../',
    },
    module: {
        rules: [
            jsRule,
            pcssRule,
            imageRule,
            ejsRule,
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: COMMON_CHUNK_NAME,
            filename: 'js/[name].js',
            minChunks: 2, // Infinity
        }),
        new Visualizer(),
        new webpack.NamedModulesPlugin(),
    ],
};

const entryFileNameList = glob.sync(path.join(SOURCE_PATH, ENTRY_FOLDER_NAME) + '/*.js');
const entryNameList = entryFileNameList.map(function(entryFileName) {
    return path.basename(entryFileName, '.js');
});

// get corresponding html template
const htmlFileNameList = glob.sync(path.join(SOURCE_PATH, TEMPLATE_FOLDER_NAME) + '/*.html');
const htmlNameList = htmlFileNameList.map(function(htmlFileName) {
    return path.basename(htmlFileName, '.html');
});

// set entry
entryNameList.forEach(function(entryName) {
    webpackConfig.entry[entryName] = [path.join(__dirname, './' + SOURCE_PATH + '/' + ENTRY_FOLDER_NAME + '/' + entryName + '.js')];

    let htmlTemplateName = 'index';
    if (htmlNameList.indexOf(entryName) !== -1) {
        htmlTemplateName = entryName;
    }

    webpackConfig.plugins.push(new HtmlWebpackPlugin({
        template: SOURCE_PATH + '/' + TEMPLATE_FOLDER_NAME + '/' + htmlTemplateName + '.html',
        filename: 'html/' + entryName + '.html',
        hash: false,
        inject: 'body',
        chunks: [COMMON_CHUNK_NAME, entryName],
    }));
});

switch (NODE_ENV) {
    case ENV_DEVELOPMENT:
        entryNameList.forEach(function(entryName) {
            webpackConfig.entry[entryName].unshift('webpack-dev-server/client?http://' + config.DEVELOPMENT_IP + ':' + config.DEVELOPMENT_PORT);
            webpackConfig.entry[entryName].unshift('webpack/hot/dev-server');
        });

        webpackConfig.devtool = 'eval';

        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
        webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
        webpackConfig.plugins.push(new webpack.ProgressPlugin((percentage, msg) => {
            logUpdate('     progress:', numeral(percentage).format('00.00%'), msg);
        }));

        break;

    case ENV_PRODUCTION:

        webpackConfig.devtool = `source-map`;

        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }));
        webpackConfig.plugins.push(new webpack.BannerPlugin({
            banner: BANNER,
        }));
        break;

}

module.exports = webpackConfig;
