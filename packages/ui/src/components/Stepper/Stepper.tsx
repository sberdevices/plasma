import React from 'react';
import { IconMinus, IconPlus, IconTrash } from '@sberdevices/plasma-icons';

import { PickOptional } from '../../types';

import { StepperButton, StepperButtonProps } from './StepperButton';
import { StepperRoot } from './StepperRoot';
import { StepperValue } from './StepperValue';

interface RemoverProps {
    /**
     * При достижении минимального количества, кнопка минус превратится в удалить
     */
    remover: true;
    /**
     * Обработчик клика по кнопке удаления
     */
    onRemove: React.MouseEventHandler<HTMLButtonElement>;
}
interface NoRemoverProps {
    remover?: false;
}

export type StepperProps = (RemoverProps | NoRemoverProps) &
    PickOptional<StepperButtonProps, 'onFocus' | 'onBlur'> &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onFocus' | 'onBlur'> & {
        /**
         * Числовое значение
         */
        value: number;
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
         * Обработчик изменения значения счетчика
         */
        onChange: (value: number) => void;
    };

/**
 * Готовый компонент для создания счетчика, подобного ``input[type="range"]``.
 */
export const Stepper: React.FC<StepperProps> = ({
    value,
    step = 1,
    min = 0,
    max = Infinity,
    disabled,
    onChange,
    onFocus,
    onBlur,
    ...props
}) => {
    const { remover, onRemove, ...rest } = props as RemoverProps;
    const onLessClick = React.useCallback(() => onChange(value - step), [value, step, onChange]);
    const onMoreClick = React.useCallback(() => onChange(value + step), [value, step, onChange]);
    const onRemoveClick = React.useCallback((e) => onRemove?.(e), [onRemove]);
    const isMin = value <= min;
    const isMax = value >= max;
    const lessDisabled = isMin || value - step < min;
    const moreDisabled = isMax || value + step > max;

    return (
        <StepperRoot {...rest}>
            <StepperButton
                disabled={disabled || (!remover && lessDisabled)}
                icon={isMin && remover ? <IconTrash color="inherit" /> : <IconMinus color="inherit" />}
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
