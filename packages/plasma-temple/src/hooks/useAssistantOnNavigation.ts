import { useCallback } from 'react';
import {
    AssistantClientCustomizedCommand,
    AssistantNavigationCommand,
    AssistantSmartAppData,
} from '@sberdevices/assistant-client';
import { useAssistantOnData } from './useAssistantOnData';

export function useAssistantOnNavigation(callback: (command: AssistantNavigationCommand) => void) {
    const onDataHandler = useCallback(
        (command: AssistantClientCustomizedCommand<AssistantSmartAppData>) => {
            if (command.type === 'navigation') {
                callback(command);
            }
        },
        [callback],
    );
    useAssistantOnData(onDataHandler);
}
