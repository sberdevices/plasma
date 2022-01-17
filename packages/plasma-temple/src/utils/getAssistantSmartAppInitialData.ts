import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@sberdevices/assistant-client';

import { getAssistant } from '../assistant';

export function getAssistantSmartAppInitialData<
    T extends AssistantSmartAppData = AssistantSmartAppData
>(): T['smart_app_data'][] {
    const getSmartAppData = (command: AssistantClientCustomizedCommand<T>): T['smart_app_data'] | null => {
        if (command.type === 'smart_app_data') {
            return command.smart_app_data;
        }
        return null;
    };

    const initialData = getAssistant().getInitialData();
    return initialData
        .map(
            getSmartAppData as (
                command: AssistantClientCustomizedCommand<AssistantSmartAppData>,
            ) => T['smart_app_data'],
        )
        .filter(Boolean);
}

export function findAssistantSmartAppInitialData<T extends AssistantSmartAppData = AssistantSmartAppData>({
    command,
}: {
    command?: string;
}): T['smart_app_data'] | undefined {
    return getAssistant().findInInitialData<T['smart_app_data']>({ type: 'smart_app_data', command });
}
