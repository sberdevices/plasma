import React, { HTMLAttributes, FC } from 'react';

import { DropdownSelfControlledPopup } from './DropdownPopup';
import { DropdownList } from './DropdownList';
import { DropdownItem } from './DropdownItem';
import type { DropdownNode, OnItemSelect } from './Dropdown.types';

export interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
    /**
     * Список элементов.
     */
    items: Array<DropdownNode>;
    /**
     * Индекс айтема, который нужно подсветить.
     */
    hoverIndex?: number;
    /**
     * WAI-ARIA role элемента меню.
     */
    itemRole?: string;
    /**
     * Обработчик выбора айтема.
     */
    onItemSelect?: OnItemSelect;
    children?: never;
}

/**
 * Меню дропдауна, выводящее текущий список и все вложенные в него списки в попапах.
 */
export const DropdownMenu: FC<DropdownMenuProps> = ({
    id,
    items,
    hoverIndex,
    itemRole,
    onItemSelect,
    role = 'menu',
    ...rest
}) => {
    return (
        <DropdownList {...rest} id={id} role={role}>
            {items.map((item, i) =>
                item.items && item.items.length ? (
                    <DropdownSelfControlledPopup
                        role="presentation"
                        key={item.value}
                        id={id ? `${id}-nested-${i}` : id}
                        trigger="hover"
                        placement="right"
                        disclosure={
                            <DropdownItem
                                {...item}
                                id={id ? `${id}-item-${i}` : id}
                                role={itemRole}
                                isHovered={i === hoverIndex}
                                onClick={onItemSelect}
                            />
                        }
                    >
                        <DropdownMenu items={item.items} onItemSelect={onItemSelect} />
                    </DropdownSelfControlledPopup>
                ) : (
                    <DropdownItem
                        {...item}
                        key={item.value}
                        id={id ? `${id}-item-${i}` : id}
                        role={itemRole}
                        isHovered={i === hoverIndex}
                        onClick={onItemSelect}
                    />
                ),
            )}
        </DropdownList>
    );
};
