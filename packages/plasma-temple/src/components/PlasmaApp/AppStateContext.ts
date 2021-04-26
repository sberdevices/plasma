import { createContext } from 'react';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { initialState } from '../../store/reducer';
import { AppState, AppStateAction } from '../../store/types';

export interface AppStateContextValue {
    state: AppState;
    header?: HeaderProps;
    dispatch: React.Dispatch<AppStateAction>;
    pushHistory: (name: string, data: unknown) => void;
    pushScreen: (name: string, params: unknown) => void;
    popScreen: () => void;
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
});
