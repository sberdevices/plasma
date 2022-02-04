import React from 'react';
import { DeviceKind } from '@sberdevices/plasma-ui';

import { deviceFamily } from '../../../utils/deviceFamily';

import { CartOrderDetailsCommon, CartOrderDetailsProps } from './CartOrderDetails@common';
import { CartOrderDetailsMobile } from './CartOrderDetails@mobile';

export type { CartOrderDetailsProps };

const mapDeviceToCartOrder: Record<DeviceKind, React.FC<React.PropsWithChildren<CartOrderDetailsProps>>> = {
    sberBox: CartOrderDetailsCommon,
    sberPortal: CartOrderDetailsCommon,
    mobile: CartOrderDetailsMobile,
};

export const CartOrderDetails = React.memo(mapDeviceToCartOrder[deviceFamily]);
