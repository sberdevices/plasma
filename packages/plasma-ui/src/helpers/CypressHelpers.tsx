import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { darkSber } from '@sberdevices/plasma-tokens/themes';

import { DeviceThemeProvider } from '../components/Device';

const ThemeStyle = createGlobalStyle(darkSber);

export const CypressTestDecorator: FC = ({ children }) => (
    <DeviceThemeProvider>
        {children}
        <ThemeStyle />
    </DeviceThemeProvider>
);
