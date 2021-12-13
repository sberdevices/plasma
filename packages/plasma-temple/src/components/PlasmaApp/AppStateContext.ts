import { createContext } from 'react';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { initialState } from '../../store/reducer';
import { AppState, PlasmaActionData, History } from '../../store/types';

export interface AppStateContextValue {
    state: AppState;
    header?: HeaderProps;
    dispatch: React.Dispatch<PlasmaActionData>;
    pushHistory: <N extends string, P>(name: N, data: P) => void;
    pushScreen: {
        <N extends string, P>(name: N, params: P): void;
        <N extends string>(name: N, params?: never): void;
    };
    popScreen: () => void;
    goToScreen: <N extends string>(name: N) => void;
    changeActiveScreenState: (state: History) => void;
}

const throwFn = () => {
    throw new Error('App state context is missing');
};

export const AppStateContext = createContext<AppStateContextValue>({
    state: initialState,
    dispatch: throwFn,
    pushHistory: throwFn,
    pushScreen: throwFn,
    popScreen: throwFn,
    goToScreen: throwFn,
    changeActiveScreenState: throwFn,
});
