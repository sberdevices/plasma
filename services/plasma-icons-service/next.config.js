/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const { ICONS_PUBLIC_URL, PR_NAME } = process.env;

const pathSuffix = PR_NAME ? `-${PR_NAME}` : '';
const basePath = ICONS_PUBLIC_URL ? `${ICONS_PUBLIC_URL}${pathSuffix}` : '';

module.exports = {
    basePath,
    assetPrefix: basePath,
    reactStrictMode: true,
    trailingSlash: true,
    webpack: (config) => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    react: path.resolve(__dirname, 'node_modules', 'react'),
                    'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
                    'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
                },
            },
        };
    },
};
