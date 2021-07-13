import React from 'react';

import { flattenItemsRecursive, setActiveRecursive } from './Select.utils';
import { SelectView, SelectViewProps, RefElement } from './SelectView';

export interface MultiSelectProps extends Omit<SelectViewProps, 'value'> {
    value: Array<string | number> | null;
    separator?: string;
    onChange?: (value: Array<string | number>) => void;
}

/**
 * Выпадающий список с возможностью выбора нескольких значений.
 */
export const MultiSelect = React.forwardRef<RefElement, MultiSelectProps>(
    ({ value, items = [], separator = ', ', onChange, ...rest }, ref) => {
        const isActive = React.useCallback((item) => Boolean(value && value.includes(item.value)), [value]);

        const viewValue = React.useMemo(
            () =>
                flattenItemsRecursive(items)
                    .filter(isActive)
                    .map((item) => item.label)
                    .join(separator),
            [value, items, isActive],
        );

        const viewItems = React.useMemo(() => setActiveRecursive(items, isActive), [value, items, isActive]);

        const onItemClick = React.useCallback(
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

        return <SelectView ref={ref} value={viewValue} items={viewItems} onItemClick={onItemClick} {...rest} />;
    },
);
