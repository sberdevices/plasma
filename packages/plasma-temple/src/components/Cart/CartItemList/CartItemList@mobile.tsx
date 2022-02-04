import React from 'react';

import { AnyObject } from '../../../types';
import { CartItem } from '../CartItem/CartItem';

import { CartItemListProps } from './CartItemList@common';

export function CartItemListMobile<ID = unknown, T extends AnyObject = AnyObject>({
    items,
    currency,
    withBadge,
    defaultItemImage,
    cartItemComponent: Item = CartItem,
    onPlus,
    onMinus,
    onRemove,
    onImageClick,
}: CartItemListProps<ID, T>) {
    return (
        <>
            {items.map((item, index) => (
                <Item
                    key={`${item.id}-${index}`}
                    item={item}
                    index={index}
                    currency={currency}
                    withBadge={withBadge}
                    defaultImage={defaultItemImage}
                    onPlus={onPlus}
                    onMinus={onMinus}
                    onRemove={onRemove}
                    onImageClick={onImageClick}
                />
            ))}
        </>
    );
}
