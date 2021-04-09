import React from 'react';
import { DeviceThemeProvider, Container } from '@sberdevices/plasma-ui';

export const PageLayout: React.FC = ({ children }) => (
    <DeviceThemeProvider>
        <Container>{children}</Container>
    </DeviceThemeProvider>
);
