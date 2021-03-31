import { createContext } from 'react';
import { AppState, AppStateAction } from './store/reducer';

interface AppStateContext {
    state: AppState;
    dispatch: React.Dispatch<AppStateAction>;
}


export const AppStateContext = createContext<AppStateContext>({
    state: {
        history: [],
        ui: {
            character: 'sber',
            insets: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        },
    },
    dispatch: () => {
        throw new Error('App state context is missing')
    },
});
