import React from 'react';

import { DeviceFamily } from '../../../../types';
import { deviceFamily } from '../../../../utils/deviceFamily';

import { CartItemProps } from './CartItem@common';
import { CartItemMobile } from './CartItem@mobile';
import { CartItemSberBox } from './CartItem@sberbox';
import { CartItemSberPortal } from './CartItem@sberportal';

export const mapDeviceToCartItem: Record<DeviceFamily, React.FC<CartItemProps>> = {
    sberBox: CartItemSberBox,
    sberPortal: CartItemSberPortal,
    mobile: CartItemMobile,
};

export const CartItem = mapDeviceToCartItem[deviceFamily];
