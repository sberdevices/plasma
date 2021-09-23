import { last } from '../utils/last';

import { AppState, PlasmaActionData, AppStateActionType } from './types';

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

export const reducer = (state: AppState, action: PlasmaActionData): AppState => {
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

        case AppStateActionType.POP_HISTORY: {
            const { delta = 1 } = action.payload;
            return {
                ...state,
                history: state.history.slice(0, -delta),
            };
        }

        case AppStateActionType.CHANGE_ACTIVE_SCREEN_STATE: {
            const { data, name } = action.payload;
            const screen = last(state.history);

            if (!screen || screen.name !== name) {
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
