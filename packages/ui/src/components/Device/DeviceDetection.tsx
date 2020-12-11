import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { sberPortal, sberBox, touch } from '@sberdevices/plasma-tokens/typo';
import { sberPortalScale } from '@sberdevices/plasma-tokens';

import { detectDevice, deviceScales, DeviceKind } from '../../utils/deviceDetection';

const typoSizes = {
    sberBox: createGlobalStyle(sberBox),
    sberPortal: createGlobalStyle(sberPortal),
    touch: createGlobalStyle(touch),
};

export interface DeviceThemeProps {
    theme?: object;
    detectDeviceCallback?: () => DeviceKind;
}

export const DeviceThemeProvider: React.FC<DeviceThemeProps> = ({
    theme,
    children,
    detectDeviceCallback = detectDevice,
}) => {
    const deviceKind = detectDeviceCallback();
    const deviceScale = deviceScales[deviceKind] || sberPortalScale;
    const Typo = React.useMemo(() => typoSizes[deviceKind], [deviceKind]);
    return (
        <ThemeProvider theme={{ ...theme, deviceScale }}>
            <Typo />
            {children}
        </ThemeProvider>
    );
};
