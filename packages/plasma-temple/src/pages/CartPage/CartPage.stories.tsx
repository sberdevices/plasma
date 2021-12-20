import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { tertiary } from '@sberdevices/plasma-tokens';
import { Footnote1 } from '@sberdevices/plasma-ui';

import { CartPage } from './CartPage';
import { CartProvider } from './components/CartProvider/CartProvider';
import { CartItem, CartState } from './types';

export default {
    title: 'Pages/Cart',
    parameters: {
        ignoreInsets: true,
    },
};

const items: CartItem[] = [
    {
        id: '1',
        name: 'Молоко Parmalat ультрапастеризованное dfdfdfdfss',
        nameDetails: '1л',
        price: 68,
        quantity: 99,
        quantityLimit: 99,
        imageSrc: '/images/placeholder.png',
    },
    {
        id: '2',
        name: 'CCC 3x3x3 Sail W',
        price: 68,
        quantity: 2,
        imageSrc: '/images/placeholder.png',
    },
    {
        id: '3',
        name: 'Молоко Parmalat ультрапастеризованное',
        nameDetails: '1л',
        price: 68,
        quantity: 2,
    },
    {
        id: '4',
        name: 'CCC 3x3x3 Sail W',
        price: 68,
        quantity: 2,
        imageSrc: '/images/placeholder.png',
        present: true,
    },
    {
        id: '5',
        name: 'Молоко Parmalat ультрапастеризованное',
        nameDetails: '1л',
        price: 68,
        quantity: 2,
        imageSrc: '/images/placeholder.png',
    },
    {
        id: '6',
        name: 'CCC 3x3x3 Sail W',
        price: 68,
        quantity: 2,
        imageSrc: '/images/placeholder.png',
    },
];

const initialState: CartState = {
    items,
    currency: 'rub',
    quantity: 109,
    amount: 7412,
};

const StyledText = styled(Footnote1)`
    margin-top: 1rem;
    color: ${tertiary};
    text-align: center;
`;

export const Default = (): React.ReactElement => {
    return (
        <CartProvider initialState={initialState} onChangeCart={action('onChangeCart')}>
            <CartPage onMakeOrder={action('onMakeOrder')} header={{ title: 'Корзина' }}>
                <StyledText>
                    Текст про стоимость доставки, которая зависит от адреса или “заполняя эту форму...”
                </StyledText>
            </CartPage>
        </CartProvider>
    );
};

export const WithDiscount = (): React.ReactElement => {
    return (
        <CartProvider initialState={{ ...initialState, discount: 107, deliveryPrice: 500 }}>
            <CartPage onMakeOrder={action('onMakeOrder')} header={{ title: 'Корзина' }}>
                <StyledText>
                    Текст про стоимость доставки, которая зависит от адреса или “заполняя эту форму...”
                </StyledText>
            </CartPage>
        </CartProvider>
    );
};
