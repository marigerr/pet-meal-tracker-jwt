const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client/src'),
  entry: ('./app.jsx'),

  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
  },

  module: {
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
          path.join(__dirname, '/client/src/manifest.json'),
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
