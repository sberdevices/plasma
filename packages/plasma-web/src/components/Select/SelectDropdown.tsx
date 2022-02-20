import React, { FC, useState, useCallback, RefAttributes, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { PopupProps, useKeyboardNavigation } from '@sberdevices/plasma-core';

import { DropdownList, DropdownItem } from '../Dropdown';
import { Popup } from '../Popup';

import { SelectArrow } from './SelectArrow';
import type { SelectDopdownProps } from './Select.types';
import { NestedDropdown } from './NestedDropdown';

const StyledPopup = styled(Popup)<Pick<PopupProps, 'isOpen'> & RefAttributes<HTMLDivElement>>`
    --plasma-popup-padding: var(--plasma-dropdown-padding) 0 0;
    --plasma-popup-width: 100%;

    display: flex;

    & & {
        --plasma-popup-padding: 0;
        --plasma-popup-margin: calc(var(--plasma-dropdown-padding, 0) * -1) 0 0;

        margin: 0 calc(var(--plasma-dropdown-padding, 0) * -1);
        padding: 0 var(--plasma-dropdown-padding, 0);
    }

    ${({ isOpen }) =>
        isOpen &&
        css`
            ${SelectArrow} {
                transform: rotate(-180deg);
            }
        `}
`;

/**
 * Рендер для вложенного списка селекта.
 */
export const SelectDropdown: FC<SelectDopdownProps> = ({
    items,
    multiselect,
    disabled,
    onItemClick: onItemClickExternal,
    listId,
    onActiveChange,
    isNested,
    isOpen: outerIsOpen,
    onToggle: onToggleExternal,
    ...rest
}) => {
    const [isOpen, setIsOpen] = useState(Boolean(false));
    const oldIsOpen = useRef<boolean | null>(null);
    const hasItems = Array.isArray(items) && items.length > 0;
    useEffect(() => {
        if (oldIsOpen.current !== null && oldIsOpen.current !== isOpen) {
            onToggleExternal?.(isOpen);
        }
        oldIsOpen.current = isOpen;
    }, [isOpen, onToggleExternal]);

    useEffect(() => {
        if (typeof outerIsOpen === 'boolean') {
            setIsOpen(outerIsOpen);
        }
    }, [outerIsOpen]);

    const onItemClick = useCallback(
        (item) => {
            if (!multiselect) {
                setIsOpen(false);
            }
            onItemClickExternal?.(item);
        },
        [multiselect, onItemClickExternal],
    );
    const onToggle = useCallback(
        (newIsOpen) => {
            if (newIsOpen && (!hasItems || disabled)) {
                return;
            }
            setIsOpen(newIsOpen);
        },
        [hasItems, disabled],
    );

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
    });

    const onClose = useCallback(() => {
        setOpenedNestedDropdown(false);
    }, []);

    return (
        <StyledPopup ref={popupRef} isOpen={isOpen} onToggle={onToggle} {...rest}>
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
                            onClose={onClose}
                        />
                    ) : (
                        <DropdownItem
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
