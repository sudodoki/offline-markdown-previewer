const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './app/index' // Your appʼs entry point
    ],
    output: {
        path: path.resolve('./public'),
        filename: 'bundle.js',
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
        {
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
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        {
            test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader?limit=100000'
                }
            ]
        },
        {
            test: /\.(eot|com|json|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
                }
            ]
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
                }
            ]
        }
        ],
    }
};