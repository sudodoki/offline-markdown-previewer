const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    `webpack-dev-server/client?http://localhost:${process.env.npm_package_config_port}`,
    'webpack/hot/only-dev-server',
    './app/index'
  ],
  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js',
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      HTTP_PORT: JSON.stringify('8080'),
      WS_PORT: JSON.stringify('8081')
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.join(__dirname, 'app')
      ],
      loader: [
        'react-hot-loader',
        'babel-loader'
      ]
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    },
    {
      test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader?limit=100000'
      }]
    },
    {
      test: /\.(eot|com|json|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      }]
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }]
    }
    ],
  }
};
