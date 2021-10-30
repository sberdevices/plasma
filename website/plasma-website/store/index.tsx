import { createContext, useReducer } from 'react';
import type { FC, Dispatch } from 'react';

import { Action } from './actions';
import { reducer, initialState } from './reducer';
import type { State } from './types';

export const Context = createContext<{ state: State; dispatch: Dispatch<Action> }>({
    state: initialState,
    dispatch: () => null,
});

export const ContextProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { setTheme, setWizardItem } from './actions';
