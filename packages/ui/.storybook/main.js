const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    addons: [
        '@storybook/preset-typescript',
        '@storybook/addon-knobs/register',
        '@storybook/addon-actions',
        '@storybook/addon-backgrounds/register',
        '@storybook/addon-viewport/register',
    ],
};
