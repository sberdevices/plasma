import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { addDecorator, addParameters } from '@storybook/react';
import { Title, Subtitle, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs/blocks';

import { text, background, gradient } from '@sberdevices/plasma-tokens';
import { darkEva, darkJoy, darkSber, lightEva, lightJoy, lightSber } from '@sberdevices/plasma-tokens';

import storybookTheme from './theme';

import { DeviceThemeProvider } from '../src/components/Device';

import { ToastProvider } from '../src/components/Toast';

// Workaround: to make VoiceOver read russian text properly
if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', 'ru');
}

const DocumentStyle = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html:root {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
`;

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
    const deviceKind = new URL(document.location).searchParams.get('deviceKind') || context.globals.deviceKind;

    return (
        <DeviceThemeProvider
            detectDeviceCallback={() => deviceKind}
            responsiveTypo={context.globals.typoSystem === 'responsive'}
            lowPerformance={context.globals.lowPerformanceDevice === 'yes'}
        >
            <Theme />
            <DocumentStyle />
            <Story {...context} />
        </DeviceThemeProvider>
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
        defaultValue: 'darkSber',
        toolbar: {
            items: ['darkSber', 'darkJoy', 'darkEva', 'lightSber', 'lightJoy', 'lightEva'],
            showName: true,
        },
    },
    typoSystem: {
        name: 'Typo system',
        description: 'Typography system',
        defaultValue: 'legacy',
        toolbar: {
            items: ['legacy', 'responsive'],
            showName: true,
        },
    },
    deviceKind: {
        name: 'Device kind',
        description: 'Device kind',
        defaultValue: 'sberBox',
        toolbar: {
            items: ['mobile', 'sberBox', 'sberPortal'],
            showName: true,
        },
    },
    lowPerformanceDevice: {
        name: 'Low performance',
        description: 'Low performance device',
        defaultValue: 'no',
        toolbar: {
            items: ['yes', 'no'],
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
            order: ['About', 'Colors', 'Typography', 'Tokens', 'Layout', 'Content', 'Controls', 'Showcase'],
        },
    },
};
