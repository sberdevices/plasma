import React, { createContext, useMemo } from 'react';
import { createGlobalStyle } from 'styled-components';
import { sberPortal, sberBox, touch } from '@sberdevices/plasma-tokens/typo';

import { detectDevice, deviceScales, DeviceKind } from '../../utils/deviceDetection';

const typoSizes = {
    sberBox: createGlobalStyle(sberBox),
    sberPortal: createGlobalStyle(sberPortal),
    touch: createGlobalStyle(touch),
};

export const Context = createContext({
    deviceScale: 2,
});

export const DeviceDetectionProvider: React.FC<{
    detectDeviceCallback: () => DeviceKind;
}> = ({ children, detectDeviceCallback = detectDevice }) => {
    const deviceKind = detectDeviceCallback();
    const Typo = useMemo(() => typoSizes[deviceKind], [deviceKind]);
    return (
        <Context.Provider
            value={{
                deviceScale: deviceScales[deviceKind],
            }}
        >
            <Typo />
            {children}
        </Context.Provider>
    );
};
