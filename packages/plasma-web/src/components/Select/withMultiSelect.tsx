import React, { forwardRef, useCallback, useMemo } from 'react';
import type { ComponentType, RefAttributes } from 'react';

import { flattenItemsRecursive, setActiveRecursive } from './Select.utils';
import type { SelectRefElement } from './SelectButton';
import type { SelectViewProps } from './SelectView';

export interface MultiSelectProps extends Omit<SelectViewProps, 'onItemClick' | 'value' | 'label' | 'multiselect'> {
    /**
     * Значение контрола.
     */
    value: Array<string | number> | null;
    /**
     * Разделитель выбранных значений.
     */
    separator?: string;
    /**
     * Обработчик изменения значения.
     */
    onChange?: (value: Array<string | number> | null) => void;
}

/**
 * Выпадающий список с возможностью выбора нескольких значений.
 */
export const withMultiSelect = (View: ComponentType<SelectViewProps & RefAttributes<SelectRefElement>>) =>
    forwardRef<SelectRefElement, MultiSelectProps>(
        ({ value, items = [], separator = ', ', onChange, ...rest }, ref) => {
            const isActive = useCallback((item) => Boolean(value && value.includes(item.value)), [value]);

            const viewValue = useMemo(
                () =>
                    flattenItemsRecursive(items)
                        .filter(isActive)
                        .map((item) => item.label)
                        .join(separator),
                [value, items, isActive],
            );

            const viewItems = useMemo(() => setActiveRecursive(items, isActive), [value, items, isActive]);

            const onItemSelect = useCallback(
                (item) => {
                    const set = new Set(value);

                    if (set.has(item.value)) {
                        set.delete(item.value);
                    } else {
                        set.add(item.value);
                    }

                    onChange?.(Array.from(set));
                },
                [onChange],
            );

            return <View {...rest} ref={ref} value={viewValue} items={viewItems} onItemSelect={onItemSelect} />;
        },
    );
