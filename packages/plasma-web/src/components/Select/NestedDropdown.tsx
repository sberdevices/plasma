import React, { FC, useCallback, useState } from 'react';

import { DropdownItem as DropdownItemType, DropdownNode } from '../Dropdown/Dropdown.types';
import { DropdownItem } from '../Dropdown';

import { SelectDropdown } from './SelectDropdown';

export interface NestedDropdownProps {
    item: DropdownNode;
    id: string;
    onItemClick?: (item: DropdownItemType) => void;
    isHovered?: boolean;
    onActiveChange?: (id: string) => void;
    onClose?: () => void;
    multiselect?: boolean;
}

export const NestedDropdown: FC<NestedDropdownProps> = ({
    item,
    onItemClick,
    id,
    isHovered,
    onActiveChange,
    onClose,
    multiselect,
}) => {
    const [isOpen, setOpen] = useState(false);
    const handleToggle = useCallback(
        (wasOpen) => {
            if (!wasOpen) {
                onClose?.();
            }
            setOpen(wasOpen);
        },
        [onClose],
    );
    return (
        <SelectDropdown
            key={item.value}
            trigger="hover"
            placement="right"
            items={item.items || []}
            onItemClick={onItemClick}
            multiselect={multiselect}
            onActiveChange={onActiveChange}
            onToggle={handleToggle}
            isOpen={isOpen}
            listId={id}
            isNested
            disclosure={
                <DropdownItem
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    role="combobox"
                    aria-label={item.label}
                    aria-controls={id}
                    isHovered={isHovered}
                    {...item}
                />
            }
        />
    );
};
