/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: './layer-inpicture-sdk.production.min.js',
        path: path.resolve(__dirname, 'umd'),
    },
});
