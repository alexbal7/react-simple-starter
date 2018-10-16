const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');

const environment = require('../environment/env.prod');
const backend = require('../backend/requests');
const helper = require('./root.helper');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const CONFIG = environment.PROD_ENV;

const CSS_LOADER = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    minimize: true,
    sourceMap: true
  }
};

const POST_CSS_LOADER = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      })
    ]
  }
};

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  mode: 'production',

  target: 'web',
  cache: true,
  performance: {
    hints: false
  },

  output: {
    path: helper.root('build'),
    publicPath: '',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: helper.root('node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            compact: true
          }
        }
      },
      {
        test: /\.css$/,
        include: helper.root('src'),
        use: [
          MiniCssExtractPlugin.loader,
          CSS_LOADER,
          POST_CSS_LOADER
        ]
      },
      {
        test: /\.less$/,
        include: helper.root('src', 'app'),
        use: [
          MiniCssExtractPlugin.loader,
          CSS_LOADER,
          'less-loader',
          POST_CSS_LOADER
        ]
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      'ENV': JSON.stringify(ENV),
      'API': JSON.stringify(CONFIG.API),
      'API_PORT': JSON.stringify(CONFIG.API_PORT),
      'IDB_VERSION': JSON.stringify(CONFIG.IDB_VERSION),
      'REQUESTS': JSON.stringify(backend.REQUESTS)
    }),

    new CompressionPlugin({
      test: /\.(js|css)$/
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css',
    }),

    new HtmlWebpackPlugin({
      template: helper.root('src', 'index.html'),
      chunksSortMode: 'dependency',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'sync',
      defer: /polyfills|vendor|app/,
      preload: /polyfills|vendor|app/
    })
  ]
});
