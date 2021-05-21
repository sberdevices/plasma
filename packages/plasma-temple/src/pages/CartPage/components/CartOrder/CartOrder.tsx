import React from 'react';

import { DeviceFamily } from '../../../../types';
import { deviceFamily } from '../../../../utils/deviceFamily';

import { CartOrderProps } from './CartOrder@common';
import { CartOrderSberBox } from './CartOrder@sberbox';
import { CartOrderSberPortal } from './CartOrder@sberportal';

const mapDeviceToCartOrder: Record<DeviceFamily, React.FC<CartOrderProps>> = {
    sberBox: CartOrderSberBox,
    sberPortal: CartOrderSberPortal,
    mobile: CartOrderSberPortal,
};

export const CartOrder = React.memo(mapDeviceToCartOrder[deviceFamily]);
