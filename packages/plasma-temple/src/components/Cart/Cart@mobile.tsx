import React from 'react';

import { CartCommon, CartComponent } from './Cart@common';
import { CartItemListMobile } from './CartItemList/CartItemList@mobile';
import { CartOrderMobile } from './CartOrder/CartOrder@mobile';

const platformComponents = {
    CartItemList: CartItemListMobile,
    CartOrder: CartOrderMobile,
};

export const CartMobile: CartComponent = (props) => <CartCommon {...props} platformComponents={platformComponents} />;
