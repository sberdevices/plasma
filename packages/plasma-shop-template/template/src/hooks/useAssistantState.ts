import { AssistantAppStateItem, useAssistantAppState } from '@sberdevices/plasma-temple';

export const useAssistantState = ({
    screen,
    items = [],
    ...rest
}: {
    screen: string;
    items?: AssistantAppStateItem[];
    [key: string]: unknown;
}): void => {
    useAssistantAppState({
        screen,
        item_selector: { items },
        ...rest,
    });
};
