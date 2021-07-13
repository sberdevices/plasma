import React from 'react';

import { flattenItemsRecursive, setActiveRecursive } from './Select.utils';
import { SelectView, SelectViewProps, RefElement } from './SelectView';

export interface SingleSelectProps extends SelectViewProps {
    onChange?: (value: string | number) => void;
}

/**
 * Выпадающий список с возможностью выбора одного значения.
 */
export const SingleSelect = React.forwardRef<RefElement, SingleSelectProps>(
    ({ value, items = [], onChange, ...rest }, ref) => {
        const isActive = React.useCallback((item) => item.value === value, [value]);

        const viewValue = React.useMemo(() => flattenItemsRecursive(items).find(isActive)?.label ?? '', [
            value,
            items,
            isActive,
        ]);

        const viewItems = React.useMemo(() => setActiveRecursive(items, isActive), [value, items, isActive]);

        const onItemClick = React.useCallback((item) => onChange?.(item.value), [onChange]);

        return <SelectView ref={ref} value={viewValue} items={viewItems} onItemClick={onItemClick} {...rest} />;
    },
);
