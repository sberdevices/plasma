import React from 'react';
import { DeviceKind } from '@sberdevices/plasma-ui';

import { deviceFamily } from '../../../../utils/deviceFamily';

import { CartItemListCommon, CartItemListProps } from './CartItemList@common';
import { CartItemListMobile } from './CartItemList@mobile';

export const mapDeviceToCartItem: Record<DeviceKind, React.FC<CartItemListProps>> = {
    sberBox: CartItemListCommon,
    sberPortal: CartItemListCommon,
    mobile: CartItemListMobile,
};

export const CartItemList = mapDeviceToCartItem[deviceFamily];
