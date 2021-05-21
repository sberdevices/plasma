import React from 'react';

import { DeviceFamily } from '../../../../types';
import { deviceFamily } from '../../../../utils/deviceFamily';

import { CartItemProps } from './CartItem@common';
import { CartItemSberBox } from './CartItem@sberbox';
import { CartItemSberPortal } from './CartItem@sberportal';

export const mapDeviceToCartItem: Record<DeviceFamily, React.FC<CartItemProps>> = {
    sberBox: CartItemSberBox,
    sberPortal: CartItemSberPortal,
    mobile: CartItemSberPortal,
};

export const CartItem = mapDeviceToCartItem[deviceFamily];
