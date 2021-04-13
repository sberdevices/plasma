import { createAction, createEmptyAction } from '../utils/createAction';

import {
    CharacterPayload,
    AppStateActionType,
    InsetsPayload,
    PushHistoryPayload,
    ChangeActiveScreenStatePayload,
} from './reducer';

export const setCharacter = (payload: CharacterPayload) => createAction(AppStateActionType.CHARACTER, payload);

export const setInsets = (payload: InsetsPayload) => createAction(AppStateActionType.INSETS, payload);

export const pushHistory = (payload: PushHistoryPayload) => createAction(AppStateActionType.PUSH_HISTORY, payload);

export const popHistory = () => createEmptyAction(AppStateActionType.POP_HISTORY);

export const changeActiveScreenState = (payload: ChangeActiveScreenStatePayload) =>
    createAction(AppStateActionType.CHANGE_ACTIVE_SCREEN_STATE, payload);
