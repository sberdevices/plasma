import React, { FC, useCallback } from 'react';
import type { DisabledProps } from '@sberdevices/plasma-core';

import { PickOptional } from '../../types';

import { DropdownMenu, DropdownMenuProps } from './DropdownMenu';
import { DropdownPopup, DropdownPopupProps } from './DropdownPopup';

export interface DropdownUncontrolledProps
    extends DisabledProps,
        Omit<DropdownMenuProps, 'children' | 'onKeyDown' | 'onBlur'>,
        PickOptional<
            DropdownPopupProps,
            'isOpen' | 'placement' | 'trigger' | 'offsetTop' | 'onToggle' | 'onKeyDown' | 'onBlur'
        > {}

/**
 * Выпадающий список с внешнего контроля видимости через пропы `isOpen` и `onToggle`.
 */
export const DropdownUncontrolled: FC<DropdownUncontrolledProps> = ({
    id,
    isOpen,
    items,
    children,
    offsetTop,
    disabled,
    style,
    className,
    hoverIndex,
    placement = 'bottom',
    trigger = 'click',
    onBlur,
    onKeyDown,
    onToggle: onToggleExternal,
    onItemSelect,
    ...rest
}) => {
    const hasItems = Array.isArray(items) && items.length > 0;

    const onToggle = useCallback(
        (newIsOpen, event) => {
            if (newIsOpen && hasItems && !disabled) {
                onToggleExternal?.(true, event);
            } else {
                onToggleExternal?.(false, event);
            }
        },
        [onToggleExternal, disabled, hasItems],
    );

    return (
        <DropdownPopup
            isOpen={isOpen}
            trigger={trigger}
            placement={placement}
            disclosure={children}
            offsetTop={offsetTop}
            style={style}
            className={className}
            onToggle={onToggle}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
        >
            <DropdownMenu {...rest} id={id} items={items} hoverIndex={hoverIndex} onItemSelect={onItemSelect} />
        </DropdownPopup>
    );
};
