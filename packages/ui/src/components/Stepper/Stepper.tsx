import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { typography, colors } from 'plasma-tokens';

import { Button, ButtonProps } from '../Button/Button';
import { Icon } from '../Icon/Icon';

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
    box-sizing: border-box;
    margin-left: 0.375em;
    margin-right: 0.375em;

    color: ${colors.text};

    ${typography.body2}

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
    extends Pick<
        ButtonProps,
        'pin' | 'size' | 'view' | 'disabled' | 'className' | 'style' | 'onFocus' | 'onBlur' | 'onClick'
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
    size = 's',
    view = 'secondary',
    disabled,
    icon,
    className,
    style,
    onFocus,
    onBlur,
    onClick,
}) => (
    <Button
        className={className}
        style={style}
        pin={pin}
        view={view}
        size={size}
        disabled={disabled}
        contentLeft={icon || <Icon icon="minus" />}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
    />
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
    step = 1,
    min = 0,
    max = Infinity,
    disabled,
    onChange,
    onFocus,
    onBlur,
}) => {
    const onLessClick = useCallback(() => onChange(value - step), [value, step]);
    const onMoreClick = useCallback(() => onChange(value + step), [value, step]);
    const lessDisabled = disabled || value <= min || value - step < min;
    const moreDisabled = disabled || value >= max || value + step > max;
    const isWarning = value >= max;

    return (
        <StepperRoot>
            <StepperButton
                disabled={lessDisabled}
                icon={<Icon icon="minus" />}
                onClick={onLessClick}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <StepperValue value={value} disabled={disabled} isWarning={isWarning} />
            <StepperButton
                disabled={moreDisabled}
                icon={<Icon icon="plus" />}
                onClick={onMoreClick}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </StepperRoot>
    );
};
