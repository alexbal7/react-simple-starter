const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const autoprefixer = require('autoprefixer');

const environment = require('../environment/env.dev');
const backend = require('../backend/requests');
const helper = require('./root.helper');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const CONFIG = environment.DEV_ENV;

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    path: helper.root('build'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        exclude: helper.root('node_modules'),
        use: ['eslint-loader']
      },
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: helper.root('node_modules'),
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }]
      },
      {
        test: /\.css$/,
        include: helper.root('src'),
        use: ['style-loader', 'css-loader',
          {
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
          }
        ]
      },
      {
        test: /\.less$/,
        include: helper.root('src'),
        use: ['style-loader', 'css-loader', 'less-loader',
          {
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
          }
        ]
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
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'API': JSON.stringify(CONFIG.API),
      'API_PORT': JSON.stringify(CONFIG.API_PORT),
      'IDB_VERSION': JSON.stringify(CONFIG.IDB_VERSION),
      'REQUESTS': JSON.stringify(backend.REQUESTS)
    }),

    // Plugin to automatically insert needed script/link tags to index.html
    new HtmlWebpackPlugin({
      template: helper.root('src', 'index.html'),
      chunksSortMode: 'dependency'
    })
  ],

  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    compress: true,
    stats: 'minimal',
    watchOptions: {
      ignored: /node_modules/
    }
  }
});
