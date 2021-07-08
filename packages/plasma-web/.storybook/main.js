module.exports = {
    stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.mdx', '../README.stories.mdx'],
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
