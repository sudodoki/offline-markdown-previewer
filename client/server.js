const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: 'public/'
}).listen(process.env.npm_package_config_port, 'localhost', function (error) {
  if (error) {
    return console.log(error);
  }
  console.log(`Server running at http://localhost:${process.env.npm_package_config_port}/`);
});
