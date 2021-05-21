import { useMemo, useCallback, useRef } from 'react';
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
        const environmentProps = token
            ? {
                  userChannel: 'B2C',
                  surface: 'SBERBOX',
                  url: 'wss://nlp2vps.online.sberbank.ru/vps/',
              }
            : {
                  url,
                  userChannel,
                  surface,
              };

        assistant = createAssistantDev<T>({
            getState: () => {
                const state = getState();
                logger('Assistant state', state);
                return state;
            },
            getRecoveryState,
            initPhrase,
            nativePanel,
            token,
            settings: {
                authConnector: 'developer_portal_jwt',
            },
            ...environmentProps,
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
