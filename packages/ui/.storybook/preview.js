import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Color from '@sberdevices/plasma-styles/components/Color';
import {
    colorTextPrimary,
    colorBackgroundColor,
    colorBackgroundDefault,
} from '@sberdevices/plasma-styles/components/Color/tokens';
import { touch, sberBox, sberPortal } from '@sberdevices/plasma-tokens/typo';
import { darkEva, darkJoy, darkSber, lightEva, lightJoy, lightSber } from '@sberdevices/plasma-tokens/themes';

const DocumentStyle = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html:root {
        min-height: 100vh;
        color: ${colorTextPrimary};
        background: ${colorBackgroundDefault};
        background-color: ${colorBackgroundColor};
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    body {
        margin: 0;
        padding: 16px !important;
    }
`;

const typoSizes = {
    sberBox: createGlobalStyle(sberBox),
    sberPortal: createGlobalStyle(sberPortal),
    touch: createGlobalStyle(touch),
};

const themes = {
    darkSber: createGlobalStyle(darkSber),
    darkEva: createGlobalStyle(darkEva),
    darkJoy: createGlobalStyle(darkJoy),
    lightSber: createGlobalStyle(lightSber),
    lightEva: createGlobalStyle(lightEva),
    lightJoy: createGlobalStyle(lightJoy),
};

const withTheme = (Story, context) => {
    const Theme = themes[context.globals.theme];
    const Typo = typoSizes[context.globals.typoSize];

    return (
        <>
            <Theme />
            <Typo />
            <Color />
            <DocumentStyle />
            <Story {...context} />
        </>
    );
};

addDecorator(withKnobs);
addDecorator(withTheme);

addParameters({
    viewport: {
        defaultViewport: 'SberBox',
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
                    height: '484px',
                },
            },
            '1024': {
                name: '1024',
                styles: {
                    width: '1024px',
                    height: '576px',
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
        defaultValue: 'darkSber',
        toolbar: {
            items: ['darkSber', 'darkJoy', 'darkEva', 'lightSber', 'lightJoy', 'lightEva'],
        },
    },
    typoSize: {
        name: 'Device kind',
        description: 'Global typography size for components',
        defaultValue: 'sberBox',
        toolbar: {
            items: ['touch', 'sberBox', 'sberPortal'],
        },
    },
};
