import React from 'react';
import styled from 'styled-components';
import { Col, Row } from '@sberdevices/plasma-ui';

import { CartItemType } from '../types';
import { CartItem, CartItemProps } from '../CartItem/CartItem';
import { AnyObject, Currency } from '../../../types';
import { useScrollableContainer } from '../hooks/useScrollableContainer';

export interface CartItemListProps<ID = unknown, T extends AnyObject = AnyObject> {
    /** Список товаров */
    items: CartItemType<ID, T>[];
    /** Валюта */
    currency?: Currency;
    /** Устанавливает максимальное количество товаров в корзине */
    maxCount?: boolean;
    /** Флаг определяет наличие числового бейджа на изображении товара */
    withBadge?: boolean;
    /**
     * Дефолтное изображение для отдельной позиции в корзине.
     * Используется при отсутствии изображения у элемента корзины или при ошибке загрузки изображения
     */
    defaultItemImage?: string;
    className?: string;
    /** Кастомный элемент списка товаров в корзине */
    cartItemComponent?: React.ComponentType<CartItemProps<ID, T>>;
    /** Колбэк вызываемый при клике по кнопке добавить */
    onPlus: (item: CartItemType<ID, T>) => void;
    /** Колбэк вызываемый при клике по кнопке уменьшить */
    onMinus: (item: CartItemType<ID, T>) => void;
    /**
     * Колбэк вызываемый при клике по кнопке удалить. Отображается если `item.disabled = true`.
     * Также вызывается если количество товара в корзине равно 0.
     */
    onRemove?: (item: CartItemType<ID, T>) => void;
    /** Колбэк вызываемый при клике по изображению товара */
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
