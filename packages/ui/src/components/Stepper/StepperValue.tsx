import React from 'react';
import styled, { css } from 'styled-components';
import { body2, text, warning, scalingPixelBasis } from '@sberdevices/plasma-tokens';

interface StyledValueProps {
    /**
     * Неактивное состояние: состояние, при котором компонент отображается, но недоступен для действий пользователя
     */
    disabled?: boolean;
    /**
     * Состояние, когда значение контрола близко к предельному
     */
    isWarning?: boolean;
}

const StyledValue = styled.span<StyledValueProps>`
    ${body2}

    box-sizing: border-box;

    margin-left: ${12 / scalingPixelBasis}rem;
    margin-right: ${12 / scalingPixelBasis}rem;
    min-width: ${20 / scalingPixelBasis}rem;

    color: ${text};

    text-align: center;

    ${({ isWarning }) =>
        isWarning &&
        css`
            color: ${warning};
        `}

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.4;
        `}
`;

export interface StepperValueProps
    extends React.HTMLAttributes<HTMLDivElement>,
        Pick<StyledValueProps, 'disabled' | 'isWarning'> {
    /**
     * Выводимое значение
     */
    value: number;
}

export const StepperValue: React.FC<StepperValueProps> = ({ value, disabled, isWarning, ...rest }) => (
    <StyledValue disabled={disabled} isWarning={isWarning} {...rest}>
        {value}
    </StyledValue>
);
