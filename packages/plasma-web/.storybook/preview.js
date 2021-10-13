import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs/blocks';
import { link, linkHover, linkActive } from '@sberdevices/plasma-tokens-web';
import { light, dark } from '@sberdevices/plasma-tokens-web/themes';
import { light as b2cLight, dark as b2cDark } from '@sberdevices/plasma-tokens-b2c/themes';
import { web } from '@sberdevices/plasma-tokens-web/typo';

import { ToastProvider } from '../src/components/Toast';

import storybookTheme from './theme';

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

const TypoStyle = createGlobalStyle(web);

const themes = {
    light: createGlobalStyle(light),
    dark: createGlobalStyle(dark),
    'b2c:light': createGlobalStyle(b2cLight),
    'b2c:dark': createGlobalStyle(b2cDark),
};

const withTheme = (Story, context) => {
    const Theme = themes[context.globals.theme];
    console.log(context.globals.theme, Theme);
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
        defaultValue: 'light',
        toolbar: {
            items: ['light', 'dark', 'b2c:light', 'b2c:dark'],
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
