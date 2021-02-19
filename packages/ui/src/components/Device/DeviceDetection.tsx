import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { sberPortal, sberBox, touch } from '@sberdevices/plasma-tokens/typo';
import { sberPortalScale } from '@sberdevices/plasma-tokens';

import { detectDevice, deviceScales, DeviceKind } from '../../utils';

/* stylelint-disable */
const uppercaseCheck = /([A-Z])/;
const uppercasePattern = /([A-Z])/g;
const prefixAndLowerCase = (char: string): string => `-${char.toLowerCase()}`;
const hyphenate = (str: string) => (uppercaseCheck.test(str) ? str.replace(uppercasePattern, prefixAndLowerCase) : str);
const transformStyles = (styles: { ':root': object }) => `
:root {
    ${Object.entries(styles[':root'])
        .map(([key, value]) => `${hyphenate(key)}: ${value}`)
        .join(';')}
}`;

const typoSizes = {
    sberBox: createGlobalStyle`${transformStyles(sberBox)}`,
    sberPortal: createGlobalStyle`${transformStyles(sberPortal)}`,
    touch: createGlobalStyle`${transformStyles(touch)}`,
};
/* stylelint-enable */

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
