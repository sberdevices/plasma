import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { mount as cyMount } from '@cypress/react';
// plasma-web
import { web } from '@sberdevices/plasma-tokens-web/typo';
import { light as webLight } from '@sberdevices/plasma-tokens-web/themes';
// plasma-ui
import { darkSber } from '@sberdevices/plasma-tokens/themes';
// B2B
import { light as b2bLight } from '@sberdevices/plasma-tokens-b2b/themes';
// plasma-b2c
import { dark } from '@sberdevices/plasma-tokens-b2c/themes';
import { standard as standardTypo, compatible as compatibleTypo } from '@sberdevices/plasma-typo';

// TODO: better naming
const TypoThemeStyle = createGlobalStyle(web);
const WebLightThemeStyle = createGlobalStyle(webLight);

// B2B
const B2BLightThemeStyle = createGlobalStyle(b2bLight);

const ThemeStyle = createGlobalStyle(darkSber);

const StandardTypoStyle = createGlobalStyle(standardTypo);
const CompatibleTypoStyle = createGlobalStyle(compatibleTypo);
const ColorB2CStyle = createGlobalStyle(dark);

export const getComponent = (componentName: string) => {
    // eslint-disable-next-line
    // @ts-ignore
    const pkgName = Cypress.env('package');

    if (!pkgName) {
        throw new Error('Add package env to your Cypress config');
    }

    const check = (component: {}) => {
        if (!component) {
            throw new Error(`Library ${pkgName} has no ${componentName}`);
        }
    };

    if (pkgName === 'plasma-ui') {
        // eslint-disable-next-line
        const pkg = require('../../../packages/plasma-ui');
        const component = pkg[componentName];

        check(component);

        return component;
    }

    if (pkgName === 'plasma-web') {
        // eslint-disable-next-line
        const pkg = require('../../../packages/plasma-web');
        const component = pkg[componentName];

        check(component);

        return component;
    }

    if (pkgName === 'plasma-b2c') {
        // eslint-disable-next-line
        const pkg = require('../../../packages/plasma-b2c');
        const component = pkg[componentName];

        check(component);

        return component;
    }

    throw new Error(`Library ${pkgName} is not required in plasma-core/CypressHelpers:getComponent`);
};

interface CYTDec {
    noSSR?: boolean;
}

export const CypressTestDecorator: React.FC<CYTDec> = ({ noSSR, children }) => {
    // eslint-disable-next-line
    // @ts-ignore
    const pkgName = Cypress.env('package');
    const tokens = Cypress.env('tokens');
    const SSRProvider = getComponent('SSRProvider');

    const SSR: React.FC<CYTDec> = ({ noSSR: _noSSR, children }) => {
        if (_noSSR) {
            return <>{children}</>;
        }
        return <SSRProvider>{children}</SSRProvider>;
    };

    if (pkgName === 'plasma-ui') {
        const DeviceThemeProvider = getComponent('DeviceThemeProvider');

        return (
            <DeviceThemeProvider>
                <SSR noSSR={noSSR}>
                    <ThemeStyle />
                    {children}
                </SSR>
            </DeviceThemeProvider>
        );
    }

    // B2B
    if (pkgName === 'plasma-web' && tokens === 'plasma-tokens-b2b') {
        return (
            <SSR noSSR={noSSR}>
                <StandardTypoStyle />
                <CompatibleTypoStyle />
                <B2BLightThemeStyle />
                {children}
            </SSR>
        );
    }

    if (pkgName === 'plasma-web') {
        return (
            <SSR noSSR={noSSR}>
                <TypoThemeStyle />
                <WebLightThemeStyle />
                {children}
            </SSR>
        );
    }

    if (pkgName === 'plasma-b2c') {
        return (
            <SSR noSSR={noSSR}>
                <StandardTypoStyle />
                <CompatibleTypoStyle />
                <ColorB2CStyle />
                {children}
            </SSR>
        );
    }

    return <>{children}</>;
};

export const PadMe = styled.div`
    padding: 5px;
`;

export const SpaceMe = styled.span`
    padding: 5px;
`;

export const withNoAnimation = <P extends {}>(Comp: React.FC<P>) =>
    styled(Comp)`
        animation: none !important;
        /* stylelint-disable-next-line selector-max-universal */
        & * {
            animation: none !important;
        }
    ` as React.FC<P>;

export const mount: typeof cyMount = (...args) => {
    const [jsx, opts = {}] = args;

    opts.stylesheets = (opts?.stylesheets || ([] as string[])).concat(
        'https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansText.0.1.0.css',
        'https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansDisplay.0.1.0.css',
    );

    const cm = cyMount(jsx, opts);

    // eslint-disable-next-line
    // @ts-ignore
    cy.waitForResources('https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansText.0.1.0.css');
    // eslint-disable-next-line
    // @ts-ignore
    cy.waitForResources('https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansDisplay.0.1.0.css');
    // eslint-disable-next-line
    // @ts-ignore
    cy.waitForResources('SBSansText.0.1.0.css', 'SBSansDisplay.0.1.0.css', { timeout: 1500 });

    return cm;
};
