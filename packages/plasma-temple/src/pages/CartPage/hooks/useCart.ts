import React from 'react';

import { AnyObject } from '../../../types';
import { CartContext, CartContextValue } from '../components/CartProvider/CartContext';

export const useCart = <ID = string, T extends AnyObject = AnyObject>(): CartContextValue<ID, T> => {
    return (React.useContext(CartContext) as unknown) as CartContextValue<ID, T>;
};
