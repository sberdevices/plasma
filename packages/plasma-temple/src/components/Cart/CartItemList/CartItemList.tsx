import React from 'react';

import { DeviceComponent } from '../../DeviceComponent/DeviceComponent';

import { CartItemListCommon, CartItemListProps } from './CartItemList@common';
import { CartItemListMobile } from './CartItemList@mobile';

/** Компонент отображает товары в корзине  */
export const CartItemList: typeof CartItemListCommon = (props) => (
    <DeviceComponent
        sberbox={CartItemListCommon}
        sberportal={CartItemListCommon}
        mobile={CartItemListMobile}
        props={props as CartItemListProps}
    />
);
