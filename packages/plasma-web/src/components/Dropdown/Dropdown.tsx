import React, { FC, useState, useCallback } from 'react';

import { DropdownUncontrolled, DropdownUncontrolledProps } from './DropdownUncontrolled';
import type { OnItemSelect } from './Dropdown.types';

export interface DropdownProps extends Omit<DropdownUncontrolledProps, 'isOpen' | 'hoverIndex'> {
    /**
     * Закрыть выпадающий список после выбора.
     */
    closeOnSelect?: boolean;
    /**
     * Обработчик клика по айтему.
     * @deprecated Будет удалено в v2.0, используйте onItemSelect.
     */
    onItemClick?: OnItemSelect;
}

/**
 * Выпадающий список без внешнего контроля видимости.
 */
export const Dropdown: FC<DropdownProps> = ({
    disabled,
    closeOnSelect = true,
    onItemClick,
    onToggle: onToggleExternal,
    onItemSelect: onItemSelectExternal,
    ...rest
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = useCallback(
        (newIsOpen, event) => {
            setIsOpen(newIsOpen);
            onToggleExternal?.(newIsOpen, event);
        },
        [onToggleExternal, disabled],
    );

    const onItemSelect = useCallback(
        (item, event) => {
            if (closeOnSelect) {
                onToggle?.(false, event);
            }
            if (onItemSelectExternal) {
                return onItemSelectExternal(item, event);
            }
            return onItemClick?.(item, event);
        },
        [closeOnSelect, onToggle, onItemSelectExternal, onItemClick],
    );

    return (
        <DropdownUncontrolled
            {...rest}
            isOpen={isOpen}
            disabled={disabled}
            onToggle={onToggle}
            onItemSelect={onItemSelect}
        />
    );
};
