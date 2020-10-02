import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeDarkEva, ThemeDarkJoy, ThemeDarkSber } from 'plasma-styles/components/Theme';
import Typo from 'plasma-styles/components/Typo';
import Color from 'plasma-styles/components/Color';
import {
    colorTextPrimary,
    colorBackgroundColor,
    colorBackgroundDefault,
} from 'plasma-styles/components/Color/tokens';

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

const withTheme = (Story, context) => {
    const mapThemeOnComponent = {
        sber: ThemeDarkSber,
        eva: ThemeDarkEva,
        joy: ThemeDarkJoy,
    };
    const Theme = mapThemeOnComponent[context.globals.theme];
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
    options: { theme: {} },
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
        defaultValue: 'sber',
        toolbar: {
            items: ['sber', 'joy', 'eva'],
        },
    },
};
