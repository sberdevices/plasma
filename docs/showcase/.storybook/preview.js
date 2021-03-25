import { createGlobalStyle } from 'styled-components';
import { addParameters } from '@storybook/react';
import { text, background, gradient } from '@sberdevices/plasma-tokens';

import storybookTheme from './theme';

const isDocs = () => {
    const params = new URL(document.location).searchParams;
    return params.get('viewMode') === 'docs';
};

const isWeb = () => {
    const params = new URL(document.location).searchParams;
    const id = params.get('id');
    return id ? id.includes('web') : false;
};

const PlasmaStyle = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html:root {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
`;

const WebStyle = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html:root {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
    }
`;

const typos = {};

addParameters({
    viewport: {
        viewports: {
            '360': {
                name: '360',
                styles: {
                    width: '360px',
                    height: '640px',
                },
            },
            '720': {
                name: '720',
                styles: {
                    width: '720px',
                    height: '405px',
                },
            },
            '860': {
                name: '860',
                styles: {
                    width: '860px',
                    height: '640px',
                },
            },
            '1024': {
                name: '1024',
                styles: {
                    width: '1024px',
                    height: '768px',
                },
            },
            SberPortal: {
                name: 'SberPortal',
                styles: {
                    width: '1280px',
                    height: '720px',
                },
            },
            SberBox: {
                name: 'SberBox',
                styles: {
                    width: '1920px',
                    height: '1080px',
                },
            },
        },
    },
});

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: isWeb() ? 'light' : 'darkSber',
        toolbar: {
            items: ['darkSber', 'darkEva', 'darkJoy', 'lightSber', 'lightEva', 'lightJoy', 'light'],
        },
    },
    typo: {
        name: 'Device kind',
        description: 'Global typography size for components',
        defaultValue: isWeb() ? 'web' : 'sberBox',
        toolbar: {
            items: ['sberPortal', 'sberBox', 'touch', 'web'],
        },
    },
};

export const parameters = {
    docs: {
        theme: storybookTheme,
    },
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['UI', 'Web', 'Icons'],
        },
    },
    chromatic: {
        viewports: [1800],
    },
};
