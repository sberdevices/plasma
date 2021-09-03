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
        // eslint-disable-next-line @typescript-eslint/camelcase
        item_selector: { items },
        ...rest,
    });
};
