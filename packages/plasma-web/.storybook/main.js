module.exports = {
    stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.mdx', '../README.stories.mdx'],
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
