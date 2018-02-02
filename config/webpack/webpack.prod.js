const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const autoprefixer = require('autoprefixer');

const environment = require('../environment/env.prod');
const backend = require('../backend/requests');
const helper = require('./root.helper'); 

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const CONFIG = environment.PROD_ENV;

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helper.root('build'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        include: helper.root('src'),
        use: ['eslint-loader']
      },
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: helper.root('node_modules'),
        use: [{
          loader: 'babel-loader',
          options: {
            compact: true
          }
        }]
      },
      {
        test: /\.css$/,
        include: helper.root('src'),
        use: ExtractTextPlugin.extract(
          {
            fallback: {
              loader: 'style-loader',
              options: {
                hmr: false
              }
            },
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              }
            ]
          }
        )
      },
      {
        test: /\.less$/,
        include: helper.root('src', 'app'),
        use: ExtractTextPlugin.extract(
          {
            fallback: {
              loader: 'style-loader',
              options: {
                hmr: false
              }
            },
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              }, 'less-loader'
            ]
          }
        )
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      warnings: true,
      uglifyOptions: {
        ie8: false,
        ecma: 6,
        mangle: true,
        compress: {
          pure_getters: true,
          passes: 3
        }
      }
    }),

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

    new ExtractTextPlugin('[name].[hash].css'),

    // Plugin to automatically insert needed script/link tags to index.html
    new HtmlWebpackPlugin({
      template: helper.root('src', 'index.html'),
      chunksSortMode: 'dependency',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
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
