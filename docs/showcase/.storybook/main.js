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
};
