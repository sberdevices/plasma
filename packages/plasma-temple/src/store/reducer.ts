import { AssistantCharacterType, AssistantInsetsCommand } from '@sberdevices/assistant-client';
import { last } from '../utils/last';

type AssistantInsets = AssistantInsetsCommand['insets'];

export interface UIState {
    character: AssistantCharacterType;
    insets: AssistantInsets;
}

export interface History<T = unknown> {
    name: string;
    data: T;
}

export interface AppState {
    history: History[];
    ui: UIState;
}

export interface InsetsPayload {
    insets: AssistantInsets;
}

export interface CharacterPayload {
    character: AssistantCharacterType;
}

export interface PushHistoryPayload {
    history: History;
}

export interface ChangeActiveScreenStatePayload {
    data: any;
}

export enum AppStateActionType {
    CHARACTER = 'character',
    INSETS = 'insets',
    PUSH_HISTORY = 'pushHistory',
    POP_HISTORY = 'popHistory',
    CHANGE_ACTIVE_SCREEN_STATE = 'changeActiveScreenState',
}

export type AppStateAction =
    | { type: AppStateActionType.CHARACTER; payload: CharacterPayload }
    | { type: AppStateActionType.INSETS; payload: InsetsPayload }
    | { type: AppStateActionType.PUSH_HISTORY; payload: PushHistoryPayload }
    | { type: AppStateActionType.POP_HISTORY }
    | { type: AppStateActionType.CHANGE_ACTIVE_SCREEN_STATE; payload: ChangeActiveScreenStatePayload };

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
        case AppStateActionType.CHARACTER:
            const { character } = action.payload;
            return {
                ...state,
                ui: {
                    ...state.ui,
                    character,
                },
            };

        case AppStateActionType.INSETS:
            const { insets } = action.payload;
            return {
                ...state,
                ui: {
                    ...state.ui,
                    insets,
                },
            };

        case AppStateActionType.PUSH_HISTORY:
            const { history } = action.payload;
            return {
                ...state,
                history: [...state.history, history],
            };

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
