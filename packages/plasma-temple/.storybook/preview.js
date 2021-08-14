import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { sberBox as sberBoxTypo } from '@sberdevices/plasma-tokens/typo';
import { darkSber } from '@sberdevices/plasma-tokens/themes';
import { Container, DeviceThemeProvider } from '@sberdevices/plasma-ui';
import { createAssistant } from '@sberdevices/assistant-client';

import { AssistantContext } from '../src/components/PlasmaApp/AssistantContext';

const mock = createAssistant({
    getState: () => ({}),
});

const Color = createGlobalStyle(darkSber);

const withGlobalStyles = (storyFn) => (
    <DeviceThemeProvider>
        <Color />
        <Container>{storyFn ? storyFn() : null}</Container>
    </DeviceThemeProvider>
);

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
addDecorator(withKnobs);
addDecorator(withAssistant);

addParameters({
    backgrounds: {
        default: 'dark',
        values: [{ name: 'dark', value: '#0B121E', default: true }],
    },
});

addParameters({
    viewport: {
        defaultViewport: 'SberBox',
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
                    height: '667px',
                },
            },
        },
    },
});
