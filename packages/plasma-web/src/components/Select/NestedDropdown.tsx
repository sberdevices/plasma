import React, { useState } from 'react';

import { DropdownItem as DropdownItemType, DropdownNode } from '../Dropdown/Dropdown.types';
import { DropdownItem } from '../Dropdown';

import { SelectDropdown } from './SelectDropdown';

export const NestedDropdown = ({
    lastFocus,
    item,
    onItemClick,
    id,
    isHovered,
}: {
    lastFocus: React.MutableRefObject<HTMLElement | null>;
    item: DropdownNode;
    id: string;
    onItemClick?: (item: DropdownItemType) => void;
    isHovered?: boolean;
}) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);

    return (
        <SelectDropdown
            previousFocus={lastFocus}
            key={item.value}
            trigger="click"
            placement="right"
            items={item.items || []}
            onItemClick={onItemClick}
            onActiveChange={setSelectedItem}
            onToggle={setOpen}
            isOpen={isOpen}
            listId={id}
            isNested
            disclosure={
                <DropdownItem
                    aria-activedescendant={selectedItem}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    role="combobox"
                    aria-controls={id}
                    isHovered={isHovered}
                    {...item}
                />
            }
        />
    );
};
