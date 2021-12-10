const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: './layer-inpicture-sdk.dev.min.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, 'dist'),
        open: true,
        hot: true,
        devMiddleware: {
            writeToDisk: true
        },
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
    })],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },

});
