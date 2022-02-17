import React, { FC, useState, useCallback, MutableRefObject, RefAttributes, useEffect } from 'react';
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
    previousFocus,
    listId,
    onActiveChange,
    isNested,
    isOpen: outerIsOpen,
    ...rest
}) => {
    const [isOpen, setIsOpen] = useState(Boolean(false));
    const hasItems = Array.isArray(items) && items.length > 0;
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

    const { popupRef, dropdownListRef, lastFocus, activeIndex, changeActiveIndex } = useKeyboardNavigation({
        isOpen,
        setIsOpen,
        items,
        onActiveChange,
        previousFocus: previousFocus?.current ? (previousFocus as MutableRefObject<HTMLElement>) : null,
        onItemClick,
        isNested,
    });

    return (
        <StyledPopup ref={popupRef} isOpen={isOpen} onToggle={onToggle} {...rest}>
            <DropdownList id={listId} role="listbox" ref={dropdownListRef}>
                {items.map((item, idx) =>
                    item.items && item.items.length ? (
                        <NestedDropdown
                            lastFocus={lastFocus}
                            item={item}
                            id={`${listId}-${idx}`}
                            isHovered={idx === activeIndex}
                            onItemClick={onItemClick}
                        />
                    ) : (
                        <DropdownItem
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
