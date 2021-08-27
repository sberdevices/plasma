import React, { FC, useRef, useState, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { PickOptional as Optional } from '../../types';
import { Popup, PopupProps } from '../Popup';

import { DropdownList } from './DropdownList';
import { DropdownItem } from './DropdownItem';
import { DropdownNode as DropdownNodeType, DropdownItem as DropdownItemType } from './Dropdown.types';

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
}

const StyledPopup = styled(Popup)<Pick<DropdownProps, 'offsetTop'>>`
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
    ...rest
}) => {
    const hasItems = Array.isArray(items) && items.length > 0;
    const oldIsOpen = useRef<boolean | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const onItemClick = useCallback(
        (item) => {
            setIsOpen(false);
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

    return (
        <StyledPopup
            isOpen={isOpen}
            trigger={trigger}
            placement={placement}
            disclosure={children}
            offsetTop={offsetTop}
            onToggle={onToggle}
            {...rest}
        >
            <DropdownList>
                {items.map((item) =>
                    item.items && item.items.length ? (
                        <Dropdown
                            key={item.value}
                            trigger="hover"
                            placement="right"
                            items={item.items}
                            onItemClick={onItemClick}
                        >
                            <DropdownItem onClick={onItemClick} {...item} />
                        </Dropdown>
                    ) : (
                        <DropdownItem key={item.value} onClick={onItemClick} {...item} />
                    ),
                )}
            </DropdownList>
        </StyledPopup>
    );
};
