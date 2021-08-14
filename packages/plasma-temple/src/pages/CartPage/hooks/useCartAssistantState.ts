import React from 'react';

import { useAssistantAppState } from '../../../hooks';
import { AnyObject, AssistantAppState } from '../../../types';
import { CartItem } from '../types';

export const useCartAssistantState = <ID = string, T extends AnyObject = AnyObject>(
    items: CartItem<ID, T>[],
    screen?: string,
): void => {
    const assistantState: AssistantAppState = React.useMemo(
        () => ({
            screen,
            item_selector: {
                items: items.map((item, index) => ({
                    title: item.name,
                    number: index + 1,
                    id: String(item.id),
                    item,
                })),
            },
        }),
        [items, screen],
    );

    useAssistantAppState(assistantState);
};
