const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');
const helper = require('./root.helper');

module.exports = webpackMerge(common.config, {
  devtool: 'cheap-module-source-map',
  mode: 'development',

  output: {
    path: helper.root('build'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: helper.root('node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        include: helper.root('src'),
        use: ['style-loader', 'css-loader', common.postCssLoader]
      },
      {
        test: /\.less$/,
        include: helper.root('src'),
        use: ['style-loader', 'css-loader', 'less-loader', common.postCssLoader]
      }
    ]
  },

  plugins: [
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
