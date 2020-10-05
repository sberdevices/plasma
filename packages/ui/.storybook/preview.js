import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Color from 'plasma-styles/components/Color';
import {
    colorTextPrimary,
    colorBackgroundColor,
    colorBackgroundDefault,
} from 'plasma-styles/components/Color/tokens';
import { touch, sberBox, sberPortal } from 'plasma-tokens/typo';
import { darkEva, darkJoy, darkSber, lightEva, lightJoy, lightSber } from 'plasma-tokens/themes';

const DocumentStyle = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html {
        height: 100vh;
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    body {
        height: 100vh;
        color: ${colorTextPrimary};
        background: ${colorBackgroundDefault};
        background-color: ${colorBackgroundColor};
        margin: 0;
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
        defaultViewport: 'HD',
        viewports: {
            FHD: {
                name: '1080p',
                styles: {
                    width: '1920px',
                    height: '1080px',
                },
            },
            HD: {
                name: 'HD',
                styles: {
                    width: '1280px',
                    height: '720px',
                },
            },
            StarGate: {
                name: 'StarGate',
                styles: {
                    width: '1280px',
                    height: '800px',
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
        name: 'Typo size',
        description: 'Global typography size for components',
        defaultValue: 'sberBox',
        toolbar: {
            items: ['touch', 'sberBox', 'sberPortal'],
        },
    },
};
