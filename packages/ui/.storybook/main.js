const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    addons: [
        '@storybook/preset-typescript',
        '@storybook/addon-links',
        '@storybook/addon-knobs/register',
        '@storybook/addon-backgrounds/register',
        '@storybook/addon-actions',
    ],
    // webpackFinal: async (config) => {
    //     config.module.rules.push({
    //         test: /\.(ts|tsx)$/,
    //         use: [
    //             {
    //                 loader: require.resolve('ts-loader'),
    //             },
    //             {
    //                 loader: require.resolve('react-docgen-typescript-loader'),
    //             },
    //         ],
    //     });
    //     config.resolve.extensions.push('.ts', '.tsx');

    //     return config;
    // },
};
