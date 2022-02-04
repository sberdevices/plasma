import React from 'react';
import styled from 'styled-components';
import { IconCart } from '@sberdevices/plasma-icons';
import { Badge, Button, Price } from '@sberdevices/plasma-ui';

import { Currency } from '../../../types';

interface CartHeaderButtonProps {
    /** Сумма корзины */
    amount: number;
    /** Количество позиций в корзине */
    quantity: number;
    /** Валюта корзины */
    currency?: Currency;
    /** При установленом флаге отображает кнопку с суммой корзины */
    withPrice?: boolean;
    /** Название кнопки, если установлен флаг `withPrice` и сумма корзины больше 0 игнорируется */
    label?: string;
    /** Флаг определяет отображение кнопки, если корзина пустая */
    hideEmpty?: boolean;
    /** Колбэк вызываемый при клике по кнопке */
    onClick?: () => void;
}

const StyledBadge = styled(Badge)`
    position: absolute;
    left: 0.75rem;
    top: -8px;
`;

const StyledIconCount = styled.div`
    position: relative;
`;

/** Компонент предназначен для отображения кнопки корзины в заголовке приложения */
export const CartHeaderButton: React.FC<CartHeaderButtonProps> = ({
    quantity,
    amount,
    currency,
    withPrice,
    label,
    hideEmpty,
    onClick,
}) => {
    if (hideEmpty && !quantity) {
        return null;
    }

    return (
        <Button
            contentLeft={
                <StyledIconCount>
                    {quantity > 0 && <StyledBadge text={String(quantity)} size="s" view="primary" circled />}
                    <IconCart />
                </StyledIconCount>
            }
            text={withPrice && amount > 0 ? <Price currency={currency}>{amount}</Price> : label}
            view="clear"
            size="s"
            onClick={onClick}
        />
    );
};
