import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { text, background, gradient } from '@sberdevices/plasma-tokens'; // FixMe: import from core
import { darkEva, darkJoy, darkSber, lightEva, lightJoy, lightSber } from '@sberdevices/plasma-tokens/themes';
import { sberPortal, sberBox, touch } from '@sberdevices/plasma-tokens/typo';
import { light } from '@sberdevices/plasma-tokens-web/themes';
import { web } from '@sberdevices/plasma-tokens-web/typo';
import { DeviceThemeProvider } from '@sberdevices/ui/components/Device';
import { Container } from '@sberdevices/ui/components/Grid';

const themes = {
    darkSber: createGlobalStyle(darkSber),
    darkEva: createGlobalStyle(darkEva),
    darkJoy: createGlobalStyle(darkJoy),
    lightSber: createGlobalStyle(lightSber),
    lightEva: createGlobalStyle(lightEva),
    lightJoy: createGlobalStyle(lightJoy),
    light: createGlobalStyle(light),
};
const typos = {
    sberPortal: createGlobalStyle(sberPortal),
    sberBox: createGlobalStyle(sberBox),
    touch: createGlobalStyle(touch),
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
        typo = 'touch';
    }
    if (theme === 'light') {
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

export const WebStoryDecorator: StoryDecorator = (Story, context) => {
    const Theme = themes.light;
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

export const DeviceStoryDecorator: StoryDecorator = (Story, context) => {
    const { theme } = context.globals;
    const Typo = typos.sberPortal;
    const Theme = themes[theme];

    return (
        <>
            <Theme />
            <Typo />
            <WebStyle />
            <Story {...context} />
        </>
    );
};
