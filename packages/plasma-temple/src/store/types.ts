import { CharacterId, AssistantInsetsCommand, AssistantSmartAppData } from '@sberdevices/assistant-client';

import { Action as StateAction } from '../utils/createAction';

export type AssistantInsets = AssistantInsetsCommand['insets'];

export interface UIState {
    character: CharacterId;
    insets: AssistantInsets;
}

export interface History<N extends string = string, T = unknown> {
    name: N;
    data: T;
}

export interface AppState {
    history: History[];
    ui: UIState;
}

export enum AppStateActionType {
    CHARACTER = 'character',
    INSETS = 'insets',
    PUSH_HISTORY = 'pushHistory',
    REPLACE_PREVIOUS_HISTORY = 'replacePreviousHistory',
    POP_HISTORY = 'popHistory',
    CHANGE_ACTIVE_SCREEN_STATE = 'changeActiveScreenState',
}

export interface Action<A extends Record<string, unknown>> extends AssistantSmartAppData {
    // eslint-disable-next-line camelcase
    smart_app_data: A;
}

export type CharacterAction = StateAction<AppStateActionType.CHARACTER, { character: CharacterId }>;
export type InsetsAction = StateAction<AppStateActionType.INSETS, { insets: AssistantInsets }>;
export type PushHistoryAction = StateAction<AppStateActionType.PUSH_HISTORY, { history: History }>;
export type ReplacePreviousHistoryAction = StateAction<
    AppStateActionType.REPLACE_PREVIOUS_HISTORY,
    { history: History[] }
>;
export type PopHistoryAction = StateAction<AppStateActionType.POP_HISTORY, { delta?: number }>;
export type ChangeStateAction = StateAction<AppStateActionType.CHANGE_ACTIVE_SCREEN_STATE, History>;
export type PlasmaAction =
    | Action<PushHistoryAction>
    | Action<ReplacePreviousHistoryAction>
    | Action<ChangeStateAction>
    | Action<PopHistoryAction>;
export type PlasmaActionData = CharacterAction | InsetsAction | PlasmaAction['smart_app_data'];
