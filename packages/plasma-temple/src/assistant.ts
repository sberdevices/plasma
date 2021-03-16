import { createAssistant, createAssistantDev } from '@sberdevices/assistant-client';

import { logger } from './utils/logger';
import { AssistantDataAction, AssistantInstance, PickOptional } from './types';

export type AssistantProps = Parameters<typeof createAssistantDev>[0];

export type InitializeParams = PickOptional<
    AssistantProps,
    'token' | 'getRecoveryState' | 'url' | 'userChannel' | 'surface'
> &
    Pick<AssistantProps, 'initPhrase' | 'nativePanel' | 'getState'>;

export const initializeAssistant = (params: InitializeParams): AssistantInstance => {
    let assistant: AssistantInstance;

    if (process.env.NODE_ENV === 'development') {
        const defaultParams = {
            url: 'wss://vpstest2.online.sberbank.ru:443/vpsdemo2/',
            userChannel: 'FEBRUARY',
            surface: 'DEMO_APP',
        };

        assistant = createAssistantDev<AssistantDataAction>({
            getState: () => {
                const state = params.getState();

                logger('Assistant state', state);

                return state;
            },
            getRecoveryState: params.getRecoveryState,
            initPhrase: params.initPhrase,
            nativePanel: params.nativePanel,

            url: params.url ?? defaultParams.url,
            userChannel: params.userChannel ?? defaultParams.userChannel,
            surface: params.surface ?? defaultParams.surface,
            token: params.token,
        });

        assistant.on('data', (action) => logger('Assistant Action', action));
    } else {
        assistant = createAssistant<AssistantDataAction>({ getState: params.getState });
    }

    return assistant;
};
