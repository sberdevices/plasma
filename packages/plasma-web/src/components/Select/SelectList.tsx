import React from 'react';
import styled from 'styled-components';
import { accent, secondary, background, text, shadows } from '@sberdevices/plasma-core';
import { IconChevronRight, IconDone } from '@sberdevices/plasma-icons';

import { SelectDropdown } from './SelectDropdown';

export type Item = {
    value: string | number;
    label: string | number;
    isActive?: boolean;
    items?: Item[];
};

export interface SelectListProps extends React.HTMLAttributes<HTMLUListElement> {
    /**
     * Список значений.
     */
    items: Item[];
    onItemClick?: (item: Item) => void;
}

const StyledList = styled.ul`
    box-sizing: border-box;

    margin: 0;
    padding: 0.375rem;

    border-radius: 0.25rem;
    list-style: none;

    background: ${background};
    color: ${secondary};
    box-shadow: ${shadows.medium};
`;
const StyledItem = styled.li<{ isActive?: boolean }>`
    position: relative;

    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 0.375rem 0 1.5rem;
    width: 100%;
    height: 2.5rem;

    border-radius: 0.25rem;

    cursor: pointer;

    &:hover {
        color: ${text};
        background-color: rgba(8, 8, 8, 0.06);
    }
`;
const StyledItemText = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const StyledDot = styled.div`
    position: absolute;
    left: 0.5rem;

    width: 0.375rem;
    height: 0.375rem;

    background-color: ${accent};

    border-radius: 50%;
`;
const StyledCheck = styled(IconDone)`
    position: absolute;
    left: 0.25rem;
`;

const SelectItem: React.FC<{ item: Item; onClick?: SelectListProps['onItemClick'] }> = ({ item, onClick }) => {
    const ref = React.useRef<HTMLLIElement>(null);
    const isItems = Boolean(item.items && item.items.length);
    const isItemsActive = item.items && item.items.filter((it) => it.isActive).length > 0;
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    return (
        <StyledItem
            ref={ref}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            onClick={(event) => {
                if (event.target === ref.current || (event.target as HTMLElement).parentNode === ref.current) {
                    onClick?.(item);
                }
            }}
        >
            {item.isActive && <StyledCheck color={accent} size="xs" />}
            {!item.isActive && isItems && isItemsActive && <StyledDot />}
            <StyledItemText>{item.label}</StyledItemText>
            {item.items && (
                <>
                    <IconChevronRight color={secondary} size="xs" />
                    <SelectDropdown open={isDropdownOpen}>
                        <SelectList items={item.items} onItemClick={onClick} />
                    </SelectDropdown>
                </>
            )}
        </StyledItem>
    );
};

export const SelectList: React.FC<SelectListProps> = ({ items, onItemClick }) => {
    return (
        <StyledList>
            {items.map((item) => (
                <SelectItem key={`item:${item.value}`} item={item} onClick={onItemClick} />
            ))}
        </StyledList>
    );
};

/**
 * Пройдется по списку, вернув новый список с подсписками, поднятыми на верхний уровень.
 */
export const flattenItemsRecursive = (items: Item[]) =>
    items.reduce<Item[]>((acc, item) => {
        acc.push({ value: item.value, label: item.label });

        if (item.items) {
            acc.push(...flattenItemsRecursive(item.items));
        }

        return acc;
    }, []);

/**
 * Пройдется по списку рекурсивно, вернув новый список с новыми объектами с флагом `isActive`.
 */
export const setActiveRecursive = (items: Item[], activate: (item: Item) => Item) =>
    items.map((item) => {
        const newItem = activate(item);

        if (item.items) {
            newItem.items = setActiveRecursive(item.items, activate);
        }

        return newItem;
    });
