import React from 'react';

import { flattenItemsRecursive, setActiveRecursive } from './SelectList';
import { SelectView, SelectViewProps } from './SelectView';

export interface SingleSelectProps extends Omit<SelectViewProps, 'label'> {
    value: string | number | null;
    onChange?: (item: string | number) => void;
}

/**
 * Выпадающий список с возможностью выбора одного значения.
 */
export const SingleSelect = React.forwardRef<HTMLDivElement, SingleSelectProps>(
    ({ value, items, onChange, ...rest }, ref) => {
        const viewLabel = React.useMemo(
            () => flattenItemsRecursive(items).find((item) => value === item.value)?.label,
            [value, items],
        );
        const viewItems = React.useMemo(
            () => setActiveRecursive(items, (item) => ({ ...item, isActive: value === item.value })),
            [value, items],
        );
        const onItemClick = React.useCallback((item) => onChange?.(item.value), [onChange]);

        return <SelectView ref={ref} label={viewLabel} items={viewItems} onItemClick={onItemClick} {...rest} />;
    },
);
