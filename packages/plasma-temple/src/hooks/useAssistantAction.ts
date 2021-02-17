import React from 'react';
import { AssistantClientCustomizedCommand } from '@sberdevices/assistant-client';

import { initializeAssistant, InitializeParams } from '../assistant';
import { store } from '../store';
import {
    CurrentHistory,
    SetStatePayload,
    SetPositionPayload,
    SetStepPayload,
    AppStateAction,
    AppStateActions,
} from '../store/reducer';
import { popStateAction, pushStateAction, setPositionAction, setStateAction, setStepAction } from '../store/actions';
import { AssistantDataAction, AssistantAction, AssistantInstance, OnData, OnDataApi } from '../types';

export const getViewAction = (
    command: AssistantClientCustomizedCommand<AssistantDataAction>,
): AppStateAction | AssistantAction | void => {
    if (command.type === 'character') {
        return {
            type: AppStateActions.character,
            payload: {
                theme: command.character.id,
            },
        };
    }

    if (command.type === 'navigation') {
        return {
            type: AppStateActions.navigation,
            payload: {
                direction: command.navigation.command,
            },
        };
    }

    if (command.type !== 'smart_app_data' || command.action == null) {
        return;
    }

    if (typeof command.action === 'string') {
        return {
            type: command.action,
        };
    }

    return command.action;
};

let onData: OnData;

export const useOnDataHandler = (cb: OnData): void => {
    React.useEffect(() => {
        const prevOnData = onData;
        onData = cb;

        return () => {
            onData = prevOnData;
        };
    }, [cb]);
};

interface UseAssistantAction {
    (
        assistantRef: React.MutableRefObject<AssistantInstance | null>,
        params: InitializeParams,
        onStart?: (api: OnDataApi) => void,
    ): void;
}

const runCommand = (command: AssistantClientCustomizedCommand<AssistantDataAction>): void => {
    const viewAction = getViewAction(command);

    if (viewAction) {

        store.dispatch(viewAction);
    }
};

export const useAssistantAction: UseAssistantAction = (assistantRef, params, onStart) => {
    React.useEffect(() => {
        (window.appInitialData as AssistantClientCustomizedCommand<AssistantDataAction>[])?.forEach(runCommand);

        assistantRef.current = initializeAssistant(params);

        const methods: OnDataApi = {
            popState: () => store.dispatch(popStateAction),
            pushState: (data: CurrentHistory) => store.dispatch(pushStateAction(data)),
            setState: (data: SetStatePayload) => store.dispatch(setStateAction(data)),
            setPosition: (position: SetPositionPayload) => store.dispatch(setPositionAction(position)),
            setStep: (step: SetStepPayload) => store.dispatch(setStepAction(step)),
            sendData: assistantRef.current.sendData,
        };

        const offStartListener = assistantRef.current.on('start', () => {
            if (onStart) {
                onStart(methods);
            }
            offStartListener();
        });

        const removeListener = assistantRef.current.on('data', (command) => {
            if (typeof onData === 'function' && command.type === 'smart_app_data') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const { action } = command as AssistantClientCustomizedCommand<AssistantDataAction>;

                if (!action) {
                    return;
                }

                const handledResult = onData(action, methods);


                if (handledResult instanceof Promise) {
                    handledResult.then((result) => {
                        if (result) {
                            store.dispatch(result);
                        }
                    })
                } else if (handledResult) {
                    store.dispatch(handledResult);
                }

                return;
            }

            runCommand(command as AssistantClientCustomizedCommand<AssistantDataAction>);
        });

        return () => {
            removeListener();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
