import React from 'react';

import { store } from '../store';
import { popStateAction, popStateWithUpdateHistoryAction } from '../store/actions';
import { onPopStateFn } from '../types';

export const closeApp = (): void => {
    // eslint-disable-next-line no-console
    console.log('call close native method');

    if (window.AssistantHost && typeof window.AssistantHost.close === 'function') {
        window.AssistantHost.close();
    }
};

export const usePopHistoryListener = (historyLength: number, onPopState?: onPopStateFn): void =>
    React.useEffect(() => {
        const listener = async (event: PopStateEvent) => {
            event.preventDefault();
            if (historyLength > 1) {
                if (!onPopState) {
                    store.dispatch(popStateAction);
                    return;
                }

                const state = await onPopState(event.state);
                store.dispatch(popStateWithUpdateHistoryAction(state));
            } else {
                closeApp();
            }
        };

        window.addEventListener('popstate', listener);

        return () => {
            window.removeEventListener('popstate', listener);
        };
    }, [historyLength]);
