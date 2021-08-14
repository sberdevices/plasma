import React from 'react';

import { AnyObject } from '../../../../types';
import { CartItem, CartState, ChangeItemQuantityFn } from '../../types';

export interface CartContextValue<ID = string, T extends AnyObject = AnyObject> {
    state: CartState<ID, T>;
    changeState: (state: CartState<ID, T>) => void;
    addItem: (item: CartItem<ID, T>) => void;
    removeItem: (id: ID) => void;
    changeItemQuantity: ChangeItemQuantityFn<ID>;
    clearCart: () => void;
    isOverQuantityLimit: (plusQuantity: number) => boolean;
}

export const getInitialState = <ID = string, T extends AnyObject = AnyObject>(): CartState<ID, T> => ({
    items: [],
    currency: 'rub',
    quantity: 0,
    amount: 0,
});

const throwFn = () => {
    throw new Error('Cart context value is missing');
};

export const CartContext = React.createContext<CartContextValue>({
    state: getInitialState(),
    changeState: throwFn,
    addItem: throwFn,
    removeItem: throwFn,
    changeItemQuantity: throwFn,
    clearCart: throwFn,
    isOverQuantityLimit: throwFn,
});
