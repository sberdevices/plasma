import { useCallback } from 'react';

export interface UseStepperProps {
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
     * Обработчик изменения значения счетчика
     */
    onChange?: (value: number) => void;
}

export const useStepper = ({ value, step = 1, min = 0, max = Infinity, onChange }: UseStepperProps) => {
    const onLessClick = useCallback(() => onChange?.(value - step), [value, step, onChange]);
    const onMoreClick = useCallback(() => onChange?.(value + step), [value, step, onChange]);
    const isMin = value <= min;
    const isMax = value >= max;
    const isLessDisabled = isMin || value - step < min;
    const isMoreDisabled = isMax || value + step > max;

    return {
        onLessClick,
        onMoreClick,
        isMin,
        isMax,
        isLessDisabled,
        isMoreDisabled,
    };
};
