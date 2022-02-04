import React from 'react';
import styled from 'styled-components';
import { Col, Row } from '@sberdevices/plasma-ui';

import { CartItemType } from '../types';
import { CartItem, CartItemProps } from '../CartItem/CartItem';
import { AnyObject, Currency } from '../../../types';
import { useScrollableContainer } from '../hooks/useScrollableContainer';

export interface CartItemListProps<ID = unknown, T extends AnyObject = AnyObject> {
    items: CartItemType<ID, T>[];
    currency?: Currency;
    maxCount?: boolean;
    withBadge?: boolean;
    defaultItemImage?: string;
    className?: string;
    cartItemComponent?: React.ComponentType<CartItemProps<ID, T>>;
    onPlus: (item: CartItemType<ID, T>) => void;
    onMinus: (item: CartItemType<ID, T>) => void;
    onRemove?: (item: CartItemType<ID, T>) => void;
    onImageClick?: (item: CartItemType<ID, T>) => void;
}

const StyledContainer = styled(Row)`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
        opacity: 0;
        width: 0;
    }
`;

export function CartItemListCommon<ID = unknown, T extends AnyObject = AnyObject>({
    items,
    currency,
    maxCount,
    withBadge,
    defaultItemImage,
    className,
    cartItemComponent: Item = CartItem,
    children,
    onPlus,
    onMinus,
    onRemove,
    onImageClick,
}: React.PropsWithChildren<CartItemListProps<ID, T>>) {
    const containerRef = useScrollableContainer();

    return (
        <StyledContainer ref={containerRef} className={className}>
            {items.map((item, index) => (
                <Col key={`${item.id}-${index}`} sizeXL={12} sizeL={8} sizeM={6} sizeS={4}>
                    <Item
                        item={item}
                        index={index}
                        currency={currency}
                        withBadge={withBadge}
                        defaultImage={defaultItemImage}
                        onPlus={onPlus}
                        onMinus={onMinus}
                        onRemove={onRemove}
                        onImageClick={onImageClick}
                        plusDisabled={maxCount || Boolean(item.quantityLimit && item.quantity >= item.quantityLimit)}
                    />
                </Col>
            ))}
            {children}
        </StyledContainer>
    );
}
