import React from 'react';

import { DeviceFamily } from '../../../../types';
import { deviceFamily } from '../../../../utils/deviceFamily';

import { CartOrderProps } from './CartOrder@common';
import { CartOrderMobile } from './CartOrder@mobile';
import { CartOrderSberBox } from './CartOrder@sberbox';
import { CartOrderSberPortal } from './CartOrder@sberportal';

const mapDeviceToCartOrder: Record<DeviceFamily, React.FC<React.PropsWithChildren<CartOrderProps>>> = {
    sberBox: CartOrderSberBox,
    sberPortal: CartOrderSberPortal,
    mobile: CartOrderMobile,
};

export const CartOrder = React.memo(mapDeviceToCartOrder[deviceFamily]);
