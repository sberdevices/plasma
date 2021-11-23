import { AssistantSmartAppData, createAssistant, createAssistantDev } from '@sberdevices/assistant-client';

import { AssistantInstance, PickOptional } from './types';
import { logger } from './utils/logger';

export type AssistantProps = Parameters<typeof createAssistantDev>[0];

export type InitializeParams = PickOptional<
    AssistantProps,
    'token' | 'getRecoveryState' | 'url' | 'userChannel' | 'surface'
> &
    Pick<AssistantProps, 'initPhrase' | 'nativePanel' | 'getState'>;

let assistant: AssistantInstance;

export const getAssistant = (): AssistantInstance => assistant;

export const initializeAssistant = <T extends AssistantSmartAppData>({
    getState,
    getRecoveryState,
    initPhrase,
    nativePanel,
    token,
    url = 'wss://vpstest2.online.sberbank.ru:443/vpsdemo2/',
    userChannel = 'B2C',
    surface = 'SBERBOX',
}: InitializeParams): AssistantInstance => {
    if (process.env.NODE_ENV === 'development' && !window.Cypress) {
        const environmentProps = token
            ? {
                  userChannel: 'B2C',
                  surface: 'SBERBOX',
                  url: 'wss://nlp2vps.online.sberbank.ru/vps/',
                  settings: {
                      authConnector: 'developer_portal_jwt',
                  },
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
            ...environmentProps,
        });

        assistant.on('data', (action) => logger('Assistant Action', action));
    } else {
        assistant = createAssistant<T>({ getState });
    }

    return assistant;
};
