import React from 'react';

import { CartProvider, CartState } from '../../../../components/Cart';

import { CartButton } from './CartButton';

export default {
    title: 'Cart Button',
};

const initialState: CartState = {
    items: [],
    currency: 'rub',
    quantity: 9,
    amount: 7412,
};

export const Default = () => (
    <CartProvider initialState={initialState}>
        <CartButton screen="cart" />
    </CartProvider>
);

export const EmptyCart = () => (
    <CartProvider>
        <CartButton screen="cart" />
    </CartProvider>
);

export const WithPrice = () => (
    <CartProvider initialState={initialState}>
        <CartButton screen="cart" withPrice />
    </CartProvider>
);
