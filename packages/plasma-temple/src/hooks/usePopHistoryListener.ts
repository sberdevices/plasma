import React from 'react';

import { store } from '../store';
import { AppStateActions } from '../store/reducer';

export const closeApp = (): void => {
    // eslint-disable-next-line no-console
    console.log('call close native method');

    if (window.AssistantHost && typeof window.AssistantHost.close === 'function') {
        window.AssistantHost.close();
    }
};

export const usePopHistoryListener = (historyLength: number): void =>
    React.useEffect(() => {
        const listener = (event: PopStateEvent) => {
            event.preventDefault();
            if (historyLength > 1) {
                store.dispatch({
                    type: AppStateActions.popState,
                });
            } else {
                closeApp();
            }
        };

        window.addEventListener('popstate', listener);

        return () => {
            window.removeEventListener('popstate', listener);
        };
    }, [historyLength]);
