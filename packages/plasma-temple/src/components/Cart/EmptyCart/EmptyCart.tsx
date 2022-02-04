import React from 'react';
import { DeviceKind } from '@sberdevices/plasma-ui';

import { deviceFamily } from '../../../utils/deviceFamily';

import { EmptyCartCommon, EmptyCartProps } from './EmptyCart@common';
import { EmptyCartMobile } from './EmptyCart@mobile';

const mapDeviceToEmptyCart: Record<DeviceKind, React.FC<EmptyCartProps>> = {
    sberBox: EmptyCartCommon,
    sberPortal: EmptyCartCommon,
    mobile: EmptyCartMobile,
};

export const EmptyCart = mapDeviceToEmptyCart[deviceFamily];
