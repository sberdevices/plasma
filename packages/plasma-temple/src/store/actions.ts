import { createAction, createEmptyAction } from '../utils/createAction';

import {
    CharacterPayload,
    AppStateActionType,
    InsetsPayload,
    PushHistoryPayload,
    ChangeActiveScreenStatePayload,
    CharacterAction,
    InsetsAction,
    PushHistoryAction,
    PopHistoryAction,
    ChangeStateAction,
} from './reducer';

export const setCharacter = (payload: CharacterPayload): CharacterAction =>
    createAction(AppStateActionType.CHARACTER, payload);

export const setInsets = (payload: InsetsPayload): InsetsAction => createAction(AppStateActionType.INSETS, payload);

export const pushHistory = (payload: PushHistoryPayload): PushHistoryAction =>
    createAction(AppStateActionType.PUSH_HISTORY, payload);

export const popHistory = (): PopHistoryAction => createEmptyAction(AppStateActionType.POP_HISTORY);

export const changeActiveScreenState = (payload: ChangeActiveScreenStatePayload): ChangeStateAction =>
    createAction(AppStateActionType.CHANGE_ACTIVE_SCREEN_STATE, payload);
