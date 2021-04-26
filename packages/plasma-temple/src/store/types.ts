import { AssistantCharacterType, AssistantInsetsCommand } from '@sberdevices/assistant-client';

export type AssistantInsets = AssistantInsetsCommand['insets'];

export interface UIState {
    character: AssistantCharacterType;
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
    POP_HISTORY = 'popHistory',
    CHANGE_ACTIVE_SCREEN_STATE = 'changeActiveScreenState',
}

export type CharacterAction = { type: AppStateActionType.CHARACTER; payload: { character: AssistantCharacterType } };
export type InsetsAction = { type: AppStateActionType.INSETS; payload: { insets: AssistantInsets } };
export type PushHistoryAction = { type: AppStateActionType.PUSH_HISTORY; payload: { history: History } };
export type PopHistoryAction = { type: AppStateActionType.POP_HISTORY };
export type ChangeStateAction = {
    type: AppStateActionType.CHANGE_ACTIVE_SCREEN_STATE;
    payload: { data: unknown };
};

export type AppStateAction = CharacterAction | InsetsAction | PushHistoryAction | PopHistoryAction | ChangeStateAction;
