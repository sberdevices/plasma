import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { Row, Col } from '@sberdevices/plasma-ui';
import { white } from '@sberdevices/plasma-tokens';

import { CartProvider } from '../CartProvider/CartProvider';
import { CartItemType, CartState } from '../types';
import { CartItem, CartItemProps } from '../CartItem/CartItem';
import { CartItemImage } from '../CartItemImage/CartItemImage';
import { CartItemDetails } from '../CartItemDetails/CartItemDetails';
import { CartItemQuantityButton } from '../CartItemQuantityButton/CartItemQuantityButton';

import { CartItemList } from './CartItemList';

export default {
    title: 'Cart/CartItemList',
    parameters: {
        ignoreInsets: true,
    },
    excludeStories: /CustomCartItem|items/,
};

export const items: CartItemType[] = [
    {
        id: '1',
        label: 'Продукты',
        name: 'Молоко Parmalat ультрапастеризованное длинное название',
        nameDetails: '1л',
        price: 68,
        oldPrice: 99,
        quantity: 99,
        quantityLimit: 99,
        imageSrc: 'images/img.png',
        caption: {
            type: 'sale',
            content: '31',
        },
    },
    {
        id: '2',
        name: 'CCC 3x3x3 Sail W',
        price: 68,
        quantity: 2,
        imageSrc: 'images/img.png',
    },
    {
        id: '3',
        name: 'Молоко Parmalat',
        nameDetails: '925мл',
        price: 68,
        quantity: 2,
    },
    {
        id: '4',
        label: 'Cubic',
        name: 'CCC 3x3x3 Sail W',
        price: 68,
        quantity: 2,
        imageSrc: 'images/img.png',
        present: true,
    },
    {
        id: '5',
        name: 'Молоко Parmalat ультрапастеризованное',
        price: 68,
        quantity: 2,
        imageSrc: 'images/img.png',
        quantityLimit: 1,
        caption: {
            type: 'warning',
            content: 'Товара недостаточно',
        },
    },
    {
        id: '6',
        name: 'CCC 3x3x3 Sail W',
        price: 68,
        quantity: 2,
        imageSrc: 'images/img.png',
        disabled: true,
        caption: {
            type: 'sold-out',
        },
    },
    {
        id: '7',
        name: 'CCC 4x4x4 Cubic W',
        price: 68,
        quantity: 2,
        imageSrc: 'images/img.png',
    },
];

const initialState: CartState = {
    items,
    currency: 'rub',
    quantity: 109,
    amount: 7412,
};

const CartContainer: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <CartProvider initialState={initialState} onChangeCart={action('onChangeCart')}>
        <Row>
            <Col sizeXL={6} sizeM={4} sizeS={4} style={{ height: '100vh' }}>
                {children}
            </Col>
        </Row>
    </CartProvider>
);

export const Default = (): React.ReactElement => {
    return (
        <CartContainer>
            <CartItemList
                items={items}
                currency="rub"
                onPlus={action('onPlus')}
                onMinus={action('onMinus')}
                onRemove={action('onRemove')}
            />
        </CartContainer>
    );
};

const StyledCartItemImage = styled(CartItemImage)`
    background: ${white};
    padding: 0.5rem;
`;

export const CustomCartItem: React.FC<CartItemProps> = (props) => (
    <CartItem
        {...props}
        imageComponent={StyledCartItemImage}
        detailsComponent={CartItemDetails}
        quantityButtonComponent={CartItemQuantityButton}
    />
);

export const WithCustomization = (): React.ReactElement => {
    return (
        <CartContainer>
            <CartItemList
                items={items}
                currency="rub"
                withBadge
                onPlus={action('onPlus')}
                onMinus={action('onMinus')}
                onRemove={action('onRemove')}
                cartItemComponent={CustomCartItem}
            />
        </CartContainer>
    );
};
