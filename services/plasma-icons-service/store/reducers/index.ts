import { Theme } from '../types';
import { SET_THEME, OPEN_PANEL, CLOSE_PANEL, AppAction } from '../actions';

export type AppState = {
    theme: Theme;
    isPanelOpen?: boolean;
};

const defaultState: AppState = {
    theme: 'light',
    isPanelOpen: false,
};

export const appReducer = (state: AppState = defaultState, action: AppAction): AppState => {
    switch (action.type) {
        case SET_THEME:
            return { ...state, theme: action.payload.theme };
        case OPEN_PANEL:
            return { ...state, isPanelOpen: true };
        case CLOSE_PANEL:
            return { ...state, isPanelOpen: false };
        default:
            return state;
    }
};
