import { create } from '@storybook/theming';

export default create({
    base: 'light',

    // UI
    appBg: '#FFFFFF',
    appContentBg: '#FFFFFF',
    appBorderColor: 'rgba(0, 0, 0, 0.16)',
    appBorderRadius: 4,

    colorPrimary: '#226AF1',
    colorSecondary: '#226AF1',

    // Typography
    fontBase: "'SB Sans Text', Helvetica, Arial, sans-serif",

    // Toolbar default and active colors
    barTextColor: 'rgba(8, 8, 8, 0.56)',
    barSelectedColor: '#226AF1',
    barBg: '#FFFFFF',

    // Logo
    brandTitle: 'Plasma UI Kit',
    brandUrl: 'https://plasma.sberdevices.ru',
    brandImage: './images/plasma-logo.png',
});
