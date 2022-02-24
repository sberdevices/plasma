import React, { FC, useState } from 'react';

import { DropdownItem as DropdownItemType, DropdownNode } from './Dropdown.types';
import { DropdownItem } from './DropdownItem';
import { Dropdown } from './Dropdown';

export interface NestedDropdownProps {
    item: DropdownNode;
    id: string;
    onItemClick?: (item: DropdownItemType) => void;
    isHovered?: boolean;
    onActiveChange?: (id: string) => void;
    onClose?: () => void;
    multiselect?: boolean;
    itemId: string;
}

export const NestedDropdown: FC<NestedDropdownProps> = ({
    item,
    onItemClick,
    id,
    isHovered,
    onActiveChange,
    onClose,
    multiselect,
    itemId,
}) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Dropdown
            key={item.value}
            trigger="hover"
            placement="right"
            items={item.items!}
            onItemClick={onItemClick}
            onActiveChange={onActiveChange}
            onToggle={(isOpen) => {
                if (!isOpen) {
                    onClose?.();
                }
                setOpen(isOpen);
            }}
            listId={id}
            isNested
            multiselect={multiselect}
        >
            <DropdownItem
                id={itemId}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                role="combobox"
                aria-label={item.label}
                aria-controls={id}
                isHovered={isHovered}
                {...item}
            />
        </Dropdown>
    );
};
