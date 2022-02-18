import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs/blocks';
import { link, linkHover, linkActive } from '@sberdevices/plasma-tokens-b2b';
import { light as b2bLight, dark as b2bDark } from '@sberdevices/plasma-tokens-b2b/themes';
import { light as b2cLight, dark as b2cDark } from '@sberdevices/plasma-tokens-b2c/themes';
import { light as legacyLight, dark as legacyDark } from '@sberdevices/plasma-tokens-web/themes';
import { b2b as b2bTypo } from '@sberdevices/plasma-tokens-b2b/typo';

import { ToastProvider } from '../src/components/Toast';

import storybookTheme from './theme';

// Workaround: to make VoiceOver read russian text properly
if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', 'ru');
}

/* stylelint-disable */
const DocumentStyle = createGlobalStyle`
    html:root {
        min-height: 100vh;
    }
    a {
        color: ${link};
        text-decoration: underline;

        &:hover {
            color: ${linkHover};
        }
        &:active {
            color: ${linkActive};
        }
    }
`;
/* stylelint-enable */

const TypoStyle = createGlobalStyle(b2bTypo);

const themes = {
    'b2b:light': createGlobalStyle(b2bLight),
    'b2b:dark': createGlobalStyle(b2bDark),
    'b2c:light': createGlobalStyle(b2cLight),
    'b2c:dark': createGlobalStyle(b2cDark),
    'light (legacy)': createGlobalStyle(legacyLight),
    'dark (legacy)': createGlobalStyle(legacyDark),
};

const withTheme = (Story, context) => {
    let theme = context.globals.theme;

    if (theme === 'light') {
        theme = 'light (legacy)';
    } else if (theme === 'dark') {
        theme = 'dark (legacy)';
    }

    const Theme = themes[theme];

    return (
        <>
            <TypoStyle />
            <Theme />
            <DocumentStyle />
            <Story {...context} />
        </>
    );
};

const withToast = (Story) => (
    <ToastProvider>
        <Story />
    </ToastProvider>
);

addDecorator(withTheme);
addDecorator(withToast);

addParameters({
    viewport: {
        viewports: {
            '375': {
                name: '375x812',
                styles: {
                    width: '375px',
                    height: '812px',
                },
            },
            '768': {
                name: '768x576',
                styles: {
                    width: '768px',
                    height: '576px',
                },
            },
            '1024': {
                name: '1024x768',
                styles: {
                    width: '1024px',
                    height: '768px',
                },
            },
            '1920': {
                name: '1920x1080',
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
        defaultValue: 'b2b:light',
        toolbar: {
            items: ['b2b:light', 'b2b:dark', 'b2c:light', 'b2c:dark', 'light (legacy)', 'dark (legacy)'],
            showName: true,
        },
    },
};

export const parameters = {
    docs: {
        page: () => (
            <>
                <Title />
                <Subtitle />
                <Description />
                <Primary />
                <ArgsTable story={PRIMARY_STORY} />
            </>
        ),
        theme: storybookTheme,
    },
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['About', 'Intro', 'Colors', 'Typography', 'Controls'],
        },
    },
};
