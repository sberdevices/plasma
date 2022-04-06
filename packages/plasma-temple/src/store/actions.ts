import { CharacterId } from '@sberdevices/assistant-client';

import { AnyObject } from '../types';
import { createAction } from '../utils/createAction';

import {
    AppStateActionType,
    CharacterAction,
    InsetsAction,
    PushHistoryAction,
    ReplacePreviousHistoryAction,
    PopHistoryAction,
    ChangeStateAction,
    AssistantInsets,
    History,
} from './types';

export const setCharacter = (character: CharacterId): CharacterAction =>
    createAction(AppStateActionType.CHARACTER, { character });

export const setInsets = (insets: AssistantInsets): InsetsAction => createAction(AppStateActionType.INSETS, { insets });

export const pushHistory = <
    T extends AnyObject = AnyObject,
    N extends Extract<keyof T, string> = Extract<keyof T, string>
>(
    name: N,
    data: T[N],
): PushHistoryAction => createAction(AppStateActionType.PUSH_HISTORY, { history: { name, data } });

export const replacePreviousHistory = <
    T extends AnyObject = AnyObject,
    N extends Extract<keyof T, string> = Extract<keyof T, string>
>(
    screens: Array<{ name: N; data: T[N] }>,
): ReplacePreviousHistoryAction => createAction(AppStateActionType.REPLACE_PREVIOUS_HISTORY, { history: screens });

export const popHistory = (delta?: number): PopHistoryAction => createAction(AppStateActionType.POP_HISTORY, { delta });

export const changeActiveScreenState = (data: History): ChangeStateAction =>
    createAction(AppStateActionType.CHANGE_ACTIVE_SCREEN_STATE, data);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getActionCreators = <
    T extends AnyObject = AnyObject,
    N extends Extract<keyof T, string> = Extract<keyof T, string>
>() => ({
    pushHistory: <S extends N>(name: S, data: T[S]) => pushHistory(name, data),
    pushScreen: <S extends N>(name: S) => pushHistory(name, null),
    popHistory,
    setCharacter,
    setInsets,
    changeActiveScreenState: <S extends N>(data: T[S]) => changeActiveScreenState(data),
});
