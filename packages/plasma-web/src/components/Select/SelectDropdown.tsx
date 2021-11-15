import React, { FC, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { DropdownList, DropdownItem } from '../Dropdown';
import { Popup } from '../Popup';

import { SelectArrow } from './SelectArrow';
import type { SelectDopdownProps } from './Select.types';

const StyledPopup = styled(Popup)<Pick<SelectDopdownProps, 'isOpen'>>`
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
    ...rest
}) => {
    const [isOpen, setIsOpen] = useState(Boolean(false));
    const hasItems = Array.isArray(items) && items.length > 0;

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

    return (
        <StyledPopup isOpen={isOpen} onToggle={onToggle} {...rest}>
            <DropdownList>
                {items.map((item) =>
                    item.items && item.items.length ? (
                        <SelectDropdown
                            key={item.value}
                            items={item.items}
                            trigger="hover"
                            placement="right"
                            multiselect={multiselect}
                            onItemClick={onItemClick}
                            disclosure={<DropdownItem onClick={onItemClick} {...item} />}
                        />
                    ) : (
                        <DropdownItem key={item.value} onClick={onItemClick} {...item} />
                    ),
                )}
            </DropdownList>
        </StyledPopup>
    );
};
