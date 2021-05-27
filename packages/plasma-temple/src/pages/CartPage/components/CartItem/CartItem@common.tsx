import React from 'react';
import { css } from 'styled-components';
import { IconClose, IconMinus, IconPlus } from '@sberdevices/plasma-icons';
import { secondary, white } from '@sberdevices/plasma-tokens';
import { StepperButton, StepperRoot, StepperValue } from '@sberdevices/plasma-ui';
import { isSberBox } from '@sberdevices/plasma-ui/utils';

import { Currency } from '../../../../types';
import { useCart } from '../../hooks';
import { useThrottledCallback } from '../../../../hooks';
import { CartItem } from '../../types';
import { useGetMutableValue } from '../../../../hooks/useGetMutableValue';
import { THROTTLE_WAIT } from '../../../../hooks/useThrottledCallback';

export interface CartItemProps {
    item: CartItem;
    active: boolean;
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
    active: boolean;
    className?: string;
}> = React.memo(({ id, quantity, active, className }) => {
    const plusRef = React.useRef<HTMLButtonElement>(null);
    const minusRef = React.useRef<HTMLButtonElement>(null);

    const { removeItem, changeItemQuantity } = useCart();
    const getQuantity = useGetMutableValue(quantity);

    const onPlus = useThrottledCallback(() => changeItemQuantity(id, getQuantity() + 1), [
        id,
        changeItemQuantity,
        getQuantity,
    ]);

    const onMinus = useThrottledCallback(() => changeItemQuantity(id, getQuantity() - 1), [
        id,
        changeItemQuantity,
        getQuantity,
    ]);

    const onRemove = useThrottledCallback(() => removeItem(id), [id, removeItem]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (
                isSberBox() &&
                active &&
                (document.activeElement !== plusRef.current || document.activeElement !== minusRef.current)
            ) {
                plusRef.current?.focus();
            }
        }, THROTTLE_WAIT);

        return () => clearTimeout(timer);
    }, [active]);

    const isMin = quantity <= 0;

    return (
        <StepperRoot className={className}>
            <StepperButton
                ref={minusRef}
                icon={isMin ? <IconClose color="inherit" size="xs" /> : <IconMinus color="inherit" size="xs" />}
                view={isMin ? 'critical' : 'secondary'}
                onClick={isMin ? onRemove : onMinus}
            />
            <StepperValue value={quantity} />
            <StepperButton ref={plusRef} icon={<IconPlus color="inherit" size="xs" />} onClick={onPlus} />
        </StepperRoot>
    );
});
