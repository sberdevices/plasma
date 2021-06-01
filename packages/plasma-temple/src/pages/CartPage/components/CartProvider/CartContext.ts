import React from 'react';

import { Cart } from '../../types';

const throwFn = () => {
    throw new Error('Cart context value is missing');
};

export const CartContext = React.createContext<Cart>({
    items: [],
    quantity: 0,
    price: 0,
    addItem: throwFn,
    removeItem: throwFn,
    changeItemQuantity: throwFn,
    clearCart: throwFn,
});
