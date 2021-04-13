import { useMemo, useCallback, useRef, useState } from 'react';
import {
    AssistantClientCustomizedCommand,
    AssistantSmartAppData,
    createAssistant,
    createAssistantDev,
} from '@sberdevices/assistant-client';

import { logger } from '../utils/logger';
import { AssistantInstance, PickOptional } from '../types';
import { useMount } from './useMount';

export type AssistantProps = Parameters<typeof createAssistantDev>[0];

export type InitializeParams = PickOptional<
    AssistantProps,
    'token' | 'getRecoveryState' | 'url' | 'userChannel' | 'surface'
> &
    Pick<AssistantProps, 'initPhrase' | 'nativePanel' | 'getState'>;

export const initializeAssistant = <T extends AssistantSmartAppData>({
    getState,
    getRecoveryState,
    initPhrase,
    nativePanel,
    token,
    url = 'wss://vpstest2.online.sberbank.ru:443/vpsdemo2/',
    userChannel = 'FEBRUARY',
    surface = 'DEMO_APP',
}: InitializeParams): AssistantInstance => {
    let assistant: AssistantInstance;

    if (process.env.NODE_ENV === 'development') {
        assistant = createAssistantDev<T>({
            getState: () => {
                const state = getState();
                logger('Assistant state', state);
                return state;
            },
            getRecoveryState,
            initPhrase,
            nativePanel,
            url,
            userChannel,
            surface,
            token,
        });

        assistant.on('data', (action) => logger('Assistant Action', action));
    } else {
        assistant = createAssistant<T>({ getState });
    }

    return assistant;
};

export const useInitializeAssistant = <T extends AssistantSmartAppData>({
    assistantParams,
    onStart,
    onData,
}: {
    assistantParams: Omit<InitializeParams, 'getState'>;
    onStart?: () => void;
    onData?: (command: AssistantClientCustomizedCommand<AssistantSmartAppData>) => void;
}) => {
    const [assistant, setAssistant] = useState<AssistantInstance | null>(null);
    const assistantStateRef = useRef({ item_selector: { items: [] } });
    const getAssistantState = useCallback(() => assistantStateRef.current, []);
    const setAssistantState = useCallback((newState) => (assistantStateRef.current = newState), []);

    useMount(() => {
        const assistantInstance = initializeAssistant<T>({ ...assistantParams, getState: getAssistantState });

        const offStartListener = assistantInstance.on('start', () => {
            if (onStart) {
                onStart();
            }
            offStartListener();
        });

        let removeListener = () => {};

        if (onData) {
            removeListener = assistantInstance.on('data', onData);
        }

        setAssistant(assistantInstance);

        return () => removeListener();
    });

    return useMemo(
        () => ({
            assistant,
            setAssistantState,
        }),
        [assistant, setAssistantState],
    );
};
