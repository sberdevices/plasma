module.exports = {
    stories: [
        '../src/**/*.stories.tsx',
        '../src/**/*.examples.tsx',
        '../examples/**/*.stories.tsx',
        '../examples/**/*.examples.tsx',
    ],
    addons: [
        '@storybook/addon-knobs/register',
        '@storybook/addon-backgrounds/register',
        '@storybook/addon-viewport/register',
        '@storybook/addon-actions',
    ],
};
