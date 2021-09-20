import React from 'react';

import { CartItem } from '../CartItem/CartItem';

import { CartItemListProps } from './CartItemList@common';

export const CartItemListMobile: React.FC<CartItemListProps> = ({ items, currency, onItemClick }) => {
    return (
        <>
            {items.map((item, index) => (
                <CartItem
                    key={`${item.id}-${index}`}
                    index={index}
                    item={item}
                    currency={currency}
                    onItemClick={onItemClick}
                />
            ))}
        </>
    );
};
