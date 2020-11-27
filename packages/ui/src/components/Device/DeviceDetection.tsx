import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { sberPortal, sberBox, touch } from '@sberdevices/plasma-tokens/typo';
import { sberPortalScale } from '@sberdevices/plasma-tokens';

import { detectDevice, deviceScales, DeviceKind } from '../../utils/deviceDetection';

const typoSizes = {
    sberBox: createGlobalStyle(sberBox),
    sberPortal: createGlobalStyle(sberPortal),
    touch: createGlobalStyle(touch),
};

export const DeviceDetectionContext = React.createContext({
    deviceScale: sberPortalScale,
});

export const DeviceDetectionProvider: React.FC<{
    detectDeviceCallback: () => DeviceKind;
}> = ({ children, detectDeviceCallback = detectDevice }) => {
    const deviceKind = detectDeviceCallback();
    const Typo = React.useMemo(() => typoSizes[deviceKind], [deviceKind]);
    return (
        <DeviceDetectionContext.Provider
            value={{
                deviceScale: deviceScales[deviceKind],
            }}
        >
            <Typo />
            {children}
        </DeviceDetectionContext.Provider>
    );
};
