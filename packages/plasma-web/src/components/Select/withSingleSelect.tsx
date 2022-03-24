import React, { forwardRef, useCallback, useMemo } from 'react';
import type { ComponentType, RefAttributes } from 'react';

import { flattenItemsRecursive, setActiveRecursive } from './Select.utils';
import type { SelectRefElement } from './SelectButton';
import type { SelectViewProps } from './SelectView';

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

        const onItemSelect = useCallback((item) => onChange?.(item.value), [onChange]);

        return <View {...rest} ref={ref} value={viewValue} items={viewItems} onItemSelect={onItemSelect} />;
    });
