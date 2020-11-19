import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { typography, colors, scalingPixelBasis } from '@sberdevices/plasma-tokens';
import { IconMinus, IconPlus, IconTrash } from '@sberdevices/plasma-icons';

import { PickOptional } from '../../types/PickOptional';
import { ActionButton, ButtonProps } from '../Button';

const StyledRoot = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
`;

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
    ${typography.body2}

    box-sizing: border-box;

    margin-left: ${12 / scalingPixelBasis}rem;
    margin-right: ${12 / scalingPixelBasis}rem;
    min-width: ${20 / scalingPixelBasis}rem;

    color: ${colors.text};

    text-align: center;

    ${({ isWarning }) =>
        isWarning &&
        css`
            color: ${colors.warning};
        `}

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.4;
        `}
`;

export interface StepperButtonProps
    extends PickOptional<
        ButtonProps,
        'pin' | 'view' | 'disabled' | 'className' | 'style' | 'onFocus' | 'onBlur' | 'onClick'
    > {
    icon?: React.ReactElement;
}

export interface StepperValueProps extends Pick<StyledValueProps, 'disabled' | 'isWarning'> {
    /**
     * Выводимое значение
     */
    value: number;
}

export const StepperRoot = StyledRoot;

export const StepperButton: React.FC<StepperButtonProps> = ({
    pin = 'circle-circle',
    view = 'secondary',
    icon,
    ...rest
}) => (
    <ActionButton size="m" pin={pin} view={view} {...rest}>
        {icon}
    </ActionButton>
);

export const StepperValue: React.FC<StepperValueProps> = ({ value, disabled, isWarning }) => (
    <StyledValue disabled={disabled} isWarning={isWarning}>
        {value}
    </StyledValue>
);

export interface StepperProps {
    /**
     * Числовое значение
     */
    value: number;
    /**
     * Обработчик изменения значения счетчика
     */
    onChange: (value: number) => void;
    /**
     * Шаг изменения значения
     */
    step?: number;
    /**
     * Минимальное значение
     */
    min?: number;
    /**
     * Максимальное значение
     */
    max?: number;
    /**
     * Неактивное состояние: состояние, при котором компонент отображается, но недоступен для действий пользователя
     */
    disabled?: boolean;
    /**
     * При достижении минимального количества, кнопка минус превратится в удалить
     */
    remover?: boolean;
    onRemove?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * Обработчик фокуса по кнопкам +/-
     */
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    /**
     * Обработчик ухода фокуса от кнопок +/-
     */
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}

export const Stepper: React.FC<StepperProps> = ({
    value,
    remover,
    step = 1,
    min = 0,
    max = Infinity,
    disabled,
    onChange,
    onFocus,
    onBlur,
    onRemove,
}) => {
    const onLessClick = useCallback(() => onChange(value - step), [value, step, onChange]);
    const onMoreClick = useCallback(() => onChange(value + step), [value, step, onChange]);
    const onRemoveClick = useCallback((e) => onRemove?.(e), [onRemove]);
    const isMin = value <= min;
    const isMax = value >= max;
    const lessDisabled = isMin || value - step < min;
    const moreDisabled = isMax || value + step > max;

    return (
        <StepperRoot>
            <StepperButton
                disabled={disabled || (!remover && lessDisabled)}
                icon={isMin && remover ? <IconTrash /> : <IconMinus />}
                view={isMin && remover ? 'critical' : 'secondary'}
                onClick={isMin && remover ? onRemoveClick : onLessClick}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <StepperValue value={value} disabled={disabled} isWarning={isMax} />
            <StepperButton
                disabled={disabled || moreDisabled}
                icon={<IconPlus />}
                onClick={onMoreClick}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </StepperRoot>
    );
};
