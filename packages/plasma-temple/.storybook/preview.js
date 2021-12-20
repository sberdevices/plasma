import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { darkSber, darkEva, darkJoy } from '@sberdevices/plasma-tokens';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui';
import { createAssistant } from '@sberdevices/assistant-client';

import { AssistantContext } from '../src/components/PlasmaApp/AssistantContext';
import { withAppState } from './decorators/withAppState';
import { Layout } from '../src/components/Layout/Layout';

const mock = createAssistant({
    getState: () => ({}),
});

const themes = {
    darkSber: createGlobalStyle(darkSber),
    darkEva: createGlobalStyle(darkEva),
    darkJoy: createGlobalStyle(darkJoy),
};

const withGlobalStyles = (Story, context) => {
    const Theme = themes[context.globals.theme];
    const typoSize = context.globals.typoSize;

    return (
        <DeviceThemeProvider detectDeviceCallback={() => typoSize}>
            <Theme />
            <Layout ignoreInsets={context.parameters?.ignoreInsets ?? false}>
                <Story {...context} />
            </Layout>
        </DeviceThemeProvider>
    );
};

const withAssistant = (Story) => (
    <AssistantContext.Provider
        value={{
            getAssistant: () => mock,
            setAssistantState: () => {},
        }}
    >
        <Story />
    </AssistantContext.Provider>
);

addDecorator(withGlobalStyles);
addDecorator(withAssistant);
addDecorator(withAppState);

// TODO: решить проблему с реестром компонент и компонент зависящих от UA браузера

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'darkSber',
        toolbar: {
            items: ['darkSber', 'darkJoy', 'darkEva'],
            showName: true,
        },
    },
    typoSize: {
        name: 'Device kind',
        description: 'Global typography size for components',
        defaultValue: 'mobile',
        toolbar: {
            items: ['mobile', 'sberBox', 'sberPortal'],
            showName: true,
        },
    },
};

addParameters({
    viewport: {
        defaultViewport: 'Mobile',
        viewports: {
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
            Mobile: {
                name: 'Mobile',
                styles: {
                    width: '375px',
                    height: '812px',
                },
            },
        },
    },
});
