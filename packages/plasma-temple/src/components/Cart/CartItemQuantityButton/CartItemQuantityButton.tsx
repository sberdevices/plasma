import React from 'react';
import styled from 'styled-components';
import { IconClose, IconMinus, IconPlus } from '@sberdevices/plasma-icons';
import { ActionButton, StepperRoot, StepperValue } from '@sberdevices/plasma-ui';
import { primary, warning } from '@sberdevices/plasma-tokens';

import { useGetMutableValue } from '../../../hooks';
import { THROTTLE_WAIT, useThrottledCallback } from '../../../hooks/useThrottledCallback';
import { isSberBoxLike } from '../../../utils';
import { CartItemType } from '../types';
import { AnyObject } from '../../../types';
import { CartItemPresent } from '../CartItemPresent/CartItemPresent';

export interface CartItemQuantityButtonProps<ID = unknown, T extends AnyObject = AnyObject> {
    item: CartItemType<ID, T>;
    className?: string;
    plusDisabled?: boolean;
    onPlus: (item: CartItemType<ID, T>) => void;
    onMinus: (item: CartItemType<ID, T>) => void;
    onRemove?: (item: CartItemType<ID, T>) => void;
}

const throttleWait = isSberBoxLike() ? THROTTLE_WAIT : 0;

const StyledStepperValue = styled(StepperValue)<{ isWarning: boolean }>`
    margin-left: 0.375rem;
    margin-right: 0.375rem;

    color: ${({ isWarning }) => (isWarning ? warning : primary)};
`;

const StyledStepperButton = styled(ActionButton).attrs({
    'data-focusable': true,
    tabIndex: 0,
    view: 'secondary',
    pin: 'circle-circle',
})``;

export function CartItemQuantityButton<ID = unknown, T extends AnyObject = AnyObject>({
    item,
    className,
    plusDisabled,
    onPlus,
    onMinus,
    onRemove,
}: CartItemQuantityButtonProps<ID, T>) {
    const { quantity, quantityLimit, present, disabled } = item;

    const getItem = useGetMutableValue(item);

    const handlePlus = useThrottledCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.stopPropagation();
            onPlus(getItem());
        },
        [getItem, onPlus],
        throttleWait,
    );

    const isMin = quantity <= 0;

    const handleMinus = useThrottledCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.stopPropagation();

            onMinus(getItem());
        },
        [getItem, onMinus],
        throttleWait,
    );

    const handleRemove = useThrottledCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.stopPropagation();
            onRemove?.(getItem());
        },
        [getItem, onRemove],
        throttleWait,
    );

    if (present) {
        return <CartItemPresent />;
    }

    if (disabled && onRemove) {
        return (
            <StyledStepperButton
                onClick={handleRemove}
                data-cy="QuantityButton-remove"
                data-name="cart-item-quantity-button-remove"
            >
                <IconClose color="inherit" size="xs" />
            </StyledStepperButton>
        );
    }

    return (
        <StepperRoot className={className}>
            <StyledStepperButton
                onClick={isMin && onRemove ? handleRemove : handleMinus}
                data-cy="QuantityButton-minus"
                data-name="cart-item-quantity-button-minus"
            >
                {isMin ? <IconClose color="inherit" size="xs" /> : <IconMinus color="inherit" size="xs" />}
            </StyledStepperButton>
            <StyledStepperValue
                value={quantity}
                isWarning={Boolean(item.quantityLimit && item.quantity > item.quantityLimit)}
            />
            <StyledStepperButton
                disabled={plusDisabled || disabled || Boolean(quantityLimit && quantity >= quantityLimit)}
                onClick={handlePlus}
                data-cy="QuantityButton-plus"
                data-name="cart-item-quantity-button-plus"
            >
                <IconPlus color="inherit" size="xs" />
            </StyledStepperButton>
        </StepperRoot>
    );
}
