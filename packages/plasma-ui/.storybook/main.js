const path = require('path');

module.exports = {
    stories: process.env.DOCS
        ? [
              '../src/!(showcase)/**/*.stories.@(mdx|tsx)',
              '../README.stories.mdx',
              '../Tokens.stories.mdx',
              '../environment.stories.mdx',
          ]
        : [
              '../src/**/*.stories.@(mdx|tsx)',
              '../README.stories.mdx',
              '../Tokens.stories.mdx',
              '../environment.stories.mdx',
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
