import React from 'react';

import { AppState, AppStateItem } from '../types';

export const useAssistantState = (stateRef: React.MutableRefObject<AppState>, data: AppState): void => {
    React.useEffect(() => {
        stateRef.current = data;
    }, [data, stateRef]);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createButtonAction = (id: string, title: string, payload?: Record<string, any>): AppStateItem => ({
    title,
    id,
    action: {
        type: id,
        payload,
    },
});
