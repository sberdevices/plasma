import { useEffect } from 'react';
import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@sberdevices/assistant-client';
import { useAssistant } from './useAssistant';

export const useAssistantOnData = <T extends AssistantSmartAppData = AssistantSmartAppData>(
    onData: (command: AssistantClientCustomizedCommand<T>) => void,
) => {
    const { assistant } = useAssistant();

    useEffect(() => {
        if (!assistant) {
            return;
        }

        const removeListener = assistant.on(
            'data',
            onData as (command: AssistantClientCustomizedCommand<AssistantSmartAppData>) => void,
        );

        return () => {
            removeListener();
        };
    }, [assistant, onData]);
};
