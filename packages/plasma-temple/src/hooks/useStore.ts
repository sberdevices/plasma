import React from 'react';

import { store } from '../store';
import { AppStateAction } from '../store/reducer';

export const useStore = (dispatch: React.Dispatch<AppStateAction>): void => {
    React.useEffect(() => {
        if (!store.isReady) {
            store.isReady = true;
            store.dispatch = dispatch;
        }

        return () => {
            store.isReady = false;
        };
    }, [dispatch]);
};
