import React from 'react';

import { Cart } from '../../types';

const throwFn = () => {
    throw new Error('Cart context value is missing');
};

export const CartContext = React.createContext<Cart>({
    items: [],
    addItem: throwFn,
    removeItem: throwFn,
    changeItemQuantity: throwFn,
});
