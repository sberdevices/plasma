import React from 'react';
import styled, { css } from 'styled-components';
import { addFocus, Badge, mediaQuery } from '@sberdevices/plasma-ui';
import { colors } from '@sberdevices/plasma-tokens';

import { CartItemType } from '../types';
import { AnyObject } from '../../../types';

export interface CartItemImageProps<ID = unknown, T extends AnyObject = AnyObject> {
    item: CartItemType<ID, T>;
    index: number;
    withBadge?: boolean;
    className?: string;
    defaultImage?: string;
    onClick?: (item: CartItemType<ID, T>) => void;
}

const StyledImageContainer = styled.div`
    position: relative;
    height: 4rem;
    width: 4rem;
    border-radius: 0.75rem;

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
    border-radius: 0.75rem;
`;

const StyledBadge = styled(Badge)`
    position: absolute;
    top: 5px;
    right: 5px;

    background: ${colors.blackSecondary};

    ${mediaQuery(
        'S',
        1,
    )(css`
        top: 3px;
        right: 3px;
    `)}
`;

export function CartItemImage<ID = unknown, T extends AnyObject = AnyObject>({
    index,
    item,
    withBadge,
    defaultImage = '',
    className,
    onClick,
}: CartItemImageProps<ID, T>) {
    const [isDefault, setDefault] = React.useState(!item.imageSrc);

    const clickHandler = React.useCallback(() => onClick?.(item), [onClick, item]);

    const keyDownHandler = React.useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onClick?.(item);
        }
    }, []);

    const src = isDefault ? defaultImage : item.imageSrc;

    return (
        <StyledImageContainer
            className={className}
            onClick={clickHandler}
            onKeyDown={keyDownHandler}
            data-cy="CartItemImage"
            data-focusable
            data-name={`cart-item-image-${item.id}`}
            tabIndex={0}
        >
            {src && <StyledImage src={src} onError={() => setDefault(true)} />}
            {withBadge && <StyledBadge size="s" text={`${index + 1}`} />}
        </StyledImageContainer>
    );
}
