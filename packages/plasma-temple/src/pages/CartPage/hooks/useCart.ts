import React from 'react';

import { CartContext } from '../components/CartProvider/CartContext';
import { Cart } from '../types';

export const useCart = (): Cart => {
    return React.useContext(CartContext);
};
