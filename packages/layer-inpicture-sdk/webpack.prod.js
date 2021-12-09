const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: './layer-inpicture-sdk.production.min.js',
        path: path.resolve(__dirname, 'umd'),
    },
});
