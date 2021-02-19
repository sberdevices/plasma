const path = require('path');

module.exports = {
    stories: process.env.DOCS
        ? ['../src/!(showcase)/**/*.stories.@(mdx|tsx)', '../README.stories.mdx']
        : ['../src/**/*.stories.@(mdx|tsx)', '../README.stories.mdx'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-backgrounds/register',
        '@storybook/addon-viewport/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-actions',
        '@storybook/addon-docs',
        '@storybook/addon-toolbars',
    ],
};
