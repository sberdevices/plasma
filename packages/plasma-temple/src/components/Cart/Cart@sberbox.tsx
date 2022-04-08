import React from 'react';

import { CartCommon, CartComponent } from './Cart@common';
import { CartItemListCommon } from './CartItemList/CartItemList@common';
import { CartOrderSberBox } from './CartOrder/CartOrder@sberbox';

const platformComponents = {
    CartItemList: CartItemListCommon,
    CartOrder: CartOrderSberBox,
};

export const CartSberBox: CartComponent = (props) => <CartCommon {...props} platformComponents={platformComponents} />;
