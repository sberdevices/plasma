import React, { useState } from 'react';

import { DropdownItem as DropdownItemType, DropdownNode } from './Dropdown.types';
import { DropdownItem } from './DropdownItem';
import { Dropdown } from './Dropdown';

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
        <Dropdown
            previousFocus={lastFocus}
            key={item.value}
            trigger="hover"
            placement="right"
            items={item.items!}
            onItemClick={onItemClick}
            onActiveChange={setSelectedItem}
            onToggle={setOpen}
            listId={id}
            isNested
            data-cy={`popup-${id}`}
        >
            <DropdownItem
                aria-activedescendant={selectedItem}
                aria-expanded={isOpen}
                id={`combobox1-${id}`}
                aria-haspopup="listbox"
                role="combobox"
                aria-controls={id}
                isHovered={isHovered}
                {...item}
            />
        </Dropdown>
    );
};
