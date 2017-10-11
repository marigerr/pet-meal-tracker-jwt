const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client/src'),
  // the entry file for the bundle
  entry: ('./app.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
  },

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
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },      
      {
        test: [
          /\.(png|svg|jpg|gif)$/,
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }]
      }      
    ],
  },
};
