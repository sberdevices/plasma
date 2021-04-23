import React from 'react';

import { flattenItemsRecursive, setActiveRecursive } from './SelectList';
import { SelectView, SelectViewProps } from './SelectView';

export interface MultiSelectProps extends Omit<SelectViewProps, 'label'> {
    value: Array<string | number> | null;
    separator?: string;
    onChange?: (items: Array<string | number>) => void;
}

/**
 * Выпадающий список с возможностью выбора нескольких значений.
 */
export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
    ({ value, items, separator = ', ', onChange, ...rest }, ref) => {
        const viewLabel = React.useMemo(
            () =>
                flattenItemsRecursive(items)
                    .filter((item) => value && value.includes(item.value))
                    .map((item) => item.label)
                    .join(separator),
            [value, items],
        );
        const viewItems = React.useMemo(
            () => setActiveRecursive(items, (item) => ({ ...item, isActive: !!value && value.includes(item.value) })),
            [value, items],
        );
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

        return <SelectView ref={ref} label={viewLabel} items={viewItems} onItemClick={onItemClick} {...rest} />;
    },
);
