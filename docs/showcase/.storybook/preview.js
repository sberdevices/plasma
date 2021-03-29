import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

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

addParameters({
    viewport: {
        viewports: {
            SberBox: {
                name: 'SberBox',
                styles: {
                    width: '1920px',
                    height: '1080px',
                },
            },
            SberPortal: {
                name: 'SberPortal',
                styles: {
                    width: '1280px',
                    height: '720px',
                },
            },
            ...INITIAL_VIEWPORTS,
        },
        defaultViewport: 'SberBox',
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
