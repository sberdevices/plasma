import React from 'react';
import { DeviceThemeProvider } from '@sberdevices/ui/components/Device/DeviceDetection';
import { Container } from '@sberdevices/ui/components/Grid';

export const PageLayout: React.FC = ({ children }) => (
    <DeviceThemeProvider>
        <Container>{children}</Container>
    </DeviceThemeProvider>
);
