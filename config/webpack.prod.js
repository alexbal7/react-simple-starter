const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const common = require('./webpack.common');
const helper = require('./root.helper');

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    minimize: true,
    sourceMap: true
  }
};

module.exports = webpackMerge(common.config, {
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
        use: [MiniCssExtractPlugin.loader, cssLoader, common.postCssLoader]
      },
      {
        test: /\.less$/,
        include: helper.root('src', 'app'),
        use: [MiniCssExtractPlugin.loader, cssLoader, 'less-loader', common.postCssLoader]
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

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
