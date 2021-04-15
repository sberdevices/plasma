import React from 'react';

export const closeApp = (): void => {
    // eslint-disable-next-line no-console
    console.log('call close native method');

    if (window.AssistantHost && typeof window.AssistantHost.close === 'function') {
        window.AssistantHost.close();
    }
};

export const usePopHistoryListener = (historyLength: number, onPopState: () => void): void => {
    React.useEffect(() => {
        const listener = () => {
            if (historyLength === 1) {
                closeApp();
            }

            onPopState();
        };

        window.addEventListener('popstate', listener);

        return () => {
            window.removeEventListener('popstate', listener);
        };
    }, [historyLength, onPopState]);
};
