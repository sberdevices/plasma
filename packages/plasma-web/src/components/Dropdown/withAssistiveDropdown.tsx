import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { FC, ComponentType, ForwardRefExoticComponent } from 'react';

import { DropdownUncontrolled, DropdownUncontrolledProps } from './DropdownUncontrolled';
import { useKeyboardNavigation, INITIAL_INDEX } from './keyboardNavigation';

export interface WithAssistiveDropdownProps
    extends Pick<
        DropdownUncontrolledProps,
        'id' | 'items' | 'placement' | 'trigger' | 'disabled' | 'onToggle' | 'onItemSelect'
    > {
    /**
     * WAI-ARIA role меню в выпадающем списке.
     */
    menuRole?: string;
    /**
     * WAI-ARIA role элемента меню в выпадающем списке.
     */
    menuItemRole?: string;
    /**
     * Закрыть выпадающий список после выбора.
     */
    closeOnSelect?: boolean;
    /**
     * Обработчик изменения активного индекса элемента,
     * на который встали клавиатурной навигацией и который нужно подсветить.
     */
    onIndexChange?: (index: number) => void;
}

/**
 * Декорирует переданный компонент, выводя доступный дропдаун.
 */
export const withAssistiveDropdown = <P extends object>(
    Component: ComponentType<P> | ForwardRefExoticComponent<P>,
    Dropdown: ComponentType<DropdownUncontrolledProps> = DropdownUncontrolled,
): FC<P & WithAssistiveDropdownProps> => ({
    id,
    items,
    placement,
    trigger,
    disabled,
    menuRole,
    menuItemRole,
    closeOnSelect = true,
    onToggle: onToggleExternal,
    onItemSelect: onItemSelectExternal,
    onIndexChange: onIndexChangeExternal,
    ...rest
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(INITIAL_INDEX);
    const openingMethod = useRef<string | null>(null);

    const onToggle = useCallback(
        (newIsOpen, event) => {
            if (newIsOpen) {
                openingMethod.current = event.type;
            }
            setIsOpen(newIsOpen);
            onToggleExternal?.(newIsOpen, event);
        },
        [onToggleExternal],
    );

    const onItemSelect = useCallback(
        (item, event) => {
            if (closeOnSelect) {
                onToggle?.(false, event);
            }
            onItemSelectExternal?.(item, event);
        },
        [onToggle, onItemSelectExternal, closeOnSelect],
    );

    const onIndexChange = useCallback(
        (i) => {
            setIndex(i);
            onIndexChangeExternal?.(i);
        },
        [onIndexChangeExternal],
    );

    const onBlur = useCallback(() => {
        if (openingMethod.current === 'keydown') {
            setIsOpen(false);
            setIndex(INITIAL_INDEX);
        }
    }, []);

    const { onKeyDown } = useKeyboardNavigation({
        items,
        isOpen,
        index,
        onToggle,
        onItemSelect,
        onIndexChange,
    });

    useEffect(() => {
        if (!isOpen) {
            onIndexChange?.(INITIAL_INDEX);
        }
    }, [isOpen, onIndexChange]);

    return (
        <Dropdown
            id={id}
            role={menuRole}
            itemRole={menuItemRole}
            aria-labelledby={id ? `${id}-disclosure` : undefined}
            isOpen={isOpen}
            items={items}
            placement={placement}
            trigger={trigger}
            disabled={disabled}
            hoverIndex={index}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onToggle={onToggle}
            onItemSelect={onItemSelect}
        >
            <Component
                {...(rest as P)}
                id={id ? `${id}-disclosure` : undefined}
                isOpen={isOpen}
                disabled={disabled}
                aria-activedescendant={id && index >= 0 ? `${id}-item-${index}` : undefined}
                aria-controls={id}
                aria-expanded={isOpen}
                aria-haspopup={menuRole}
            />
        </Dropdown>
    );
};
