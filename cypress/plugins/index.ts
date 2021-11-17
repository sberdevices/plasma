/* eslint-disable */
/// <reference types="cypress" />

const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const { startDevServer } = require('@cypress/webpack-dev-server');
const getWebpackConfig = require('../webpack.config');
const coverage = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
    addMatchImageSnapshotPlugin(on, config);

    coverage(on, config);

    if (config.testingType === 'component') {
        on('dev-server:start', (options) => {
            return startDevServer({ options, webpackConfig: getWebpackConfig() });
        });
    }

    // это нужно для вывода отчета axe
    on('task', {
        log(message) {
            console.log(message);

            return null;
        },
        table(message) {
            console.table(message);

            return null;
        },
    });

    return config;
};
