const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 10,
    poll: true
  },
  plugins: [
    function () {
      this.plugin('watch-run', function (watching, callback) {
        console.log('Began compile at ' + new Date());
        callback();
      })
    }
  ]
});