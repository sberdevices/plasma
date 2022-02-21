/* eslint-disable */
/// <reference types="cypress" />

const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const { startDevServer } = require('@cypress/webpack-dev-server');
const getWebpackConfig = require('../webpack.config');
const coverage = require('@cypress/code-coverage/task');

const windowSize = {
    sberportal: '1300,800',
    sberbox: '2000,1080',
    mobile: '2000,1080',
};

const overrideConfig: Cypress.PluginConfig = (on, config) => {
    console.log('PLATFORM_TESTS', process.env.PLATFORM_TESTS);
    addMatchImageSnapshotPlugin(on, config);

    coverage(on, config);

    if (config.testingType === 'component') {
        on('dev-server:start', (options) => {
            return startDevServer({ options, webpackConfig: getWebpackConfig() });
        });
    }

    if (process.env.PLATFORM_TESTS != null || config.env.package === 'plasma-temple') {
        on('before:browser:launch', (browser, launchOptions) => {
            if (browser.name === 'chrome' || browser.name === 'chromium') {
                let windowSizeArg = windowSize.sberbox;

                if (config.userAgent) {
                    windowSizeArg = windowSize[config.userAgent];
                }

                launchOptions.args.push(`--window-size=${windowSizeArg}`);
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

module.exports = overrideConfig;
