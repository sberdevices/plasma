import React from 'react';
import styled, { css } from 'styled-components';

import type { AsProps } from '../../types';
import { formatCurrency } from '../../utils';

export interface PriceProps extends React.HTMLAttributes<HTMLSpanElement>, AsProps {
    /**
     * Значение контрола.
     */
    children: number;
    /**
     * Валюта.
     */
    currency?: 'rub' | 'usd' | 'eur';
    /**
     * Перечеркнутый текст (старая цена, например).
     */
    stroke?: boolean;
    /**
     * Минимальное количество цифр после десятичного разделителя.
     */
    minimumFractionDigits?: number;
}

interface StyledPriceProps {
    $stroke?: boolean;
}

const StyledPrice = styled.span<StyledPriceProps>`
    ${({ $stroke }) =>
        $stroke &&
        css`
            text-decoration: line-through;
        `};
`;

/**
 * Компонент для отображения цены / стоимости / суммы.
 */
export const Price: React.FC<PriceProps> = ({
    children,
    currency = 'rub',
    minimumFractionDigits = 0,
    stroke = false,
    ...rest
}) => (
    <StyledPrice $stroke={stroke} {...rest}>
        {formatCurrency(children, currency, minimumFractionDigits)}
    </StyledPrice>
);
