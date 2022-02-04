import React from 'react';
import styled, { css } from 'styled-components';
import { action } from '@storybook/addon-actions';
import { addFocus, Badge, mediaQuery } from '@sberdevices/plasma-ui';
import { white } from '@sberdevices/plasma-tokens';

import { Cart } from './Cart';
import { CartProvider } from './CartProvider/CartProvider';
import { CartState, CartItemType } from './types';
import { CartItem, CartItemProps } from './CartItem/CartItem';
import { CartItemImageProps } from './CartItemImage/CartItemImage';

export default {
    title: 'Cart/Marketplace cart',
    parameters: {
        ignoreInsets: true,
    },
};

const items: CartItemType<number>[] = [
    {
        id: 1,
        name: 'Беспроводные наушники',
        label: 'TechnoZone',
        price: 1305,
        oldPrice: 1999,
        percentDiscount: 34,
        quantity: 1,
        quantityLimit: 10,
        imageSrc: 'images/placeholder.png',
    },
    {
        id: 2,
        name: 'Умная колонка',
        label: 'SmartHome',
        price: 4607,
        oldPrice: 5907,
        percentDiscount: 22,
        quantity: 1,
        quantityLimit: 10,
        imageSrc: 'images/placeholder.png',
    },
];

type MarketPlaceCartState = CartState<number>;

const initialState: MarketPlaceCartState = {
    items,
    currency: 'rub',
    amount: 5912,
    discount: 1985,
    percentDiscount: 25,
    quantity: 2,
};

const StyledIndexBadge = styled(Badge)`
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
`;

const StyledImageContainer = styled.div`
    position: relative;
    height: 4rem;
    width: 4rem;
    border-radius: 0.75rem;

    background: ${white};
    padding: 0.5rem;

    ${addFocus({ outlineRadius: '0.75rem', outlined: true, outlineOffset: '0.15rem' })}

    ${mediaQuery(
        'M',
        2,
    )(css`
        height: 3rem;
        width: 3rem;
    `)}

    ${mediaQuery(
        'S',
        1,
    )(css`
        height: 3.5rem;
        width: 3.5rem;
        min-width: 3.5rem;
    `)}
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const MarketCartItemImage: React.FC<CartItemImageProps<number>> = ({ item, innerRef, index, onClick }) => {
    const clickHandler = React.useCallback(() => onClick?.(item), [onClick, item]);

    return (
        <StyledImageContainer ref={innerRef} tabIndex={0} onClick={clickHandler}>
            {item.imageSrc && <StyledImage src={item.imageSrc} />}
            <StyledIndexBadge text={String(index + 1)} view="secondary" size="s" />
        </StyledImageContainer>
    );
};

const MarketplaceCartItem: React.FC<CartItemProps<number>> = ({
    item,
    index,
    active,
    onPlus,
    onMinus,
    onItemClick,
}) => (
    <CartItem<number>
        item={item}
        index={index}
        active={active}
        onPlus={onPlus}
        onMinus={onMinus}
        onItemClick={onItemClick}
        imageComponent={MarketCartItemImage}
    />
);

export const Default = (): React.ReactElement => {
    return (
        <CartProvider<MarketPlaceCartState> initialState={initialState} onChangeCart={action('onChangeCart')}>
            <Cart<number>
                onCheckout={action('onCheckout')}
                insets={{ bottom: 72 }}
                cartItemComponent={MarketplaceCartItem}
            />
        </CartProvider>
    );
};
