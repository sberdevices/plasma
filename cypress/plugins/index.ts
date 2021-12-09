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

    if (config.env.package === 'plasma-temple') {
        on('before:browser:launch', (browser: Cypress.Browser, launchOptions: Cypress.BrowserLaunchOptions) => {
            if (browser.name === 'chrome' || browser.name === 'chromium') {
                launchOptions.args.push('--window-size=2000,1080');
                launchOptions.args.push('--disable-dev-shm-usage');
            }

            return launchOptions;
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
