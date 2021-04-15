import React from 'react';
import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@sberdevices/assistant-client';

import { useAssistantOnData } from './useAssistantOnData';

export function useAssistantOnSmartAppData<T extends AssistantSmartAppData = AssistantSmartAppData>(
    callback: (command: T) => void,
): void {
    const onDataHandler = React.useCallback(
        (command: AssistantClientCustomizedCommand<T>) => {
            if (command.type === 'smart_app_data') {
                callback(command);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [callback],
    );
    useAssistantOnData(onDataHandler);
}
