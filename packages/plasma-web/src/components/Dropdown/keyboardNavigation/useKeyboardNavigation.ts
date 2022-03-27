import { useCallback } from 'react';

import type { DropdownPopupProps } from '../DropdownPopup';
import type { DropdownNode, OnItemSelect, OnIndexChange } from '../Dropdown.types';

import { getActionFromKey, getUpdatedIndex, Actions } from './utils';
import { useOnComboType } from './useOnComboType';

export interface UseKeyboardNavigationProps {
    items: DropdownNode[];
    isOpen?: boolean;
    index?: number;
    onToggle?: DropdownPopupProps['onToggle'];
    onItemSelect?: OnItemSelect;
    onIndexChange?: OnIndexChange;
}

export const INITIAL_INDEX = 0;

/**
 * Клавиатурная навигация для дропдауна.
 * Работает для каждого инстанса дропдауна (попапа) отдельно.
 */
export const useKeyboardNavigation = ({
    items,
    isOpen,
    index = INITIAL_INDEX,
    onToggle,
    onItemSelect,
    onIndexChange,
}: UseKeyboardNavigationProps) => {
    const getIndexByTyping = useOnComboType({ index, items });

    const onKeyDown = useCallback(
        (event) => {
            if (!items.length) {
                return;
            }
            const action = getActionFromKey(event, isOpen);

            if (
                action === Actions.Last ||
                action === Actions.First ||
                action === Actions.Next ||
                action === Actions.Previous ||
                action === Actions.PageUp ||
                action === Actions.PageDown
            ) {
                event.preventDefault();
                onIndexChange?.(getUpdatedIndex(action, index, items));
            } else if (action === Actions.Select) {
                event.stopPropagation();
                event.preventDefault();
                onItemSelect?.(items[index], event);
            } else if (action === Actions.Open) {
                event.preventDefault();
                onToggle?.(true, event);
            } else if (action === Actions.Close) {
                event.preventDefault();
                onToggle?.(false, event);
            } else if (action === Actions.Type) {
                event.preventDefault();
                const newIndex = getIndexByTyping(event.key);
                if (newIndex !== undefined) {
                    onIndexChange?.(newIndex);
                }
            }
        },
        [isOpen, index, items, onIndexChange, onToggle, getIndexByTyping],
    );

    return { onKeyDown, index };
};
