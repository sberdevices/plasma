import { useCallback } from 'react';
import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@sberdevices/assistant-client';
import { useAssistantOnData } from './useAssistantOnData';

export function useAssistantOnSmartAppData<T extends AssistantSmartAppData = AssistantSmartAppData>(
    callback: (command: T) => void,
) {
    const onDataHandler = useCallback(
        (command: AssistantClientCustomizedCommand<T>) => {
            if (command.type === 'smart_app_data') {
                callback(command);
            }
        },
        [callback],
    );
    useAssistantOnData(onDataHandler);
}
