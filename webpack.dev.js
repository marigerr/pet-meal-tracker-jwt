const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 10,
    poll: true
  }
});