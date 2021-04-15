import React from 'react';
import {
    AssistantClientCustomizedCommand,
    AssistantNavigationCommand,
    AssistantSmartAppData,
} from '@sberdevices/assistant-client';

import { useAssistantOnData } from './useAssistantOnData';

export function useAssistantOnNavigation(callback: (command: AssistantNavigationCommand) => void): void {
    const onDataHandler = React.useCallback(
        (command: AssistantClientCustomizedCommand<AssistantSmartAppData>) => {
            if (command.type === 'navigation') {
                callback(command);
            }
        },
        [callback],
    );
    useAssistantOnData(onDataHandler);
}
