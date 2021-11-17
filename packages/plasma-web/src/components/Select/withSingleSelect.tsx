import React, { forwardRef, useCallback, useMemo } from 'react';
import type { ComponentType, RefAttributes } from 'react';

import { flattenItemsRecursive, setActiveRecursive } from './Select.utils';
import type { SelectRefElement, SelectViewProps } from './Select.types';

export interface SingleSelectProps extends Omit<SelectViewProps, 'onItemClick' | 'value' | 'label' | 'multiselect'> {
    /**
     * Значение контрола.
     */
    value: string | number | null;
    /**
     * Обработчик изменения значения.
     */
    onChange?: (value: string | number | null) => void;
}

/**
 * Выпадающий список с возможностью выбора одного значения.
 */
export const withSingleSelect = (View: ComponentType<SelectViewProps & RefAttributes<SelectRefElement>>) =>
    forwardRef<SelectRefElement, SingleSelectProps>(({ value, items = [], onChange, ...rest }, ref) => {
        const isActive = useCallback((item) => item.value === value, [value]);

        const viewValue = useMemo(() => flattenItemsRecursive(items).find(isActive)?.label ?? '', [
            value,
            items,
            isActive,
        ]);

        const viewItems = useMemo(() => setActiveRecursive(items, isActive), [value, items, isActive]);

        const onItemClick = useCallback((item) => onChange?.(item.value), [onChange]);

        return <View ref={ref} value={viewValue} items={viewItems} onItemClick={onItemClick} {...rest} />;
    });
