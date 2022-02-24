import React, { FC, useRef, useState, useCallback, useEffect, RefAttributes } from 'react';
import styled, { css } from 'styled-components';
import { useKeyboardNavigation } from '@sberdevices/plasma-core';

import { PickOptional as Optional } from '../../types';
import { Popup, PopupProps } from '../Popup';

import { DropdownList } from './DropdownList';
import { DropdownItem } from './DropdownItem';
import { DropdownNode as DropdownNodeType, DropdownItem as DropdownItemType } from './Dropdown.types';
import { NestedDropdown } from './NestedDropdown';

export interface DropdownProps
    extends Omit<PopupProps, 'isOpen' | 'offset' | 'placement' | 'trigger' | 'children'>,
        Optional<PopupProps, 'placement' | 'trigger'> {
    /**
     * Отступ сверху.
     */
    offsetTop?: string | number;
    /**
     * Список элементов.
     */
    items: Array<DropdownNodeType>;
    /**
     * Обработчик клика по айтему.
     */
    onItemClick?: (item: DropdownItemType) => void;

    /**
     * id для listbox(контейнера для опций). Используется для a11y
     */
    listId?: string;

    onActiveChange?: (id: string) => void;

    isNested?: boolean;

    /**
     * Возможность множественного выбора
     */
    multiselect?: boolean;
}

const StyledPopup = styled(Popup)<Pick<DropdownProps, 'offsetTop'> & RefAttributes<HTMLDivElement>>`
    ${({ placement, offsetTop }) =>
        placement === 'bottom'
            ? css`
                  --plasma-popup-padding: ${offsetTop} 0 0;
              `
            : css`
                  --plasma-popup-padding: 0;
                  width: 100%;
              `}
`;

/**
 * Выпадающий список.
 */
export const Dropdown: FC<DropdownProps> = ({
    children,
    offsetTop,
    placement = 'bottom',
    trigger = 'click',
    items,
    onItemClick: onItemClickExternal,
    onToggle: onToggleExternal,
    listId,
    onActiveChange,
    isNested,
    multiselect,
    ...rest
}) => {
    const hasItems = Array.isArray(items) && items.length > 0;
    const oldIsOpen = useRef<boolean | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const onItemClick = useCallback(
        (item) => {
            if (!multiselect) {
                setIsOpen(false);
            }
            onItemClickExternal?.(item);
        },
        [onItemClickExternal],
    );

    const onToggle = useCallback(
        (newIsOpen) => {
            if (hasItems) {
                setIsOpen(newIsOpen);
            }
        },
        [hasItems],
    );

    useEffect(() => {
        if (oldIsOpen.current !== null && oldIsOpen.current !== isOpen) {
            onToggleExternal?.(isOpen);
        }
        oldIsOpen.current = isOpen;
    }, [isOpen, onToggleExternal]);

    const [openedNestedDropdown, setOpenedNestedDropdown] = useState<boolean | number>(false);

    const { popupRef, dropdownListRef, activeIndex, changeActiveIndex } = useKeyboardNavigation({
        isOpen,
        setIsOpen,
        items,
        onActiveChange,
        onItemClick,
        isNested,
        openedNestedDropdown,
        setOpenedNestedDropdown,
        multiselect,
        listId,
    });

    return (
        <StyledPopup
            isOpen={isOpen}
            trigger={trigger}
            placement={placement}
            disclosure={children}
            offsetTop={offsetTop}
            onToggle={onToggle}
            ref={popupRef}
            {...rest}
        >
            <DropdownList id={listId} role="menu" ref={dropdownListRef}>
                {items.map((item, idx) =>
                    item.items && item.items.length ? (
                        <NestedDropdown
                            item={item}
                            id={`${listId}-${idx}`}
                            isHovered={idx === activeIndex}
                            onActiveChange={onActiveChange}
                            onItemClick={onItemClick}
                            multiselect={multiselect}
                            onClose={() => {
                                if (openedNestedDropdown === idx) {
                                    setOpenedNestedDropdown(false);
                                }
                            }}
                            itemId={`${listId}-${item.value}`}
                        />
                    ) : (
                        <DropdownItem
                            id={`${listId}-${item.value}`}
                            multiselect={multiselect}
                            isHovered={idx === activeIndex}
                            key={item.value}
                            onHover={() => changeActiveIndex(idx)}
                            onClick={onItemClick}
                            {...item}
                        />
                    ),
                )}
            </DropdownList>
        </StyledPopup>
    );
};
