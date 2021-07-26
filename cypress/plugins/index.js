/* eslint-disable */
/// <reference types="cypress" />

const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const { startDevServer } = require('@cypress/webpack-dev-server');
const webpackConfig = require('../webpack.config');

module.exports = (on, config) => {
    addMatchImageSnapshotPlugin(on, config);

    console.log(config.testingType);

    if (config.testingType === 'component') {
        on('dev-server:start', (options) => {
            return startDevServer({ options, webpackConfig });
        });
    }

    return config;
};
