import { last } from '../utils/last';

import { AppState, AppStateAction, AppStateActionType } from './types';

export const initialState: AppState = {
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
};

export const reducer = (state: AppState, action: AppStateAction): AppState => {
    switch (action.type) {
        case AppStateActionType.CHARACTER: {
            const { character } = action.payload;
            return {
                ...state,
                ui: {
                    ...state.ui,
                    character,
                },
            };
        }

        case AppStateActionType.INSETS: {
            const { insets } = action.payload;

            return {
                ...state,
                ui: {
                    ...state.ui,
                    insets,
                },
            };
        }

        case AppStateActionType.PUSH_HISTORY: {
            const { history } = action.payload;

            return {
                ...state,
                history: [...state.history, history],
            };
        }

        case AppStateActionType.POP_HISTORY:
            return {
                ...state,
                history: state.history.slice(0, -1),
            };

        case AppStateActionType.CHANGE_ACTIVE_SCREEN_STATE: {
            const { data } = action.payload;
            const screen = last(state.history);

            if (!screen) {
                return state;
            }

            return {
                ...state,
                history: [...state.history.slice(0, -1), { ...screen, data }],
            };
        }

        default:
            return state;
    }
};
