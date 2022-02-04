import React from 'react';

import { CartState, CartStateItem } from '../types';

export interface CartContextValue<T extends CartState = CartState> {
    state: T;
    changeState: (state: T) => void;
    addItem: (item: CartStateItem<T>) => void;
    removeItem: (id: CartStateItem<T>['id']) => void;
    changeItemQuantity: (id: CartStateItem<T>['id'], quantity: number) => void;
    clearCart: () => void;
    isOverQuantityLimit: (plusQuantity: number) => boolean;
}

export const getInitialState = <T extends CartState>(): T =>
    (({
        items: [],
        currency: 'rub',
        quantity: 0,
        amount: 0,
    } as unknown) as T);

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
