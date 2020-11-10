const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postcssLoader = {
  loader: 'postcss-loader',
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
  use: {
    loader: 'babel-loader',
    options: JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../.babelrc'))
    ),
  },
  include: [path.resolve(__dirname, 'src'), path.join(__dirname, '../src')],
};

const pcssRule = {
  test: /\.pcss$/,
  include: [path.resolve(__dirname, 'src')],
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
    demo: './src/entries/demo.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [jsRule, pcssRule, imageRule, ejsRule],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'html/demo.html',
      hash: false,
      inject: 'body',
    }),
  ],
  optimization: {
    moduleIds: 'named',
  },
  devServer: { open: true, openPage: './dist/html/demo.html' },
};

module.exports = webpackConfig;
