import React from 'react';
import { DeviceKind } from '@sberdevices/plasma-ui';

import { deviceFamily } from '../../../utils/deviceFamily';

import { CartOrderProps } from './CartOrder@common';
import { CartOrderMobile } from './CartOrder@mobile';
import { CartOrderSberBox } from './CartOrder@sberbox';
import { CartOrderSberPortal } from './CartOrder@sberportal';

export type { CartOrderProps };

const mapDeviceToCartOrder: Record<DeviceKind, React.FC<React.PropsWithChildren<CartOrderProps>>> = {
    sberBox: CartOrderSberBox,
    sberPortal: CartOrderSberPortal,
    mobile: CartOrderMobile,
};

export const CartOrder = React.memo(mapDeviceToCartOrder[deviceFamily]);
