import React, { FC, HTMLAttributes, useRef, useCallback, useEffect, useState, useMemo } from 'react';
import styled, { CSSObject } from 'styled-components';
import { toCssSize } from '@sberdevices/plasma-core';

import { DropdownList } from './DropdownList';
import { DropdownItem } from './DropdownItem';
import { DropdownSub } from './DropdownSub';
import { DropdownNode as DropdownNodeType, DropdownItem as DropdownItemType } from './Dropdown.types';

const StyledRoot = styled.div`
    position: relative;
    display: inline-flex;
`;

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
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
    onToggle?: (isOpen: boolean) => void;
}

/**
 * Выпадающий список.
 */
export const Dropdown: FC<DropdownProps> = ({
    children,
    offsetTop,
    items,
    onItemClick: onItemClickExternal,
    onToggle,
    ...rest
}) => {
    const oldIsOpen = useRef<boolean | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const style = useMemo<CSSObject>(
        () => ({
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1,
            marginTop: offsetTop && toCssSize(offsetTop),
            opacity: Number(isOpen),
            display: isOpen ? 'block' : 'none',
        }),
        [isOpen],
    );

    const onDocumentClick = useCallback((event) => {
        const targetIsRoot = event.target === rootRef.current;
        const targetInRoot = rootRef.current?.contains(event.target);
        if (!targetIsRoot && !targetInRoot) {
            setIsOpen(false);
        }
    }, []);

    const onRootClick = useCallback((event) => {
        const targetIsList = event.target === listRef.current;
        const targetInList = listRef.current?.contains(event.target);
        if (!targetIsList && !targetInList) {
            setIsOpen((oldIsVisible) => !oldIsVisible);
        }
    }, []);

    const onItemClick = useCallback(
        (item) => {
            setIsOpen(false);
            onItemClickExternal?.(item);
        },
        [setIsOpen, onItemClickExternal],
    );

    useEffect(() => {
        if (oldIsOpen.current !== null && oldIsOpen.current !== isOpen) {
            onToggle?.(isOpen);
        }
        oldIsOpen.current = isOpen;
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener('click', onDocumentClick);
        return () => document.removeEventListener('click', onDocumentClick);
    }, []);

    return (
        <StyledRoot ref={rootRef} onClick={onRootClick} {...rest}>
            {children}
            <DropdownList ref={listRef} style={style}>
                {items.map((item) =>
                    item.items && item.items.length ? (
                        <DropdownSub key={item.value} items={item.items} onItemClick={onItemClick}>
                            <DropdownItem onClick={onItemClick} {...item} />
                        </DropdownSub>
                    ) : (
                        <DropdownItem key={item.value} onClick={onItemClick} {...item} />
                    ),
                )}
            </DropdownList>
        </StyledRoot>
    );
};
