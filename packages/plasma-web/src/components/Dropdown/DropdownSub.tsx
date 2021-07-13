import React, { FC, HTMLAttributes, useCallback, useState, useMemo } from 'react';
import styled, { CSSObject } from 'styled-components';

import { DropdownList } from './DropdownList';
import { DropdownItem } from './DropdownItem';
import { DropdownNode as DropdownNodeType, DropdownItem as DropdownItemType } from './Dropdown.types';

const StyledRoot = styled.div`
    position: relative;
    margin: 0 calc(var(--plasma-dropdown-padding) * -1);
    padding-left: var(--plasma-dropdown-padding);
    padding-right: var(--plasma-dropdown-padding);
`;

export interface DropdownSubProps extends HTMLAttributes<HTMLDivElement> {
    items: Array<DropdownNodeType>;
    onItemClick?: (item: DropdownItemType) => void;
}

/**
 * Вложенный выпадающий список.
 */
export const DropdownSub: FC<DropdownSubProps> = ({ children, items, onItemClick, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const open = useCallback(() => setIsOpen(true), [setIsOpen]);
    const close = useCallback(() => setIsOpen(false), [setIsOpen]);
    const style = useMemo<CSSObject>(
        () => ({
            position: 'absolute',
            top: 0,
            left: '100%',
            zIndex: 1,
            marginTop: 'calc(var(--plasma-dropdown-padding) * -1)',
            opacity: Number(isOpen),
            display: isOpen ? 'block' : 'none',
        }),
        [isOpen],
    );

    return (
        <StyledRoot onMouseEnter={open} onMouseLeave={close} onFocus={open} onBlur={close} {...rest}>
            {children}
            <DropdownList style={style}>
                {items.map((item) => (
                    <DropdownItem key={item.value} onClick={onItemClick} {...item} />
                ))}
            </DropdownList>
        </StyledRoot>
    );
};
