const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: 'public/'
}).listen(8000, 'localhost', function (error) {
  if (error) {
    return console.log(error)
  }
  console.log('Server running at http://localhost:8000/')
})
