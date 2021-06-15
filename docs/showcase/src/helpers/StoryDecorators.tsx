import React from 'react';
import { createGlobalStyle } from 'styled-components';
import {
    text,
    background,
    gradient,
    darkEva,
    darkJoy,
    darkSber,
    lightEva,
    lightJoy,
    lightSber,
    sberPortal,
    sberBox,
    mobile,
} from '@sberdevices/plasma-tokens';
import { light, dark } from '@sberdevices/plasma-tokens-web/themes';
import { web } from '@sberdevices/plasma-tokens-web/typo';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui/components/Device';
import { Container } from '@sberdevices/plasma-ui/components/Grid';
import isChromatic from 'chromatic/isChromatic';

const themes = {
    darkSber: createGlobalStyle(darkSber),
    darkEva: createGlobalStyle(darkEva),
    darkJoy: createGlobalStyle(darkJoy),
    lightSber: createGlobalStyle(lightSber),
    lightEva: createGlobalStyle(lightEva),
    lightJoy: createGlobalStyle(lightJoy),
    light: createGlobalStyle(light),
    dark: createGlobalStyle(dark),
};
const typos = {
    sberPortal: createGlobalStyle(sberPortal),
    sberBox: createGlobalStyle(sberBox),
    mobile: createGlobalStyle(mobile),
    web: createGlobalStyle(web),
};

type StoryContext = {
    globals: {
        typo: keyof typeof typos;
        theme: keyof typeof themes;
    };
};
type StoryDecorator = (Story: React.FC<any>, context: StoryContext) => React.ReactNode;

export const InSpacingDecorator: StoryDecorator = (Story, context) => (
    <div style={{ padding: '1rem' }}>
        <Story {...context} />
    </div>
);

export const InContainerDecorator: StoryDecorator = (Story, context) => (
    <Container>
        <Story {...context} />
    </Container>
);

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

export const UIStoryDecorator: StoryDecorator = (Story, context) => {
    let { theme, typo } = context.globals;

    if (typo === 'web') {
        typo = 'mobile';
    }
    if (theme === 'light') {
        theme = 'darkSber';
    }
    if (theme === 'dark') {
        theme = 'darkSber';
    }

    const Theme = themes[theme];

    return (
        <>
            <DeviceThemeProvider detectDeviceCallback={() => typo as 'sberPortal'}>
                <Theme />
                <PlasmaStyle />
                <Story {...context} />
            </DeviceThemeProvider>
        </>
    );
};
export const UIMobileDecorator: StoryDecorator = (Story, context) => {
    let { theme } = context.globals;

    if (theme === 'light') {
        theme = 'lightSber';
    }
    if (theme === 'dark') {
        theme = 'darkSber';
    }

    const Theme = themes[theme];

    return (
        <>
            <DeviceThemeProvider detectDeviceCallback={() => 'mobile'}>
                <Theme />
                <PlasmaStyle />
                <Story {...context} />
            </DeviceThemeProvider>
        </>
    );
};

export const WebStoryDecorator: StoryDecorator = (Story, context) => {
    let { theme } = context.globals;

    if (isChromatic() || theme === 'lightSber' || theme === 'lightEva' || theme === 'lightJoy') {
        theme = 'light';
    }
    if (theme === 'darkSber' || theme === 'darkEva' || theme === 'darkJoy') {
        theme = 'dark';
    }

    const Theme = themes[theme];
    const Typo = typos.web;

    return (
        <>
            <Theme />
            <Typo />
            <WebStyle />
            <Story {...context} />
        </>
    );
};
