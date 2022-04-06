import { useMemo, useCallback, useRef } from 'react';
import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@sberdevices/assistant-client';

import { AssistantInstance } from '../types';
import { InitializeParams, initializeAssistant } from '../assistant';

import { useMount } from './useMount';

export const useInitializeAssistant = <T extends AssistantSmartAppData>({
    assistantParams,
    onStart,
    onStartWaitForCommand,
    onData,
}: {
    assistantParams: Omit<InitializeParams, 'getState'>;
    onStart?: () => void;
    onStartWaitForCommand?: string;
    onData?: (command: AssistantClientCustomizedCommand<AssistantSmartAppData>) => void;
}): {
    getAssistant: () => AssistantInstance;
    setAssistantState: (newState: unknown) => void;
} => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const assistantStateRef = useRef({ item_selector: { items: [] } });
    const getAssistantState = useCallback(() => assistantStateRef.current, []);
    const setAssistantState = useCallback((newState) => {
        assistantStateRef.current = newState;
    }, []);
    const isOnStartNotCalledRef = useRef(true);

    const assistantRef = useRef<AssistantInstance | null>(null);
    const getAssistant = useCallback(() => {
        if (!assistantRef.current) {
            assistantRef.current = initializeAssistant<T>({ ...assistantParams, getState: getAssistantState });
        }

        return assistantRef.current;
    }, [assistantParams, getAssistantState]);

    useMount(() => {
        const assistant = getAssistant();
        const offStartListener = assistant.on('start', () => {
            if (onStart && !onStartWaitForCommand) {
                onStart();
            }
            offStartListener();
        });

        const handleOnData = (command: AssistantClientCustomizedCommand<AssistantSmartAppData>) => {
            if (onData) {
                onData(command);
            }
            const isWaitedCommand = command.type === onStartWaitForCommand;
            if (onStart && isWaitedCommand && isOnStartNotCalledRef.current) {
                isOnStartNotCalledRef.current = false;
                onStart();
            }
        };

        const removeListener = assistant.on('data', handleOnData);
        return () => removeListener();
    });

    return useMemo(
        () => ({
            getAssistant,
            setAssistantState,
        }),
        [getAssistant, setAssistantState],
    );
};
