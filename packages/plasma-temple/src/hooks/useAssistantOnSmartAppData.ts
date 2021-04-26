import React from 'react';
import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@sberdevices/assistant-client';

import { isPlasmaAppAction } from '../store/guards';

import { useAssistantOnData } from './useAssistantOnData';

export function useAssistantOnSmartAppData<T extends AssistantSmartAppData = AssistantSmartAppData>(
    callback: (command: T) => void,
): void {
    const onDataHandler = React.useCallback(
        (command: AssistantClientCustomizedCommand<T>) => {
            if (command.type === 'smart_app_data' && !isPlasmaAppAction(command.smart_app_data)) {
                callback(command);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [callback],
    );
    useAssistantOnData(onDataHandler);
}
