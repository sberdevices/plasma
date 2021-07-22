import { useMemo, useCallback, useRef } from 'react';
import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@sberdevices/assistant-client';

import { AssistantInstance } from '../types';
import { InitializeParams, initializeAssistant } from '../assistant';

import { useMount } from './useMount';

export const useInitializeAssistant = <T extends AssistantSmartAppData>({
    assistantParams,
    onStart,
    onData,
}: {
    assistantParams: Omit<InitializeParams, 'getState'>;
    onStart?: () => void;
    onData?: (command: AssistantClientCustomizedCommand<AssistantSmartAppData>) => void;
}): {
    getAssistant: () => AssistantInstance;
    setAssistantState: (newState: unknown) => void;
} => {
    const assistantStateRef = useRef({ item_selector: { items: [] } });
    const getAssistantState = useCallback(() => assistantStateRef.current, []);
    const setAssistantState = useCallback((newState) => {
        assistantStateRef.current = newState;
    }, []);

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
            if (onStart) {
                onStart();
            }
            offStartListener();
        });

        let removeListener = () => {};

        if (onData) {
            removeListener = assistant.on('data', onData);
        }

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
