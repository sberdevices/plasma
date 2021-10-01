import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
// plasma-web
import { web } from '@sberdevices/plasma-tokens-web/typo';
import { light } from '@sberdevices/plasma-tokens-web/themes';
// plasma-ui
import { darkSber } from '@sberdevices/plasma-tokens/themes';
// plasma-b2c
import { dark } from '@sberdevices/plasma-tokens-b2c/themes';
import { b2c } from '@sberdevices/plasma-tokens-b2c/typo';

// TODO: better naming
const TypoThemeStyle = createGlobalStyle(web);
const ColorThemeStyle = createGlobalStyle(light);

const ThemeStyle = createGlobalStyle(darkSber);

const TypoB2CStyle = createGlobalStyle(b2c);
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

export const CypressTestDecorator: FC = ({ children }) => {
    // eslint-disable-next-line
    // @ts-ignore
    const pkgName = Cypress.env('package');

    if (pkgName === 'plasma-ui') {
        const DeviceThemeProvider = getComponent('DeviceThemeProvider');

        return (
            <DeviceThemeProvider>
                <ThemeStyle />
                {children}
            </DeviceThemeProvider>
        );
    }

    if (pkgName === 'plasma-web') {
        return (
            <>
                <TypoThemeStyle />
                <ColorThemeStyle />
                {children}
            </>
        );
    }

    if (pkgName === 'plasma-b2c') {
        return (
            <>
                <TypoB2CStyle />
                <ColorB2CStyle />
                {children}
            </>
        );
    }

    return <>{children}</>;
};

export const Padme = styled.div`
    padding: 5px;
`;

export const SpaceMe = styled.span`
    padding: 5px;
`;
