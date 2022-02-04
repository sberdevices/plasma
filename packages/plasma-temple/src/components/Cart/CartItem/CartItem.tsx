import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-ui';

import { CartItemImage, CartItemImageProps } from '../CartItemImage/CartItemImage';
import { CartItemDetails, CartItemDetailsProps } from '../CartItemDetails/CartItemDetails';
import { CartItemQuantityButton, CartItemQuantityButtonProps } from '../CartItemQuantityButton/CartItemQuantityButton';
import { CartItemType } from '../types';
import { AnyObject, Currency } from '../../../types';

export interface CartItemProps<ID = unknown, T extends AnyObject = AnyObject> {
    item: CartItemType<ID, T>;
    index: number;
    currency?: Currency;
    plusDisabled?: boolean;
    withBadge?: boolean;
    defaultImage?: string;
    className?: string;
    imageComponent?: React.ComponentType<CartItemImageProps<ID, T>>;
    detailsComponent?: React.ComponentType<CartItemDetailsProps<ID, T>>;
    quantityButtonComponent?: React.ComponentType<CartItemQuantityButtonProps<ID, T>>;
    onPlus: (item: CartItemType<ID, T>) => void;
    onMinus: (item: CartItemType<ID, T>) => void;
    onRemove?: (item: CartItemType<ID, T>) => void;
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

export const CartItem = React.memo(CartItemComponent) as typeof CartItemComponent;
