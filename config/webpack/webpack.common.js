const webpack = require('webpack');
const helper = require('./root.helper');

module.exports = {
  entry: {
    polyfills: helper.root('src', 'polyfills.js'),
    vendor: helper.root('src', 'vendor.js'),
    app: helper.root('src', 'main.js')
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.less', '.html'],
    modules: [helper.root('src'), helper.root('node_modules')]
  },

  plugins: [
    // Delete duplicated imports/requires from chunks
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
  ]
};
