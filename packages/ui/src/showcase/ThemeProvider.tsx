import React from 'react';

import { DeviceThemeProvider } from '../components/Device';

export const ThemeProvider: React.FC = ({ children }) => {
    return <DeviceThemeProvider detectDeviceCallback={() => 'touch'}>{children}</DeviceThemeProvider>;
};
