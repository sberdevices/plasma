import React from 'react';
import { css } from 'styled-components';
import { IconClose, IconMinus, IconPlus } from '@sberdevices/plasma-icons';
import { secondary, white } from '@sberdevices/plasma-tokens';
import { StepperButton, StepperRoot, StepperValue } from '@sberdevices/plasma-ui';

import { Currency } from '../../../../types';
import { useCart } from '../../hooks';
import { useThrottledCallback } from '../../../../hooks';
import { CartItem } from '../../types';
import { useGetMutableValue } from '../../../../hooks/useGetMutableValue';

export interface CartItemProps {
    item: CartItem;
    index: number;
    setActiveIndex: (index: number) => void;
    currency?: Currency;
}

export const titleMixin = css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const imageContainerMixin = css`
    border-radius: 0.75rem;
    background-color: ${white};
`;

export const priceMixin = css`
    color: ${secondary};
`;

export const QuantityButton: React.FC<{
    id: CartItem['id'];
    quantity: number;
    index: number;
    setActiveIndex: (index: number) => void;
    className?: string;
}> = React.memo(({ id, quantity, index, setActiveIndex, className }) => {
    const { removeItem, changeItemQuantity } = useCart();
    const getQuantity = useGetMutableValue(quantity);

    const onPlus = useThrottledCallback(() => changeItemQuantity(id, getQuantity() + 1), [
        id,
        changeItemQuantity,
        getQuantity,
    ]);

    const isMin = quantity <= 0;

    const onMinus = useThrottledCallback(() => {
        const qty = getQuantity();
        if (qty <= 0) {
            removeItem(id);
        } else {
            changeItemQuantity(id, qty - 1);
        }
    }, [id, removeItem, changeItemQuantity, getQuantity]);

    const handlerFocus = React.useCallback(() => setActiveIndex(index), [index, setActiveIndex]);

    return (
        <StepperRoot className={className}>
            <StepperButton
                icon={isMin ? <IconClose color="inherit" size="xs" /> : <IconMinus color="inherit" size="xs" />}
                view={isMin ? 'critical' : 'secondary'}
                onClick={onMinus}
                onFocus={handlerFocus}
            />
            <StepperValue value={quantity} />
            <StepperButton icon={<IconPlus color="inherit" size="xs" />} onClick={onPlus} onFocus={handlerFocus} />
        </StepperRoot>
    );
});
