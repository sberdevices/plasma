import React from 'react';

import { useAssistantAppState } from '../../../hooks';
import { AssistantAppState } from '../../../types';
import { CartItem } from '../types';

export const useCartAssistantState = (items: CartItem[], screen?: string): void => {
    const assistantState: AssistantAppState = React.useMemo(
        () => ({
            screen,
            // eslint-disable-next-line @typescript-eslint/camelcase
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
