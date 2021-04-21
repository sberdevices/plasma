import React from 'react';
import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@sberdevices/assistant-client';

import { useAssistant } from './useAssistant';

export const useAssistantOnData = <T extends AssistantSmartAppData = AssistantSmartAppData>(
    onData: (command: AssistantClientCustomizedCommand<T>) => void,
): void => {
    const { assistant } = useAssistant();

    React.useEffect(() => {
        const removeListener = assistant.on(
            'data',
            onData as (command: AssistantClientCustomizedCommand<AssistantSmartAppData>) => void,
        );

        return () => {
            removeListener();
        };
    }, [assistant, onData]);
};
