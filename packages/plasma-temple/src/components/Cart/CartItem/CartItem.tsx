import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-ui';

import { CartItemImage, CartItemImageProps } from '../CartItemImage/CartItemImage';
import { CartItemDetails, CartItemDetailsProps } from '../CartItemDetails/CartItemDetails';
import { CartItemQuantityButton, CartItemQuantityButtonProps } from '../CartItemQuantityButton/CartItemQuantityButton';
import { CartItemType } from '../types';
import { AnyObject, Currency } from '../../../types';

export interface CartItemProps<ID = unknown, T extends AnyObject = AnyObject> {
    /** Данные товара */
    item: CartItemType<ID, T>;
    /**  Индекс товара в корзине */
    index: number;
    /** Валюта */
    currency?: Currency;
    /** Флаг определяет возможность увеличить количетво товара в корзине */
    plusDisabled?: boolean;
    /** Флаг определяет наличие числового бейджа на изображении товара */
    withBadge?: boolean;
    /**
     * Дефолтное изображение.
     * Используется при отсутствии изображения или при ошибке загрузки изображения
     */
    defaultImage?: string;
    className?: string;
    /** Кастомный элемент изображения товара */
    imageComponent?: React.ComponentType<CartItemImageProps<ID, T>>;
    /** Кастомный элемент деталей товара */
    detailsComponent?: React.ComponentType<CartItemDetailsProps<ID, T>>;
    /** Кастомный элемент кнопок изменения количества товара в корзине */
    quantityButtonComponent?: React.ComponentType<CartItemQuantityButtonProps<ID, T>>;
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

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;

    ${mediaQuery(
        'M',
        2,
    )(css`
        margin-top: 0.375rem;
        margin-bottom: 0.75rem;
    `)}

    ${mediaQuery(
        'S',
        1,
    )(css`
        margin-top: 0;
        margin-bottom: 1.25rem;
    `)}
`;

const StyledImageContainer = styled.div<{ disabled?: boolean }>`
    margin-right: 1rem;
    height: 4rem;
    width: 4rem;

    opacity: ${({ disabled }) => (disabled ? 0.24 : 1)};

    ${mediaQuery(
        'M',
        2,
    )(css`
        margin-right: 0.375rem;
        height: 3rem;
        width: 3rem;
    `)}

    ${mediaQuery(
        'S',
        1,
    )(css`
        margin-right: 0.75rem;
        height: 3.5rem;
        width: 3.5rem;
    `)}
`;

const StyledDetailsContainer = styled.div<{ disabled?: boolean }>`
    flex: 1;
    overflow: hidden;
    margin-right: 0.5rem;

    opacity: ${({ disabled }) => (disabled ? 0.24 : 1)};

    ${mediaQuery(
        'S',
        1,
    )(css`
        margin-right: 0.75rem;
    `)}
`;

function CartItemComponent<ID = unknown, T extends AnyObject = AnyObject>({
    item,
    index,
    currency,
    plusDisabled,
    withBadge,
    defaultImage,
    onPlus,
    onMinus,
    onRemove,
    onImageClick: onItemClick,
    className,
    imageComponent,
    detailsComponent,
    quantityButtonComponent,
}: CartItemProps<ID, T>) {
    const Image = (imageComponent ?? CartItemImage) as React.ComponentType<CartItemImageProps<ID, T>>;
    const Details = detailsComponent ?? CartItemDetails;
    const QuantityButton = quantityButtonComponent ?? CartItemQuantityButton;

    return (
        <StyledContainer className={className} data-cy="CartItem">
            <StyledImageContainer disabled={item.disabled}>
                <Image
                    index={index}
                    item={item}
                    withBadge={withBadge}
                    defaultImage={defaultImage}
                    onClick={onItemClick}
                />
            </StyledImageContainer>
            <StyledDetailsContainer disabled={item.disabled}>
                <Details item={item} currency={currency} />
            </StyledDetailsContainer>
            <QuantityButton
                item={item}
                plusDisabled={plusDisabled}
                onPlus={onPlus}
                onMinus={onMinus}
                onRemove={onRemove}
            />
        </StyledContainer>
    );
}
/** Компонет отдельной позиции в корзине */
export const CartItem = React.memo(CartItemComponent) as typeof CartItemComponent;
