import type { Reducer } from 'react';

import { Action, ActionTypes } from './actions';
import type { State } from './types';

export const initialState: State = {
    theme: 'light',
};

export const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_THEME:
            return { ...state, theme: action.payload.theme };
        case ActionTypes.SET_ITEM:
            return {
                ...state,
                wizardItemType: action.payload.wizardItemType,
                wizardItemName: action.payload.wizardItemName,
            };
        default:
            return state;
    }
};
