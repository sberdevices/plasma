import React from 'react';

import { CartCommon, CartComponent } from './Cart@common';
import { CartItemListCommon } from './CartItemList/CartItemList@common';
import { CartOrderSberPortal } from './CartOrder/CartOrder@sberportal';

const platformComponents = {
    CartItemList: CartItemListCommon,
    CartOrder: CartOrderSberPortal,
};

export const CartSberPortal: CartComponent = (props) => (
    <CartCommon {...props} platformComponents={platformComponents} />
);
