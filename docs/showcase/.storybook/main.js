const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.@(mdx|tsx)'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-backgrounds',
        '@storybook/addon-viewport',
        '@storybook/addon-knobs',
        '@storybook/addon-actions',
        '@storybook/addon-docs',
        '@storybook/addon-toolbars',
    ],
    webpackFinal: async (config) => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    react: path.resolve(__dirname, '../', 'node_modules', 'react'),
                    'react-dom': path.resolve(__dirname, '../', 'node_modules', 'react-dom'),
                    'styled-components': path.resolve(__dirname, '../', 'node_modules', 'styled-components'),
                },
            },
        };
    },
};
