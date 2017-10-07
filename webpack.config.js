const path = require('path');


module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/app.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },
  devtool: 'source-map',
  // devServer: {
  //   contentBase: path.resolve(__dirname, '/client/dist/js'),
  //   watchOptions: { poll: true },
  //   compress: true,
  //   port: 3000,
  // },
  module: {
    // apply loaders to files that meet given conditions
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/client/src'),
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};
