const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
    entry: {
        app: [
            `webpack-dev-server/client?http://localhost:${process.env.npm_package_config_port}}`,
            'webpack/hot/only-dev-server',
            './app/index'
        ]
    },
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/public/'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'require.specified': 'require.resolve'
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            include: [
                path.join(__dirname, 'app')
            ],
            use: [
                'react-hot-loader',
                'babel-loader'
            ]
        },
        {  
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }
            ]
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
        ]
    }
}


module.exports = config