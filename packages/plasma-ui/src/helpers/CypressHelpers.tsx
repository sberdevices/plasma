import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { darkSber } from '@sberdevices/plasma-tokens/themes';

import { DeviceThemeProvider } from '../components/Device';

const ThemeStyle = createGlobalStyle(darkSber);

export const CypressTestDecorator: FC = ({ children }) => (
    <DeviceThemeProvider>
        {children}
        <ThemeStyle />
    </DeviceThemeProvider>
);

export const Padme = styled.div`
    padding: 5px;
`;

export const SpaceMe = styled.span`
    padding: 5px;
`;
