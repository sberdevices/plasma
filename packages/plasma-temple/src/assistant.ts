import { AssistantSmartAppData, createAssistant, createSmartappDebugger } from '@sberdevices/assistant-client';

import { AssistantInstance, PickOptional } from './types';
import { logger } from './utils/logger';

export type AssistantProps = Parameters<typeof createSmartappDebugger>[0];

export type InitializeParams = PickOptional<AssistantProps, 'token'> & Omit<AssistantProps, 'token'>;

let assistant: AssistantInstance;

// @deprecated use getAssistantRef
export const getAssistant = (): AssistantInstance => assistant;

export interface AssistantRef {
    assistant: AssistantInstance | null;
}

export const getAssistantRef = (): AssistantRef => ({
    assistant: assistant ?? null,
});

export const initializeAssistant = <T extends AssistantSmartAppData>({
    getState,
    getRecoveryState,
    token = '',
    ...restProps
}: InitializeParams): AssistantInstance => {
    if (process.env.NODE_ENV === 'development' && !window.Cypress) {
        assistant = createSmartappDebugger<T>({
            getState: () => {
                const state = getState();
                logger('Assistant state', state);
                return state;
            },
            token,
            ...restProps,
        });

        assistant.on('data', (action) => logger('Assistant Action', action));
    } else {
        assistant = createAssistant<T>({ getState, getRecoveryState });
    }

    return assistant;
};
