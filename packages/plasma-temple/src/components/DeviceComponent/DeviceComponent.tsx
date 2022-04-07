import React from 'react';
import { detectDevice } from '@sberdevices/plasma-ui';

import { AnyObject } from '../../types';

export interface DeviceComponentProps<Props extends AnyObject = AnyObject> {
    sberbox: React.ComponentType<Props>;
    sberportal: React.ComponentType<Props>;
    mobile: React.ComponentType<Props>;
    props: Props;
}

export function DeviceComponent<Props extends AnyObject = AnyObject>({
    sberbox: SberBoxComponent,
    sberportal: SberPortalComponent,
    mobile: MobileComponent,
    props,
}: DeviceComponentProps<Props>) {
    switch (detectDevice()) {
        case 'sberBox':
            return <SberBoxComponent {...props} />;
        case 'sberPortal':
            return <SberPortalComponent {...props} />;
        default:
            return <MobileComponent {...props} />;
    }
}
