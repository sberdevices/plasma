import React from 'react';

import { CartContext, CartContextValue } from '../CartProvider/CartContext';
import { CartState } from '../types';

export const useCart = <T extends CartState = CartState>(): CartContextValue<T> => {
    return (React.useContext(CartContext) as unknown) as CartContextValue<T>;
};
