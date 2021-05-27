import React from 'react';
import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@sberdevices/assistant-client';

import { isPlasmaAppAction } from '../store/guards';

import { useAssistantOnData } from './useAssistantOnData';

export function useAssistantOnSmartAppData<T extends AssistantSmartAppData = AssistantSmartAppData>(
    callback: (command: T['smart_app_data']) => void,
): void {
    const onDataHandler = React.useCallback(
        (command: AssistantClientCustomizedCommand<T>) => {
            if (command.type === 'smart_app_data' && !isPlasmaAppAction(command.smart_app_data)) {
                callback(command.smart_app_data);
            }
        },

        [callback],
    );
    useAssistantOnData(onDataHandler);
}
