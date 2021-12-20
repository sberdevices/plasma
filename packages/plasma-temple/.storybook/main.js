const path = require('path');

module.exports = {
    stories: [
        '../src/**/*.stories.tsx',
        '../src/**/*.examples.tsx',
        '../examples/**/*.stories.tsx',
        '../examples/**/*.examples.tsx',
    ],
    addons: ['@storybook/preset-create-react-app', '@storybook/addon-essentials'],
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
