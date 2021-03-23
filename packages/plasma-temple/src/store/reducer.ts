import { Reducer } from 'react';
import { AssistantCharacterType, AssistantInsetsCommand } from '@sberdevices/assistant-client/dist/typings';

import { last, replaceLast } from '../utils/last';
import { DetailPayload, EntityPayload, Screen, MultiGalleryViewPayload, VideoViewPayload } from '../types';

interface HistoryRecord<T extends Screen, D> {
    data: D;
    type: T;
    step: number;
    position: number;
}

export type CurrentHistory =
    | HistoryRecord<Screen.gallery, MultiGalleryViewPayload>
    | HistoryRecord<Screen.entity, EntityPayload>
    | HistoryRecord<Screen.detail, DetailPayload>
    | HistoryRecord<Screen.video, VideoViewPayload>;

// eslint-disable-next-line no-shadow
export enum AppStateActions {
    character = 'character',
    insets = 'insets',
    navigation = 'navigation',
    popState = 'pop state',
    popStateWithUpdateHistory = 'pop state with update history',
    pushState = 'push state',
    setState = 'set state',
    setPosition = 'set position',
    setStep = 'set step',
}

export interface ThemePayload {
    theme: AssistantCharacterType;
}

type AssistantInsets = AssistantInsetsCommand['insets'];
export interface InsetsPayload {
    insets: AssistantInsets;
}

export interface NavigationPayload {
    direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'BACK' | 'FORWARD';
}

export type SetStatePayload = Omit<CurrentHistory, 'type'>;

export interface SetPositionPayload {
    position: number;
}

export interface SetStepPayload {
    step: number;
}

type HistoryAction =
    | { type: AppStateActions.popState }
    | { type: AppStateActions.popStateWithUpdateHistory, payload: CurrentHistory }
    | { type: AppStateActions.pushState; payload: CurrentHistory }
    | { type: AppStateActions.setState; payload: SetStatePayload }
    | { type: AppStateActions.setPosition; payload: SetPositionPayload }
    | { type: AppStateActions.setStep; payload: SetStepPayload };

export type AppStateAction =
    | HistoryAction
    | { type: AppStateActions.character; payload: ThemePayload }
    | { type: AppStateActions.navigation; payload: NavigationPayload }
    | { type: AppStateActions.insets; payload: InsetsPayload };

export interface UIState {
    character: AssistantCharacterType;
    insets: AssistantInsets;
}
export interface AppState {
    history: Array<CurrentHistory>;
    ui: UIState;
}

export const reducer: Reducer<AppState, AppStateAction> = (state, action) => {
    const { history } = state;
    const currentState = last(state.history);

    const popState = () => ({
        ...state,
        history: history.slice(0, -1),
    });

    switch (action.type) {
        case AppStateActions.character:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    character: action.payload?.theme,
                },
            };

        case AppStateActions.insets:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    insets: action.payload.insets,
                },
            };

        case AppStateActions.navigation:
            if (action.payload?.direction === 'BACK') {
                return popState();
            }

            return state;

        case AppStateActions.pushState:
            return {
                ...state,
                history: history.concat(action.payload),
            };

        case AppStateActions.setState:
            return {
                ...state,
                history: history.slice(0, -1).concat({ ...action.payload, type: currentState.type } as CurrentHistory),
            };

        case AppStateActions.popState:
            return popState();

        case AppStateActions.popStateWithUpdateHistory:
            return {
                ...state,
                history: replaceLast(history.slice(0, -1), action.payload),
            };

        case AppStateActions.setStep:
            return {
                ...state,
                history: replaceLast(history, {
                    ...currentState,
                    step: action.payload.step,
                }),
            };

        case AppStateActions.setPosition:
            return {
                ...state,
                history: replaceLast(history, {
                    ...currentState,
                    position: action.payload.position,
                }),
            };

        default:
            return state;
    }
};
