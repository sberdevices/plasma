import React from 'react';
import { IconMinus, IconPlus, IconClose } from '@sberdevices/plasma-icons';
import type { PickOptional } from '@sberdevices/plasma-core';

import { StepperButton, StepperButtonProps } from './StepperButton';
import { StepperRoot } from './StepperRoot';
import { StepperValue } from './StepperValue';
import { useStepper } from './Stepper.hooks';
import type { UseStepperProps } from './Stepper.hooks';

interface RemoverProps {
    /**
     * При достижении минимального количества, кнопка минус превратится в удалить
     */
    showRemove: true;
    /**
     * Обработчик клика по кнопке удаления
     */
    onRemove: React.MouseEventHandler<HTMLButtonElement>;
}
interface NoRemoverProps {
    showRemove?: false;
}

export type StepperProps = UseStepperProps &
    (RemoverProps | NoRemoverProps) &
    PickOptional<StepperButtonProps, 'pin' | 'onFocus' | 'onBlur'> &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onFocus' | 'onBlur'> & {
        /**
         * Неактивное состояние: состояние, при котором компонент отображается, но недоступен для действий пользователя
         */
        disabled?: boolean;
        /**
         * Функция для форматирования отображаемого значения
         */
        formatter?: (value: number) => string;
        /**
         * ARIA атрибут для кнопки увеличения значения
         */
        ariaLabelIncrement?: string;
        /**
         * ARIA атрибут для кнопки удаления
         */
        ariaLabelRemove?: string;
        /**
         * ARIA атрибут для кнопки уменьшения значения
         */
        ariaLabelDecrement?: string;
    };

/**
 * Готовый компонент для создания счетчика, подобного ``input[type="range"]``.
 */
export const Stepper: React.FC<StepperProps> = ({
    value,
    step,
    min,
    max,
    disabled,
    pin,
    onChange,
    onFocus,
    onBlur,
    formatter,
    ariaLabelDecrement,
    ariaLabelIncrement,
    ariaLabelRemove,
    ...props
}) => {
    const { onLessClick, onMoreClick, isMin, isMax, isLessDisabled, isMoreDisabled } = useStepper({
        value,
        step,
        min,
        max,
        onChange,
    });
    const { showRemove: remover, onRemove, ...rest } = props as RemoverProps;
    const onRemoveClick = React.useCallback((e) => onRemove?.(e), [onRemove]);

    return (
        <StepperRoot {...rest}>
            <StepperButton
                aria-label={isMin && remover ? ariaLabelRemove : ariaLabelDecrement}
                disabled={disabled || (!remover && isLessDisabled)}
                icon={
                    isMin && remover ? <IconClose color="inherit" size="xs" /> : <IconMinus color="inherit" size="xs" />
                }
                view={isMin && remover ? 'critical' : 'secondary'}
                pin={pin}
                onClick={isMin && remover ? onRemoveClick : onLessClick}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <StepperValue value={value} disabled={disabled} showWarning={isMax} formatter={formatter} />
            <StepperButton
                aria-label={ariaLabelIncrement}
                disabled={disabled || isMoreDisabled}
                icon={<IconPlus color="inherit" size="xs" />}
                pin={pin}
                onClick={onMoreClick}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </StepperRoot>
    );
};
