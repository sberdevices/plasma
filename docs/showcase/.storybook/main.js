const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.@(mdx|tsx)'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-knobs',
        '@storybook/addon-essentials',
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
