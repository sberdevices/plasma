import React from 'react';
import { action } from '@storybook/addon-actions';

import { CartProvider } from '../../components/Cart/CartProvider/CartProvider';
import { CartState } from '../../components/Cart/types';
import { items } from '../../components/Cart/CartItemList/CartItemList.stories';

import { CartPage } from './CartPage';

export default {
    title: 'Pages/Cart',
    parameters: {
        ignoreInsets: true,
    },
};

const initialState: CartState = {
    items,
    currency: 'rub',
    quantity: 109,
    amount: 7412,
};

export const Default = (): React.ReactElement => {
    return (
        <CartProvider initialState={initialState} onChangeCart={action('onChangeCart')}>
            <CartPage onMakeOrder={action('onMakeOrder')} header={{ title: 'Корзина' }}>
                Текст про стоимость доставки, которая зависит от адреса или “заполняя эту форму...”
            </CartPage>
        </CartProvider>
    );
};

export const WithDiscountAndDelivery = (): React.ReactElement => {
    return (
        <CartProvider initialState={{ ...initialState, discount: 107, deliveryPrice: 500 }}>
            <CartPage onMakeOrder={action('onMakeOrder')} header={{ title: 'Корзина' }}>
                Текст про стоимость доставки, которая зависит от адреса или “заполняя эту форму...”
            </CartPage>
        </CartProvider>
    );
};
